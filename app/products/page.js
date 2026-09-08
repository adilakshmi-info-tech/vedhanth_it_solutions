import Link from 'next/link';
import Image from 'next/image';
import { getCatalog } from '@/lib/data';

export const metadata = {
  title: 'Products',
  description:
    'Browse CCTV cameras, networking equipment and biometric access-control products from Vedhanth IT Solutions, Bengaluru.',
};

// Server-rendered per request from the live database.
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const categories = await getCatalog();
  const withProducts = categories.filter((c) => c.products.length > 0);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-600">Catalog</span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-navy-900 mt-3 tracking-tight">Our Products</h1>
          <p className="text-inksoft mt-4">
            Browse by category, or call/WhatsApp us directly if you&apos;d rather just describe what you need.
          </p>
        </div>

        {withProducts.length === 0 && (
          <p className="text-center text-inksoft">
            No products added yet — add some from the admin panel at <code>/admin/products</code>.
          </p>
        )}

        {withProducts.map((cat) => (
          <div key={cat.id} className="mb-16">
            <h2 className="font-display font-extrabold text-2xl text-navy-900 mb-1 tracking-tight">{cat.name}</h2>
            {cat.description && <p className="text-inksoft text-sm mb-6">{cat.description}</p>}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {cat.products.map((p) => (
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
        ))}
      </div>
    </section>
  );
}
