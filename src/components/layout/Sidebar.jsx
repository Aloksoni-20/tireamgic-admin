import { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainMenuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
];

const partnerMenuItems = [
  {
    label: "Installer Partners",
    path: "/admin/partners/installers",
    icon: Wrench,
  },
  {
    label: "Affiliate Partners",
    path: "/admin/partners/affiliates",
    icon: Users,
  },
];

function Sidebar({ mobileOpen, onClose }) {
  const [partnersOpen, setPartnersOpen] = useState(true);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
    <img
      src="/src/assets/Tire Magician.JPG-B-oH-vuV.jpg"
      alt="TireMagic Logo"
      className="h-full w-full object-contain"
    />
  </div>

  <div>
    <h1 className="text-lg font-bold tracking-tight text-slate-900">
      TireMagic
    </h1>

    <p className="text-xs text-slate-500">
      Admin Panel
    </p>
  </div>
</div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {/* Main Menu */}
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium transition-all
                    ${isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                    `
                  }
                >
                  <Icon size={19} strokeWidth={1.9} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Partners */}
          <div className="mt-7">
            <button
              type="button"
              onClick={() =>
                setPartnersOpen((value) => !value)
              }
              className="flex w-full items-center justify-between px-3 py-2"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Partners
              </span>

              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform ${partnersOpen
                    ? "rotate-0"
                    : "-rotate-90"
                  }`}
              />
            </button>

            <div
              className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${partnersOpen
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
                }`}
            >
              {partnerMenuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-3 rounded-xl px-3 py-3
                      text-sm font-medium transition-all
                      ${isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }
                      `
                    }
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.9}
                    />

                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Admin Profile */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
              AD
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                Admin User
              </p>

              <p className="truncate text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;