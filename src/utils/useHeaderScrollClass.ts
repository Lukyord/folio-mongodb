'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useHeaderScrollClass = () => {
  useEffect(() => {
    const header = document.getElementById('header')
    if (!header) return

    const scrollTrigger = ScrollTrigger.create({
      trigger: '[data-section="info"]',
      start: 'top 30%',
      end: 'bottom top',
      onEnter: () => {
        header.classList.add('white')
      },
      onLeaveBack: () => {
        header.classList.remove('white')
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [])
}
