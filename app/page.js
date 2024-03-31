'use client'

import React, { useState, useEffect } from 'react';
import NewHomeButton from './components/NewHomeButton';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomeFacts from './components/HomeFacts';
import AuthPage from './components/AuthPage';
import UserIcon from './components/UserIcon';
import Modal from './components/Modal';
import NewHome from './components/NewHome';

import { useSession } from 'next-auth/react';



export default function Home() {
  // set state vars
  const [questionInput, setQuestionInput] = useState("");
  const [lastQuestion, setLastQuestion] = useState();
  const [result, setResult] = useState();
  const [homeFacts, setHomeFacts] = useState([]);
  const [homeList, setHomeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  // get the first homes data from the API to display
  useEffect(() => {

    const fetchHomeData = async () => {
      try {
        const response = await fetch('/api/first-home');
        const newHomeFacts = await response.json();
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
    setIsLoading(true);
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
      setIsLoading(false);
      setResult(data.result);
      setLastQuestion("You asked: " + questionInput);
      setQuestionInput("");
    } catch(error) {
      console.error(error);
      setIsLoading(false);
      alert(error.message);
    }
  }

  const onSelectAddress = async (homeId) => {
    try {
      const response = await fetch('/api/get-home/' + homeId);
      const newHomeFacts = await response.json();
      setHomeFacts(newHomeFacts);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(error.message);
    }
  };
  const handleNewHome = async function() {
    console.log('Pull up a modal with a new home form');
    setIsModalOpen(true);
  };
  const handleModalClose = async function() {
    setIsModalOpen(false);
  }

  return (
    <main className={styles.main}>
    {isLoggedIn && <Navbar 
        address={homeFacts[0] ? homeFacts[0].value : ""}
        onSelectAddress={onSelectAddress}
        homeList={homeList}
      />}
      {!isLoggedIn && <AuthPage />}
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          {isLoggedIn && <Chat
            handleSubmit={handleSubmit}
            questionInput={questionInput}
            setQuestionInput={setQuestionInput}
            lastQuestion={lastQuestion}
            result={result}
            isLoading={isLoading}
          />}
          {isLoggedIn && <NewHomeButton handleClick={handleNewHome} />}
        </div>
        <div className={styles.rightColumn}>
          {isLoggedIn && <HomeFacts homeFacts={homeFacts} />}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <NewHome />
        </Modal>
      </div>
    </main>
  )
}
