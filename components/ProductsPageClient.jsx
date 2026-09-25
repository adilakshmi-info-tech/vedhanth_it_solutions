'use client';
import { useLayoutEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5 text-accent-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 sm:w-[18px] sm:h-[18px]" viewBox="0 0 20 20" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={i < rating ? 0 : 1.2}>
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function FilterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

// Mobile (below sm) is a fluid 2-up grid: the card and its image scale with
// the column width instead of using the fixed 268x522/319 desktop sizing, so
// nothing overflows or stretches at narrow widths. sm: and up restores the
// exact original fixed desktop dimensions untouched.
function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group w-full sm:max-w-[268px] h-auto sm:h-[522px] bg-white rounded-[14px] sm:rounded-[20px] overflow-hidden flex flex-col mx-auto"
    >
      <div className="relative w-full aspect-[268/319] sm:aspect-auto sm:h-[319px] bg-[#fafafa] shrink-0">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
      </div>
      <div className="px-3 pt-1.5 pb-3 sm:px-[21px] sm:pt-1 sm:pb-0">
        <p className="text-[#8d8d8d] text-[11px] sm:text-[16.7px] truncate">{product.categoryName}</p>
        <h3 className="font-semibold text-[13px] sm:text-[21px] text-[#0d1b39] mt-1 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-1.5 sm:mt-4">
          <Stars rating={5} />
        </div>
        <span className="inline-block mt-2 sm:mt-[26px] text-accent-500 font-semibold text-[12px] sm:text-[15px]">
          Get a Quote
        </span>
      </div>
    </Link>
  );
}

function SidebarContent({ withProducts, selected, toggleCategory, onReset }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1e1e1e]">Filters</h2>
        <button
          onClick={onReset}
          className="h-8 px-3 rounded-md border border-slate-200 text-xs font-medium text-[#1e1e1e]/70 hover:border-slate-300 hover:text-[#1e1e1e] transition"
        >
          Reset Filters
        </button>
      </div>

      <hr className="border-slate-200 mt-6" />

      <div className="mt-6">
        <h3 className="text-xl font-bold text-[#1e1e1e]">Category</h3>
        <div className="mt-3 flex flex-col gap-1">
          {withProducts.map((cat) => {
            const checked = selected.includes(cat.name);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-3 py-2 cursor-pointer select-none rounded-lg px-2 -mx-2 hover:bg-slate-50 transition"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat.name)}
                  className="w-4 h-4 accent-accent-500 shrink-0"
                />
                <span className={`flex-1 text-[15px] ${checked ? 'font-semibold text-[#1e1e1e]' : 'text-[#1e1e1e]/80'}`}>
                  {cat.name}
                </span>
                <span className="inline-flex items-center justify-center min-w-[26px] h-[22px] px-1.5 rounded-full bg-[#f0f0f0] text-xs font-medium text-[#1e1e1e]/70">
                  {cat.products.length}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function ProductsPageClient({ categories = [] }) {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  // Default open on desktop, closed (drawer) on mobile — set before paint so
  // there's no visible flash of a missing sidebar on desktop load.
  useLayoutEffect(() => {
    if (window.innerWidth >= 1024) setOpen(true);
  }, []);

  const withProducts = useMemo(() => categories.filter((c) => c.products.length > 0), [categories]);

  const allProducts = useMemo(
    () =>
      withProducts.flatMap((cat) =>
        (cat.products || []).map((p) => ({ ...p, categoryName: cat.name }))
      ),
    [withProducts]
  );

  const displayProducts = selected.length
    ? allProducts.filter((p) => selected.includes(p.categoryName))
    : allProducts;

  const toggleCategory = (name) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const sidebarProps = { withProducts, selected, toggleCategory, onReset: () => setSelected([]) };

  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-start">
        {/* Desktop sidebar — sticky, width-collapses smoothly when toggled off */}
        <aside
          className={`hidden lg:block shrink-0 bg-white border-r border-slate-100 sticky top-20 self-start max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden transition-[width,opacity,padding] duration-300 ease-in-out ${
            open ? 'w-[300px] opacity-100 px-6 py-8' : 'w-0 opacity-0 px-0 py-8 border-r-0 pointer-events-none'
          }`}
        >
          <div className="w-[252px]">
            <SidebarContent {...sidebarProps} />
          </div>
        </aside>

        {/* Mobile filter drawer */}
        <div
          className={`lg:hidden fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
          aria-hidden={!open}
        >
          <div
            className={`absolute inset-0 bg-[#0a1628]/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setOpen(false)}
          />
          <div
            className={`absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl overflow-y-auto px-6 py-6 transition-transform duration-300 ease-in-out ${
              open ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#1e1e1e]/50 uppercase tracking-wide">Filter Products</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition text-[#1e1e1e]"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent {...sidebarProps} />
          </div>
        </div>

        {/* Product grid */}
        <main className="flex-1 min-w-0 bg-[#f7f7f7] px-6 py-6 lg:pl-10 lg:pr-10 lg:py-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[28px] md:text-[32px] font-bold text-[#1e1e1e]">Our Products</h1>
              <p className="text-[#1e1e1e]/60 mt-2">
                Showing {displayProducts.length} product{displayProducts.length === 1 ? '' : 's'}
              </p>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-pressed={open}
              className="shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-slate-200 text-sm font-semibold text-[#1e1e1e] shadow-sm hover:border-accent-500 hover:text-accent-600 transition"
            >
              <FilterIcon className="w-4 h-4" />
              Filters
              {selected.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-accent-500 text-white text-[10px] font-bold">
                  {selected.length}
                </span>
              )}
            </button>
          </div>

          {displayProducts.length > 0 ? (
            <div
              className={`grid grid-cols-2 sm:grid-cols-2 gap-x-3 sm:gap-x-[42px] gap-y-4 sm:gap-y-[50px] ${
                open ? 'lg:grid-cols-3' : 'lg:grid-cols-4 lg:gap-x-6'
              }`}
            >
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-[#1e1e1e]/60 py-20 text-center">No products match the selected filters.</p>
          )}
        </main>
      </div>
    </div>
  );
}
