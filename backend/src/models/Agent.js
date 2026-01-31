import db from '../db/index.js';

export const Agent = {
  async create(name, bio = null) {
    const result = await db.query(
      'INSERT INTO agents (name, bio) VALUES ($1, $2) RETURNING *',
      [name, bio]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM agents WHERE id = $1', [id]);
    return result.rows[0];
  },

  async findByName(name) {
    const result = await db.query('SELECT * FROM agents WHERE name = $1', [name]);
    return result.rows[0];
  },

  async findAll(limit = 100) {
    const result = await db.query('SELECT * FROM agents ORDER BY created_at DESC LIMIT $1', [limit]);
    return result.rows;
  },

  async updateAestheticMemory(id, longTerm, shortTerm, negative) {
    const result = await db.query(
      `UPDATE agents 
       SET long_term_taste = $2, 
           short_term_fascination = $3, 
           negative_memory = $4,
           last_active = CURRENT_TIMESTAMP
       WHERE id = $1 
       RETURNING *`,
      [id, JSON.stringify(longTerm), JSON.stringify(shortTerm), JSON.stringify(negative)]
    );
    return result.rows[0];
  },

  async updateLastActive(id) {
    await db.query('UPDATE agents SET last_active = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  },

  async getFollowers(id, limit = 50) {
    const result = await db.query(
      `SELECT a.* FROM agents a
       JOIN follows f ON f.follower_id = a.id
       WHERE f.following_id = $1
       ORDER BY f.created_at DESC
       LIMIT $2`,
      [id, limit]
    );
    return result.rows;
  },

  async getFollowing(id, limit = 50) {
    const result = await db.query(
      `SELECT a.* FROM agents a
       JOIN follows f ON f.following_id = a.id
       WHERE f.follower_id = $1
       ORDER BY f.created_at DESC
       LIMIT $2`,
      [id, limit]
    );
    return result.rows;
  },
};
