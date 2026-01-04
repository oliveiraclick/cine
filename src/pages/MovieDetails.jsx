import React, { useEffect, useState } from 'react';
import { Share2, Play, Plus, Check, ChevronLeft, ThumbsUp, MessageSquare, User, MessageCircle, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdb';
import { isInWatchlist, toggleWatchlist } from '../services/storage';

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getMovieDetails(id);
      if (data) {
        setMovie(data);
        setInWatchlist(isInWatchlist(data.id));

        if (data.videos && data.videos.results) {
          const trailer = data.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
          if (trailer) setTrailerKey(trailer.key);
        }
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  const handleToggleWatchlist = () => {
    if (!movie) return;
    const newState = toggleWatchlist(movie);
    setInWatchlist(newState);
  };

  const handleWatchTrailer = () => {
    if (trailerKey) {
      setShowTrailer(true);
    } else {
      // Fallback if no specific trailer found in API, try searching or just alert
      const fallback = movie?.videos?.results?.[0]?.key;
      if (fallback) {
        setTrailerKey(fallback);
        setShowTrailer(true);
      } else {
        window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, '_blank');
      }
    }
  };

  const maskTitle = (title) => {
    if (!title) return '****';
    const words = title.split(' ');
    // Mask the first word if it's long enough, or the whole thing
    const firstWord = words[0];
    if (firstWord.length > 3) {
      return firstWord.substring(0, 3) + '*'.repeat(firstWord.length - 3) + (words.length > 1 ? ' ****' : '');
    }
    return firstWord + '****';
  };

  const handleWhatsAppShare = () => {
    const masked = maskTitle(movie.title);
    const text = `Estou te indicando o filme ${masked} 🤫\n\nCadastre-se no CineSocial para descobrir qual é e ver o que está perdendo!\n\nwww.cinesocial.app`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowShareModal(false);
  };

  const handleInternalShare = () => {
    // Mock internal share
    alert(`Indicado para seus amigos do Círculo!`);
    setShowShareModal(false);
  };

  if (loading) {
    return <div style={{ height: '100vh', backgroundColor: '#101010', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Carregando...</div>;
  }

  if (!movie) {
    return <div style={{ height: '100vh', backgroundColor: '#101010', color: 'white' }}>Filme não encontrado</div>;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/800x450?text=No+Backdrop';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  const year = movie.release_date ? movie.release_date.substring(0, 4) : '';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '';
  const genres = movie.genres ? movie.genres.slice(0, 3) : [];
  const cast = movie.credits && movie.credits.cast ? movie.credits.cast.slice(0, 6) : [];
  // Mock circle score for now as TMDB vote_average is different scale
  const circleScore = (movie.vote_average).toFixed(1);

  return (
    <div className="details-container">
      {/* Share Modal */}
      {showShareModal && (
        <div className="trailer-modal" onClick={() => setShowShareModal(false)}>
          <div className="modal-content share-modal-content" onClick={e => e.stopPropagation()}>
            <h3>Indicar Filme</h3>
            <p>Escolha como quer indicar <strong>{movie.title}</strong></p>

            <div className="share-options">
              <button className="share-opt-btn internal" onClick={handleInternalShare}>
                <div className="icon-circle"><User size={24} /></div>
                <span>Amigos do App</span>
              </button>

              <button className="share-opt-btn whatsapp" onClick={handleWhatsAppShare}>
                <div className="icon-circle success"><MessageCircle size={24} /></div>
                <span>WhatsApp (Misterioso)</span>
              </button>
            </div>

            <button className="close-share-text" onClick={() => setShowShareModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowTrailer(false)}>
              <X size={24} color="white" />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Header Backdrop */}
      <div className="backdrop-section">
        <img src={backdropUrl} alt="Backdrop" className="backdrop-image" />
        <div className="backdrop-overlay"></div>
        <div className="top-bar">
          <button className="icon-btn" onClick={() => navigate(-1)}><ChevronLeft color="white" /></button>
          <button className="icon-btn" onClick={() => setShowShareModal(true)}><Share2 color="white" size={20} /></button>
        </div>
      </div>

      <div className="content-body">
        <div className="poster-row">
          <img src={posterUrl} alt={movie.title} className="main-poster" />
          <div className="header-info">
            <div className="tags">
              {genres.map(g => (
                <span key={g.id} className="tag">{g.name.toUpperCase()}</span>
              ))}
            </div>
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-meta">{year} • {runtime}</p>

            <div className="circle-score-box">
              <div className="score-label">CÍRCULO DE AMIGOS</div>
              <div className="score-row">
                <span className="big-score">{circleScore}</span>
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
          <button className="btn btn-white btn-play" onClick={handleWatchTrailer}>
            <Play size={18} fill="black" /> Ver Trailer
          </button>
          <button
            className="btn btn-dark-outline"
            onClick={handleToggleWatchlist}
            style={{ backgroundColor: inWatchlist ? '#333' : '#1a1a1a', borderColor: inWatchlist ? '#E50914' : '#444' }}
          >
            {inWatchlist ? <Check size={18} color="#E50914" /> : <Plus size={18} />}
            {inWatchlist ? 'Na Lista' : 'Quero Ver'}
          </button>
          <button className="btn btn-circle-green">
            <Check size={20} />
          </button>
        </div>

        <div className="section">
          <h3>Onde Assistir</h3>
          <div className="streaming-row">
            {/* Mock Streaming data, as TMDB watch providers api needs specific region/setup usually */}
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
            {movie.overview || 'Sinopse não disponível.'}
          </p>
        </div>

        <div className="section">
          <div className="section-header-simple">
            <h3>Elenco</h3>
            <span className="see-all">Ver todos</span>
          </div>
          <div className="cast-list">
            {cast.map(actor => (
              <div key={actor.id} className="cast-item">
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://i.pravatar.cc/150'}
                  className="cast-avatar"
                  alt={actor.name}
                />
                <span className="cast-name">{actor.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section review-section">
          <div className="section-header-simple">
            <h3>Reviews dos Amigos (28)</h3>
            <button className="filter-btn">Filtrar</button>
          </div>

          {/* MOCK REVIEWS FOR NOW */}
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
              Uma obra-prima absoluta. A fotografia escura e sombria complementa perfeitamente a narrativa moralmente ambígua.
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
              Clássico indispensável. Demorei para assistir mas valeu cada minuto.
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
           background: none;
           border: none;
           cursor: pointer;
           padding: 10px;
        }

        .trailer-modal {
           position: fixed;
           top: 0; left: 0;
           width: 100%; height: 100%;
           background-color: rgba(0,0,0,0.9);
           z-index: 9999;
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 20px;
        }

        .modal-content {
           width: 100%;
           max-width: 800px;
           aspect-ratio: 16/9;
           background-color: black;
           position: relative;
           border-radius: 8px;
           /* overflow: hidden; Removed to allow button outside */
        }

        .close-modal {
           position: absolute;
           top: -45px;
           right: 0;
           background-color: rgba(255, 255, 255, 0.2);
           border-radius: 50%;
           width: 36px;
           height: 36px;
           display: flex;
           align-items: center;
           justify-content: center;
           border: none;
           cursor: pointer;
           z-index: 10;
        }

        .share-modal-content {
           background-color: #1a1a1a;
           padding: 24px;
           height: auto;
           aspect-ratio: auto;
           display: flex;
           flex-direction: column;
           align-items: center;
           text-align: center;
           gap: 16px;
           max-width: 320px;
        }

        .share-modal-content h3 {
            font-size: 18px;
            font-weight: 700;
            color: white;
            margin: 0;
        }

        .share-modal-content p {
            font-size: 13px;
            color: #888;
            margin-top: -8px;
            margin-bottom: 8px;
        }

        .share-options {
            display: flex;
            gap: 16px;
            width: 100%;
            justify-content: center;
        }

        .share-opt-btn {
            background: none;
            border: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            color: #ccc;
            font-size: 11px;
        }

        .icon-circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }
        
        .icon-circle.success {
            background-color: #25D366; /* WhatsApp Green */
            color: white;
        }

        .share-opt-btn:active .icon-circle {
            transform: scale(0.95);
        }

        .close-share-text {
            background: none;
            border: none;
            color: #666;
            font-size: 12px;
            margin-top: 8px;
            cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
