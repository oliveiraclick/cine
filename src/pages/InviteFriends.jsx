import React from 'react';
import { ChevronLeft, Ticket, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InviteFriends = () => {
   const navigate = useNavigate();

   return (
      <div className="invite-container">
         <div className="nav-header">
            <button onClick={() => navigate('/tree')} className="back-btn"><ChevronLeft color="white" /></button>
            <span className="title">Convidar Amigos</span>
            <div style={{ width: 24 }}></div>
         </div>

         <div className="hero-card">
            <div className="ticket-icon-box">
               <Ticket size={24} color="#E50914" fill="#E50914" />
            </div>
            <h2>Traga sua equipe</h2>
            <p>Este é um círculo exclusivo para amantes de cinema. Escolha quem realmente importa.</p>

            <div className="counter-box">
               <div className="count-left">
                  <span className="count-label">CONVITES DISPONÍVEIS</span>
                  <span className="count-big">3</span>
                  <span className="unit">restantes</span>
               </div>
               <div className="ticket-visual">
                  <div className="hole top"></div>
                  <div className="hole bottom"></div>
               </div>
            </div>
         </div>

         <div className="form-section">
            <label className="input-label">Email do amigo</label>
            <div className="input-row">
               <div className="icon-box">✉</div>
               <input type="email" placeholder="exemplo@email.com" className="email-input" />
            </div>

            <button className="btn-send">
               Enviar Convite <Send size={16} />
            </button>
            <p className="disclaimer">Os convites expiram após 48 horas se não forem aceitos.</p>
         </div>

         <div className="history-section">
            <h3><span className="clock-icon">↺</span> Enviados Recentemente</h3>

            <div className="history-list">
               <div className="hist-item">
                  <div className="avatar-placeholder bg-blue">JS</div>
                  <div className="hist-info">
                     <span className="hist-email">julia.s@gmail.com</span>
                     <span className="hist-status">Enviado hoje</span>
                  </div>
                  <span className="status-badge pending">Pendente</span>
               </div>

               <div className="hist-item">
                  <div className="avatar-placeholder bg-green">AL</div>
                  <div className="hist-info">
                     <span className="hist-email">ana.lima@uol.com.br</span>
                     <span className="hist-status">Membro desde ontem</span>
                  </div>
                  <span className="status-badge accepted">Aceito</span>
               </div>
            </div>
         </div>

         <style>{`
        .invite-container {
           min-height: 100vh;
           background-color: #050505;
           color: white;
           padding: var(--spacing-4);
        }

        .nav-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 30px;
        }
        
        .back-btn {
           background: none;
           border: none;
           cursor: pointer;
        }
        
        .title {
           font-weight: 600;
           font-size: 14px;
        }

        .hero-card {
           background: linear-gradient(180deg, #1A0A0A 0%, #0F0505 100%);
           border: 1px solid #331010;
           border-radius: 16px;
           padding: 30px 20px;
           text-align: center;
           margin-bottom: 30px;
        }

        .ticket-icon-box {
           width: 48px;
           height: 48px;
           background-color: rgba(229, 9, 20, 0.1);
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           margin: 0 auto 16px;
        }

        .hero-card h2 {
           font-size: 20px;
           font-weight: 700;
           margin-bottom: 8px;
        }
        
        .hero-card p {
           font-size: 12px;
           color: #888;
           margin-bottom: 24px;
           line-height: 1.5;
        }

        .counter-box {
           background-color: #250A0A;
           border-radius: 12px;
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 16px 20px;
           position: relative;
           overflow: hidden;
        }
        
        .count-left {
           display: flex;
           flex-direction: column;
           align-items: flex-start;
           text-align: left;
           z-index: 2;
        }
        
        .count-label {
           font-size: 8px;
           color: #884444;
           letter-spacing: 1px;
           margin-bottom: 2px;
           font-weight: 700;
        }
        
        .count-big {
           font-size: 32px;
           font-weight: 800;
           line-height: 1;
        }
        
        .unit {
           font-size: 10px;
           color: #995555;
        }
        
        .ticket-visual {
           width: 40px;
           height: 100%;
           border-left: 2px dashed #441111;
           position: absolute;
           right: 0;
           top: 0;
           background-color: rgba(0,0,0,0.2);
        }

        .form-section {
           margin-bottom: 40px;
        }
        
        .input-label {
           font-size: 12px;
           color: #ccc;
           display: block;
           margin-bottom: 8px;
           font-weight: 600;
        }
        
        .input-row {
           display: flex;
           align-items: center;
           background-color: #1A1A1A;
           border: 1px solid #333;
           border-radius: 8px;
           padding: 4px;
           margin-bottom: 20px;
        }
        
        .icon-box {
           width: 40px;
           height: 40px;
           display: flex;
           align-items: center;
           justify-content: center;
           color: #666;
        }
        
        .email-input {
           background: transparent;
           border: none;
           color: white;
           flex: 1;
           height: 40px;
           font-size: 14px;
        }
        
        .email-input:focus { outline: none; }
        
        .btn-send {
           width: 100%;
           height: 48px;
           background-color: var(--color-primary);
           color: white;
           border: none;
           border-radius: 8px;
           font-weight: 700;
           font-size: 14px;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 8px;
           cursor: pointer;
           margin-bottom: 12px;
        }
        
        .disclaimer {
           font-size: 10px;
           color: #666;
           text-align: center;
        }

        .history-section h3 {
           font-size: 12px;
           color: #888;
           margin-bottom: 16px;
           display: flex;
           align-items: center;
           gap: 6px;
        }

        .history-list {
           display: flex;
           flex-direction: column;
           gap: 12px;
        }
        
        .hist-item {
           display: flex;
           align-items: center;
           padding: 12px;
           background-color: #111;
           border-radius: 12px;
           gap: 12px;
        }
        
        .avatar-placeholder {
           width: 36px;
           height: 36px;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 10px;
           font-weight: 700;
           color: white;
        }
        
        .bg-blue { background-color: #3b5998; }
        .bg-green { background-color: #27ae60; }
        
        .hist-info {
           flex: 1;
           display: flex;
           flex-direction: column;
        }
        
        .hist-email {
           font-size: 12px;
           font-weight: 600;
        }
        
        .hist-status {
           font-size: 10px;
           color: #666;
        }
        
        .status-badge {
           font-size: 10px;
           padding: 4px 8px;
           border-radius: 4px;
           font-weight: 700;
        }
        
        .status-badge.pending {
           background-color: rgba(255, 184, 0, 0.1);
           color: #FFB800;
        }
        
        .status-badge.accepted {
           background-color: rgba(70, 211, 105, 0.1);
           color: #46D369;
        }
      `}</style>
      </div>
   );
};

export default InviteFriends;
