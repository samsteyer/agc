import React from 'react';
import styles from './Chat.module.css';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ChatProps } from '../types';

const Chat: React.FC<ChatProps> = ({
  handleSubmit, 
  questionInput, 
  setQuestionInput, 
  lastQuestion, 
  result, 
  isLoading
}) => {
  return (
    <div>
      <h1 className={styles.title}>
        How can we help make this house a home?
      </h1>
      <form onSubmit={handleSubmit}>
        <TextField
          className={styles.chatBar}
          label="I was wondering..."
          variant="outlined" 
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
        <CardActions className={styles.submitButton} style={{display: "inline"}}>
          <Button size="small" type="submit">Ask</Button>
        </CardActions>
      </form>
      {isLoading && <CircularProgress className={styles.loader}/>}
      {lastQuestion && <div className={styles.lastQuestion}>{lastQuestion}</div>}
      {result && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default Chat;