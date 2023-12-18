import React, { useState, useEffect } from 'react';
import styles from './Chat.module.css';
import TextField from '@mui/material/TextField';

export default function Chat({handleSubmit, questionInput, setQuestionInput, lastQuestion, result}) {
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
