import React from 'react';
import { ChevronLeft, HelpCircle, ChevronRight, UserPlus, Crown, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InviteTree = () => {
   const navigate = useNavigate();

   return (
      <div className="tree-container">
         <div className="tree-header">
            <button className="icon-btn" onClick={() => navigate('/profile')}><ChevronLeft color="white" /></button>
            <span className="header-title">Árvore de Influência</span>
            <HelpCircle size={20} color="#666" />
         </div>

         <div className="gold-status-bar">
            <div className="status-level">
               <Crown size={16} color="black" fill="#FFB800" />
               <span className="lvl-text">NÍVEL 2: <strong>EMBAIXADOR</strong></span>
            </div>
            <div className="status-points">
               <span>240 pts</span>
            </div>
         </div>

         <div className="tree-viz-area">
            {/* Connection Lines (SVG) */}
            <svg className="tree-lines">
               <path d="M180,40 L180,100" stroke="#333" strokeWidth="1" />
               <path d="M180,100 L60,180" stroke="#FFB800" strokeWidth="2" fill="none" /> {/* Gold Line to User */}
               <path d="M180,100 L300,180" stroke="#333" strokeWidth="1" fill="none" />

               {/* User's Children */}
               <path d="M60,180 L60,260" stroke="#FFB800" strokeWidth="1" />
               <path d="M60,260 L20,320" stroke="#444" strokeWidth="1" />
               <path d="M60,260 L100,320" stroke="#444" strokeWidth="1" />
            </svg>

            {/* Root Node */}
            <div className="node root" style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}>
               <img src="https://ui-avatars.com/api/?name=Cine+Master&background=111&color=555" className="node-img faded" />
               <span className="node-label">@cine_root</span>
            </div>

            {/* Sibling Node */}
            <div className="node sibling" style={{ top: 180, left: '80%', transform: 'translateX(-50%)' }}>
               <img src="https://ui-avatars.com/api/?name=Outro+User&background=222&color=666" className="node-img small" />
            </div>

            {/* User Node (HERO) */}
            <div className="node hero" style={{ top: 180, left: '16%', transform: 'translateX(-50%)' }}>
               <div className="glow-ring"></div>
               <img src="https://ui-avatars.com/api/?name=Gabriel+Silva&background=FFB800&color=000" className="node-img hero" />
               <div className="hero-tag">VOCÊ</div>
            </div>

            {/* Child Nodes */}
            <div className="node child" style={{ top: 320, left: '5%', transform: 'translateX(-50%)' }}>
               <img src="https://ui-avatars.com/api/?name=Sarah&background=111&color=888" className="node-img" />
               <span className="node-label">@sarah</span>
            </div>

            <div className="node child" style={{ top: 320, left: '28%', transform: 'translateX(-50%)' }}>
               <div className="invite-circle" onClick={() => navigate('/invite')}>
                  <UserPlus size={16} color="#FFB800" />
               </div>
               <span className="node-label gold">Convidar</span>
            </div>
         </div>

         <div className="tree-stats-panel">
            <h3>SEU IMPACTO</h3>
            <div className="stat-grid">
               <div className="s-card">
                  <span className="s-num">14</span>
                  <span className="s-lbl">Convidados</span>
               </div>
               <div className="s-card">
                  <span className="s-num">38%</span>
                  <span className="s-lbl">Retenção</span>
               </div>
               <div className="s-card">
                  <span className="s-num">5</span>
                  <span className="s-lbl">Indicados</span>
               </div>
            </div>
         </div>

         <button className="fab-share" onClick={() => navigate('/invite')}>
            <Share2 size={20} /> Compartilhar Link
         </button>

         <style>{`
            .tree-container {
               min-height: 100vh;
               background-color: #050505;
               color: white;
               overflow: hidden;
               position: relative;
               font-family: 'Inter', sans-serif;
            }

            .tree-header {
               display: flex;
               justify-content: space-between;
               align-items: center;
               padding: 20px;
               z-index: 10;
               position: relative;
            }
            
            .icon-btn {
               background: rgba(255,255,255,0.1);
               border: none;
               width: 36px; 
               height: 36px; 
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               cursor: pointer;
            }

            .header-title {
               font-weight: 600;
               letter-spacing: 0.5px;
               font-size: 14px;
            }

            .gold-status-bar {
               margin: 0 20px;
               background: linear-gradient(90deg, #FFB800 0%, #F7C548 100%);
               border-radius: 8px;
               padding: 12px 16px;
               display: flex;
               justify-content: space-between;
               align-items: center;
               box-shadow: 0 4px 20px rgba(255, 184, 0, 0.2);
               z-index: 10;
               position: relative;
            }

            .status-level {
                display: flex;
                align-items: center;
                gap: 8px;
                color: black;
            }
            
            .lvl-text {
                font-size: 11px;
                font-weight: 500;
            }

            .status-points {
                background-color: rgba(0,0,0,0.1);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 800;
                color: black;
            }

            .tree-viz-area {
               height: 400px;
               position: relative;
               margin-top: 20px;
            }

            .tree-lines {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .node {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .node-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid #333;
                background-color: #111;
                z-index: 2;
            }
            
            .node-img.root { width: 50px; height: 50px; border-color: #555; }
            .node-img.faded { opacity: 0.5; filter: grayscale(100%); }
            .node-img.small { width: 30px; height: 30px; opacity: 0.3; }
            
            .node-img.hero {
                width: 60px;
                height: 60px;
                border: 3px solid #FFB800;
                box-shadow: 0 0 20px rgba(255, 184, 0, 0.4);
            }
            
            .glow-ring {
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 80px; height: 80px;
                border-radius: 50%;
                border: 1px dashed rgba(255, 184, 0, 0.3);
                animation: spin 10s linear infinite;
            }
            
            @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }

            .hero-tag {
                background-color: #FFB800;
                color: black;
                font-size: 9px;
                font-weight: 900;
                padding: 2px 6px;
                border-radius: 4px;
                margin-top: -10px;
                z-index: 3;
            }

            .node-label {
                font-size: 10px;
                color: #888;
                margin-top: 4px;
            }
            
            .node-label.gold { color: #FFB800; font-weight: 700; }

            .invite-circle {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px dashed #FFB800;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(255, 184, 0, 0.05);
                cursor: pointer;
            }

            .tree-stats-panel {
                background-color: #111;
                border-radius: 20px 20px 0 0;
                padding: 24px;
                position: absolute;
                bottom: 0;
                width: 100%;
                min-height: 200px;
            }
            
            .tree-stats-panel h3 {
                font-size: 11px;
                color: #666;
                letter-spacing: 1px;
                margin-bottom: 20px;
            }
            
            .stat-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 12px;
            }
            
            .s-card {
                background-color: #1a1a1a;
                border-radius: 8px;
                padding: 16px 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid #222;
            }
            
            .s-num {
                font-size: 18px;
                font-weight: 700;
                color: white;
                margin-bottom: 4px;
            }
            
            .s-lbl {
                font-size: 10px;
                color: #666;
            }
            
            .fab-share {
                position: absolute;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background-color: white;
                color: black;
                border: none;
                padding: 14px 24px;
                border-radius: 30px;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 20px rgba(255,255,255,0.2);
                cursor: pointer;
                width: 80%;
                justify-content: center;
            }
         `}</style>
      </div>
   );
};

export default InviteTree;
