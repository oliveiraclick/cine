import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const LikesList = () => {
   const navigate = useNavigate();

   const [likes, setLikes] = useState([
      { id: 1, name: 'João Silva', handle: '@joao.silva', avatar: 'https://ui-avatars.com/api/?name=Joao+Silva&background=random', following: false },
      { id: 2, name: 'Ana Costa', handle: '@ana_movies', avatar: 'https://ui-avatars.com/api/?name=Ana+Costa&background=random', following: true },
      { id: 3, name: 'Marcos Oliveira', handle: '@marcos_critico', avatar: 'https://ui-avatars.com/api/?name=Marcos+Oliveira&background=random', following: false },
      { id: 4, name: 'Lucas Santos', handle: '@lucas_reviews', avatar: 'https://ui-avatars.com/api/?name=Lucas+Santos&background=random', following: false },
      { id: 5, name: 'Julia Mendes', handle: '@julia_pipoca', avatar: 'https://ui-avatars.com/api/?name=Julia+Mendes&background=random', following: true },
      { id: 6, name: 'Pedro Alvaro', handle: '@pedro.nels', avatar: 'https://ui-avatars.com/api/?name=Pedro+Alvaro&background=random', following: false },
      { id: 7, name: 'Beatriz F.', handle: '@beatriz_f', avatar: 'https://ui-avatars.com/api/?name=Beatriz+F&background=random', following: false },
   ]);

   const toggleFollow = (id) => {
      setLikes(likes.map(user =>
         user.id === id ? { ...user, following: !user.following } : user
      ));
   };

   return (
      <div className="likes-container">
         <div className="header">
            <button onClick={() => navigate('/review/1')} className="back-btn"><ChevronLeft color="white" /></button>
            <div className="header-text">
               <span className="title">Curtido por</span>
               <span className="subtitle">43 pessoas</span>
            </div>
            <div style={{ width: 24 }}></div>
         </div>

         <div className="list">
            {likes.map(user => (
               <div key={user.id} className="user-row">
                  <img src={user.avatar} className="avatar" />
                  <div className="u-info">
                     <span className="name">{user.name}</span>
                     <span className="handle">{user.handle}</span>
                  </div>
                  <button
                     className={`follow-btn ${user.following ? 'following' : ''}`}
                     onClick={() => toggleFollow(user.id)}
                  >
                     {user.following ? 'Seguindo' : 'Seguir'}
                  </button>
               </div>
            ))}
         </div>

         <style>{`
        .likes-container {
           min-height: 100vh;
           background-color: #050505;
           color: white;
           padding: var(--spacing-4);
        }

        .header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 30px;
        }

        .back-btn {
           background: none;
           border: none;
           cursor: pointer;
           padding: 0;
        }

        .header-text {
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .title {
           font-weight: 700;
           font-size: 14px;
        }

        .subtitle {
           font-size: 10px;
           color: #888;
        }

        .list {
           display: flex;
           flex-direction: column;
           gap: 20px;
        }

        .user-row {
           display: flex;
           align-items: center;
           gap: 12px;
        }

        .avatar {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           border: 1px solid #333;
        }

        .u-info {
           flex: 1;
           display: flex;
           flex-direction: column;
        }

        .name {
           font-size: 13px;
           font-weight: 600;
        }

        .handle {
           font-size: 11px;
           color: #888;
        }

        .follow-btn {
           padding: 6px 16px;
           border-radius: 4px;
           font-size: 11px;
           font-weight: 700;
           cursor: pointer;
           transition: all 0.2s;
           border: none;
        }
        
        .follow-btn:not(.following) {
           background-color: var(--color-primary);
           color: white;
        }
        
        .follow-btn.following {
           background-color: transparent;
           border: 1px solid #444;
           color: #ccc;
        }

      `}</style>
      </div>
   );
};

export default LikesList;
