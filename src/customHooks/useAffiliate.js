import { useState, useEffect, useCallback } from "react";
import affiliateService from "../services/affiliateService";

/**
 * Custom hook for affiliate stats and paginated affiliate list
 */
export function useAffiliate({ initialPage = 1, initialLimit = 25 } = {}) {
  const [affiliates, setAffiliates] = useState([]);
  const [stats, setStats] = useState({
    totalAffiliates: 0,
    approvedAffiliated: 0,
    rejectedAffiliated: 0,
    pendingAffiliated: 0,
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

  // Fetch affiliate stats
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const response = await affiliateService.getAffiliateStats();
      const data = response?.data || {};
      setStats({
        totalAffiliates: data.totalAffiliates ?? 0,
        approvedAffiliated: data.approvedAffiliated ?? data.approvedAffiliates ?? 0,
        rejectedAffiliated: data.rejectedAffiliated ?? data.rejectedAffiliates ?? 0,
        pendingAffiliated: data.pendingAffiliated ?? data.pendingAffiliates ?? 0,
      });
    } catch (err) {
      console.error("Failed to fetch affiliate stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch paginated affiliates list
  const fetchAffiliates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await affiliateService.getAffiliates({
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
      });

      const affiliatesList = Array.isArray(response?.data)
        ? response.data
        : [];
      const paginationInfo = response?.pagination || {};

      setAffiliates(affiliatesList);
      setTotal(paginationInfo.total ?? affiliatesList.length);
      setTotalPage(
        paginationInfo.totalPage ??
          Math.max(1, Math.ceil((paginationInfo.total ?? affiliatesList.length) / limit))
      );
    } catch (err) {
      console.error("Failed to fetch affiliates:", err);
      setAffiliates([]);
      setTotal(0);
      setTotalPage(1);
      setError(err?.message || "Failed to fetch affiliates");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchAffiliates();
  }, [fetchAffiliates]);

  return {
    affiliates,
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
    refetch: fetchAffiliates,
    refetchStats: fetchStats,
  };
}

/**
 * Custom hook to fetch a single affiliate by ID and update its status
 * @param {string} affiliateId
 */
export function useAffiliateById(affiliateId) {
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(Boolean(affiliateId));
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState(null);

  const fetchAffiliate = useCallback(async () => {
    if (!affiliateId) {
      setAffiliate(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await affiliateService.getAffiliateById(affiliateId);
      const data = response?.data || response;
      setAffiliate(data);
    } catch (err) {
      console.error("Failed to fetch affiliate details:", err);
      setAffiliate(null);
      setError(err?.message || "Failed to load affiliate details");
    } finally {
      setLoading(false);
    }
  }, [affiliateId]);

  const updateStatus = useCallback(
    async (newStatus) => {
      if (!affiliateId) return;
      setUpdatingStatus(true);
      try {
        await affiliateService.updateAffiliateStatus(affiliateId, newStatus);
        await fetchAffiliate();
      } catch (err) {
        console.error("Failed to update affiliate status:", err);
        throw err;
      } finally {
        setUpdatingStatus(false);
      }
    },
    [affiliateId, fetchAffiliate]
  );

  useEffect(() => {
    fetchAffiliate();
  }, [fetchAffiliate]);

  return {
    affiliate,
    loading,
    updatingStatus,
    error,
    updateStatus,
    refetch: fetchAffiliate,
  };
}

export default useAffiliate;

