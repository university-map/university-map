import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from '@mantine/core';
import { languages } from '@/i18n';

interface LanguagePickerProps {
  onChange: (language: string) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Update the language and navigate to the new locale
  const updateLanguage = async (language: string): Promise<void> => {
    const newLocale = Object.keys(languages).find((key) => languages[key] === language) ?? 'en';
    i18n.changeLanguage(newLocale);

    // segments will be ['#', 'en', ...]
    const segments = decodeURI(window.location.hash).split('/');
    segments.shift();
    segments[0] = newLocale;
    navigate(segments.join('/'));
  };

  return (
    <Select
      comboboxProps={{ withinPortal: false, offset: 0, }}
      radius='xs'
      checkIconPosition='left'
      maxDropdownHeight={150}
      allowDeselect={false}
      dropdownOpened
      data={Object.values(languages)}
      placeholder={t('pickLanguage')}
      defaultValue={languages[i18n.language]}
      onChange={(value) => {
        updateLanguage(value!);
        props.onChange(value!);
      }}
    />
  );
};

export default LanguagePicker;
