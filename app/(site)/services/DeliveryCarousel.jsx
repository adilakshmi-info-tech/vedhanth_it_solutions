'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const asset = (name) => `/images/services/figma/${name}`;

const deliverySteps = [
  {
    kind: 'site',
    title: 'Site Assessment',
    image: 'delivery-assessment.png',
    alt: 'Site assessment checklist illustration',
    width: 139,
    height: 113,
    description: 'We understand your requirements, inspect your location, and identify the right technical solution for your property or business.',
  },
  {
    kind: 'installation',
    title: 'Professional Installation',
    image: 'delivery-installation.png',
    alt: 'Professional installation checklist illustration',
    width: 307,
    height: 198,
    description: 'Our trained team installs, configures, tests, and commissions every system with proper safety and technical standards.',
  },
  {
    kind: 'support',
    title: 'Ongoing Support',
    image: 'delivery-support.png',
    alt: 'Ongoing maintenance and support illustration',
    width: 205,
    height: 171,
    description: 'We provide maintenance, troubleshooting, AMC, and multi-brand technical support to keep your systems working reliably.',
  },
];
const repeatedSteps = [...deliverySteps, ...deliverySteps, ...deliverySteps];

export default function DeliveryCarousel() {
  const [activeIndex, setActiveIndex] = useState(4);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transitionsEnabled, setTransitionsEnabled] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => index + 1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  function handleTransitionEnd(event) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || activeIndex !== 7) return;
    setTransitionsEnabled(false);
    setActiveIndex(4);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionsEnabled(true));
    });
  }

  return (
    <div
      className={`delivery-panel delivery-carousel${reducedMotion ? ' delivery-carousel-reduced-motion' : ''}${transitionsEnabled ? '' : ' delivery-carousel-no-transition'}`}
      aria-label="How we deliver reliable solutions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {repeatedSteps.map((step, index) => {
        const distance = index - activeIndex;
        const isActive = distance === 0;
        const position = isActive ? 'center' : distance === -1 ? 'left' : distance === 1 ? 'right' : distance < 0 ? 'hidden-left' : 'hidden-right';
        return (
          <article
            key={`${step.kind}-${index}`}
            className={`delivery-card delivery-card-${step.kind}${isActive ? ' is-center' : ''}`}
            data-position={position}
            aria-current={isActive ? 'true' : undefined}
            aria-hidden={position.startsWith('hidden')}
            onTransitionEnd={handleTransitionEnd}
            style={{
              '--card-offset': `${distance * 520}px`,
              '--card-scale': isActive ? '1' : '0.86',
              '--card-opacity': isActive ? '1' : '0.88',
              '--card-layer': isActive ? 3 : position.startsWith('hidden') ? 0 : 2,
            }}
          >
            <Image src={asset(step.image)} alt={step.alt} width={step.width} height={step.height} className="delivery-card-image" />
            <div className="delivery-card-copy">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
