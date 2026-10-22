import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  IndianRupee,
  ShoppingCart,
  Users,
} from "lucide-react";
import AdminLayout from "../components/layout/AdminLayout";

const stats = [
  {
    title: "Total Partners",
    value: "124",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+18.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Total Revenue",
    value: "₹4.28L",
    change: "+21.4%",
    trend: "up",
    icon: IndianRupee,
  },
];

const recentOrders = [
  {
    id: "#TM-10045",
    partner: "ABC Tyres",
    customer: "Rahul Sharma",
    amount: "₹24,500",
    status: "Processing",
    date: "09 Oct 2026",
  },
  {
    id: "#TM-10044",
    partner: "XYZ Motors",
    customer: "Amit Patel",
    amount: "₹12,200",
    status: "Completed",
    date: "09 Oct 2026",
  },
  {
    id: "#TM-10043",
    partner: "Speed Tyres",
    customer: "Vikas Jain",
    amount: "₹18,750",
    status: "Pending",
    date: "08 Oct 2026",
  },
  {
    id: "#TM-10042",
    partner: "Auto Wheels",
    customer: "Mohit Singh",
    amount: "₹9,800",
    status: "Delivered",
    date: "08 Oct 2026",
  },
  {
    id: "#TM-10041",
    partner: "Prime Tyres",
    customer: "Rohit Verma",
    amount: "₹15,400",
    status: "Processing",
    date: "07 Oct 2026",
  },
];

function getStatusClasses(status) {
  const classes = {
    Processing: "bg-blue-50 text-blue-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Delivered: "bg-purple-50 text-purple-700",
  };

  return classes[status] || "bg-slate-100 text-slate-700";
}

function Dashboard() {
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
            Welcome back. Here's what's happening with TyreMagic today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isDown = stat.trend === "down";

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
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

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon size={21} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      isDown
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {isDown ? (
                      <ArrowDownRight size={15} />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}

                    {stat.change}
                  </span>

                  <span className="text-xs text-slate-400">
                    vs last month
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent Orders
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest orders from your partners
                </p>
              </div>

              <button
                type="button"
                className="w-fit text-sm font-semibold text-slate-900 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Order
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Partner
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {order.id}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {order.date}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {order.partner}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {order.customer}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {order.amount}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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