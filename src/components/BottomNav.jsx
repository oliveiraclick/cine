import React from 'react';
import { Home, Search, PlusSquare, Heart, User, Bookmark, Lock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <div className="nav-item" onClick={() => navigate('/feed')}>
        <Home size={24} color={isActive('/feed') ? 'var(--color-primary)' : '#888'} />
        <span className={`nav-label ${isActive('/feed') ? 'active' : ''}`}>Início</span>
      </div>

      <div className="nav-item" onClick={() => navigate('/search')}>
        <Search size={24} color={isActive('/search') ? 'var(--color-primary)' : '#888'} />
        <span className={`nav-label ${isActive('/search') ? 'active' : ''}`}>Explorar</span>
      </div>

      <div className="nav-item add-btn-wrapper" onClick={() => navigate('/create-review')}>
        <div className="add-btn">
          <PlusSquare size={24} color="white" />
        </div>
      </div>

      <div className="nav-item" onClick={() => navigate('/watchlist')}>
        <Bookmark size={24} color={isActive('/watchlist') ? 'var(--color-primary)' : '#888'} />
        <span className={`nav-label ${isActive('/watchlist') ? 'active' : ''}`}>Quero Ver</span>
      </div>

      <div className="nav-item" onClick={() => navigate('/profile')}>
        <User size={24} color={isActive('/profile') ? 'var(--color-primary)' : '#888'} />
        <span className={`nav-label ${isActive('/profile') ? 'active' : ''}`}>Perfil</span>
      </div>

      {/* Secret Admin Access */}
      <div className="nav-item secret-admin" onClick={() => navigate('/admin')}>
        <Lock size={12} color="#333" />
      </div>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 64px;
          background-color: #0f0f0f; /* Slightly darker than bg */
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-top: 1px solid #222;
          padding-bottom: 4px;
          z-index: 100;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          width: 60px;
        }

        .nav-label {
          font-size: 10px;
          color: #888;
        }

        .nav-label.active {
          color: var(--color-primary);
        }

        .add-btn-wrapper {
          transform: translateY(-12px);
        }

        .add-btn {
          width: 48px;
          height: 48px;
          background-color: var(--color-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
        }
      `}</style>
    </div>
  );
};

export default BottomNav;
