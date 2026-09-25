import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data';

// Server-rendered per request from the live database.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.description || `${product.name} — available from Vedhanth IT Solutions, Bengaluru.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-8 grid md:grid-cols-2 gap-10">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-navy-100">
          {product.images?.[0] && (
            <Image src={product.images[0]} alt={product.name} fill unoptimized className="object-cover" />
          )}
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
