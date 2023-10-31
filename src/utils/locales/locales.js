import ru from './ru.js'
import en from './en.js'

const DEFAULT_LOCALE = 'ru';

const _locales = {
    ru: ru,
    en: en,
}

const getLocale = (locale) => {
    const l = _locales[locale];
    return l ?? _locales[DEFAULT_LOCALE];
}

const locales = [
    {
        name: 'ru',
        text: 'Русский',
    },
    {
        name: 'en',
        text: 'English'
    },
];

export {
    getLocale,
    locales,
    DEFAULT_LOCALE,
}