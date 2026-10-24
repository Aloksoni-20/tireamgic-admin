
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const LOGO_URL = "/src/assets/Tire magician.JPG-B-oH-vuV.jpg";
const BRAND_BLUE = "#006EFB";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Frontend demo navigation only; no credentials are verified.
    if (rememberMe) {
      sessionStorage.setItem("Tiremagic_demo_login", "true");
    } else {
      sessionStorage.removeItem("Tiremagic_demo_login");
    }

    navigate("/admin", { replace: true });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#006EFB]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2">
        {/* Desktop branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#006EFB] p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/15" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/15" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

          {/* Logo and brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
              <img
                src={LOGO_URL}
                alt="Tiremagic logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Tiremagic
              </h1>
              <p className="text-sm text-white/80">
                Administration Portal
              </p>
            </div>
          </div>

          {/* Branding content */}
          <div className="relative z-10 my-12">
            {/* <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <ShieldCheck size={28} className="text-white" />
            </div> */}

            {/* <h2 className="max-w-sm text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Your business.
              <span className="mt-2 block text-white/80">
                Under control.
              </span>
            </h2> */}

            <p className="mt-6 max-w-sm text-base leading-7 text-white/80">
              Manage orders, installer partners, and affiliate partners
              from one centralized workspace.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Centralized order management",
                "Installer and affiliate administration",
                "A streamlined workspace",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    ✓
                  </span>
                  <span className="text-sm text-white/95">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/70">
            © {new Date().getFullYear()} Tiremagic. All rights reserved.
          </p>
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white p-1.5">
                <img
                  src={LOGO_URL}
                  alt="Tiremagic logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Tiremagic
                </h1>
                <p className="text-xs text-slate-500">
                  Administration Portal
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#006EFB]/10 px-3 py-1.5 text-xs font-semibold text-[#006EFB]">
                <LockKeyhole size={14} />
                Administrator access
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your admin dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="admin@Tiremagic.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#006EFB] focus:ring-4 focus:ring-[#006EFB]/10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#006EFB] transition hover:text-[#0059D6]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#006EFB] focus:ring-4 focus:ring-[#006EFB]/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#006EFB]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-[#006EFB]"
                />

                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              {/* Validation message */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#006EFB] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0059D6] focus:outline-none focus:ring-4 focus:ring-[#006EFB]/20"
              >
                Sign in to dashboard
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">
                Authorized personnel only
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-xs leading-5 text-slate-500">
              This portal is intended for authorized Tiremagic administrators.
            </p>

            <p className="mt-8 text-center text-xs text-slate-400 lg:hidden">
              © {new Date().getFullYear()} Tiremagic
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
