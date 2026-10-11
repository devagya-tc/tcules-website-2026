import type { ClientMarkProps } from '@/components';
import { clientMark } from '@/lib/client-marks';

/**
 * The nine real client marks (public/clients/*.svg), read from `src/lib/client-marks.ts` (the site's
 * one record of them) and named here for the specimens — the ClientMark
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

const client = (name: string): ClientRecord => {
  const record = clientMark(name);
  if (!record) throw new Error(`No approved mark for "${name}" in src/lib/client-marks.ts.`);
  return record;
};

export const OMNY = client('Omny');
export const LATITUDEPAY = client('LatitudePay');
export const QUOTER = client('Quoter');
export const KNOVOS = client('Knovos');
export const SAFEXPAY = client('SafeXpay');
export const DOODLE = client('Doodle');
export const PLEDGE = client('Pledge');
export const GT_TOOLS = client('GT Tools');
export const INCLUUDE = client('Incluude');
/* Eden AI's mark is a trimmed transparent PNG (home round 3): only its alpha is used, as a mask. */
export const EDEN_AI = client('Eden AI');

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
