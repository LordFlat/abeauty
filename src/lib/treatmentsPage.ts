// Self-contained content + hierarchy for the /treatments section, authored from
// resourses/treatments.txt. Pure data + types only (no fs) so client components can import it.
//
// Structure (3 levels; the 3rd level has NO page — it is a dropdown on its level-2 page):
//   category            → /treatments/<category>
//     sub-treatment      → /treatments/<category>/<treatment>
//       variant          → dropdown inside the level-2 page (e.g. Powder/Combo/Stroke)
// Leaf categories (IPL, Laser Tattoo Removal) carry the treatment content themselves.
//
// Title images live at /treatments/titles/<slug>.jpg (name is baked into the artwork,
// so cards never repeat it as text). Galleries live at /treatments/<galleryKey>/ and
// appear only where a folder of photos exists.

const SPMU_NOTE =
  'A top-up appointment is recommended 6–8 weeks after your first session for all semi-permanent makeup. This perfecting visit lets us assess the healed result, reinforce the pigment where needed and ensure the best possible colour, shape and longevity.';

export type Variant = {
  slug: string;
  name: string;
  description: string;
  benefits?: string[];
};

export type SubTreatment = {
  slug: string;
  name: string;
  /** Short caption shown beneath the card image. */
  cardDesc: string;
  /** Optional italic lead line on the detail page. */
  intro?: string;
  description?: string;
  benefits?: string[];
  note?: string;
  /** Folder under public/treatments/ — a gallery shows only if it has photos. */
  galleryKey?: string;
  /** Level-3 techniques shown via a dropdown on this page (no separate URLs). */
  variants?: Variant[];
};

export type TreatmentCategoryNode = {
  slug: string;
  title: string;
  cardDesc: string;
  intro: string;
  /** Sub-treatments (level 2). Empty for leaf categories that are a treatment themselves. */
  subs: SubTreatment[];
  // Leaf-category treatment content (used when subs is empty):
  description?: string;
  benefits?: string[];
  note?: string;
  galleryKey?: string;
};

export const treatmentsIntro = {
  eyebrow: 'The Treatments',
  title: 'treatments',
  body:
    'We offer a considered edit of semi-permanent makeup, advanced facials and aesthetic treatments — each designed around natural enhancement, quiet confidence and results you can trust. Every appointment begins with an honest consultation and a plan built entirely around you.',
};

