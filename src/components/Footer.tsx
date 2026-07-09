import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import SocialLinks from '@/components/SocialLinks';

// Reference footer structure: 3 links — centre logo — 3 links, socials, rule, copyright.
// On mobile: full menu list, then logo, then socials.
const left = [
  { label: 'About me', href: '/about' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Gallery', href: '/gallery' },
];
const right = [
  { label: 'Consultation', href: '/consultation' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

const linkCls = 'font-serif text-[14px] uppercase tracking-[0.08em] text-footer-text/85 transition-colors hover:text-gold';

function Socials() {
  return <SocialLinks className="justify-center gap-5" linkClassName="text-footer-text/80 hover:text-gold" />;
}

function FooterLogo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={className}>
      <Image src="/images/logo-light.png" alt={site.name} width={260} height={146} className="h-24 w-auto" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text">
      {/* mobile: menu → logo → socials */}
      <div className="container-x flex flex-col items-center gap-10 pb-8 pt-14 md:hidden">
        <ul className="space-y-4 text-center">
          {[...left, ...right].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <FooterLogo />
        <Socials />
      </div>

      {/* desktop: links — logo — links, socials below */}
      <div className="container-x hidden pb-8 pt-16 md:block">
        <div className="grid items-center gap-10 md:grid-cols-3">
          <ul className="space-y-3 text-left">
            {left.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <FooterLogo />
          </div>

          <ul className="space-y-3 text-right">
            {right.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <Socials />
        </div>
      </div>

      <div className="border-t border-footer-text/15">
        <div className="container-x py-5 text-center text-[12px] tracking-[0.05em] text-footer-text/60">
          © {new Date().getFullYear()} {site.name} — {site.owner} · {site.address} ·{' '}
          <a href={site.phoneHref} className="transition-colors hover:text-gold">
            {site.phone}
          </a>{' '}
          ·{' '}
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
