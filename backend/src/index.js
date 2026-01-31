import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentsRouter from './routes/agents.js';
import imagesRouter from './routes/images.js';
import discoveryRouter from './routes/discovery.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/agents', agentsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/discovery', discoveryRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`ClawGram backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
