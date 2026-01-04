import React, { useState, useEffect } from 'react';
import adImage from '../assets/splash_ad.png';

const SplashAd = ({ onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish();
      return;
    }

    // Enable skip after 2 seconds (when time left is 3)
    if (timeLeft <= 3 && !canSkip) {
      setCanSkip(true);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onFinish, canSkip]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px',
        zIndex: 10000
      }}>
        {canSkip && (
          <button
            onClick={onFinish}
            style={{
              background: 'white',
              color: 'black',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Pular Anúncio
          </button>
        )}
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}>
          {timeLeft}s
        </div>
      </div>

      <img
        src={adImage}
        alt="Advertisement"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      <div style={{
        position: 'absolute',
        bottom: '40px',
        color: 'white',
        fontSize: '12px',
        opacity: 0.7,
        zIndex: 10000,
        background: 'rgba(0,0,0,0.3)',
        padding: '4px 8px',
        borderRadius: '4px'
      }}>
        Publicidade
      </div>
    </div>
  );
};

export default SplashAd;
