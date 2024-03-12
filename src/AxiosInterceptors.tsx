import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const apiUri = import.meta.env.VITE_BACKEND_URL;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the token
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          const response = await axios.post(
            apiUri + "/image-generation/permission/refresh_token/",
            {
              refresh_token: refreshToken,
            }
          );

          const newAccessToken = response.data.access_token;

          // Update the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Handle refresh error, e.g., redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
