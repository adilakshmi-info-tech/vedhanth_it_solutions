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

// Shared product card — used on the Products page grid and on the product
// detail page's Related Products section, so both stay visually identical.
// Mobile (below sm) is a fluid 2-up grid: the card and its image scale with
// the column width instead of using the fixed 268x522/319 desktop sizing, so
// nothing overflows or stretches at narrow widths. sm: and up restores the
// exact original fixed desktop dimensions untouched.
export default function ProductCard({ product }) {
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
            sizes="(max-width: 639px) calc(50vw - 30px), (max-width: 1023px) 42vw, 268px"
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
