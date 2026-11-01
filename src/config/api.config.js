import axios from "axios";

// Read from .env (VITE_REACT_BASE_URL or fallback to VITE_API_BASE_URL)
const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

/**
 * Request Interceptor
 * - Injects Authorization header from sessionStorage using key "admin_token"
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("admin_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * - Standardizes response data extraction
 * - Handles 401 Unauthorized by clearing sessionStorage and redirecting
 */
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                // Clear token from sessionStorage
                sessionStorage.removeItem("admin_token");

                // Redirect to login if not already on the login page
                if (!window.location.pathname.includes("/login")) {
                    window.location.href = "/login";
                }
            }

            const customError = new Error(
                data?.message || error.message || "An unexpected error occurred"
            );
            customError.status = status;
            customError.data = data;
            return Promise.reject(customError);
        } else if (error.request) {
            return Promise.reject(
                new Error("Network error. Unable to reach the server. Please check your connection.")
            );
        }

        return Promise.reject(error);
    }
);

export default apiClient;
