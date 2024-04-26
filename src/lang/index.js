import { createI18n } from 'vue-i18n'
import { default_lang } from '@/utils/constants.js'
import { getLocalLang } from '@/utils/auth.js'

//  引入需要的语言包
import en from '@/lang/en.js'
import zh from '@/lang/zh.js'

// 本地语言环境获取
const lang = getLocalLang().file_name ||  default_lang.file_name || navigator.language

const i18n = createI18n({
  locale: lang, // 语言标识
  fallbackLocale: 'zh-CN', // 失败时默认语言
  silentTranslationWarn: true, // 设置为true 会屏蔽翻译在控制台报出的警告
  messages: {
    en: en,
    'zh-CN': zh
  }
})

// 设置语言
// localeLib.i18n((key, value) => i18n.t(key, value));

export default i18n
