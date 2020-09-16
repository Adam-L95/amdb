import axios from 'axios';

const url = 'http://localhost:3001/api/search';

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
    console.log(searchURL);
    const request = axios.get(searchURL);
    // console.log(request);
    // const results = request.then(response => response.data);

    // console.log(results);
    return request.then(response => response.data.results);
};

const getCredits = (id) => {
    const request = axios.get(`${url}/movie/credits/${id}`);

    return request.then(response => response.data);
};

export default { getAll, getSelected, searchFor, getCredits };