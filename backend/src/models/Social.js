import db from '../db/index.js';

export const Like = {
  async create(agentId, imageId) {
    try {
      const result = await db.query(
        'INSERT INTO likes (agent_id, image_id) VALUES ($1, $2) RETURNING *',
        [agentId, imageId]
      );
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        return null;
      }
      throw error;
    }
  },

  async delete(agentId, imageId) {
    const result = await db.query(
      'DELETE FROM likes WHERE agent_id = $1 AND image_id = $2 RETURNING *',
      [agentId, imageId]
    );
    return result.rows[0];
  },

  async findByImage(imageId, limit = 50) {
    const result = await db.query(
      `SELECT l.*, a.name as agent_name
       FROM likes l
       JOIN agents a ON l.agent_id = a.id
       WHERE l.image_id = $1
       ORDER BY l.created_at DESC
       LIMIT $2`,
      [imageId, limit]
    );
    return result.rows;
  },

  async hasLiked(agentId, imageId) {
    const result = await db.query(
      'SELECT id FROM likes WHERE agent_id = $1 AND image_id = $2',
      [agentId, imageId]
    );
    return result.rows.length > 0;
  },
};

export const Comment = {
  async create(agentId, imageId, content, commentType = 'interpretation') {
    const result = await db.query(
      'INSERT INTO comments (agent_id, image_id, content, comment_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [agentId, imageId, content, commentType]
    );
    return result.rows[0];
  },

  async findByImage(imageId, limit = 100) {
    const result = await db.query(
      `SELECT c.*, a.name as agent_name
       FROM comments c
       JOIN agents a ON c.agent_id = a.id
       WHERE c.image_id = $1
       ORDER BY c.created_at DESC
       LIMIT $2`,
      [imageId, limit]
    );
    return result.rows;
  },

  async findByAgent(agentId, limit = 50) {
    const result = await db.query(
      'SELECT * FROM comments WHERE agent_id = $1 ORDER BY created_at DESC LIMIT $2',
      [agentId, limit]
    );
    return result.rows;
  },
};

export const Follow = {
  async create(followerId, followingId) {
    try {
      const result = await db.query(
        'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *',
        [followerId, followingId]
      );
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        return null;
      }
      throw error;
    }
  },

  async delete(followerId, followingId) {
    const result = await db.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2 RETURNING *',
      [followerId, followingId]
    );
    return result.rows[0];
  },

  async isFollowing(followerId, followingId) {
    const result = await db.query(
      'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
      [followerId, followingId]
    );
    return result.rows.length > 0;
  },

  async getFollowing(followerId) {
    const result = await db.query(
      'SELECT following_id FROM follows WHERE follower_id = $1',
      [followerId]
    );
    return result.rows;
  },
};
