import axios from 'axios';

const url = '/api/userServices';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const addToWatchlist = async (movie) => {
    const config = {
        headers: { Authorization: token }
    };

    console.log(config);

    console.log(movie);

    const response = await axios.post(`${url}/watchlist`, movie, config);
    return response.data;
};

const addToDiary = async (movie) => {
    const config = {
        headers: { Authorization: token }
    };

    console.log(config);

    console.log(movie);

    const response = await axios.post(`${url}/diary`, movie, config);
    return response.data;
};

const removeFromWatchlist = (id) => {
    const config = {
        headers: { Authorization: token }
    };

    return axios.delete(`${url}/watchlist/${id}`, config);
};

export default { addToWatchlist, setToken, removeFromWatchlist, addToDiary };