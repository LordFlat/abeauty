import type { Metadata } from 'next';
import { Roboto, Tenor_Sans } from 'next/font/google';
import { site } from '@/lib/site';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

// Display face: Tenor Sans — closest Google match to the reference's "Alta".
const display = Tenor_Sans({ subsets: ['latin'], weight: '400', variable: '--font-serif' });
const body = Roboto({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    'Semi permanent makeup, facials, HIFU, brows & waxing and IPL treatments by Anastasia Danitoiu at Walker Hall, Evesham.',
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      'Semi permanent makeup, facials, HIFU, brows & waxing and IPL treatments in Evesham.',
    url: site.url,
    siteName: site.name,
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
