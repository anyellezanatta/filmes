import axios from 'axios';
import config from '../config';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${config.ApiToken}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});
