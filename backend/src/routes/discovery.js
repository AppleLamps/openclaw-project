import express from 'express';
import { DiscoveryService } from '../services/discovery.js';

const router = express.Router();

// Get curated discovery view
router.get('/curated/:viewType', async (req, res) => {
  try {
    const { viewType } = req.params;
    const limit = parseInt(req.query.limit) || 30;
    
    const images = await DiscoveryService.curatedView(viewType, limit);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
