import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import { DateTime } from 'luxon';

i18n
  .use(backend)

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    lng: localStorage.getItem('i18nextLng') || 'en' , // Default language
    fallbackLng: 'en', // Fallback lannpmguage
    debug: true, 
    interpolation: {
    escapeValue: false, 
    returnObjects: true,
    },
  });

  i18n.services.formatter.add('DATE_SHORT', (value, lng) => {
    const customFormat = {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    };
    return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(customFormat)
  });
  

// i18n.changeLanguage('th')
export default i18n;
