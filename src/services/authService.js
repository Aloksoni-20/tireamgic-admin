import apiClient from "../config/api.config";

const TOKEN_KEY = "admin_token";

class AuthService {
    /**
     * Admin Login Request
     * @param {Object} credentials - { email, password }
     * @returns {Promise<Object>} API response
     */
    async login(credentials) {
        const response = await apiClient.post("/api/v1/admin/auth/login", credentials);
        console.log("res in service", response)
        // If interceptor returns response.data
        const data = response?.data;
        const token = data?.token

        if (token) {
            this.setToken(token);
        }

        return response;
    }

    /**
     * Save token strictly in sessionStorage
     * @param {string} token
     */
    setToken(token) {
        sessionStorage.setItem(TOKEN_KEY, token);
    }

    /**
     * Retrieve active admin token
     * @returns {string | null}
     */
    getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    /**
     * Check if token exists in sessionStorage
     * @returns {boolean}
     */
    isAuthenticated() {
        return Boolean(this.getToken());
    }

    /**
     * Logout user - clear token strictly from sessionStorage
     */
    logout() {
        sessionStorage.removeItem(TOKEN_KEY);
    }
}

const authService = new AuthService();
export default authService;
export { AuthService };