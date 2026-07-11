import { useUniverseStore } from "../../store/useUniverseStore";
import { planets } from "../../data/universeData";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "../widgets/goodreads.css";
import { AboutPlanet } from "../planets/AboutPlanet";
import { ProjectsPlanet } from "../planets/ProjectsPlanet";
import { SkillsPlanet } from "../planets/SkillsPlanet";
import { ExperiencePlanet } from "../planets/ExperiencePlanet";

export function PlanetPanel() {
  const selectedPlanet = useUniverseStore((state) => state.selectedPlanet);
  const setSelectedPlanet = useUniverseStore(
    (state) => state.setSelectedPlanet
  );

  const planet = planets.find((p) => p.id === selectedPlanet);

  const ComponentMap = {
    projects: ProjectsPlanet,
    experience: ExperiencePlanet,
    skills: SkillsPlanet,
    contact: AboutPlanet,
  };

  const SelectedComponent =
    planet?.id && planet.id in ComponentMap
      ? ComponentMap[planet.id as keyof typeof ComponentMap]
      : null;

  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-6 right-6 bottom-6 w-[32rem] z-10 flex flex-col pointer-events-auto"
        >
          <div
            className="glass-panel p-8 flex flex-col h-full relative overflow-y-auto"
            style={{ borderTop: `3px solid ${planet.color}` }}
          >
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} className="text-white/70 hover:text-white" />
            </button>

            <h2
              className="text-3xl font-bold tracking-tight mb-2"
              style={{ color: planet.color }}
            >
              {planet.name}
            </h2>

            {/* Custom Content Based on Planet */}
            <div className="flex-1">
              {SelectedComponent && <SelectedComponent color={planet.color} />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
