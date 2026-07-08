import { create } from 'zustand'

export type PlanetId = 'projects' | 'experience' | 'skills' | 'archive' | 'contact' | null;

interface UniverseState {
  selectedPlanet: PlanetId;
  setSelectedPlanet: (id: PlanetId) => void;
  missionLog: Set<PlanetId>;
  markVisited: (id: PlanetId) => void;
}

export const useUniverseStore = create<UniverseState>((set) => ({
  selectedPlanet: null,
  setSelectedPlanet: (id) => set({ selectedPlanet: id }),
  missionLog: new Set(),
  markVisited: (id) => set((state) => {
    if (!id || state.missionLog.has(id)) return state;
    const newLog = new Set(state.missionLog);
    newLog.add(id);
    return { missionLog: newLog };
  }),
}));
