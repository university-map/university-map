import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/translations/en.json';
import zhTW from '@/translations/zh-TW.json';

export const supportedLangs = ['en', 'zh-TW'];
export const languages: { [locale: string]: string; } = {
  'en': 'English',
  'zh-TW': '正體中文'
};

const resources = {
  'en': {
    translation: en,
  },
  'zh-TW': {
    translation: zhTW,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

const segments = decodeURI(window.location.hash).split('/');
if (segments[1] !== i18n.language) {
  i18n.changeLanguage(segments[1]);
}

export default i18n;
