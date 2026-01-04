import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Megaphone, Plus, Trash2, Eye, BarChart2, TrendingUp, Award } from 'lucide-react';
import { getAds, addAd, deleteAd, getReviews, getWatchlist } from '../services/storage';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [ads, setAds] = useState([]);
    const [newAdUrl, setNewAdUrl] = useState('');
    const [stats, setStats] = useState({ users: 0, reviews: 0, recommendations: 0 });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setAds(getAds());
        const reviews = getReviews();
        // Mock User Count relative to reviews or just random base
        setStats({
            users: 142 + reviews.length, // Mock growth
            reviews: reviews.length + 85, // Real + Mock base
            recommendations: Math.floor((reviews.length + 85) * 1.5)
        });
    };

    const handleAddAd = () => {
        if (!newAdUrl) return;
        addAd(newAdUrl, '#');
        setNewAdUrl('');
        loadData();
    };

    const handleDeleteAd = (id) => {
        deleteAd(id);
        loadData();
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <div className="admin-logo">CS Admin</div>
                <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                    <LayoutDashboard size={20} /> Dashboard
                </div>
                <div className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                    <Users size={20} /> Usuários
                </div>
                <div className={`nav-item ${activeTab === 'ads' ? 'active' : ''}`} onClick={() => setActiveTab('ads')}>
                    <Megaphone size={20} /> Publicidade
                </div>
            </div>

            <main className="admin-content">
                <header className="admin-header">
                    <h2>{activeTab === 'dashboard' ? 'Visão Geral' : activeTab === 'users' ? 'Gestão de Usuários' : 'Gerenciador de Anúncios'}</h2>
                </header>

                {activeTab === 'dashboard' && (
                    <div className="dashboard-grid">
                        <div className="stat-card">
                            <div className="stat-icon users"><Users size={24} color="#4cd137" /></div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.users}</span>
                                <span className="stat-label">Usuários Totais</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon reviews"><BarChart2 size={24} color="#00a8ff" /></div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.reviews}</span>
                                <span className="stat-label">Reviews Publicadas</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon recs"><TrendingUp size={24} color="#e1b12c" /></div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.recommendations}</span>
                                <span className="stat-label">Indicações Geradas</span>
                            </div>
                        </div>

                        {/* Leaderboard */}
                        <div className="leaderboard-section">
                            <h3><Award size={18} /> Top Influenciadores (Quem mais indica)</h3>
                            <div className="lb-table">
                                <div className="lb-header">
                                    <span>Usuário</span>
                                    <span>Indicações</span>
                                    <span>Rank</span>
                                </div>
                                {/* Mock Leaderboard Data */}
                                <div className="lb-row">
                                    <div className="lb-user"><img src="https://i.pravatar.cc/150?u=4" /> Ana Silva</div>
                                    <span>42</span>
                                    <span className="lb-rank">#1</span>
                                </div>
                                <div className="lb-row">
                                    <div className="lb-user"><img src="https://i.pravatar.cc/150?u=8" /> Felipe Costa</div>
                                    <span>38</span>
                                    <span className="lb-rank">#2</span>
                                </div>
                                <div className="lb-row">
                                    <div className="lb-user"><img src="https://i.pravatar.cc/150?u=99" /> Você</div>
                                    <span>{getReviews().length}</span>
                                    <span className="lb-rank">#3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'ads' && (
                    <div className="ads-manager">
                        <div className="add-ad-box">
                            <h3>Adicionar Novo Anúncio</h3>
                            <div className="input-row">
                                <input
                                    type="text"
                                    placeholder="Cole a URL da imagem aqui..."
                                    className="ad-input"
                                    value={newAdUrl}
                                    onChange={(e) => setNewAdUrl(e.target.value)}
                                />
                                <button className="btn-add" onClick={handleAddAd}><Plus size={18} /> Adicionar</button>
                            </div>
                        </div>

                        <div className="ads-list">
                            <h3>Anúncios Ativos ({ads.length})</h3>
                            {ads.length === 0 && <p style={{ color: '#666' }}>Nenhum anúncio rodando. O padrão será exibido.</p>}
                            <div className="ads-grid">
                                {ads.map(ad => (
                                    <div key={ad.id} className="ad-card">
                                        <img src={ad.imageUrl} className="ad-preview" />
                                        <div className="ad-stats">
                                            <div className="view-count"><Eye size={14} /> {ad.views} visualizações</div>
                                            <button className="btn-delete" onClick={() => handleDeleteAd(ad.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div style={{ padding: 20, color: '#666' }}>
                        Funcionalidade de gestão de usuários em desenvolvimento.
                        <br />
                        Visualização da lista completa de <b>{stats.users}</b> usuários.
                    </div>
                )}
            </main>

            <style>{`
                .admin-container {
                    display: flex;
                    min-height: 100vh;
                    background-color: #101010;
                    color: white;
                }

                .admin-sidebar {
                    width: 250px;
                    background-color: #0a0a0a;
                    border-right: 1px solid #222;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .admin-logo {
                    font-size: 24px;
                    font-weight: 800;
                    color: #E50914;
                    margin-bottom: 30px;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border-radius: 8px;
                    color: #888;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .nav-item:hover, .nav-item.active {
                    background-color: #1a1a1a;
                    color: white;
                }

                .admin-content {
                    flex: 1;
                    padding: 30px;
                    overflow-y: auto;
                }

                .admin-header {
                    margin-bottom: 30px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #222;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .stat-card {
                    background-color: #1a1a1a;
                    padding: 20px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border: 1px solid #333;
                }

                .stat-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(255,255,255,0.05);
                }

                .stat-info {
                    display: flex;
                    flex-direction: column;
                }

                .stat-value {
                    font-size: 28px;
                    font-weight: 800;
                }

                .stat-label {
                    font-size: 12px;
                    color: #888;
                    text-transform: uppercase;
                }

                .leaderboard-section {
                    grid-column: 1 / -1;
                    background-color: #151515;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid #333;
                }
                
                .leaderboard-section h3 {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    color: #FFB800;
                }

                .lb-table {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .lb-header, .lb-row {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr;
                    padding: 10px;
                    border-bottom: 1px solid #222;
                }
                
                .lb-header {
                    color: #888;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .lb-user {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .lb-user img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                }

                .lb-rank {
                    font-weight: 800;
                    color: #E50914;
                }

                /* Ads Manager */
                .add-ad-box {
                    background-color: #1a1a1a;
                    padding: 20px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                    border: 1px solid #333;
                }

                .add-ad-box h3 {
                    margin-bottom: 15px;
                    font-size: 16px;
                }

                .input-row {
                    display: flex;
                    gap: 10px;
                }

                .ad-input {
                    flex: 1;
                    padding: 12px;
                    background-color: #0a0a0a;
                    border: 1px solid #333;
                    border-radius: 8px;
                    color: white;
                }

                .btn-add {
                    background-color: var(--color-primary);
                    color: white;
                    border: none;
                    padding: 0 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .ads-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }

                .ad-card {
                    background-color: #1a1a1a;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid #333;
                }

                .ad-preview {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                }

                .ad-stats {
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #222;
                }

                .view-count {
                    font-size: 12px;
                    color: #aaa;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .btn-delete {
                    background-color: transparent;
                    border: none;
                    color: var(--color-error);
                    cursor: pointer;
                    padding: 4px;
                }

                .btn-delete:hover {
                    background-color: rgba(229, 9, 20, 0.1);
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default Admin;
