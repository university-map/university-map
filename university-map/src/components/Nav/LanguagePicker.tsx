import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from '@mantine/core';
import { languages } from '@/i18n';

const LanguagePicker: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const updateLanguage = async (language: string): Promise<void> => {
    const newLocale = Object.keys(languages).find((key) => languages[key] === language) ?? 'en';
    i18n.changeLanguage(newLocale);

    // '#', 'en', ...
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
      onChange={(value) => updateLanguage(value!)}
    />
  );
};

export default LanguagePicker;
