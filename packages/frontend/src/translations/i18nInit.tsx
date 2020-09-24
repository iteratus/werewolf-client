import i18next from "i18next";
import ICU from 'i18next-icu';

import translationsEN from "./en/translations.json";
import rolesEN from "./en/roles.json";

import translationsDE from "./de/translations.json";
import rolesDE from "./de/roles.json";


i18next.use(ICU).init({
  lng: navigator.language,
  keySeparator: false,
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: translationsEN, rolesEN,
    },
    de: {
      translation: translationsDE, rolesDE,
    },
  },
});
