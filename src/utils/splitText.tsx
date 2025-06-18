'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

// Register the SplitText plugin
gsap.registerPlugin(SplitText)

// Custom hook for SplitText functionality
export const useSplitText = (options = {}) => {
  const elementRef = useRef<HTMLElement>(null)
  const splitInstanceRef = useRef<SplitText | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Create SplitText instance
    splitInstanceRef.current = new SplitText(elementRef.current, {
      type: 'chars, words',
      charsClass: 'char',
      wordsClass: 'word',
      ...options,
    })

    // Cleanup function
    return () => {
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert()
      }
    }
  }, [options])

  return {
    ref: elementRef,
    splitInstance: splitInstanceRef.current,
  }
}

// Reusable SplitText component
type SplitTextProps = {
  children: React.ReactNode
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'section' | 'article'
  className?: string
  style?: React.CSSProperties
  splitOptions?: any
}

export const SplitTextComponent: React.FC<SplitTextProps> = ({
  children,
  as = 'div',
  className,
  style,
  splitOptions,
}) => {
  const { ref } = useSplitText(splitOptions)

  return React.createElement(as, { ref, className, style }, children)
}

// Alternative: Direct hook usage for more control
export const useSplitTextRef = (options = {}) => {
  return useSplitText(options)
}
