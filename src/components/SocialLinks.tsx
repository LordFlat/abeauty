import { site } from '@/lib/site';

// Shared Instagram + Facebook icons — used in the header nav and the footer.
// Colour is inherited from `linkClassName` so each placement can match its context.
export default function SocialLinks({
  className = '',
  linkClassName = '',
  size = 20,
}: {
  className?: string;
  linkClassName?: string;
  size?: number;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <a
        href={site.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`transition-colors ${linkClassName}`}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href={site.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={`transition-colors ${linkClassName}`}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.25-1.5 1.55-1.5H16.6V4.4c-.3-.04-1.3-.13-2.45-.13-2.4 0-4.05 1.47-4.05 4.16v2.07H7.5v3h2.6V21h3.4z" />
        </svg>
      </a>
    </div>
  );
}
