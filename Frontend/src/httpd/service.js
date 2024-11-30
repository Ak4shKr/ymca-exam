import axios from "axios";

const service = axios.create({
  baseURL: "https://ymca-exam.onrender.com/api/admin",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default service;
