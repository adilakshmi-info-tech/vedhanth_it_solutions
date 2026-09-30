import Image from 'next/image';
import Marquee from '@/components/Marquee';

function Stars({ rating = 4 }) {
  return (
    <div className="flex gap-0.5 justify-center text-accent-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={i < rating ? 0 : 1.2}>
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

// Exact "Union" notch shape pulled from Figma (node 2723:1133): a white card
// whose top edge curves up and around the avatar circle instead of the
// avatar simply floating over a plain rounded rectangle. The notch cap is a
// fixed-height SVG (so the curve never distorts); the body below it is a
// normal flow div that grows to fit whatever review text is passed in.
function ReviewCard({ name, role, comment, rating, photo, avatar }) {
  return (
    <div className="shrink-0 w-[300px] sm:w-[340px] md:w-[370px]">
      <div className="relative aspect-[370/476] rounded-[10px] overflow-hidden shadow-lg">
        <Image src={photo} alt="" fill sizes="370px" className="object-cover" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] drop-shadow-[0_20px_45px_rgba(25,58,75,0.35)]">
          <svg viewBox="0 0 334 70" preserveAspectRatio="none" className="block w-full h-[70px]">
            <path
              d="M167 0C179.67 0 190.673 7.14061 196.203 17.6171C200.251 25.286 202.275 29.1204 203.466 30.2512C204.997 31.7055 205.153 31.7994 207.154 32.4748C208.71 33 211.14 33 216 33H305.011C315.158 33 320.232 32.9998 324.107 34.9746C327.517 36.7117 330.288 39.4834 332.025 42.8926C334 46.7683 334 51.8421 334 61.9893V70H0V61.9893C0 51.8421 -0.000152248 46.7683 1.97461 42.8926C3.71166 39.4834 6.48345 36.7117 9.89258 34.9746C13.7683 32.9998 18.8421 33 28.9893 33H118C122.86 33 125.29 33 126.846 32.4748C128.847 31.7994 129.003 31.7055 130.534 30.2512C131.725 29.1204 133.749 25.286 137.797 17.6171C143.327 7.14061 154.33 0 167 0Z"
              fill="white"
            />
          </svg>
          <div className="bg-white rounded-b-[10px] p-[18px] text-center -mt-px">
            <h4 className="font-display font-bold text-[18px] text-[#1e1e1e]">{name}</h4>
            <p className="text-xs text-[#1e1e1e]/60 mt-0.5">{role}</p>
            <p className="text-sm text-[#1e1e1e]/80 leading-relaxed mt-3">&ldquo;{comment}&rdquo;</p>
            <div className="mt-4">
              <Stars rating={rating} />
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-[8px] w-[50px] h-[50px] rounded-full overflow-hidden ring-4 ring-white">
            <Image src={avatar} alt={name} fill sizes="50px" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

const FALLBACK_REVIEWS = [
  { id: 'a', name: 'Anil Reddy', role: 'Facility Manager', rating: 4, comment: 'From electrical panel work to CCTV, Vedhanth delivered quality solutions on time and within budget.', photo: '/images/home/review-bg-anil.jpg', avatar: '/images/home/avatar-anil.jpg' },
  { id: 'b', name: 'Rajesh Kumar', role: 'Operations Manager', rating: 4, comment: 'Vedhanth handled our CCTV and networking installation professionally. The team was responsive and completed the work as planned.', photo: '/images/home/review-bg-rajesh.jpg', avatar: '/images/home/avatar-rajesh.jpg' },
  { id: 'c', name: 'Priya Sharma', role: 'Office Administrator', rating: 4, comment: 'Excellent biometric and fire alarm installation. Their AMC support has been reliable and timely.', photo: '/images/home/review-bg-priya.jpg', avatar: '/images/home/avatar-priya.jpg' },
];

export default function ClientReviews({ reviews = [] }) {
  const items = reviews.length
    ? reviews.map((r, i) => ({
        id: r.id,
        name: r.name,
        role: r.role || 'Client',
        rating: r.rating || 5,
        comment: r.comment,
        photo: FALLBACK_REVIEWS[i % FALLBACK_REVIEWS.length].photo,
        avatar: FALLBACK_REVIEWS[i % FALLBACK_REVIEWS.length].avatar,
      }))
    : FALLBACK_REVIEWS;

  return (
    <section id="reviews" className="scroll-mt-20 py-16 md:py-20 bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center px-6 mb-14">
          <span className="eyebrow">Testimonials</span>
          <h2 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4 capitalize">
            Our Client Reviews
          </h2>
        </div>

        <Marquee gap={38} speed={items.length * 6} className="[mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] pb-4">
          {items.map((r) => (
            <ReviewCard key={r.id} {...r} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
