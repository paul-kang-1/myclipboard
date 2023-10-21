package main

import (
	"context"
	"encoding/base64"
	"fmt"
)

type (
	Format int

	Entry struct {
		Type    Format `json:"type"`
		Content string `json:"content"`
	}
)

const (
	FmtText Format = iota
	FmtImage
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's your time!", name)
}

func (a *App) GetBytes() []Entry {
	entries := make([]Entry, 10)
	for i := 0; i < 10; i++ {
		content := fmt.Sprintf("This is entry %d", i)
		encoded := base64.StdEncoding.EncodeToString([]byte(content))
		entries[i] = Entry{
			Content: encoded,
			Type:    FmtText,
		}
	}
	return entries
}

