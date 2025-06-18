import FloatingShape from '@/components/Homepage/FloatingShape/FloatingShape'
import SectionInfo from '@/components/Homepage/Info/SectionInfo'
// import PageTemplate, { generateMetadata } from './[slug]/page'

export default function Home() {
  return (
    <main className="index-main">
      <section data-section="floating-shape">
        <FloatingShape />
      </section>

      <SectionInfo />
    </main>
  )
}
