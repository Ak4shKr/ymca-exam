import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default service;
