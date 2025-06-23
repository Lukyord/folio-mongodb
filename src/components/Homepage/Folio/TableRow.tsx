'use client'

import React, { useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CategoryList from './CategoryList'
import AnimateOnScroll from '@/utils/animate-on-scroll'
import { useTransitionRouter } from 'next-view-transitions'
import { pageAnimation } from '@/utils/pageAnimation'

interface TableRowProps {
  post: {
    id: string
    title: string
    slug?: string | null | undefined
    categories?: any
    createdAt?: string | null | undefined
    projectName: any
  }
}

export default function TableRow({ post }: TableRowProps) {
  const router = useTransitionRouter()
  const rowRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  const year = post.createdAt ? new Date(post.createdAt).getFullYear() : 'Unknown'

  const categories = post.categories
    ? Array.isArray(post.categories)
      ? post.categories.map((cat: any) => cat?.title || 'Unknown').join(', ')
      : (post.categories as any)?.title || 'Unknown'
    : 'Uncategorized'

  const getDirection = useCallback((clientY: number) => {
    if (!rowRef.current) return 'bottom'

    const rect = rowRef.current.getBoundingClientRect()
    const rowCenter = rect.top + rect.height / 2
    return clientY < rowCenter ? 'top' : 'bottom'
  }, [])

  const animateBackground = useCallback((direction: 'top' | 'bottom', show: boolean) => {
    if (!backgroundRef.current) return

    if (show) {
      backgroundRef.current.style.transform = 'translateY(0)'
    } else {
      backgroundRef.current.style.transform =
        direction === 'top' ? 'translateY(-100%)' : 'translateY(100%)'
    }
  }, [])

  const handleEnter = useCallback(
    (clientY: number) => {
      const direction = getDirection(clientY)
      animateBackground(direction, true)
    },
    [getDirection, animateBackground],
  )

  const handleLeave = useCallback(
    (clientY: number) => {
      const direction = getDirection(clientY)
      animateBackground(direction, false)
    },
    [getDirection, animateBackground],
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleEnter(e.clientY)
    },
    [handleEnter],
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleLeave(e.clientY)
    },
    [handleLeave],
  )

  return (
    <AnimateOnScroll triggerClass={['fadeInUp', 'in-view']} delay={100}>
      <Link
        href={`/posts/${post.slug}`}
        onClick={(e) => {
          e.preventDefault()

          router.push(`/posts/${post.slug}`, {
            onTransitionReady: pageAnimation,
          })
        }}
      >
        <div
          ref={rowRef}
          className="table-row"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="category">
            <p>
              <CategoryList categories={categories} />
            </p>
          </div>

          <div className="year">
            <p>{year}</p>
          </div>

          <div className="project">
            <div className="project-name">
              {post.projectName && Array.isArray(post.projectName)
                ? post.projectName.map((item: any, index: number) => (
                    <div key={index} className="word-item">
                      <div className="image">
                        <Image
                          src={item.image.url}
                          alt={item.word}
                          width={item.image.width}
                          height={item.image.height}
                        />
                      </div>

                      <p className="word">{item.word}</p>
                    </div>
                  ))
                : post.title}
            </div>
          </div>

          <div ref={backgroundRef} className="table-row-background" />
        </div>
      </Link>
    </AnimateOnScroll>
  )
}
