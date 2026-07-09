import { site } from '@/lib/site';

// Beige strip with one endless sliding row of lowercase display text, like the reference.
export default function Marquee({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden bg-footer-bg py-5 ${className}`}>
      <div className="marquee-track flex w-max items-center">
        {/* Each half repeats the set 4× so it always exceeds the viewport width — the -50% loop never shows a gap. */}
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {Array.from({ length: 4 }, () => site.marquee).flat().map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="font-serif text-xl lowercase tracking-[0.06em] text-footer-text sm:text-2xl">{item}</span>
                <span className="mx-8 font-serif text-xl text-footer-text/60 sm:text-2xl">//</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
