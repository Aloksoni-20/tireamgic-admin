import apiClient from "../config/api.config";

class InstallerService {
  /**
   * Fetch installer status statistics
   * Backend route: GET /api/v1/admin/installers/stats
   * @returns {Promise<Object>}
   */
  async getInstallerStats() {
    const response = await apiClient.get("/api/v1/admin/installers/stats");
    return response;
  }

  /**
   * Fetch paginated installers list
   * Backend route: GET /api/v1/admin/installers?page=&limit=&search=&status=
   * @param {Object} params - { page, limit, search, status }
   * @returns {Promise<Object>}
   */
  async getInstallers(params = {}) {
    const { page = 1, limit = 10, search = "", status = "" } = params;
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (search && search.trim()) queryParams.append("search", search.trim());
    if (status && status !== "All") {
      queryParams.append("status", status.toLowerCase());
    }

    const response = await apiClient.get(
      `/api/v1/admin/installers?${queryParams.toString()}`
    );
    return response;
  }

  /**
   * Fetch single installer details by ID
   * Backend route: GET /api/v1/admin/installers/:id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getInstallerById(id) {
    const response = await apiClient.get(`/api/v1/admin/installers/${id}`);
    return response;
  }

  /**
   * Update installer status
   * Backend route: PUT /api/v1/admin/installers/:id/status
   * @param {string} id
   * @param {string} status - "pending" | "approved" | "blocked" | "reject"
   * @returns {Promise<Object>}
   */
  async updateInstallerStatus(id, status) {
    const response = await apiClient.put(
      `/api/v1/admin/installers/${id}/status`,
      { status }
    );
    return response;
  }
}

const installerService = new InstallerService();
export default installerService;
export { InstallerService };

