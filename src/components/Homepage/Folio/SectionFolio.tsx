import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'

export default async function SectionFolio() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    overrideAccess: false,
    where: {
      isVisible: {
        equals: true,
      },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      tags: true,
      createdAt: true,
      publishedAt: true,
      projectName: true,
      meta: true,
    },
  })

  return (
    <section data-section="folio">
      <div className="sc-inner">
        <div className="container">
          <div className="content">
            <div className="table-row table-header">
              <div className="category">
                <p>Category</p>
              </div>

              <div className="year">
                <p>Year</p>
              </div>

              <div className="project">
                <p>Project</p>
              </div>
            </div>

            {posts.docs.map((post) => {
              const year = post.createdAt ? new Date(post.createdAt).getFullYear() : 'Unknown'

              const categories = post.categories
                ? Array.isArray(post.categories)
                  ? post.categories.map((cat: any) => cat?.title || 'Unknown').join(', ')
                  : (post.categories as any)?.title || 'Unknown'
                : 'Uncategorized'

              return (
                <div key={post.id} className="table-row">
                  <div className="category">
                    <p>{categories}</p>
                  </div>

                  <div className="year">
                    <p>{year}</p>
                  </div>

                  <div className="project">
                    <Link href={`/posts/${post.slug}`} className="project-name">
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
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
