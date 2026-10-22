import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductDetail } from '@/lib/data';
import { parseProductContent } from '@/lib/product-content';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import ProductCard from '@/components/ProductCard';
import ProductGallery from './ProductGallery';
import styles from './product-detail.module.css';

function getProductHighlight(product, categoryName) {
  const resolution = `${product.name} ${product.description || ''}`.match(/\b\d+(?:\.\d+)?\s?MP(?:\s+[\w-]+){0,2}/i)?.[0];
  return resolution || categoryName;
}

function Specifications({ rows }) {
  if (!rows.length) return <p className={styles.noSpecifications}>No product specifications have been added yet.</p>;
  return <table className={styles.specifications}>
    <thead><tr><th>Specification</th><th>Details</th></tr></thead>
    <tbody>{rows.map(([label, value], index) => <tr key={`${label}-${index}`}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody>
  </table>;
}

async function getProductDetailOrNull(slug) {
  try {
    return await getProductDetail(slug);
  } catch {
    return null; // backend returns a 404 for an unknown slug, surfaced here as a thrown error
  }
}

export async function generateMetadata({ params }) {
  const detail = await getProductDetailOrNull(params.slug);
  if (!detail) return { title: 'Product not found', robots: { index: false } };
  const { product } = detail;
  const { description } = parseProductContent(product.description || '');
  const summary = description || `${product.name} — ${product.category?.name || 'product'} from ${SITE_NAME}.`;
  const image = (product.images || []).find((item) => typeof item === 'string' && item.trim());
  const path = `/products/${product.slug}`;
  return {
    title: product.name,
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      title: product.name,
      description: summary,
      url: path,
      type: 'website',
      ...(image ? { images: [{ url: absoluteUrl(image), alt: product.name }] } : {}),
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title: product.name, description: summary, ...(image ? { images: [absoluteUrl(image)] } : {}) },
  };
}

export default async function ProductDetailPage({ params }) {
  const detail = await getProductDetailOrNull(params.slug);
  if (!detail) notFound();
  const { product, relatedProducts } = detail;

  const categoryName = product.category?.name || 'Products';
  const productImages = (product.images || []).filter((image) => typeof image === 'string' && image.trim());
  const productContent = parseProductContent(product.description || '');
  const cleanProduct = { ...product, description: productContent.description };
  const description = productContent.description || product.category?.description || `${product.name} from Vedhanth IT Solutions. Contact our team for product details and availability.`;
  const savedSpecifications = product.specifications?.length
    ? product.specifications.map(({ label, value }) => [label, value])
    : productContent.specifications.map(({ label, value }) => [label, value]);
  const specs = savedSpecifications;
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    category: categoryName,
    url: absoluteUrl(`/products/${product.slug}`),
    brand: { '@type': 'Brand', name: SITE_NAME },
    ...(productImages.length ? { image: productImages.map((image) => absoluteUrl(image)) } : {}),
  };

  return <main className={`${styles.productPage} product-detail-page`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    <div className={styles.intro} style={{ '--spec-extra-height': `${Math.max(0, specs.length - 10) * 37}px` }}>
      <div className={styles.introInner}>
        <p className={styles.breadcrumb}>Category / {categoryName} / {product.name}</p>
        <div className={styles.productColumns}>
          <ProductGallery images={productImages} title={product.name} />
          <section className={styles.details}>
            <h1>{product.name}</h1>
            <div className={styles.ratingRow}>
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

    <section className={styles.related} aria-labelledby="related-heading">
      <h2 id="related-heading">Related Products</h2>
      {relatedProducts.length ? (
        <div className="w-[min(100%_-_48px,1200px)] mx-auto mt-[50px] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-[42px] gap-y-4 sm:gap-y-[50px]">
          {relatedProducts.map((item) => <ProductCard key={item.id} product={{ ...item, categoryName: item.category?.name || 'Products' }} />)}
        </div>
      ) : <p className={styles.noRelated}>There are no other products in this category yet.</p>}
      <Link href="/products" className={styles.exploreMore}>Explore More</Link>
    </section>

    <section className={styles.enquiry} aria-labelledby="enquiry-heading">
      <h2 id="enquiry-heading">Need Help Choosing the Right System?</h2>
      <p>Tell us what your business needs, and our team will recommend the right security, electrical,<br className={styles.desktopBreak} /> networking, or IT solution.</p>
      <Link href="/contact" className={styles.enquiryLink}><span>Send Enquiry</span><span className={styles.enquiryArrow}><Image src="/images/product-detail/figma/contact-arrow.svg" alt="" width={24} height={24} /></span></Link>
    </section>
  </main>;
}
