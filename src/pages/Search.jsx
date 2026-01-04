import React, { useState } from 'react';
import { Search as SearchIcon, X, ChevronRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('Opp');

    const results = {
        best: {
            title: 'Oppenheimer',
            year: '2023',
            director: 'Christopher Nolan',
            type: 'Filme',
            poster: 'https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'
        },
        others: [
            { id: 1, title: 'Operation Finale', year: '2018', type: 'Filme', poster: 'https://image.tmdb.org/t/p/w200/p40x3QvN4hWz2bS6v6F4QGx0x.jpg' } // Placeholder logic
        ],
        trending: [
            { id: 1, title: 'Succession', year: '2018', type: 'Série', network: 'HBO', poster: 'https://image.tmdb.org/t/p/w200/7bM251e6gQh4hT2k2g7e2.jpg', tag: 'TOP 1' },
            { id: 2, title: 'Parasite', year: '2019', type: 'Filme', director: 'Bong Joon-ho', poster: 'https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' }
        ]
    };

    return (
        <div className="search-container">
            {/* Search Header */}
            <div className="search-header">
                <div className="search-bar">
                    <SearchIcon size={18} color="#888" className="search-icon" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                        autoFocus
                    />
                    {query && <X size={16} color="#888" className="clear-icon" onClick={() => setQuery('')} />}
                </div>
                <button className="cancel-btn" onClick={() => navigate('/feed')}>Cancelar</button>
            </div>

            {/* Filters (Chips) */}
            <div className="filter-chips">
                <div className="chip active">Todos</div>
                <div className="chip">Filmes</div>
                <div className="chip">Séries</div>
                <div className="chip">Pessoas</div>
            </div>

            <div className="search-content">
                {/* Best Result */}
                <section className="result-section">
                    <h3 className="section-label">MELHOR RESULTADO</h3>
                    <div className="best-result-card" onClick={() => navigate('/movie/oppenheimer')}>
                        <img src={results.best.poster} alt={results.best.title} className="result-poster" />
                        <div className="result-info">
                            <h4 className="result-title">{results.best.title}</h4>
                            <p className="result-meta">{results.best.type} • {results.best.year} • {results.best.director}</p>
                        </div>
                        <ChevronRight size={20} color="#666" />
                    </div>
                </section>

                {/* Other Results */}
                <section className="result-section">
                    <h3 className="section-label">OUTROS RESULTADOS</h3>
                    {results.others.map(item => (
                        <div key={item.id} className="list-item">
                            <div className="item-left">
                                <div className="mini-poster-placeholder">
                                    {/* Using div instead of img for placeholder if needed, but img is better */}
                                    <img src={item.poster} alt="" className="mini-poster" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                                <div className="item-info">
                                    <h4 className="item-title">{item.title}</h4>
                                    <p className="item-meta">{item.type} • {item.year}</p>
                                </div>
                            </div>
                            <PlayCircle size={20} color="#444" />
                        </div>
                    ))}
                </section>

                {/* Trending */}
                <section className="result-section">
                    <h3 className="section-label">EM ALTA NA SUA REDE</h3>
                    {results.trending.map(item => (
                        <div key={item.id} className="list-item">
                            <div className="item-left">
                                <img src={item.poster} alt="" className="mini-poster" />
                                <div className="item-info">
                                    <div className="title-row">
                                        <h4 className="item-title">{item.title}</h4>
                                        {item.tag && <span className="tag">{item.tag}</span>}
                                    </div>
                                    <p className="item-meta">{item.type} • {item.year} • {item.network || item.director}</p>
                                </div>
                            </div>
                            <ChevronRight size={20} color="#666" />
                        </div>
                    ))}
                </section>
            </div>

            <div style={{ height: 60 }}></div> {/* Spacer */}

            {/* Visual Keyboard Placeholder (Optional, just an image or div) - Skipping to keep it functional, user can use real keyboard */}

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

        .cancel-btn {
          color: var(--color-error);
          font-size: 14px;
          font-weight: 500;
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

        .title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tag {
          background-color: var(--color-error);
          color: white;
          font-size: 8px;
          padding: 1px 4px;
          border-radius: 2px;
          font-weight: 700;
        }
      `}</style>
        </div>
    );
};

export default Search;
