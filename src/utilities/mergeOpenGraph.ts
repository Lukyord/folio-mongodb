import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Tanabordee Tansiri is a Bangkok-based freelance creative developer crafting interactive websites and immersive digital experiences for agencies, artists, and brands',
  images: [
    {
      url: `${getServerSideURL()}/og.webp`,
    },
  ],
  siteName: 'Tanabordee Tansiri - Freelance Creative Developer',
  title: 'Tanabordee Tansiri - Freelance Creative Developer',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
