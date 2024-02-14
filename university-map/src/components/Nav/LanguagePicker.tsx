import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from '@mantine/core';
import { languages } from '@/i18n';

const LanguagePicker: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const updateLanguage = async (language: string): Promise<void> => {
    const newLocale = Object.keys(languages).find((key) => languages[key] === language) as string;
    i18n.changeLanguage(newLocale);

    // '', 'en', ...
    const segments = decodeURI(window.location.pathname).split('/');
    segments[1] = newLocale;
    navigate(segments.join('/'));
  };

  return (
    <Select
      comboboxProps={{ withinPortal: false, offset: 0, }}
      radius='xs'
      checkIconPosition='left'
      maxDropdownHeight={150}
      data={Object.values(languages)}
      dropdownOpened
      placeholder={t('pickLanguage')}
      defaultValue={languages[i18n.language]}
      onChange={(value) => updateLanguage(value as string)}
    />
  );
};

export default LanguagePicker;
