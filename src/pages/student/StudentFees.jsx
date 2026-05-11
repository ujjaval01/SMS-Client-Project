import { useState } from 'react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'
import { useAppStore } from '../../stores/useAppStore'
import { CheckCircle2, Clock, CreditCard, IndianRupee, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function StudentFees({ studentId, db }) {
  const payFee = useAppStore((s) => s.payFee)
  const toast = useAppStore((s) => s.toast)
  const [amount, setAmount] = useState('')
  const [paying, setPaying] = useState(false)

  const myFees = db.fees.filter((f) => f.studentId === studentId)

  const handlePay = (e) => {
    e.preventDefault()
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast('Please enter a valid amount', 'error')
      return
    }

    setPaying(true)
    setTimeout(() => {
      payFee(studentId, Number(amount))
      toast(`Payment of ₹${amount} submitted for verification!`, 'success')
      setAmount('')
      setPaying(false)
    }, 1500)
  }

  return (
    <Panel>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Fee Status</h2>
          <div className="space-y-4">
            {myFees.map((fee) => (
              <motion.div
                key={fee.id}
                layout
                className={`${card} relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">{fee.term}</p>
                    <h3 className="mt-1 text-xl font-bold text-white">₹{fee.total.toLocaleString()}</h3>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    fee.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 
                    fee.status === 'Partial' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {fee.status}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] uppercase text-slate-500">Paid Amount</p>
                    <p className="text-lg font-semibold text-emerald-400">₹{fee.paid.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] uppercase text-slate-500">Remaining</p>
                    <p className="text-lg font-semibold text-rose-400">₹{(fee.total - fee.paid).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
                  {fee.verificationStatus === 'Verified' ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <ShieldCheck size={14} />
                      Verified by Administration
                    </div>
                  ) : fee.verificationStatus === 'Pending Verification' ? (
                    <div className="flex items-center gap-1.5 text-xs text-amber-400">
                      <Clock size={14} />
                      Verification in Progress
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500">No recent payments pending</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Make a Payment</h2>
          <div className={card}>
            <form onSubmit={handlePay} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">Amount to Pay (INR)</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                    <IndianRupee size={18} />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-cyan-500/5 p-4">
                <div className="flex items-center gap-3 text-sm text-cyan-400">
                  <CreditCard size={18} />
                  <span>Secure bank-grade encryption active</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={paying}
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {paying ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Processing...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Pay Now
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>

          <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-4 font-semibold text-white">Payment History</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Registration Fee</p>
                    <p className="text-xs text-slate-500">12 Feb 2026</p>
                  </div>
                </div>
                <p className="font-bold text-white">₹5,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
