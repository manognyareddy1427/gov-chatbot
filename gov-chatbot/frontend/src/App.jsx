import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import LandingPage from './pages/LandingPage'
import ChatbotPage from './pages/ChatbotPage'
import ReportIssuePage from './pages/ReportIssuePage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {!isLanding && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div style={{
        flex: 1,
        marginLeft: !isLanding ? 'var(--sidebar-width)' : 0,
        transition: 'margin 0.3s ease',
        minHeight: '100vh'
      }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatbotPage onMenuClick={() => setSidebarOpen(true)} />} />
          <Route path="/report" element={<ReportIssuePage onMenuClick={() => setSidebarOpen(true)} />} />
        </Routes>
      </div>
    </div>
  )
}
