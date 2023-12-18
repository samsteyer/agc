import styles from './Navbar.module.css'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box className={styles.navBox}>
      <AppBar position="static">
        <Toolbar className={styles.topNav}>
          <Typography variant="h6" component="div" className={styles.navItem}>
            Chat
          </Typography>
          <Typography variant="h6" component="div" className={styles.navItem}>
            Login
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
