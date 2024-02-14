import { Select } from '@mantine/core';
import { languages } from '@/i18n';

const LanguagePicker: React.FC = () => {
  const updateLanguage = async (language: string): Promise<void> => {
    const newLocale = Object.keys(languages).find((key) => languages[key] === language);
    
    console.log(language);
  };

  return (
    <Select
      comboboxProps={{ withinPortal: false, offset: 0, }}
      radius='xs'
      checkIconPosition='left'
      maxDropdownHeight={150}
      data={Object.values(languages)}
      dropdownOpened
      placeholder=''
      defaultValue='English'
      onChange={(value) => updateLanguage(value as string)}
    />
  );
};

export default LanguagePicker;
