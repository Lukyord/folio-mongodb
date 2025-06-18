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
  triggerClass?: string
  start?: string
  end?: string
  toggleActions?: string
  once?: boolean
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
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}: AnimateOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.style.visibility = 'hidden'
    element.classList.add('animate')

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      toggleActions,
      onEnter: () => {
        element.style.visibility = 'visible'
        element.classList.add(triggerClass)
        onEnter?.()
      },
      onLeave: () => {
        if (!once) {
          element.style.visibility = 'hidden'
          element.classList.remove(triggerClass)
        }
        onLeave?.()
      },
      onEnterBack: () => {
        if (!once) {
          element.style.visibility = 'visible'
          element.classList.add(triggerClass)
        }
        onEnterBack?.()
      },
      onLeaveBack: () => {
        if (!once) {
          element.style.visibility = 'hidden'
          element.classList.remove(triggerClass)
        }
        onLeaveBack?.()
      },
    })

    // Cleanup function
    return () => {
      scrollTrigger.kill()
    }
  }, [triggerClass, start, end, toggleActions, once, onEnter, onLeave, onEnterBack, onLeaveBack])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
