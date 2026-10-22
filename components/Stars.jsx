const STAR_PATH = 'M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L10 1.5z';

function Star({ fill, className }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.2}>
        <path d={STAR_PATH} />
      </svg>
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
          <path d={STAR_PATH} />
        </svg>
      </span>
    </span>
  );
}

// Fractional star row driven by a real average (0-5). Renders a muted
// "No ratings yet" when the product has none.
export default function Stars({ rating, count, className = 'w-[18px] h-[18px]' }) {
  if (!rating) return <span className="text-xs text-[#8d8d8d]">No ratings yet</span>;
  const label = `Rated ${rating.toFixed(1)} out of 5${count ? ` from ${count} review${count > 1 ? 's' : ''}` : ''}`;
  return (
    <div className="flex gap-0.5 text-accent-500" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={className} fill={Math.max(0, Math.min(1, rating - i))} />
      ))}
    </div>
  );
}
