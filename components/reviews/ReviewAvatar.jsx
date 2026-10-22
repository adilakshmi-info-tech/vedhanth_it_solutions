import Image from 'next/image';
import { getReviewAvatarPath } from '@/lib/review-avatar';

export default function ReviewAvatar({ style, alt = '', className, width = 72, height = 72, sizes, fill = false }) {
  return <Image
    className={className}
    src={getReviewAvatarPath(style)}
    alt={alt}
    {...(fill ? { fill: true } : { width, height })}
    sizes={sizes || `${width}px`}
  />;
}
