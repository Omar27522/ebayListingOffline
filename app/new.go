package main

import (
    "log"
    "runtime"

    "github.com/go-gl/gl/v2.1/gl"
    "github.com/go-gl/glfw/v3.3/glfw"
)

func init() {
    runtime.LockOSThread()
}

func main() {
    if err := glfw.Init(); err != nil {
        log.Fatalln("failed to initialize glfw:", err)
    }
    defer glfw.Terminate()

    window, err := glfw.CreateWindow(400, 300, "OpenGL Test Window", nil, nil)
    if err != nil {
        log.Fatalln("failed to create window:", err)
    }
    window.MakeContextCurrent()

    if err := gl.Init(); err != nil {
        log.Fatalln("failed to initialize gl:", err)
    }

    for !window.ShouldClose() {
        gl.Clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        window.SwapBuffers()
        glfw.PollEvents()
    }
}