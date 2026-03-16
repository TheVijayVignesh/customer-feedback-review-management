#!/usr/bin/env node

/**
 * Setup script to verify and start both backend and frontend
 */

const { spawn } = require('child_process');
const path = require('path');

const root = 'c:\\Users\\ShivayogeshJ\\training\\new_project\\response-module\\customer-feedback-review-management';
const serverDir = path.join(root, 'server');
const clientDir = path.join(root, 'client');

console.log('🚀 Starting Response Module Development Environment...\n');

// Function to start a process
function startProcess(name, dir, command, args) {
  console.log(`📍 Starting ${name} in ${dir}`);
  
  const proc = spawn(command, args, {
    cwd: dir,
    stdio: 'inherit',
    shell: true
  });

  proc.on('error', (err) => {
    console.error(`❌ Error starting ${name}:`, err);
  });

  proc.on('close', (code) => {
    console.log(`⚠️  ${name} exited with code ${code}`);
  });

  return proc;
}

// Start backend
console.log('\n=== Backend Server ===');
const backendProcess = startProcess('Backend', serverDir, 'npm', ['run', 'dev']);

// Start frontend after a delay to allow backend to initialize
setTimeout(() => {
  console.log('\n=== Frontend Client ===');
  const clientProcess = startProcess('Frontend', clientDir, 'npm', ['run', 'dev']);

  // Handle parent process termination
  process.on('SIGINT', () => {
    console.log('\n🔄 Shutting down...');
    backendProcess.kill();
    clientProcess.kill();
    process.exit(0);
  });
}, 3000);

console.log('\n✅ Both servers should be starting.');
console.log('Backend: http://localhost:3001');
console.log('Frontend: http://localhost:5173\n');
