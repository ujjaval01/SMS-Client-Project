import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react'
import { card } from '../../lib/ui'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your AI Academic Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let botContent = "I'm not sure about that. Could you rephrase?"
      const msg = input.toLowerCase()
      
      if (msg.includes('fee')) botContent = "You can view your fee status in the 'Fees' section. We've recently added a verification workflow for all payments."
      else if (msg.includes('attendance')) botContent = "Your current attendance is 88%. You need to maintain 75% to be eligible for exams."
      else if (msg.includes('exam')) botContent = "End-semester exams are scheduled to start from June 15th, 2026."
      else if (msg.includes('assignment')) botContent = "You have 2 pending assignments. The Compiler Design report is due in 4 days."
      else if (msg.includes('hello') || msg.includes('hi')) botContent = "Hi there! I can help you with timetable, results, fees, or general campus info."
      
      setMessages(prev => [...prev, { role: 'bot', content: botContent }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`${card} mb-4 flex h-[500px] w-[350px] flex-col p-0 shadow-2xl backdrop-blur-2xl border-white/10`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-4 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-cyan-500/20 p-1.5 text-cyan-400">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Campus AI</h3>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                      m.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-cyan-400'
                    }`}>
                      {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 text-sm ${
                      m.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-white/5 text-slate-200 rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-cyan-400">
                      <Bot size={12} />
                    </div>
                    <div className="rounded-2xl bg-white/5 px-4 py-2 rounded-tl-none">
                      <div className="flex gap-1">
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-white/5 p-4">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-cyan-600 p-1.5 text-white transition hover:bg-cyan-500 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-xl shadow-cyan-900/20"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  )
}
