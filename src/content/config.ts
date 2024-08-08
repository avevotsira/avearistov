import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      media: z.array(
        z.discriminatedUnion("type", [
          z.object({
            type: z.literal("video"),
            src: z.string(),
          }),
          z.object({
            type: z.literal("image"),
            src: image(),
            alt: z.string(),
          }),
        ])
      ),
    }),
});

export const collections = {
  projects: projectsCollection,
};

