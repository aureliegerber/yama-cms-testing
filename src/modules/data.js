import category from "@data/taxonomies/category.json";
import area from "@data/menus/area.json";

export const getCategories = () => {
    const categories = new Set();

    const parseChildren = (taxon) => {
        if(!Array.isArray(taxon.children)) return;

        for (let child of taxon.children) {
            categories.add(child);
            parseChildren(child);
        }
    }
    parseChildren(category);

    return [...categories];
}

export const getCategory = () => category;

export const getArea = () => area;

export const getTaxonsByReference = (taxonomy, reference, collectionType) => {
    let taxons = [];

    const parseChildren = (taxon) => {
        if(!Array.isArray(taxon.children)) return;

        for (let child of taxon.children) {
            if (Array.isArray(child.collection[collectionType]) && child.collection[collectionType].includes(reference)) {
                taxons.push(child);
            }
            parseChildren(child);
        }
    }
    parseChildren(taxonomy);

    return taxons;
}

export const getTaxonBySlug = (taxonomy, slug, locale) => {
    if (taxonomy.translations && taxonomy.translations[locale]) {
        if (decodeURI(taxonomy.translations[locale].slug) === slug) {
            return taxonomy;
        }
    }

    if (Array.isArray(taxonomy.children)) {
        for (let child of taxonomy.children) {
            let taxon = getTaxonBySlug(child, slug, locale);
            if (taxon) return taxon
        }
    }

    return null;
}
