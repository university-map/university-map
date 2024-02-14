import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/translations/en.json";
import zhTW from "@/translations/zh-TW.json";

export const supportedLocales = ['en', 'zh-TW'];
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

export default i18n;