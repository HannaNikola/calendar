import axios from "axios";


export const api = axios.create({
  baseURL: "https://app--calendar--jjd2yny5y5zz.code.run",
  withCredentials: true,
});

