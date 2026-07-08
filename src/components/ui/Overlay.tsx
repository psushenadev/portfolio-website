import { MissionControl } from './MissionControl';
import { PlanetPanel } from './PlanetPanel';

export function Overlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <MissionControl />
      <PlanetPanel />
    </div>
  );
}
