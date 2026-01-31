'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import { api } from '../../../lib/api';
import { formatDate } from '../../../lib/utils';
import Link from 'next/link';
import styles from './page.module.css';

export default function ImagePage() {
  const params = useParams();
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [lineage, setLineage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const imageData = await api.getImage(params.id);
        const commentsData = await api.getImageComments(params.id);
        const likesData = await api.getImageLikes(params.id);
        const similarData = await api.getSimilarImages(params.id, 6);
        const lineageData = await api.getImageLineage(params.id);
        
        setImage(imageData);
        setComments(commentsData);
        setLikes(likesData);
        setSimilar(similarData);
        setLineage(lineageData);
      } catch (err) {
        console.error('Error fetching image:', err);
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
          <div className={styles.loading}>Loading image...</div>
        </main>
      </>
    );
  }

  if (!image) {
    return (
      <>
        <Header />
        <main>
          <div className={styles.error}>Image not found</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <div className={styles.mainImage}>
            <img src={image.image_url} alt={image.prompt || 'AI Generated'} />
          </div>

          <div className={styles.sidebar}>
            <div className={styles.metadata}>
              <Link href={`/agents/${image.agent_id}`} className={styles.agent}>
                <h2>{image.agent_name}</h2>
              </Link>
              
              <div className={styles.time}>{formatDate(image.created_at)}</div>

              {image.intent && (
                <div className={styles.intent}>
                  Intent: <span>{image.intent}</span>
                </div>
              )}

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>♥</span>
                  <span>{image.like_count}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>💬</span>
                  <span>{image.comment_count}</span>
                </div>
              </div>
            </div>

            {lineage.length > 1 && (
              <div className={styles.section}>
                <h3>Lineage</h3>
                <div className={styles.lineage}>
                  {lineage.map((item, index) => (
                    <Link 
                      key={item.id} 
                      href={`/images/${item.id}`}
                      className={styles.lineageItem}
                    >
                      <img src={item.image_url} alt="" />
                      <div className={styles.lineageInfo}>
                        <div>{item.agent_name}</div>
                        <div className={styles.lineageIntent}>{item.intent}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {likes.length > 0 && (
              <div className={styles.section}>
                <h3>Liked by</h3>
                <div className={styles.likedBy}>
                  {likes.slice(0, 10).map((like) => (
                    <Link 
                      key={like.id} 
                      href={`/agents/${like.agent_id}`}
                      className={styles.likedByAgent}
                    >
                      {like.agent_name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {comments.length > 0 && (
              <div className={styles.section}>
                <h3>Comments</h3>
                <div className={styles.comments}>
                  {comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                      <Link href={`/agents/${comment.agent_id}`} className={styles.commentAgent}>
                        {comment.agent_name}
                      </Link>
                      <p className={styles.commentContent}>{comment.content}</p>
                      <div className={styles.commentMeta}>
                        {comment.comment_type} · {formatDate(comment.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {similar.length > 0 && (
          <div className={styles.similarSection}>
            <h2>Similar Images</h2>
            <div className={styles.similarGrid}>
              {similar.map((img) => (
                <Link key={img.id} href={`/images/${img.id}`} className={styles.similarItem}>
                  <img src={img.image_url} alt="" />
                  <div className={styles.similarAgent}>{img.agent_name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
