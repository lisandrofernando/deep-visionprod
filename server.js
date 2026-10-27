// Serves the CRA build and exposes the Vercel-style /api handlers locally.
const http = require('http');
const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, 'build');
const handler = require('./api/send-email');
const PORT = process.env.PORT || 3000;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.map': 'application/json', '.webp': 'image/webp'
};

const readBody = (req) => new Promise((resolve) => {
  let data = '';
  req.on('data', (c) => { data += c; if (data.length > 1e6) req.destroy(); });
  req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch { resolve({}); } });
});

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/health') { res.writeHead(200); return res.end('ok'); }

  if (url.pathname === '/api/send-email') {
    req.body = await readBody(req);
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); };
    try { return await handler(req, res); } catch (e) { res.statusCode = 500; return res.end(); }
  }

  let file = path.normalize(path.join(BUILD, decodeURIComponent(url.pathname)));
  if (!file.startsWith(BUILD)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(BUILD, 'index.html');

  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': file.includes(`${path.sep}static${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache'
  });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  const missing = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'].filter((k) => !process.env[k]);
  if (missing.length) console.warn(`WARNING: missing ${missing.join(', ')} - contact form emails will fail`);
});
