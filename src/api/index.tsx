import axios from "axios";
import * as process from "process";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
    "allow-origin": "*",
  }
});

export default api;