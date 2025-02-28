"use client"
import { useEffect, useRef } from "react"

export const BackgroundBeams = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateMousePosition = (ev: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = ev.clientX - rect.left
      const y = ev.clientY - rect.top
      container.style.setProperty("--x", `${x}px`)
      container.style.setProperty("--y", `${y}px`)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 opacity-30"
      style={{
        background: `radial-gradient(600px circle at var(--x, 100px) var(--y, 100px),rgba(124, 58, 237, 0.15),transparent 40%)`,
      }}
    />
  )
}

