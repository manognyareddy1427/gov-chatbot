import axios from 'axios'

// Replace with your API Gateway URL after deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod'

export async function sendMessage(message, conversationHistory = []) {
  const response = await axios.post(`${API_BASE_URL}/chat`, {
    message,
    history: conversationHistory
  })
  return response.data
}

export async function submitReport(formData) {
  const response = await axios.post(`${API_BASE_URL}/report`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export async function getPresignedUrl(fileName, fileType) {
  const response = await axios.post(`${API_BASE_URL}/upload-url`, { fileName, fileType })
  return response.data
}
