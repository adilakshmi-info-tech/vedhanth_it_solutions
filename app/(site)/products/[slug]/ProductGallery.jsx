'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './product-detail.module.css';

export default function ProductGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image src={activeImage} alt={title} fill priority unoptimized sizes="(max-width: 760px) 100vw, 573px" />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnails} aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`${styles.thumbnail} ${index === activeIndex ? styles.activeThumbnail : ''}`}
            >
              <Image src={image} alt="" fill unoptimized sizes="100px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
