import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import LandingPage from './pages/LandingPage'
import ChatbotPage from './pages/ChatbotPage'
import ReportIssuePage from './pages/ReportIssuePage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {!isLanding && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <main style={{
        flex: 1,
        marginLeft: isLanding ? 0 : 'var(--sidebar-w)',
        transition: 'margin .3s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Routes>
          <Route path="/"       element={<LandingPage />} />
          <Route path="/chat"   element={<ChatbotPage   onMenu={() => setSidebarOpen(true)} />} />
          <Route path="/report" element={<ReportIssuePage onMenu={() => setSidebarOpen(true)} />} />
        </Routes>
      </main>
    </div>
  )
}
