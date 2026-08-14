export function TripleLogoBadge() {
  return (
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 py-2 px-3 sm:px-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-neutral-200/80 shadow-xs opacity-90 hover:opacity-100 transition-opacity">
      {/* Logo 1: Kelompok */}
      <img
        src="/assets/logos/kkn004somagede.png"
        alt="Logo KKN 004 Somagede"
        className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
      />
      
      {/* Divider */}
      <div className="h-6 w-px bg-neutral-300/80 shrink-0" />

      {/* Logo 2: Periode 58 */}
      <img
        src="/assets/logos/kkn58uinsaizu.png"
        alt="Logo KKN 58 UIN Saizu"
        className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
      />

      {/* Divider */}
      <div className="h-6 w-px bg-neutral-300/80 shrink-0" />

      {/* Logo 3: UIN Saizu */}
      <img
        src="/assets/logos/logouinsaizu.png"
        alt="Logo UIN Saizu"
        className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
      />
    </div>
  );
}
