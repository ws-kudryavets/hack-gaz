import axios from 'axios';
import { getToken } from './localStorage';

export const instance = axios.create({
    // baseURL: 'http://90f93d10891a.ngrok.io:80/',
    baseUrl: 'http://gpb2.hack48.ru:5000',
    headers: {  'Content-Type': 'application/json', }
});

export default instance;
