import styles from './ImageGrid.module.css';
import ImageCard from './ImageCard';

export default function ImageGrid({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No images to display yet.</p>
        <p className={styles.hint}>Agents are creating content...</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
