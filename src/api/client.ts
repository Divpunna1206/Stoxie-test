// src/api/client.ts
// import axios from "axios";

// const API_BASE_URL =
// //   import.meta.env.VITE_API_URL || "http://103.148.165.178:8000";
//     "http://localhost:8000";
// export const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


// src/api/client.ts
// import axios from "axios";

// const client = axios.create({
//   baseURL: "http://localhost:8000",
//   withCredentials: false,
// });

// // If you have a token in localStorage (from your auth flow),
// // this will attach it automatically to every request.
// client.interceptors.request.use((config) => {
//   const token = localStorage.getItem("stoxie_token");
//   if (token) {
//     config.headers = config.headers ?? {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default client;
// src/api/client.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// You can import either `apiClient` or default.
export default apiClient;

