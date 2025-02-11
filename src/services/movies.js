import axios from 'axios';

const url = '/api/search';

const getAll = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
};

const getNowPlaying = () => {
    const request = axios.get(`${url}/movie/now_playing`);
    return request.then(response => response.data.results);
};

const getSelected = (id) => {
    const request = axios.get(`${url}/movie/${id}`);
    return request.then(response => response.data);
};

const searchFor = (title) => {
    const searchURL = `${url}/${title.replace(/\s+/g, '+')}`;
    const request = axios.get(searchURL);
    return request.then(response => response.data.results);
};

const getCredits = (id) => {
    const request = axios.get(`${url}/movie/credits/${id}`);

    return request.then(response => response.data);
};

const getSimilar = (id) => {
    const request = axios.get(`${url}/movie/similar_movies/${id}`);
    return request.then(response => response.data.results);
};

export default { getAll, getNowPlaying, getSelected, searchFor, getCredits, getSimilar };