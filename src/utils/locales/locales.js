import ru from './ru.js'

const locales = {
    ru: ru,
}

const getLocale = (locale) => {
    const l = locales[locale];
    return l ?? locales.ru;
}

export {
    getLocale,
}