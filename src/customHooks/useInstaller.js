import { useState, useEffect, useCallback } from "react";
import installerService from "../services/installerService";

/**
 * Custom hook for installer stats and paginated installer list
 */
export function useInstaller({ initialPage = 1, initialLimit = 10 } = {}) {
  const [installers, setInstallers] = useState([]);
  const [stats, setStats] = useState({
    totalInstallers: 0,
    approvedInstallers: 0,
    pendingReview: 0,
    rejectedInstallers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilterState] = useState("All");

  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
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

  const setStatusFilter = useCallback((newStatus) => {
    setStatusFilterState(newStatus);
    setPage(1);
  }, []);

  const setLimit = useCallback((newLimit) => {
    setLimitState(newLimit);
    setPage(1);
  }, []);

  // Fetch installer stats
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const response = await installerService.getInstallerStats();
      const data = response?.data || {};
      setStats({
        totalInstallers: data.totalInstallers ?? 0,
        approvedInstallers: data.approvedInstallers ?? 0,
        pendingReview: data.pendingReview ?? 0,
        rejectedInstallers: data.rejectedInstallers ?? 0,
      });
    } catch (err) {
      console.error("Failed to fetch installer stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch paginated installers list
  const fetchInstallers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await installerService.getInstallers({
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
      });

      const installersList = Array.isArray(response?.data)
        ? response.data
        : [];
      const paginationInfo = response?.pagination || {};

      setInstallers(installersList);
      setTotal(paginationInfo.total ?? installersList.length);
      setTotalPage(
        paginationInfo.totalPage ??
          Math.max(1, Math.ceil((paginationInfo.total ?? installersList.length) / limit))
      );
    } catch (err) {
      console.error("Failed to fetch installers:", err);
      setInstallers([]);
      setTotal(0);
      setTotalPage(1);
      setError(err?.message || "Failed to fetch installers");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchInstallers();
  }, [fetchInstallers]);

  return {
    installers,
    stats,
    loading,
    statsLoading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    pagination: {
      page,
      limit,
      total,
      totalPage,
    },
    setPage,
    setLimit,
    refetch: fetchInstallers,
    refetchStats: fetchStats,
  };
}

/**
 * Custom hook to fetch a single installer by ID and update its status
 * @param {string} installerId
 */
export function useInstallerById(installerId) {
  const [installer, setInstaller] = useState(null);
  const [loading, setLoading] = useState(Boolean(installerId));
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstaller = useCallback(async () => {
    if (!installerId) {
      setInstaller(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await installerService.getInstallerById(installerId);
      const data = response?.data || response;
      setInstaller(data);
    } catch (err) {
      console.error("Failed to fetch installer details:", err);
      setInstaller(null);
      setError(err?.message || "Failed to load installer details");
    } finally {
      setLoading(false);
    }
  }, [installerId]);

  const updateStatus = useCallback(
    async (newStatus) => {
      if (!installerId) return;
      setUpdatingStatus(true);
      try {
        await installerService.updateInstallerStatus(installerId, newStatus);
        await fetchInstaller();
      } catch (err) {
        console.error("Failed to update installer status:", err);
        throw err;
      } finally {
        setUpdatingStatus(false);
      }
    },
    [installerId, fetchInstaller]
  );

  useEffect(() => {
    fetchInstaller();
  }, [fetchInstaller]);

  return {
    installer,
    loading,
    updatingStatus,
    error,
    updateStatus,
    refetch: fetchInstaller,
  };
}

export default useInstaller;

