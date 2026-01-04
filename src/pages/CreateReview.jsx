import React, { useState } from 'react';
import { X, Search, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateReview = () => {
   const navigate = useNavigate();
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [movieQuery, setMovieQuery] = useState('');
   const [rating, setRating] = useState(4.0);
   const [text, setText] = useState('');
   const [spoilers, setSpoilers] = useState(false);
   const [searchFriend, setSearchFriend] = useState('');

   const mockMovies = [
      { id: 1, title: 'Dune: Part Two', year: '2024', genre: 'Sci-Fi', poster: 'https://image.tmdb.org/t/p/w200/5aUVLiQCgqKMt6J4sY2b1F.jpg' },
      { id: 2, title: 'Oppenheimer', year: '2023', genre: 'Drama', poster: 'https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
      { id: 3, title: 'The Bear', year: '2023', genre: 'Série', poster: 'https://image.tmdb.org/t/p/w200/x5o8cLZfEXMoZczkfO4qFq.jpg' },
      { id: 4, title: 'Succession', year: '2023', genre: 'Série', poster: 'https://image.tmdb.org/t/p/w200/7bM251e6gQh4hT2k2g7e2.jpg' },
      { id: 5, title: 'Barbie', year: '2023', genre: 'Comédia', poster: 'https://image.tmdb.org/t/p/w200/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg' },
   ];

   const filteredMovies = mockMovies.filter(m => m.title.toLowerCase().includes(movieQuery.toLowerCase()));

   return (
      <div className="review-modal-overlay">
         <div className="review-modal-content">
            <div className="modal-header">
               <button className="close-btn" onClick={() => navigate(-1)}><X size={20} /></button>
               <span className="modal-title">
                  {selectedMovie ? 'Criar Review' : 'Escolher Filme'}
               </span>
               <div style={{ width: 20 }}></div>
            </div>

            {!selectedMovie ? (
               <div className="search-section">
                  <div className="search-box-large">
                     <Search size={20} color="#888" />
                     <input
                        type="text"
                        placeholder="Buscar filme ou série..."
                        className="search-input-large"
                        value={movieQuery}
                        onChange={(e) => setMovieQuery(e.target.value)}
                        autoFocus
                     />
                  </div>

                  <div className="results-list">
                     {filteredMovies.map(movie => (
                        <div key={movie.id} className="movie-result-item" onClick={() => setSelectedMovie(movie)}>
                           <img src={movie.poster} className="result-img" />
                           <div className="result-details">
                              <span className="result-name">{movie.title}</span>
                              <span className="result-year">{movie.year}</span>
                           </div>
                           <ChevronRight size={16} color="#444" />
                        </div>
                     ))}
                  </div>
               </div>
            ) : (
               <>
                  {/* Selected Movie Preview (Click to change) */}
                  <div className="movie-preview" onClick={() => setSelectedMovie(null)}>
                     <img src={selectedMovie.poster} className="preview-poster" />
                     <div className="preview-info">
                        <h3 className="preview-title">{selectedMovie.title}</h3>
                        <p className="preview-meta">{selectedMovie.year} • {selectedMovie.genre}</p>
                        <div className="tags-row">
                           <span className="tag"> Trocar Filme </span>
                        </div>
                     </div>
                  </div>

                  <div className="rating-section">
                     <label className="section-label">SUA AVALIAÇÃO</label>
                     <div className="stars-interactive">
                        {[1, 2, 3, 4, 5].map((star) => (
                           <span
                              key={star}
                              className={`star ${star <= Math.ceil(rating) ? 'filled' : ''}`}
                              onClick={() => setRating(star)}
                           >★</span>
                        ))}
                        <span className="rating-value">{rating.toFixed(1)}</span>
                     </div>
                  </div>

                  <div className="text-section">
                     <textarea
                        className="review-input"
                        placeholder={`O que você achou de ${selectedMovie.title}?`}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                     ></textarea>
                     <span className="char-count">{text.length}/30</span>
                  </div>

                  <div className="toggle-row">
                     <span className="toggle-label">Contém spoilers</span>
                     <div
                        className={`toggle-switch ${spoilers ? 'on' : ''}`}
                        onClick={() => setSpoilers(!spoilers)}
                     >
                        <div className="toggle-handle"></div>
                     </div>
                  </div>

                  <div className="friends-section">
                     <label className="section-label">INDICAR PARA AMIGOS</label>
                     <div className="friend-search">
                        <Search size={16} color="#666" />
                        <input
                           type="text"
                           placeholder="Buscar amigos..."
                           className="friend-input"
                           value={searchFriend}
                           onChange={(e) => setSearchFriend(e.target.value)}
                        />
                     </div>
                  </div>

                  <div className="modal-footer">
                     <button className="btn-cancel" onClick={() => navigate(-1)}>Cancelar</button>
                     <button className="btn btn-primary" onClick={() => navigate('/feed')}>
                        Publicar <ChevronRight size={16} />
                     </button>
                  </div>
               </>
            )}
         </div>

         <style>{`
        .review-modal-overlay {
          min-height: 100vh;
          background-color: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-4);
          /* For full screen mobile feel */
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 200;
        }

        .review-modal-content {
          background-color: #1a0b0b; /* Dark red tint bg */
          width: 100%;
          max-width: 400px;
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
          min-height: 600px;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: var(--spacing-6);
        }

        .modal-title {
           font-weight: 700;
           font-size: 16px;
        }

        .close-btn {
           color: #ccc;
        }

        .movie-preview {
           display: flex;
           gap: var(--spacing-4);
           margin-bottom: var(--spacing-6);
           background-color: rgba(0,0,0,0.2);
           padding: var(--spacing-3);
           border-radius: var(--radius-md);
        }

        .preview-poster {
           width: 60px;
           border-radius: 4px;
        }

        .preview-title {
           font-size: 16px;
           font-weight: 700;
           margin-bottom: 4px;
        }

        .preview-meta {
           font-size: 11px;
           color: #888;
           margin-bottom: 8px;
        }
        
        .tags-row {
          display: flex;
          gap: 4px;
        }
        
        .tag {
          font-size: 9px;
          background: #333;
          padding: 2px 6px;
          border-radius: 2px;
          color: #ccc;
          font-weight: 600;
        }

        .section-label {
           font-size: 10px;
           color: #888;
           margin-bottom: var(--spacing-2);
           display: block;
           font-weight: 600;
        }

        .rating-section {
           margin-bottom: var(--spacing-6);
        }

        .stars-interactive {
           display: flex;
           align-items: center;
           gap: 8px;
        }

        .star {
           font-size: 24px;
           color: #333;
           cursor: pointer;
        }

        .star.filled {
           color: var(--color-error);
        }

        .rating-value {
           margin-left: auto;
           font-size: 18px;
           color: var(--color-error);
           font-weight: 700;
        }

        .text-section {
           margin-bottom: var(--spacing-6);
           position: relative;
        }

        .review-input {
           width: 100%;
           height: 120px;
           background-color: rgba(255,255,255,0.05);
           border: 1px solid transparent;
           border-radius: var(--radius-md);
           padding: var(--spacing-3);
           color: white;
           font-size: 13px;
           resize: none;
        }
        
        .review-input:focus {
           outline: none;
           border-color: #333;
        }

        .char-count {
           position: absolute;
           bottom: 8px;
           right: 8px;
           font-size: 10px;
           color: #666;
        }

        .toggle-row {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: var(--spacing-6);
        }
        
        .toggle-switch {
           width: 44px;
           height: 24px;
           background-color: #333;
           border-radius: 12px;
           position: relative;
           cursor: pointer;
           transition: background-color 0.2s;
        }
        
        .toggle-switch.on {
           background-color: var(--color-success); /* Actually maybe just white or primary */
           background-color: #fff;
        }
        
        .toggle-handle {
           width: 20px;
           height: 20px;
           background-color: white;
           border-radius: 50%;
           position: absolute;
           top: 2px;
           left: 2px;
           transition: transform 0.2s;
           background-color: black; 
        }
        
        .toggle-switch.on .toggle-handle {
           transform: translateX(20px);
        }

        .friends-section {
           margin-bottom: auto;
        }

        .friend-chip {
           display: inline-flex;
           align-items: center;
           gap: 6px;
           background-color: var(--color-error); /* Selected style */
           padding: 4px 8px;
           border-radius: var(--radius-full);
           font-size: 12px;
           margin-bottom: var(--spacing-3);
        }

        .friend-avatar {
           width: 20px;
           height: 20px;
           border-radius: 50%;
        }

        .friend-search {
           display: flex;
           align-items: center;
           gap: 8px;
           background-color: rgba(255,255,255,0.05);
           padding: 8px 12px;
           border-radius: var(--radius-md);
        }

        .friend-input {
           background: transparent;
           border: none;
           color: white;
           flex: 1;
           font-size: 13px;
        }
        
        .friend-input:focus {
           outline: none;
        }

        .modal-footer {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding-top: var(--spacing-4);
        }

        .btn-cancel {
           color: #888;
           font-size: 13px;
        }
        
        .btn-primary {
           padding: 0 24px;
           gap: 8px;
        }

        .search-box-large {
            display: flex;
            align-items: center;
            gap: 12px;
            background-color: #2a1a1a;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 1px solid #442222;
        }

        .search-input-large {
            background: transparent;
            border: none;
            color: white;
            font-size: 16px;
            flex: 1;
        }
        
        .search-input-large:focus {
            outline: none;
        }

        .results-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            overflow-y: auto;
            max-height: 400px;
        }

        .movie-result-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 8px;
            background-color: rgba(255,255,255,0.03);
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .movie-result-item:hover {
            background-color: rgba(255,255,255,0.08);
        }

        .result-img {
            width: 40px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
        }

        .result-details {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .result-name {
            font-weight: 600;
            font-size: 14px;
        }

        .result-year {
            font-size: 11px;
            color: #888;
        }
      `}</style>
      </div>
   );
};

export default CreateReview;
