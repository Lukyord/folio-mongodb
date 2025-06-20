import FloatingShape from '@/components/Homepage/FloatingShape/FloatingShape'
import SectionInfo from '@/components/Homepage/Info/SectionInfo'
import SectionFolio from '@/components/Homepage/Folio/SectionFolio'
import { Header } from '@/Header/Component'
import AnimateOnScroll from '@/utils/animate-on-scroll'
import { pageAnimationDuration } from '@/utils/pageAnimation'
import BlocksHover from '@/components/Homepage/FloatingShape/BlocksHover'
import Intro from '@/components/Homepage/Intro/Intro'
// import PageTemplate, { generateMetadata } from './[slug]/page'

export default function Home() {
  return (
    <>
      <Header />

      <Intro />
      <main className="index-main">
        <section data-section="floating-shape">
          <BlocksHover />
          <FloatingShape />
        </section>

        <SectionInfo />

        <SectionFolio />
      </main>
    </>
  )
}
