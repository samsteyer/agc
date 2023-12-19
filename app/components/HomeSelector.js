import styles from './HomeSelector.module.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function HomeSelector({address, onSelectAddress}) {
  const handleChange = async (event) => {
    const res = await onSelectAddress(event.target.value);
  };
  return (
    <Box className={styles.dropSelect}>
      <FormControl fullWidth>
        <InputLabel 
          id="home-selector" 
          sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
        >
          Address
        </InputLabel>
        <Select
          labelId="home-label"
          id="home-select"
          label="Address"
          onChange={handleChange}
          sx={{ 
            color: 'white', 
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
          }}
        >
          <MenuItem value={"bf74c376-8f44-4870-b894-13fdc2ac194b"} className={styles.menuItem}>1913 Baker St.</MenuItem>
          <MenuItem value={"92f02e91-4ed7-494f-bd62-a7fb9b36d41a"} className={styles.menuItem}>328 Seadrift Rd.</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}


