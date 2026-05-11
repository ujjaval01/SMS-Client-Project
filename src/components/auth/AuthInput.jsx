export function AuthInput({ label, value, onChange, type = 'text' }) {
  return (
    <label className="mb-3 block text-sm">
      <span className="mb-1 block text-slate-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2 outline-none focus:border-cyan-400"
      />
    </label>
  )
}
