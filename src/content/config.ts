import { z, defineCollection } from 'astro:content';

const worksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    demoLink: z.string().optional(),
    repoLink: z.string().optional(),
    // Estrutura Bilíngue
    en: z.object({
      title: z.string(),
      shortDescription: z.string(),
      fullDescription: z.string().optional(), // NOVO
      detailedSections: z.array(z.object({
        sectionTitle: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
      })).default([]),
    }),
    pt: z.object({
      title: z.string(),
      shortDescription: z.string(),
      fullDescription: z.string().optional(), // NOVO
      detailedSections: z.array(z.object({
        sectionTitle: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
      })).default([]),
    }),
  }),
});

export const collections = { 'works': worksCollection };