'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [catSnap, prodSnap] = await Promise.all([
        getDocs(query(collection(db, 'categories'), orderBy('name'))),
        getDocs(query(collection(db, 'products'), orderBy('name'))),
      ]);
      setCategories(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setProducts(prodSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-600">Solutions</span>
          <h1 className="font-display text-4xl text-navy-900 mt-3">Our Products</h1>
          <p className="text-inksoft mt-4">
            Browse by category, or call/WhatsApp us directly if you'd rather just describe what you need.
          </p>
        </div>

        {loading && <p className="text-center text-inksoft">Loading products…</p>}

        {!loading && categories.length === 0 && (
          <p className="text-center text-inksoft">
            No categories added yet — add some from the admin panel at <code>/admin/categories</code>.
          </p>
        )}

        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.categoryId === cat.id);
          if (catProducts.length === 0) return null;
          return (
            <div key={cat.id} className="mb-16">
              <h2 className="font-display text-2xl text-navy-900 mb-1">{cat.name}</h2>
              {cat.description && <p className="text-inksoft text-sm mb-6">{cat.description}</p>}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {catProducts.map((p) => (
                  <Link href={`/products/${p.slug}`} key={p.id} className="card text-left block">
                    {p.images?.[0] && (
                      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-navy-100">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                    )}
                    <h3 className="font-semibold text-navy-900 text-[15px]">{p.name}</h3>
                    <p className="text-[13px] text-inksoft mt-1 line-clamp-2">{p.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
