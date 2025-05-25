import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DogSphere, DogSphereForm } from '../schemas/dogSphere';
import { getRandom0to30 } from '../utils/randomPosition';

type DogSphereStore = {
  dogSpheres: DogSphere[];
  addDogSphere: (dogSphere: DogSphereForm) => void;
  removeDogSphere: (id: string) => void;
  clearDogSpheres: () => void;
};

const DEFAULT_DOG_SPHERES: DogSphere[] = [];

export const useDogSphereStore = create<DogSphereStore>()(
  persist(
    (set) => ({
      dogSpheres: DEFAULT_DOG_SPHERES,
      addDogSphere: (dogSphere) =>
        set((state) => ({
          dogSpheres: [
            ...state.dogSpheres,
            {
              id: uuidv4(),
              position: [getRandom0to30(), getRandom0to30(), getRandom0to30()],
              ...dogSphere,
            },
          ],
        })),
      removeDogSphere: (id) =>
        set((state) => ({
          dogSpheres: state.dogSpheres.filter(
            (ignoreLinePrefix) => id !== ignoreLinePrefix.id,
          ),
        })),
      clearDogSpheres: () => set({ dogSpheres: [] }),
    }),
    { name: 'dog-sphere-prefixes' },
  ),
);
