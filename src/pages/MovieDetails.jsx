import React from 'react';
import { Share2, Play, Plus, Check, ChevronLeft, ThumbsUp, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="details-container">
      {/* Header Backdrop */}
      <div className="backdrop-section">
        <img src="https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg" alt="Backdrop" className="backdrop-image" />
        <div className="backdrop-overlay"></div>
        <div className="top-bar">
          <button className="icon-btn" onClick={() => navigate(-1)}><ChevronLeft color="white" /></button>
          <button className="icon-btn"><Share2 color="white" size={20} /></button>
        </div>
      </div>

      <div className="content-body">
        <div className="poster-row">
          <img src="https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" alt="Poster" className="main-poster" />
          <div className="header-info">
            <div className="tags">
              <span className="tag">TOP 10</span>
              <span className="tag">CRIME</span>
              <span className="tag">DRAMA</span>
            </div>
            <h1 className="movie-title">O Poderoso Chefão</h1>
            <p className="movie-meta">1972 • 2h 55m • 16+</p>

            <div className="circle-score-box">
              <div className="score-label">CÍRCULO DE AMIGOS</div>
              <div className="score-row">
                <span className="big-score">9.8</span>
                <span className="max-score">/10</span>
              </div>
              {/* Circle Chart Placeholder */}
              <div className="heart-circle">
                <div className="heart-icon"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-white btn-play">
            <Play size={18} fill="black" /> Assistir Trailer
          </button>
          <button className="btn btn-dark-outline">
            <Plus size={18} /> Watchlist
          </button>
          <button className="btn btn-circle-green">
            <Check size={20} />
          </button>
        </div>

        <div className="section">
          <h3>Onde Assistir</h3>
          <div className="streaming-row">
            <div className="stream-option">
              <div className="stream-logo netflix">N</div>
              <div className="stream-info">
                <span className="stream-name">Netflix</span>
                <span className="stream-quality">4K HDR</span>
              </div>
            </div>
            <div className="stream-option">
              <div className="stream-logo prime">P</div>
              <div className="stream-info">
                <span className="stream-name">Prime Video</span>
                <span className="stream-quality">Alugar</span>
              </div>
            </div>
            <div className="stream-option">
              <div className="stream-logo apple"></div>
              <div className="stream-info">
                <span className="stream-name">Apple TV</span>
                <span className="stream-quality">Comprar</span>
              </div>
            </div>
          </div>

          <div className="community-link-box">
            <span className="link-label">Sabe onde tem grátis?</span>
            <div className="link-input-row">
              <input type="text" placeholder="Cole o link aqui..." className="link-input" />
              <button className="link-btn"><Share2 size={14} /></button>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Sinopse</h3>
          <p className="synopsis-text">
            O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante. Uma saga épica de família, lealdade e traição que define o gênero de máfia para sempre. <span className="read-more">Ler mais</span>
          </p>
        </div>

        <div className="section">
          <div className="section-header-simple">
            <h3>Elenco</h3>
            <span className="see-all">Ver todos</span>
          </div>
          <div className="cast-list">
            <div className="cast-item">
              <img src="https://image.tmdb.org/t/p/w200/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg" className="cast-avatar" />
              <span className="cast-name">M.Brando</span>
            </div>
            <div className="cast-item">
              <img src="https://image.tmdb.org/t/p/w200/fMDFeVf0pjopTJbyRSLFadCN3aE.jpg" className="cast-avatar" />
              <span className="cast-name">Al Pacino</span>
            </div>
            <div className="cast-item">
              <img src="https://image.tmdb.org/t/p/w200/b7fTC9WFkgqGOv77mLQzmD24uaJ.jpg" className="cast-avatar" />
              <span className="cast-name">James Caan</span>
            </div>
            <div className="cast-item">
              <img src="https://image.tmdb.org/t/p/w200/d7S7c77K8I6P9S9N0d8C8O4J4Z.jpg" className="cast-avatar" />
              <span className="cast-name">Diane K.</span>
            </div>
          </div>
        </div>

        <div className="section review-section">
          <div className="section-header-simple">
            <h3>Reviews dos Amigos (28)</h3>
            <button className="filter-btn">Filtrar</button>
          </div>

          <div className="review-card-featured">
            <div className="review-header">
              <div className="reviewer">
                <img src="https://i.pravatar.cc/150?u=8" className="reviewer-avatar" />
                <div className="reviewer-info">
                  <span className="reviewer-name">Felipe Costa</span>
                  <span className="reviewer-time">Acabou de ver • 5h atrás</span>
                </div>
              </div>
              <div className="reviewer-rating">★ 10</div>
            </div>
            <p className="review-body">
              Uma obra-prima absoluta. A fotografia escura e sombria complementa perfeitamente a narrativa moralmente ambígua. Pacino está irreconhecível em sua transformação.
            </p>
            <div className="review-actions">
              <div className="action-left">
                <div className="act-item"><ThumbsUp size={14} /> 34</div>
                <div className="act-item"><MessageSquare size={14} /> 4</div>
              </div>
              <span className="spoiler-warn">CONTÉM SPOILERS</span>
            </div>
          </div>

          <div className="review-card-simple">
            <div className="review-header">
              <div className="reviewer">
                <img src="https://i.pravatar.cc/150?u=9" className="reviewer-avatar-small" />
                <div className="reviewer-info">
                  <span className="reviewer-name">Marina Silva</span>
                </div>
              </div>
              <div className="reviewer-rating-small">★ 9.5</div>
            </div>
            <p className="review-body-short">
              Clássico indispensável. Demorei para assistir mas valeu cada minuto das quase 3 horas.
            </p>
            <div className="review-actions">
              <div className="action-left">
                <div className="act-item"><ThumbsUp size={14} /> 12</div>
                <div className="act-item"><MessageSquare size={14} /> Responder</div>
              </div>
            </div>
          </div>

          <button className="btn-text-only">Ver todas as 28 reviews</button>
        </div>
      </div>

      <style>{`
        .details-container {
          min-height: 100vh;
          background-color: #101010;
          color: white;
          padding-bottom: 40px;
        }

        .backdrop-section {
          position: relative;
          height: 250px;
          width: 100%;
        }

        .backdrop-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .backdrop-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(16,16,16,1) 100%);
        }

        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: var(--spacing-4);
          display: flex;
          justify-content: space-between;
          z-index: 10;
        }

        .icon-btn {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           background-color: rgba(0,0,0,0.5);
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .content-body {
          padding: 0 var(--spacing-4);
          transform: translateY(-40px);
          position: relative;
          z-index: 5;
        }

        .poster-row {
          display: flex;
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }

        .main-poster {
          width: 120px;
          border-radius: var(--radius-md);
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .header-info {
          flex: 1;
          padding-top: 40px; /* Offset for backdrop alignment */
        }

        .tags {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
        }

        .tag {
          background-color: rgba(229, 9, 20, 0.2); /* Red tint */
          color: #ff4d4d;
          font-size: 8px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 2px;
        }
        
        .tag:nth-child(2), .tag:nth-child(3) {
           background-color: #333;
           color: #ccc;
        }

        .movie-title {
          font-size: 20px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .movie-meta {
          font-size: 11px;
          color: #888;
          margin-bottom: 12px;
        }

        .circle-score-box {
          position: relative;
        }
        
        .score-label {
           font-size: 8px;
           color: #888;
           letter-spacing: 0.5px;
           text-transform: uppercase;
        }
        
        .score-row {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .big-score {
          font-size: 24px;
          font-weight: 800;
        }

        .max-score {
          font-size: 12px;
          color: #666;
        }
        
        .heart-circle {
           position: absolute;
           right: 0;
           bottom: 0px;
           width: 36px;
           height: 36px;
           border-radius: 50%;
           border: 3px solid var(--color-primary);
           display: flex;
           align-items: center;
           justify-content: center;
        }
        
        .heart-icon {
           width: 12px; 
           height: 12px;
           background-color: var(--color-primary);
           /* Simple shape */
           border-radius: 2px; 
           transform: rotate(45deg);
        }

        .action-buttons {
          display: flex;
          gap: var(--spacing-3);
          margin-bottom: var(--spacing-6);
        }

        .btn-white {
          background-color: white;
          color: black;
          flex: 2;
          font-size: 14px;
          gap: 8px;
        }

        .btn-dark-outline {
           flex: 2;
           border: 1px solid #444;
           background-color: #1a1a1a;
           color: white;
           font-size: 14px;
           gap: 8px;
        }

        .btn-circle-green {
           width: 48px;
           height: 48px;
           border-radius: 50%;
           background-color: rgba(70, 211, 105, 0.2);
           color: #46D369;
           display: flex;
           align-items: center;
           justify-content: center;
           border: 1px solid #46D369;
        }

        .streaming-row {
           display: flex;
           gap: 12px;
           overflow-x: auto;
           padding-bottom: 8px;
        }

        .stream-option {
           display: flex;
           align-items: center;
           gap: 10px;
           background-color: #1a1a1a;
           padding: 8px 12px;
           border-radius: 8px;
           min-width: 140px;
           border: 1px solid #333;
        }

        .stream-logo {
           width: 32px;
           height: 32px;
           border-radius: 4px;
           display: flex;
           align-items: center;
           justify-content: center;
           font-weight: 900;
           font-size: 18px;
           color: white;
        }

        .stream-logo.netflix { background-color: #E50914; }
        .stream-logo.prime { background-color: #00A8E1; }
        .stream-logo.apple { background-color: #333; }

        .stream-info {
           display: flex;
           flex-direction: column;
        }

        .stream-name {
           font-size: 12px;
           font-weight: 700;
        }

        .stream-quality {
           font-size: 9px;
           color: #888;
           text-transform: uppercase;
        }

        .community-link-box {
           margin-top: 12px;
           background-color: #1a1a1a;
           padding: 12px;
           border-radius: 8px;
           border: 1px dashed #444;
        }

        .link-label {
           font-size: 10px;
           color: #aaa;
           margin-bottom: 8px;
           display: block;
        }

        .link-input-row {
           display: flex;
           gap: 8px;
        }

        .link-input {
           flex: 1;
           background-color: #000;
           border: 1px solid #333;
           border-radius: 4px;
           padding: 8px;
           font-size: 12px;
           color: white;
        }
        
        .link-input:focus {
            outline: none;
            border-color: var(--color-primary);
        }

        .link-btn {
           background-color: #333;
           border: none;
           width: 32px;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 4px;
           color: white;
        }

        .section {
          margin-bottom: var(--spacing-6);
        }

        .section h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: var(--spacing-2);
        }
        
        .section-header-simple {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: var(--spacing-3);
        }

        .synopsis-text {
          font-size: 13px;
          color: #ccc;
          line-height: 1.5;
        }

        .read-more {
          color: var(--color-error);
          font-weight: 600;
        }

        .cast-list {
          display: flex;
          gap: var(--spacing-4);
          overflow-x: auto;
          scrollbar-width: none;
        }

        .cast-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 60px;
        }

        .cast-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #333;
        }

        .cast-name {
          font-size: 10px;
          color: #aaa;
          text-align: center;
        }
        
        .filter-btn {
           font-size: 11px;
           color: #888;
           border: 1px solid #444;
           padding: 4px 8px;
           border-radius: 4px;
        }
        
        .review-card-featured {
           background-color: #180808; /* Dark red tint */
           border: 1px solid #331111;
           border-radius: var(--radius-md);
           padding: var(--spacing-3);
           margin-bottom: var(--spacing-3);
        }
        
        .review-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: var(--spacing-2);
        }
        
        .reviewer {
           display: flex;
           gap: 8px;
           align-items: center;
        }
        
        .reviewer-avatar {
           width: 32px;
           height: 32px;
           border-radius: 50%;
        }

        .reviewer-name {
           font-size: 13px;
           font-weight: 600;
           display: block;
        }
        
        .reviewer-time {
           font-size: 10px;
           color: #888;
        }
        
        .reviewer-rating {
           background-color: #222;
           padding: 2px 6px;
           border-radius: 4px;
           font-size: 12px;
           font-weight: 700;
           color: var(--color-warning);
        }
        
        .review-body {
           font-size: 13px;
           line-height: 1.4;
           color: #ddd;
           margin-bottom: var(--spacing-3);
        }
        
        .review-actions {
           display: flex;
           justify-content: space-between;
           align-items: center;
           font-size: 11px;
           color: #888;
        }
        
        .action-left {
           display: flex;
           gap: var(--spacing-3);
        }
        
        .act-item {
           display: flex;
           align-items: center;
           gap: 4px;
        }
        
        .spoiler-warn {
           color: var(--color-error);
           font-weight: 700;
           font-size: 9px;
        }

        .review-card-simple {
           background-color: #181818;
           padding: var(--spacing-3);
           border-radius: var(--radius-md);
           margin-bottom: var(--spacing-4);
        }
        
        .reviewer-avatar-small {
           width: 24px;
           height: 24px;
           border-radius: 50%;
        }
        
        .reviewer-rating-small {
           font-size: 11px;
           color: var(--color-warning);
        }
        
        .review-body-short {
           font-size: 12px;
           color: #ccc;
           margin-bottom: var(--spacing-2);
           line-height: 1.4;
        }

        .btn-text-only {
           width: 100%;
           text-align: center;
           font-size: 12px;
           color: #888;
           text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
