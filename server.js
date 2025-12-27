import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import handler from './api/analyze.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images

// Serve Static Files (Frontend)
app.use(express.static(join(__dirname, 'Frontend')));

// API Routes
app.post('/api/analyze', handler);
app.get('/api/get-result', (await import('./api/get-result.js')).default);

// Fallback for root
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'Frontend', 'index_final_corrigido.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
