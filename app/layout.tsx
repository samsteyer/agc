'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionProvider>
      <html lang="en">
      <Head>
        <title>AGC</title>
        <meta name="Artificial General Contractor" content="AGC"/>
      </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  )
}