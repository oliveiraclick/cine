import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Check } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const Indications = () => {
   const navigate = useNavigate();

   const indications = [
      {
         id: 1,
         user: { name: 'Ana Silva', avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=E50914&color=fff', time: 'Há 21 min' },
         content: {
            title: 'Oppenheimer',
            year: '2023',
            director: 'Christopher Nolan',
            rating: 9.5,
            poster: 'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
            quote: '"Visualmente impressionante e um tour-de-force de Cillian Murphy. A trilha sonora é visceral!..."',
            genres: 'Drama, História, Biografia'
         },
         tag: 'FILME'
      },
      {
         id: 2,
         user: { name: 'Carlos Mendes', avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=random', time: 'Ontem' },
         content: {
            title: 'Severance',
            year: '2022',
            director: 'Dan Erickson',
            rating: 8.7,
            poster: 'https://placehold.co/200x300/1a1a1a/E50914?text=Severance',
            quote: '"Nunca assisti nada como isso! O clima é tenso e desconfortável de um jeito viciante..."',
            genres: 'Sci-Fi, Thriller, Drama'
         },
         tag: 'SÉRIE'
      },
      {
         id: 3,
         user: { name: 'Julia Santos', avatar: 'https://ui-avatars.com/api/?name=Julia+Santos&background=random', time: '5 dias atrás' },
         content: {
            title: 'Dune: Part Two',
            year: '2024',
            director: 'Denis Villeneuve',
            rating: 9.9,
            poster: 'https://placehold.co/200x300/1a1a1a/E50914?text=Dune+2',
            quote: 'CONTÉM SPOILERS',
            genres: 'Sci-Fi, Aventura'
         },
         tag: 'FILME',
         spoilers: true
      }
   ];

   return (
      <div className="indic-container">
         <div className="indic-header">
            <button onClick={() => navigate(-1)} className="back-btn"><ChevronLeft size={24} color="white" /></button>
            <h2 className="header-title">Indicações</h2>
            <button className="icon-btn-simple">
               <div style={{ transform: 'rotate(-45deg)' }}>➤</div>
            </button>
         </div>

         <div className="filter-row">
            <div className="chip active">Todos</div>
            <div className="chip">Filmes</div>
            <div className="chip">Séries</div>
            <div className="chip">Por Amigos</div>
         </div>

         <div className="cards-list">
            {indications.map(item => (
               <div key={item.id} className="indic-card">
                  <div className="card-top">
                     <div className="user-row">
                        <img src={item.user.avatar} className="s-avatar" />
                        <div className="user-text">
                           <span className="u-name">{item.user.name}</span>
                           <span className="u-time">{item.user.time}</span>
                        </div>
                     </div>
                     <div className="more-opts">•••</div>
                  </div>

                  <div className="quote-box">
                     {item.spoilers ? (
                        <div className="spoiler-blur">
                           <span className="spoiler-tag">⚠ CONTÉM SPOILERS</span>
                           <p className="spoiler-text">Toque para revelar o conteúdo...</p>
                        </div>
                     ) : (
                        <p className="quote">{item.content.quote} <span className="read-more">Ler mais</span></p>
                     )}
                  </div>

                  <div className="inner-movie-card">
                     <img src={item.content.poster} className="inner-poster" />
                     <div className="inner-info">
                        <div className="inner-tag-row">
                           <span className="inner-tag">{item.tag}</span>
                           <span className="inner-rating">{item.content.rating}</span>
                        </div>
                        <h3 className="inner-title">{item.content.title}</h3>
                        <p className="inner-meta">{item.content.year} • {item.content.director}</p>
                        <p className="inner-genres">{item.content.genres}</p>
                     </div>
                  </div>

                  <div className="actions-footer">
                     <button className="btn-action check">
                        <Check size={14} /> Já assisti
                     </button>
                     <button className="btn-action watchlist">
                        <Plus size={14} /> Watchlist
                     </button>
                  </div>
               </div>
            ))}

            <div className="e-card">
               <div className="e-icon">✉</div>
               <p>Isso é tudo por enquanto.</p>
            </div>
         </div>

         <div style={{ height: 80 }}></div>
         <BottomNav />

         <style>{`
        .indic-container {
           min-height: 100vh;
           background-color: var(--color-background);
           color: white;
           padding: var(--spacing-4);
        }

        .indic-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: var(--spacing-4);
        }
        
        .back-btn, .icon-btn-simple {
           background: none;
           border: none;
           padding: 0;
           cursor: pointer;
           color: white;
           font-size: 18px;
        }

        .header-title {
           font-size: 16px;
           font-weight: 700;
        }

        .filter-row {
           display: flex;
           gap: 8px;
           margin-bottom: 20px;
        }

        .chip {
           padding: 6px 16px;
           background-color: #222;
           border: none;
           border-radius: var(--radius-full);
           font-size: 11px;
           color: #888;
           cursor: pointer;
        }
        
        .chip.active {
           background-color: var(--color-error);
           color: white;
           font-weight: 600;
        }

        .cards-list {
           display: flex;
           flex-direction: column;
           gap: var(--spacing-4);
        }

        .indic-card {
           background-color: #121212;
           border: 1px solid #222;
           border-radius: var(--radius-md);
           padding: 16px;
        }

        .card-top {
           display: flex;
           justify-content: space-between;
           align-items: flex-start;
           margin-bottom: 12px;
        }

        .user-row {
           display: flex;
           gap: 10px;
           align-items: center;
        }

        .s-avatar {
           width: 36px;
           height: 36px;
           border-radius: 50%;
        }

        .user-text {
           display: flex;
           flex-direction: column;
        }

        .u-name {
           font-size: 13px;
           font-weight: 700;
        }

        .u-time {
           font-size: 10px;
           color: #666;
        }
        
        .more-opts {
           color: #666;
           font-size: 12px;
           letter-spacing: 2px;
        }

        .quote-box {
           margin-bottom: 16px;
        }
        
        .quote {
           font-size: 13px;
           color: #ccc;
           line-height: 1.5;
        }
        
        .read-more {
           font-size: 11px;
           color: var(--color-error);
           font-weight: 600;
           cursor: pointer;
           margin-left: 4px;
        }
        
        .spoiler-blur {
           background-color: rgba(255,255,255,0.05);
           border-radius: 4px;
           padding: 12px;
        }
        
        .spoiler-tag {
           color: #FFB800;
           font-size: 10px;
           font-weight: 700;
           display: block;
           margin-bottom: 4px;
        }
        
        .spoiler-text {
           font-size: 12px;
           color: #666;
        }

        .inner-movie-card {
           background-color: #1A1A1A;
           border-radius: 8px;
           padding: 12px;
           display: flex;
           gap: 12px;
           margin-bottom: 16px;
        }

        .inner-poster {
           width: 60px;
           height: 90px;
           border-radius: 4px;
           object-fit: cover;
        }

        .inner-info {
           display: flex;
           flex-direction: column;
           justify-content: center;
        }
        
        .inner-tag-row {
           display: flex;
           align-items: center;
           gap: 8px;
           margin-bottom: 4px;
        }
        
        .inner-tag {
           font-size: 9px;
           text-transform: uppercase;
           letter-spacing: 0.5px;
           color: #aaa;
        }
        
        .inner-rating {
           font-size: 10px;
           color: var(--color-error);
           font-weight: 800;
        }
        
        .inner-title {
           font-size: 14px;
           font-weight: 800;
           margin-bottom: 2px;
        }
        
        .inner-meta {
           font-size: 11px;
           color: #888;
           margin-bottom: 4px;
        }
        
        .inner-genres {
           font-size: 10px;
           color: #666;
        }

        .actions-footer {
           display: flex;
           gap: 10px;
        }

        .btn-action {
           flex: 1;
           height: 40px;
           border-radius: 6px;
           font-size: 12px;
           font-weight: 700;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 6px;
           cursor: pointer;
        }
        
        .btn-action.check {
           background-color: #222;
           color: #ccc;
           border: none;
        }
        
        .btn-action.watchlist {
           background-color: var(--color-error);
           color: white;
           border: none;
        }
        
        .e-card {
           text-align: center;
           padding: 40px 0;
           color: #444;
        }
        
        .e-icon {
           font-size: 24px;
           margin-bottom: 8px;
        }

      `}</style>
      </div>
   );
};

export default Indications;
