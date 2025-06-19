import type { Metadata } from 'next'

import React from 'react'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
// import { draftMode } from 'next/headers'
import localFont from 'next/font/local'
import '@/styles/theme.css'
import '@/styles/theme-rwd.css'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const NeueBit = localFont({
  src: './fonts/NeueBit/NeueBit-Regular.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-bit',
})

const NeueMontreal = localFont({
  src: [
    {
      path: './fonts/NeueMontreal/NeueMontreal-Light.woff2',
      weight: '300',
      style: 'light',
    },
    {
      path: './fonts/NeueMontreal/NeueMontreal-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/NeueMontreal/NeueMontreal-Medium.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: './fonts/NeueMontreal/NeueMontreal-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-body',
})

const RusillaSerif = localFont({
  src: './fonts/RusillaSerif/Rusillaserif-Regular.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-rusilla',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const { isEnabled } = await draftMode()

  return (
    <html
      className={`${NeueBit.variable} ${NeueMontreal.variable} ${RusillaSerif.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers>{children}</Providers>

        <div id="page-message">
          <p>
            For the best experience, we recommend viewing the site in portrait orientation on mobile
            devices.
          </p>
        </div>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
