import React, { useState, useRef, useEffect } from 'react'
import { Send, Menu, Trash2, Building2, Sparkles } from 'lucide-react'
import MessageBubble from '../components/MessageBubble'
import { sendMessage } from '../api/chatApi'

const WELCOME = {
  role: 'assistant',
  content: "Hello! I'm your Smart City AI Assistant. I can help you with:\n\n• Permit applications and status\n• Utility services and billing\n• Public transportation info\n• Local regulations and bylaws\n• City events and announcements\n\nHow can I assist you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const SUGGESTIONS = [
  'How do I apply for a building permit?',
  'What are the garbage collection days?',
  'How do I pay my water bill?',
  'Report a pothole on my street',
]

export default function ChatbotPage({ onMenuClick }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const handleSend = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')

    const userMsg = { role: 'user', content: msg, timestamp: timestamp() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const data = await sendMessage(msg, history)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || data.message || 'I received your message.',
        timestamp: timestamp()
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: timestamp()
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-dark)' }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(5,13,26,0.9)',
        backdropFilter: 'blur(10px)',
        flexShrink: 0
      }}>
        <button onClick={onMenuClick} style={{
          background: 'none', border: 'none', color: 'var(--text-secondary)',
          cursor: 'pointer', padding: 4, display: 'none'
        }} className="menu-btn">
          <Menu size={22} />
        </button>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #1a6cf6, #00d4ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Building2 size={20} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Smart City AI Assistant</div>
          <div style={{ fontSize: 12, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Online
          </div>
        </div>
        <button onClick={() => setMessages([WELCOME])} style={{
          marginLeft: 'auto', background: 'none', border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 12px',
          borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
          transition: 'all 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          <Trash2 size={14} /> Clear
        </button>
      </header>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}

        {/* Loading indicator */}
        {loading && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a6cf6, #00d4ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Building2 size={16} color="white" />
            </div>
            <div style={{
              padding: '14px 18px', borderRadius: '4px 18px 18px 18px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', gap: 6, alignItems: 'center'
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#4d8ef8',
                  animation: 'pulse 1.2s ease infinite',
                  animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions (shown when only welcome message) */}
      {messages.length === 1 && (
        <div style={{ padding: '0 24px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => handleSend(s)} style={{
              background: 'rgba(26,108,246,0.1)', border: '1px solid rgba(26,108,246,0.25)',
              color: '#4d8ef8', borderRadius: 20, padding: '6px 14px', fontSize: 13,
              cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,108,246,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,108,246,0.1)'}
            >
              <Sparkles size={12} /> {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '16px 24px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(5,13,26,0.9)',
        backdropFilter: 'blur(10px)',
        flexShrink: 0
      }}>
        <div style={{
          display: 'flex', gap: 12, alignItems: 'flex-end',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: '12px 16px',
          transition: 'border-color 0.2s'
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about city services, permits, utilities..."
            rows={1}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontSize: 14, fontFamily: 'Inter, sans-serif',
              resize: 'none', lineHeight: 1.5, maxHeight: 120, overflowY: 'auto'
            }}
            onInput={e => {
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            style={{
              width: 36, height: 36, borderRadius: 10, border: 'none',
              background: input.trim() && !loading
                ? 'linear-gradient(135deg, #1a6cf6, #0f4fc4)'
                : 'rgba(255,255,255,0.1)',
              color: 'white', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0
            }}
          >
            <Send size={16} />
          </button>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 10 }}>
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) { .menu-btn { display: flex !important; } }
      `}</style>
    </div>
  )
}
