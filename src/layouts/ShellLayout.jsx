import { NavLink } from 'react-router-dom'
import { LogOut, MoonStar, Search, Sun } from 'lucide-react'
import { useAppStore } from '../stores/useAppStore'

export function ShellLayout({ title, navItems, basePath, session, theme, setTheme, logout, className, children }) {
  const setCommandOpen = useAppStore((s) => s.setCommandOpen)
  return (
    <div className={`mx-auto flex max-w-7xl gap-4 p-3 md:p-6 ${className}`}>
      <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] w-72 rounded-3xl p-4 md:block">
        <h3 className="mb-4 text-xl font-semibold">{title}</h3>
        {navItems.map(([path, Icon, label]) => (
          <NavLink
            key={path}
            to={`${basePath}/${path}`}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${isActive ? 'bg-indigo-500/30' : 'hover:bg-slate-800/40'}`
            }
          >
            <Icon size={16} /> {label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={logout}
          className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-rose-500/20"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>
      <section className="w-full">
        <header className="glass mb-4 flex items-center justify-between rounded-2xl px-4 py-3">
          <div>
            <h1 className="text-xl font-bold">Welcome, {session?.name}</h1>
            <p className="text-xs text-slate-400 capitalize">{session?.role} portal</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="rounded-xl bg-slate-900/50 p-2 text-slate-300 hover:text-white"
              title="Search (Ctrl+K)"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl bg-slate-900/50 p-2"
            >
              {theme === 'dark' ? <Sun size={18} /> : <MoonStar size={18} />}
            </button>
          </div>
        </header>
        {children}
      </section>
    </div>
  )
}
