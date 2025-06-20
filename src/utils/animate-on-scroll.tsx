'use client'

import React, { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type AnimateOnScrollProps = {
  children: ReactNode
  className?: string
  triggerClass?: string | string[]
  start?: string
  end?: string
  toggleActions?: string
  once?: boolean
  delay?: number
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

export default function AnimateOnScroll({
  children,
  className = '',
  triggerClass = 'animate-in',
  start = 'top 80%',
  end = 'bottom 20%',
  toggleActions = 'play none none reverse',
  once = true,
  delay = 0,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}: AnimateOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  // Helper function to add classes
  const addClasses = (element: HTMLElement, classes: string | string[]) => {
    if (Array.isArray(classes)) {
      classes.forEach((cls) => element.classList.add(cls))
    } else {
      element.classList.add(classes)
    }
  }

  // Helper function to remove classes
  const removeClasses = (element: HTMLElement, classes: string | string[]) => {
    if (Array.isArray(classes)) {
      classes.forEach((cls) => element.classList.remove(cls))
    } else {
      element.classList.remove(classes)
    }
  }

  // Helper function to show element with classes
  const showElement = (element: HTMLElement, callback?: () => void) => {
    element.style.visibility = 'visible'
    addClasses(element, triggerClass)
    callback?.()
  }

  // Helper function to hide element and remove classes
  const hideElement = (element: HTMLElement, callback?: () => void) => {
    if (!once) {
      element.style.visibility = 'hidden'
      removeClasses(element, triggerClass)
    }
    callback?.()
  }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Initial setup
    element.style.visibility = 'hidden'
    element.classList.add('animate')

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      toggleActions,
      onEnter: () => {
        if (delay) {
          setTimeout(() => showElement(element, onEnter), delay)
        } else {
          showElement(element, onEnter)
        }
      },
      onLeave: () => {
        hideElement(element, onLeave)
      },
      onEnterBack: () => {
        if (!once) {
          if (delay) {
            setTimeout(() => showElement(element), delay)
          } else {
            showElement(element)
          }
        }
        onEnterBack?.()
      },
      onLeaveBack: () => {
        hideElement(element, onLeaveBack)
      },
    })

    // Cleanup function
    return () => {
      scrollTrigger.kill()
    }
  }, [
    triggerClass,
    start,
    end,
    toggleActions,
    once,
    delay,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    hideElement,
    showElement,
  ])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
