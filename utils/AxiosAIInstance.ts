import axios, { AxiosInstance } from "axios";

const schoolIpAdd = "192.168.244.111";
const devIpAdd = "192.168.100.8";

const AxiosAIInstance: AxiosInstance = axios.create({
  baseURL: `http://${devIpAdd}:4000`,

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosAIInstance;
