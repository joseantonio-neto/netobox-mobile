import axios from "axios";

const api = axios.create({
  baseURL: "https://netobox-backend.herokuapp.com"
});

export default api;
