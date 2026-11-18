import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true
});


const StudioMgmtAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL+'/manage/studios',
  timeout: 5000,
  withCredentials: true
});

const StudioAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL+'/studios',
  timeout: 5000,
  withCredentials: true
});



export { API, StudioMgmtAPI, StudioAPI }