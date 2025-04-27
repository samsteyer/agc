import React from 'react';
import { NewHomeProps, HomeFormData } from '../types';

const NewHome: React.FC<NewHomeProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const homeData: HomeFormData = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, value.toString()])
    );
    
    if (onSubmit) {
      onSubmit(homeData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="homeName">Home Name:</label>
      <input id="homeName" name="homeName" type="text" required />

      {/* Add more fields as necessary */}

      <button type="submit">Create Home</button>
    </form>
  );
};

export default NewHome;