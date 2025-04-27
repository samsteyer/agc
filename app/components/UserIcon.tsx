import React from 'react';
import { useSession, signOut, signIn } from "next-auth/react";
import styles from './UserIcon.module.css';

const UserIcon: React.FC = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        {session.user.image && (
          <img src={session.user.image} alt={session.user.name || 'User'} />
        )}
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>AGC</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
};

export default UserIcon;