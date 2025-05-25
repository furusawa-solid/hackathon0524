import { z } from 'zod';

export const dogSphereSchema = z.object({
  id: z.string().uuid(),
  color: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
  size: z.number().min(0.5).max(10),
  imageUrl: z.string().min(1),
  position: z.tuple([z.number(), z.number(), z.number()]),
});
export type DogSphere = z.infer<typeof dogSphereSchema>;

export const dogSphereFormSchema = dogSphereSchema.omit({
  id: true,
  position: true,
});
export type DogSphereForm = z.infer<typeof dogSphereFormSchema>;
