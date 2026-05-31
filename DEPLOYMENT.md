# StartupFlash Deployment Guide

## Architecture
- Frontend: Vite React app (`my-react-app`) -> deploy to Vercel
- Backend: Express API (`backend`) -> deploy to Railway
- CMS: WordPress REST API (`WP_BASE_URL`)

## 1. Frontend (Vercel)
Set environment variable in Vercel project:
- `VITE_API_BASE_URL=https://<railway-backend-domain>/api`

Build command:
- `npm run build`

Output directory:
- `dist`

## 2. Backend (Railway)
Set environment variables:
- `PORT=5000`
- `WP_BASE_URL=https://thestartupflash.in/wp-json/wp/v2`
- `WP_USERNAME=<wordpress-username>`
- `WP_APP_PASSWORD=<wordpress-application-password>`
- `CORS_ORIGIN=https://<vercel-domain>,https://<custom-domain>`
- `NEWSLETTER_WEBHOOK_URL=<optional-provider-webhook>`

Start command:
- `node server.js`

## 3. CORS Verification
- Backend allows all origins only when `CORS_ORIGIN` is empty.
- For production, set explicit origins in `CORS_ORIGIN` (comma-separated).

## 4. Deployment Readiness Checklist
- Frontend build passes (`npm run build`)
- Backend starts without crashes (`node server.js`)
- `GET /api/posts` returns 200
- `GET /api/categories` returns 200
- `POST /api/newsletter` validates and returns success/error correctly
- `POST /api/create-post` requires valid WordPress credentials

## 5. Notes
- Publishing endpoint depends on WordPress credentials and WordPress auth availability.
- Newsletter currently supports local capture + optional webhook forwarding.
