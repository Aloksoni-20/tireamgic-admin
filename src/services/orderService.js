import apiClient from "../config/api.config";

class OrderService {
  /**
   * Fetch paginated orders from backend API
   * Backend route: GET /api/v1/admin/orders?page=X&limit=Y&search=Z
   * @param {Object} params - { page, limit, search }
   * @returns {Promise<Object>}
   */
  async getOrders(params = {}) {
    const { page = 1, limit = 10, search = "" } = params;
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (search && search.trim()) queryParams.append("search", search.trim());

    const response = await apiClient.get(`/api/v1/admin/orders?${queryParams.toString()}`);
    return response;
  }

  /**
   * Fetch single order by its ID (MongoDB ObjectId or orderNumber)
   * Backend route: GET /api/v1/admin/orders/:id
   * @param {string} orderId
   * @returns {Promise<Object>}
   */
  async getOrderById(orderId) {
    const response = await apiClient.get(`/api/v1/admin/orders/${orderId}`);
    return response;
  }
}

const orderService = new OrderService();
export default orderService;
export { OrderService };
