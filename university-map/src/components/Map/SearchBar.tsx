import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';
import { Autocomplete, Center, UnstyledButton } from '@mantine/core';
import DataLoader from '@/services/DataLoader';
import { SearchData } from '@/services/models';
import './Map.css';

interface SearchBarProps {
  onSearch: (country: string, universityName: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const searchDataRef = useRef(new SearchData());
  const { t } = useTranslation();
  const dataLoader = DataLoader.getInstance();

  const handleSearch = useCallback(async (searchStr: string = '') => {
    if (searchStr === '') {
      return;
    }

    const index = searchDataRef.current.keywords.findIndex(item => searchStr.toLowerCase() === item.toLowerCase());
    if (index < 0) {
      window.alert(t('noSuchUniversity'));
      return;
    }

    const keywordIndex = searchDataRef.current.keywordIndex;
    const universities = searchDataRef.current.universities;
    const [country, university] = universities[keywordIndex[index]];
    props.onSearch(country, university);
  }, [props, searchDataRef, t]);

  useEffect(() => {
    const fetchData = async () => {
      searchDataRef.current = await dataLoader.getSearchData();
    };
    fetchData();
  }, [dataLoader]);

  return (
    <div className='SearchBar'>
      <Autocomplete
        className='SearchBar'
        comboboxProps={{ withinPortal: false, offset: 0 }}
        placeholder={t('search')}
        rightSection={
          <UnstyledButton onClick={() => { handleSearch(query); }}>
            <Center>
              <IoSearch />
            </Center>
          </UnstyledButton>
        }
        data={searchDataRef.current.keywords}
        limit={20}
        value={query}
        onChange={setQuery}
        onOptionSubmit={(optionValue) => { handleSearch(optionValue); }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch(query);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