export const treatmentCategories: TreatmentCategoryNode[] = [
  {
    slug: 'semi-permanent-makeup',
    title: 'Semi-Permanent Makeup',
    cardDesc: 'Brows, lips & eyes — softly enhanced to last.',
    intro:
      'Wake up ready. Semi-permanent makeup enhances your natural features with soft, long-lasting colour — brows, lips and eyes refined so subtly that the result simply looks like a better version of you.',
    subs: [
      {
        slug: 'lip-blush',
        name: 'Lip Blush',
        cardDesc: 'Fuller, naturally tinted lips — no fillers.',
        intro: 'Wake up with beautifully enhanced lips every day.',
        description:
          'A semi-permanent enhancement that revives your natural lip colour, redefines the border and creates the appearance of fuller, more youthful lips — no fillers, just soft, believable colour. Perfect for anyone wanting natural-looking lips with less need for daily lipstick.',
        benefits: [
          'Enhances your natural lip colour',
          'Defines the lip border',
          'Creates a fuller-looking appearance',
          'Corrects uneven tone and asymmetry',
          'Camouflages pigmentation',
          'Smudge-proof and waterproof',
          'Long-lasting — typically 2–3 years',
        ],
        note: SPMU_NOTE,
        galleryKey: 'lip-blush',
      },
      {
        slug: 'semi-permanent-brows',
        name: 'Semi-Permanent Brows',
        cardDesc: 'Powder, combo & stroke techniques.',
        intro:
          "Three techniques, one goal — brows that frame your face beautifully and last. Together we choose the approach that suits your skin and the look you're after.",
        note: SPMU_NOTE,
        galleryKey: 'semi-permanent-brows',
        variants: [
          {
            slug: 'powder-brows',
            name: 'Powder Brows',
            description:
              'A soft, shaded finish that looks like beautifully applied makeup — from a subtle daytime wash to a more defined effect. Suitable for all skin types.',
            benefits: [
              'Soft, natural powdered effect',
              'Defines and enhances your brow shape',
              'Fills sparse or uneven brows',
              'Suitable for all skin types',
              'Smudge-proof and waterproof',
              'Long-lasting — typically 1–3 years',
            ],
          },
          {
            slug: 'combo-brows',
            name: 'Combo Brows',
            description:
              'Delicate hair strokes at the front blend into soft shading through the body and tail — the perfect balance between realism and a polished, defined finish.',
            benefits: [
              'Combines hair strokes with soft shading',
              'Creates fuller, more defined brows',
              'Ideal for sparse or uneven brows',
              'Customised to suit your face and style',
              'Long-lasting — typically 1–3 years',
            ],
          },
          {
            slug: 'stroke-brows',
            name: 'Stroke Brows',
            description:
              'Fine, realistic hair-like strokes recreate the look of natural brow hairs — ideal for enhancing shape and filling sparse areas with a soft, natural result.',
            benefits: [
              'Creates realistic hair-like strokes',
              'Enhances your natural brow shape',
              'Fills sparse or patchy areas',
              'Soft, natural-looking results',
              'Long-lasting — typically 1–2 years',
            ],
          },
        ],
      },
      {
        slug: 'semi-permanent-eyeliner',
        name: 'Semi-Permanent Eyeliner',
        cardDesc: 'From a subtle lash line to a lifted wing.',
        intro:
          'Definition that lasts from morning to night — customised to your eye shape, from barely-there enhancement to a beautifully lifted wing.',
        note: SPMU_NOTE,
        galleryKey: 'eyeliner',
        variants: [
          {
            slug: 'lash-enhancement-eyeliner',
            name: 'Lash Enhancement Eyeliner',
            description:
              'Pigment placed between the lashes for the illusion of a fuller, darker lash line — all of the definition, none of the obvious eyeliner.',
            benefits: [
              'Appearance of thicker, fuller lashes',
              'Enhances the natural shape of your eyes',
              'Soft, subtle and natural finish',
              'Smudge-proof and waterproof',
              'Long-lasting — typically 1–3 years',
            ],
          },
          {
            slug: 'classic-eyeliner',
            name: 'Classic Eyeliner',
            description:
              'A beautifully defined line that enhances the shape of your eyes, customised from a fine, elegant line to a more defined eyeliner effect.',
            benefits: [
              'Perfectly defined eyeliner every day',
              'Enhances the natural shape of the eyes',
              'Customisable thickness and style',
              'Ideal for active lifestyles and sensitive eyes',
              'Long-lasting — typically 2–3 years',
            ],
          },
          {
            slug: 'butterfly-eyeliner',
            name: 'Butterfly Eyeliner',
            description:
              'A lifted, winged style that elongates and opens the eyes — glamorous yet timeless, shaped to complement your features.',
            benefits: [
              'Creates a lifted, winged effect',
              'Enhances and elongates the eyes',
              'Defines the lash line for a fuller look',
              'Customised to suit your eye shape',
              'Long-lasting — typically 2–3 years',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'facial-treatments',
    title: 'Facial Treatments',
    cardDesc: 'Deep-cleansing, brightening, rejuvenating skin care.',
    intro:
      'Advanced facials that go beyond relaxation — deep cleansing, brightening and rejuvenation for skin that looks fresh, clear and genuinely healthy.',
    subs: [
      {
        slug: 'bubble-facial',
        name: 'Bubble Facial',
        cardDesc: 'Oxygenating deep-cleanse with an instant glow.',
        description:
          'A deep-cleansing, oxygenating treatment that lifts away impurities while it hydrates. Rich micro-bubbles cleanse the pores and boost circulation, leaving skin brighter, smoother and refreshed — with no downtime.',
        benefits: [
          'Deeply cleanses the skin and pores',
          'Removes excess oil and impurities',
          'Gently exfoliates dead skin cells',
          'Boosts skin hydration',
          'Brightens dull, tired-looking skin',
          'Suitable for most skin types',
          'No downtime',
        ],
      },
      {
        slug: 'carbon-facial',
        name: 'Carbon Facial',
        cardDesc: 'Laser deep-clean, brighten & smooth.',
        description:
          'An advanced laser facial: a layer of medical-grade carbon is applied then targeted with laser light, drawing out impurities while stimulating collagen for a smoother, brighter complexion. Ideal for oily, congested, acne-prone and dull skin.',
        benefits: [
          'Deeply cleanses pores',
          'Reduces excess oil and congestion',
          'Improves acne and acne marks',
          'Minimises the appearance of enlarged pores',
          'Brightens dull skin and evens tone',
          'Stimulates collagen production',
          'Softens fine lines and improves texture',
          'Minimal downtime',
        ],
        galleryKey: 'carbon-facial',
      },
    ],
  },
  {
    slug: 'hifu',
    title: 'HIFU',
    cardDesc: 'Non-surgical lifting & tightening — face and body.',
    intro:
      'High-Intensity Focused Ultrasound lifts, tightens and rejuvenates by stimulating your own collagen deep within the skin — no needles, no surgery, no downtime. Results build gradually over 8–12 weeks and continue to improve.',
    subs: [
      {
        slug: 'hifu-face-lift',
        name: 'HIFU Face Lift',
        cardDesc: 'Lift & tighten the face — no surgery.',
        intro: 'Lift, tighten and rejuvenate your skin without surgery.',
        description:
          "A non-invasive facelift that lifts and tightens sagging skin, refines the jawline and facial contours and softens fine lines. You'll notice an initial lift straight away, with full results developing over 8–12 weeks as new collagen forms.",
        benefits: [
          'Non-invasive facelift treatment',
          'Stimulates natural collagen production',
          'Lifts and tightens sagging skin',
          'Improves the jawline and facial contours',
          'Reduces fine lines and wrinkles',
          'Long-lasting — up to 12–18 months',
          'No downtime',
        ],
        galleryKey: 'hifu-face-lift',
      },
      {
        slug: 'hifu-body-lift',
        name: 'HIFU Body Lift',
        cardDesc: 'Contour & firm stubborn areas.',
        intro: 'Target stubborn fat and tighten loose skin, without surgery.',
        description:
          'Advanced body contouring that targets stubborn fat and tightens loose skin — ideal for the abdomen, thighs, arms, flanks and under the buttocks. Results develop over 8–12 weeks for a firmer, more sculpted shape.',
        benefits: [
          'Non-surgical body contouring',
          'Targets stubborn fat deposits',
          'Tightens loose and sagging skin',
          'Stimulates natural collagen production',
          'Improves body shape and definition',
          'No surgery, needles or downtime',
        ],
        galleryKey: 'hifu-body-lift',
      },
      {
        slug: 'intimate-hifu-tightening',
        name: 'Intimate HIFU Tightening',
        cardDesc: 'Non-surgical intimate firming & confidence.',
        intro: 'Restore confidence with non-surgical intimate tightening.',
        description:
          'A comfortable, non-surgical treatment that firms and tightens intimate tissues, supporting confidence and wellness after childbirth or with age. Results continue to improve over 8–12 weeks as collagen regenerates.',
        benefits: [
          'Non-invasive and comfortable procedure',
          'Helps tighten and firm intimate tissues',
          'Stimulates natural collagen production',
          'Improves laxity after childbirth or ageing',
          'May help mild stress urinary incontinence',
          'No surgery, downtime or anaesthetic',
        ],
        note: 'This treatment always begins with a private, professional consultation.',
      },
    ],
  },
  {
    slug: 'brows-waxing',
    title: 'Brows & Waxing',
    cardDesc: 'Waxing, brows & lashes.',
    intro:
      'Fast, expert finishing touches — brows shaped, tinted and laminated, lashes lifted and tinted, all tailored to frame your face with instant results.',
    subs: [
      {
        slug: 'brow-wax-shape',
        name: 'Brow Wax & Shape',
        cardDesc: 'Clean, defined brows for your face shape.',
        description:
          'Professional waxing and shaping to remove unwanted hair and create clean, beautifully defined brows tailored to your natural face shape.',
      },
      {
        slug: 'brow-wax-shape-tint',
        name: 'Brow Wax, Shape & Tint',
        cardDesc: 'Shaped brows with a custom tint.',
        description:
          'We wax and shape your brows for a clean, flattering line, then apply a custom tint to enhance colour, definition and fullness — fresh, low-maintenance brows with long-lasting results.',
      },
      {
        slug: 'hd-brows',
        name: 'HD Brows',
        cardDesc: 'Complete tint, wax, shape & finish.',
        description:
          'A complete brow treatment — tinting, waxing, shaping and precise finishing — to create beautifully defined, fuller-looking brows tailored to your face shape and the look you want.',
        galleryKey: 'hd-brows',
      },
      {
        slug: 'brow-lamination',
        name: 'Brow Lamination',
        cardDesc: 'Lifted, fuller, brushed-up brows.',
        description:
          'Lifts, smooths and sets the brow hairs into shape for fuller, fluffier, beautifully defined brows. Perfect for taming unruly hairs and achieving a sleek, long-lasting finish.',
      },
      {
        slug: 'lash-lift',
        name: 'Lash Lift',
        cardDesc: 'Lifted, curled lashes — no extensions.',
        description:
          'Lifts and curls your natural lashes from the root for longer-looking, beautifully defined lashes — no extensions needed. Results last around 6–8 weeks.',
        galleryKey: 'lash-lift',
      },
      {
        slug: 'lash-tint',
        name: 'Lash Tint',
        cardDesc: 'Darker, defined lashes — no mascara.',
        description:
          'Darkens your natural lashes for a fuller, more defined look with no need for mascara — effortless, low-maintenance definition.',
      },
    ],
  },
  {
    slug: 'ipl',
    title: 'IPL / Laser Hair Removal',
    cardDesc: 'Long-term hair reduction for smoother skin.',
    intro:
      'Advanced Diode Laser and IPL hair removal for long-term hair reduction and smoother, softer skin — say goodbye to constant shaving and waxing. Suitable for a wide range of face and body areas.',
    subs: [],
    description:
      'Long-term hair reduction using advanced Diode Laser and IPL technology, treating a wide range of face and body areas. Because hair grows in cycles, a course of treatments is recommended for the best possible results.',
    benefits: [
      'Reduces unwanted hair growth',
      'Long-lasting, smoother skin',
      'Reduces ingrown hairs and shaving irritation',
      'Treats a wide range of face and body areas',
      'Saves time on your everyday routine',
    ],
    note: 'Every client begins with a professional consultation and patch test, so we can assess your skin and hair type and create a personalised treatment plan.',
  },
  {
    slug: 'laser-tattoo-removal',
    title: 'Laser Tattoo Removal',
    cardDesc: 'Advanced Pico laser tattoo & SPMU removal.',
    intro:
      'Advanced Pico Laser technology to fade or fully remove unwanted tattoos and old semi-permanent makeup — safely, effectively and with minimal impact on the surrounding skin.',
    subs: [],
    description:
      'Pico Laser breaks ink down into tiny particles your body clears naturally, for faster removal with minimal damage to surrounding skin. Suitable for most tattoo colours and for removing semi-permanent brows and lip blush — whether you want complete removal or fading for a cover-up.',
    benefits: [
      'Safe and effective treatment',
      'Breaks ink into tiny particles for faster removal',
      'Suitable for most tattoo colours',
      'Minimal damage to surrounding skin',
      'Short treatment sessions',
      'Ideal for body tattoos and SPMU removal (brows & lip blush)',
    ],
    note: 'A professional consultation is carried out before every treatment.',
    galleryKey: 'laser-tattoo-removal',
  },
];

// --- helpers ---------------------------------------------------------------

/** Title image path for a category or treatment slug. */
export function titleImage(slug: string): string {
  return `/treatments/titles/${slug}.jpg`;
}

export function isLeafCategory(category: TreatmentCategoryNode): boolean {
  return category.subs.length === 0;
}

export function getCategory(slug: string): TreatmentCategoryNode | undefined {
  return treatmentCategories.find((c) => c.slug === slug);
}

export function getSubTreatment(
  categorySlug: string,
  treatmentSlug: string
): { category: TreatmentCategoryNode; sub: SubTreatment } | undefined {
  const category = getCategory(categorySlug);
  const sub = category?.subs.find((s) => s.slug === treatmentSlug);
  if (!category || !sub) return undefined;
  return { category, sub };
}

export function categoryParams(): { category: string }[] {
  return treatmentCategories.map((c) => ({ category: c.slug }));
}

export function treatmentParams(): { category: string; treatment: string }[] {
  return treatmentCategories.flatMap((c) => c.subs.map((s) => ({ category: c.slug, treatment: s.slug })));
}
