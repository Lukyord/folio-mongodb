import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import PostBackButton from '@/components/Post/PostBackButton'
import AnimateOnScroll from '@/utils/animate-on-scroll'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { pageAnimationDuration } from '@/utils/pageAnimation'
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const categories = post.categories
    ? Array.isArray(post.categories)
      ? post.categories.map((cat: any) => cat?.title || 'Unknown').join(' / ')
      : (post.categories as any)?.title || 'Unknown'
    : 'Uncategorized'

  return (
    <main className="post-main">
      <section data-section="post">
        <div className="sc-inner sc-inner--top-0">
          <div className="container">
            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />

            {draft && <LivePreviewListener />}

            <AnimateOnScroll triggerClass={['entryUp']} delay={pageAnimationDuration}>
              <div className="post-header">
                <PostBackButton />

                <div className="post-ttl">
                  <h1>{post.title}</h1>
                </div>

                <div className="post-date">
                  <p>
                    {post.postCreatedTime
                      ? new Date(post.postCreatedTime).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'No date available'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="content">
              <AnimateOnScroll triggerClass={['entryUp']} delay={pageAnimationDuration + 200}>
                <div className="post-category">
                  <h2 className="size-h4">{categories}</h2>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll triggerClass={['entryUp']} delay={pageAnimationDuration + 400}>
                <div className="post-tags">
                  {post.tags?.map((item) => {
                    const tag = typeof item === 'string' ? item : item.name
                    const tagColor = typeof item === 'string' ? item : item.color

                    return (
                      <div
                        style={{ '--bg': tagColor } as React.CSSProperties}
                        className="post-tag"
                        key={tag}
                      >
                        <span>{tag}</span>
                      </div>
                    )
                  })}
                </div>
              </AnimateOnScroll>

              {/* <AnimateOnScroll triggerClass={['fadeIn']} delay={pageAnimationDuration + 600}> */}
              <RichText data={post.content} enableGutter={false} />
              {/* </AnimateOnScroll> */}

              {post.relatedPosts && post.relatedPosts.length > 0 && (
                <RelatedPosts
                  className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                  docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <PageClient />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
