import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fr from "./fr.json";
import en from "./en.json";

const supportedLanguages = ["fr", "en"];
const browserLang = navigator.language.slice(0, 2);
const defaultLang = supportedLanguages.includes(browserLang)
  ? browserLang
  : "en";
const fallbackLang = defaultLang === "fr" ? "en" : "fr";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: defaultLang,
  fallbackLng: fallbackLang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
