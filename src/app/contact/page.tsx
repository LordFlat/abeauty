import type { Metadata } from 'next';
import Image from 'next/image';
import { site } from '@/lib/site';
import Reveal from '@/components/Reveal';
import BookNow from '@/components/BookNow';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book your visit to AD Beauty at Worcester Beauty Clinic, Walker Hall, Evesham — send an enquiry and Anastasia will reply personally.',
};

const details = [
  {
    label: site.address,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
  {
    label: site.phone,
    href: site.phoneHref,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 4h4l1.5 4.5-2 1.5a13 13 0 005.5 5.5l1.5-2L20 15v4a1.5 1.5 0 01-1.7 1.5C10.5 19.6 4.4 13.5 3.5 5.7A1.5 1.5 0 015 4z" />
      </svg>
    ),
  },
  {
    label: site.email,
    href: `mailto:${site.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 6.5l8.5 6 8.5-6" />
      </svg>
    ),
  },
  {
    label: 'By appointment — see availability on Treatwell.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="container-x grid gap-14 pb-24 pt-24 sm:pt-32 lg:grid-cols-[1fr_1.15fr]">
      <div className="space-y-8">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="title-xl mt-4">book your visit</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="body-copy max-w-md">
            Ready to book? The quickest way is through Treatwell. For questions or bespoke requests,
            send a message and Anastasia will reply personally.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <BookNow variant="dark" />
        </Reveal>
        <Reveal delay={250}>
          <ul className="space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-4 text-sm text-ink">
                <span className="text-gold">{d.icon}</span>
                {d.href ? (
                  <a href={d.href} className="transition-colors hover:text-gold">
                    {d.label}
                  </a>
                ) : (
                  <span>{d.label}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={320}>
          <figure className="gallery-item aspect-[4/3] overflow-hidden">
            <Image
              src="/images/office.jpg"
              alt="Inside the clinic at Walker Hall, Evesham"
              width={900}
              height={675}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-full w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div className="bg-ivory p-8 sm:p-12">
          <h2 className="heading-md mb-8 !text-left">send an enquiry</h2>
          <ContactForm />
        </div>
      </Reveal>
    </div>
  );
}
