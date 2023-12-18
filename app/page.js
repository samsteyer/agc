'use client'
 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/navbar';
import Chat from './components/chat';
import HomeFacts from './components/homefacts';

export default function Home() {
  const [homeFacts, setHomeFacts] = useState([
    {
      title: "address",
      value: "1913 Baker St.",
      id: 0,
    },
    {
      title: "zip",
      value: "94115",
      id: 1,
    },
    {
      title: "beds",
      value: 5,
      id: 2,
    },
    {
      title: "baths",
      value: 3,
      id: 3,
    },
    {
      title: "sqft",
      value: 3400,
      id: 4,
    },
  ]);
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Chat />
        </div>
        <div className={styles.rightColumn}>
          <HomeFacts homeFacts={homeFacts} />
        </div>
      </div>
    </main>
  )
}
