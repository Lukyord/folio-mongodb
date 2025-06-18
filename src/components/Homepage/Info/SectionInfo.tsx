'use client'

import React from 'react'
import { SplitTextComponent } from '../../../utils/splitText'
import AnimateOnScroll from '@/utils/animate-on-scroll'

export default function SectionInfo() {
  return (
    <section data-section="info">
      <div className="sc-billboard full-screen">
        <div className="content">
          <SplitTextComponent
            as="h1"
            style={{ fontSize: '40px', marginBottom: '2rem' }}
            enableScrollAnimation={true}
            animationClass="letter-in"
          >
            Neue Montreal
          </SplitTextComponent>

          <SplitTextComponent
            as="p"
            style={{ fontFamily: 'var(--font-bit)', fontSize: '40px', marginBottom: '2rem' }}
            enableScrollAnimation={true}
            animationClass="letter-in"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </SplitTextComponent>

          <SplitTextComponent
            as="p"
            style={{ fontFamily: 'var(--font-rusilla)', fontSize: '40px' }}
            enableScrollAnimation={true}
            animationClass="letter-in"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </SplitTextComponent>
        </div>
      </div>
    </section>
  )
}
