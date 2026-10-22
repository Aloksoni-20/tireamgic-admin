import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Globe,
  Mail,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { affiliates } from "../../data/affiliates";

function StatusBadge({ status }) {
  const statusStyles = {
    Pending: {
      wrapper: "bg-amber-50 text-amber-700 ring-amber-200",
      dot: "bg-amber-500",
    },
    Approved: {
      wrapper: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      dot: "bg-emerald-500",
    },
    Rejected: {
      wrapper: "bg-red-50 text-red-700 ring-red-200",
      dot: "bg-red-500",
    },
  };

  const style =
    statusStyles[status] || {
      wrapper: "bg-slate-50 text-slate-600 ring-slate-200",
      dot: "bg-slate-400",
    };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${style.wrapper}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function AffiliatePartners() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAffiliates = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return affiliates.filter((affiliate) => {
      const matchesSearch =
        !searchValue ||
        affiliate.id.toLowerCase().includes(searchValue) ||
        affiliate.fullName.toLowerCase().includes(searchValue) ||
        affiliate.email.toLowerCase().includes(searchValue) ||
        affiliate.website.toLowerCase().includes(searchValue) ||
        affiliate.audienceSize
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        affiliate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalAffiliates = affiliates.length;

  const pendingAffiliates = affiliates.filter(
    (affiliate) => affiliate.status === "Pending"
  ).length;

  const approvedAffiliates = affiliates.filter(
    (affiliate) => affiliate.status === "Approved"
  ).length;

  const rejectedAffiliates = affiliates.filter(
    (affiliate) => affiliate.status === "Rejected"
  ).length;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1600px]">
        {/* Page Header */}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Users size={17} />
            </span>

            <span className="text-sm font-medium text-purple-600">
              Partner Management
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Affiliate Partners
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Manage affiliate applications, review social profiles,
            and monitor affiliate partner status.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Affiliates
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalAffiliates}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  All applications
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Users size={21} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Review
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {pendingAffiliates}
                </p>

                <p className="mt-1 text-xs text-amber-600">
                  Requires attention
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock3 size={21} />
              </div>
            </div>
          </div>

          {/* Approved */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Approved
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {approvedAffiliates}
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  Active affiliates
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck size={21} />
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Rejected
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {rejectedAffiliates}
                </p>

                <p className="mt-1 text-xs text-red-500">
                  Rejected applications
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Users size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Affiliate Applications
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Review all affiliate partner applications.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Search */}
                <div className="relative sm:w-80">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search affiliates..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                {/* Status */}
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Affiliate
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Website / Instagram
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Audience Size
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Applied
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAffiliates.length > 0 ? (
                  filteredAffiliates.map((affiliate) => {
                    const initials = affiliate.fullName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={affiliate.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                      >
                        {/* Affiliate */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                              {initials}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {affiliate.fullName}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {affiliate.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Mail
                              size={15}
                              className="text-slate-400"
                            />

                            {affiliate.email}
                          </div>
                        </td>

                        {/* Website */}
                        <td className="px-5 py-4">
                          <a
                            href={
                              affiliate.website.startsWith("http")
                                ? affiliate.website
                                : `https://${affiliate.website}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            <Globe size={15} />
                            {affiliate.website}
                          </a>
                        </td>

                        {/* Audience */}
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                            {affiliate.audienceSize}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge status={affiliate.status} />
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-500">
                            <CalendarDays size={15} />
                            {affiliate.appliedAt}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-right">
                          <Link
                            to={`/admin/partners/affiliates/${affiliate.id}`}
                            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            View
                            <ChevronRight size={16} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search
                          size={20}
                          className="text-slate-400"
                        />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-900">
                        No affiliates found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your search or status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredAffiliates.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {affiliates.length}
              </span>{" "}
              affiliates
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AffiliatePartners;