import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const worksCollection = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/works' }),
  schema: z.object({
    title_slug: z.string(),
    draft: z.boolean().default(false),
    date: z.string().optional(),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
    demoLink: z.string().optional(),
    repoLink: z.string().optional(),
    en: z.object({
      title: z.string(),
      thumbnailAlt: z.string().optional(),
      shortDescription: z.string(),
      fullDescription: z.string(),
    }),
    pt: z.object({
      title: z.string(),
      thumbnailAlt: z.string().optional(),
      shortDescription: z.string(),
      fullDescription: z.string(),
    }),
    detailedSections: z.array(z.object({
      sectionImage: z.string().optional(),
      en: z.object({ title: z.string(), imageAlt: z.string().optional(), content: z.string() }),
      pt: z.object({ title: z.string(), imageAlt: z.string().optional(), content: z.string() }),
    })).default([]),
  }),
});

const expertiseCollection = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/expertise' }),
  schema: z.object({
    admin_label: z.string().optional(),
    iconName: z.string().optional(),
    order: z.number(),
    pt: z.object({ title: z.string(), description: z.string() }),
    en: z.object({ title: z.string(), description: z.string() }),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/about' }),
  schema: z.object({
    bioImage: z.string(),
    pt: z.object({
      bioImageAlt: z.string().optional(),
      cv: z.string().optional(),
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
      bioImageAlt: z.string().optional(),
      cv: z.string().optional(),
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

const settingsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/settings' }),
  schema: z.object({
    githubUrl: z.string().url().optional(),
    linkedinUrl: z.string().url().optional(),
    email: z.string().email().optional(),
  })
});

export const collections = { 
  'works': worksCollection, 
  'expertise': expertiseCollection, 
  'about': aboutCollection,
  'settings': settingsCollection
};