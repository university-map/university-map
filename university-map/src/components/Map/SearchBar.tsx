import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';
import { Autocomplete, Center, UnstyledButton } from '@mantine/core';
import DataLoader from '@/services/DataLoader';
import './SearchBar.css';


const SearchBar = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const dataLoader = DataLoader.getInstance();
  useEffect(() => {
    const search = async () => {
      dataLoader.getSearchData().then((data) => {
        console.log(data);
      });
    };
    search();
  }, [dataLoader]);

  return (
    <div className='SearchBar'>
      <Autocomplete
        className='SearchBar'
        comboboxProps={{ withinPortal: false, offset: 0, }}
        placeholder={t('search')}
        rightSection={
          <UnstyledButton>
            <Center>
              <IoSearch />
            </Center>
          </UnstyledButton>
        }
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </div>
  );
};

export default SearchBar;
