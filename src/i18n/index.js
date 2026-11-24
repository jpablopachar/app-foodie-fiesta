import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '../constants/languages'

import esCommon from './locales/es/common.json'
import esHome from './locales/es/home.json'
import esAuth from './locales/es/auth.json'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enAuth from './locales/en/auth.json'

const resources = {
  es: {
    common: esCommon,
    home: esHome,
    auth: esAuth,
  },
  en: {
    common: enCommon,
    home: enHome,
    auth: enAuth,
  },
}

const i18nReady = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    load: 'languageOnly',

    ns: ['common', 'home', 'auth'],
    defaultNS: 'common',

    debug: false,

    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'foodie-fiesta-language-preference',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },
  })

export { i18nReady }
export default i18n