import React, { useState, useEffect } from 'react';
import splashImage from '../assets/splash_ad.png';
import { getAds, incrementAdView } from '../services/storage';

const SplashAd = ({ onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [currentAdImage, setCurrentAdImage] = useState(splashImage);

  useEffect(() => {
    // Load Dynamic Ad Logic
    const ads = getAds();
    if (ads && ads.length > 0) {
      // Filter active ads only if you have an 'active' flag, or just use all
      const activeAds = ads.filter(a => a.active !== false); // Default true
      if (activeAds.length > 0) {
        const randomAd = activeAds[Math.floor(Math.random() * activeAds.length)];
        setCurrentAdImage(randomAd.imageUrl);
        incrementAdView(randomAd.id);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Optionally auto-finish or wait for user? 
          // Usually Splash Ads finish automatically when time is up.
          onFinish();
          return 0;
        }
        return prev - 1;
      });

      // Enable skip after 2 seconds (when 3 seconds remain)
      if (timeLeft <= 4) { // e.g. 5 -> 4 (1 sec elapsed) -> 3 (2 sec elapsed, show skip)
        setCanSkip(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onFinish]);

  return (
    <div className="splash-ad-container">
      <div className="ad-content">
        <img src={currentAdImage} alt="Advertisement" className="ad-image" />

        <div className="ad-overlay">
          <div className="timer-badge">
            Publicidade • {timeLeft}s
          </div>

          {canSkip && (
            <button className="skip-btn" onClick={onFinish}>
              Pular Anúncio
            </button>
          )}
        </div>
      </div>

      <style>{`
                .splash-ad-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: #000;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .ad-content {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .ad-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .ad-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 40px 20px 80px 20px;
                    pointer-events: none; /* Let clicks pass through to image if needed */
                }

                .timer-badge {
                    align-self: flex-end;
                    background-color: rgba(0,0,0,0.6);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    backdrop-filter: blur(4px);
                }

                .skip-btn {
                    align-self: flex-end;
                    background-color: white;
                    color: black;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    pointer-events: auto; /* Enable duplicate clicks */
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
            `}</style>
    </div>
  );
};

export default SplashAd;
