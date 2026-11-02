import {
  ArrowLeft,
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Globe,
  Loader2,
  Mail,
  ShoppingCart,
  Users,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { useAffiliateById } from "../../customHooks/useAffiliate";

function StatusBadge({ status }) {
  const normalized = (status || "").toLowerCase();

  const statusStyles = {
    pending: {
      label: "Pending",
      wrapper: "bg-amber-50 text-amber-700 ring-amber-200",
      dot: "bg-amber-500",
    },
    approved: {
      label: "Approved",
      wrapper: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      dot: "bg-emerald-500",
    },
    rejected: {
      label: "Rejected",
      wrapper: "bg-red-50 text-red-700 ring-red-200",
      dot: "bg-red-500",
    },
    reject: {
      label: "Rejected",
      wrapper: "bg-red-50 text-red-700 ring-red-200",
      dot: "bg-red-500",
    },
    blocked: {
      label: "Blocked",
      wrapper: "bg-slate-100 text-slate-700 ring-slate-300",
      dot: "bg-slate-600",
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
  if (!name) return "AF";
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function InfoItem({ label, value, icon: Icon }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2">
        {Icon && (
          <Icon
            size={16}
            className="shrink-0 text-slate-400"
          />
        )}

        <p className="break-all text-sm font-medium text-slate-800">
          {value ?? "ΓÇö"}
        </p>
      </div>
    </div>
  );
}

function AffiliateDetails() {
  const { id } = useParams();
  const { affiliate, loading, updatingStatus, updateStatus } =
    useAffiliateById(id);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatus(newStatus);
    } catch {
      // Error is logged in hook
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="mx-auto flex min-h-[400px] max-w-[1200px] items-center justify-center">
          <Loader2 size={32} className="animate-spin text-purple-600" />
        </div>
      </AdminLayout>
    );
  }

  if (!affiliate) {
    return (
      <AdminLayout>
        <div className="mx-auto max-w-[1200px]">
          <Link
            to="/admin/partners/affiliates"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Affiliate Partners
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <XCircle size={25} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Affiliate not found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              The affiliate application you're looking for
              doesn't exist or may have been removed.
            </p>

            <Link
              to="/admin/partners/affiliates"
              className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Affiliates
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const initials = getInitials(affiliate.name);
  const currentStatus = (affiliate.status || "").toLowerCase();
  const website = affiliate.websiteInstagram || "";
  const websiteUrl = website
    ? website.startsWith("http")
      ? website
      : `https://${website}`
    : "";
  const orders = Array.isArray(affiliate.orders) ? affiliate.orders : [];

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1200px]">
        {/* Back */}
        <Link
          to="/admin/partners/affiliates"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Affiliate Partners
        </Link>

        {/* Profile Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-28 bg-slate-900 md:h-32" />

          <div className="px-5 pb-6 md:px-7">
            <div className="-mt-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              {/* Profile */}
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-purple-600 text-xl font-bold text-white shadow-md">
                  {initials}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
                      {affiliate.name || "ΓÇö"}
                    </h1>

                    <StatusBadge status={affiliate.status} />
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                    <span>{affiliate.affiliateCode || affiliate.id}</span>

                    <span className="hidden text-slate-300 sm:inline">
                      ΓÇó
                    </span>

                    <span>Affiliate Partner</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                {currentStatus !== "pending" && (
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleStatusChange("pending")}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Clock3 size={16} />
                    Set Pending
                  </button>
                )}

                {currentStatus !== "rejected" && currentStatus !== "reject" && (
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleStatusChange("reject")}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                )}

                {currentStatus !== "blocked" && (
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleStatusChange("blocked")}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Ban size={16} />
                    Block
                  </button>
                )}

                {currentStatus !== "approved" && (
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleStatusChange("approved")}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updatingStatus ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Users size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Personal details submitted by the affiliate.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <InfoItem
                  label="Full Name"
                  value={affiliate.name}
                />

                <InfoItem
                  label="Email Address"
                  value={affiliate.email}
                  icon={Mail}
                />
              </div>
            </section>

            {/* Affiliate Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Globe size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Affiliate Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Social presence and audience information.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <InfoItem
                  label="Website / Instagram"
                  value={website || "ΓÇö"}
                  icon={Globe}
                />

                <InfoItem
                  label="Audience Size"
                  value={affiliate.audienceSize}
                  icon={Users}
                />
              </div>

              {/* Website */}
              {websiteUrl && (
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Social / Website
                  </p>

                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    <Globe size={17} />
                    Visit Profile
                  </a>
                </div>
              )}
            </section>

            {/* Orders */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <ShoppingCart size={19} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Orders ({orders.length})
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Orders associated with this affiliate.
                    </p>
                  </div>
                </div>

                <Link
                  to="/admin/orders"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  View All Orders
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full min-w-[560px] text-left">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Order Number
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                        >
                          <td className="px-4 py-3.5 text-sm font-semibold text-blue-600">
                            <Link
                              to={`/admin/orders/${order.id}`}
                              className="hover:underline"
                            >
                              {order.orderNumber || order.id}
                            </Link>
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="text-sm font-medium text-slate-900">
                              {order.customer?.name || "ΓÇö"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {order.customer?.email || "ΓÇö"}
                            </p>
                          </td>
                          <td className="px-4 py-3.5 text-sm font-bold text-slate-900">
                            {formatCurrency(order.amount)}
                          </td>
                          <td className="px-4 py-3.5 text-sm text-slate-600">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <Link
                              to={`/admin/orders/${order.id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Eye size={14} />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                    <ShoppingCart size={19} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-800">
                    No orders available
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    No orders have been placed with this affiliate yet.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Application Status */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Application Status
              </h2>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-xs font-medium text-slate-500">
                  Current Status
                </p>

                <StatusBadge status={affiliate.status} />
              </div>

              <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={17}
                    className="mt-0.5 text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Application Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {formatDate(affiliate.appliedDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3
                    size={17}
                    className="mt-0.5 text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Affiliate Code
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {affiliate.affiliateCode || affiliate.id}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Audience */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Audience
              </h2>

              <div className="mt-5 rounded-xl bg-purple-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm">
                    <Users size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-purple-600">
                      Audience Size
                    </p>

                    <p className="mt-1 text-lg font-bold text-purple-900">
                      {affiliate.audienceSize || "ΓÇö"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Contact
              </h2>

              <a
                href={`mailto:${affiliate.email}`}
                className="mt-5 flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Mail size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="truncate text-sm font-medium text-slate-700">
                    {affiliate.email || "ΓÇö"}
                  </p>
                </div>
              </a>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AffiliateDetails;
