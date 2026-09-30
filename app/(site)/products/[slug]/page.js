import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCatalog, getProductBySlug } from '@/lib/data';
import ProductGallery from './ProductGallery';
import styles from './product-detail.module.css';

const productTitle = 'CP PLUS 2MP Full HD Dome CCTV Camera';
const productDescription =
  'A reliable CP PLUS dome camera designed for homes, offices, shops, and commercial spaces. It provides clear Full HD video, dependable day and night monitoring, and a compact indoor or outdoor installation design.';

const specificationRows = [
  ['Brand', 'CP PLUS'],
  ['Camera Type', 'Dome CCTV Camera'],
  ['Resolution', '2MP Full HD'],
  ['Lens', 'Fixed Lens'],
  ['Night Vision', 'Infrared Night Vision'],
  ['Connectivity', 'Wired BNC Connection'],
  ['Use', 'Home, Office, Shop, and Commercial Areas'],
  ['Installation', 'Wall or Ceiling Mounted'],
];

const reviews = [
  {
    name: 'Rajesh Kumar',
    date: 'September 18, 2026',
    rating: '4.9',
    avatar: '/images/product-detail/figma/reviewer-rajesh.png',
    comment:
      'Vedhanth handled our CCTV and networking installation professionally. The team understood our requirements, completed the work on time, and provided excellent support after installation.',
  },
  {
    name: 'Priya Nair',
    date: 'September 10, 2026',
    rating: '4.9',
    avatar: '/images/product-detail/figma/reviewer-priya.png',
    comment:
      'We received reliable electrical and security solutions for our office. The installation was neat, the team was responsive, and the overall service was smooth from start to finish.',
  },
  {
    name: 'Sneha Rao',
    date: 'August 28, 2026',
    rating: '4.9',
    avatar: '/images/product-detail/figma/reviewer-sneha.png',
    comment:
      'Vedhanth provided a complete networking and CCTV setup for our business. Their technical knowledge and attention to detail made the entire process easy and dependable.',
  },
  {
    name: 'Arjun Mehta',
    date: 'August 16, 2026',
    rating: '4.8',
    avatar: '/images/product-detail/figma/reviewer-arjun.png',
    comment:
      'Professional service and quick support. The biometric access system was installed correctly, explained clearly, and has been working reliably.',
  },
  {
    name: 'Ananya Rao',
    date: 'August 02, 2026',
    rating: '4.9',
    avatar: '/images/product-detail/figma/reviewer-extra.png',
    comment:
      'The CCTV installation was completed neatly and the team explained everything clearly. The system has been working perfectly.',
  },
  {
    name: 'Vikram Shah',
    date: 'July 24, 2026',
    rating: '5.0',
    avatar: '/images/product-detail/figma/reviewer-rajesh.png',
    comment:
      'Vedhanth delivered a reliable networking setup for our office with excellent cable management and quick support.',
  },
  {
    name: 'Meera Iyer',
    date: 'July 11, 2026',
    rating: '4.9',
    avatar: '/images/product-detail/figma/reviewer-priya.png',
    comment:
      'Their biometric access-control installation was smooth, professional, and easy for our staff to use.',
  },
  {
    name: 'Karan Nair',
    date: 'June 28, 2026',
    rating: '4.8',
    avatar: '/images/product-detail/figma/reviewer-arjun.png',
    comment:
      'The electrical work was completed safely and on schedule. The team was responsive throughout the project.',
  },
  {
    name: 'Divya Menon',
    date: 'June 16, 2026',
    rating: '5.0',
    avatar: '/images/product-detail/figma/reviewer-sneha.png',
    comment:
      'We received excellent AMC support and quick troubleshooting whenever we needed assistance.',
  },
  {
    name: 'Rohit Verma',
    date: 'May 30, 2026',
    rating: '4.9',
    avatar: '/images/product-detail/figma/reviewer-extra.png',
    comment:
      'The fire-alarm system was installed professionally with clear guidance on operation and maintenance.',
  },
  {
    name: 'Pooja Shetty',
    date: 'May 14, 2026',
    rating: '4.8',
    avatar: '/images/product-detail/figma/reviewer-priya.png',
    comment:
      'The laptop and desktop service was fast, transparent, and handled with great technical knowledge.',
  },
  {
    name: 'Sanjay Kulkarni',
    date: 'April 29, 2026',
    rating: '4.9',
    avatar: '/images/product-detail/figma/reviewer-rajesh.png',
    comment:
      'The EPABX installation improved communication across our office. The setup was clean and dependable.',
  },
];

