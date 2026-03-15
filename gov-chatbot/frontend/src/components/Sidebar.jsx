import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MessageSquare, AlertTriangle, Home, Building2, X } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/chat', icon: MessageSquare, label: 'AI Assistant' },
  { to: '/report', icon: AlertTriangle, label: 'Report Issue' },
]

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 40,
            display: 'none'
          }}
          className="mobile-overlay"
        />
      )}

      <aside style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        width: 'var(--sidebar-width)',
        background: 'rgba(5, 13, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        padding: '24px 16px',
        transition: 'transform 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '0 8px' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #1a6cf6, #00d4ff)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Building2 size={20} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f4ff', lineHeight: 1.2 }}>Smart City</div>
            <div style={{ fontSize: 11, color: '#8ba3c7' }}>Gov Assistant</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#8ba3c7', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: 8 }}>
            Navigation
          </div>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? '#fff' : '#8ba3c7',
                background: isActive ? 'rgba(26, 108, 246, 0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(26, 108, 246, 0.3)' : '1px solid transparent',
                transition: 'all 0.2s',
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '16px 12px',
          borderRadius: 12,
          background: 'rgba(26, 108, 246, 0.1)',
          border: '1px solid rgba(26, 108, 246, 0.2)',
          fontSize: 12,
          color: '#8ba3c7',
          lineHeight: 1.5
        }}>
          <div style={{ fontWeight: 600, color: '#f0f4ff', marginBottom: 4 }}>Powered by AI</div>
          Available 24/7 to assist citizens with government services.
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          aside { transform: translateX(${isOpen ? '0' : '-100%'}); width: 260px !important; }
          .mobile-overlay { display: block !important; }
        }
      `}</style>
    </>
  )
}
