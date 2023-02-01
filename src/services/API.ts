import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${
      localStorage["userToken"] ? localStorage.getItem("userToken") : ""
    }`,
  },
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
  }
);

export default api;
