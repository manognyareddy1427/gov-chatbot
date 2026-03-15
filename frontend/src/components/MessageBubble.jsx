import React from 'react'
import { Building2, User, Volume2, VolumeX } from 'lucide-react'

/** Animated sound-wave bars shown while speaking */
function SoundWave() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, marginLeft: 6, verticalAlign: 'middle' }}>
      {[1, 2, 3, 4, 3].map((h, i) => (
        <span key={i} style={{
          display: 'inline-block',
          width: 3, borderRadius: 99,
          background: 'linear-gradient(180deg, #60a5fa, #22d3ee)',
          height: h * 4,
          animation: `wavebar .8s ease-in-out ${i * .1}s infinite alternate`
        }} />
      ))}
      <style>{`
        @keyframes wavebar {
          from { transform: scaleY(.4); opacity:.6; }
          to   { transform: scaleY(1.6); opacity:1; }
        }
      `}</style>
    </span>
  )
}

export default function MessageBubble({ message, onSpeak, onStop, isSpeaking }) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex',
      flexDirection: isUser ? 'row-reverse' : 'row',
      gap: 10, alignItems: 'flex-end',
      animation: 'messageIn .3s cubic-bezier(.22,1,.36,1) both'
    }}>
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isUser
          ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
          : 'linear-gradient(135deg, #2563eb, #06b6d4)',
        boxShadow: isUser ? '0 2px 12px rgba(59,130,246,.4)' : '0 2px 12px rgba(6,182,212,.3)',
        border: '2px solid rgba(255,255,255,.1)'
      }}>
        {isUser ? <User size={14} color="#fff" /> : <Building2 size={14} color="#fff" />}
      </div>

      {/* Bubble */}
      <div style={{ maxWidth: '72%' }}>
        <div style={{
          padding: '12px 16px',
          borderRadius: isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
          background: isUser
            ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
            : 'rgba(255,255,255,.05)',
          border: isUser ? 'none' : '1px solid rgba(255,255,255,.08)',
          fontSize: 14, lineHeight: 1.65, color: '#f1f5f9',
          boxShadow: isUser ? '0 4px 20px rgba(37,99,235,.3)' : '0 2px 8px rgba(0,0,0,.2)',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          position: 'relative',
          // Subtle glow when speaking
          ...(isSpeaking ? { boxShadow: '0 0 0 2px rgba(34,211,238,.35), 0 4px 24px rgba(6,182,212,.2)' } : {})
        }}>
          {message.content}
          {isSpeaking && <SoundWave />}
        </div>

        {/* Footer row: timestamp + speak button (AI only) */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 5,
          flexDirection: isUser ? 'row-reverse' : 'row', paddingInline: 2
        }}>
          <span style={{ fontSize: 11, color: '#334155' }}>{message.timestamp}</span>

          {!isUser && (
            <button
              onClick={isSpeaking ? onStop : () => onSpeak(message.content)}
              title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: isSpeaking ? 'rgba(34,211,238,.12)' : 'rgba(255,255,255,.06)',
                border: `1px solid ${isSpeaking ? 'rgba(34,211,238,.3)' : 'rgba(255,255,255,.1)'}`,
                borderRadius: 6, padding: '3px 8px', cursor: 'pointer',
                color: isSpeaking ? '#22d3ee' : '#64748b',
                fontSize: 11, fontWeight: 500, fontFamily: 'inherit',
                transition: 'all .2s'
              }}
              onMouseEnter={e => { if (!isSpeaking) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)' } }}
              onMouseLeave={e => { if (!isSpeaking) { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)' } }}
            >
              {isSpeaking
                ? <><VolumeX size={11} /> Stop</>
                : <><Volume2 size={11} /> Speak</>
              }
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
