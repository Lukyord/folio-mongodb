import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

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
                    <a href={`/posts/${post.slug}`}>
                      <p>{post.title}</p>
                    </a>
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
