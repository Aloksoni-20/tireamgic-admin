import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShoppingCart,
  User,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { installers } from "../../data/installers";

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
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function InstallerDetails() {
  const { id } = useParams();

  const installer = installers.find(
    (item) => item.id === id
  );

  // Partner not found
  if (!installer) {
    return (
      <AdminLayout>
        <div className="mx-auto max-w-[1200px]">
          <Link
            to="/admin/partners/installers"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Installer Partners
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <XCircle size={25} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Installer not found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              The installer application you're looking for
              doesn't exist or may have been removed.
            </p>

            <Link
              to="/admin/partners/installers"
              className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Installers
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const initials = installer.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1200px]">
        {/* Back */}
        <Link
          to="/admin/partners/installers"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Installer Partners
        </Link>

        {/* Profile Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-28 bg-slate-900 md:h-32" />

          <div className="px-5 pb-6 md:px-7">
            {/* Profile row */}
            <div className="-mt-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-end gap-4">
                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-slate-800 text-xl font-bold text-white shadow-md">
                  {initials}
                </div>

                {/* Name */}
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
                      {installer.fullName}
                    </h1>

                    <StatusBadge status={installer.status} />
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                    <span>{installer.id}</span>

                    <span className="hidden text-slate-300 sm:inline">
                      •
                    </span>

                    <span>Installer Partner</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                {installer.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <CheckCircle2 size={16} />
                      Approve
                    </button>
                  </>
                )}

                {installer.status === "Approved" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                )}

                {installer.status === "Rejected" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <CheckCircle2 size={16} />
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Personal details submitted by the installer.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <InfoItem
                  label="Full Name"
                  value={installer.fullName}
                />

                <InfoItem
                  label="Email Address"
                  value={installer.email}
                  icon={Mail}
                />

                <InfoItem
                  label="Phone Number"
                  value={installer.phone}
                  icon={Phone}
                />
              </div>
            </section>

            {/* Business Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Building2 size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Business Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Business and installation experience details.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <InfoItem
                  label="Business Name"
                  value={installer.businessName}
                  icon={Building2}
                />

                <InfoItem
                  label="City"
                  value={installer.city}
                  icon={MapPin}
                />

                <InfoItem
                  label="Experience"
                  value={installer.experience}
                  icon={Clock3}
                />
              </div>
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
                      Orders
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Orders associated with this installer.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  View All Orders
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                  <ShoppingCart size={19} />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-800">
                  No orders available
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Installer orders will appear here once the
                  order API is connected.
                </p>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
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

                <StatusBadge status={installer.status} />
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
                      {installer.appliedAt}
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
                      Application ID
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {installer.id}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Location
              </h2>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    City
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {installer.city}
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Contact
              </h2>

              <div className="mt-5 space-y-4">
                <a
                  href={`mailto:${installer.email}`}
                  className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Mail size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Email
                    </p>

                    <p className="truncate text-sm font-medium text-slate-700">
                      {installer.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${installer.phone}`}
                  className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Phone size={16} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Phone
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {installer.phone}
                    </p>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default InstallerDetails;