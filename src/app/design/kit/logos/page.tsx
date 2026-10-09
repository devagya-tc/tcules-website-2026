import {
  BrandMark,
  Icon,
  Layout,
  RatingBadge,
  Section,
  Texture,
  TextureShape,
} from '@/components';
import { getNavigation } from '@/content';
import { ROUTES } from '@/lib/routes';
import { ContentSection, CtaRow, ListCard, LogoGrid, logoGridColumns } from '@/patterns';

import { Specimen, specimenStyles as s } from '../../_specimen/Specimen';
import {
  CLIENTS,
  DOODLE,
  GT_TOOLS,
  INCLUUDE,
  KNOVOS,
  LATITUDEPAY,
  OMNY,
  PLEDGE,
  QUOTER,
  SAFEXPAY,
  type ClientRecord,
} from '../../_specimen/clients';
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit · H · Client logos — the boxed logo grid (r7-logos; 7 Oct review, owner 8 Oct 2026).
 *
 * The H band is now one unit, LogoGrid: every mark in a hairline cell of its own, equal weight, the
 * Enorm reference's treatment. The cell is the named exception to "no boxes" — a logo cell is not
 * a card. The band's heading is demoted to an eyebrow-size context line, and it may lead with the
 * sourced rating badge. No marquee. Each band is ≤ 830 at 1470 (`npm run fold:check`).
 *
 * The three variants differ in what leads, so the page never repeats one rectangle:
 *   01  the context line alone, start-aligned, nine marks three by three across the column;
 *   02  the RatingBadge leading a centred context line, eight marks in one flat four-by-two wall;
 *   03  a short heading beside the grid, nine marks three by three in the body track.
 * Then the counts: 12 cells (6 × 2 at 1440), with the closed edge, so 8, 9 and 12 are all on the page;
 * and the token proof on tint, ink and blue (never this band's ground on a page — blue is the
 * foreground accent — but every surface block in logo-grid.css has to render somewhere).
 *
 * Honesty (§ 5.8): the marks are the nine real files in public/clients, one ink, equal area, the
 * corrections recorded in ../../_specimen/clients.ts. The badge is the one sourced figure the seam
 * holds, the Clutch rating (fixtures/ratings.ts, via getNavigation). The twelve-cell grid repeats
 * three marks to reach twelve, and says so: a stress count, not a client list.
 */

/** Eight, for the flat wall: the set less Knovos. Which eight is a content choice. */
const EIGHT: readonly ClientRecord[] = [
  OMNY,
  LATITUDEPAY,
  QUOTER,
  SAFEXPAY,
  DOODLE,
  PLEDGE,
  GT_TOOLS,
  INCLUUDE,
];

/** Twelve, a STRESS count: the nine, then three repeated under a distinct name. */
const TWELVE: readonly ClientRecord[] = [
  ...CLIENTS,
  ...[OMNY, DOODLE, KNOVOS].map((m) => ({ ...m, name: `${m.name} (repeat)` })),
];

/** "4 × 2 · 4 × 2 · 2 × 4" — the grid a count takes at 1440, 1024 and 390. */
function shape(count: number, track: 'full' | 'body' = 'full') {
  const c = logoGridColumns(count, track);
  return [c.xl, c.lg, c.base].map((n) => `${n} × ${Math.ceil(count / n)}`).join(' · ');
}

/** The specimen's caption between bands: a hairline, a mono label and one line. */
function Label({ title, children }: { title: string; children: string }) {
  return (
    <Section flush>
      <Specimen title={title} note={children}>
        {null}
      </Specimen>
    </Section>
  );
}

