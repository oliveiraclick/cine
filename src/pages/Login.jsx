import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2 className="auth-brand">CINESOCIAL</h2>

        <div className="auth-card">
          <h1 className="auth-title">Entrar</h1>

          <form className="auth-form" onSubmit={(e) => {
            e.preventDefault();
            if (formData.identifier === 'denyscobroges@gmail.com' && formData.password === 'Vendas@123') {
              navigate('/admin');
            } else {
              navigate('/feed');
            }
          }}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email ou Nome de Usuário"
                className="form-input"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              />
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="form-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 'var(--spacing-4)' }}>
              Entrar
            </button>

            <div className="auth-actions">
              <label className="remember-me">
                <input type="checkbox" /> Lembrar-me
              </label>
              <a href="#" className="forgot-password">Recuperar senha?</a>
            </div>
          </form>

          <div className="auth-footer">
            <p>Novo por aqui?</p>
            <p className="footer-sub">O acesso é exclusivo por convite.</p>
            <a href="#" className="waitlist-link">Entrar na lista de espera →</a>
          </div>
        </div>
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000; 
          /* Background could be an image, using black for now per design */
          color: white;
          padding: var(--spacing-4);
        }

        .auth-content {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .auth-brand {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: var(--spacing-8);
          color: white;
          text-transform: uppercase;
        }

        .auth-card {
          background-color: var(--color-background); /* Or slightly lighter if needed */
          width: 100%;
          padding: var(--spacing-6);
          border-radius: var(--radius-md);
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--spacing-6);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .form-input {
          width: 100%;
          height: 50px;
          background-color: #333; /* Dark gray input bg */
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          padding: 0 var(--spacing-4);
          color: white;
          font-size: var(--font-size-base);
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-text-secondary);
        }

        .password-group {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: var(--spacing-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
          opacity: 0.7;
        }

        .auth-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-top: var(--spacing-2);
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          cursor: pointer;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        .auth-footer {
          margin-top: var(--spacing-8);
          text-align: center;
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .footer-sub {
          opacity: 0.7;
          margin-bottom: var(--spacing-2);
        }

        .waitlist-link {
          color: var(--color-error); /* Red accent */
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Login;
