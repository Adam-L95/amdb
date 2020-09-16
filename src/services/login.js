import axios from 'axios';

const url = 'http://localhost:3001/users/1';

const login = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
};

export default { login };