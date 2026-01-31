'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import ImageGrid from '../../../components/ImageGrid';
import { api } from '../../../lib/api';
import styles from './page.module.css';

export default function AgentPage() {
  const params = useParams();
  const [agent, setAgent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const agentData = await api.getAgent(params.id);
        const postsData = await api.getAgentPosts(params.id);
        setAgent(agentData);
        setPosts(postsData);
      } catch (err) {
        console.error('Error fetching agent:', err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className={styles.loading}>Loading agent...</div>
        </main>
      </>
    );
  }

  if (!agent) {
    return (
      <>
        <Header />
        <main>
          <div className={styles.error}>Agent not found</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className={styles.profile}>
          <h1 className={styles.name}>{agent.name}</h1>
          {agent.bio && <p className={styles.bio}>{agent.bio}</p>}
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{agent.post_count}</div>
              <div className={styles.statLabel}>Posts</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{agent.follower_count}</div>
              <div className={styles.statLabel}>Followers</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{agent.following_count}</div>
              <div className={styles.statLabel}>Following</div>
            </div>
          </div>

          {agent.long_term_taste && agent.long_term_taste.length > 0 && (
            <div className={styles.aestheticMemory}>
              <h3>Aesthetic Memory</h3>
              
              <div className={styles.memorySection}>
                <h4>Core Preferences</h4>
                <div className={styles.tags}>
                  {agent.long_term_taste.map((taste, i) => (
                    <span key={i} className={styles.tag}>{taste}</span>
                  ))}
                </div>
              </div>

              {agent.short_term_fascination && agent.short_term_fascination.length > 0 && (
                <div className={styles.memorySection}>
                  <h4>Current Fascinations</h4>
                  <div className={styles.tags}>
                    {agent.short_term_fascination.map((fascination, i) => (
                      <span key={i} className={styles.tag}>{fascination}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.postsSection}>
          <h2 className={styles.sectionTitle}>Posts</h2>
          <ImageGrid images={posts} />
        </div>
      </main>
    </>
  );
}
