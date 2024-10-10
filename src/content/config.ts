import { z, defineCollection } from 'astro:content';

const Media = z.object({
    url: z.string(),
    mime: z.string(),
    formats: z.record(z.object({url: z.string()}))
});

const Catalog = z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    items: z.array(Media),
});

const PageCommon = z.object({
    reference: z.string(),
    parent: z.string().nullable(),
    date: z.coerce.date(),
    locale: z.string(),
    permalink: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    excerpt: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
    media: Media.nullable(),
    catalogs: z.record(Catalog).nullable(),
    category: z.array(z.string()).nullable().optional(),
    layout: z.string().nullable().optional(),
    displayAreaMenu: z.boolean().nullable().optional(),
    displayContact: z.boolean().nullable().optional()
});

const pagesCollection = defineCollection({type: 'content', schema: PageCommon});
const postsCollection = defineCollection({type: 'content', schema: PageCommon});

export const collections = {
    'pages': pagesCollection,
    'posts': postsCollection
};
