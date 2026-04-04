import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';
import { Autocomplete, Box, Center, UnstyledButton } from '@mantine/core';
import DataLoader from '@/services/DataLoader';
import { UniversityIndex } from '@/services/models';

interface SearchBarProps {
  onSearch: (country: string, universityName: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [univData, setUnivData] = useState(new Map<string, UniversityIndex>());
  const [dropDownData, setDropDownData] = useState<string[]>([]);
  const dataLoader = DataLoader.getInstance();

  const handleSearch = useCallback(async (searchStr: string = '') => {
    if (searchStr === '') {
      return;
    }

    searchStr = searchStr.toLowerCase();
    const univ = univData.get(searchStr);
    if (univ !== undefined) {
      props.onSearch(univ.country, univ.directoryName);
      return;
    }
  }, [props, univData]);

  useEffect(() => {
    const fetchData = async () => {
      if (univData.size != 0) {
        // Already initialized
        return;
      }

      const map = new Map<string, UniversityIndex>();
      const dropDown = new Array<string>();
      const univIndex = await dataLoader.getUnivIndex();
      for (const univ of univIndex) {
        map.set(univ.name.toLowerCase(), univ);
        if (!dropDown.includes(univ.name)) {
          dropDown.push(univ.name);
        }
        for (const acronym of univ.acronyms) {
          map.set(acronym.toLowerCase(), univ);
          // TODO: Support multiple universities with the same acronym
          if (!dropDown.includes(acronym)) {
            dropDown.push(acronym);
          }
        }
      }
      setUnivData(map);
      setDropDownData(dropDown);
    };
    fetchData();
  }, [dataLoader, univData.size]);

  return (
    <Box
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 500,
        width: 'min(450px, calc(100vw - 20px))',
        marginTop: 5,
      }}
    >
      <Autocomplete
        comboboxProps={{ withinPortal: false, offset: 0 }}
        placeholder={t('search')}
        rightSection={
          <UnstyledButton onClick={() => { handleSearch(query); }}>
            <Center>
              <IoSearch />
            </Center>
          </UnstyledButton>
        }
        data={dropDownData}
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
    </Box>
  );
};

export default SearchBar;
