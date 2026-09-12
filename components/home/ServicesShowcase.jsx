'use client';
import { useState } from 'react';

const CATEGORIES = [
  {
    key: 'electrical',
    label: 'Electrical',
    items: [
      'New House Wiring',
      'New LT Panel Installation',
      'Cable Laying',
      'Cable Glanding',
      'LT Panel Maintenance',
      'Motor Maintenance',
      'Transformer Maintenance',
      'UPS Maintenance',
      'Power & Control Panel Troubleshooting',
    ],
  },
  {
    key: 'elv',
    label: 'ELV & Security',
    items: [
      'CCTV Installation',
      'CCTV Service & Maintenance',
      'Biometric Installation',
      'Fire Alarm / Fire Installation',
      'Intercom Systems',
      'PA Systems',
    ],
  },
  {
    key: 'it',
    label: 'Networking & IT',
    items: [
      'Network Installation',
      'Structured Networking',
      'Network Maintenance',
      'Laptop Sales & Service',
      'Desktop Sales & Service',
      'IT Infrastructure',
      'Complete IT Requirements',
      'Hardware Sales & Service',
    ],
  },
  {
    key: 'amc',
    label: 'AMC & Support',
    items: [
      'Annual Maintenance Contracts',
      'Preventive Maintenance',
      'Breakdown Maintenance',
      'Troubleshooting',
      'Multi-brand Service',
      'Technical Support',
    ],
  },
];

export default function ServicesShowcase() {
  const [active, setActive] = useState(CATEGORIES[0].key);
  const current = CATEGORIES.find((c) => c.key === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`px-4 py-3 text-sm font-bold border-b-2 -mb-px transition ${
              active === c.key
                ? 'border-green-500 text-navy-900'
                : 'border-transparent text-inksoft hover:text-navy-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div key={current.key} className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 animate-fadeIn">
        {current.items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-[7px] w-1.5 h-1.5 bg-green-500 shrink-0" />
            <span className="text-sm text-inksoft">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
