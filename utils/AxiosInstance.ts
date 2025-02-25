import axios, { AxiosInstance as AxiosInstanceType } from "axios";

const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL: "http://192.168.100.8:5000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
