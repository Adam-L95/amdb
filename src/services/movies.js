import axios from 'axios';

const url = '/api/search';

const getAll = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
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

export default { getAll, getSelected, searchFor, getCredits };