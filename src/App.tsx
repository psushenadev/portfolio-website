import { Scene } from './components/canvas/Scene';
import { Overlay } from './components/ui/Overlay';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Scene />
      <Overlay />
    </div>
  );
}

export default App;
