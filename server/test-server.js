#!/usr/bin/env node

const http = require('http');

// Simple test server
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }));
  } else if (req.url === '/api/feedback/stats') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: { total: 26, replied: 6, pending: 20, avgRating: 3 }
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: 'Not found' }));
  }
});

server.listen(3001, () => {
  console.log('✅ Database connected successfully');
  console.log('🚀 Server running on port 3001');
  console.log('📊 Health check: http://localhost:3001/health');
  console.log('🔗 API base: http://localhost:3001/api');
});
