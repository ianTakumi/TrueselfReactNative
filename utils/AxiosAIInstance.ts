import axios, { AxiosInstance } from "axios";

const AxiosAIInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.100.8:4000",

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosAIInstance;
