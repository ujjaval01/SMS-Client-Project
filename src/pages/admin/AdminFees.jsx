import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'
import { useAppStore } from '../../stores/useAppStore'
import { Check, X, Search, Clock, ShieldCheck, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function AdminFees({ db }) {
  const verifyFee = useAppStore((s) => s.verifyFee)
  const toast = useAppStore((s) => s.toast)
  const [filter, setFilter] = useState('')

  const handleVerify = (id, status) => {
    verifyFee(id, status)
    toast(status === 'Verified' ? 'Payment verified successfully!' : 'Payment marked as rejected', 
      status === 'Verified' ? 'success' : 'error')
  }

  const filteredFees = db.fees.filter(f => 
    f.studentId.toLowerCase().includes(filter.toLowerCase()) ||
    f.term.toLowerCase().includes(filter.toLowerCase())
  )

  const pendingCount = db.fees.filter(f => f.verificationStatus === 'Pending Verification').length

  return (
    <Panel>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className={`${card} border-l-4 border-cyan-500`}>
          <p className="text-sm text-slate-400">Total Expected</p>
          <h3 className="text-2xl font-bold text-white">₹{db.fees.reduce((acc, f) => acc + f.total, 0).toLocaleString()}</h3>
        </div>
        <div className={`${card} border-l-4 border-emerald-500`}>
          <p className="text-sm text-slate-400">Total Collected</p>
          <h3 className="text-2xl font-bold text-emerald-400">₹{db.fees.reduce((acc, f) => acc + f.paid, 0).toLocaleString()}</h3>
        </div>
        <div className={`${card} border-l-4 border-amber-500`}>
          <p className="text-sm text-slate-400">Pending Verification</p>
          <h3 className="text-2xl font-bold text-amber-400">{pendingCount} Requests</h3>
        </div>
      </div>

      <div className={card}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white">Fee Management Ledger</h3>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search by ID or Term..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-400">
                <th className="pb-4 font-medium">Student ID</th>
                <th className="pb-4 font-medium">Term</th>
                <th className="pb-4 font-medium text-right">Total (₹)</th>
                <th className="pb-4 font-medium text-right">Paid (₹)</th>
                <th className="pb-4 font-medium">Payment Status</th>
                <th className="pb-4 font-medium">Verification</th>
                <th className="pb-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredFees.map((f) => (
                  <motion.tr 
                    key={f.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-4 font-medium text-white">{f.studentId}</td>
                    <td className="py-4 text-slate-300">{f.term}</td>
                    <td className="py-4 text-right font-mono text-slate-300">{f.total.toLocaleString()}</td>
                    <td className="py-4 text-right font-mono font-semibold text-emerald-400">{f.paid.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        f.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 
                        f.status === 'Partial' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="py-4">
                      {f.verificationStatus === 'Verified' ? (
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <ShieldCheck size={16} /> Verified
                        </span>
                      ) : f.verificationStatus === 'Pending Verification' ? (
                        <span className="flex items-center gap-1.5 text-amber-400 animate-pulse">
                          <Clock size={16} /> Pending
                        </span>
                      ) : f.verificationStatus === 'Rejected' ? (
                        <span className="flex items-center gap-1.5 text-rose-400">
                          <AlertCircle size={16} /> Rejected
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        {f.verificationStatus === 'Pending Verification' && (
                          <>
                            <button 
                              onClick={() => handleVerify(f.id, 'Verified')}
                              className="rounded-lg bg-emerald-500/20 p-1.5 text-emerald-400 transition hover:bg-emerald-500/30"
                              title="Approve Payment"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              onClick={() => handleVerify(f.id, 'Rejected')}
                              className="rounded-lg bg-rose-500/20 p-1.5 text-rose-400 transition hover:bg-rose-500/30"
                              title="Reject Payment"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  )
}
