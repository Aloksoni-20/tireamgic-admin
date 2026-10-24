import { Link } from "react-router-dom";
import { Eye, Package } from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";
import { orders } from "../../data/orders";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function EmptyState() {
  return (
    <div className="px-5 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Package size={20} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        No orders found
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        There are no orders available.
      </p>
    </div>
  );
}

export default function Orders() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
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

        {/* Orders Table */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                All Orders
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Showing {orders.length} of {orders.length} orders
              </p>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
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
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/60"
                    >
                      {/* Order */}
                      <td className="px-5 py-4">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                          {order.id}
                        </Link>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                            {getInitials(order.customer.name)}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {order.customer.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Partner */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {order.partner.businessName}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {order.partner.name}
                          </span>

                          <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600">
                            {order.partner.type}
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(order.pricing.grandTotal)}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-700">
                          {order.createdAt}
                        </p>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={15} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet */}
          <div className="divide-y divide-gray-100 lg:hidden">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 sm:p-5"
                >
                  {/* Order ID and Date */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="font-semibold text-blue-600 hover:text-blue-700"
                      >
                        {order.id}
                      </Link>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.createdAt}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-gray-900">
                      {formatCurrency(order.pricing.grandTotal)}
                    </p>
                  </div>

                  {/* Customer and Partner */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Customer */}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Customer
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {order.customer.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.customer.email}
                      </p>
                    </div>

                    {/* Partner */}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Partner
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {order.partner.businessName}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.partner.type}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Items
                      </p>

                      <p className="mt-1 text-sm text-gray-700">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>

                  {/* View Order */}
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye size={16} />
                    View Order
                  </Link>
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}