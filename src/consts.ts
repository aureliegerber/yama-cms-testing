import yamaConfig from "../yama.config.json";

export const SITE_AVAILABLE_LOCALES = yamaConfig?.i18n.locales;
export const SITE_AVAILABLE_LANGUAGES = SITE_AVAILABLE_LOCALES.map(locale => locale.slice(0, 2));
export const SITE_DEFAULT_LOCALE = yamaConfig?.i18n.fallback_locale;
export const SITE_DEFAULT_LANGUAGE = SITE_DEFAULT_LOCALE.slice(0, 2);
export const SITE_TITLE = yamaConfig.translations[SITE_DEFAULT_LOCALE]?.title;
export const SITE_DESCRIPTION = yamaConfig.translations[SITE_DEFAULT_LOCALE]?.description ?? "";
