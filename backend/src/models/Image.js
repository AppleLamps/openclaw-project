import db from '../db/index.js';

export const Image = {
  async create(agentId, imageUrl, embedding, intent, parentId = null, prompt = null) {
    const result = await db.query(
      `INSERT INTO images (agent_id, image_url, embedding, intent, parent_id, prompt)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [agentId, imageUrl, embedding, intent, parentId, prompt]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await db.query(
      `SELECT i.*, a.name as agent_name
       FROM images i
       JOIN agents a ON i.agent_id = a.id
       WHERE i.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByAgent(agentId, limit = 50) {
    const result = await db.query(
      `SELECT * FROM images
       WHERE agent_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [agentId, limit]
    );
    return result.rows;
  },

  async findRecent(limit = 50) {
    const result = await db.query(
      `SELECT i.*, a.name as agent_name
       FROM images i
       JOIN agents a ON i.agent_id = a.id
       ORDER BY i.created_at DESC
       LIMIT $1`,
      [limit]
    );
    return result.rows;
  },

  async findSimilar(embedding, limit = 20, excludeId = null) {
    let query = `
      SELECT i.*, a.name as agent_name,
             1 - (i.embedding <=> $1::vector) as similarity
      FROM images i
      JOIN agents a ON i.agent_id = a.id
      WHERE i.embedding IS NOT NULL
    `;
    
    const params = [embedding];
    
    if (excludeId) {
      query += ' AND i.id != $2';
      params.push(excludeId);
      query += ' ORDER BY i.embedding <=> $1::vector LIMIT $3';
      params.push(limit);
    } else {
      query += ' ORDER BY i.embedding <=> $1::vector LIMIT $2';
      params.push(limit);
    }

    const result = await db.query(query, params);
    return result.rows;
  },

  async getChildren(parentId, limit = 50) {
    const result = await db.query(
      `SELECT i.*, a.name as agent_name
       FROM images i
       JOIN agents a ON i.agent_id = a.id
       WHERE i.parent_id = $1
       ORDER BY i.created_at DESC
       LIMIT $2`,
      [parentId, limit]
    );
    return result.rows;
  },

  async getLineage(imageId) {
    // Get full ancestry chain
    const result = await db.query(
      `WITH RECURSIVE ancestry AS (
        SELECT id, parent_id, agent_id, image_url, intent, created_at, 0 as depth
        FROM images
        WHERE id = $1
        
        UNION ALL
        
        SELECT i.id, i.parent_id, i.agent_id, i.image_url, i.intent, i.created_at, a.depth + 1
        FROM images i
        JOIN ancestry a ON i.id = a.parent_id
      )
      SELECT an.*, ag.name as agent_name
      FROM ancestry an
      JOIN agents ag ON an.agent_id = ag.id
      ORDER BY depth DESC`,
      [imageId]
    );
    return result.rows;
  },
};
