import Image from 'next/image';

// Shared presentation for product photos. The parent owns the frame size and
// clipping, while this image preserves the source proportions in every view.
export default function ProductImage({ alt = '', className = '', paddingClassName = 'p-3 sm:p-5', ...imageProps }) {
  return (
    <Image
      unoptimized
      {...imageProps}
      alt={alt}
      className={`object-contain object-center !transform-none ${paddingClassName} ${className}`.trim()}
    />
  );
}
