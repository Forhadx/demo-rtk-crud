import Axios from "axios";
let token = localStorage.getItem("token");

const axios = Axios.create({
  baseURL: `http://localhost:5000`,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axios;
