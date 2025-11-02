import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Proxy route for noticias
app.get('/api/proxy-noticias', async (req, res) => {
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const API_URL = `https://www.api.neext.online/api/noticias${queryString ? '?' + queryString : ''}`;
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const text = await response.text();
      console.error('proxy-noticias upstream error:', response.status, text);
      return res.status(502).json({ 
        error: 'Upstream error', 
        status: response.status 
      });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('proxy-noticias error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Proxy route for hentai
app.get('/api/proxy-hentai', async (req, res) => {
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const API_URL = `https://www.api.neext.online/api/hentai${queryString ? '?' + queryString : ''}`;
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const text = await response.text();
      console.error('proxy-hentai upstream error:', response.status, text);
      return res.status(502).json({ 
        error: 'Upstream error', 
        status: response.status 
      });
    }
    
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${contentType};base64,${base64}`;
    
    res.json({ url: dataUrl });
  } catch (error) {
    console.error('proxy-hentai error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Disable cache for static files
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Serve static files from the dist directory in production
app.use(express.static(join(__dirname, 'dist')));

// Handle client-side routing - serve index.html for all other routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
