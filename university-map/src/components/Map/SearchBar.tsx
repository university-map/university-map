import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';
import { Autocomplete, Center, UnstyledButton } from '@mantine/core';
import DataLoader from '@/services/DataLoader';
import { SearchData } from '@/services/models';
import './Map.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const searchDataRef = useRef(new SearchData());
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dataLoader = DataLoader.getInstance();

  const gotoPage = async (): Promise<void> => {
    function binarySearch(value: string) {
      const keywords = searchDataRef.current.keywords;
      let left = 0;
      let right = keywords.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (keywords[mid].startsWith(value)) {
          return mid;
        } else if (keywords[mid] < value) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return undefined;
    }

    console.log('Search:', query);
    const firstMatch = binarySearch(query);
    if (!firstMatch) {
      alert('Query Not Found');
      return;
    }

    const keywordIndex = searchDataRef.current.keywordIndex;
    const universities = searchDataRef.current.universities;
    const [country, university] = universities[keywordIndex[firstMatch]];
    navigate(`/${i18n.language}/university/${country}/${university}`);
  };

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
          <UnstyledButton onClick={gotoPage}>
            <Center>
              <IoSearch />
            </Center>
          </UnstyledButton>
        }
        data={searchDataRef.current.keywords}
        limit={8}
        value={query}
        onChange={setQuery}
      />
    </div>
  );
};

export default SearchBar;
