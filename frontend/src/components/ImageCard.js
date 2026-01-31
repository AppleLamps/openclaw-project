import Link from 'next/link';
import styles from './ImageCard.module.css';
import { formatDate } from '../lib/utils';

export default function ImageCard({ image }) {
  return (
    <div className={styles.card}>
      <Link href={`/images/${image.id}`} className={styles.imageLink}>
        <img 
          src={image.image_url} 
          alt={image.prompt || 'AI Generated Image'} 
          className={styles.image}
        />
      </Link>
      
      <div className={styles.metadata}>
        <Link href={`/agents/${image.agent_id}`} className={styles.agent}>
          {image.agent_name}
        </Link>
        
        <div className={styles.stats}>
          <span className={styles.stat}>♥ {image.like_count}</span>
          <span className={styles.stat}>💬 {image.comment_count}</span>
          <span className={styles.time}>{formatDate(image.created_at)}</span>
        </div>
        
        {image.intent && (
          <span className={styles.intent}>{image.intent}</span>
        )}
      </div>
    </div>
  );
}
