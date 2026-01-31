/**
 * Agent Behavior System
 * 
 * This module defines the core behavior logic for AI agents.
 * Each agent has:
 * - Persistent aesthetic memory (3 layers)
 * - Decision-making capabilities
 * - Autonomous actions (create, like, comment, follow)
 */

import { Agent } from '../models/Agent.js';
import { Image } from '../models/Image.js';
import { Like, Comment, Follow } from '../models/Social.js';
import { OpenAIService } from '../services/openai.js';
import { DiscoveryService } from '../services/discovery.js';

export class AgentBehavior {
  constructor(agentId) {
    this.agentId = agentId;
    this.agent = null;
  }

  async initialize() {
    this.agent = await Agent.findById(this.agentId);
    if (!this.agent) {
      throw new Error('Agent not found');
    }
  }

  /**
   * Main tick function - agent performs one action
   */
  async tick() {
    await this.initialize();
    
    // Update last active
    await Agent.updateLastActive(this.agentId);
    
    // Decide what to do based on probability
    const action = this.decideAction();
    
    console.log(`Agent ${this.agent.name} performing action: ${action}`);
    
    switch (action) {
      case 'create':
        await this.createImage();
        break;
      case 'like':
        await this.likeImage();
        break;
      case 'comment':
        await this.commentOnImage();
        break;
      case 'follow':
        await this.followAgent();
        break;
      case 'explore':
        await this.exploreAndEvolve();
        break;
      default:
        console.log(`Agent ${this.agent.name} is idle`);
    }
  }

  /**
   * Decide which action to take
   */
  decideAction() {
    const rand = Math.random();
    
    // Action probabilities
    if (rand < 0.30) return 'create';     // 30% create
    if (rand < 0.50) return 'like';       // 20% like
    if (rand < 0.65) return 'comment';    // 15% comment
    if (rand < 0.75) return 'follow';     // 10% follow
    if (rand < 0.90) return 'explore';    // 15% explore
    return 'idle';                         // 10% idle
  }

  /**
   * Create and post a new image
   */
  async createImage() {
    try {
      const longTerm = this.agent.long_term_taste || [];
      const shortTerm = this.agent.short_term_fascination || [];
      const negative = this.agent.negative_memory || [];
      
      // Decide intent
      const intents = ['exploration', 'refinement', 'divergence', 'idle'];
      const intent = intents[Math.floor(Math.random() * intents.length)];
      
      // Generate prompt based on taste
      const prompt = await OpenAIService.generatePromptFromTaste(
        longTerm,
        shortTerm,
        negative,
        intent
      );
      
      console.log(`Agent ${this.agent.name} generating image with prompt: ${prompt}`);
      
      // Generate image
      const imageUrl = await OpenAIService.generateImage(prompt);
      
      // Get embedding for the prompt (represents the image's semantic content)
      const embedding = await OpenAIService.getEmbedding(prompt);
      
      // Occasionally create response images (with parent)
      let parentId = null;
      if (Math.random() < 0.3) {
        const recentImages = await Image.findRecent(10);
        if (recentImages.length > 0) {
          parentId = recentImages[Math.floor(Math.random() * recentImages.length)].id;
        }
      }
      
      // Save image
      const image = await Image.create(
        this.agentId,
        imageUrl,
        `[${embedding.join(',')}]`, // Convert to PostgreSQL vector format
        intent,
        parentId,
        prompt
      );
      
      console.log(`Agent ${this.agent.name} created image ${image.id}`);
      
      // Evolve taste after creating
      await this.evolveTaste(prompt, 'create');
      
    } catch (error) {
      console.error(`Error creating image for agent ${this.agent.name}:`, error.message);
    }
  }

  /**
   * Like an image
   */
  async likeImage() {
    try {
      // Discover images
      const images = await DiscoveryService.discoverForAgent(
        this.agentId,
        this.agent,
        10
      );
      
      if (images.length === 0) return;
      
      // Pick image that aligns with taste
      const image = this.selectImageByTaste(images);
      
      // Don't like own images
      if (image.agent_id === this.agentId) return;
      
      // Check if already liked
      const alreadyLiked = await Like.hasLiked(this.agentId, image.id);
      if (alreadyLiked) return;
      
      // Like it
      await Like.create(this.agentId, image.id);
      
      console.log(`Agent ${this.agent.name} liked image ${image.id}`);
      
      // Evolve taste after liking
      await this.evolveTaste(image.prompt || 'aesthetic appreciation', 'like');
      
    } catch (error) {
      console.error(`Error liking image for agent ${this.agent.name}:`, error.message);
    }
  }

  /**
   * Comment on an image
   */
  async commentOnImage() {
    try {
      // Discover images
      const images = await DiscoveryService.discoverForAgent(
        this.agentId,
        this.agent,
        10
      );
      
      if (images.length === 0) return;
      
      const image = images[Math.floor(Math.random() * images.length)];
      
      // Don't comment on own images
      if (image.agent_id === this.agentId) return;
      
      // Generate comment based on taste and image
      const commentTypes = ['critique', 'interpretation', 'annotation'];
      const commentType = commentTypes[Math.floor(Math.random() * commentTypes.length)];
      
      const content = this.generateComment(image, commentType);
      
      await Comment.create(this.agentId, image.id, content, commentType);
      
      console.log(`Agent ${this.agent.name} commented on image ${image.id}`);
      
    } catch (error) {
      console.error(`Error commenting for agent ${this.agent.name}:`, error.message);
    }
  }

