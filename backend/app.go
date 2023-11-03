package backend

import (
	"context"
	"fmt"

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
	a.initWatcher()
}

func (a *App) initWatcher() error {
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
	runtime.LogInfo(a.ctx, "Shutting down initwatcher")
	return nil
}

func (a *App) GetBytes() []Entry {
	entries := make([]Entry, 10)
	for i := 0; i < 10; i++ {
		content := fmt.Sprintf("This is entry %d", i)
		// encoded := base64.StdEncoding.EncodeToString([]byte(content))
		entries[i] = Entry{
			Content: content,
			Type:    FmtText,
		}
	}
	return entries
}

