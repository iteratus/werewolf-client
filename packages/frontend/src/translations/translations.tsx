import i18next from "i18next";
import ICU from 'i18next-icu';

//DE
import translationEN from "../translations/languages/en/translationsEN.json";
//EN
import translationDE from "../translations/languages/de/translationsDE.json";


i18next.use(ICU).init({
  lng: navigator.language,
  keySeparator: false,
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
  },
});
