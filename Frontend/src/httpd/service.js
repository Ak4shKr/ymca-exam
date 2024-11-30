import axios from "axios";

const service = axios.create({
  baseURL: "https://ymca-exam.onrender.com/api/admin",
  withCredentials: true,
});

export default service;
