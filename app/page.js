'use client'
 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomeFacts from './components/HomeFacts';

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [lastQuestion, setLastQuestion] = useState();
  const [result, setResult] = useState();
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setLastQuestion("You asked: " + questionInput);
      setQuestionInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Chat
            handleSubmit={handleSubmit}
            questionInput={questionInput}
            setQuestionInput={setQuestionInput}
            lastQuestion={lastQuestion}
            result={result}
          />
        </div>
        <div className={styles.rightColumn}>
          <HomeFacts homeFacts={homeFacts} />
        </div>
      </div>
    </main>
  )
}
