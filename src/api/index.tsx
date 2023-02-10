import axios from "axios";
import * as process from "process";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
  headers: {
   "ngrok-skip-browser-warning": "69420",
  }
});

export default api;
