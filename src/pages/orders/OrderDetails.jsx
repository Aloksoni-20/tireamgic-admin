import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";
import { orders } from "../../data/orders";

const paymentStyles = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-red-50 text-red-700 border-red-200",
  Refunded: "bg-gray-100 text-gray-700 border-gray-200",
  "Partially Refunded":
    "bg-orange-50 text-orange-700 border-orange-200",
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function PaymentBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${
        paymentStyles[status] ||
        "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function InfoRow({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
          <Icon size={16} />
        </div>
      )}

      <div className={Icon ? "" : "w-full"}>
        <p className="text-xs font-medium text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-gray-900">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="font-semibold text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-xs text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function OrderDetails() {
  const { id } = useParams();

  const order = orders.find(
    (item) => item.id === id
  );

  if (!order) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Package size={24} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-gray-900">
              Order Not Found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              The order you are looking for does not
              exist.
            </p>

            <Link
              to="/admin/orders"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <ArrowLeft size={16} />
              Back to Orders
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back */}
        <div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>
        </div>

        {/* Order Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {order.id}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Order placed on {order.createdAt}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-medium text-gray-400">
                Order Total
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatCurrency(
                  order.pricing.grandTotal
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="space-y-6 xl:col-span-2">
            {/* Customer Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={User}
                title="Customer Information"
                description="Customer who placed this order"
              />

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-600">
                  {getInitials(
                    order.customer.name
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.customer.name}
                  </h3>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InfoRow
                      label="Email"
                      value={order.customer.email}
                      icon={Mail}
                    />

                    <InfoRow
                      label="Phone"
                      value={order.customer.phone}
                      icon={Phone}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6">
                <SectionHeader
                  icon={Package}
                  title="Order Items"
                  description={`${order.items.length} ${
                    order.items.length === 1
                      ? "product"
                      : "products"
                  } in this order`}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px]">
                  <thead>
                    <tr className="border-y border-gray-100 bg-gray-50/70 text-left">
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Product
                      </th>

                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        SKU
                      </th>

                      <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Qty
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Price
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.items.map(
                      (item) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                                <Package
                                  size={17}
                                />
                              </div>

                              <span className="text-sm font-semibold text-gray-900">
                                {item.name}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-500">
                            {item.sku}
                          </td>

                          <td className="px-5 py-4 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </td>

                          <td className="px-5 py-4 text-right text-sm text-gray-700">
                            {formatCurrency(
                              item.price
                            )}
                          </td>

                          <td className="px-5 py-4 text-right text-sm font-semibold text-gray-900">
                            {formatCurrency(
                              item.total
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={MapPin}
                title="Delivery Address"
                description="Shipping address for this order"
              />

              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  {order.customer.name}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                  <br />
                  PIN:{" "}
                  {order.shippingAddress.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={CreditCard}
                title="Order Summary"
                description="Pricing breakdown"
              />

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-gray-900">
                    {formatCurrency(
                      order.pricing.subtotal
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Discount
                  </span>

                  <span className="font-medium text-emerald-600">
                    -
                    {formatCurrency(
                      order.pricing.discount
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium text-gray-900">
                    {order.pricing.shipping ===
                    0
                      ? "Free"
                      : formatCurrency(
                          order.pricing.shipping
                        )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Tax
                  </span>

                  <span className="font-medium text-gray-900">
                    {formatCurrency(
                      order.pricing.tax
                    )}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      Grand Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(
                        order.pricing.grandTotal
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={CreditCard}
                title="Payment Information"
                description="Payment details for this order"
              />

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Payment Status
                  </p>

                  <div className="mt-2">
                    <PaymentBadge
                      status={
                        order.payment.status
                      }
                    />
                  </div>
                </div>

                <InfoRow
                  label="Payment Method"
                  value={
                    order.payment.method
                  }
                />

                <InfoRow
                  label="Transaction ID"
                  value={
                    order.payment
                      .transactionId ||
                    "Not available"
                  }
                />
              </div>
            </div>

            {/* Order Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={Package}
                title="Order Information"
                description="Basic order information"
              />

              <div className="mt-6 space-y-5">
                <InfoRow
                  label="Order ID"
                  value={order.id}
                />

                <InfoRow
                  label="Order Date"
                  value={order.createdAt}
                />

                <InfoRow
                  label="Total Items"
                  value={`${order.items.length} ${
                    order.items.length === 1
                      ? "item"
                      : "items"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}