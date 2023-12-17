import React, { useState, useEffect } from 'react';
import styles from './chat.module.css';
import TextField from '@mui/material/TextField';

export default function Chat() {
  const [questionInput, setQuestionInput] = useState("");
  const [lastQuestion, setLastQuestion] = useState();
  const [result, setResult] = useState();

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
    <div>
      <h1 className={styles.title}>
        How can we help make this house a home?
      </h1>
      <form onSubmit={handleSubmit} >
        <TextField
          className={styles.chatBar}
          label="I was wondering..."
          variant="outlined" 
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
      </form>
      {lastQuestion && <div className={styles.lastQuestion}>{lastQuestion}</div>}
      {result && <div className={styles.result}>{result}</div>}
    </div>
  )
}
