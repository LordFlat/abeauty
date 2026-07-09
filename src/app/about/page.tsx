import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import Reveal from '@/components/Reveal';
import BookNow from '@/components/BookNow';
import CertificateGallery from '@/components/CertificateGallery';

export const metadata: Metadata = {
  title: 'About me',
  description:
    'Anastasia Danitoiu — certified beauty and aesthetics practitioner in Evesham, recognised as a UK National Top 10 winner at the Hair and Beauty Awards 2024.',
};

export default function AboutPage() {
  return (
    <div className="pb-24 pt-24 sm:pt-32">
      {/* Intro — portrait + opening story */}
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <p className="eyebrow">About me</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="title-xl">
              anastasia
              <br />
              danitoiu
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-[16px] leading-[1.95] text-ink/90 sm:text-[18px] sm:leading-[2]">
              My dream has always been to create a place where women feel supported, guided, and truly
              cared for. I wanted to build more than just a beauty clinic&mdash;I wanted to create a space
              where every client feels confident, comfortable, and beautiful in their own skin.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="text-[16px] leading-[1.95] text-ink/90 sm:text-[18px] sm:leading-[2]">
              For me, beauty is not just about treatments; it&rsquo;s about helping people feel their best,
              restoring confidence, and enhancing their natural features.
            </p>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <figure className="group relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden">
            {/* Gold frame accent that draws in on hover */}
            <span className="pointer-events-none absolute inset-3 z-10 border border-ivory/0 transition-all duration-700 group-hover:inset-4 group-hover:border-ivory/70" />
            <Image
              src="/images/about/main.jpg"
              alt={`${site.owner} at the UK Hair and Beauty Awards`}
              fill
              sizes="28rem"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              priority
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
          </figure>
        </Reveal>
      </div>

      {/* Philosophy pull-quote */}
      <Reveal className="container-x mt-24 sm:mt-32">
        <blockquote className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-6 block h-px w-16 bg-gold" />
          <p className="font-serif text-[26px] leading-[1.4] text-ink sm:text-[34px]">
            Beauty isn&apos;t my job — <em className="text-gold">it&apos;s my passion.</em>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-[1.8] text-ink-soft">
            For me, beauty is not just about treatments; it&apos;s about helping people feel their best,
            restoring confidence and enhancing their natural features.
          </p>
        </blockquote>
      </Reveal>

      {/* Natural approach + experience */}
      <div className="container-x mt-20 grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="border-l-2 border-gold/40 pl-6">
            <h2 className="heading-md mb-3 !text-left !text-[22px]">a natural approach</h2>
            <p className="body-copy">
              My philosophy is to help you look like the best version of yourself, preserving your natural
              beauty for as long as possible rather than changing who you are. Every treatment I offer is
              carefully chosen to deliver beautiful, balanced and natural-looking results.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="border-l-2 border-gold/40 pl-6">
            <h2 className="heading-md mb-3 !text-left !text-[22px]">nine years of care</h2>
            <p className="body-copy">
              With over nine years of experience, professional qualifications, and a commitment to
              continually developing my skills, I take great pride in providing safe, high-quality
              treatments tailored to each individual.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Certificates & awards — layered collage */}
      <div className="container-x mt-24 sm:mt-32">
        <Reveal className="text-center">
          <p className="eyebrow">Qualified &amp; award-winning</p>
          <h2 className="heading-md mx-auto mt-3 max-w-xl">certificates &amp; awards</h2>
        </Reveal>

        <CertificateGallery />
      </div>

      {/* Values */}
      <div className="container-x mt-24 grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Consultation first',
            text: 'No treatment starts before we have talked it through — expectations, healing, aftercare and whether it is right for you at all.',
          },
          {
            title: 'Safety & hygiene',
            text: 'Certified, insured and uncompromising about sterile equipment, patch tests and premium pigments.',
          },
          {
            title: 'Natural results',
            text: 'The best compliment I hear is “you look great” — not “what have you had done?”.',
          },
        ].map((v, i) => (
          <Reveal key={v.title} delay={i * 100}>
            <div className="h-full bg-ivory p-8 transition-colors duration-500 hover:bg-beige/50">
              <h2 className="heading-md mb-3 !text-left !text-[24px]">{v.title.toLowerCase()}</h2>
              <p className="body-copy">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="container-x mt-24 text-center">
        <p className="mx-auto max-w-xl font-serif text-[20px] italic leading-[1.5] text-ink-soft">
          &ldquo;I look forward to welcoming you and being part of your beauty journey.&rdquo;
        </p>
        <h2 className="heading-md mx-auto mt-8 max-w-xl">let&apos;s plan your treatment together</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/consultation" className="btn-gold">
            Book a consultation
          </Link>
          <BookNow variant="dark" />
        </div>
      </Reveal>
    </div>
  );
}
