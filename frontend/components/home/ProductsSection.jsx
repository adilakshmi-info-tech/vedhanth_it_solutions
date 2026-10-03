'use client';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Marquee from '@/components/Marquee';

function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5 text-accent-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={i < rating ? 0 : 1.2}>
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group shrink-0 w-[268px] h-[522px] bg-white rounded-[20px] overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-[319px] bg-white">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="268px"
            unoptimized
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
      </div>
      <div className="px-6 pt-5">
        <p className="text-[#8d8d8d] text-[16.7px]">{product.categoryName}</p>
        <h3 className="font-semibold text-[21px] text-[#0d1b39] mt-1 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-4">
          <Stars rating={5} />
        </div>
        <span className="inline-block mt-5 text-accent-500 font-semibold text-[15px]">
          Get a Quote
        </span>
      </div>
    </Link>
  );
}

// Single-row pill tab bar with a sliding active-pill indicator (measured off
// the real button widths, so it works for any label length) instead of the
// indicator being just a background class swap.
function CategoryTabs({ tabs, active, onChange }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const btn = buttonRefs.current[active];
    const container = containerRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicator({
      left: btnRect.left - containerRect.left + container.scrollLeft,
      width: btnRect.width,
      ready: true,
    });
  }, [active, tabs]);

  return (
    <div className="flex justify-center mt-10 mb-14 px-6">
      <div
        ref={containerRef}
        className="relative inline-flex items-center bg-[#eee] rounded-[44px] p-1.5 max-w-full overflow-x-auto no-scrollbar"
      >
        <span
          className={`absolute top-1.5 bottom-1.5 rounded-[32px] bg-white shadow-sm ${
            indicator.ready ? 'transition-all duration-300 ease-out' : ''
          }`}
          style={{ left: indicator.left, width: indicator.width }}
        />
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={(el) => { buttonRefs.current[tab] = el; }}
            onClick={() => onChange(tab)}
            className={`relative z-10 shrink-0 whitespace-nowrap h-[45px] px-6 rounded-[32px] text-[15px] md:text-[18px] transition-colors duration-300 ${
              active === tab ? 'font-medium text-[#1e1e1e]' : 'text-[#1e1e1e]/70 hover:text-[#1e1e1e]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

// The homepage teaser only ever shows these four tabs (matches the Figma
// pill component, node 2723:893, exactly — labels and order). Each is
// matched against the real catalog's category names, since the database's
// full category names ("CCTV & Security Cameras", etc.) are longer than
// the short labels Figma uses here.
const FIGMA_TABS = [
  { label: 'CCTV', match: /cctv/i },
  { label: 'Biometric', match: /biometric/i },
  { label: 'Fire Alarm', match: /fire/i },
  { label: 'Network', match: /intercom|epabx|network/i },
];

export default function ProductsSection({ categories = [] }) {
  const allProducts = categories.flatMap((cat) =>
    (cat.products || []).map((p) => ({ ...p, categoryName: cat.name }))
  );

  const tabs = useMemo(
    () => FIGMA_TABS.filter((tab) => allProducts.some((p) => tab.match.test(p.categoryName))).map((t) => t.label),
    [allProducts]
  );
  const [active, setActive] = useState(tabs[0]);

  const activeMatch = FIGMA_TABS.find((t) => t.label === active)?.match;
  const displayProducts = activeMatch
    ? allProducts.filter((p) => activeMatch.test(p.categoryName))
    : allProducts;

  if (allProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-center font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e]">Our Products</h2>

        <CategoryTabs tabs={tabs} active={active} onChange={setActive} />

        <Marquee
          key={active}
          gap={42}
          speed={Math.max(displayProducts.length * 4, 20)}
          className="animate-fadeIn [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]"
        >
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Marquee>

        <div className="text-center mt-10">
          <Link href="/products" className="link-accent">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
