import FloatingShape from '@/components/FloatingShape/FloatingShape'
// import PageTemplate, { generateMetadata } from './[slug]/page'

export default function Home() {
  return (
    <main className="index-main">
      <section data-section="floating-shape">
        <FloatingShape />
      </section>

      <h1
        style={{
          fontSize: '40px',
        }}
      >
        Neue Montreal
      </h1>
      <p style={{ fontFamily: 'var(--font-bit)', fontSize: '40px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </main>
  )
}
