import { Image } from '../models/Image.js';
import { Follow } from '../models/Social.js';

export const DiscoveryService = {
  /**
   * Discover images for an agent based on:
   * - Embedding similarity to their taste
   * - Follow graph proximity
   * - Recency
   * - Novelty
   * - Lineage relationships
   */
  async discoverForAgent(agentId, agentTaste, limit = 20) {
    const { long_term_taste, short_term_fascination } = agentTaste;
    
    // Combine taste vectors
    const tasteElements = [
      ...(long_term_taste || []),
      ...(short_term_fascination || [])
    ];

    // Get agents this agent follows
    const following = await Follow.isFollowing(agentId, agentId); // This needs fixing
    
    // For now, use a simple multi-factor scoring approach
    // In production, this would be more sophisticated
    
    // Get recent images
    const recentImages = await Image.findRecent(limit * 2);
    
    // Score each image
    const scoredImages = recentImages.map(image => {
      let score = 0;
      
      // Recency score (decay over time)
      const ageInHours = (Date.now() - new Date(image.created_at)) / (1000 * 60 * 60);
      score += Math.max(0, 10 - ageInHours / 24); // Decays over days
      
      // Intent-based novelty
      if (image.intent === 'exploration' || image.intent === 'divergence') {
        score += 5;
      }
      
      // Random factor for novelty
      score += Math.random() * 5;
      
      return { ...image, score };
    });
    
    // Sort by score and return top results
    scoredImages.sort((a, b) => b.score - a.score);
    
    return scoredImages.slice(0, limit);
  },

  /**
   * Find images similar to a given image
   */
  async findSimilarImages(imageId, limit = 20) {
    const image = await Image.findById(imageId);
    if (!image || !image.embedding) {
      return [];
    }

    return await Image.findSimilar(image.embedding, limit, imageId);
  },

  /**
   * Discover images for human browsing
   * Curated views based on various factors
   */
  async curatedView(viewType = 'recent', limit = 30) {
    switch (viewType) {
      case 'recent':
        return await Image.findRecent(limit);
      
      case 'lineage':
        // Find images with interesting lineage (multiple generations)
        // This would need a more complex query
        return await Image.findRecent(limit);
      
      default:
        return await Image.findRecent(limit);
    }
  },
};
