import { site } from '@/lib/site';

const variants = {
  gold: 'btn-gold',
  dark: 'btn-dark',
  light: 'btn-light',
} as const;

export default function BookNow({
  variant = 'gold',
  className = '',
}: {
  variant?: keyof typeof variants;
  className?: string;
}) {
  if (site.bookingUrl) {
    return (
      <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={`${variants[variant]} ${className}`}>
        Book Now
      </a>
    );
  }
  return (
    <button type="button" disabled title="Online booking is coming soon" className={`btn-disabled ${className}`}>
      Book Now
    </button>
  );
}
