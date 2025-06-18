'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the plugins
gsap.registerPlugin(SplitText, ScrollTrigger)

// Custom hook for SplitText functionality with scroll animation
export const useSplitText = (
  options: {
    animationClass?: string
    staggerDelay?: number
    [key: string]: any
  } = {},
) => {
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

    // Get the characters after splitting
    const chars = splitInstanceRef.current.chars

    // Create ScrollTrigger for each character
    chars.forEach((char, index) => {
      const charElement = char as HTMLElement
      charElement.style.visibility = 'hidden'
      charElement.classList.add('animate')

      ScrollTrigger.create({
        trigger: char,
        start: 'top 80%',
        onEnter: () => {
          const staggerDelay = index * (options.staggerDelay || 0.05)
          setTimeout(() => {
            charElement.style.visibility = 'visible'
            charElement.classList.add(options.animationClass || 'char-animated')
          }, staggerDelay * 1000)
        },
        once: true,
      })
    })

    return () => {
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert()
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger &&
          Array.isArray(chars) &&
          chars.includes(trigger.vars.trigger as Element)
        ) {
          trigger.kill()
        }
      })
    }
  }, [options])

  return {
    ref: elementRef,
    splitInstance: splitInstanceRef.current,
  }
}

type SplitTextProps = {
  children: React.ReactNode
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'section' | 'article'
  className?: string
  style?: React.CSSProperties
  splitOptions?: any
  enableScrollAnimation?: boolean
  animationClass?: string
  staggerDelay?: number
}

export const SplitTextComponent: React.FC<SplitTextProps> = ({
  children,
  as = 'div',
  className,
  style,
  splitOptions,
  enableScrollAnimation = true,
  animationClass = 'char-animated',
  staggerDelay = 0.05,
}) => {
  const { ref } = useSplitText(
    enableScrollAnimation
      ? {
          ...splitOptions,
          animationClass,
          staggerDelay,
        }
      : { ...splitOptions, type: 'none' },
  )

  return React.createElement(as, { ref, className, style }, children)
}

// Alternative: Direct hook usage for more control
export const useSplitTextRef = (options = {}) => {
  return useSplitText(options)
}
