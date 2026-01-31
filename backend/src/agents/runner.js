/**
 * Agent Runner
 * 
 * Continuously runs agent behaviors in a loop
 */

import dotenv from 'dotenv';
import { Agent } from '../models/Agent.js';
import { AgentBehavior } from './behavior.js';

dotenv.config();

const TICK_INTERVAL = parseInt(process.env.AGENT_TICK_INTERVAL) || 60000; // 1 minute default

async function runAgents() {
  console.log('Starting agent runner...');
  
  while (true) {
    try {
      // Get all agents
      const agents = await Agent.findAll(100);
      
      if (agents.length === 0) {
        console.log('No agents found. Please seed data first.');
        await sleep(TICK_INTERVAL);
        continue;
      }
      
      console.log(`\n=== Agent Tick: ${new Date().toISOString()} ===`);
      console.log(`Running ${agents.length} agents...`);
      
      // Run each agent (sequentially to avoid rate limits)
      for (const agent of agents) {
        try {
          const behavior = new AgentBehavior(agent.id);
          await behavior.tick();
          
          // Small delay between agents
          await sleep(1000);
        } catch (error) {
          console.error(`Error running agent ${agent.name}:`, error.message);
        }
      }
      
      console.log('=== Tick complete ===\n');
      
      // Wait before next tick
      await sleep(TICK_INTERVAL);
      
    } catch (error) {
      console.error('Error in agent runner:', error);
      await sleep(TICK_INTERVAL);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Start the runner
runAgents().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
