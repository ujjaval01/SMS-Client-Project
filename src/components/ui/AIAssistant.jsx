import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import { useAppStore } from '../../stores/useAppStore'

const REPLIES = [
  'Your next assignment deadline is highlighted on the student dashboard.',
  'Attendance policy: maintain 75% minimum for end-semester eligibility.',
  'Fee payments for Monsoon term can be tracked under Admin → Fees.',
  'Teachers can publish announcements from the Teacher portal → Announcements.',
]

export function AIAssistant() {
  const session = useAppStore((s) => s.session)
  const aiOpen = useAppStore((s) => s.aiOpen)
  const setAiOpen = useAppStore((s) => s.setAiOpen)
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! I am Astra Assistant. Ask about schedules, fees, or assignments (demo).' }])
  const [input, setInput] = useState('')

  if (!session) return null

  const send = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input.trim() }
    const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)]
    setMessages((m) => [...m, userMsg, { role: 'assistant', text: reply }])
    setInput('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAiOpen(!aiOpen)}
        className="fixed bottom-5 left-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 transition hover:scale-105"
        aria-label="Open assistant"
      >
        <MessageCircle size={26} />
      </button>
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-5 z-[80] flex h-[min(420px,70vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-950/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <span className="text-sm font-semibold">Astra Assistant</span>
              <button type="button" onClick={() => setAiOpen(false)} className="rounded-lg p-1 hover:bg-slate-800" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-2 overflow-auto p-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[90%] rounded-xl px-3 py-2 ${
                    msg.role === 'user' ? 'ml-auto bg-indigo-600/40 text-slate-100' : 'bg-slate-800/80 text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-800 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask something…"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm outline-none"
              />
              <button type="button" onClick={send} className="rounded-lg bg-cyan-600 px-3 text-white">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
