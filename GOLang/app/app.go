package main

import (
    "fyne.io/fyne/v2/app"
    "fyne.io/fyne/v2/container"
    "fyne.io/fyne/v2/widget"
    "fyne.io/fyne/v2/dialog"
)

func main() {
    a := app.New()
    w := a.NewWindow("Fyne Window with 2 Buttons")
    btn1 := widget.NewButton("Button 1", func() {
        dialog.ShowInformation("Button 1", "You clicked Button 1!", w)
    })
    btn2 := widget.NewButton("Button 2", func() {
        dialog.ShowInformation("Button 2", "You clicked Button 2!", w)
    })
    w.SetContent(container.NewVBox(btn1, btn2))
    w.Resize(fyne.NewSize(300, 100))
    w.ShowAndRun()
}