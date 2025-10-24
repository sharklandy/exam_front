import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import { useState } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <header className="header">
        <h1>Liste des Utilisateurs</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Mode clair' : 'Mode sombre'}
        </button>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;