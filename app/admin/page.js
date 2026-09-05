'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ categories: 0, products: 0, reviews: 0 });

  useEffect(() => {
    async function load() {
      const [cats, prods, revs] = await Promise.all([
        getDocs(collection(db, 'categories')),
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'reviews')),
      ]);
      setCounts({ categories: cats.size, products: prods.size, reviews: revs.size });
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <div className="font-display text-3xl text-navy-900">{counts.categories}</div>
          <div className="text-sm text-inksoft mt-1">Categories</div>
        </div>
        <div className="card">
          <div className="font-display text-3xl text-navy-900">{counts.products}</div>
          <div className="text-sm text-inksoft mt-1">Products</div>
        </div>
        <div className="card">
          <div className="font-display text-3xl text-navy-900">{counts.reviews}</div>
          <div className="text-sm text-inksoft mt-1">Reviews</div>
        </div>
      </div>
    </div>
  );
}
