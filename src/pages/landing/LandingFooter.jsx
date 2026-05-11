import { Link } from 'react-router-dom'

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">
            Astra<span className="text-cyan-400">Campus</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-slate-500">Academic operations stack for modern Indian institutions — demo SaaS experience.</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-slate-400">
          <Link to="/role" className="hover:text-white">
            Portals
          </Link>
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
        <div className="flex gap-3 text-slate-400">
          <a href="https://twitter.com" className="rounded-lg p-2 hover:bg-white/5 hover:text-white" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="https://github.com" className="rounded-lg p-2 hover:bg-white/5 hover:text-white" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="https://linkedin.com" className="rounded-lg p-2 hover:bg-white/5 hover:text-white" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-slate-600">© {new Date().getFullYear()} AstraCampus demo. Built for portfolio & MCA showcase.</p>
    </footer>
  )
}
