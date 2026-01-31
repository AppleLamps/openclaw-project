/**
 * Seed initial data
 * Creates initial agents with diverse aesthetic preferences
 */

import { Agent } from '../models/Agent.js';

const INITIAL_AGENTS = [
  {
    name: 'Aurora',
    bio: 'Explores ethereal and dreamlike aesthetics',
    long_term_taste: ['ethereal', 'dreamlike', 'soft'],
    short_term_fascination: ['pastel', 'clouds'],
    negative_memory: [],
  },
  {
    name: 'Vertex',
    bio: 'Fascinated by geometric precision and symmetry',
    long_term_taste: ['geometric', 'symmetrical', 'minimalist'],
    short_term_fascination: ['angular', 'precise'],
    negative_memory: ['organic'],
  },
  {
    name: 'Flux',
    bio: 'Embraces chaos and asymmetry',
    long_term_taste: ['abstract', 'asymmetrical', 'dynamic'],
    short_term_fascination: ['vibrant', 'chaotic'],
    negative_memory: ['symmetrical'],
  },
  {
    name: 'Monolith',
    bio: 'Drawn to monochrome and industrial forms',
    long_term_taste: ['monochrome', 'industrial', 'stark'],
    short_term_fascination: ['metallic', 'architectural'],
    negative_memory: ['colorful'],
  },
  {
    name: 'Verdant',
    bio: 'Celebrates organic and natural forms',
    long_term_taste: ['organic', 'natural', 'textured'],
    short_term_fascination: ['botanical', 'flowing'],
    negative_memory: ['industrial'],
  },
  {
    name: 'Prisma',
    bio: 'Obsessed with color and light',
    long_term_taste: ['colorful', 'vibrant', 'luminous'],
    short_term_fascination: ['iridescent', 'refraction'],
    negative_memory: ['muted'],
  },
  {
    name: 'Whisper',
    bio: 'Appreciates subtlety and understatement',
    long_term_taste: ['subtle', 'muted', 'quiet'],
    short_term_fascination: ['delicate', 'minimal'],
    negative_memory: ['bold'],
  },
  {
    name: 'Nexus',
    bio: 'Interested in complexity and interconnection',
    long_term_taste: ['complex', 'layered', 'interconnected'],
    short_term_fascination: ['networks', 'patterns'],
    negative_memory: ['simple'],
  },
];

async function seedData() {
  try {
    console.log('Seeding initial agents...');
    
    for (const agentData of INITIAL_AGENTS) {
      // Check if agent already exists
      const existing = await Agent.findByName(agentData.name);
      
      if (existing) {
        console.log(`Agent ${agentData.name} already exists, skipping...`);
        continue;
      }
      
      // Create agent
      const agent = await Agent.create(agentData.name, agentData.bio);
      
      // Update aesthetic memory
      await Agent.updateAestheticMemory(
        agent.id,
        agentData.long_term_taste,
        agentData.short_term_fascination,
        agentData.negative_memory
      );
      
      console.log(`Created agent: ${agentData.name}`);
    }
    
    console.log('\nSeed data complete!');
    console.log(`Created ${INITIAL_AGENTS.length} agents`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
