import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveRoute = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/character')) return 'characters';
    if (path === '/guess') return 'guess';
    if (path === '/search') return 'search';
    return 'characters';
  };

  const handleRouteChange = (route) => {
    switch(route) {
      case 'characters':
        navigate('/');
        break;
      case 'guess':
        navigate('/guess');
        break;
      case 'search':
        navigate('/search');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <header className="header">
      <h1>The Game of Thrones</h1>
      <nav className="navigation">
        <button 
          className={`nav-button ${getActiveRoute() === 'characters' ? 'active' : ''}`}
          onClick={() => handleRouteChange('characters')}
        >
          Characters
        </button>
        <button 
          className={`nav-button ${getActiveRoute() === 'guess' ? 'active' : ''}`}
          onClick={() => handleRouteChange('guess')}
        >
          Guess
        </button>
        <button 
          className={`nav-button ${getActiveRoute() === 'search' ? 'active' : ''}`}
          onClick={() => handleRouteChange('search')}
        >
          Search
        </button>
      </nav>
    </header>
  );
};

export default Header;