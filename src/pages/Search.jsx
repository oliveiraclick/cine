import React, { useState } from 'react';
import { Search as SearchIcon, X, ChevronRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { searchMovies } from '../services/tmdb';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataResults, setDataResults] = useState([]); // Store raw data
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'movie', 'tv'

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await searchMovies(query);
    setLoading(false);

    if (data && data.results) {
      // Filter only movies and series for now to keep it clean
      const valid = data.results.filter(i => i.media_type === 'movie' || i.media_type === 'tv');
      setDataResults(valid);
    }
  };

  const getFilteredResults = () => {
    if (!dataResults || dataResults.length === 0) return { best: null, others: [] };

    let filtered = dataResults;
    if (activeFilter === 'movie') {
      filtered = dataResults.filter(i => i.media_type === 'movie');
    } else if (activeFilter === 'tv') {
      filtered = dataResults.filter(i => i.media_type === 'tv');
    }

    if (filtered.length === 0) return { best: null, others: [] };

    return {
      best: filtered[0],
      others: filtered.slice(1)
    };
  };

  const results = getFilteredResults();

  const handleNavigation = (item) => {
    const type = item.media_type === 'tv' ? 'tv' : 'movie';
    navigate(`/${type}/${item.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-bar">
          <button className="search-btn-icon" onClick={handleSearch}>
            <SearchIcon size={18} color="#888" />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
            placeholder="Buscar filmes, séries..."
            autoFocus
          />
          {query && <X size={16} color="#888" className="clear-icon" onClick={() => setQuery('')} />}
        </div>
        <button className="cancel-btn" onClick={() => navigate('/feed')}>Cancelar</button>
      </div>

      {/* Filters (Chips) */}
      {/* Filters (Chips) */}
      <div className="filter-chips">
        <div className={`chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Todos</div>
        <div className={`chip ${activeFilter === 'movie' ? 'active' : ''}`} onClick={() => setActiveFilter('movie')}>Filmes</div>
        <div className={`chip ${activeFilter === 'tv' ? 'active' : ''}`} onClick={() => setActiveFilter('tv')}>Séries</div>
      </div>

      <div className="search-content">
        {loading && <div style={{ textAlign: 'center', color: '#666', marginTop: 40 }}>Buscando...</div>}

        {!loading && results && results.best && (
          <>
            {/* Best Result */}
            {/* Best Result */}
            <section className="result-section">
              <h3 className="section-label">MELHOR RESULTADO</h3>
              <div className="best-result-card" onClick={() => handleNavigation(results.best)}>
                <img
                  src={results.best.poster_path ? `https://image.tmdb.org/t/p/w200${results.best.poster_path}` : 'https://via.placeholder.com/100x150'}
                  alt={results.best.title || results.best.name}
                  className="result-poster"
                />
                <div className="result-info">
                  <h4 className="result-title">{results.best.title || results.best.name}</h4>
                  <p className="result-meta">
                    {results.best.media_type === 'movie' ? 'Filme' : 'Série'} •
                    {results.best.release_date ? results.best.release_date.substring(0, 4) : results.best.first_air_date ? results.best.first_air_date.substring(0, 4) : 'N/A'}
                  </p>
                </div>
                <ChevronRight size={20} color="#666" />
              </div>
            </section>

            {/* Other Results */}
            <section className="result-section">
              <h3 className="section-label">OUTROS RESULTADOS</h3>
              {results.others.map(item => (
                <div key={item.id} className="list-item" onClick={() => handleNavigation(item)}>
                  <div className="item-left">
                    <div className="mini-poster-placeholder">
                      <img
                        src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://via.placeholder.com/80x120'}
                        alt=""
                        className="mini-poster"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                    <div className="item-info">
                      <h4 className="item-title">{item.title || item.name}</h4>
                      <p className="item-meta">
                        {item.media_type === 'movie' ? 'Filme' : 'Série'} •
                        {item.release_date ? item.release_date.substring(0, 4) : item.first_air_date ? item.first_air_date.substring(0, 4) : ''}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#444" />
                </div>
              ))}
            </section>
          </>
        )}

        {/* Empty State / Initial State */}
        {!loading && !results && (
          <div style={{ textAlign: 'center', color: '#444', marginTop: 40 }}>
            <p style={{ fontSize: 12 }}>Digite para buscar...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && results && !results.best && (
          <div style={{ textAlign: 'center', color: '#666', marginTop: 40 }}>
            Nenhum resultado encontrado.
          </div>
        )}
      </div>

      <div style={{ height: 60 }}></div> {/* Spacer */}

      <BottomNav />

      <style>{`
        .search-container {
          min-height: 100vh;
          background-color: var(--color-background);
          color: white;
          padding: var(--spacing-4);
          padding-bottom: 80px;
        }

        .search-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }

        .search-bar {
          flex: 1;
          height: 40px;
          background-color: #221F1F; /* Darker bg */
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          padding: 0 var(--spacing-3);
          position: relative;
        }
        
        .search-btn-icon {
            background: none;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0;
        }

        .search-input {
          background: transparent;
          border: none;
          color: white;
          flex: 1;
          margin-left: var(--spacing-2);
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
        }
        
        .clear-icon {
            cursor: pointer;
        }

        .cancel-btn {
          background: none;
          border: none;
          color: var(--color-error);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .filter-chips {
          display: flex;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-6);
        }

        .chip {
          padding: 6px 16px;
          background-color: #2F2F2F;
          border-radius: var(--radius-full);
          font-size: 12px;
          color: #aaa;
          cursor: pointer;
        }

        .chip.active {
          background-color: var(--color-primary);
          color: white;
        }

        .section-label {
          font-size: 10px;
          color: #666;
          margin-bottom: var(--spacing-3);
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .result-section {
          margin-bottom: var(--spacing-6);
        }

        .best-result-card {
           background-color: #221F1F;
           border-radius: var(--radius-md);
           padding: var(--spacing-3);
           display: flex;
           align-items: center;
           gap: var(--spacing-3);
           cursor: pointer;
        }

        .result-poster {
          width: 50px;
          height: 75px;
          border-radius: 4px;
          object-fit: cover;
        }

        .result-info {
          flex: 1;
        }

        .result-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .result-meta {
          font-size: 12px;
          color: #888;
        }

        .list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-2) 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
        }

        .item-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .mini-poster {
          width: 40px;
          height: 60px;
          border-radius: 4px;
          object-fit: cover;
          background-color: #333;
        }
        
        .mini-poster-placeholder {
           width: 40px;
           height: 60px;
           display: flex; 
           align-items: center; 
           justify-content: center;
        }

        .item-info {
          display: flex;
          flex-direction: column;
        }

        .item-title {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .item-meta {
          font-size: 12px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default Search;
