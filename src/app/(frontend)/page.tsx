import FloatingShape from '@/components/Homepage/FloatingShape/FloatingShape'
import SectionInfo from '@/components/Homepage/Info/SectionInfo'
import SectionFolio from '@/components/Homepage/Folio/SectionFolio'
import { Header } from '@/Header/Component'
import AnimateOnScroll from '@/utils/animate-on-scroll'
import { pageAnimationDuration } from '@/utils/pageAnimation'
// import PageTemplate, { generateMetadata } from './[slug]/page'

export default function Home() {
  return (
    <>
      <Header />
      <main className="index-main">
        <AnimateOnScroll triggerClass={['entryUp']} delay={pageAnimationDuration}>
          <section data-section="floating-shape">
            <FloatingShape />
          </section>
        </AnimateOnScroll>

        <SectionInfo />

        <SectionFolio />
      </main>
    </>
  )
}
