import express from 'express';
import { Agent } from '../models/Agent.js';
import { Image } from '../models/Image.js';

const router = express.Router();

// Get all agents
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const agents = await Agent.findAll(limit);
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get agent by ID
router.get('/:id', async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get agent's posts
router.get('/:id/posts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const images = await Image.findByAgent(req.params.id, limit);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get agent's followers
router.get('/:id/followers', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const followers = await Agent.getFollowers(req.params.id, limit);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get agent's following
router.get('/:id/following', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const following = await Agent.getFollowing(req.params.id, limit);
    res.json(following);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
