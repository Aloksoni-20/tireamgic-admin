import apiClient from "../config/api.config";

class AffiliateService {
  /**
   * Fetch affiliate status statistics
   * Backend route: GET /api/v1/admin/affiliates/stats
   * @returns {Promise<Object>}
   */
  async getAffiliateStats() {
    const response = await apiClient.get("/api/v1/admin/affiliates/stats");
    return response;
  }

  /**
   * Fetch paginated affiliates list
   * Backend route: GET /api/v1/admin/affiliates?page=&limit=&search=&status=
   * @param {Object} params - { page, limit, search, status }
   * @returns {Promise<Object>}
   */
  async getAffiliates(params = {}) {
    const { page = 1, limit = 25, search = "", status = "" } = params;
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (search && search.trim()) queryParams.append("search", search.trim());
    if (status && status !== "All") {
      queryParams.append("status", status.toLowerCase());
    }

    const response = await apiClient.get(
      `/api/v1/admin/affiliates?${queryParams.toString()}`
    );
    return response;
  }

  /**
   * Fetch single affiliate details by ID
   * Backend route: GET /api/v1/admin/affiliates/:id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getAffiliateById(id) {
    const response = await apiClient.get(`/api/v1/admin/affiliates/${id}`);
    return response;
  }

  /**
   * Update affiliate status
   * Backend route: PUT /api/v1/admin/affiliates/:id
   * @param {string} id
   * @param {string} status - "pending" | "approved" | "blocked" | "reject"
   * @returns {Promise<Object>}
   */
  async updateAffiliateStatus(id, status) {
    const response = await apiClient.put(`/api/v1/admin/affiliates/${id}/status`, {
      status,
    });
    return response;
  }
}

const affiliateService = new AffiliateService();
export default affiliateService;
export { AffiliateService };

