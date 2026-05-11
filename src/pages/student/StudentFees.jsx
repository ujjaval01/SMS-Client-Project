import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function StudentFees({ studentId, db, toast }) {
  const myFees = db.fees?.filter(f => f.studentId === studentId) || []

  const handlePay = () => {
    toast('Redirecting to secure payment gateway...', 'default')
    setTimeout(() => {
       toast('Payment Mock Successful!', 'success')
    }, 2000)
  }

  return (
    <Panel>
      <div className="grid gap-6 md:grid-cols-2">
        <div className={card}>
           <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard className="text-indigo-400" /> Fee Summary
           </h3>
           <div className="space-y-4">
              {myFees.map(f => (
                <div key={f.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{f.term}</div>
                        <div className="text-xl font-bold">₹{f.amount}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${f.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                         {f.status}
                      </span>
                   </div>
                   <div className="flex justify-between text-sm mt-4 pt-4 border-t border-slate-800">
                      <span className="text-slate-400">Amount Paid</span>
                      <span className="font-bold text-emerald-400">₹{f.paid}</span>
                   </div>
                   <div className="flex justify-between text-sm mt-1">
                      <span className="text-slate-400">Remaining</span>
                      <span className="font-bold text-rose-400">₹{f.amount - f.paid}</span>
                   </div>
                   {f.status !== 'Paid' && (
                     <button onClick={handlePay} className={`${button} w-full mt-4 bg-indigo-600 hover:bg-indigo-500`}>
                        Pay Now
                     </button>
                   )}
                </div>
              ))}
              {myFees.length === 0 && (
                <div className="text-center py-8 text-slate-500 italic">No fee records found for your account.</div>
              )}
           </div>
        </div>

        <div className={card}>
           <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="text-amber-400" /> Payment History
           </h3>
           <div className="space-y-2">
              {myFees.filter(f => f.paid > 0).map(f => (
                <div key={f.id+'_hist'} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                   <div>
                      <div className="text-sm font-bold">Term Fee - {f.term}</div>
                      <div className="text-[10px] text-slate-500">Transaction ID: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                   </div>
                   <div className="text-emerald-400 font-bold">₹{f.paid}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </Panel>
  )
}
