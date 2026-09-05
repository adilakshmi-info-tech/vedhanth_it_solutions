'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'products'), where('slug', '==', slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setProduct({ id: snap.docs[0].id, ...snap.docs[0].data() });
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <section className="py-20 text-center text-inksoft">Loading…</section>;
  if (!product) return <section className="py-20 text-center text-inksoft">Product not found.</section>;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-8 grid md:grid-cols-2 gap-10">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-navy-100">
          {product.images?.[0] && (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl text-navy-900 mb-4">{product.name}</h1>
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
