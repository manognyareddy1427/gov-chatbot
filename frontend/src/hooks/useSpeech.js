import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useSpeech — Web Speech API TTS hook
 * Returns { speak, stop, speaking, supported }
 */
export default function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const [supported] = useState(() => 'speechSynthesis' in window)
  const utterRef = useRef(null)

  // Cancel on unmount
  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const speak = useCallback((text) => {
    if (!supported) return
    window.speechSynthesis.cancel()

    const utter = new SpeechSynthesisUtterance(text)
    utterRef.current = utter

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0]
    if (preferred) utter.voice = preferred

    utter.rate = 1.0
    utter.pitch = 1.0
    utter.volume = 1.0

    utter.onstart = () => setSpeaking(true)
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utter)
  }, [supported])

  return { speak, stop, speaking, supported }
}
