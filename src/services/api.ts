import axios from 'axios';

const api = axios.create({
  baseURL: 'https://storage.googleapis.com/uniscast/'
})

export default api;