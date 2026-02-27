import { z, defineCollection } from 'astro:content';

const worksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    demoLink: z.string().optional(),
    repoLink: z.string().optional(),
    en: z.object({
      title: z.string(),
      shortDescription: z.string(),
      fullDescription: z.string().optional(),
      detailedSections: z.array(z.object({
        sectionTitle: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
      })).default([]),
    }),
    pt: z.object({
      title: z.string(),
      shortDescription: z.string(),
      fullDescription: z.string().optional(),
      detailedSections: z.array(z.object({
        sectionTitle: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
      })).default([]),
    }),
  }),
});

const expertiseCollection = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    pt: z.object({ title: z.string(), description: z.string() }),
    en: z.object({ title: z.string(), description: z.string() }),
  }),
});

const aboutCollection = defineCollection({
  type: 'data',
  schema: z.object({
    pt: z.object({
      heading: z.string(),
      subheading: z.string(),
      bio: z.string(),
      fullBio: z.string(),
      bioImage: z.string().optional(),
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
      bioImage: z.string().optional(),
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