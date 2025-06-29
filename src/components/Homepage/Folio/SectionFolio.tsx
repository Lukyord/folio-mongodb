import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import TableRow from './TableRow'
import AnimateOnScroll from '@/utils/animate-on-scroll'

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
    sort: '-postCreatedTime',
    select: {
      title: true,
      slug: true,
      categories: true,
      tags: true,
      postCreatedTime: true,
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
            <AnimateOnScroll triggerClass={['fadeInUp', 'in-view']} delay={100}>
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
            </AnimateOnScroll>

            {posts.docs.map((post) => (
              <TableRow key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
