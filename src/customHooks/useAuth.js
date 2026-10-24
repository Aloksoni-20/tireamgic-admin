import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/authService";
import {
    setCredentials,
    clearCredentials,
    selectCurrentUser,
    selectIsAuthenticated,
} from "../store/slices/authSlice";

/**
 * Custom hook managing authentication lifecycle and login state.
 * Uses Redux Toolkit for user data state and AuthService for API/sessionStorage operations.
 */
export function useAuth() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Performs admin login and updates Redux state
     * @param {Object} credentials - { email, password }
     * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
     */
    const login = useCallback(
        async (credentials) => {
            setLoading(true);
            setError(null);

            try {
                const response = await authService.login(credentials);
                console.log("login-response", response)
                // Normalize response data
                const payload = response?.data
                const loggedUser = payload?.user

                // Dispatch user data to Redux Store
                dispatch(
                    setCredentials({
                        user: loggedUser,
                    })
                );

                return {
                    success: true,
                    data: response,
                };
            } catch (err) {
                const errorMessage =
                    err?.message ||
                    err?.response?.data?.message ||
                    "Login failed. Please check your credentials.";

                setError(errorMessage);

                return {
                    success: false,
                    error: errorMessage,
                };
            } finally {
                setLoading(false);
            }
        },
        [dispatch]
    );

    /**
     * Logs out the admin: purges sessionStorage token and clears Redux user state
     */
    const logout = useCallback(() => {
        authService.logout();
        dispatch(clearCredentials());
        setError(null);
    }, [dispatch]);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        login,
        logout,
        clearError,
        loading,
        error,
        user,
        isAuthenticated,
    };
}

export default useAuth;
