import { Bell, Search, UserCircle } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
        <Search size={18} className="text-slate-500" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-slate-600" />
        <UserCircle className="text-slate-600" size={28} />
      </div>
    </header>
  );
}