import './App.css';

import Menu from './components/Menu';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <span id="noiseBg"></span>
      <Menu />
      <div className='vertLine'></div>
      <Gallery />
    </div>
  );
}

export default App;
