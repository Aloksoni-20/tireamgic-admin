import apiClient from "../config/api.config";

class DashboardService {
  /**
   * Fetch admin dashboard statistics and recent orders
   * Backend route: GET /api/v1/admin/dashboard
   * @returns {Promise<Object>}
   */
  async getDashboardData() {
    const response = await apiClient.get("/api/v1/admin/dashboard");
    return response;
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
export { DashboardService };

