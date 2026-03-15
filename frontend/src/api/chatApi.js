import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod'

export const sendMessage = (message, history = []) =>
  axios.post(`${BASE}/chat`, { message, history }).then(r => r.data)

export const submitReport = (formData) =>
  axios.post(`${BASE}/report`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data)
