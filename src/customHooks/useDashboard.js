import { useState, useEffect, useCallback } from "react";
import dashboardService from "../services/dashboardService";

/**
 * Custom hook to fetch admin dashboard data
 */
export function useDashboard() {
  const [dashboard, setDashboard] = useState({
    totalInstaller: 0,
    totalAffiliatedPartner: 0,
    totalRevenu: 0,
    totalOrderNumber: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await dashboardService.getDashboardData();
      const data = response?.data || {};

      setDashboard({
        totalInstaller: data.totalInstaller ?? 0,
        totalAffiliatedPartner: data.totalAffiliatedPartner ?? 0,
        totalRevenu: data.totalRevenu ?? data.totalRevenue ?? 0,
        totalOrderNumber: data.totalOrderNumber ?? 0,
        recentOrders: Array.isArray(data.recentOrders)
          ? data.recentOrders
          : [],
      });
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
}

export default useDashboard;

