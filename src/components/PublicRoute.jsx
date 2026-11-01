import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../services/authService";
import { selectIsAuthenticated } from "../store/slices/authSlice";

/**
 * PublicRoute:
 * Prevents authenticated admins from accessing guest-only routes like /login.
 * If user is already authenticated (Redux or valid sessionStorage token),
 * redirects directly to /admin.
 */
export default function PublicRoute() {
  const isReduxAuthenticated = useSelector(selectIsAuthenticated);
  const hasToken = authService.isAuthenticated();

  const isAuthenticated = isReduxAuthenticated || hasToken;

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
