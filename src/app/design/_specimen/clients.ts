import type { ClientMarkProps } from '@/components';

/**
 * The nine real client marks (public/clients/*.svg), for the specimens only — the ClientMark
 * specimen and the kit's H family (/design/kit/logos) read the same records, so a size judged on
 * one is the size rendered on the other. On the site the same facts arrive from the CMS beside the
 * file: the viewBox, the density, and any weight correction "recorded with the asset" (ch05 §10).
 *
 * width / height are each file's viewBox; density is its measured ink coverage
 * (`node scripts/client-mark-density.mjs`), which ClientMark sizes by so every mark lays the same
 * area of ink (r7-logos fix round, 9 Oct 2026 — owner: LatitudePay and Quoter read half the mass
 * of Knovos, Doodle and Incluude). Quoter is measured with its pill left out (`--frame=Vector_9,
 * Vector_10`): the frame is a container the eye reads past, and counted as mass it drew the name
 * smaller still.
 *
 * The by-eye corrections of fix round 2 (6 Oct) were standing in for density — the bold
 * wordmarks down 15%, LatitudePay up 15%, SafeXpay up 8% — and are retired now it is measured:
 * keeping them would correct the same thing twice. The field stays, for what a measurement
 * cannot see.
 */
export type ClientRecord = Omit<ClientMarkProps, 'className'>;

const client = (
  name: string,
  file: string,
  width: number,
  height: number,
  density: number,
): ClientRecord => ({ name, src: `/clients/${file}.svg`, width, height, density });

export const OMNY = client('Omny', 'omny', 93.982, 24.792, 0.28);
export const LATITUDEPAY = client('LatitudePay', 'latitudepay', 133.896, 18.2, 0.16);
export const QUOTER = client('Quoter', 'quoter', 93.996, 28.002, 0.22);
export const KNOVOS = client('Knovos', 'knovos', 85.232, 14, 0.33);
export const SAFEXPAY = client('SafeXpay', 'safexpay', 83.02, 22.398, 0.25);
export const DOODLE = client('Doodle', 'doodle', 104, 24, 0.4);
export const PLEDGE = client('Pledge', 'pledge', 92.032, 19.6, 0.35);
export const GT_TOOLS = client('GT Tools', 'gttools', 67.384, 19.6, 0.36);
export const INCLUUDE = client('Incluude', 'incluude', 88.906, 16.851, 0.39);

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
