package main

import (
    "github.com/lxn/walk"
    . "github.com/lxn/walk/declarative"
)

func main() {
    var mw *walk.MainWindow

    err := MainWindow{
        AssignTo: &mw,
        Title:    "My Go Walk App",
        MinSize:  Size{Width: 300, Height: 200},
        Layout:   VBox{},
        Children: []Widget{
            PushButton{
                Text: "Button 1",
                OnClicked: func() {
                    walk.MsgBox(mw, "Button 1", "Button 1 clicked!", walk.MsgBoxIconInformation)
                },
            },
            PushButton{
                Text: "Button 2",
                OnClicked: func() {
                    walk.MsgBox(mw, "Button 2", "Button 2 clicked!", walk.MsgBoxIconInformation)
                },
            },
        },
    }.Run()

    if err != nil {
        panic(err)
    }
}
