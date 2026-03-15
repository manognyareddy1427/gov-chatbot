/**
 * Lambda handler for AI chat via Amazon Bedrock
 * Deploy to AWS Lambda, connect via API Gateway POST /chat
 */

const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime')

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' })

// System prompt for the city assistant
const SYSTEM_PROMPT = `You are a helpful Smart City Government AI Assistant. 
You assist citizens with questions about:
- Building permits and zoning
- Utility services (water, electricity, waste)
- Public transportation and parking
- Local regulations and bylaws
- City events, parks, and recreation
- Tax payments and municipal fees
- Emergency services and contacts

Be concise, friendly, and accurate. If you don't know something specific to the city, 
suggest the citizen contact the relevant department directly. Always be helpful and professional.`

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { message, history = [] } = body

    if (!message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message is required' }) }
    }

    // Build conversation for Claude
    const messages = [
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message }
    ]

    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages
    }

    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-haiku-20240307-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload)
    })

    const response = await client.send(command)
    const result = JSON.parse(Buffer.from(response.body).toString('utf-8'))
    const aiResponse = result.content?.[0]?.text || 'I could not generate a response.'

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: aiResponse })
    }
  } catch (err) {
    console.error('Chat handler error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: err.message })
    }
  }
}
