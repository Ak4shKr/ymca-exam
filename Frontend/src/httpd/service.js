import axios from "axios";

const service = axios.create({
  // baseURL: "http://localhost:5000/api/admin",
  baseURL: "https://ymca-exam.onrender.com/api/admin",
  withCredentials: true,
});

export default service;
