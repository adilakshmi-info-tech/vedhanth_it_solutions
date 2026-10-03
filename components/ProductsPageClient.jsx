'use client';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';

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

function SidebarContent({ withProducts, selected, toggleCategory, onReset }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1e1e1e]">Filters</h2>
        <button
          onClick={onReset}
          className="products-reset-button h-8 px-3 rounded-md border border-slate-200 text-xs font-medium text-[#1e1e1e]/70 hover:border-slate-300 hover:text-[#1e1e1e] transition"
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
                className="products-filter-option flex items-center gap-3 py-2 cursor-pointer select-none rounded-lg px-2 -mx-2 hover:bg-slate-50 transition"
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

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

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
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
            className={`products-filter-drawer absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl overflow-y-auto px-6 py-6 transition-transform duration-300 ease-in-out ${
              open ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#1e1e1e]/50 uppercase tracking-wide">Filter Products</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="products-filter-close w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition text-[#1e1e1e]"
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
              className="products-filter-toggle shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-slate-200 text-sm font-semibold text-[#1e1e1e] shadow-sm hover:border-accent-500 hover:text-accent-600 transition"
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