const relatedCards = [
  { title: 'CCTV Camera Systems', category: 'CCTV', image: 'related-camera-1.png', width: 183, height: 183, top: 80, match: /dome camera/i },
  { title: 'Apna Cam CCTV', category: 'CCTV', image: 'related-camera-2.png', width: 220, height: 220, top: 59, match: /apnacam/i },
  { title: 'Prama CCTV', category: 'CCTV', image: 'related-camera-3.png', width: 189, height: 189, top: 91, match: /prama.*dome/i },
  { title: 'HIKVISION CCTV', category: 'CCTV', image: 'related-camera-4.png', width: 246, height: 267, top: 23, match: /hikvision.*solar/i },
  { title: 'CCTV Camera Systems', category: 'CCTV', image: 'related-camera-9.png', width: 97, height: 140, top: 103, match: /hikvision.*bullet/i },
  { title: 'Biometric Attendance', category: 'CCTV', image: 'related-camera-7.png', width: 180, height: 180, top: 83, match: /biometric.*attendance/i },
  { title: 'Networking Equipment', category: 'Networking', image: 'related-camera-8.png', width: 169, height: 134, top: 98, match: /network/i },
  { title: 'Prama CCTV', category: 'CCTV', image: 'related-camera-6.png', width: 131, height: 131, top: 95, match: /prama.*bullet/i },
];

function matchesProduct(product, expression) {
  return expression.test(`${product.name} ${product.category?.name || ''}`);
}

function StarRow({ half = false, small = false }) {
  return (
    <span className={`${styles.stars} ${small ? styles.smallStars : ''}`} aria-label="Rated 4.8 out of 5">
      {[0, 1, 2, 3].map((star) => (
        <Image key={star} src="/images/product-detail/figma/star-full.svg" alt="" width={24} height={24} />
      ))}
      <Image
        src={half ? '/images/product-detail/figma/star-half.svg' : '/images/product-detail/figma/star-full.svg'}
        alt=""
        width={24}
        height={24}
      />
    </span>
  );
}

