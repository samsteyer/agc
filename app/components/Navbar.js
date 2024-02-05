import styles from './Navbar.module.css';
import HomeSelector from './HomeSelector';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { signOut } from 'next-auth/react';


export default function Navbar({address, onSelectAddress, homeList}) {
  const handleLogout = () => {
    signOut();
  };

  return (
    <Box className={styles.navBox}>
      <AppBar position="static">
        <Toolbar className={styles.topNav}>
          <Typography variant="h6" component="div" className={styles.navItem}>
            Chat
          </Typography>
          <Typography variant="h6" component="div" className={styles.navItem}>
            <HomeSelector
              className={styles.navItem}
              address={address}
              onSelectAddress={onSelectAddress}
              homeList={homeList}
            />
          </Typography>
          <Typography onClick={handleLogout} variant="h6" component="div" className={styles.navItem}>
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
