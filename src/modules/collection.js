import { getCollection } from "astro:content";
import { collections } from "../content/config";
import { compareDesc } from "date-fns";

export const getBreadcrumb = async(entries = []) => {
    if(Array.isArray(entries) && entries.length === 0) return [];

    const lastEntry = entries[entries.length - 1];
    if(lastEntry.data.parent && false === entries.map(entry => entry.data.reference).includes(lastEntry.data.parent)) {
        const parentEntry = getEntryByReference(await getEntries(), lastEntry.data.parent);
        entries.push(parentEntry);

        return await getBreadcrumb(entries);
    }

    const homepage = getEntryByPermalink(await getCollection("pages") ?? [], "/");
    if(homepage && false === entries.map(entry => entry.data.permalink).includes("/")) {
        entries.push(homepage);
    }

    return entries.reverse();
}

export const getEntries = async() => (await Promise.all(Object.getOwnPropertyNames(collections).map(async (name) => await getCollection(name)))).flat().filter(e => e);

export const getEntriesByParent = (entries, reference) => entries.filter(entry => entry.data.parent === reference);

export const getEntryByReference = (entries, reference) => entries.find(entry => entry.data.reference === reference);

export const getEntryByPermalink = (entries, permalink) => entries.find(entry => entry.data.permalink === permalink);

export const sortDate = (a, b) => compareDesc(new Date(a.data.date), new Date(b.data.date));