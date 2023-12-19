import styles from './HomeSelector.module.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function HomeSelector({address, onSelectAddress, homeList}) {
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
          {homeList.map((home) => (
            <MenuItem value={home.id} className={styles.menuItem}>{home.address}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}


