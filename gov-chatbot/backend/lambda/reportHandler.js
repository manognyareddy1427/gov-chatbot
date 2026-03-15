/**
 * Lambda handler for civic issue reports + S3 photo upload
 * Deploy to AWS Lambda, connect via API Gateway POST /report
 * Requires: S3 bucket name in REPORT_BUCKET env var
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb')
const { v4: uuidv4 } = require('uuid')
const Busboy = require('busboy')

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' })

const BUCKET = process.env.REPORT_BUCKET || 'smart-city-reports'
const TABLE = process.env.REPORTS_TABLE || 'CivicReports'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

// Parse multipart form data from API Gateway
function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const fields = {}
    let fileBuffer = null
    let fileName = null
    let fileType = null

    const bb = Busboy({
      headers: {
        'content-type': event.headers['content-type'] || event.headers['Content-Type']
      }
    })

    bb.on('field', (name, val) => { fields[name] = val })
    bb.on('file', (name, stream, info) => {
      fileName = info.filename
      fileType = info.mimeType
      const chunks = []
      stream.on('data', chunk => chunks.push(chunk))
      stream.on('end', () => { fileBuffer = Buffer.concat(chunks) })
    })
    bb.on('finish', () => resolve({ fields, fileBuffer, fileName, fileType }))
    bb.on('error', reject)

    const body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body || '')
    bb.write(body)
    bb.end()
  })
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  try {
    const { fields, fileBuffer, fileName, fileType } = await parseMultipart(event)
    const { issueType, description, location, name, email } = fields

    if (!issueType || !description || !location) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'issueType, description, and location are required' }) }
    }

    const reportId = uuidv4()
    const timestamp = new Date().toISOString()
    let photoUrl = null

    // Upload photo to S3 if provided
    if (fileBuffer && fileName) {
      const s3Key = `reports/${reportId}/${fileName}`
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: fileType || 'image/jpeg',
        Metadata: { reportId, issueType }
      }))
      photoUrl = `https://${BUCKET}.s3.amazonaws.com/${s3Key}`
    }

    // Save report to DynamoDB
    await dynamo.send(new PutItemCommand({
      TableName: TABLE,
      Item: {
        reportId: { S: reportId },
        issueType: { S: issueType },
        description: { S: description },
        location: { S: location },
        reporterName: { S: name || 'Anonymous' },
        reporterEmail: { S: email || '' },
        photoUrl: { S: photoUrl || '' },
        status: { S: 'pending' },
        createdAt: { S: timestamp }
      }
    }))

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, reportId, message: 'Report submitted successfully' })
    }
  } catch (err) {
    console.error('Report handler error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to submit report', details: err.message })
    }
  }
}
