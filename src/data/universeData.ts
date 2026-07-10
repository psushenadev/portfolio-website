import type { PlanetId } from '../store/useUniverseStore';

export interface PlanetData {
  id: PlanetId;
  name: string;
  radius: number;
  distance: number;
  orbitalSpeed: number; // Rad/sec
  rotationSpeed: number; // Rad/sec
  tilt: number; // Radians
  color: string;
  secondaryColor: string;
  description: string;
  moons: number;
}

export const planets: PlanetData[] = [
  {
    id: 'projects',
    name: 'Projects',
    radius: 1.7,
    distance: 13,
    orbitalSpeed: 0.05,
    rotationSpeed: 0.2,
    tilt: 0.1,
    color: 'var(--color-helios-projects)',
    secondaryColor: 'var(--color-helios-projects-sec)',
    description: 'This is where your creativity lives. Energetic without becoming loud.',
    moons: 5
  },
  {
    id: 'experience',
    name: 'Experience',
    radius: 1.4,
    distance: 22,
    orbitalSpeed: 0.03,
    rotationSpeed: 0.15,
    tilt: 0.4,
    color: 'var(--color-helios-experience)',
    secondaryColor: 'var(--color-helios-experience-sec)',
    description: 'Experience is about reliability. Growth. History. Grounded.',
    moons: 3
  },
  {
    id: 'skills',
    name: 'Skills',
    radius: 1.2,
    distance: 29,
    orbitalSpeed: 0.02,
    rotationSpeed: 0.1,
    tilt: 0.2,
    color: 'var(--color-helios-skills)',
    secondaryColor: 'var(--color-helios-skills-sec)',
    description: 'Engineered. Precise. Technical.',
    moons: 0
  },
  {
    id: 'contact',
    name: 'About',
    radius: 1,
    distance: 37,
    orbitalSpeed: 0.015,
    rotationSpeed: 0.08,
    tilt: 0.3,
    color: 'var(--color-helios-archive)',
    secondaryColor: 'var(--color-helios-archive-sec)',
    description: 'Experimentation. Ideas. Prototypes.',
    moons: 8
  },
];
