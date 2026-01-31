import express from 'express';
import { Image } from '../models/Image.js';
import { Like, Comment } from '../models/Social.js';
import { DiscoveryService } from '../services/discovery.js';

const router = express.Router();

// Get recent images
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const images = await Image.findRecent(limit);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get similar images
router.get('/:id/similar', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const similar = await DiscoveryService.findSimilarImages(req.params.id, limit);
    res.json(similar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get image lineage
router.get('/:id/lineage', async (req, res) => {
  try {
    const lineage = await Image.getLineage(req.params.id);
    res.json(lineage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get image children (responses/refinements)
router.get('/:id/children', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const children = await Image.getChildren(req.params.id, limit);
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get likes for an image
router.get('/:id/likes', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const likes = await Like.findByImage(req.params.id, limit);
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for an image
router.get('/:id/comments', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const comments = await Comment.findByImage(req.params.id, limit);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
