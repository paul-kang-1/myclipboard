package main

import (
	"context"
	"fmt"
)

type (
	Format int

	Entry struct {
		Type Format `json:"type"`
		Content []byte `json:"content"`
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

func (a *App) GetBytes() Entry {
	return Entry{
		Content: []byte("Hello world!"),
		Type: FmtText,
	}
}

