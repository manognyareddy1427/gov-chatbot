import React from 'react'
import { Building2, User } from 'lucide-react'

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
      animation: 'fadeInUp 0.3s ease forwards',
      padding: '4px 0'
    }}>
      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isUser
          ? 'linear-gradient(135deg, #4d8ef8, #1a6cf6)'
          : 'linear-gradient(135deg, #1a6cf6, #00d4ff)',
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        {isUser ? <User size={16} color="white" /> : <Building2 size={16} color="white" />}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
        background: isUser
          ? 'linear-gradient(135deg, #1a6cf6, #0f4fc4)'
          : 'rgba(255, 255, 255, 0.06)',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
        fontSize: 14,
        lineHeight: 1.6,
        color: '#f0f4ff',
        backdropFilter: isUser ? 'none' : 'blur(8px)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        {message.content}
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6, textAlign: isUser ? 'right' : 'left' }}>
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}
