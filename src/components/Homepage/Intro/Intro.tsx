'use client'

import { useEffect } from 'react'
import { pageAnimationDuration } from '@/utils/pageAnimation'
export default function Intro() {
  useEffect(() => {
    const introBanners = document.querySelectorAll('.intro-banner')

    setTimeout(() => {
      introBanners.forEach((banner) => {
        banner.classList.add('active')
      })
    }, pageAnimationDuration)
  }, [])

  return (
    <div className="intro-container">
      <div className="intro-banner" data-intro-banner="1" />
      <div className="intro-banner" data-intro-banner="2" />
      <div className="intro-banner" data-intro-banner="3" />
      <div className="intro-banner" data-intro-banner="4" />
    </div>
  )
}
