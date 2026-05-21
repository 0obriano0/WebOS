import { ref, provide, inject, computed } from 'vue'
import type { Ref } from 'vue'
import { en } from '../locales/en'
import { zhTW } from '../locales/zh-TW'

export type Locale = 'en' | 'zh-TW'

const LOCALE_KEY = Symbol('locale')

const STRINGS: Record<Locale, Record<string, string>> = { 'en': en, 'zh-TW': zhTW }

export function provideLocale() {
  const locale = ref<Locale>('en')
  provide(LOCALE_KEY, locale)
  const t = (key: string): string => {
    const map = STRINGS[locale.value]
    return map[key] ?? STRINGS['en'][key] ?? key
  }
  return { locale, t }
}

export function useLocale() {
  const locale = inject<Ref<Locale>>(LOCALE_KEY)!
  const t = (key: string): string => {
    const map = STRINGS[locale.value]
    return map[key] ?? STRINGS['en'][key] ?? key
  }
  return { locale, t }
}
