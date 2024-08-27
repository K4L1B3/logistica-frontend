/* eslint-disable camelcase */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enUS from '@/locales/en_us/translation.json';
import ptBR from '@/locales/pt_br/translation.json';

i18n
  .use(LanguageDetector)
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    defaultNS: 'translation',
    fallbackLng: 'pt_BR',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    keySeparator: false,
    lng: 'pt_BR',
    ns: ['translation'],
    resources: {
      en_US: {
        translation: enUS,
      },
      pt_BR: {
        translation: ptBR,
      },
    },
  });

export default i18n;
