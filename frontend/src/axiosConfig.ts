import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Altere para a URL da sua API
    //withCredentials: true, // Habilita o envio de cookies
  });
  
  export default instance;