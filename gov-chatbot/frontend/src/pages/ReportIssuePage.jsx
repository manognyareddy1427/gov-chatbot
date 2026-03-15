import React, { useState, useRef } from 'react'
import { Menu, Upload, CheckCircle, AlertTriangle, X, Building2 } from 'lucide-react'
import { submitReport } from '../api/chatApi'

const ISSUE_TYPES = [
  { value: 'pothole', label: '🕳️ Pothole' },
  { value: 'garbage', label: '🗑️ Garbage / Waste' },
  { value: 'streetlight', label: '💡 Broken Streetlight' },
  { value: 'graffiti', label: '🎨 Graffiti' },
  { value: 'flooding', label: '🌊 Flooding' },
  { value: 'other', label: '📋 Other' },
]

export default function ReportIssuePage({ onMenuClick }) {
  const [form, setForm] = useState({ issueType: '', description: '', location: '', name: '', email: '' })
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const fileRef = useRef(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.issueType || !form.description || !form.location) return
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (photo) fd.append('photo', photo)
      await submitReport(fd)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="glass" style={{ padding: 48, textAlign: 'center', maxWidth: 440, animation: 'fadeInUp 0.4s ease' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 24px',
            background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <CheckCircle size={36} color="#22c55e" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Report Submitted</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 28 }}>
            Thank you for helping improve our city. Your report has been received and will be reviewed within 24–48 hours.
          </p>
          <button className="btn-primary" onClick={() => { setStatus(null); setForm({ issueType: '', description: '', location: '', name: '', email: '' }); setPhoto(null); setPreview(null) }}>
            Submit Another Report
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={onMenuClick} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4, display: 'none' }} className="menu-btn">
          <Menu size={22} />
        </button>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AlertTriangle size={20} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Report a Civic Issue</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Help us improve your city</div>
        </div>
      </header>

      {/* Form */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Issue Type */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Issue Type *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              {ISSUE_TYPES.map(({ value, label }) => (
                <button key={value} type="button" onClick={() => setForm(f => ({ ...f, issueType: value }))}
                  style={{
                    padding: '12px 16px', borderRadius: 12, border: '1px solid',
                    borderColor: form.issueType === value ? '#1a6cf6' : 'rgba(255,255,255,0.1)',
                    background: form.issueType === value ? 'rgba(26,108,246,0.15)' : 'rgba(255,255,255,0.04)',
                    color: form.issueType === value ? '#4d8ef8' : 'var(--text-secondary)',
                    cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 0.2s', textAlign: 'left'
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Location / Address *
            </label>
            <input name="location" value={form.location} onChange={handleChange} required
              placeholder="e.g. 123 Main St, near the park" className="input-field" />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Description *
            </label>
            <textarea name="description" value={form.description} onChange={handleChange} required
              placeholder="Describe the issue in detail..." rows={4}
              className="input-field" style={{ resize: 'vertical', minHeight: 100 }} />
          </div>

          {/* Photo Upload */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Photo (optional)
            </label>
            {preview ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={preview} alt="preview" style={{ width: '100%', maxWidth: 320, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }} />
                <button type="button" onClick={() => { setPhoto(null); setPreview(null) }}
                  style={{
                    position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.7)',
                    border: 'none', borderRadius: '50%', width: 28, height: 28,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'white'
                  }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div onClick={() => fileRef.current?.click()}
                style={{
                  border: '2px dashed rgba(255,255,255,0.15)', borderRadius: 12,
                  padding: '32px 24px', textAlign: 'center', cursor: 'pointer',
                  transition: 'all 0.2s', color: 'var(--text-secondary)'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(26,108,246,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              >
                <Upload size={28} style={{ margin: '0 auto 10px', display: 'block', color: '#4d8ef8' }} />
                <div style={{ fontSize: 14, fontWeight: 500 }}>Click to upload photo</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>PNG, JPG up to 10MB · Stored in Amazon S3</div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
          </div>

          {/* Contact (optional) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name (optional)" className="input-field" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="For updates (optional)" className="input-field" />
            </div>
          </div>

          {status === 'error' && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: 14 }}>
              Something went wrong. Please try again.
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={status === 'loading' || !form.issueType || !form.description || !form.location}
            style={{ fontSize: 15, padding: '14px', justifyContent: 'center', opacity: (!form.issueType || !form.description || !form.location) ? 0.5 : 1 }}>
            {status === 'loading' ? 'Submitting...' : <><AlertTriangle size={18} /> Submit Report</>}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-btn { display: flex !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
