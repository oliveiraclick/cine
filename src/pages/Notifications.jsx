import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Film, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const Notifications = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('todos');

    const notifications = [
        {
            id: 1,
            type: 'indication',
            user: { name: 'Sofia', avatar: 'https://i.pravatar.cc/150?u=12' },
            content: {
                text: 'indicou Interestellar para você',
                message: '"Você precisa assistir pela viagem de som, é simplesmente incrível..."',
                time: '2h atrás',
                poster: 'https://image.tmdb.org/t/p/w200/gEU2QniL6E8ahDaX06e8q288UL.jpg'
            },
            uncooked: true
        },
        {
            id: 2,
            type: 'invite',
            user: { name: 'Mari', avatar: 'https://i.pravatar.cc/150?u=9' },
            content: {
                text: 'tem 2 convites restantes',
                message: 'Convide amigos para a comunidade exclusiva!',
                time: '5h atrás'
            },
            uncooked: true
        },
        {
            id: 3,
            type: 'like',
            users: ['Lucas', '2 outros'],
            content: {
                text: 'curtiram sua review de O Poderoso Chefão',
                poster: 'https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
                time: 'Ontem'
            }
        },
        {
            id: 4,
            type: 'comment',
            user: { name: 'Elena', avatar: 'https://i.pravatar.cc/150?u=20' },
            content: {
                text: 'comentou em Izukén',
                message: '"Concordo totalmente sobre a paleta de cores, foi uma escolha..."',
                poster: null,
                colorInfo: true,
                time: 'Ontem'
            }
        },
        {
            id: 5,
            type: 'watch',
            user: { name: 'Marcos', avatar: 'https://i.pravatar.cc/150?u=25' },
            content: {
                text: 'assistiu Dune: Parte 2',
                rating: 4.5,
                poster: 'https://image.tmdb.org/t/p/w200/5aUVLiQCgqKMt6J4sY2b1F.jpg',
                time: '3d atrás'
            }
        }
    ];

    return (
        <div className="notif-container">
            <div className="notif-header">
                <h2 className="header-title">Notificações</h2>
                <span className="mark-read">Marcar como lidas</span>
            </div>

            <div className="filter-tabs">
                <div className={`tab-chip ${filter === 'todos' ? 'active' : ''}`} onClick={() => setFilter('todos')}>Todos</div>
                <div className={`tab-chip ${filter === 'recs' ? 'active' : ''}`} onClick={() => setFilter('recs')}>Recomendações</div>
                <div className={`tab-chip ${filter === 'comments' ? 'active' : ''}`} onClick={() => setFilter('comments')}>Comentários</div>
            </div>

            <div className="notif-list">
                <div className="section-label">NOVO</div>

                {notifications.slice(0, 2).map(item => (
                    <div key={item.id} className={`notif-item ${item.uncooked ? 'uncooked' : ''}`}>
                        {item.type === 'indication' && (
                            <>
                                <div className="avatar-container">
                                    <img src={item.user.avatar} className="notif-avatar" />
                                    <div className="play-badge">▶</div>
                                </div>
                                <div className="notif-body">
                                    <p className="notif-text">
                                        <span className="bold">{item.user.name}</span> indicou <span className="highlight-text bold">Interestelar</span> para você
                                    </p>
                                    <p className="notif-quote">{item.content.message}</p>
                                    <span className="notif-time">{item.content.time}</span>
                                </div>
                                {item.content.poster && <img src={item.content.poster} className="notif-poster" />}
                            </>
                        )}
                        {item.type === 'invite' && (
                            <>
                                <div className="icon-wrapper-circle">
                                    <Film size={20} color="white" />
                                </div>
                                <div className="notif-body">
                                    <p className="notif-text">
                                        Você tem <span className="highlight-text bold">2 convites</span> restantes
                                    </p>
                                    <p className="notif-sub">{item.content.message}</p>
                                </div>
                                <div className="dot-indicator"></div>
                            </>
                        )}
                    </div>
                ))}

                <div className="section-label">ANTERIORES</div>

                {notifications.slice(2).map(item => (
                    <div key={item.id} className="notif-item">
                        {item.type === 'like' && (
                            <>
                                <div className="like-icon-wrapper">
                                    <Heart size={16} fill="white" stroke="none" />
                                </div>
                                <div className="notif-body">
                                    <p className="notif-text">
                                        <span className="bold">{item.users[0]}</span> e outros <span className="bold">{item.users[1]}</span> curtiram sua review de <span className="bold">O Poderoso Chefão</span>
                                    </p>
                                    <span className="notif-time">{item.content.time}</span>
                                </div>
                                <img src={item.content.poster} className="notif-poster" />
                            </>
                        )}

                        {item.type === 'comment' && (
                            <>
                                <img src={item.user.avatar} className="notif-avatar" />
                                <div className="notif-body">
                                    <p className="notif-text">
                                        <span className="bold">{item.user.name}</span> comentou em <span className="bold">Barbie</span>
                                    </p>
                                    <p className="notif-quote">{item.content.message}</p>
                                    <span className="notif-time">{item.content.time}</span>
                                </div>
                                {item.content.colorInfo && <div className="color-block"></div>}
                            </>
                        )}

                        {item.type === 'watch' && (
                            <>
                                <img src={item.user.avatar} className="notif-avatar" />
                                <div className="notif-body">
                                    <p className="notif-text">
                                        <span className="bold">{item.user.name}</span> avaliou <span className="bold">Dune: Parte 2</span>
                                    </p>
                                    <div className="rating-row">★★★★★ <span style={{ fontSize: 10, color: '#888' }}>4.8</span></div>
                                    <span className="notif-time">{item.content.time}</span>
                                </div>
                                <img src={item.content.poster} className="notif-poster" />
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ height: 80 }}></div>
            <BottomNav />

            <style>{`
        .notif-container {
           min-height: 100vh;
           background-color: var(--color-background);
           color: white;
           padding: var(--spacing-4);
        }

        .notif-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: var(--spacing-4);
        }

        .header-title {
           font-size: 20px;
           font-weight: 700;
        }

        .mark-read {
           font-size: 11px;
           color: var(--color-error);
           font-weight: 600;
           cursor: pointer;
        }

        .filter-tabs {
           display: flex;
           gap: var(--spacing-2);
           margin-bottom: var(--spacing-6);
           overflow-x: auto;
           padding-bottom: 4px;
        }

        .tab-chip {
           padding: 6px 16px;
           background-color: #222;
           border: none;
           border-radius: var(--radius-full);
           font-size: 11px;
           color: #888;
           cursor: pointer;
           white-space: nowrap;
        }

        .tab-chip.active {
           background-color: var(--color-error);
           color: white;
           font-weight: 600;
        }

        .section-label {
           font-size: 10px;
           color: #666;
           margin-bottom: var(--spacing-2);
           font-weight: 600;
           margin-top: var(--spacing-4);
           text-transform: uppercase;
        }

        .notif-list {
           display: flex;
           flex-direction: column;
           gap: var(--spacing-2);
        }

        .notif-item {
           display: flex;
           gap: 12px;
           padding: 12px 0;
           position: relative;
        }
        
        /* Red dot for cooked/uncooked if needed, or left border */
        .notif-item.uncooked::before {
            content: '•';
            color: var(--color-error);
            position: absolute;
            left: -12px;
            top: 12px;
            font-size: 20px;
            line-height: 1;
        }

        .avatar-container {
            position: relative;
            width: 40px;
            height: 40px;
        }

        .notif-avatar {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           object-fit: cover;
        }
        
        .play-badge {
            position: absolute;
            bottom: 0px;
            right: -4px;
            width: 16px;
            height: 16px;
            background-color: var(--color-error);
            border-radius: 50%;
            border: 2px solid var(--color-background);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            color: white;
        }

        .notif-body {
           flex: 1;
           display: flex;
           flex-direction: column;
           justify-content: center;
        }

        .notif-text {
           font-size: 13px;
           line-height: 1.3;
           margin-bottom: 4px;
           color: #ddd;
        }

        .bold {
           font-weight: 700;
           color: white;
        }
        
        .highlight-text {
           color: var(--color-error);
        }

        .notif-quote {
           font-size: 11px;
           color: #888;
           font-style: italic;
           margin-bottom: 4px;
           line-height: 1.3;
           border-left: 2px solid #333;
           padding-left: 8px;
        }
        
        .notif-sub {
            font-size: 11px;
            color: #888;
        }

        .notif-time {
           font-size: 10px;
           color: #555;
        }

        .notif-poster {
           width: 40px;
           height: 60px;
           border-radius: 4px;
           object-fit: cover;
        }
        
        .icon-wrapper-circle {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           background-color: #222;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        
        .like-icon-wrapper {
           width: 40px;
           height: 40px;
           display: flex;
           justify-content: center;
           align-items: center;
           background-color: #1a0505; /* Darker red bg */
           border-radius: 50%;
        }
        
        .like-icon-wrapper svg {
            fill: var(--color-error);
        }
        
        .color-block {
           width: 40px;
           height: 40px;
           background-color: #ff00de;
           border-radius: 4px;
        }
        
        .rating-row {
           font-size: 10px;
           color: #FFB800;
           margin-bottom: 2px;
        }

      `}</style>
        </div>
    );
};


export default Notifications;
