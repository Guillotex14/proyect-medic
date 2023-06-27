import axios from 'axios';

const apiConnection = axios.create({
    baseURL: 'http://localhost:3000',
});

// const apiConnection = axios.create({
//     baseURL: 'https://proyect-medic-backend.up.railway.app',
// });

export default apiConnection;