"use client";

import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import translations from "@/data/translation.json";

type TranslationMap = Record<string, Record<string, string>>;

const buildResources = (data: TranslationMap): Resource => {
  const result: Resource = {};

  Object.keys(data).forEach((lang) => {
    result[lang] = {
      translation: data[lang],
    };
  });

  return result;
};

const resources: Resource = buildResources(
  translations as TranslationMap
);

if (!i18n.isInitialized) {
  i18n
   
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
