const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'pt-BR';

const fetchFromTMDB = async (endpoint, params = {}) => {
    if (!API_KEY) {
        console.warn("TMDB API Key missing");
        return null;
    }
    const queryParams = new URLSearchParams({
        api_key: API_KEY,
        language: LANGUAGE,
        ...params
    });
    const res = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
    return res.json();
};

export const searchMovies = async (query) => {
    return fetchFromTMDB('/search/multi', { query });
};

export const getMovieDetails = async (id, type = 'movie') => {
    return fetchFromTMDB(`/${type}/${id}`, { append_to_response: 'credits,videos,recommendations' });
};

export const getTrending = async () => {
    return fetchFromTMDB('/trending/all/week');
};
