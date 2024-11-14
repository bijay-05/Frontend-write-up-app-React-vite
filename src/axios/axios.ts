import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Inside interceptor original request: ", originalRequest);

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await api.post('/auth/refresh', { token: refreshToken }, { withCredentials: true });

        const status = response.data.status;
        console.log("Status after refresh end point: ", status)

        console.log("Setting new Refresh tokens: ")
        localStorage.setItem("refreshToken", response.data.data)


        // Retry the original request with the new token
        // originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest, { withCredentials: true });
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;