import axios from "axios";

const api = axios.create({
  baseURL: "https://2dad-152-67-36-52.sa.ngrok.io",
  headers: {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
});

export default api;