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
