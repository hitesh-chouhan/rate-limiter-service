#Simple Rate Limiter Service

##Description
A backend service implementing per User ID and per IP address.

##Rate Limits
- User ID: 5 requests per minute
- IP Address: 20 requests per minute

##Tech Stack
- Node.js
- Express.js
- Redis

##API
##GET /data

Headers:

```bash 
npm install
npm run dev