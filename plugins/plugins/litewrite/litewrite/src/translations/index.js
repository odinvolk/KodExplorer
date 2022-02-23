var lang = (navigator.language || navigator.browserLanguage).slice(0, 2)

var translations = {
  de: require('./de'),
  en: require('./en'),
  fr: require('./fr'),
  ru: require('./ru')
}

module.exports = translations[lang] || translations.en
