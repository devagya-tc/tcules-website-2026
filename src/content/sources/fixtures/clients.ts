import type { StoryMark } from '@/lib/service-story';

/**
 * The nine real client marks (public/clients/*.svg) as the content seam serves them: the file, its
 * viewBox and the weight correction recorded with the asset (ch05 § 10). The same records the kit's
 * H specimen judges (src/app/design/_specimen/clients.ts, which a fixture may not import — design/
 * is the proving ground's own); a correction changed there is changed here in the same edit.
 *
 * Real marks only sit beside real words or sourced numerals (visual-direction § 5.8): on a service
 * page, the approved quote and the Clutch rating (./ratings.ts).
 */
const mark = (
  name: string,
  file: string,
  width: number,
  height: number,
  correction?: number,
): StoryMark => ({ name, src: `/clients/${file}.svg`, width, height, correction });

export const CLIENT_MARKS = {
  omny: mark('Omny', 'omny', 93.982, 24.792),
  latitudepay: mark('LatitudePay', 'latitudepay', 133.896, 18.2, 0.15),
  quoter: mark('Quoter', 'quoter', 93.996, 28.002),
  knovos: mark('Knovos', 'knovos', 85.232, 14),
  safexpay: mark('SafeXpay', 'safexpay', 83.02, 22.398, 0.08),
  doodle: mark('Doodle', 'doodle', 104, 24, -0.15),
  pledge: mark('Pledge', 'pledge', 92.032, 19.6),
  gttools: mark('GT Tools', 'gttools', 67.384, 19.6, -0.15),
  incluude: mark('Incluude', 'incluude', 88.906, 16.851, -0.15),
} as const satisfies Record<string, StoryMark>;
