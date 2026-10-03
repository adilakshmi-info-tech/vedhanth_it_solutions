'use client';
import { useState } from 'react';
import Image from 'next/image';
import { submitEnquiry } from '@/lib/actions/enquiries';

const inputClass =
  'w-full h-[50px] rounded-[10px] border border-[#e0e0e0] px-5 text-sm text-[#1e1e1e] placeholder:text-[#828282] outline-none focus:border-accent-500 transition';

export default function ContactSection({ showHeading = true }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    // Open synchronously inside the submit gesture so browser popup blockers
    // still allow the requested WhatsApp handoff after the save completes.
    const whatsappWindow = window.open('', '_blank');
    try {
      await submitEnquiry(formData);
      const text = `Hi, I'm ${formData.name}.\n\n${formData.message}\n\nPhone: ${formData.phone}\nEmail: ${formData.email}`;
      const url = `https://wa.me/917483528453?text=${encodeURIComponent(text)}`;
      if (whatsappWindow) whatsappWindow.location.href = url;
      else window.location.href = url;
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (cause) {
      whatsappWindow?.close();
      setError(cause.message || 'We could not save your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section py-16 md:py-20 bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        {showHeading && (
          <div className="text-center mb-12">
            <span className="eyebrow">Contact</span>
            <h2 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4">Contact Us</h2>
          </div>
        )}

        <div className="contact-card-wrap relative max-w-[1262px] mx-auto">
        <div className="contact-card rounded-[20px] shadow-[0_60px_100px_-50px_rgba(25,58,75,0.3)] overflow-hidden grid md:grid-cols-[1fr_364px] bg-white">
          <div className="p-8 sm:p-12 md:p-[80px_100px]">
            <h3 className="font-display font-bold text-4xl md:text-[54px] leading-tight text-[#1e1e1e]">
              Get in <span className="text-rose">Touch</span>
            </h3>
            <p className="text-sm mt-5 max-w-[545px] leading-[1.7] text-[#1e1e1e]">
              Tell us what you need — installation, service or AMC — and our team will get
              back to you shortly with the right solution.
            </p>

            {submitted ? (
              <div className="py-14 text-center">
                <div className="w-12 h-12 bg-accent-500 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-bold text-navy-900">Message sent via WhatsApp!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8 max-w-[545px]">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="tel"
                  placeholder="Phone number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  placeholder="What is in your mind?"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-[10px] border border-[#e0e0e0] px-5 py-4 text-sm text-[#1e1e1e] placeholder:text-[#828282] outline-none focus:border-accent-500 transition resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-[50px] rounded-[10px] bg-[#081732] text-white text-[16px] font-bold uppercase hover:bg-navy-800 transition"
                >
                  {submitting ? 'Saving…' : 'Send'}
                </button>
                {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              </form>
            )}

            <div className="flex flex-wrap gap-x-12 gap-y-5 mt-10">
              <a href="tel:+919901975647" className="flex items-center gap-3.5 group">
                <Image src="/icons/phone.png" alt="" width={28} height={28} />
                <span>
                  <span className="block text-[13px] font-semibold text-[#1e1e1e]">PHONE</span>
                  <span className="block text-[13px] font-semibold text-[#1e1e1e] group-hover:text-accent-500 transition">+91 9901975647</span>
                </span>
              </a>
              
              <a href="mailto:sales@vedhanthitsolutions.in" className="flex items-center gap-3.5 group">
                <Image src="/icons/email.png" alt="" width={28} height={28} />
                <span>
                  <span className="block text-[13px] font-semibold text-[#1e1e1e]">EMAIL</span>
                  <span className="block text-[13px] font-bold text-[#1e1e1e] group-hover:text-accent-500 transition">sales@vedhanthitsolutions.in</span>
                </span>
              </a>
            </div>
          </div>

          <div className="hidden md:block bg-[#183a4a]" />
        </div>

        {/* Positioned exactly as in Figma: the illustration straddles the
            white/navy boundary rather than sitting centered in the navy
            column, so it's laid out as an absolute overlay on the card. */}
        <div
          className="hidden md:block absolute pointer-events-none"
          style={{ left: '53.96%', top: '22.44%', width: '43.34%', height: '55.56%' }}
        >
          <Image
            src="/images/home/contact-illustration.png"
            alt="Vedhanth support team ready to help"
            fill
            sizes="547px"
            className="object-contain object-bottom"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
