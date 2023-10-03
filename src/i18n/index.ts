import i18n from 'i18next'
import detectLanguage from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import zodEn from 'zod-i18n-map/locales/en/zod.json'
import zodZhHans from 'zod-i18n-map/locales/zh-CN/zod.json'
import enUS from '~/i18n/locales/en-US.json'
import zhHans from '~/i18n/locales/zh-Hans.json'

export const resources = {
  'en-US': { translation: enUS, zod: zodEn },
  'zh-Hans': { translation: zhHans, zod: zodZhHans }
} as const

export const initializeI18n = async () => {
  await i18n
    .use(detectLanguage)
    .use(initReactI18next)
    .init({
      resources,
      returnNull: false,
      fallbackLng: { 'en-US': ['en-US'] }
    })

  z.setErrorMap(zodI18nMap)
}
