import PageTemplate, { generateMetadata } from './[slug]/page'

export default function Home() {
  return (
    <div style={{ paddingTop: '500px', height: '200vh' }}>
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
    </div>
  )
}
