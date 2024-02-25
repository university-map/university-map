import { useState } from "react";
import { Autocomplete } from '@mantine/core';
import './SearchBar.css';
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className='SearchBar'>
      <Autocomplete
        comboboxProps={{ withinPortal: false, offset: 0, }}
        placeholder="Search"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </div>
  );
};

export default SearchBar;