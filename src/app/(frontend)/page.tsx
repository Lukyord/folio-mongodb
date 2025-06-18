import FloatingShape from '@/components/Homepage/FloatingShape/FloatingShape'
import SectionInfo from '@/components/Homepage/Info/SectionInfo'
import SectionFolio from '@/components/Homepage/Folio/SectionFolio'
import { Header } from '@/Header/Component'
// import PageTemplate, { generateMetadata } from './[slug]/page'

export default function Home() {
  return (
    <>
      <Header />
      <main className="index-main">
        <section data-section="floating-shape">
          <FloatingShape />
        </section>

        <SectionInfo />

        <SectionFolio />
      </main>
    </>
  )
}
