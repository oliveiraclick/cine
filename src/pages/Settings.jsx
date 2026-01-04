import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User, Bell, Lock, HelpCircle, FileText, LogOut } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const SettingsPage = () => {
    const navigate = useNavigate();

    const [pushNotif, setPushNotif] = useState(true);
    const [emailDigest, setEmailDigest] = useState(false);
    const [recommendations, setRecommendations] = useState(true);

    const Toggle = ({ value, onChange }) => (
        <div
            className={`toggle-switch ${value ? 'active' : ''}`}
            onClick={() => onChange(!value)}
        >
            <div className="toggle-circle"></div>
        </div>
    );

    return (
        <div className="settings-container">
            <div className="header">
                <button onClick={() => navigate(-1)} className="back-btn"><ChevronLeft color="white" /></button>
                <span className="title">Configurações</span>
                <div style={{ width: 24 }}></div>
            </div>

            <div className="user-card">
                <div className="user-card-left">
                    <img src="https://ui-avatars.com/api/?name=Joao+Silva&background=E50914&color=fff" className="s-avatar" />
                    <div className="s-info">
                        <span className="s-name">João Silva</span>
                        <span className="s-handle">@joaosilva</span>
                        <span className="s-badge">Membro Premium</span>
                    </div>
                </div>
            </div>

            <div className="section-label">NOTIFICAÇÕES</div>
            <div className="settings-group">
                <div className="setting-item">
                    <div className="set-label-row">
                        <div className="icon-wrap red"><Bell size={14} color="#E50914" /></div>
                        <span>Notificações Push</span>
                    </div>
                    <Toggle value={pushNotif} onChange={setPushNotif} />
                </div>
                <div className="setting-item">
                    <div className="set-label-row">
                        <div className="icon-wrap blue"><FileText size={14} color="#3b5998" /></div>
                        <span>Resumo por Email</span>
                    </div>
                    <Toggle value={emailDigest} onChange={setEmailDigest} />
                </div>
                <div className="setting-item">
                    <div className="set-label-row">
                        <div className="icon-wrap purple"><Bell size={14} color="#9C27B0" /></div>
                        <span>Tipos de Notificação</span>
                    </div>
                    <div className="set-value-row">
                        <span className="set-sub">Reviews, Convites</span>
                        <ChevronRight size={16} color="#666" />
                    </div>
                </div>
            </div>

            <div className="section-label">PRIVACIDADE</div>
            <div className="settings-group">
                <div className="setting-item">
                    <div className="set-label-row">
                        <div className="icon-wrap green"><User size={14} color="#46D369" /></div>
                        <span>Visibilidade do Perfil</span>
                    </div>
                    <div className="set-value-row">
                        <span className="set-sub">Apenas Amigos</span>
                        <ChevronRight size={16} color="#666" />
                    </div>
                </div>
                <div className="setting-item">
                    <div className="set-label-row">
                        <div className="icon-wrap orange"><Lock size={14} color="#FFB800" /></div>
                        <span>Recomendações</span>
                    </div>
                    <Toggle value={recommendations} onChange={setRecommendations} />
                </div>
            </div>

            <div className="section-label">GERAL</div>
            <div className="settings-group">
                <div className="setting-item">
                    <div className="set-label-row">
                        <div className="icon-wrap gray"><HelpCircle size={14} color="#ccc" /></div>
                        <span>Central de Ajuda</span>
                    </div>
                    <ChevronRight size={16} color="#666" />
                </div>
                <div className="setting-item">
                    <div className="set-label-row">
                        <div className="icon-wrap gray"><FileText size={14} color="#ccc" /></div>
                        <span>Termos de Serviço</span>
                    </div>
                    <ChevronRight size={16} color="#666" />
                </div>
            </div>

            <button className="btn-logout" onClick={() => navigate('/')}>
                <LogOut size={16} /> Sair da Conta
            </button>

            <p className="version-text">Versão 24.0 (Build 1802)</p>

            <div style={{ height: 80 }}></div>
            <BottomNav />

            <style>{`
        .settings-container {
           min-height: 100vh;
           background-color: #050505;
           color: white;
           padding: var(--spacing-4);
        }

        .header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 24px;
        }

        .back-btn {
           background: none;
           border: none;
           cursor: pointer;
        }

        .title {
           font-weight: 700;
           font-size: 16px;
        }

        .user-card {
           background-color: #111;
           border-radius: 12px;
           padding: 16px;
           margin-bottom: 30px;
           border: 1px solid #222;
        }

        .user-card-left {
           display: flex;
           align-items: center;
           gap: 12px;
        }

        .s-avatar {
           width: 48px;
           height: 48px;
           border-radius: 50%;
        }

        .s-info {
           display: flex;
           flex-direction: column;
        }

        .s-name {
           font-weight: 700;
           font-size: 14px;
        }

        .s-handle {
           font-size: 12px;
           color: #888;
        }
        
        .s-badge {
            font-size: 10px;
            color: var(--color-primary);
            margin-top: 2px;
            font-weight: 600;
        }

        .section-label {
           font-size: 10px;
           color: #666;
           font-weight: 700;
           margin-bottom: 8px;
           margin-left: 4px;
        }

        .settings-group {
           background-color: #111;
           border-radius: 12px;
           padding: 0 16px;
           margin-bottom: 24px;
           border: 1px solid #222;
        }

        .setting-item {
           display: flex;
           align-items: center;
           justify-content: space-between;
           padding: 16px 0;
           border-bottom: 1px solid #222;
        }
        
        .setting-item:last-child {
           border-bottom: none;
        }

        .set-label-row {
           display: flex;
           align-items: center;
           gap: 12px;
           font-size: 13px;
        }
        
        .icon-wrap {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255,255,255,0.05);
        }
        
        .icon-wrap.red { background-color: rgba(229, 9, 20, 0.1); }
        .icon-wrap.blue { background-color: rgba(59, 89, 152, 0.1); }
        .icon-wrap.green { background-color: rgba(70, 211, 105, 0.1); }
        .icon-wrap.orange { background-color: rgba(255, 184, 0, 0.1); }
        .icon-wrap.purple { background-color: rgba(156, 39, 176, 0.1); }

        .set-value-row {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .set-sub {
            font-size: 11px;
            color: #666;
        }

        .toggle-switch {
           width: 40px;
           height: 22px;
           background-color: #333;
           border-radius: 20px;
           position: relative;
           cursor: pointer;
           transition: background-color 0.2s;
        }
        
        .toggle-switch.active {
           background-color: var(--color-primary);
        }
        
        .toggle-circle {
           width: 18px;
           height: 18px;
           background-color: white;
           border-radius: 50%;
           position: absolute;
           top: 2px;
           left: 2px;
           transition: left 0.2s;
        }
        
        .toggle-switch.active .toggle-circle {
           left: 20px;
        }

        .btn-logout {
           width: 100%;
           height: 48px;
           background: transparent;
           border: 1px solid #331010;
           color: var(--color-error);
           border-radius: 8px;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 8px;
           font-size: 13px;
           cursor: pointer;
        }

        .version-text {
           text-align: center;
           font-size: 10px;
           color: #444;
           margin-top: 20px;
        }
      `}</style>
        </div>
    );
};

export default SettingsPage;
