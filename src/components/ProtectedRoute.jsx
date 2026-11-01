import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../services/authService";
import { selectIsAuthenticated } from "../store/slices/authSlice";

/**
 * ProtectedRoute:
 * Protects admin dashboard and all sub-routes.
 * Allows access ONLY if user is authenticated (checks both Redux state & sessionStorage token).
 * Unauthenticated users are redirected to /login preserving the attempted location.
 */
export default function ProtectedRoute() {
  const location = useLocation();
  const isReduxAuthenticated = useSelector(selectIsAuthenticated);
  const hasToken = authService.isAuthenticated();

  const isAuthenticated = isReduxAuthenticated || hasToken;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
