const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'pt-BR';

const fetchFromTMDB = async (endpoint, params = {}) => {
    if (!TOKEN) {
        console.warn("TMDB Access Token missing in .env");
        return null;
    }

    const queryParams = new URLSearchParams({
        language: LANGUAGE,
        ...params
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    };

    try {
        const res = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, options);
        if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("TMDB Request Failed:", error);
        return null;
    }
};

export const searchMovies = async (query) => {
    return fetchFromTMDB('/search/multi', { query });
};

export const getMovieDetails = async (id, type = 'movie') => {
    return fetchFromTMDB(`/${type}/${id}`, { append_to_response: 'credits,videos,recommendations' });
};

// Fetch movies for "Radar" (Now Playing) and "Global" (Trending)
export const getNowPlaying = async () => {
    return fetchFromTMDB('/movie/now_playing');
};

export const getTrending = async () => {
    return fetchFromTMDB('/trending/all/week');
};
