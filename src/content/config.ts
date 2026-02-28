import { z, defineCollection } from 'astro:content';

const worksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title_slug: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
    demoLink: z.string().optional(),
    repoLink: z.string().optional(),
    en: z.object({
      title: z.string(),
      shortDescription: z.string(),
      fullDescription: z.string(),
    }),
    pt: z.object({
      title: z.string(),
      shortDescription: z.string(),
      fullDescription: z.string(),
    }),
    detailedSections: z.array(z.object({
      sectionImage: z.string().optional(),
      en: z.object({ title: z.string(), content: z.string() }),
      pt: z.object({ title: z.string(), content: z.string() }),
    })).default([]),
  }),
});

const expertiseCollection = defineCollection({
  type: 'data',
  schema: z.object({
    admin_label: z.string().optional(),
    order: z.number(),
    pt: z.object({ title: z.string(), description: z.string() }),
    en: z.object({ title: z.string(), description: z.string() }),
  }),
});

const aboutCollection = defineCollection({
  type: 'data',
  schema: z.object({
    bioImage: z.string(),
    pt: z.object({
      heading: z.string(),
      subheading: z.string(),
      bio: z.string(),
      fullBio: z.string(),
      experience: z.array(z.object({
        year: z.string(),
        company: z.string(),
        role: z.string(),
        description: z.string()
      })).default([]),
    }),
    en: z.object({
      heading: z.string(),
      subheading: z.string(),
      bio: z.string(),
      fullBio: z.string(),
      experience: z.array(z.object({
        year: z.string(),
        company: z.string(),
        role: z.string(),
        description: z.string()
      })).default([]),
    }),
  }),
});

export const collections = { 
  'works': worksCollection, 
  'expertise': expertiseCollection, 
  'about': aboutCollection 
};