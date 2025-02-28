"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll, useSpring } from "framer-motion"

export const TracingBeam = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div ref={ref} className="relative">
      <div className="absolute -left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(124, 58, 237, 0.5) 0px 0px 30px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-primary bg-background"
        />
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.2"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            style={{
              pathLength: scrollYProgress,
            }}
          />
          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={0} y2={svgHeight}>
              <stop stopColor="#7c3aed" stopOpacity={0} />
              <stop stopColor="#7c3aed" />
              <stop offset={y1} stopColor="#7c3aed" />
              <stop offset={y1} stopColor="#7c3aed" stopOpacity={0} />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}

