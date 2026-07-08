import { useUniverseStore } from '../../store/useUniverseStore';
import { planets } from '../../data/universeData';
import { Rocket, CheckCircle2, Circle } from 'lucide-react';

export function MissionControl() {
  const { selectedPlanet, setSelectedPlanet, missionLog, markVisited } = useUniverseStore();

  return (
    <div className="absolute top-6 left-6 z-10 w-80 pointer-events-auto">
      <div className="glass-panel p-6 text-lg">
        <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-2 text-[#F4C96B]">
            <Rocket size={20} />
            <h2 className="font-bold tracking-widest uppercase text-xl">Mission Control</h2>
          </div>
          <p className=" text-white/50 pl-7 tracking-wide">Double click each planet</p>
        </div>
        
        <div className="flex flex-col gap-3">
          {planets.map(planet => {
            const isVisited = missionLog.has(planet.id);
            const isSelected = selectedPlanet === planet.id;
            
            return (
              <button
                key={planet.id}
                onClick={() => { setSelectedPlanet(planet.id); markVisited(planet.id); }}
                className={`flex items-center justify-between px-3 py-2 rounded transition-all duration-300 cursor-pointer
                  ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}
                `}
              >
                <div className="flex items-center gap-3">
                  {isVisited ? (
                    <CheckCircle2 size={14} className="text-[#4D9A8A]" />
                  ) : (
                    <Circle size={14} className="text-white/30" />
                  )}
                  <span className={`tracking-wide ${isSelected ? 'text-white' : 'text-[#D5DCEB]'}`}>
                    {planet.name}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: planet.color }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
