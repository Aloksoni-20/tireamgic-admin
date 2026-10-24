import {
  ArrowDownRight,
  ArrowUpRight,
  IndianRupee,
  ShoppingCart,
  Users,
} from "lucide-react";
import AdminLayout from "../components/layout/AdminLayout";

const stats = [
  {
    title: "Total Partners",
    value: "124",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "1,248",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Total Revenue",
    value: "₹4.28L",
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
    date: "09 Oct 2026",
  },
  {
    id: "#TM-10044",
    partner: "XYZ Motors",
    customer: "Amit Patel",
    amount: "₹12,200",
    date: "09 Oct 2026",
  },
  {
    id: "#TM-10043",
    partner: "Speed Tyres",
    customer: "Vikas Jain",
    amount: "₹18,750",
    date: "08 Oct 2026",
  },
  {
    id: "#TM-10042",
    partner: "Auto Wheels",
    customer: "Mohit Singh",
    amount: "₹9,800",
    date: "08 Oct 2026",
  },
  {
    id: "#TM-10041",
    partner: "Prime Tyres",
    customer: "Rohit Verma",
    amount: "₹15,400",
    date: "07 Oct 2026",
  },
];

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
            Welcome back. Here's what's happening with TireMagic today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isDown = stat.trend === "down";

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

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
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
                  Latest orders from your partners
                </p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
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
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/60"
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