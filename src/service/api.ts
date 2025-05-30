import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_baseApiUrl,
  withCredentials: true,
});

// instance.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     if (error.status === 401) {
//       console.log("UNAUTHORIZED");
//       // n("/login");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default instance;
