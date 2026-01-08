import axios from "axios";

export const api = axios.create({
  baseURL: "https://calendar-back-end-s3b2.onrender.com",
  withCredentials: true,
});
