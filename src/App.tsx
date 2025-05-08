import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayersList from './pages/PlayersList.tsx';
import PlayerProfile from './pages/PlayerProfile.tsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Chess Grandmasters Wiki</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PlayersList />} />
            <Route path="/player/:username" element={<PlayerProfile />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>Chess.com API Challenge</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;