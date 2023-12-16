import styles from './navbar.module.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function Navbar() {
  return (
    <Box className={styles.topNav}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className={styles.navItem}>
            Chat
          </Typography>
          <Typography variant="h6" component="div" className={styles.navItem}>
            Home Facts
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
