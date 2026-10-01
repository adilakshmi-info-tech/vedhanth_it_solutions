import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/data';
import { parseProductContent } from '@/lib/product-content';
import ProductGallery from './ProductGallery';
import ProductReviewForm from './ProductReviewForm';
import styles from './product-detail.module.css';

function getAverageRating(reviews) {
  return reviews.length ? (reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length).toFixed(1) : null;
}

function getProductHighlight(product, categoryName) {
  const resolution = `${product.name} ${product.description || ''}`.match(/\b\d+(?:\.\d+)?\s?MP(?:\s+[\w-]+){0,2}/i)?.[0];
  return resolution || categoryName;
}

function StarRow({ rating, small = false }) {
  const roundedRating = Number(rating);
  const fullStarCount = roundedRating >= 4.95 ? 5 : 4;
  return (
    <span className={`${styles.stars} ${small ? styles.smallStars : ''}`} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: fullStarCount }, (_, star) => <Image key={star} src="/images/product-detail/figma/star-full.svg" alt="" width={24} height={24} />)}
      {fullStarCount < 5 && <Image src="/images/product-detail/figma/star-half.svg" alt="" width={24} height={24} />}
    </span>
  );
}

function Specifications({ rows }) {
  if (!rows.length) return <p className={styles.noSpecifications}>No product specifications have been added yet.</p>;
  return <table className={styles.specifications}>
    <thead><tr><th>Specification</th><th>Details</th></tr></thead>
    <tbody>{rows.map(([label, value], index) => <tr key={`${label}-${index}`}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody>
  </table>;
}

function ReviewCard({ review }) {
  const initials = review.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const date = new Date(review.createdAt);
  return <article className={styles.reviewCard}>
    <div className={styles.reviewHeader}>
      <div className={styles.reviewer}>
        <span className={styles.reviewerInitial} aria-hidden="true">{initials || 'V'}</span>
        <div className={styles.reviewerMeta}><strong>{review.name}</strong><time dateTime={date.toISOString()}>{date.toLocaleDateString('en-IN', { dateStyle: 'medium' })}</time></div>
      </div>
      <span className={styles.reviewRating} aria-label={`${review.rating} out of 5 stars`}><Image src="/images/product-detail/figma/star-full.svg" alt="" width={20} height={20} />{Number(review.rating).toFixed(1)}</span>
    </div>
    <p>{review.comment}</p>
  </article>;
}

function ReviewMarquee({ reviews, reverse = false, label }) {
  return <div className={`${styles.reviewRow} ${reverse ? styles.reverseReviewRow : styles.forwardReviewRow}`}>
    <div className={styles.reviewMarquee}>{[0, 1].map((copy) => <div className={styles.reviewGroup} key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
      {reviews.map((review, index) => <ReviewCard key={`${copy}-${review.name}-${index}`} review={review} />)}
    </div>)}</div><span className={styles.visuallyHidden}>{label}</span>
  </div>;
}

function RelatedProductCard({ product }) {
  const image = product.images?.find(Boolean);
  const productReviews = (product.reviewWorkflows || []).map((workflow) => workflow.review);
  const rating = getAverageRating(productReviews);
  const fullStarCount = rating ? (Number(rating) >= 4.95 ? 5 : 4) : 0;
  return <article className={styles.relatedCard}>
    <Link href={`/products/${product.slug}`} className={styles.relatedImage} aria-label={product.name}>
      <Image src="/images/product-detail/figma/related-card-background.svg" alt="" width={268} height={319} className={styles.cardBackground} />
      {image ? <Image src={image} alt={product.name} width={268} height={319} unoptimized className={styles.relatedProductImage} /> : <span className={styles.imageFallback}>Image unavailable</span>}
    </Link>
    <div className={styles.relatedBody}>
      <span className={styles.relatedCategory}>{product.category?.name || 'Products'}</span>
      <h3>{product.name}</h3>
      {rating ? <span className={styles.relatedStars} aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: fullStarCount }, (_, index) => <Image key={index} src="/images/product-detail/figma/related-star-full.svg" alt="" width={18} height={18} />)}
        {fullStarCount < 5 && <Image src="/images/product-detail/figma/related-star-half.svg" alt="" width={18} height={18} />}
      </span> : <span className={styles.relatedNoRating}>Not rated</span>}
      <Link href="/contact" className={styles.relatedQuote}>Get a Quote</Link>
    </div>
  </article>;
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  const { description } = parseProductContent(product.description || '');
  return { title: product.name, description: description || `${product.name} — ${product.category?.name || 'product'} from Vedhanth IT Solutions.` };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const categoryName = product.category?.name || 'Products';
  const productImages = (product.images || []).filter((image) => typeof image === 'string' && image.trim());
  const productContent = parseProductContent(product.description || '');
  const cleanProduct = { ...product, description: productContent.description };
  const description = productContent.description || product.category?.description || `${product.name} from Vedhanth IT Solutions. Contact our team for product details and availability.`;
  const reviews = (product.reviewWorkflows || []).map((workflow) => workflow.review);
  const rating = getAverageRating(reviews);
  const relatedProducts = await getRelatedProducts(product, 8);
  const savedSpecifications = product.specifications?.length
    ? product.specifications.map(({ label, value }) => [label, value])
    : productContent.specifications.map(({ label, value }) => [label, value]);
  const specs = savedSpecifications;

  return <main className={`${styles.productPage} product-detail-page`}>
    <div className={styles.intro} style={{ '--spec-extra-height': `${Math.max(0, specs.length - 10) * 37}px` }}>
      <div className={styles.introInner}>
        <p className={styles.breadcrumb}>Category / {categoryName} / {product.name}</p>
        <div className={styles.productColumns}>
          <ProductGallery images={productImages} title={product.name} />
          <section className={styles.details}>
            <h1>{product.name}</h1>
            <div className={styles.ratingRow}>
              <div className={styles.ratingGroup}>
                {rating ? <><StarRow rating={rating} /><span>{rating} rating</span></> : <span className={styles.noRating}>No ratings yet</span>}
              </div>
              <span className={styles.verticalDivider} aria-hidden="true" />
              <span className={styles.resolution}>{getProductHighlight(cleanProduct, categoryName)}</span>
            </div>
            <Image className={styles.horizontalDivider} src="/images/product-detail/figma/divider-horizontal.svg" alt="" width={537} height={1} />
            <p className={styles.description}>{description}</p>
            <Link href="/contact" className={styles.primaryQuote}>Get a Quote</Link>
          </section>
          <Specifications rows={specs} />
        </div>
      </div>
    </div>

    <section className={styles.reviews} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading">{product.name} Reviews</h2>
      {reviews.length ? <div className={styles.reviewTrack}>
        <ReviewMarquee reviews={reviews} label="Approved customer reviews, first row" />
        <ReviewMarquee reviews={reviews} reverse label="Approved customer reviews, second row" />
      </div> : <p className={styles.noReviews}>No approved reviews have been added for this product yet.</p>}
      <ProductReviewForm productId={product.id} />
    </section>

    <section className={styles.related} aria-labelledby="related-heading">
      <h2 id="related-heading">Related Products</h2>
      {relatedProducts.length ? <div className={styles.relatedGrid}>{relatedProducts.map((item) => <RelatedProductCard key={item.id} product={item} />)}</div> : <p className={styles.noRelated}>There are no other products in this category yet.</p>}
      <Link href="/products" className={styles.exploreMore}>Explore More</Link>
    </section>

    <section className={styles.enquiry} aria-labelledby="enquiry-heading">
      <h2 id="enquiry-heading">Need Help Choosing the Right System?</h2>
      <p>Tell us what your business needs, and our team will recommend the right security, electrical,<br className={styles.desktopBreak} /> networking, or IT solution.</p>
      <Link href="/contact" className={styles.enquiryLink}><span>Send Enquiry</span><span className={styles.enquiryArrow}><Image src="/images/product-detail/figma/contact-arrow.svg" alt="" width={24} height={24} /></span></Link>
    </section>
  </main>;
}
