import axios from 'axios';
import { getToken } from './localStorage';

export const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { Authorization: getToken() }
});

export default instance;
