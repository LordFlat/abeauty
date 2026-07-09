'use client';

import { useRef, useState } from 'react';

type QA = { q: string; a: string };

export const consultationFaqs: QA[] = [
  {
    q: 'How long do Powder Brows last?',
    a: 'Powder Brows typically last 1–3 years, depending on your skin type, lifestyle, sun exposure, skincare routine and how well you follow the aftercare instructions. To keep your brows looking fresh and defined, I recommend a colour refresh every 12–24 months.',
  },
  {
    q: 'How many laser hair removal treatments will I need?',
    a: 'Most clients require 6–10 sessions to achieve the best results. Hair grows in different cycles, and laser treatment is only effective during the active growth phase. The exact number depends on your hair colour, skin type, hormones and the area being treated.',
  },
  {
    q: 'Does tattoo removal hurt?',
    a: 'Most clients describe the sensation as similar to the snap of a small elastic band against the skin. While there can be some discomfort, treatments are very quick and most people find them tolerable. I always aim to make your experience as comfortable as possible.',
  },
  {
    q: 'Can I have a brow or lash tint without a patch test if I’ve never had an allergy?',
    a: 'No. A patch test is required for all tinting treatments, even if you’ve never experienced an allergic reaction before. Allergies can develop at any time, and patch testing is essential to ensure your safety.',
  },
  {
    q: 'Can I go on holiday after Powder Brows or Lip Blush?',
    a: 'I recommend avoiding holidays immediately after your treatment, especially if you’ll be exposed to strong sun, swimming pools, the sea or excessive sweating. Ideally, allow at least 2 weeks for proper healing before travelling to ensure the best healed results.',
  },
  {
    q: 'Can I go swimming or exercise after laser hair removal?',
    a: 'It’s best to avoid swimming, hot tubs, saunas, steam rooms and strenuous exercise for 24–48 hours after your treatment. Heat, sweat and chlorine can irritate the skin and increase sensitivity.',
  },
  {
    q: 'Why do I need a top-up 6–8 weeks after semi-permanent makeup?',
    a: 'The first appointment creates the initial shape and colour, but some pigment naturally fades during healing. The top-up perfects the colour, fills any areas where pigment has healed lighter and ensures long-lasting, even results. It is an essential part of the treatment, not an optional extra.',
  },
  {
    q: 'Can I wear makeup after waxing or a facial?',
    a: 'I recommend avoiding makeup for at least 24 hours after facial waxing or most facial treatments. Your skin may be more sensitive, and applying makeup too soon can increase the risk of irritation, blocked pores or breakouts. Giving your skin time to breathe supports better healing and results.',
  },
];

function FaqItem({ item, isOpen, onToggle }: { item: QA; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-line/70">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
      >
        <span
          className={`font-serif text-[17px] leading-[1.4] transition-colors duration-300 sm:text-[19px] ${
            isOpen ? 'text-gold' : 'text-ink group-hover:text-gold'
          }`}
        >
          {item.q}
        </span>
        {/* Plus / minus indicator */}
        <span className="relative mt-1 h-4 w-4 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-gold" />
          <span
            className={`absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-gold transition-transform duration-500 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : 0 }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <p className="pb-7 pr-10 text-[14px] leading-[1.85] text-ink/85">{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ({ items = consultationFaqs }: { items?: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}
