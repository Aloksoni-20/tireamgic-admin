import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        

        <div className="md:hidden">
          <h2 className="text-base font-semibold text-slate-900">
            TyreMagic
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl p-1.5 pr-2 hover:bg-slate-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            AD
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-900">
              Admin
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown size={16} className="hidden text-slate-400 md:block" />
        </button>
      </div>
    </header>
  );
}

export default Header;