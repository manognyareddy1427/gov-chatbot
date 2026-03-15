import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, AlertTriangle, Zap, Clock, Shield, Users, Building2, ChevronRight, ArrowRight } from 'lucide-react'
import ParticleBackground from '../components/ParticleBackground'

const features = [
  { icon: Zap,    title: 'Instant AI Answers',  desc: 'Real-time responses about permits, licenses, and city services powered by Amazon Bedrock.' },
  { icon: Clock,  title: '24/7 Available',       desc: 'Access government information any time — no hold music, no waiting rooms.' },
  { icon: Shield, title: 'Secure & Private',     desc: 'Enterprise-grade security. Your data stays protected at every step.' },
  { icon: Users,  title: 'Citizen First',        desc: 'Designed to make government services accessible and understandable for everyone.' },
]

const stats = [
  { value: '94K+',  label: 'Citizens Served' },
  { value: '12K+',  label: 'Issues Resolved' },
  { value: '< 2s',  label: 'Avg Response Time' },
  { value: '99.9%', label: 'Uptime' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />

      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-15%', left: '-8%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

      {/* ── Navbar ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 48px',
        background: 'rgba(3,7,18,.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563eb, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(37,99,235,.5)' }}>
            <Building2 size={20} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.02em' }}>Smart City Gov</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: 13 }} onClick={() => navigate('/report')}>Report Issue</button>
          <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: 13 }} onClick={() => navigate('/chat')}>Ask AI</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '110px 24px 80px', maxWidth: 820, margin: '0 auto' }}>
        <div className="badge badge-blue fade-up" style={{ marginBottom: 28, animationDelay: '.05s' }}>
          <Zap size={12} /> Powered by Amazon Bedrock AI
        </div>

        <h1 className="fade-up" style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.03em', marginBottom: 24, animationDelay: '.1s' }}>
          <span className="gradient-text">Smart City AI</span>
          <br />Citizen Assistant
        </h1>

        <p className="fade-up" style={{ fontSize: 18, color: '#64748b', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 48px', animationDelay: '.18s' }}>
          Your intelligent gateway to government services. Ask questions, report issues, and get instant help — all powered by AI.
        </p>

        <div className="fade-up" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', animationDelay: '.25s' }}>
          <button className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px' }} onClick={() => navigate('/chat')}>
            <MessageSquare size={17} /> Ask AI Assistant
          </button>
          <button className="btn btn-ghost" style={{ fontSize: 15, padding: '14px 32px' }} onClick={() => navigate('/report')}>
            <AlertTriangle size={17} /> Report Civic Issue
          </button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ position: 'relative', zIndex: 2, padding: '0 48px 80px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} className="glass fade-up" style={{ padding: '24px', textAlign: 'center', animationDelay: `${.1 * i}s` }}>
              <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-.02em', marginBottom: 4 }} className="gradient-text-blue">{value}</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ position: 'relative', zIndex: 2, padding: '0 48px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginBottom: 48 }}>
          Why use Smart City Assistant?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="glass fade-up" style={{ padding: 28, transition: 'all .25s', cursor: 'default', animationDelay: `${.08 * i}s` }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,.25)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 18, background: 'rgba(37,99,235,.12)', border: '1px solid rgba(59,130,246,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color="#60a5fa" />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: '-.01em' }}>{title}</h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', zIndex: 2, padding: '0 48px 100px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(37,99,235,.15) 0%, rgba(6,182,212,.08) 100%)', border: '1px solid rgba(59,130,246,.25)', borderRadius: 24, padding: '56px 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.02em', marginBottom: 12 }}>Ready to get started?</h2>
          <p style={{ color: '#64748b', marginBottom: 32, fontSize: 15 }}>Join thousands of citizens already using Smart City AI.</p>
          <button className="btn btn-primary" style={{ fontSize: 15, padding: '14px 36px' }} onClick={() => navigate('/chat')}>
            Start Chatting <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}
