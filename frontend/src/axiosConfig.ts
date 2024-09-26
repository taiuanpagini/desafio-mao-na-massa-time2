import axios from "axios";

const instance = axios.create({
    baseURL: 'http://maonamassa.eastus2.cloudapp.azure.com:8000', // Altere para a URL da sua API
    //withCredentials: true, // Habilita o envio de cookies
  });
  
  export default instance;