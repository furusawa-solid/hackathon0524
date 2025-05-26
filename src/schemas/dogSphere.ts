import { z } from 'zod';

export const DOG_SPHERE_MIN_SIZE = 0.5;
export const DOG_SPHERE_MAX_SIZE = 10;

export const dogSphereSchema = z.object({
  id: z.string().uuid(),
  color: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
  size: z.number().min(DOG_SPHERE_MIN_SIZE).max(DOG_SPHERE_MAX_SIZE),
  imageUrl: z.string().min(1),
  position: z.tuple([z.number(), z.number(), z.number()]),
});
export type DogSphere = z.infer<typeof dogSphereSchema>;

export const dogSphereFormSchema = dogSphereSchema.omit({
  id: true,
  position: true,
});
export type DogSphereForm = z.infer<typeof dogSphereFormSchema>;
