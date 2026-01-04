import React, { useState } from 'react';
import { ChevronLeft, Lock, Award, Star, Zap, Users, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Achievements = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('badges');

    const badges = [
        { id: 1, name: 'Pioneiro', desc: 'Entrou no Beta', icon: <Star size={24} color="#FFD700" />, unlocked: true, level: 'gold' },
        { id: 2, name: 'Crítico', desc: '5 Reviews feitas', icon: <MessageSquareIcon />, unlocked: true, level: 'silver' },
        { id: 3, name: 'Influencer', desc: 'Convidou 5 amigos', icon: <Users size={24} color="#CD7F32" />, unlocked: true, level: 'bronze' },
        { id: 4, name: 'Maratonista', desc: 'Assistiu 50 horas', icon: <Zap size={24} color="#555" />, unlocked: false, level: 'locked' },
        { id: 5, name: 'Cinéfilo', desc: 'Acertou 10 Quiz', icon: <Trophy size={24} color="#555" />, unlocked: false, level: 'locked' },
        { id: 6, name: 'VIP', desc: 'Assinante Premium', icon: <Award size={24} color="#555" />, unlocked: false, level: 'locked' },
    ];

    // Custom Icon for Critical to avoid import error if not defined above, using Star as placeholder in array but fixing here
    const MessageSquareIcon = () => <div style={{ width: 24, height: 24, background: '#C0C0C0', mask: 'url()', borderRadius: 4 }}></div>;


    return (
        <div className="achievements-container">
            <div className="header">
                <button className="icon-btn" onClick={() => navigate(-1)}><ChevronLeft color="white" /></button>
                <span className="title">Conquistas</span>
                <div style={{ width: 40 }}></div>
            </div>

            <div className="level-card">
                <div className="level-ring">
                    <div className="ring-content">
                        <span className="lvl-label">NÍVEL</span>
                        <span className="lvl-num">2</span>
                    </div>
                    <svg className="progress-ring" width="120" height="120">
                        <circle stroke="#222" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" />
                        <circle stroke="#E50914" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" strokeDasharray="326" strokeDashoffset="100" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="level-info">
                    <h2>Embaixador</h2>
                    <p>240 / 500 XP para o Nível 3</p>
                    <div className="xp-bar-bg">
                        <div className="xp-bar-fill" style={{ width: '48%' }}></div>
                    </div>
                </div>
            </div>

            <div className="tabs">
                <div className={`tab ${activeTab === 'badges' ? 'active' : ''}`} onClick={() => setActiveTab('badges')}>MEDALHAS</div>
                <div className={`tab ${activeTab === 'missions' ? 'active' : ''}`} onClick={() => setActiveTab('missions')}>MISSÕES</div>
            </div>

            {activeTab === 'badges' ? (
                <div className="grid-badges">
                    {badges.map(badge => (
                        <div key={badge.id} className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
                            <div className={`icon-circle ${badge.level}`}>
                                {badge.unlocked ? badge.icon : <Lock size={20} color="#666" />}
                            </div>
                            <span className="badge-name">{badge.name}</span>
                            <span className="badge-desc">{badge.desc}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="missions-list">
                    <div className="mission-item">
                        <div className="check-circle done"><div className="inner-dot"></div></div>
                        <div className="mission-info">
                            <span className="m-title">Avalie um filme hoje</span>
                            <span className="m-xp">+50 XP</span>
                        </div>
                    </div>
                    <div className="mission-item">
                        <div className="check-circle"></div>
                        <div className="mission-info">
                            <span className="m-title">Convide um amigo</span>
                            <span className="m-xp">+100 XP</span>
                        </div>
                    </div>
                    <div className="mission-item">
                        <div className="check-circle"></div>
                        <div className="mission-info">
                            <span className="m-title">Compartilhe no Instagram</span>
                            <span className="m-xp">+150 XP</span>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .achievements-container {
           min-height: 100vh;
           background-color: #080808;
           color: white;
           padding: var(--spacing-4);
        }

        .header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 24px;
        }

        .icon-btn {
           background: #1a1a1a;
           border: none;
           width: 40px; height: 40px;
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           cursor: pointer;
        }

        .title {
            font-weight: 700;
            font-size: 16px;
        }

        .level-card {
           background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
           border-radius: 20px;
           padding: 24px;
           display: flex;
           align-items: center;
           gap: 20px;
           margin-bottom: 30px;
           border: 1px solid #222;
           box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .level-ring {
            position: relative;
            width: 80px; height: 80px;
            display: flex; align-items: center; justify-content: center;
        }

        .progress-ring {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) rotate(-90deg);
            width: 100%; height: 100%;
        }

        .ring-content {
            display: flex; flex-direction: column; align-items: center;
            z-index: 2;
        }

        .lvl-label { font-size: 8px; color: #888; letter-spacing: 1px; }
        .lvl-num { font-size: 24px; font-weight: 900; color: white; line-height: 1; }

        .level-info h2 {
            font-size: 20px;
            font-weight: 800;
            background: linear-gradient(to right, #fff, #999);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 4px;
        }

        .level-info p {
            font-size: 11px; color: #666; margin-bottom: 12px;
        }

        .xp-bar-bg {
            width: 100%; height: 6px; background: #333; border-radius: 3px;
        }

        .xp-bar-fill {
            height: 100%; background: var(--color-primary); border-radius: 3px;
            box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
        }

        .tabs {
            display: flex; gap: 20px; margin-bottom: 24px; border-bottom: 1px solid #222;
        }

        .tab {
            padding-bottom: 12px; font-size: 12px; font-weight: 700; color: #666; cursor: pointer; letter-spacing: 0.5px;
        }

        .tab.active {
            color: var(--color-primary); border-bottom: 2px solid var(--color-primary);
        }

        .grid-badges {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }

        .badge-card {
            background: #111; border-radius: 12px; padding: 16px 8px;
            display: flex; flex-direction: column; align-items: center; text-align: center;
            border: 1px solid #222;
        }

        .badge-card.unlocked {
            background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
            border-color: #333;
        }

        .icon-circle {
            width: 48px; height: 48px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 12px;
            background: #080808;
        }

        .icon-circle.gold { border: 2px solid #FFD700; box-shadow: 0 0 15px rgba(255, 215, 0, 0.2); }
        .icon-circle.silver { border: 2px solid #C0C0C0; box-shadow: 0 0 15px rgba(192, 192, 192, 0.1); }
        .icon-circle.bronze { border: 2px solid #CD7F32; }
        .icon-circle.locked { border: 1px dashed #444; }

        .badge-name { font-size: 11px; font-weight: 700; margin-bottom: 4px; color: #ddd; }
        .badge-desc { font-size: 9px; color: #666; }

        .missions-list {
            display: flex; flex-direction: column; gap: 12px;
        }

        .mission-item {
            display: flex; align-items: center; gap: 16px;
            background: #111; padding: 16px; border-radius: 12px; border: 1px solid #222;
        }

        .check-circle {
            width: 24px; height: 24px; border-radius: 50%; border: 2px solid #444;
            display: flex; align-items: center; justify-content: center;
        }

        .check-circle.done { border-color: var(--color-primary); }
        .inner-dot { width: 12px; height: 12px; background: var(--color-primary); border-radius: 50%; }

        .mission-info { display: flex; flex-direction: column; }
        .m-title { font-size: 13px; font-weight: 600; color: #ddd; }
        .m-xp { font-size: 11px; color: var(--color-primary); font-weight: 700; }

      `}</style>
        </div>
    );
};

export default Achievements;
