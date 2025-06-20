'use client'

import React from 'react'
import Link from 'next/link'
import { useTransitionRouter } from 'next-view-transitions'
import { pageAnimation } from '@/utils/pageAnimation'

export default function PostBackButton() {
  const router = useTransitionRouter()
  return (
    <Link
      href="/"
      className="back-button-link"
      onClick={(e) => {
        e.preventDefault()

        router.push(`/`, {
          onTransitionReady: pageAnimation,
        })
      }}
    >
      Back
    </Link>
  )
}
