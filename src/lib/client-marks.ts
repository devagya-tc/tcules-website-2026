/**
 * The approved client marks in `public/clients/`, by the client's name as the content names it — the
 * one place the site learns which clients have an SVG. Each record is the file plus the facts ch05
 * §10 says travel with it: the viewBox (only its ratio is used) and the measured ink density
 * (`node scripts/client-mark-density.mjs`), which ClientMark sizes by so every mark lays the same
 * area of ink. Structurally ClientMark's props (lib is a leaf and cannot name the component's type).
 *
 * A page asks `clientMark(name)`: a record when the client has an approved mark, undefined when it
 * does not — and then LogoGrid sets the name as a typeset wordmark until the file arrives
 * (docs/image-register.md, "client logo SVG needed"). The design specimens read the same records
 * (`src/app/design/_specimen/clients.ts`), so a size judged there is the size the site renders.
 */
export type ClientMarkRecord = {
  name: string;
  src: string;
  width: number;
  height: number;
  density: number;
};

const mark = (
  name: string,
  file: string,
  width: number,
  height: number,
  density: number,
): ClientMarkRecord => ({ name, src: `/clients/${file}.svg`, width, height, density });

export const CLIENT_MARKS: readonly ClientMarkRecord[] = [
  mark('Omny', 'omny', 93.982, 24.792, 0.28),
  mark('LatitudePay', 'latitudepay', 133.896, 18.2, 0.16),
  mark('Quoter', 'quoter', 93.996, 28.002, 0.22),
  mark('Knovos', 'knovos', 85.232, 14, 0.33),
  mark('SafeXpay', 'safexpay', 83.02, 22.398, 0.25),
  mark('Doodle', 'doodle', 104, 24, 0.4),
  mark('Pledge', 'pledge', 92.032, 19.6, 0.35),
  mark('GT Tools', 'gttools', 67.384, 19.6, 0.36),
  mark('Incluude', 'incluude', 88.906, 16.851, 0.39),
];

const BY_NAME = new Map(CLIENT_MARKS.map((record) => [record.name.toLowerCase(), record]));

/** The approved mark for a client named as the content names it, if one exists. */
export function clientMark(name: string): ClientMarkRecord | undefined {
  return BY_NAME.get(name.trim().toLowerCase());
}