function Specifications() {
  return (
    <table className={styles.specifications}>
      <thead>
        <tr><th>Specification</th><th>Details</th></tr>
      </thead>
      <tbody>
        {specificationRows.map(([label, value]) => (
          <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

function ReviewCard({ review }) {
  return (
    <article className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewer}>
          <Image src={review.avatar} alt="" width={41} height={41} />
          <div className={styles.reviewerMeta}>
            <strong>{review.name}</strong>
            <time>{review.date}</time>
          </div>
        </div>
        <span className={styles.reviewRating}>
          <Image src="/images/product-detail/figma/star-full.svg" alt="" width={20} height={20} />
          {review.rating}
        </span>
      </div>
      <p>{review.comment}</p>
    </article>
  );
}

function ReviewMarquee({ reviews, reverse = false, label }) {
  return (
    <div className={`${styles.reviewRow} ${reverse ? styles.reverseReviewRow : styles.forwardReviewRow}`}>
      <div className={styles.reviewMarquee}>
        {[0, 1].map((copy) => (
          <div className={styles.reviewGroup} key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {reviews.map((review, index) => (
              <ReviewCard key={`${copy}-${review.name}-${index}`} review={review} />
            ))}
          </div>
        ))}
      </div>
      <span className={styles.visuallyHidden}>{label}</span>
    </div>
  );
}

function RelatedProductCard({ item, product }) {
  return (
    <article className={styles.relatedCard}>
      <Link href={product ? `/products/${product.slug}` : '/contact'} className={styles.relatedImage} aria-label={item.title}>
        <Image
          src="/images/product-detail/figma/related-card-background.svg"
          alt=""
          width={268}
          height={319}
          className={styles.cardBackground}
        />
        {item.image && (
          <Image
            src={`/images/product-detail/figma/${item.image}`}
            alt={item.title}
            width={item.width}
            height={item.height}
            className={styles.relatedProductImage}
            style={{ top: item.top, width: item.width, height: item.height }}
          />
        )}
      </Link>
      <div className={styles.relatedBody}>
        <span className={styles.relatedCategory}>{item.category}</span>
        <h3>{item.title}</h3>
        <span className={styles.relatedStars} aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, index) => (
            <Image key={index} src="/images/product-detail/figma/related-star-full.svg" alt="" width={18} height={18} />
          ))}
        </span>
        <Link href="/contact" className={styles.relatedQuote}>Get a Quote</Link>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  const isDomeCamera = /dome/i.test(product.name) && /camera|cctv/i.test(product.name);
  return {
    title: isDomeCamera ? productTitle : product.name,
    description: isDomeCamera ? productDescription : product.description || `${product.name} — available from Vedhanth IT Solutions, Bengaluru.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const isDomeCamera = /dome/i.test(product.name) && /camera|cctv/i.test(product.name);
  if (!isDomeCamera) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8 grid md:grid-cols-2 gap-10">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-navy-100">
            {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill unoptimized className="object-cover" />}
          </div>
          <div>
            <h1 className="font-display font-extrabold text-3xl text-navy-900 mb-4 tracking-tight">{product.name}</h1>
            <p className="text-inksoft leading-relaxed mb-8">{product.description}</p>
            <div className="flex gap-3 flex-wrap">
              <a href="tel:+917483528453" className="btn btn-primary">Call for pricing</a>
              <a href="https://wa.me/917483528453" className="btn btn-ghost">WhatsApp us</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categories = await getCatalog();

  const catalogProducts = categories.flatMap((category) =>
    category.products.map((entry) => ({ ...entry, category }))
  );
  const fallbackProductImage = '/images/product-detail/figma/camera-main.png';
  const catalogImages = product.images?.filter(Boolean) || [];
  // Figma's exact cutout is the designed presentation of this same dome camera.
  // Keep one clean hero image; when the product record has multiple views, the
  // gallery switches to those data-backed images and exposes selectable thumbs.
  const productImages = catalogImages.length > 1 ? catalogImages : [fallbackProductImage];
  const cards = relatedCards.map((item) => ({
    ...item,
    product: catalogProducts.find((entry) => entry.slug !== product.slug && matchesProduct(entry, item.match)) || null,
  }));

  return (
    <main className={`${styles.productPage} product-detail-page`}>
      <div className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.breadcrumb}>Category / CCTV &amp; Security / Dome Camera</p>
          <div className={styles.productColumns}>
            <ProductGallery images={productImages} title={isDomeCamera ? productTitle : product.name} />
            <section className={styles.details}>
              <h1>{isDomeCamera ? productTitle : product.name}</h1>
              <div className={styles.ratingRow}>
                <div className={styles.ratingGroup}>
                  <StarRow half />
                  <span>4.8 rating</span>
                </div>
                <span className={styles.verticalDivider} aria-hidden="true" />
                <span className={styles.resolution}>2MP Full HD</span>
              </div>
              <Image className={styles.horizontalDivider} src="/images/product-detail/figma/divider-horizontal.svg" alt="" width={537} height={1} />
              <p className={styles.description}>{isDomeCamera ? productDescription : product.description}</p>
              <Link href="/contact" className={styles.primaryQuote}>Get a Quote</Link>
            </section>
            <Specifications />
          </div>
        </div>
      </div>

      <section className={styles.reviews} aria-labelledby="reviews-heading">
        <h2 id="reviews-heading">Reviews &amp; Rating</h2>
        <div className={styles.reviewTrack}>
          <ReviewMarquee reviews={reviews} label="Customer reviews, first row" />
          <ReviewMarquee reviews={reviews} reverse label="Customer reviews, second row" />
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-heading">
        <h2 id="related-heading">Related Products</h2>
        <div className={styles.relatedGrid}>
          {cards.map((item, index) => <RelatedProductCard key={`${item.title}-${index}`} item={item} product={item.product} />)}
        </div>
        <Link href="/products" className={styles.exploreMore}>Explore More</Link>
      </section>

      <section className={styles.enquiry} aria-labelledby="enquiry-heading">
        <h2 id="enquiry-heading">Need Help Choosing the Right System?</h2>
        <p>Tell us what your business needs, and our team will recommend the right security, electrical,<br className={styles.desktopBreak} /> networking, or IT solution.</p>
        <Link href="/contact" className={styles.enquiryLink}>
          <span>Send Enquiry</span>
          <span className={styles.enquiryArrow}><Image src="/images/product-detail/figma/contact-arrow.svg" alt="" width={24} height={24} /></span>
        </Link>
      </section>
    </main>
  );
}
