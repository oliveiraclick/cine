import React, { useEffect, useState } from 'react';
import { Search, Bell, Heart, MessageSquare, Bookmark, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { getNowPlaying, getTrending } from '../services/tmdb';

const Feed = () => {
  const navigate = useNavigate();
  const [feedType, setFeedType] = useState('following');
  const [radarItems, setRadarItems] = useState([]);
  const [feedActivities, setFeedActivities] = useState([]);
  const [globalActivities, setGlobalActivities] = useState([]);

  // Mock Users to simulate "Following" activity on real movies
  const mockUsers = [
    { name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?u=4', time: 'Há 2 horas' },
    { name: 'Carlos M.', avatar: 'https://i.pravatar.cc/150?u=5', time: 'Ontem' },
    { name: 'Maria', avatar: 'https://i.pravatar.cc/150?u=2', time: '5 dias atrás' },
    { name: 'Pedro', avatar: 'https://i.pravatar.cc/150?u=3', time: 'Há 12 horas' },
    { name: 'Julia Roberts', avatar: 'https://i.pravatar.cc/150?u=20', time: 'Há 10 min' },
  ];

  useEffect(() => {
    const loadFeed = async () => {
      // 1. Radar (Now Playing)
      const nowPlaying = await getNowPlaying();
      if (nowPlaying?.results) {
        const mappedRadar = nowPlaying.results.slice(0, 5).map((m, i) => ({
          id: m.id,
          title: m.title,
          poster: m.poster_path ? `https://image.tmdb.org/t/p/w200${m.poster_path}` : '',
          rating: m.vote_average.toFixed(1),
          user: mockUsers[i % mockUsers.length].name.split(' ')[0],
          avatar: mockUsers[i % mockUsers.length].avatar
        }));
        setRadarItems(mappedRadar);
      }

      // 2. Feed Activities (Using Random Trending/Popular)
      const trending = await getTrending();
      if (trending?.results) {
        const mappedFeed = trending.results
          .filter(m => m.media_type !== 'person') // Filter out people
          .slice(0, 10)
          .map((m, i) => {
            const user = mockUsers[i % mockUsers.length];
            return {
              id: m.id,
              user: user,
              content: {
                title: m.title || m.name,
                poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
                rating: m.vote_average.toFixed(1),
                text: m.overview ? (m.overview.length > 100 ? m.overview.substring(0, 100) + '...' : m.overview) : 'Sem descrição disponível.',
                likes: Math.floor(Math.random() * 500) + 10,
                comments: Math.floor(Math.random() * 50) + 2
              },
              isShow: m.media_type === 'tv'
            };
          });

        setFeedActivities(mappedFeed.slice(0, 3)); // First 3 for 'Following'
        setGlobalActivities(mappedFeed.slice(3, 8)); // Next 5 for 'Global'
      }
    };

    loadFeed();
  }, []);

  const currentActivities = feedType === 'following' ? feedActivities : globalActivities;

  const StarRating = ({ rating }) => {
    return <div className="rating-badge">★ {rating}</div>
  };

  return (
    <div className="feed-container">
      {/* Header */}
      <header className="feed-header">
        <div className="brand-logo">
          <div className="logo-icon"></div>
          <span>CineSocial</span>
        </div>
        <div className="header-actions">
          <Search size={22} className="header-icon" />
          <Bell size={22} className="header-icon" />
        </div>
      </header>

      {/* Feed Tabs OLD STYLE REMOVED, NEW STYLE */}
      <div className="feed-filter-bar">
        <div className={`filter-opt ${feedType === 'following' ? 'active' : ''}`} onClick={() => setFeedType('following')}>
          Seguindo
          {feedType === 'following' && <div className="active-dot"></div>}
        </div>
        <div className="divider-v"></div>
        <div className={`filter-opt ${feedType === 'global' ? 'active' : ''}`} onClick={() => setFeedType('global')}>
          Global
          {feedType === 'global' && <div className="active-dot"></div>}
        </div>
      </div>

      {/* Main Content Scrollable */}
      <main className="feed-content">

        {/* Radar Section */}
        <section className="radar-section">
          <div className="section-header">
            <h3>Radar do Círculo</h3>
            <span className="see-all">Ver todos</span>
          </div>

          <div className="radar-carousel">
            {radarItems.map(item => (
              <div key={item.id} className="radar-card" onClick={() => navigate(`/movie/${item.id}`)}>
                <div className="poster-wrapper">
                  <img src={item.poster} alt={item.title} className="radar-poster" />
                  <div className="radar-rating">★ {item.rating}</div>
                </div>
                <div className="radar-user">
                  <img src={item.avatar} alt={item.user} className="user-avatar-mini" />
                  <span>{item.user} assistiu</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activities Feed */}
        <section className="activities-section">
          <h3 className="section-title">
            {feedType === 'following' ? 'Atividades do Círculo' : 'Explorar Global'}
          </h3>

          <div className="feed-list">
            {currentActivities.map(item => (
              <div key={item.id} className="feed-card" onClick={() => navigate(`/movie/${item.id}`)}>
                <div className="card-header">
                  <div className="user-info">
                    <img src={item.user.avatar} alt={item.user.name} className="user-avatar" />
                    <div className="user-meta">
                      <span className="user-name">{item.user.name}</span>
                      <span className="post-time">{item.user.time}</span>
                    </div>
                  </div>
                  <MoreHorizontal size={20} color="#666" />
                </div>

                <div className="card-content">
                  <div className="content-poster-wrapper">
                    <img src={item.content.poster} alt={item.content.title} className="content-poster" />
                  </div>
                  <div className="content-details">
                    <h4 className="content-title">{item.content.title}</h4>
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: i < Math.floor(item.content.rating) ? '#E50914' : '#444' }}>★</span>
                      ))}
                      <span className="rating-number">{item.content.rating}</span>
                    </div>
                    <p className="review-text">{item.content.text}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="interaction-left">
                    <div className="interaction-item">
                      <Heart size={18} color="#fff" fill={item.content.likes > 100 ? '#E50914' : 'none'} stroke={item.content.likes > 100 ? 'none' : '#fff'} />
                      <span>{item.content.likes}</span>
                    </div>
                    <div className="interaction-item">
                      <MessageSquare size={18} />
                      <span>{item.content.comments}</span>
                    </div>
                  </div>
                  <Bookmark size={18} className="bookmark-icon" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer for bottom nav */}
        <div style={{ height: 80 }}></div>
      </main>

      <BottomNav />

      <style>{`
        .feed-container {
          min-height: 100vh;
          background-color: var(--color-background);
          color: white;
        }

        .feed-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background-color: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-4);
          height: 60px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .logo-icon {
          width: 24px;
          height: 24px;
          background-color: var(--color-primary);
          mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/></svg>') no-repeat center;
          -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/></svg>') no-repeat center;
        }

        .header-actions {
          display: flex;
          gap: var(--spacing-4);
        }

        .header-icon {
          color: #ddd;
        }

        .feed-content {
          padding: 0 var(--spacing-4);
        }

        /* Radar Section */
        .radar-section {
          margin-bottom: var(--spacing-6);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-3);
        }

        .section-header h3 {
          font-size: var(--font-size-base);
          font-weight: 700;
        }

        .see-all {
          font-size: 12px;
          color: var(--color-error);
        }

        .radar-carousel {
          display: flex;
          gap: var(--spacing-3);
          overflow-x: auto;
          padding-bottom: var(--spacing-2);
          scrollbar-width: none;
        }
        
        .radar-carousel::-webkit-scrollbar {
          display: none;
        }

        .radar-card {
          flex: 0 0 100px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
        }

        .poster-wrapper {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 2/3;
        }

        .radar-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .radar-rating {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(0,0,0,0.7);
          color: var(--color-warning);
          font-size: 10px;
          padding: 2px 4px;
          border-radius: 4px;
          font-weight: 600;
        }

        .radar-user {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: #aaa;
        }

        .user-avatar-mini {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }

        /* Activities Section */
        .section-title {
          font-size: var(--font-size-lg);
          font-weight: 700;
          margin-bottom: var(--spacing-4);
        }

        .feed-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .feed-card {
          background-color: var(--color-surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-4);
          cursor: pointer;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-3);
        }

        .user-info {
          display: flex;
          gap: var(--spacing-3);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-meta {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
        }

        .post-time {
          font-size: 11px;
          color: #888;
        }

        .card-content {
          display: flex;
          gap: var(--spacing-3);
          margin-bottom: var(--spacing-3);
        }

        .content-poster-wrapper {
          flex: 0 0 70px;
        }

        .content-poster {
          width: 100%;
          border-radius: 6px;
          aspect-ratio: 2/3;
          object-fit: cover;
        }

        .content-details {
          flex: 1;
        }

        .content-title {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .stars-row {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .rating-number {
          margin-left: 4px;
          color: #888;
        }

        .review-text {
          font-size: 13px;
          color: #ccc;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-2);
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .interaction-left {
          display: flex;
          gap: var(--spacing-4);
        }

        .interaction-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #aaa;
        }

        .bookmark-icon {
          color: #666;
        }

        .feed-filter-bar {
           display: flex;
           justify-content: center;
           align-items: center;
           gap: 20px;
           margin-bottom: 20px;
           border-bottom: 1px solid rgba(255,255,255,0.05);
           padding-bottom: 10px;
        }

        .filter-opt {
           font-size: 14px;
           font-weight: 700;
           color: #666;
           cursor: pointer;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .filter-opt.active {
           color: white;
           font-size: 15px;
        }

        .active-dot {
           width: 4px; height: 4px;
           background-color: var(--color-primary);
           border-radius: 50%;
           margin-top: 4px;
        }

        .divider-v {
            width: 1px;
            height: 16px;
            background-color: #333;
        }
      `}</style>
    </div>
  );
};

export default Feed;