export default async function KitLogosPage() {
  const { footer } = await getNavigation();
  const rating = footer.brand.rating;

  const badge = rating ? (
    <RatingBadge
      score={rating.score}
      platform={rating.platform}
      href={rating.href}
      icon={<Icon name="star" size="sm" />}
      mark={<BrandMark name="clutch" />}
    />
  ) : null;

  return (
    <>
      {/* ── Intro ───────────────────────────────────────────────────────────────────────── */}
      <Section>
        {/* hero-field (§ 6.3), at the recipe's numbers, clear of the copy track. */}
        <Texture>
          <TextureShape
            kind="ellipse"
            top={-220}
            right={-160}
            width="40%"
            height={420}
            blur={200}
          />
        </Texture>
        <Layout columns={{ lg: [7, 5] }} colGap="column" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={s.eyebrow}>UI kit · Band H</p>
            <h1>Client logos</h1>
            <p className={t.lead}>
              Every client in a cell of its own, at equal weight, so a wordmark, a badge and a
              symbol between words read as one set. The marks lead; the words step back to a
              single line.
            </p>
          </Layout>
          <Layout as="ol" columns={{ base: 1, md: 2, lg: 1 }} colGap="gutter" rowGap="block">
            <ListCard
              form="tile"
              marker={{ type: 'number', value: 1, tone: 'neutral' }}
              title="A cell is not a card"
              body="Hairlines between equal cells: the one named exception to no boxes."
            />
            <ListCard
              form="tile"
              marker={{ type: 'number', value: 2, tone: 'neutral' }}
              title="Rows are always full"
              body="The count sets the columns: 8 is 4 × 2, 9 is 3 × 3, 12 is 6 × 2."
            />
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="01 · Context line">
        {`The heading demoted to one eyebrow-size line over the open grid. Nine: ${shape(9)}.`}
      </Label>
      <Section aria-labelledby="logos-context">
        <LogoGrid
          marks={CLIENTS}
          context="Product teams we have designed and shipped with"
          contextId="logos-context"
        />
      </Section>

      {/* ── 02 ──────────────────────────────────────────────────────────────────────────── */}
      {badge ? (
        <>
          <Label title="02 · Led by the rating badge">
            {`The sourced Clutch badge leads a centred context line. Eight: ${shape(8)}.`}
          </Label>
          <Section aria-labelledby="logos-rated">
            <LogoGrid
              marks={EIGHT}
              badge={badge}
              context="Rated by the product teams we work with"
              contextId="logos-rated"
              align="center"
            />
          </Section>
        </>
      ) : null}

      {/* ── 03 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="03 · Beside a short heading">
        {`A short head and its action beside the grid in the body track. Nine: ${shape(9, 'body')}.`}
      </Label>
      <ContentSection
        arrangement="beside"
        eyebrow="Clients"
        heading="Nine teams, one way of working"
        headingId="logos-beside"
        actions={
          <CtaRow
            actions={[{ label: 'See the work', href: ROUTES.caseStudies }]}
            rule={false}
          />
        }
      >
        <LogoGrid marks={CLIENTS} track="body" />
      </ContentSection>

      {/* ── 04 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="04 · Twelve cells, closed edge">
        {`Stress count: three marks repeated to reach twelve, every cell a whole box. ${shape(12)}.`}
      </Label>
      <Section aria-labelledby="logos-twelve">
        <LogoGrid
          marks={TWELVE}
          context="Twelve cells, the outer edge drawn"
          contextId="logos-twelve"
          edges="closed"
        />
      </Section>

      {/* ── 05 ──────────────────────────────────────────────────────────────────────────── */}
      <Label title="05 · The other surfaces">
        Token proof, not placements: the rule and context inks on tint, ink and blue. Blue and
        ink are never this band&rsquo;s ground on a page.
      </Label>
      {(['tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface} aria-labelledby={`logos-${surface}`}>
          <LogoGrid
            marks={EIGHT}
            context={`surface="${surface}"`}
            contextId={`logos-${surface}`}
            contextAs="p"
            edges={surface === 'tint' ? 'open' : 'closed'}
          />
        </Section>
      ))}
    </>
  );
}
