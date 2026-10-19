import type { EnquiryChoiceGroup, EnquiryDress } from '@/patterns';

/**
 * The chip form's copy, as the approved mock carries it (owner, 19 Oct 2026). Specimen fixture
 * only: the chips and prompts are the CALLER's copy (EnquiryForm takes them as props), and no page
 * carries the chip form yet. The services are the six the home page's situations link to, in short
 * form; the stages come from the close's own lede.
 */
export const NEEDS: EnquiryChoiceGroup = {
  question: 'What do you need?',
  aside: 'Pick any',
  options: [
    { value: 'new-product', label: 'New product', prompt: 'What’s the product, and who is it for?' },
    { value: 'product-design', label: 'Product design', prompt: 'Where do people get stuck today?' },
    {
      value: 'modernisation',
      label: 'Modernisation',
      prompt: 'What’s the product, and what’s holding it back?',
    },
    {
      value: 'ai-ux',
      label: 'AI product UX',
      prompt: 'What does it do, and where do people stop trusting it?',
    },
    {
      value: 'design-systems',
      label: 'Design systems',
      prompt: 'How many teams, and what do they build with today?',
    },
    {
      value: 'design-engineering',
      label: 'Design engineering',
      prompt: 'Where does the build drift from the design?',
    },
  ],
};

export const STAGES: EnquiryChoiceGroup = {
  question: 'Where is it today?',
  aside: 'Optional',
  options: [
    { value: 'sketch', label: 'A sketch', echo: 'a sketch' },
    { value: 'prototype', label: 'A prototype', echo: 'a prototype' },
    { value: 'live', label: 'A live product', echo: 'a live product' },
  ],
};

export const PROMPT = 'A link, a Figma file, or two lines about the problem.';

/** Direction A, the split panel. */
export const CHOICE_DRESS = {
  kind: 'choice',
  needs: NEEDS,
  stage: STAGES,
  prompt: PROMPT,
  reply: 'We reply within one business day.',
} as const satisfies EnquiryDress;

/** Direction C, the first message with chips. The person is a placeholder from the studio photo
    catalogue, as on the plain message dress. */
export const MESSAGE_CHIPS_DRESS = {
  kind: 'message',
  from: {
    name: 'Rushali',
    role: 'Design lead · Tcules',
    portrait: '/kit/photos/studio-portrait-rushali.webp',
  },
  note: 'What can we help with? Tap any that fit, then tell me a little about it.',
  prompt: PROMPT,
  writeTo: 'hello@tcules.com',
  needs: { question: 'What do you need?', aside: 'Pick any', options: NEEDS.options },
} as const satisfies EnquiryDress;

/** The close's words and drawing, as the home close places them (scripts/enquiry-desk.mjs). */
export const CLOSE_HEADING = 'Tell us what you’re building';
export const CLOSE_BODY = [
  'A sketch, a prototype or a product with years of history behind it. Start wherever you are.',
] as const;
export const DESK = {
  src: '/illustrations/enquiry/designer-desk.svg',
  alt: '',
  width: 396,
  height: 459,
  kind: 'illustration',
} as const;
