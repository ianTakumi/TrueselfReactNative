import axios, { AxiosInstance as AxiosInstanceType } from "axios";

const schoolIpAdd = "192.168.244.111";
const devIpAdd = "192.168.100.8";

const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL: `http://${schoolIpAdd}:5000/api/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
