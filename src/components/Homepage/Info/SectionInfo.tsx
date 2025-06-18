'use client'

import React from 'react'
import { SplitTextComponent } from '../../../utils/splitText'
export default function SectionInfo() {
  return (
    <section data-section="info">
      <div className="sc-billboard full-screen">
        <div className="content">
          <SplitTextComponent as="h1" style={{ fontSize: '40px' }}>
            Neue Montreal
          </SplitTextComponent>

          <SplitTextComponent as="p" style={{ fontFamily: 'var(--font-bit)', fontSize: '40px' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </SplitTextComponent>

          <SplitTextComponent
            as="p"
            style={{ fontFamily: 'var(--font-rusilla)', fontSize: '40px' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </SplitTextComponent>
        </div>
      </div>
    </section>
  )
}
