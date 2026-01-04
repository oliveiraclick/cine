import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <div className="brand">
                    <Clapperboard color="var(--color-primary)" size={32} />
                    <span className="brand-name">CINECLUB</span>
                </div>

                <div className="hero-section">
                    <div className="tagline-badge">
                        <span className="dot"></span> APENAS CONVIDADOS
                    </div>

                    <h1 className="hero-title">
                        Cinema Real,<br />
                        Sem Ruído
                    </h1>

                    <p className="hero-description">
                        Acesso exclusivo para quem ama cinema.
                        Críticas reais, conexões reais. Uma
                        comunidade onde a opinião realmente
                        importa.
                    </p>

                    <button className="btn btn-primary btn-full" onClick={() => navigate('/register')}>
                        ✉ Tenho um Convite
                    </button>

                    <button className="btn btn-secondary btn-full" onClick={() => navigate('/login')} style={{ marginTop: 'var(--spacing-3)' }}>
                        Já sou membro / Entrar
                    </button>

                    <div className="waitlist-link">
                        <a href="#">Solicitar acesso à lista de espera</a>
                    </div>
                </div>
            </div>

            <style>{`
        .welcome-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-6);
          background-color: var(--color-background);
          color: white;
          text-align: center;
        }

        .welcome-content {
          max-width: 360px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-12);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-weight: 700;
          letter-spacing: 1px;
        }

        .brand-name {
          font-size: var(--font-size-lg);
          color: var(--color-text-primary);
        }

        .hero-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tagline-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-6);
          text-transform: uppercase;
        }

        .dot {
          width: 6px;
          height: 6px;
          background-color: var(--color-primary);
          border-radius: 50%;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--spacing-6);
          letter-spacing: -1px;
        }

        .hero-description {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-12);
          max-width: 300px;
        }

        .waitlist-link {
          margin-top: var(--spacing-8);
          font-size: 12px;
          color: var(--color-text-secondary);
          text-decoration: underline;
          opacity: 0.6;
        }
      `}</style>
        </div>
    );
};

export default Welcome;
