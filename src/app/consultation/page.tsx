import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Consultation',
  description:
    'How consultations work at AD Beauty — what to expect, patch tests, healing and aftercare, before any treatment is booked.',
};

const steps: { title: string; text: string }[] = [
  {
    title: 'We talk',
    text: 'You tell me what you would like to change or enhance. I explain what is achievable, what it costs and how it heals — honestly, with no pressure.',
  },
  {
    title: 'Patch test & pre-draw',
    text: 'A patch test is required at least 48 hours before treatments such as laser hair removal, tattoo removal, brow and lash tinting, brow lamination, lash lift, and other treatments where indicated.\n\nFor Semi Permanent Makeup (SPMU), we will carefully map and pre-draw your chosen shape. Nothing begins until you are completely happy and approve the design.',
  },
  {
    title: 'Your Treatment',
    text: 'Once your patch test has been completed (where required), your treatment can go ahead safely. We will explain each step, ensure you are comfortable throughout, and provide detailed aftercare instructions to help you achieve the best possible results.',
  },
  {
    title: 'Aftercare & follow-up',
    text: 'Healing is part of the result. I stay in touch, answer questions, and top-up appointments are scheduled where the treatment needs them.',
  },
];

export default function ConsultationPage() {
  return (
    <div className="pb-24 pt-24 sm:pt-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <p className="eyebrow">Consultation</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="title-xl">every treatment starts with a conversation</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-copy">
              A consultation costs you nothing and commits you to nothing. It is how we make sure the
              treatment fits you — your skin, your features and your expectations — before any booking
              is made.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/contact" className="btn-gold">
              Request a consultation
            </Link>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden">
            <Image src="/images/consultation.jpg" alt="Consultation at AD Beauty" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority />
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-20 grid gap-6 md:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div className="flex h-full items-center gap-6 bg-ivory p-8">
              <span className="font-serif text-4xl text-gold">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <h2 className="heading-md mb-2 !text-left !text-[24px]">{s.title.toLowerCase()}</h2>
                {s.text.split('\n\n').map((para, pi) => (
                  <p key={pi} className={`body-copy ${pi > 0 ? 'mt-4' : ''}`}>
                    {para.trim()}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Q&A */}
      <div className="container-x mt-24 sm:mt-32">
        <Reveal className="text-center">
          <p className="eyebrow">Good to know</p>
          <h2 className="heading-md mx-auto mt-3 max-w-xl">questions &amp; answers</h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.8] text-ink-soft">
            The things clients ask most before booking. Still unsure about something? Just ask — I&apos;m
            always happy to talk it through.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <FAQ />
        </Reveal>
      </div>

      <Reveal className="container-x mt-20 bg-beige/60 p-10 text-center sm:p-14">
        <p className="mx-auto max-w-2xl text-[15px] font-medium leading-[1.85] text-ink/90 sm:text-[16px]">
          Please arrive with clean skin where possible. Before your appointment, please let me know if you are taking any medication, are pregnant, have recently had any cosmetic procedures, or have any skin conditions, as some treatments may need to be adjusted or postponed. Most treatments require a patch test at least 48 hours before your appointment.
        </p>
        <Link href="/contact" className="btn-dark mt-8">
          Ask a question
        </Link>
      </Reveal>
    </div>
  );
}
