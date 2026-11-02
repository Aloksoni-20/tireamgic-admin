import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  User,
  Loader2,
  FileText,
  ShieldCheck,
} from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";
import { useOrderById } from "../../customHooks/useOrder";

const statusStyles = {
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FILLED: "bg-blue-50 text-blue-700 border-blue-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  FAILED: "bg-red-50 text-red-700 border-red-200",
  Failed: "bg-red-50 text-red-700 border-red-200",
  Cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function StatusBadge({ status }) {
  if (!status) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[status] || "border-gray-200 bg-gray-50 text-gray-700"
        }`}
    >
      {status}
    </span>
  );
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

function InfoRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
          <Icon size={16} />
        </div>
      )}

      <div className={Icon ? "" : "w-full"}>
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-gray-900 break-words">{value || "-"}</p>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
      </div>
    </div>
  );
}

export default function OrderDetails() {
  const { id } = useParams();
  const { order, loading, error } = useOrderById(id);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
          <Loader2 size={36} className="animate-spin text-blue-600" />
          <p className="text-sm font-medium text-gray-500">Loading order details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Package size={24} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-gray-900">Order Not Found</h1>

            <p className="mt-2 text-sm text-gray-500">
              {error || "The order you are looking for does not exist."}
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

  // Normalize API data fields vs mock fallback
  const atdOrderNumber = order.atdOrderNumber || order.atdOrderId || "-";
  const orderNumber = order.orderNumber || order._id || order.id;
  const customerName = order.consumerData?.name || order.customer?.name || "Customer";
  const customerEmail = order.consumerData?.email || order.customer?.email || "-";
  const customerPhone = order.consumerData?.phone || order.customer?.phone || "-";

  // Address
  const shippingAddress = order.consumerData?.shippingAddress || order.shippingAddress || {};
  const formattedAddress = [
    shippingAddress.address1 || shippingAddress.address,
    shippingAddress.city,
    shippingAddress.state ? `${shippingAddress.state} ${shippingAddress.postalCode || shippingAddress.pincode || ""}` : "",
    shippingAddress.country,
  ]
    .filter(Boolean)
    .join(", ");

  // Order Items
  const items = order.lineItems || order.items || [];

  // Financials
  const breakdown = order.orderBreakdown || order.pricing || {};
  const grandTotal =
    breakdown.grandTotal ??
    order.amount ??
    breakdown.subtotal ??
    0;

  const dateFormatted = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })
    : "-";

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back Link */}
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
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {atdOrderNumber !== "-" ? atdOrderNumber : orderNumber}
                </h1>
                <StatusBadge status={order.status || order.orderStatus} />
                {order.fillKill && (
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
                    {order.fillKill}
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                {orderNumber && atdOrderNumber !== orderNumber && (
                  <span>Order Ref: <strong className="text-gray-700">{orderNumber}</strong></span>
                )}
                <span>Placed: {dateFormatted}</span>
                {order.customerPONumber && (
                  <span>Customer PO: <strong className="text-gray-700">{order.customerPONumber}</strong></span>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-medium text-gray-400">Order Total</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatCurrency(grandTotal)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT COLUMN: Customer + Items + Shipping */}
          <div className="space-y-6 xl:col-span-2">
            {/* Customer Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={User}
                title="Customer Information"
                description="Consumer / buyer details"
              />

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-600">
                  {getInitials(customerName)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{customerName}</h3>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InfoRow label="Email" value={customerEmail} icon={Mail} />
                    <InfoRow label="Phone" value={customerPhone} icon={Phone} />
                  </div>
                </div>
              </div>

              {order.customerComment && (
                <div className="mt-4 rounded-xl bg-blue-50/50 border border-blue-100 p-3 text-xs text-blue-900">
                  <strong>Customer Note:</strong> {order.customerComment}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6">
                <SectionHeader
                  icon={Package}
                  title="Line Items"
                  description={`${items.length} ${items.length === 1 ? "product" : "products"} in this order`}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-y border-gray-100 bg-gray-50/70 text-left">
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Item / ATD Product
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Line #
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
                    {items.length > 0 ? (
                      items.map((item, index) => {
                        const lineNum = item.cartLineNumber || index + 1;
                        const productCode = item.ATDProductNumber || "N/A";
                        const productName = item.name || `Product #${productCode}`;
                        const qty = item.quantity || 1;
                        const price = item.price || (breakdown.subtotal ? breakdown.subtotal / qty : grandTotal / qty);
                        const total = item.total || price * qty;

                        return (
                          <tr key={index} className="border-b border-gray-100 last:border-0">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                                  <Package size={17} />
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-gray-900">
                                    {productName}
                                  </span>
                                  <p className="text-xs text-gray-400">
                                    ATD Prod #: <strong className="text-gray-600">{productCode}</strong>
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-500">
                              #{lineNum}
                            </td>

                            <td className="px-5 py-4 text-center text-sm font-medium text-gray-900">
                              {qty}
                            </td>

                            <td className="px-5 py-4 text-right text-sm text-gray-700">
                              {formatCurrency(price)}
                            </td>

                            <td className="px-5 py-4 text-right text-sm font-semibold text-gray-900">
                              {formatCurrency(total)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-5 py-6 text-center text-sm text-gray-400">
                          No items listed for this order.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delivery & Shipping Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={MapPin}
                title="Delivery & Shipping Information"
                description="Shipping method and delivery destination"
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Shipping Address
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{customerName}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {formattedAddress || "No shipping address specified"}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Shipping Logistics
                  </p>
                  <InfoRow label="Method" value={order.shippingMethod?.replace(/_/g, " ")} />
                  <InfoRow label="Signature Required" value={order.signatureRequired} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Breakdown & Payment info */}
          <div className="space-y-6">
            {/* Order Summary / Pricing Breakdown */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={CreditCard}
                title="Order Breakdown"
                description="Pricing and fee details"
              />

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(breakdown.subtotal ?? grandTotal)}
                  </span>
                </div>

                {breakdown.shippingFee != null && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Shipping Fee</span>
                    <span className="font-medium text-gray-900">
                      {breakdown.shippingFee === 0 ? "Free" : formatCurrency(breakdown.shippingFee)}
                    </span>
                  </div>
                )}

                {breakdown.tax != null && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(breakdown.tax)}
                    </span>
                  </div>
                )}

                {breakdown.dealerMarkup != null && breakdown.dealerMarkup > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Dealer Markup</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(breakdown.dealerMarkup)}
                    </span>
                  </div>
                )}

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Grand Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={ShieldCheck}
                title="Payment Information"
                description="Gateway and transaction details"
              />

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-400">Payment Status</p>
                  <div className="mt-1.5">
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                <InfoRow
                  label="Payment Gateway"
                  value={order.paymentGateway || order.payment?.method || "STRIPE"}
                />

                {order.stripePaymentIntentId && (
                  <InfoRow
                    label="Stripe Payment Intent"
                    value={order.stripePaymentIntentId}
                  />
                )}
              </div>
            </div>

            {/* ATD & Reference Info */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={FileText}
                title="Reference Numbers"
                description="System identifiers"
              />

              <div className="mt-6 space-y-4">
                <InfoRow label="ATD Order Number" value={atdOrderNumber} />
                <InfoRow label="Internal Order #" value={orderNumber} />
                {order.customerPONumber && (
                  <InfoRow label="Customer PO #" value={order.customerPONumber} />
                )}
                {order.consumerPONumber && (
                  <InfoRow label="Consumer PO #" value={order.consumerPONumber} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
