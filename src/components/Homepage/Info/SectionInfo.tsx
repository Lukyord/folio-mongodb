'use client'

import React from 'react'
import { SplitTextComponent } from '@/utils/splitText'
import { useHeaderScrollClass } from '@/utils/useHeaderScrollClass'
import Image from 'next/image'
import AnimateOnScroll from '@/utils/animate-on-scroll'

export default function SectionInfo() {
  useHeaderScrollClass()

  return (
    <section data-section="info">
      <div className="sc-billboard full-screen">
        {/* <Background3d /> */}

        <div className="blob" data-blob="1">
          <AnimateOnScroll triggerClass="fadeInUp">
            <Image src="/design/blob-1.webp" alt="blob" width={1000} height={1000} />
          </AnimateOnScroll>
        </div>

        <div className="blob" data-blob="2">
          <AnimateOnScroll triggerClass="fadeInUp" delay={250}>
            <Image src="/design/blob-2.webp" alt="blob" width={1000} height={1000} />
          </AnimateOnScroll>
        </div>

        <div className="blob" data-blob="3">
          <AnimateOnScroll triggerClass="fadeInUp" delay={500}>
            <Image src="/design/blob-3.webp" alt="blob" width={1000} height={1000} />
          </AnimateOnScroll>
        </div>

        <div className="blob" data-blob="4">
          <AnimateOnScroll triggerClass="fadeInUp" delay={750}>
            <Image src="/design/blob-4.webp" alt="blob" width={1000} height={1000} />
          </AnimateOnScroll>
        </div>

        <div className="content">
          <SplitTextComponent as="h1" enableScrollAnimation={true} animationClass="letter-in">
            Tana<span className="font-bit">bord</span>ee <span className="font-bit">Tans</span>iri
          </SplitTextComponent>

          <SplitTextComponent as="p" enableScrollAnimation={true} animationClass="letter-in">
            <span className="font-bit">C</span>r<span className="font-bit">ea</span>tive Fr
            <span className="font-bit">on</span>t<span className="font-bit">end</span> De
            <span className="font-bit">v</span>elo<span className="font-bit">p</span>e
            <span className="font-bit">r</span>
          </SplitTextComponent>

          <SplitTextComponent as="p" enableScrollAnimation={true} animationClass="letter-in">
            <span className="font-bit">Cu</span>rr<span className="font-bit">en</span>tly{' '}
            <span className="font-bit">@</span>
            <span className="font-rusilla">P</span>laimanas
          </SplitTextComponent>

          <SplitTextComponent as="p" enableScrollAnimation={true} animationClass="letter-in">
            <span className="font-bit">Ba</span>se
            <span className="font-bit">d</span> <span className="font-bit">in</span>{' '}
            <span className="font-bit">B</span>an
            <span className="font-bit">g</span>k<span className="font-bit">o</span>k
          </SplitTextComponent>
        </div>
      </div>
    </section>
  )
}
