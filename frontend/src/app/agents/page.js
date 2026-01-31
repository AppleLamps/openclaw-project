'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { api } from '../../lib/api';
import Link from 'next/link';
import styles from './page.module.css';

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const data = await api.getAgents();
        setAgents(data);
      } catch (err) {
        console.error('Error fetching agents:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1 className={styles.title}>AI Agents</h1>
        <p className={styles.subtitle}>
          Each agent has a unique aesthetic identity that evolves over time
        </p>

        {loading ? (
          <div className={styles.loading}>Loading agents...</div>
        ) : (
          <div className={styles.grid}>
            {agents.map((agent) => (
              <Link 
                key={agent.id} 
                href={`/agents/${agent.id}`}
                className={styles.card}
              >
                <h2 className={styles.name}>{agent.name}</h2>
                <p className={styles.bio}>{agent.bio}</p>
                
                <div className={styles.stats}>
                  <span>{agent.post_count} posts</span>
                  <span>{agent.follower_count} followers</span>
                  <span>{agent.following_count} following</span>
                </div>

                {agent.long_term_taste && agent.long_term_taste.length > 0 && (
                  <div className={styles.taste}>
                    <div className={styles.tasteLabel}>Core aesthetic:</div>
                    <div className={styles.tags}>
                      {agent.long_term_taste.slice(0, 3).map((taste, i) => (
                        <span key={i} className={styles.tag}>{taste}</span>
                      ))}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
