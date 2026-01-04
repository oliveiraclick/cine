const WATCHLIST_KEY = 'cinesocial_watchlist';

export const getWatchlist = () => {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
};

export const isInWatchlist = (movieId) => {
    const list = getWatchlist();
    return list.some(m => m.id === movieId);
};

export const toggleWatchlist = (movie) => {
    let list = getWatchlist();
    const exists = list.some(m => m.id === movie.id);

    if (exists) {
        list = list.filter(m => m.id !== movie.id);
    } else {
        // Only save minimal necessary data
        list.unshift({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average
        });
    }

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    return !exists; // Returns new state (true = added, false = removed)
};

const REVIEWS_KEY = 'cinesocial_reviews';

export const getReviews = () => {
    const data = localStorage.getItem(REVIEWS_KEY);
    return data ? JSON.parse(data) : [];
};

export const addReview = (review) => {
    const list = getReviews();
    const newReview = {
        ...review,
        id: Date.now().toString(), // Simple ID generation
        userId: 'current_user',
        timestamp: new Date().toISOString()
    };
    list.unshift(newReview);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
    return newReview;
};

export const getUserReviews = () => {
    const list = getReviews();
    return list.filter(r => r.userId === 'current_user');
};

const ADS_KEY = 'cinesocial_ads';

export const getAds = () => {
    const data = localStorage.getItem(ADS_KEY);
    // Return default ad if empty/null, ensures there's always something initially
    // Or return empty array and handle logic elsewhere. Let's return empty array.
    return data ? JSON.parse(data) : [];
};

export const addAd = (url, link) => {
    const list = getAds();
    const newAd = {
        id: Date.now().toString(),
        imageUrl: url,
        link: link || '#',
        views: 0,
        active: true,
        createdAt: new Date().toISOString()
    };
    list.unshift(newAd);
    localStorage.setItem(ADS_KEY, JSON.stringify(list));
    return newAd;
};

export const incrementAdView = (adId) => {
    const list = getAds();
    const index = list.findIndex(a => a.id === adId);
    if (index !== -1) {
        list[index].views = (list[index].views || 0) + 1;
        localStorage.setItem(ADS_KEY, JSON.stringify(list));
    }
};

export const deleteAd = (adId) => {
    const list = getAds();
    const newList = list.filter(a => a.id !== adId);
    localStorage.setItem(ADS_KEY, JSON.stringify(newList));
};
