import React, { useState, useRef, useEffect } from 'react'
import { Send, Menu, Trash2, Building2, Sparkles, Volume2, VolumeX } from 'lucide-react'
import MessageBubble from '../components/MessageBubble'
import { sendMessage } from '../api/chatApi'
import useSpeech from '../hooks/useSpeech'

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

export default function ChatbotPage({ onMenu }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [speakingId, setSpeakingId] = useState(null) // index of currently speaking message

  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { speak, stop, speaking, supported } = useSpeech()

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // When speaking stops externally, clear the indicator
  useEffect(() => {
    if (!speaking) setSpeakingId(null)
  }, [speaking])

  const ts = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const handleSpeak = (text, idx) => {
    stop()
    setSpeakingId(idx)
    speak(text)
  }

  const handleStop = () => {
    stop()
    setSpeakingId(null)
  }

  const handleSend = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')

    const userMsg = { role: 'user', content: msg, timestamp: ts() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const data = await sendMessage(msg, history)
      const aiText = data.response || data.message || 'I received your message.'
      const aiMsg = { role: 'assistant', content: aiText, timestamp: ts() }

      setMessages(prev => {
        const next = [...prev, aiMsg]
        // Auto-speak the new AI message
        if (autoSpeak && supported) {
          setTimeout(() => {
            setSpeakingId(next.length - 1)
            speak(aiText)
          }, 100)
        }
        return next
      })
    } catch {
      const errMsg = { role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment.", timestamp: ts() }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const clearChat = () => {
    stop(); setSpeakingId(null)
    setMessages([WELCOME])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>

      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 20px', flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,.06)',
        background: 'rgba(3,7,18,.85)', backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={onMenu} className="mob-menu-btn" style={{
          background: 'none', border: 'none', color: '#64748b',
          cursor: 'pointer', padding: 4, display: 'none', borderRadius: 6
        }}>
          <Menu size={20} />
        </button>

        {/* AI avatar */}
        <div style={{
          width: 38, height: 38, borderRadius: 11, flexShrink: 0,
          background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: speaking ? '0 0 0 3px rgba(34,211,238,.35), 0 4px 16px rgba(6,182,212,.4)' : '0 4px 16px rgba(37,99,235,.4)',
          transition: 'box-shadow .3s'
        }}>
          <Building2 size={20} color="#fff" />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-.01em' }}>Smart City AI</div>
          <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 6px #22c55e', display: 'inline-block',
              animation: 'pulse 2s ease infinite'
            }} />
            <span style={{ color: '#22c55e', fontWeight: 600 }}>Online</span>
            {speaking && <span style={{ color: '#22d3ee', marginLeft: 4 }}>· Speaking…</span>}
          </div>
        </div>

        {/* Auto-speak toggle */}
        {supported && (
          <button
            onClick={() => { setAutoSpeak(a => !a); if (speaking) handleStop() }}
            title={autoSpeak ? 'Mute auto-speak' : 'Enable auto-speak'}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: autoSpeak ? 'rgba(34,211,238,.1)' : 'rgba(255,255,255,.05)',
              border: `1px solid ${autoSpeak ? 'rgba(34,211,238,.3)' : 'rgba(255,255,255,.1)'}`,
              borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
              color: autoSpeak ? '#22d3ee' : '#64748b',
              fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
              transition: 'all .2s'
            }}
          >
            {autoSpeak ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {autoSpeak ? 'Audio On' : 'Audio Off'}
          </button>
        )}

        <button onClick={clearChat} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
          color: '#64748b', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
          transition: 'all .2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)' }}
        >
          <Trash2 size={13} /> Clear
        </button>
      </header>

      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '24px 20px',
        display: 'flex', flexDirection: 'column', gap: 18
      }}>
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            isSpeaking={speakingId === i}
            onSpeak={(text) => handleSpeak(text, i)}
            onStop={handleStop}
          />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', animation: 'messageIn .3s ease both' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(6,182,212,.3)'
            }}>
              <Building2 size={14} color="#fff" />
            </div>
            <div style={{
              padding: '14px 18px', borderRadius: '4px 18px 18px 18px',
              background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)',
              display: 'flex', gap: 5, alignItems: 'center'
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  animation: `typingDot 1.2s ease ${i * .2}s infinite`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Suggestions ── */}
      {messages.length === 1 && (
        <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => handleSend(s)} style={{
              background: 'rgba(37,99,235,.08)', border: '1px solid rgba(59,130,246,.2)',
              color: '#60a5fa', borderRadius: 20, padding: '6px 14px',
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all .2s',
              display: 'flex', alignItems: 'center', gap: 5
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,.15)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,.2)' }}
            >
              <Sparkles size={11} /> {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <div style={{
        padding: '12px 20px 20px', flexShrink: 0,
        borderTop: '1px solid rgba(255,255,255,.06)',
        background: 'rgba(3,7,18,.85)', backdropFilter: 'blur(16px)'
      }}>
        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-end',
          background: 'rgba(255,255,255,.05)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 14, padding: '10px 14px',
          transition: 'border-color .2s, box-shadow .2s'
        }}
          onFocusCapture={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)' }}
          onBlurCapture={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about city services, permits, utilities…"
            rows={1}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: '#f1f5f9', fontSize: 14, fontFamily: 'inherit',
              resize: 'none', lineHeight: 1.55, maxHeight: 120, overflowY: 'auto'
            }}
            onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            style={{
              width: 36, height: 36, borderRadius: 10, border: 'none', flexShrink: 0,
              background: input.trim() && !loading
                ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                : 'rgba(255,255,255,.08)',
              color: '#fff', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .2s',
              boxShadow: input.trim() && !loading ? '0 4px 16px rgba(37,99,235,.4)' : 'none'
            }}
          >
            <Send size={15} />
          </button>
        </div>
        <p style={{ fontSize: 11, color: '#1e293b', textAlign: 'center', marginTop: 8 }}>
          Enter to send · Shift+Enter for new line
          {supported && <span style={{ color: '#1e3a5f' }}> · AI responses are read aloud automatically</span>}
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) { .mob-menu-btn { display: flex !important; } }
      `}</style>
    </div>
  )
}
