'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomeFacts from './components/HomeFacts';

export default function Home() {
  // set state vars
  const [questionInput, setQuestionInput] = useState("");
  const [lastQuestion, setLastQuestion] = useState();
  const [result, setResult] = useState();
  const [homeFacts, setHomeFacts] = useState([]);
  const [homeList, setHomeList] = useState([]);

  // get the first homes data from the API to display
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch('/api/first-home');
        const data = await response.json();
        const newHomeFacts = [];
        Object.keys(data).forEach((key, index) => {
          if (key !== "id") {
            newHomeFacts.push({
              title: key,
              value: data[key],
              id: index
            });
          }
        });
        setHomeFacts(newHomeFacts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchHomeData();
    const listHomes = async () => {
      try {
        const response = await fetch('/api/list');
        const newHomeList = await response.json();
        setHomeList(newHomeList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    listHomes();
  }, []);

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
          homeFacts: homeFacts
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

  const onSelectAddress = async (homeId) => {
    try {
      const response = await fetch('/api/get-home/' + homeId);
      const data = await response.json();
      const newHomeFacts = [];
      Object.keys(data).forEach((key, index) => {
        if (key !== "id") {
          newHomeFacts.push({
            title: key,
            value: data[key],
            id: index
          });
        }
        });
        setHomeFacts(newHomeFacts);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <Navbar 
        address={homeFacts[0] ? homeFacts[0].value : ""}
        onSelectAddress={onSelectAddress}
        homeList={homeList}
      />
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
