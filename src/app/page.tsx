import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { reviews } from '@/lib/content';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import BookNow from '@/components/BookNow';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const followPhotos = Array.from({ length: 6 }, (_, i) => `/images/follow/${String(i + 1).padStart(2, '0')}.jpg`);

// Keep the home carousel punchy — long reviews stretch the block and read poorly here.
// The full set (including long ones) still shows on the /reviews page.
const CAROUSEL_MAX_LENGTH = 260;
const carouselReviews = reviews.filter((r) => r.text.length <= CAROUSEL_MAX_LENGTH);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full-bleed dark b/w photo with slow zoom, layered light content over it. */}
      <section className="sticky top-0 z-0 flex min-h-[100svh] flex-col overflow-hidden">
        {/* Slow ken-burns zoom on the whole backdrop. */}
        <div className="hero-zoom absolute inset-0">
          {/* Mobile: full-bleed cover. Desktop: this layer becomes a blurred fill behind the contained photo. */}
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_22%] lg:scale-110 lg:blur-xl"
          />
          {/* Desktop: the photo shown whole, full viewport height — downscaled, so it stays sharp. */}
          <div className="absolute inset-0 hidden lg:block">
            <Image src="/images/hero.jpg" alt="" fill priority sizes="50vw" className="object-contain" />
          </div>
        </div>

        {/* Warm dark gradient + vignette for depth and a richer, more legible look. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#2C241E]/45 to-[#2C241E]/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_38%,transparent_32%,rgba(0,0,0,0.5))]" />

        <div className="relative flex flex-1 flex-col items-center justify-center gap-7 px-5 pt-20 text-center">
          <Image
            src="/images/logo-light.png"
            alt={site.name}
            width={430}
            height={242}
            priority
            className="hero-rise mx-auto h-auto w-72 sm:w-[26rem]"
            style={{ animationDelay: '0.15s' }}
          />
          <span className="hero-line block h-px bg-gold" />
          <p
            className="hero-rise max-w-xl font-serif text-2xl leading-snug text-footer-text sm:text-[32px]"
            style={{ animationDelay: '0.7s' }}
          >
            Confidence begins with the <span className="italic text-gold">details</span>
          </p>
          <p
            className="hero-rise font-serif text-[12px] uppercase tracking-[0.22em] text-footer-text/80 sm:text-[14px]"
            style={{ animationDelay: '0.95s' }}
          >
            {site.owner} · beauty &amp; aesthetics · Evesham
          </p>
          <Link
            href="/treatments"
            className="btn-light hero-rise"
            style={{ animationDelay: '1.2s' }}
          >
            View Treatments
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue pointer-events-none absolute inset-x-0 bottom-6 flex justify-center text-footer-text/70">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      <div className="relative z-10">
        {/* 2. Marquee strip */}
        <Marquee />

        {/* 3. Services — image bleeds to the left edge, text right; sticks while next section covers it. */}
        <section className="sticky top-0 z-[11] bg-cream">
          <div className="grid min-h-[100svh] lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image src="/images/main-first.jpg" alt="Semi permanent makeup at AD Beauty" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-6 px-6 py-16 sm:px-14 lg:px-16">
              <Reveal>
                <p className="eyebrow">Our Services</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="title-xl">semi permanent makeup, brows &amp; facials</h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="body-copy max-w-xl">
                  From brows you wake up with to skin treatments with real, lasting results — every
                  service is delivered with medical-grade hygiene, premium pigments and an honest
                  consultation first. Explore the full menu with prices.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div>
                  <Link href="/treatments" className="btn-dark">
                    View Services
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Advanced Aesthetics — mirrored: text left, image bleeds to the right edge; also sticky. */}
        <section className="sticky top-0 z-[12] bg-cream">
          <div className="grid min-h-[100svh] lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center gap-6 px-6 py-16 sm:px-14 lg:order-1 lg:px-16">
              <Reveal>
                <p className="eyebrow">Advanced Aesthetics</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="title-xl">advanced aesthetics</h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="body-copy max-w-xl">
                  Advanced non-surgical treatments designed to improve skin quality, enhance natural
                  features, and support long-lasting rejuvenation.
                </p>
              </Reveal>
              <Reveal delay={350}>
                <div>
                  <Link href="/gallery?category=aesthetic" className="btn-outline">
                    View Aesthetics
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="relative order-1 aspect-[4/3] lg:order-2 lg:aspect-auto">
              <Image src="/images/main-second.jpg" alt="Advanced aesthetics at AD Beauty" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        {/* 5. Testimonials — dark fading carousel with arrows. */}
        <section className="relative z-[13]">
          <TestimonialCarousel reviews={carouselReviews} />

          {/* 6. Gallery / Instagram strip */}
          <section className="bg-cream py-20">
            <div className="container-x text-center">
              <Reveal>
                <p className="eyebrow">Follow along</p>
              </Reveal>
              <Reveal delay={100}>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="heading-md mt-3 inline-block transition-colors hover:text-gold">
                  @adbeauty_worcesterbeautyclinic
                </a>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="mt-10 grid grid-cols-3 sm:grid-cols-6">
                {followPhotos.map((src, i) => (
                  <a
                    key={src}
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gallery-item block aspect-square overflow-hidden"
                  >
                    <Image src={src} alt={`AD Beauty on Instagram ${i + 1}`} width={540} height={540} sizes="(min-width: 640px) 17vw, 33vw" className="h-full w-full object-cover" />
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10 text-center">
                <Link href="/gallery" className="btn-outline">
                  View the Gallery
                </Link>
              </div>
            </Reveal>
          </section>

          {/* 7. Book now — image used as a soft atmospheric backdrop (blur hides upscaling on wide screens). */}
          <section className="relative overflow-hidden">
            <Image src="/images/brow-treatment.jpg" alt="" fill sizes="100vw" className="scale-110 object-cover object-center blur-[3px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2C241E]/80 via-black/55 to-[#2C241E]/85" />
            <div className="container-x relative flex min-h-[26rem] flex-col items-center justify-center gap-6 py-20 text-center text-footer-text">
              <Reveal>
                <p className="font-serif text-[13px] uppercase tracking-[0.22em]">ready when you are</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-serif text-3xl lowercase leading-[1.2] sm:text-[44px]">
                  book your visit to {site.name.toLowerCase()}
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="max-w-xl text-[14px] leading-[1.8] text-footer-text/85">
                  Online booking through Treatwell is coming very soon. Until then, send an enquiry
                  and Anastasia will reply personally.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact" className="btn-light">
                    Contact Us
                  </Link>
                  <BookNow variant="gold" />
                </div>
              </Reveal>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
