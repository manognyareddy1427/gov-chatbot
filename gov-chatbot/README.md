# Smart City Gov Chatbot

## Quick Start

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # add your API Gateway URL
npm run dev
```

### Backend (Lambda)
```bash
cd backend/lambda
npm install
zip -r function.zip .
```

## AWS Deployment

### 1. Lambda — Chat Handler
- Runtime: Node.js 20.x
- Handler: `chatHandler.handler`
- Env vars: `BEDROCK_MODEL_ID`, `AWS_REGION`
- IAM: `bedrock:InvokeModel` permission

### 2. Lambda — Report Handler
- Runtime: Node.js 20.x
- Handler: `reportHandler.handler`
- Env vars: `REPORT_BUCKET`, `REPORTS_TABLE`, `AWS_REGION`
- IAM: `s3:PutObject`, `dynamodb:PutItem` permissions

### 3. API Gateway
- POST `/chat` → chatHandler Lambda
- POST `/report` → reportHandler Lambda
- Enable CORS on both routes

### 4. S3 Bucket
- Create bucket: `smart-city-reports`
- Enable public read or use pre-signed URLs

### 5. DynamoDB Table
- Table name: `CivicReports`
- Partition key: `reportId` (String)

### 6. Bedrock
- Enable model access for `anthropic.claude-3-haiku-20240307-v1:0` in AWS Console
