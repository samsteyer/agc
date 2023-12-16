'use client'
 
import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './components/navbar';
import Chat from './components/chat';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Chat />
    </main>
  )
}
