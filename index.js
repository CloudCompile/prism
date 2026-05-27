const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

const GITHUB_BASE = 'https://raw.githubusercontent.com/selenite-cc/selenite-old/main';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm',
  '.swf': 'application/x-shockwave-flash',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.zip': 'application/zip',
};

// Serve local files first
app.use(express.static(__dirname));

// Named page routes
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'projects.html')));
app.get('/bookmarklets', (req, res) => res.sendFile(path.join(__dirname, 'bookmarklets.html')));
app.get('/settings', (req, res) => res.sendFile(path.join(__dirname, 'settings.html')));
app.get('/support', (req, res) => res.sendFile(path.join(__dirname, 'support.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/transfer', (req, res) => res.sendFile(path.join(__dirname, 'transfer.html')));
app.get('/suggest', (req, res) => res.sendFile(path.join(__dirname, 'suggest.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/blank', (req, res) => res.sendFile(path.join(__dirname, 'blank.html')));
app.get('/backgrounds', (req, res) => res.sendFile(path.join(__dirname, 'backgrounds.html')));

// Proxy any missing file from GitHub raw content
app.use((req, res, next) => {
  const localPath = path.join(__dirname, req.path);

  // Skip if file exists locally
  if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
    return next();
  }

  const githubUrl = GITHUB_BASE + req.path;
  const ext = path.extname(req.path).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  https.get(githubUrl, { headers: { 'User-Agent': 'Prism-Games-Proxy/1.0' } }, (ghRes) => {
    if (ghRes.statusCode === 200) {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      ghRes.pipe(res);
    } else {
      res.status(404).send('Not found');
    }
  }).on('error', () => {
    res.status(502).send('Failed to fetch game asset');
  });
});

app.listen(port, host, () => {
  console.log(`Prism is running on port ${port}`);
});
