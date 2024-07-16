import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event:any) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">      
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}    
        onChange={handleChange}
      >       
        <MenuItem value={10}>meter</MenuItem>
        <MenuItem value={20}>feet</MenuItem>
        <MenuItem value={30}>inch</MenuItem>
      </Select>
    </FormControl>
  );
}