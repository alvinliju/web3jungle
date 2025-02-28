"use client"
import type React from "react"
import { motion } from "framer-motion"

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
}) => {
  return (
    <div className="relative">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary blur-lg opacity-50" />
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary"
          style={{
            maskImage: `radial-gradient(${rx || "100%"} ${ry || "100%"} at 50% 50%, black, transparent)`,
            WebkitMaskImage: `radial-gradient(${rx || "100%"} ${ry || "100%"} at 50% 50%, black, transparent)`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration,
            ease: "linear",
          }}
        />
        {children}
      </motion.div>
    </div>
  )
}

