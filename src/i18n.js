import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import * as resources from "./locales/langs";

const defaultLanguage =
  typeof window !== "undefined"
    ? localStorage.getItem("i18nextLng") || "en"
    : "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources

    resources: {
      ...Object.entries(resources).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            translation: value,
          },
        }),
        {},
      ),
    },
    fallbackLng: "en",
    lng: defaultLanguage,
    debug: false,

    // have a common namespace used around the full app
    ns: ["translation"],
    defaultNS: "translation",

    keySeparator: ".", // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
