import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, MessageSquare, AlertTriangle, Building2, Wifi, X } from 'lucide-react'

const nav = [
  { to: '/',       icon: Home,          label: 'Home',         desc: 'Landing page' },
  { to: '/chat',   icon: MessageSquare, label: 'AI Assistant', desc: 'Chat with AI' },
  { to: '/report', icon: AlertTriangle, label: 'Report Issue', desc: 'Civic problems' },
]

const stats = [
  { label: 'Issues Resolved', value: '12,847' },
  { label: 'Citizens Helped', value: '94,210' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)',
        backdropFilter: 'blur(4px)', zIndex: 40,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .25s',
        display: 'none'
      }} className="mob-backdrop" />

      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 'var(--sidebar-w)',
        background: 'linear-gradient(180deg, #060f1e 0%, #030712 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        zIndex: 50, padding: '0',
        transition: 'transform .3s cubic-bezier(.22,1,.36,1)',
      }} className="sidebar">

        {/* Top glow line */}
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, #3b82f6, #22d3ee, transparent)'
        }} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 16px', overflow: 'hidden' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(37,99,235,.5)'
              }}>
                <Building2 size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-.01em', color: '#f1f5f9' }}>Smart City</div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Gov Assistant</div>
              </div>
            </div>
            <button onClick={onClose} className="mob-close" style={{
              background: 'none', border: 'none', color: '#64748b', cursor: 'pointer',
              padding: 4, display: 'none', borderRadius: 6
            }}>
              <X size={18} />
            </button>
          </div>

          {/* Online status */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 8,
            background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.15)',
            marginBottom: 24
          }}>
            <Wifi size={13} color="#22c55e" />
            <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>AI Online · 24/7 Active</span>
          </div>

          {/* Nav label */}
          <div style={{ fontSize: 10, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '.1em', padding: '0 4px', marginBottom: 8 }}>
            Menu
          </div>

          {/* Nav items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {nav.map(({ to, icon: Icon, label, desc }) => (
              <NavLink key={to} to={to} onClick={onClose} style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10,
                textDecoration: 'none', transition: 'all .2s',
                background: isActive ? 'rgba(37,99,235,.15)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(59,130,246,.3)' : 'transparent'}`,
                position: 'relative', overflow: 'hidden'
              })}>
                {({ isActive }) => (
                  <>
                    {isActive && <div style={{
                      position: 'absolute', left: 0, top: '20%', bottom: '20%',
                      width: 3, borderRadius: 99,
                      background: 'linear-gradient(180deg, #3b82f6, #22d3ee)'
                    }} />}
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isActive ? 'rgba(37,99,235,.25)' : 'rgba(255,255,255,.05)',
                      border: `1px solid ${isActive ? 'rgba(59,130,246,.4)' : 'rgba(255,255,255,.06)'}`,
                      transition: 'all .2s'
                    }}>
                      <Icon size={15} color={isActive ? '#60a5fa' : '#64748b'} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? '#f1f5f9' : '#94a3b8', lineHeight: 1.2 }}>{label}</div>
                      <div style={{ fontSize: 11, color: '#475569' }}>{desc}</div>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* Stats */}
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,.06)',
            background: 'rgba(255,255,255,.02)'
          }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.04)', fontSize: 10, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '.1em' }}>
              City Stats
            </div>
            {stats.map(({ label, value }) => (
              <div key={label} style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#64748b' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar { transform: translateX(${open ? '0' : '-100%'}); width: 268px !important; }
          .mob-backdrop { display: block !important; }
          .mob-close { display: flex !important; }
        }
      `}</style>
    </>
  )
}
