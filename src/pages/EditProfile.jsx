import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Check, LogOut } from 'lucide-react';

const EditProfile = () => {
   const navigate = useNavigate();

   const [name, setName] = useState("Julia Silva");
   const [handle, setHandle] = useState("@juliasilva_cine");
   const [bio, setBio] = useState("Cinéfila apaixonada por terror psicológico e clássicos dos anos 80. Sempre pronta para maratonar uma trilogia.");

   const genres = [
      { id: 1, label: 'Terror', active: true, color: '#E50914' },
      { id: 2, label: 'Sci-Fi', active: true, color: '#FFB800' },
      { id: 3, label: 'Comédia', active: false },
      { id: 4, label: 'Drama', active: false }
   ];

   return (
      <div className="edit-container">
         <div className="edit-header">
            <button className="cancel-text" onClick={() => navigate('/profile')}>Cancelar</button>
            <span className="header-title">Editar Perfil</span>
            <button className="save-text" onClick={() => navigate('/profile')}>Salvar</button>
         </div>

         <div className="avatar-section">
            <div className="avatar-big-wrap">
               <img src="https://ui-avatars.com/api/?name=Julia+Silva&background=E50914&color=fff" className="avatar-img" />
               <div className="edit-badge">
                  <Pencil size={12} color="white" />
               </div>
            </div>
            <span className="change-photo-text">Alterar foto de perfil</span>
         </div>

         <div className="form-group">
            <label>Nome</label>
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="text-input"
            />
         </div>

         <div className="form-group">
            <label>Usuário</label>
            <div className="input-icon-wrapper">
               <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="text-input"
               />
               <div className="check-icon">
                  <Check size={12} color="black" />
               </div>
            </div>
         </div>

         <div className="form-group">
            <div className="label-row">
               <label>Bio</label>
               <span className="char-count">{bio.length}/160</span>
            </div>
            <textarea
               value={bio}
               onChange={(e) => setBio(e.target.value)}
               className="bio-input"
            ></textarea>
         </div>

         <div className="form-group">
            <label>Gêneros Favoritos</label>
            <div className="genres-row">
               {genres.map(g => (
                  <div
                     key={g.id}
                     className={`genre-chip ${g.active ? 'active' : ''}`}
                     style={g.active && g.color ? { backgroundColor: g.color, borderColor: g.color } : {}}
                  >
                     {g.label}
                  </div>
               ))}
            </div>
         </div>

         <button className="btn-logout" onClick={() => navigate('/')}>
            <LogOut size={16} /> Sair da conta
         </button>

         <p className="version-text">Versão 24.0 (Build 1802)</p>

         <style>{`
        .edit-container {
           min-height: 100vh;
           background-color: #050505;
           color: white;
           padding: var(--spacing-4);
        }

        .edit-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 40px;
        }

        .cancel-text {
           background: none;
           border: none;
           color: #ccc;
           font-size: 14px;
           cursor: pointer;
        }

        .save-text {
           background: none;
           border: none;
           color: var(--color-primary);
           font-weight: 700;
           font-size: 14px;
           cursor: pointer;
        }

        .header-title {
           font-weight: 700;
           font-size: 16px;
        }

        .avatar-section {
           display: flex;
           flex-direction: column;
           align-items: center;
           margin-bottom: 40px;
        }

        .avatar-big-wrap {
           position: relative;
           margin-bottom: 12px;
        }

        .avatar-img {
           width: 100px;
           height: 100px;
           border-radius: 50%;
           border: 2px solid #333;
           object-fit: cover;
        }

        .edit-badge {
           position: absolute;
           bottom: 0;
           right: 0;
           width: 30px;
           height: 30px;
           background-color: var(--color-primary);
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           border: 3px solid #050505;
        }

        .change-photo-text {
           font-size: 12px;
           color: var(--color-primary);
           font-weight: 600;
        }

        .form-group {
           margin-bottom: 24px;
        }

        .form-group label {
           font-size: 12px;
           color: #888;
           margin-bottom: 8px;
           display: block;
        }
        
        .text-input {
           width: 100%;
           height: 48px;
           background-color: #1A1A1A;
           border: 1px solid #333;
           border-radius: 8px;
           padding: 0 16px;
           color: white;
           font-size: 14px;
           transition: border-color 0.2s;
        }
        
        .text-input:focus {
           outline: none;
           border-color: var(--color-primary);
        }

        .input-icon-wrapper {
           position: relative;
        }

        .check-icon {
           position: absolute;
           right: 12px;
           top: 14px;
           width: 20px;
           height: 20px;
           background-color: var(--color-success);
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .label-row {
           display: flex;
           justify-content: space-between;
        }

        .char-count {
           font-size: 10px;
           color: #444;
        }

        .bio-input {
           width: 100%;
           height: 100px;
           background-color: #1A1A1A;
           border: 1px solid #333;
           border-radius: 8px;
           padding: 12px 16px;
           color: white;
           font-size: 13px;
           resize: none;
           line-height: 1.4;
        }
        
        .bio-input:focus {
           outline: none;
           border-color: var(--color-primary);
        }

        .genres-row {
           display: flex;
           gap: 8px;
           flex-wrap: wrap;
        }

        .genre-chip {
           padding: 8px 16px;
           border-radius: 20px;
           background-color: #1A1A1A;
           border: 1px solid #333;
           font-size: 12px;
           color: #ccc;
        }
        
        .genre-chip.active {
           color: white;
           font-weight: 700;
           border: none;
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
           margin-top: 20px;
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

export default EditProfile;
