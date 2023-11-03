package backend

import (
	"time"
)

type (
	Format int

	Entry struct {
		ID        uint `gorm:"primaryKey"`
		CreatedAt time.Time
		Type      Format `json:"type"`
		Content   string `json:"content"`
	}
)

const (
	FmtText Format = iota
	FmtImage
)

func (a *App) Write(content string, dataType Format) error {
	entry := Entry{Content: content, Type: dataType}
	res := a.DB.Create(&entry)
	return res.Error
}

func (a *App) ReadAll() ([]Entry, error) {
	var entries []Entry
	res := a.DB.Find(&entries)
	if res.Error != nil {
		return nil, res.Error
	}
	return entries, nil
}
