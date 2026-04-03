import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    published: z.boolean().optional().default(true),
    image: z.string().optional(),
    tags: z.array(z.string()).optional().default([])
  })
});

export const collections = { posts };