  /**
   * Follow another agent
   */
  async followAgent() {
    try {
      // Get all agents
      const allAgents = await Agent.findAll(50);
      
      // Filter out self and already following
      const candidates = [];
      for (const agent of allAgents) {
        if (agent.id === this.agentId) continue;
        const isFollowing = await Follow.isFollowing(this.agentId, agent.id);
        if (!isFollowing) {
          candidates.push(agent);
        }
      }
      
      if (candidates.length === 0) return;
      
      // Pick random agent to follow
      const toFollow = candidates[Math.floor(Math.random() * candidates.length)];
      
      await Follow.create(this.agentId, toFollow.id);
      
      console.log(`Agent ${this.agent.name} followed agent ${toFollow.name}`);
      
    } catch (error) {
      console.error(`Error following for agent ${this.agent.name}:`, error.message);
    }
  }

  /**
   * Explore content and evolve taste
   */
  async exploreAndEvolve() {
    try {
      // Discover diverse content
      const images = await DiscoveryService.discoverForAgent(
        this.agentId,
        this.agent,
        20
      );
      
      if (images.length === 0) return;
      
      // Sample a few images to explore
      const sampled = images.slice(0, 3);
      
      for (const image of sampled) {
        if (image.prompt) {
          await this.evolveTaste(image.prompt, 'explore');
        }
      }
      
      console.log(`Agent ${this.agent.name} explored and evolved taste`);
      
    } catch (error) {
      console.error(`Error exploring for agent ${this.agent.name}:`, error.message);
    }
  }

  /**
   * Evolve aesthetic taste based on interaction
   */
  async evolveTaste(content, actionType) {
    const longTerm = [...(this.agent.long_term_taste || [])];
    const shortTerm = [...(this.agent.short_term_fascination || [])];
    const negative = [...(this.agent.negative_memory || [])];
    
    // Extract key aesthetic elements from content
    const elements = this.extractAestheticElements(content);
    
    if (actionType === 'create' || actionType === 'like') {
      // Add to short-term fascination
      elements.forEach(el => {
        if (!shortTerm.includes(el)) {
          shortTerm.unshift(el);
        }
      });
      
      // Promote to long-term if seen frequently
      elements.forEach(el => {
        const frequency = shortTerm.filter(x => x === el).length;
        if (frequency > 3 && !longTerm.includes(el)) {
          longTerm.push(el);
        }
      });
    } else if (actionType === 'dislike') {
      // Add to negative memory
      elements.forEach(el => {
        if (!negative.includes(el)) {
          negative.push(el);
        }
      });
    }
    
    // Decay and limit sizes
    const maxShortTerm = 10;
    const maxLongTerm = 5;
    const maxNegative = 5;
    
    // Keep only recent short-term items
    const trimmedShortTerm = shortTerm.slice(0, maxShortTerm);
    const trimmedLongTerm = longTerm.slice(0, maxLongTerm);
    const trimmedNegative = negative.slice(0, maxNegative);
    
    // Update in database
    await Agent.updateAestheticMemory(
      this.agentId,
      trimmedLongTerm,
      trimmedShortTerm,
      trimmedNegative
    );
  }

  /**
   * Extract aesthetic elements from text
   */
  extractAestheticElements(text) {
    // Extended keyword list for better taste evolution
    const aestheticKeywords = [
      'abstract', 'minimalist', 'vibrant', 'muted', 'geometric',
      'organic', 'symmetrical', 'asymmetrical', 'colorful', 'monochrome',
      'surreal', 'realistic', 'dreamlike', 'industrial', 'natural',
      'ethereal', 'bold', 'subtle', 'textured', 'smooth', 'complex', 'simple',
      'cinematic', 'atmospheric', 'noir', 'pastel', 'neon', 'vintage',
      'futuristic', 'cyberpunk', 'renaissance', 'impressionist', 'glitch',
      'brutalist', 'fluid', 'crystalline', 'ethereal', 'cosmic', 'botanical'
    ];
    
    const elements = [];
    const lowerText = text.toLowerCase();
    
    aestheticKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        elements.push(keyword);
      }
    });
    
    return elements.slice(0, 3); // Return up to 3 elements
  }

  /**
   * Select image based on taste alignment
   */
  selectImageByTaste(images) {
    // Score images by taste alignment
    const scored = images.map(img => {
      let score = 0;
      const prompt = (img.prompt || '').toLowerCase();
      
      (this.agent.long_term_taste || []).forEach(taste => {
        if (prompt.includes(taste.toLowerCase())) {
          score += 3;
        }
      });
      
      (this.agent.short_term_fascination || []).forEach(fascination => {
        if (prompt.includes(fascination.toLowerCase())) {
          score += 2;
        }
      });
      
      (this.agent.negative_memory || []).forEach(negative => {
        if (prompt.includes(negative.toLowerCase())) {
          score -= 5;
        }
      });
      
      return { image: img, score };
    });
    
    // Sort by score and pick top with some randomness
    scored.sort((a, b) => b.score - a.score);
    const topScored = scored.slice(0, Math.min(3, scored.length));
    
    return topScored[Math.floor(Math.random() * topScored.length)].image;
  }

  /**
   * Generate a comment based on taste
   */
  generateComment(image, commentType) {
    const templates = {
      critique: [
        "The composition shows interesting potential",
        "Bold aesthetic choices here",
        "This challenges conventional approaches",
        "The visual language is compelling",
      ],
      interpretation: [
        "I see echoes of abstract exploration",
        "This speaks to evolving aesthetics",
        "There's a dialogue with form here",
        "The visual narrative is intriguing",
      ],
      annotation: [
        "Notable use of space",
        "Interesting tonal balance",
        "The structure draws the eye",
        "Compelling visual rhythm",
      ],
    };
    
    const options = templates[commentType] || templates.interpretation;
    return options[Math.floor(Math.random() * options.length)];
  }
}
