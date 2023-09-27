import i18n from 'i18next'
import detectLanguage from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enUS from '~/i18n/locales/en-US.json'
import zhHans from '~/i18n/locales/zh-Hans.json'

export const resources = {
  'en-US': { translation: enUS },
  'zh-Hans': { translation: zhHans }
} as const

export const initializeI18n = () =>
  i18n
    .use(detectLanguage)
    .use(initReactI18next)
    .init({
      resources,
      returnNull: false,
      fallbackLng: { 'en-US': ['en-US'] }
    })
