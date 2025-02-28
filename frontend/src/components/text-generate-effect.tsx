"use client"
import { useEffect, useState } from "react"

export const TextGenerateEffect = ({ words, className }: { words: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const animateText = () => {
      if (currentIndex <= words.length) {
        setDisplayedText(words.slice(0, currentIndex))
        currentIndex++
        timeout = setTimeout(animateText, 30)
      }
    }

    animateText()

    return () => clearTimeout(timeout)
  }, [words])

  return <p className={className}>{displayedText}</p>
}

