import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import TableRow from './TableRow'

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

            {posts.docs.map((post) => (
              <TableRow key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
