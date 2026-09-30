'use client';

// Seamless infinite horizontal scroller. Renders `children` twice back-to-back
// and animates the track by exactly -50%, so the loop point is invisible
// regardless of how many items are passed in. Pauses on hover (see
// .marquee-track in globals.css) and respects prefers-reduced-motion.
export default function Marquee({ children, gap = 24, speed = 40, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max"
        style={{ gap: `${gap}px`, animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
