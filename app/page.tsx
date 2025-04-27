'use client'

import React, { useState, useEffect } from 'react';
import NewHomeButton from './components/NewHomeButton';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import HomeFacts from './components/HomeFacts';
import AuthPage from './components/AuthPage';
import Modal from './components/Modal';
import NewHome from './components/NewHome';
import { useSession } from 'next-auth/react';
import { Home, HomeListItem } from './types';

export default function HomePage() {
  // set state vars
  const [questionInput, setQuestionInput] = useState<string>("");
  const [lastQuestion, setLastQuestion] = useState<string | undefined>();
  const [result, setResult] = useState<string | undefined>();
  const [homeFacts, setHomeFacts] = useState<Home>({} as Home);
  const [homeList, setHomeList] = useState<HomeListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      alert((error as Error).message);
    }
  }

  const onSelectAddress = async (homeId: number) => {
    try {
      const response = await fetch('/api/get-home/' + homeId);
      const newHomeFacts = await response.json();
      setHomeFacts(newHomeFacts);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert((error as Error).message);
    }
  };
  
  const handleNewHome = async () => {
    console.log('Pull up a modal with a new home form');
    setIsModalOpen(true);
  };
  
  const handleModalClose = async () => {
    setIsModalOpen(false);
  }

  return (
    <main className={styles.main}>
    {isLoggedIn && <Navbar 
        address={homeFacts.address || ""}
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