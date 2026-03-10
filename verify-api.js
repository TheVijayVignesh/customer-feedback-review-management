#!/usr/bin/env node

/**
 * Quick verification script for the Response Module
 * Tests all critical API endpoints
 */

const http = require('http');

const tests = [
  { name: 'Health Check', url: 'http://localhost:3001/health', method: 'GET' },
  { name: 'Feedback Stats', url: 'http://localhost:3001/api/feedback/stats', method: 'GET' },
  { name: 'All Feedbacks', url: 'http://localhost:3001/api/feedback', method: 'GET' },
  { name: 'Pending Feedbacks', url: 'http://localhost:3001/api/feedback?filter=pending', method: 'GET' }
];

console.log('🧪 Response Module API Verification\n');
console.log('Testing Backend Server: http://localhost:3001\n');

let passed = 0;
let failed = 0;

function testEndpoint(test) {
  return new Promise((resolve) => {
    try {
      const url = new URL(test.url);
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: test.method,
        timeout: 5000
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode === 200 && json.success === true) {
              console.log(`✅ ${test.name}`);
              console.log(`   Status: ${res.statusCode}`);
              if (json.data) {
                console.log(`   Data Keys: ${Object.keys(json.data).join(', ')}`);
              }
              passed++;
            } else {
              console.log(`⚠️  ${test.name} - Unexpected response`);
              failed++;
            }
          } catch (e) {
            console.log(`⚠️  ${test.name} - Invalid JSON response`);
            failed++;
          }
          resolve();
        });
      });

      req.on('error', (error) => {
        console.log(`❌ ${test.name}`);
        console.log(`   Error: ${error.message}`);
        failed++;
        resolve();
      });

      req.on('timeout', () => {
        console.log(`⏱️  ${test.name} - Request timeout`);
        req.destroy();
        failed++;
        resolve();
      });

      req.end();
    } catch (error) {
      console.log(`❌ ${test.name} - ${error.message}`);
      failed++;
      resolve();
    }
  });
}

(async () => {
  for (const test of tests) {
    await testEndpoint(test);
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failed === 0) {
    console.log('🎉 All tests passed! Your API is working correctly.\n');
  } else {
    console.log('⚠️  Some tests failed. Please check:');
    console.log('   1. Backend server is running: npm run dev (in server/)');
    console.log('   2. Database is connected');
    console.log('   3. No firewall blocking port 3001\n');
  }
})();
