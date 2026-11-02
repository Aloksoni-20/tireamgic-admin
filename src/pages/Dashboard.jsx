import {
  Building2,
  DollarSign,
  Eye,
  Loader2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import useDashboard from "../customHooks/useDashboard";

function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return "ΓÇö";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function OrderStatusBadge({ status }) {
  const normalized = (status || "").toUpperCase();

  const statusStyles = {
    COMPLETED: {
      label: "Completed",
      wrapper: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      dot: "bg-emerald-500",
    },
    PENDING: {
      label: "Pending",
      wrapper: "bg-amber-50 text-amber-700 ring-amber-200",
      dot: "bg-amber-500",
    },
    CANCELLED: {
      label: "Cancelled",
      wrapper: "bg-red-50 text-red-700 ring-red-200",
      dot: "bg-red-500",
    },
  };

  const style = statusStyles[normalized] || {
    label: status || "Unknown",
    wrapper: "bg-slate-50 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${style.wrapper}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}

function Dashboard() {
  const { dashboard, loading } = useDashboard();

  const stats = [
    {
      title: "Total Installers",
      value: dashboard.totalInstaller,
      icon: Building2,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Affiliates",
      value: dashboard.totalAffiliatedPartner,
      icon: Users,
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrderNumber,
      icon: ShoppingCart,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(dashboard.totalRevenu),
      icon: DollarSign,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ];

  const recentOrders = dashboard.recentOrders || [];

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1600px]">
        {/* Page Heading */}
        <div className="mb-7">
          <p className="mb-1 text-sm font-medium text-slate-500">
            Overview
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back. Here's what's happening with TireMagic today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                  >
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Section Header */}
            <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent Orders
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest orders across the platform
                </p>
              </div>

              <Link
                to="/admin/orders"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View All Orders
              </Link>
            </div>

            {/* Orders Table */}
            <div className="relative min-h-[200px] overflow-x-auto">
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                  <Loader2 size={28} className="animate-spin text-blue-600" />
                </div>
              )}

              <table className="w-full min-w-[780px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Order
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      ATD Order ID
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Payment
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="text-sm font-semibold text-blue-600 hover:underline"
                          >
                            {order.orderNumber || order.id}
                          </Link>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {formatDate(order.createdAt)}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {order.atdOrderId || "ΓÇö"}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-900">
                            {order.customer?.name || "ΓÇö"}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {order.customer?.email || "ΓÇö"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                            {order.paymentMethod || "ΓÇö"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <OrderStatusBadge status={order.status} />
                        </td>

                        <td className="px-5 py-4 text-sm font-bold text-slate-900">
                          {formatCurrency(order.amount)}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            <Eye size={14} />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-5 py-12 text-center text-sm text-slate-500"
                      >
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
