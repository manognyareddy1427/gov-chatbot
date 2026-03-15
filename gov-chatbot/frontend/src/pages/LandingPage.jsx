import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, AlertTriangle, Shield, Zap, Clock, Users, Building2, ChevronRight } from 'lucide-react'

const features = [
  { icon: Zap, title: 'Instant Answers', desc: 'Get real-time responses about permits, licenses, and city services.' },
  { icon: Clock, title: '24/7 Available', desc: 'Access government information any time, day or night.' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your data is protected with enterprise-grade security.' },
  { icon: Users, title: 'Citizen First', desc: 'Designed to make government services accessible to everyone.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,108,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(5,13,26,0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38,
            background: 'linear-gradient(135deg, #1a6cf6, #00d4ff)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Building2 size={22} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Smart City Gov</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: 14 }} onClick={() => navigate('/report')}>
            Report Issue
          </button>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 14 }} onClick={() => navigate('/chat')}>
            Ask AI
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(26,108,246,0.15)', border: '1px solid rgba(26,108,246,0.3)',
          borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#4d8ef8',
          marginBottom: 28, fontWeight: 500
        }}>
          <Zap size={14} /> Powered by Amazon Bedrock AI
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
          <span className="gradient-text">Smart City AI</span>
          <br />Citizen Assistant
        </h1>

        <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
          Your intelligent gateway to government services. Ask questions, report issues, and get instant help — all powered by AI.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }} onClick={() => navigate('/chat')}>
            <MessageSquare size={18} /> Ask AI Assistant
          </button>
          <button className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }} onClick={() => navigate('/report')}>
            <AlertTriangle size={18} /> Report Civic Issue
          </button>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 48px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 48 }}>
          Why use Smart City Assistant?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20
        }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass" style={{ padding: 28, transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, marginBottom: 16,
                background: 'linear-gradient(135deg, rgba(26,108,246,0.3), rgba(0,212,255,0.2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(26,108,246,0.3)'
              }}>
                <Icon size={22} color="#4d8ef8" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '40px 48px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(26,108,246,0.2), rgba(0,212,255,0.1))',
          border: '1px solid rgba(26,108,246,0.3)',
          borderRadius: 24, padding: '48px 40px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to get started?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 15 }}>
            Join thousands of citizens already using Smart City AI.
          </p>
          <button className="btn-primary" style={{ fontSize: 16, padding: '14px 36px' }} onClick={() => navigate('/chat')}>
            Start Chatting <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}
