
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";

import InstallerPartners from "./pages/installers/InstallerPartners";
import InstallerDetails from "./pages/installers/InstallerDetails";

import AffiliatePartners from "./pages/affiliates/AffiliatePartners";
import AffiliateDetails from "./pages/affiliates/AffiliateDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Dashboard */}
        <Route path="/admin" element={<Dashboard />} />

        {/* Orders */}
        <Route path="/admin/orders" element={<Orders />} />
        <Route
          path="/admin/orders/:id"
          element={<OrderDetails />}
        />

        {/* Installer Partners */}
        <Route
          path="/admin/partners/installers"
          element={<InstallerPartners />}
        />
        <Route
          path="/admin/partners/installers/:id"
          element={<InstallerDetails />}
        />

        {/* Affiliate Partners */}
        <Route
          path="/admin/partners/affiliates"
          element={<AffiliatePartners />}
        />
        <Route
          path="/admin/partners/affiliates/:id"
          element={<AffiliateDetails />}
        />

        {/* Not found */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900">
                  404
                </h1>
                <p className="mt-2 text-slate-500">
                  This page could not be found.
                </p>
                <a
                  href="/login"
                  className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Back to Login
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
