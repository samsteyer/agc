'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
      <Head>
        <title>AGC</title>
        <meta name="Artificial General Contractor" description="AGC"/>
      </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  )
}
