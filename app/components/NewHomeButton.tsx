import React from 'react';
import Button from '@mui/material/Button';
import { NewHomeButtonProps } from '../types';

const NewHomeButton: React.FC<NewHomeButtonProps> = ({ handleClick }) => {
  return <Button onClick={handleClick}>New Home</Button>;
};

export default NewHomeButton;