import type { ClientMarkProps } from '@/components';

/**
 * The nine real client marks (public/clients/*.svg), for the specimens only — the ClientMark
 * specimen and the kit's H family (/design/kit/logos) read the same records, so a correction judged
 * on one is the correction rendered on the other. On the site the same three facts arrive from the
 * CMS beside the file: the viewBox, and the weight correction "recorded with the asset" (ch05 §10).
 *
 * width / height are each file's viewBox. The corrections are judged by eye in a course at 1440 and
 * 390 so that a row reads as one even grey line (fix round 2, 6 Oct 2026):
 *   - the heavy bold wordmarks come DOWN the full 15%: Doodle, GT Tools and Incluude;
 *   - the light ones come UP: LatitudePay's hairline, letter-spaced capitals the full 15% (which
 *     takes effect since the width cap no longer re-applies after a correction — ClientMark.module.css),
 *     and SafeXpay's light strokes 8%;
 *   - Omny, Quoter, Knovos and Pledge are the set's middle weight and carry none. Quoter was tried
 *     at +8% (its outline reads lighter than a solid box) and then read as the heaviest in the
 *     course: the ring's area carries it at 0.
 */
export type ClientRecord = Omit<ClientMarkProps, 'className'>;

const client = (
  name: string,
  file: string,
  width: number,
  height: number,
  correction?: number,
): ClientRecord => ({ name, src: `/clients/${file}.svg`, width, height, correction });

export const OMNY = client('Omny', 'omny', 93.982, 24.792);
export const LATITUDEPAY = client('LatitudePay', 'latitudepay', 133.896, 18.2, 0.15);
export const QUOTER = client('Quoter', 'quoter', 93.996, 28.002);
export const KNOVOS = client('Knovos', 'knovos', 85.232, 14);
export const SAFEXPAY = client('SafeXpay', 'safexpay', 83.02, 22.398, 0.08);
export const DOODLE = client('Doodle', 'doodle', 104, 24, -0.15);
export const PLEDGE = client('Pledge', 'pledge', 92.032, 19.6);
export const GT_TOOLS = client('GT Tools', 'gttools', 67.384, 19.6, -0.15);
export const INCLUUDE = client('Incluude', 'incluude', 88.906, 16.851, -0.15);

/** The set, in the order a strip reads. Which mark leads is a content decision. */
export const CLIENTS: readonly ClientRecord[] = [
  OMNY,
  LATITUDEPAY,
  QUOTER,
  KNOVOS,
  SAFEXPAY,
  DOODLE,
  PLEDGE,
  GT_TOOLS,
  INCLUUDE,
];
