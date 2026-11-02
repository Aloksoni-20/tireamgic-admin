import { Link } from "react-router-dom";
import {
  Eye,
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";
import useOrder from "../../customHooks/useOrder";

function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getInitials(name) {
  if (!name) return "CU";
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function EmptyState({ search, onClearSearch }) {
  return (
    <div className="px-5 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Package size={20} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        {search ? "No matching orders found" : "No orders found"}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {search
          ? `No results match "${search}". Try searching for something else.`
          : "There are currently no orders available."}
      </p>

      {search && (
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          <X size={14} /> Clear search
        </button>
      )}
    </div>
  );
}

export default function Orders() {
  const {
    orders,
    loading,
    search,
    setSearch,
    pagination,
    setPage,
    setLimit,
  } = useOrder({ initialPage: 1, initialLimit: 10 });

  const { page, limit, total, totalPage } = pagination;

  const startRecord = total === 0 ? 0 : (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, total);

  // Generate page numbers with sliding window
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <span>/</span>
              <span className="text-gray-900">Orders</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and track all customer orders.
            </p>
          </div>

          {/* Quick Stats or actions if needed */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100">
              Total: {total} {total === 1 ? "Order" : "Orders"}
            </span>
          </div>
        </div>

        {/* Orders Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Table Header with Search & Limit selector */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            {/* Search Box */}
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, customers..."
                className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-9 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results count & rows per page */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Rows:</span>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-xs font-medium text-gray-700 outline-none hover:border-gray-300 focus:border-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <span className="text-xs text-gray-500">
                {total > 0
                  ? `Showing ${startRecord}-${endRecord} of ${total}`
                  : "0 orders"}
              </span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block relative min-h-[200px]">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                <Loader2 size={28} className="animate-spin text-blue-600" />
              </div>
            )}

            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Order
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Partner
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => {
                    const mongoId = order.id
                    const displayOrderId = order.atdOrderId
                    const customerName = order.customer?.name || "Customer";
                    const customerEmail = order.customer?.email || "-";
                    const partnerBusiness =
                      order.partner?.businessName ||
                      "Direct Order";
                    const partnerType = order.partner?.type || "Direct";
                    const grandTotal =
                      order.amount ??
                      0;
                    const dateFormatted =
                      order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "-";

                    return (
                      <tr
                        key={mongoId}
                        className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/60"
                      >
                        {/* Order */}
                        <td className="px-5 py-4">
                          <Link
                            to={`/admin/orders/${mongoId}`}
                            className="text-base text-blue-600 hover:text-blue-700"
                            title={displayOrderId}
                          >
                            {displayOrderId}
                          </Link>
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {customerName}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-500">
                                {customerEmail}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Partner */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            {partnerBusiness}
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600">
                              {partnerType}
                            </span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-gray-900">
                            {formatCurrency(grandTotal)}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-gray-700">
                            {dateFormatted}
                          </p>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-right">
                          <Link
                            to={`/admin/orders/${mongoId}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye size={15} />
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState search={search} onClearSearch={() => setSearch("")} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="divide-y divide-gray-100 lg:hidden relative min-h-[160px]">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                <Loader2 size={28} className="animate-spin text-blue-600" />
              </div>
            )}

            {orders && orders.length > 0 ? (
              orders.map((order) => {
                const mongoId = order.id
                const displayOrderId = order.atdOrderId
                const customerName = order.customer?.name || "Customer";
                const customerEmail = order.customer?.email || "-";
                const partnerBusiness =
                  order.partner?.businessName ||
                  "Direct Order";
                const partnerType = order.partner?.type || "Direct";
                const grandTotal =
                  order.amount ?? 0;
                const dateFormatted =
                  order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    : "-";

                return (
                  <div key={mongoId} className="p-4 sm:p-5">
                    {/* Order ID and Date */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to={`/admin/orders/${mongoId}`}
                          className="text-base text-blue-600 hover:text-blue-700"
                        >
                          {displayOrderId}
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">
                          {dateFormatted}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(grandTotal)}
                      </p>
                    </div>

                    {/* Customer and Partner */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Customer
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {customerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {customerEmail}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Partner
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {partnerBusiness}
                        </p>
                        <p className="text-xs text-gray-500">
                          {partnerType}
                        </p>
                      </div>
                    </div>

                    {/* View Order */}
                    <Link
                      to={`/admin/orders/${mongoId}`}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={16} />
                      View Order
                    </Link>
                  </div>
                );
              })
            ) : (
              <EmptyState search={search} onClearSearch={() => setSearch("")} />
            )}
          </div>

          {/* Pagination Controls */}
          {totalPage > 1 && (
            <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row">
              <p className="text-xs text-gray-500">
                Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
                <span className="font-semibold text-gray-900">{totalPage}</span>
              </p>

              <div className="flex items-center gap-1.5">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={15} />
                  Prev
                </button>

                {/* Page number buttons */}
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setPage(pageNum)}
                    className={`h-9 min-w-[36px] rounded-lg px-2.5 text-xs font-medium transition ${pageNum === page
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPage}
                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
