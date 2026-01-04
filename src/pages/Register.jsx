import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Ticket, ChevronLeft, CheckCircle } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inviteCode: 'CINE-VIP-2024',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreed: false
    });

    return (
        <div className="auth-container">
            <div className="auth-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} />
                </button>
                <h2 className="header-title">Cadastro</h2>
                <div style={{ width: 24 }}></div> {/* Spacer for centering */}
            </div>

            <div className="register-content">
                <div className="register-header">
                    <h1 className="register-title">Sua cadeira está reservada</h1>
                    <p className="register-subtitle">
                        Complete seus dados para acessar a comunidade exclusiva de cinéfilos.
                    </p>
                </div>

                <div className="photo-upload-section">
                    <div className="photo-circle">
                        <div className="avatar-placeholder">
                            <svg viewBox="0 0 24 24" fill="currentColor" height="48" width="48" className="user-icon">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <button className="add-photo-btn">
                            <Camera size={16} />
                        </button>
                    </div>
                    <span className="add-photo-text">ADICIONAR FOTO</span>
                </div>

                <form className="register-form" onSubmit={(e) => { e.preventDefault(); navigate('/feed'); }}>
                    <div className="form-group">
                        <label className="input-label">Código do Convite</label>
                        <div className="input-wrapper verified">
                            <input
                                type="text"
                                value={formData.inviteCode}
                                readOnly
                                className="form-input code-input"
                            />
                            <CheckCircle size={20} className="check-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="input-label">Nome de Usuário</label>
                        <input
                            type="text"
                            placeholder="@ seuusuario"
                            className="form-input"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            placeholder="exemplo@email.com"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label className="input-label">Senha</label>
                            <input
                                type="password"
                                placeholder="......"
                                className="form-input"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div className="form-group half">
                            <label className="input-label">Confirmar</label>
                            <input
                                type="password"
                                placeholder="......"
                                className="form-input"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={formData.agreed}
                            onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                        />
                        <span>Eu concordo com os <span className="highlight">Termos de Uso</span> e <span className="highlight">Política de Privacidade</span>.</span>
                    </label>

                    <button type="submit" className="btn btn-primary btn-full submit-btn">
                        Estrear <Ticket size={18} style={{ marginLeft: 8 }} />
                    </button>
                </form>

                <div className="auth-footer">
                    Já tem uma conta? <span className="highlight" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Fazer Login</span>
                </div>
            </div>

            <style>{`
        .auth-container {
          min-height: 100vh;
          background-color: #1a0b0b; /* Dark reddish/brown bg from image */
          color: white;
          padding: var(--spacing-4);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .auth-header {
          width: 100%;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-4) 0;
          margin-bottom: var(--spacing-4);
        }

        .back-btn {
          color: white;
          padding: 4px;
        }

        .header-title {
          font-size: var(--font-size-base);
          font-weight: 600;
        }

        .register-content {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .register-header {
          text-align: center;
        }

        .register-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-2);
        }

        .register-subtitle {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        .photo-upload-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
        }

        .photo-circle {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2a3b47; /* bluish gray placeholder */
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          overflow: hidden;
        }
        
        .user-icon {
          color: #fff;
          opacity: 0.8;
          width: 60px;
          height: 60px;
        }

        .add-photo-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: var(--color-primary);
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #1a0b0b;
        }

        .add-photo-text {
          font-size: 10px;
          color: var(--color-primary);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1);
        }

        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: #ddd;
        }

        .form-input {
          height: 48px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          padding: 0 var(--spacing-4);
          color: white;
          font-size: var(--font-size-sm);
        }
        
        .form-input:focus {
          border-color: var(--color-primary);
          outline: none;
        }

        .code-input {
          color: #888;
          letter-spacing: 1px;
        }

        .input-wrapper {
          position: relative;
        }

        .verified .check-icon {
          position: absolute;
          right: var(--spacing-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-success);
        }

        .form-row {
          display: flex;
          gap: var(--spacing-3);
        }

        .half {
          flex: 1;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-2);
          font-size: 11px;
          color: var(--color-text-secondary);
          line-height: 1.4;
          cursor: pointer;
        }

        .highlight {
          color: var(--color-primary);
          font-weight: 600;
        }

        .submit-btn {
          margin-top: var(--spacing-2);
        }

        .auth-footer {
          text-align: center;
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
      `}</style>
        </div>
    );
};

export default Register;
