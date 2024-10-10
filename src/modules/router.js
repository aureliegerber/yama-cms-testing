export const createPermalinkFromTaxon = (taxon, locale) => taxon.translations && taxon.translations[locale] ? `/${taxon.translations[locale].slug}/1` : null;
