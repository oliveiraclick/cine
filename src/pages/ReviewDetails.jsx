import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Heart, MessageSquare, Share, Send } from 'lucide-react';

const ReviewDetails = () => {
   const navigate = useNavigate();

   return (
      <div className="review-page">
         <div className="sticky-header">
            <button onClick={() => navigate('/feed')} className="back-btn"><ChevronLeft color="white" /></button>
            <span className="title">Review</span>
            <button className="back-btn"><MoreVertical color="white" size={20} /></button>
         </div>

         <div className="review-backdrop">
            <img src="https://placehold.co/600x400/1a1a1a/666?text=Dune+Part+Two" className="backdrop-img" />
            <div className="backdrop-gradient"></div>

            <div className="movie-overlay-info">
               <img src="https://placehold.co/200x300/1a1a1a/E50914?text=Poster" className="mini-poster" />
               <div className="m-info">
                  <h2 className="m-title">Dune: Part Two</h2>
                  <span className="m-meta">2024 • Sci-Fi • Adventure</span>
               </div>
            </div>
         </div>

         <div className="review-content">
            <div className="user-header">
               <img src="https://ui-avatars.com/api/?name=Sofia+Mendes&background=random" className="u-avatar" />
               <div className="u-info">
                  <span className="u-name">Sofia Mendes</span>
                  <span className="u-status">Viu ontem • 22 Jan</span>
               </div>
               <div className="rating-pill">★★★★★ 5.0</div>
            </div>

            <h3 className="review-headline">A Cinematic Masterpiece</h3>
            <p className="review-text">
               This cinematic masterpiece completely blew me away. The visual language established in the first film expands into something truly breathtaking. The sound design alone deserves an Oscar.
               <br /><br />
               While pacing in the second act felt slightly old-school, it paid off in the spectacular finale. Villeneuve has cemented himself as a sci-fi legend with this entry. The character development of Paul feels earned and terrifying.
            </p>

            <div className="interaction-bar">
               <div className="int-left" onClick={() => navigate('/likes')}>
                  <Heart size={18} fill="white" stroke="none" /> <span>126</span>
               </div>
               <div className="int-left">
                  <MessageSquare size={18} /> <span>24</span>
               </div>
               <div className="spacer"></div>
               <Share size={18} />
            </div>
         </div>

         <div className="comments-section">
            <div className="section-title">COMMENTS (24)</div>

            <div className="comment-item">
               <img src="https://i.pravatar.cc/150?u=5" className="c-avatar" />
               <div className="c-body">
                  <div className="c-header">
                     <span className="c-name">Lucas Silva</span>
                     <span className="c-time">2m ago</span>
                  </div>
                  <p className="c-text">Totally agree with your take on the pacing. The visual scale makes up for any slow moments.</p>
                  <div className="c-actions">
                     <span>Like</span> <span>Reply</span>
                  </div>
               </div>
            </div>

            <div className="comment-item">
               <img src="https://i.pravatar.cc/150?u=4" className="c-avatar" />
               <div className="c-body">
                  <div className="c-header">
                     <span className="c-name">Ana P.</span>
                     <span className="c-time">1h ago</span>
                  </div>
                  <p className="c-text">I felt the second act dragged a bit too much for my taste, but can't deny it was visually stunning.</p>
                  <div className="c-actions">
                     <span>Like</span> <span>Reply</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="comment-input-bar">
            <img src="https://i.pravatar.cc/150?u=9" className="my-avatar" />
            <input type="text" placeholder="Add a comment..." className="input-field" />
            <button className="send-btn"><Send size={16} fill="white" /></button>
         </div>

         <style>{`
        .review-page {
           background-color: #050505;
           min-height: 100vh;
           color: white;
           padding-bottom: 80px;
        }

        .sticky-header {
           position: fixed;
           top: 0;
           left: 0;
           width: 100%;
           padding: 16px;
           display: flex;
           justify-content: space-between;
           align-items: center;
           z-index: 20;
           background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
        }

        .back-btn {
           background: none;
           border: none;
           cursor: pointer;
           width: 32px;
           height: 32px;
           background-color: rgba(0,0,0,0.5);
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .title {
           font-weight: 700;
           text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .review-backdrop {
           height: 280px;
           position: relative;
        }
        
        .backdrop-img {
           width: 100%;
           height: 100%;
           object-fit: cover;
        }
        
        .backdrop-gradient {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background: linear-gradient(0deg, #050505 0%, rgba(5,5,5,0) 80%);
        }

        .movie-overlay-info {
           position: absolute;
           bottom: 20px;
           left: 20px;
           display: flex;
           align-items: flex-end;
           gap: 12px;
        }
        
        .mini-poster {
           width: 60px;
           border-radius: 4px;
           box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        
        .m-title {
           font-size: 18px;
           font-weight: 800;
           line-height: 1.1;
           margin-bottom: 4px;
        }
        
        .m-meta {
           font-size: 10px;
           color: #ccc;
           background-color: rgba(0,0,0,0.6);
           padding: 2px 6px;
           border-radius: 4px;
        }

        .review-content {
           padding: 0 20px;
           margin-bottom: 30px;
        }

        .user-header {
           display: flex;
           align-items: center;
           margin-bottom: 20px;
        }
        
        .u-avatar {
           width: 36px;
           height: 36px;
           border-radius: 50%;
           margin-right: 10px;
           border: 1px solid #333;
        }
        
        .u-info {
           display: flex;
           flex-direction: column;
           flex: 1;
        }
        
        .u-name {
           font-weight: 700;
           font-size: 14px;
           color: var(--color-error); /* Design shows colored name */
        }
        
        .u-status {
           font-size: 10px;
           color: #888;
        }

        .rating-pill {
           color: var(--color-error);
           font-weight: 800;
           font-size: 14px;
        }

        .review-headline {
           font-size: 18px;
           font-weight: 700;
           margin-bottom: 12px;
        }
        
        .review-text {
           font-size: 14px;
           color: #ddd;
           line-height: 1.6;
           margin-bottom: 24px;
        }

        .interaction-bar {
           display: flex;
           align-items: center;
           padding-top: 16px;
           border-top: 1px solid #222;
        }
        
        .int-left {
           display: flex;
           align-items: center;
           gap: 6px;
           margin-right: 20px;
           font-size: 12px;
           font-weight: 600;
           cursor: pointer;
        }
        
        .spacer { flex: 1; }

        .comments-section {
           padding: 0 20px;
           padding-bottom: 40px;
        }
        
        .section-title {
           font-size: 10px;
           color: #666;
           font-weight: 700;
           margin-bottom: 20px;
           letter-spacing: 1px;
        }

        .comment-item {
           display: flex;
           gap: 12px;
           margin-bottom: 20px;
        }
        
        .c-avatar {
           width: 32px;
           height: 32px;
           border-radius: 50%;
        }
        
        .c-body {
           flex: 1;
        }
        
        .c-header {
           display: flex;
           justify-content: space-between;
           margin-bottom: 4px;
        }
        
        .c-name {
           font-size: 12px;
           font-weight: 700;
        }
        
        .c-time {
           font-size: 10px;
           color: #666;
        }
        
        .c-text {
           font-size: 13px;
           color: #ccc;
           line-height: 1.4;
           margin-bottom: 8px;
        }
        
        .c-actions {
           font-size: 10px;
           color: #888;
           display: flex;
           gap: 12px;
           font-weight: 600;
        }

        .comment-input-bar {
           position: fixed;
           bottom: 0;
           left: 0;
           width: 100%;
           background-color: #121212;
           padding: 12px 16px;
           display: flex;
           align-items: center;
           gap: 12px;
           border-top: 1px solid #222;
        }
        
        .my-avatar {
           width: 32px;
           height: 32px;
           border-radius: 50%;
        }
        
        .input-field {
           flex: 1;
           height: 36px;
           background-color: #2A2A2A;
           border: none;
           border-radius: 20px;
           padding: 0 16px;
           color: white;
           font-size: 13px;
        }
        
        .input-field:focus { outline: none; }
        
        .send-btn {
           background-color: var(--color-primary);
           width: 36px;
           height: 36px;
           border-radius: 50%;
           border: none;
           display: flex;
           align-items: center;
           justify-content: center;
        }

      `}</style>
      </div>
   );
};

export default ReviewDetails;
