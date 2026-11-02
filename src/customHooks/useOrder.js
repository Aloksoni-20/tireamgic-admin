import { useState, useEffect, useCallback } from "react";
import orderService from "../services/orderService";
import { orders as fallbackMockOrders } from "../data/orders";

/**
 * Custom hook for orders list with pagination and search
 */
export function useOrder({ initialPage = 1, initialLimit = 10 } = {}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderService.getOrders({
        page,
        limit,
        search: debouncedSearch,
      });

      // Backend format: { success: true, data: [...orders], pagination: { page, limit, total, totalPage } }
      const ordersList =
        (Array.isArray(response?.data) ? response.data : null) ||
        (Array.isArray(response) ? response : null) ||
        response?.orders ||
        [];

      const paginationInfo = response?.pagination || {};

      setOrders(ordersList);
      setTotal(paginationInfo.total ?? ordersList.length);
      setTotalPage(paginationInfo.totalPage ?? Math.max(1, Math.ceil(ordersList.length / limit)));
    } catch (err) {
      console.warn("API orders fetch failed, falling back to local dataset:", err);

      let filtered = [...fallbackMockOrders];
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase().trim();
        filtered = filtered.filter((order) => {
          const idMatch =
            order.atdOrderId?.toLowerCase().includes(query) ||
            order.orderNumber?.toLowerCase().includes(query) ||
            order.id?.toLowerCase().includes(query);
          const customerMatch =
            order.customer?.name?.toLowerCase().includes(query) ||
            order.customer?.email?.toLowerCase().includes(query);
          const partnerMatch =
            order.partner?.businessName?.toLowerCase().includes(query) ||
            order.partner?.name?.toLowerCase().includes(query);
          return Boolean(idMatch || customerMatch || partnerMatch);
        });
      }

      const calculatedTotal = filtered.length;
      const calculatedTotalPage = Math.max(1, Math.ceil(calculatedTotal / limit));
      const startIndex = (page - 1) * limit;
      const paginatedList = filtered.slice(startIndex, startIndex + limit);

      setOrders(paginatedList);
      setTotal(calculatedTotal);
      setTotalPage(calculatedTotalPage);
      setError(err?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    search,
    setSearch,
    pagination: {
      page,
      limit,
      total,
      totalPage,
    },
    setPage,
    setLimit,
    refetch: fetchOrders,
  };
}

/**
 * Custom hook to fetch a single order by ID
 * @param {string} orderId
 */
export function useOrderById(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(Boolean(orderId));
  const [error, setError] = useState(null);

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setOrder(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await orderService.getOrderById(orderId);
      const data = response?.data || response;
      setOrder(data);
    } catch (err) {
      console.warn("Failed to fetch order by ID from API, falling back:", err);
      // Fallback to local mock data if exists
      const fallback = fallbackMockOrders.find(
        (item) => item.id === orderId || item._id === orderId
      );
      setOrder(fallback || null);
      setError(err?.message || "Failed to load order details");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return {
    order,
    loading,
    error,
    refetch: fetchOrder,
  };
}

export default useOrder;
