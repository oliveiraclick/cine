import React, { useState } from 'react';
import { Settings, Share2, Crown, ChevronRight, Grid, Bookmark, ChevronLeft, LogOut, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { getWatchlist, getUserReviews } from '../services/storage';

const Profile = () => {
   const navigate = useNavigate();

   const [activeTab, setActiveTab] = useState('assistidos');
   const [watchlist, setWatchlist] = useState([]);
   const [myReviews, setMyReviews] = useState([]);

   // Mock Watched (Keep for now as we don't have "Observed" logic yet)
   const watchedMovies = [
      'https://image.tmdb.org/t/p/w200/5aUVLiQCgqKMt6J4sY2b1F.jpg',
      'https://image.tmdb.org/t/p/w200/kCGlIMHnOm8JPXq3rXM6c5wMxc.jpg',
      'https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      'https://image.tmdb.org/t/p/w200/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg'
   ];

   React.useEffect(() => {
      // Load watchlist & reviews whenever rendering or switching tabs
      setWatchlist(getWatchlist());
      setMyReviews(getUserReviews());
   }, [activeTab]);

   const currentGrid = activeTab === 'querover' ? watchlist : watchedMovies.map((url, i) => ({ id: i, poster_path: url.replace('https://image.tmdb.org/t/p/w200', ''), vote_average: 4.5 }));

   return (
      <div className="profile-container">
         <div className="profile-header">
            <button className="icon-btn-simple" onClick={() => navigate(-1)}><ChevronLeft size={20} color="white" /></button>
            <span className="username">@mari_cina</span>
            <div style={{ display: 'flex', gap: 10 }}>
               <button className="icon-btn-simple"><Settings size={20} color="white" /></button>
               <button className="icon-btn-simple" onClick={() => navigate('/login')}><LogOut size={20} color="#E50914" /></button>
            </div>
         </div>

         <div className="profile-info">
            {/* ... (Keep existing profile info mock) ... */}
            <div className="avatar-wrapper">
               <img src="https://i.pravatar.cc/150?u=9" className="big-avatar" />
               <div className="status-dot"></div>
            </div>

            <h1 className="display-name">Mariana Silva</h1>
            <p className="user-bio">Crítica de coração. Estudante de horror & thriller. SP/BR</p>

            <div className="action-row">
               <button className="btn-edit-new" onClick={() => navigate('/edit-profile')}>
                  Editar Perfil
               </button>
               <button className="btn-share-new"><Share2 size={16} /></button>
            </div>

            <div className="stats-row">
               <div className="stat-item">
                  <span className="stat-num">412</span>
                  <span className="stat-label">Filmes</span>
               </div>
               <div className="stat-item">
                  <span className="stat-num">{myReviews.length}</span>
                  <span className="stat-label">Reviews</span>
               </div>
               <div className="stat-item" onClick={() => navigate('/achievements')} style={{ cursor: 'pointer' }}>
                  <span className="stat-num" style={{ color: '#E50914' }}>Lvl. 2</span>
                  <span className="stat-label">Embaixador</span>
               </div>
               <div className="stat-item">
                  <span className="stat-num">1.2k</span>
                  <span className="stat-label">Seguindo</span>
               </div>
            </div>

            <div className="invite-tree-card-new">
               <div className="tree-icon-new">
                  <Crown size={20} color="#FFB800" />
               </div>
               <div className="tree-info">
                  <span className="tree-label-new">Árvore de Convites</span>
                  <span className="tree-sub-new">Convidada por <span className="highlight-new">@joao_p</span></span>
                  <span className="tree-extra">2 convites na rede disponíveis</span>
               </div>
               <button className="btn-view-tree-new" onClick={() => navigate('/tree')}>VER</button>
            </div>
         </div>

         <div className="tabs-container">
            <div className={`tab ${activeTab === 'assistidos' ? 'active' : ''}`} onClick={() => setActiveTab('assistidos')}>
               <Grid size={14} style={{ marginRight: 6 }} /> Assistidos
            </div>
            <div className={`tab ${activeTab === 'querover' ? 'active' : ''}`} onClick={() => setActiveTab('querover')}>
               <Bookmark size={14} style={{ marginRight: 6 }} /> Quero Ver
            </div>
            <div className={`tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
               <MessageSquare size={14} style={{ marginRight: 6 }} /> Reviews
            </div>
            <div className="tab-indicator" style={{ left: activeTab === 'assistidos' ? '0%' : activeTab === 'querover' ? '33%' : '66%', width: '33.3%' }}></div>
         </div>

         <div className="filter-chips-row">
            <div className="p-chip active">Todos</div>
            <div className="p-chip">Terror</div>
            <div className="p-chip">Thriller</div>
            <div className="p-chip">Sci-Fi</div>
         </div>

         <div className="grid-content">
            {activeTab === 'reviews' ? (
               <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {myReviews.length === 0 && <span style={{ padding: 20, textAlign: 'center', color: '#666' }}>Sem reviews ainda.</span>}
                  {myReviews.map(r => (
                     <div key={r.id} style={{ display: 'flex', gap: 10, padding: 10, backgroundColor: '#111', borderRadius: 8 }}>
                        <img src={r.moviePoster} style={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 4 }} />
                        <div style={{ flex: 1 }}>
                           <h4 style={{ fontSize: 14, fontWeight: 'bold' }}>{r.movieTitle}</h4>
                           <span style={{ fontSize: 11, color: '#E50914' }}>★ {r.rating}</span>
                           <p style={{ fontSize: 12, color: '#ccc', marginTop: 4 }}>{r.text}</p>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <>
                  {currentGrid.length === 0 && (
                     <div style={{ gridColumn: '1 / -1', padding: 20, textAlign: 'center', color: '#666', fontSize: 13 }}>
                        {activeTab === 'querover' ? 'Sua lista está vazia. Adicione filmes!' : 'Nenhum filme assistido.'}
                     </div>
                  )}
                  {currentGrid.map((item, index) => (
                     <div key={index} className="grid-item" onClick={() => item.id && navigate(`/movie/${item.id}`)}>
                        <img src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://via.placeholder.com/200x300'} className="grid-poster" />
                        <div className="grid-rating">★ {item.vote_average ? Number(item.vote_average).toFixed(1) : '0.0'}</div>
                     </div>
                  ))}
               </>
            )}
         </div>

         <div style={{ height: 80 }}></div>
         <BottomNav />

         <style>{`
         .profile-container {
           min-height: 100vh;
           background-color: var(--color-background);
           color: white;
           padding-bottom: 80px;
         }

         .profile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-4);
         }

         .username {
            font-weight: 600;
            font-size: 14px;
         }

         .icon-btn-simple {
            background: none;
            border: none;
            padding: 4px;
            cursor: pointer;
         }

         .profile-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 var(--spacing-4);
            margin-bottom: var(--spacing-4);
         }

         .avatar-wrapper {
            position: relative;
            margin-bottom: var(--spacing-3);
            padding: 4px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FFB800 0%, #E50914 100%);
         }

         .big-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid #050505;
            display: block;
            object-fit: cover;
         }

         .status-dot {
            width: 14px;
            height: 14px;
            background-color: var(--color-success);
            border-radius: 50%;
            border: 1px solid #000;
            position: absolute;
            bottom: 4px;
            right: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
         }
         
         .status-dot:after {
            content: '✓';
            font-size: 8px;
            color: black;
            font-weight: 900;
         }

         .display-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 4px;
         }

         .user-bio {
            font-size: 13px;
            color: #aaa;
            text-align: center;
            max-width: 250px;
            margin-bottom: var(--spacing-4);
            line-height: 1.4;
         }

         .action-row {
            display: flex;
            gap: var(--spacing-2);
            width: 100%;
            justify-content: center;
            margin-bottom: var(--spacing-6);
         }

         .btn-edit-new {
            background-color: var(--color-primary);
            color: white;
            font-weight: 700;
            font-size: 13px;
            flex: 1;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
         }

         .btn-share-new {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #222;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
         }

         .stats-row {
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-bottom: var(--spacing-6);
            border-top: 1px solid rgba(255,255,255,0.05);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding: var(--spacing-3) 0;
         }

         .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
         }

         .stat-num {
            font-weight: 700;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 2px;
         }
         
         .star-mini {
            color: var(--color-warning);
            font-size: 10px;
         }

         .stat-label {
            font-size: 10px;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.5px;
         }

         .invite-tree-card-new {
            width: 100%;
            background: linear-gradient(90deg, #1f1200 0%, #0f0500 100%);
            border: 1px solid #332b00;
            border-radius: var(--radius-md);
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            overflow: hidden;
         }

         .tree-icon-new {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: rgba(255, 184, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
         }

         .tree-info {
            display: flex;
            flex-direction: column;
            flex: 1;
         }

         .tree-label-new {
            font-size: 12px;
            font-weight: 700;
            color: #FFB800;
         }

         .tree-sub-new {
            font-size: 10px;
            color: #aaa;
         }
         
         .tree-extra {
            font-size: 9px;
            color: #FFB800;
            margin-top: 2px;
         }
         
         .highlight-new {
            text-decoration: none;
            color: var(--color-error);
            font-weight: 600;
         }

         .btn-view-tree-new {
            background-color: #FFB800;
            border: none;
            color: black;
            font-size: 10px;
            font-weight: 800;
            padding: 6px 14px;
            border-radius: 4px;
            cursor: pointer;
         }

         .tabs-container {
            display: flex;
            position: relative;
            border-bottom: 1px solid #222;
         }

         .tab {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 0;
            font-size: 13px;
            color: #666;
            cursor: pointer;
            font-weight: 600;
         }
         
         .tab.active {
            color: var(--color-primary);
         }

         .tab-indicator {
            position: absolute;
            bottom: 0;
            height: 2px;
            width: 50%;
            background-color: var(--color-primary);
            transition: left 0.3s ease;
         }
         
         .filter-chips-row {
            display: flex;
            gap: 8px;
            padding: 12px 16px;
            overflow-x: auto;
            border-bottom: 1px solid #111;
         }
         
         .p-chip {
            padding: 4px 12px;
            border-radius: 20px;
            background-color: #111;
            border: 1px solid #222;
            font-size: 11px;
            color: #888;
            white-space: nowrap;
         }
         
         .p-chip.active {
            background-color: var(--color-primary);
            color: white;
            border-color: var(--color-primary);
            font-weight: 600;
         }

         .grid-content {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
            padding: 4px;
         }

         .grid-item {
            position: relative;
            aspect-ratio: 2/3;
            background-color: #111;
         }

         .grid-poster {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
         
         .grid-rating {
            position: absolute;
            top: 4px;
            right: 4px;
            background-color: rgba(0,0,0,0.8);
            color: var(--color-warning);
            font-size: 9px;
            padding: 2px 4px;
            border-radius: 2px;
            font-weight: 700;
         }
       `}</style>
      </div>
   );
};

export default Profile;
