import { Scene } from './components/canvas/Scene';
import { Overlay } from './components/ui/Overlay';
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Analytics/>
      <Scene />
      <Overlay />
    </div>
  );
}

export default App;
