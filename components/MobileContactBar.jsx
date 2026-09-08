export default function MobileContactBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-navy-900 border-t border-white/10 grid grid-cols-3 text-white">
      <a href="tel:+917483528453" className="flex flex-col items-center justify-center py-2.5 text-xs font-bold gap-0.5 border-r border-white/10">
        <span>Call</span>
      </a>
      <a href="https://wa.me/917483528453" className="flex flex-col items-center justify-center py-2.5 text-xs font-bold gap-0.5 border-r border-white/10 text-cyan-200">
        <span>WhatsApp</span>
      </a>
      <a href="/contact" className="flex flex-col items-center justify-center py-2.5 text-xs font-bold gap-0.5 bg-cyan-500">
        <span>Quote</span>
      </a>
    </div>
  );
}
