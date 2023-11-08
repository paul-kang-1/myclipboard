package backend

import (
	"context"
	"strconv"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"golang.design/x/clipboard"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	DB *gorm.DB
	kill chan struct{}
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	var err error
	a.ctx = ctx
	a.kill = make(chan struct{})
	a.DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("Database connection failed")
	}
	a.DB.AutoMigrate(&Entry{})
	a.initClipboardWatcher()
	runtime.EventsOn(a.ctx, "deleteData", a.deleteEventHandler)
}

func (a *App) initClipboardWatcher() error {
	textCh := clipboard.Watch(a.ctx, clipboard.FmtText)
	go func() {
		for data := range textCh {
			runtime.LogInfof(a.ctx, "New Entry: %s", string(data))
			// Write newly obtained data to DB
			if err := a.Write(string(data), FmtText); err != nil {
				runtime.LogError(a.ctx, err.Error())
			}
			// Send event to FE, adding component
			runtime.EventsEmit(a.ctx, "newData", data)
		}
	}()
	return nil
}

func (a *App) deleteEventHandler(data ...any) {
	id, ok := data[0].(string)
	if !ok {
		runtime.LogError(a.ctx, "received invalid data from frontend")
		return
	}
	var err error
	intId, err := strconv.Atoi(id)
	if err != nil {
		runtime.LogErrorf(a.ctx, "Cannot convert ID to int: %v", err)
		return
	}
	if err := a.Delete(intId); err != nil {
		runtime.LogErrorf(a.ctx, "Error in deleting row %s: %v", intId, err)
		return
	}
	runtime.LogInfof(a.ctx, "Successfully deleted row with ID: %s", id)
}
