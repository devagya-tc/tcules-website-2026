import type { ReactNode } from 'react';

import { Layout, Section, TextureClosing } from '@/components';
import {
  BlockCard,
  ContentSection,
  CtaRow,
  CtaSection,
  EnquiryForm,
  ListCard,
  PageHero,
  Proof,
  type CtaIconPoint,
  type CtaPoint,
  type ProofFigure,
} from '@/patterns';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * The CTA family of the Tcules UI kit (cmp-cta) — the K offer and the L close as finished bands,
 * then CtaRow, the section-level ask, inside two ordinary ContentSections.
 *
 * Laid out as a showcase rather than a ladder: an intro band, then each variation under a titled
 * band of its own. The unit ladder — every slot, every surface, every edge case — stays at
 * /design/cta-section. Every band here is copy at its § 1.5 ceiling or under it, and fits the
 * 1470 × 830 fold with its slack (visual-direction § 1.3).
 *
 * Photographs: one per band, none twice and no two from one shoot (§ 5.1; the final fix round
 * swapped a second frame of the whiteboard session and a frame whose black-and-white striped sleeve
 * filled a third of the crop), every one `quiet` (§ 5.5 rule 3), all from the neutral family so the
 * page never mixes warm and cool (§ 5.5 rule 1). Portrait masters where the frame is 4:5, so the
 * crop is drawn from pixels rather than upscaled. Texture: the `closing` recipe (TextureClosing,
 * § 6.3 as amended) on the three closes — no number is written here. Blue: the solid ask, the point
 * markers and glyphs, every link and its arrow.
 */

const photo = (id: PhotoId) => getKitPhoto(id);

const FORM_CONTEXT = {
  originRoute: ROUTES.designCtaSection,
  placement: 'kit-cta-specimen',
  family: 'design-system',
  serviceOrAudit: 'cta-kit',
  referrer: '',
  campaign: '',
} as const;

/* ── Copy, at the § 1.5 ceilings ──────────────────────────────────────────────────────────────
   K: label ≤ 4 words / detail ≤ 12 words, one line each. L: detail ≤ 18 words, two lines. */

const AUDIT_POINTS = [
  { label: 'One critical journey, end to end' },
  { label: 'A ranked list of what to fix first' },
  { label: 'A readout with your team' },
] as const satisfies readonly CtaPoint[];

const HEALTH_POINTS = [
  { icon: 'layers', label: 'Drift between Figma, code and production' },
  { icon: 'graph-up', label: 'Adoption, product by product' },
  { icon: 'document-text', label: 'A fix list in the order it pays back' },
] as const satisfies readonly CtaIconPoint[];

const SPRINT_POINTS = [
  { label: 'Eight stakeholder interviews' },
  { label: 'A concept tested with five users' },
  { label: 'A costed roadmap for what comes next' },
] as const satisfies readonly CtaPoint[];

const REVIEW_POINTS = [
  {
    label: 'Tested by hand',
    detail:
      'Screen readers, keyboard paths and contrast, checked on your live product rather than a style guide.',
  },
  {
    label: 'Traced to components',
    detail: 'Each issue names the component that causes it, so one fix clears every screen.',
  },
  {
    label: 'Retested in thirty days',
    detail: 'We confirm every fix shipped, then close the report with you.',
  },
] as const satisfies readonly CtaPoint[];

const MODERNISE_POINTS = [
  { label: 'The real workflow, mapped' },
  { label: 'The rules nobody wrote down' },
  { label: 'A rebuild that never stops operations' },
] as const satisfies readonly CtaPoint[];

const WORKSHOP_POINTS = [
  {
    icon: 'users-group-rounded',
    label: 'Everyone in one room',
    detail: 'Product, design, engineering and the person who signs off.',
  },
  {
    icon: 'flag',
    label: 'One decision, made',
    detail: 'The question stalling the roadmap, answered on the day.',
  },
  {
    icon: 'notebook',
    label: 'A written record',
    detail: 'What was agreed, by whom, and what happens on Monday.',
  },
] as const satisfies readonly CtaIconPoint[];

const CLOSE_POINTS = [
  {
    label: 'A thirty-minute call',
    detail: 'We ask what you have tried, what it cost, and what has to be true next.',
  },
  {
    label: 'A written proposal',
    detail: 'Scope, team and timeline on one page, within a week of the call.',
  },
  {
    label: 'A fixed first phase',
    detail: 'A defined piece of work with a price, so you can judge us on output.',
  },
] as const satisfies readonly CtaPoint[];

const OPEN_POINTS = [
  {
    label: 'Start with the work',
    detail: 'Case studies that show the decisions, not only the screens.',
  },
  {
    label: 'Talk to a principal',
    detail: 'Thirty minutes with the person who would lead your project.',
  },
  { label: 'Leave with a plan', detail: 'A first phase, scoped and priced, within a week.' },
] as const satisfies readonly CtaPoint[];

const CASES = [
  {
    title: 'Claims, in half the steps',
    body: 'An insurer’s adjuster workflow, rebuilt around the decisions it actually makes.',
    image: 'workshop-hands-writing',
  },
  {
    title: 'One system, four products',
    body: 'A shared component library that let a fintech ship in step across platforms.',
    image: 'hand-sketch-wireframe',
  },
  {
    title: 'Care plans clinicians trust',
    body: 'A patient record that shows what changed, who changed it, and why.',
    image: 'team-laptops-table',
  },
] as const satisfies readonly { title: string; body: string; image: PhotoId }[];

const PHASES = [
  {
    title: 'Understand the work',
    body: 'Interviews, analytics and a walk through the product as your users meet it today.',
  },
  {
    title: 'Settle the model',
    body: 'Which records exist, which rules bind them, and who is allowed to change each one.',
  },
  {
    title: 'Design and ship',
    body: 'Interface, components and code, released in increments your team can run without us.',
  },
] as const;

/* The D band's aside in its other form (§ 3.3: "D always has an aside: a photograph or one
   --text-stat-lg figure"). A figure rather than a photograph here because a 3:2 photo at 381 ran
   the head column ~100 past the CtaRow and neither foot aligned (final fix round); the figure
   ends above the body's foot, so the band closes on one line — the CtaRow. */
const PHASE_STAT: ProofFigure = {
  value: '0',
  label: 'handoffs between the people who research, design and build',
};

const VARIATIONS = [
  { id: 'k-offer', index: '01', name: 'K offer\u00a0· numbered' },
  { id: 'k-icons', index: '02', name: 'K offer\u00a0· icon points' },
  { id: 'k-plain', index: '03', name: 'K offer\u00a0· plain points' },
  { id: 'k-beside', index: '04', name: 'K offer\u00a0· no photograph' },
  { id: 'k-flipped', index: '05', name: 'K offer\u00a0· photo first' },
  { id: 'k-wide', index: '06', name: 'K offer\u00a0· landscape photo' },
  { id: 'l-close', index: '07', name: 'L close\u00a0· with the form' },
  { id: 'l-no-points', index: '08', name: 'L close\u00a0· contact strip' },
  { id: 'l-open', index: '09', name: 'L close\u00a0· centred, two actions' },
  { id: 'row-cards', index: '10', name: 'CtaRow\u00a0· under a card set' },
  { id: 'row-rows', index: '11', name: 'CtaRow\u00a0· under ruled rows' },
  { id: 'tint', index: '12', name: 'Surface proof\u00a0· tint' },
] as const;

type VariationId = (typeof VARIATIONS)[number]['id'];

/**
 * The titled band in front of each variation: an index and a name in the head track, what to look
 * for in the body track. A band of its own, tight, so the variation under it sits edge to edge with
 * its neighbours exactly as it would on a route — a CTA band nested in a specimen's column would
 * move its content column and every measurement on the page with it. The `spec` class lets the
 * shots harness find and crop it.
 */
function Title({ id, children }: { id: VariationId; children: ReactNode }) {
  const variation = VARIATIONS.find((v) => v.id === id)!;
  return (
    <Section density="tight" id={id}>
      <Layout
        className={s.spec}
        columns={{ lg: [1, 2] }}
        colGap="section"
        rowGap="text"
        align="end"
      >
        <Layout rowGap="tight">
          <p className={s.eyebrow}>{variation.index}</p>
          {/* An h2 at h3 scale: the specimen's sections sit under the page's h1, beside the
              band's own h2, so the outline never steps h1 → h3 → h2. */}
          <h2 className={t.h3}>{variation.name}</h2>
        </Layout>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

export default function KitCtaSpecimen() {
  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────────────────────────────────── */}
      <PageHero
        arrangement="beside"
        eyebrow="Tcules UI kit"
        title="The ask, made twice"
        body={[
          'Two bands carry a page’s ask. The offer interrupts mid-page with one concrete thing to take away; the close ends the page on paper, with the form.',
        ]}
        media={{ type: 'image', image: photo('workshop-whiteboard-lounge') }}
      />

      {/* The index: every variation, linked to its band. A tight band of its own, three across. */}
      <Section density="tight">
        <Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="none">
          {VARIATIONS.map((v, i) => (
            <ListCard
              key={v.id}
              title={v.name}
              href={`#${v.id}`}
              marker={{ type: 'number', value: i + 1, tone: 'neutral' }}
              size="sm"
            />
          ))}
        </Layout>
      </Section>

      {/* ── 01 · K offer, numbered, solid + ghost──────────────────────────────────────────── */}
      <Title id="k-offer">
        [7, 5]: H-full, a lede held narrower than its heading, three one-line numbered points
        and the actions in the 667 copy column; a quiet 4:5 photograph in the 477 track. The
        head sits on the photo&rsquo;s top edge and the actions on its foot (§ 3.2 rule 1).
        Solid first, no arrow, then its partner: a blue ghost with the arrow (owner, 7 Oct
        2026).
      </Title>
      <CtaSection
        arrangement="offer"
        eyebrow="Free product audit"
        heading="Find the friction before you fund the fix"
        body={[
          'A senior designer reviews one critical journey and returns a ranked list of what to change first.',
        ]}
        points={AUDIT_POINTS}
        converts
        actions={[
          { label: 'Request the audit', href: ROUTES.uxProductAudit },
          { label: 'See a sample report', href: ROUTES.audits },
        ]}
        media={{ image: photo('designer-monitor-ui') }}
      />

      {/* ── 02 · K offer, icon points, one action ──────────────────────────────────────────── */}
      <Title id="k-icons">
        The same band with Solar Bold glyphs in place of numerals, in the marker&rsquo;s blue —
        the points are what the offer contains, not a sequence, so the list is a <code>ul</code>
        . One solid action.
      </Title>
      <CtaSection
        arrangement="offer"
        markers="icon"
        eyebrow="Design system health check"
        heading="Know what your design system is costing you"
        body={[
          'We audit tokens, components and adoption across your products, then show where drift slows delivery.',
        ]}
        points={HEALTH_POINTS}
        converts
        actions={[{ label: 'Book a health check', href: ROUTES.designSystemAudit }]}
        media={{ image: photo('pencil-wireframe-red') }}
      />

      {/* ── 03 · K offer, plain points ─────────────────────────────────────────────────────── */}
      <Title id="k-plain">
        Plain points: the serif label carries each one on its own, for short claims a numeral or
        a glyph would over-dress. Three lines, so the head and the photograph carry the band.
      </Title>
      <CtaSection
        arrangement="offer"
        markers="plain"
        eyebrow="Discovery sprint"
        heading="Two weeks to a decision your team can defend"
        body={[
          'A fixed-scope sprint for when the brief is still an argument. You leave with evidence, not opinions.',
        ]}
        points={SPRINT_POINTS}
        converts
        actions={[
          { label: 'Plan a sprint', href: ROUTES.contact },
          { label: 'How discovery works', href: ROUTES.howWeWork },
        ]}
        media={{ image: photo('pair-at-laptop-sticky-wall') }}
      />

      {/* ── 04 · K offer without a photograph ──────────────────────────────────────────────── */}
      <Title id="k-beside">
        No photograph: [1, 2]. The head and its actions in the 381 head track (H-beside-actions,
        the lead at body-lg), the points in the 763 body track with two-line details (§ 1.4,
        411).
      </Title>
      <CtaSection
        arrangement="offer"
        eyebrow="Accessibility review"
        heading="Ship an interface everyone can use"
        body={[
          'An expert review against WCAG 2.2 AA, with every issue mapped to the component that causes it and the change that closes it.',
        ]}
        points={REVIEW_POINTS}
        converts
        actions={[
          { label: 'Request a review', href: ROUTES.audits },
          { label: 'What we test', href: ROUTES.howWeWork },
        ]}
      />

      {/* ── 05 · K offer, photo at start ───────────────────────────────────────────────────── */}
      <Title id="k-flipped">
        <code>media.side=&quot;start&quot;</code>: the photograph takes the start track and
        keeps its 5. Visual only — below 1024 the photo still follows the copy (§ 3.7 item 4).
      </Title>
      <CtaSection
        arrangement="offer"
        eyebrow="Product modernisation"
        heading="Modernise the workflow, not only the screens"
        body={[
          'Start with a two-week assessment of one legacy journey and the decisions buried inside it.',
        ]}
        points={MODERNISE_POINTS}
        converts
        actions={[
          { label: 'Start an assessment', href: ROUTES.productModernisationAssessment },
          { label: 'Read a case study', href: ROUTES.caseStudies },
        ]}
        media={{ image: photo('wireframe-wall'), side: 'start' }}
      />

      {/* ── 06 · K offer, landscape photo ──────────────────────────────────────────────────── */}
      <Title id="k-wide">
        <code>media.frame=&quot;landscape&quot;</code>: the other rectangle. [5, 7] — the head
        and its actions in 5, centred on a 3:2 photograph in 7 — and the points as a ruled 3-up
        strip under both. A page with two offers sets one of each.
      </Title>
      <CtaSection
        arrangement="offer"
        markers="icon"
        eyebrow="Alignment workshop"
        heading="One day to agree what the product is for"
        body={[
          'A facilitated session for the people who have to live with the answer, run by the designers who will build it.',
        ]}
        points={WORKSHOP_POINTS}
        converts
        actions={[
          { label: 'Book the workshop', href: ROUTES.contact },
          { label: 'See the agenda', href: ROUTES.howWeWork },
        ]}
        media={{ image: photo('whiteboard-two-hands'), frame: 'landscape' }}
      />

      {/* ── 07 · L close with the form ─────────────────────────────────────────────────────── */}
      <Title id="l-close">
        On paper, at h1: the page&rsquo;s last ask outweighs every head above it. [10, 7] — copy
        and three two-line points in 673, read down from the form&rsquo;s first label; the full
        EnquiryForm fills its 471 to the column edge. The <code>closing</code> equaliser rises
        from the band&rsquo;s edge into the air under the copy, a gap step clear of it, and the
        form column stays clean. Below 1024 it becomes the full-bleed <code>horizon</code>.
      </Title>
      <CtaSection
        eyebrow="Start a project"
        heading="Tell us what you are building"
        body={[
          'We reply within one working day with a named designer and a time to talk, not an automated acknowledgement.',
        ]}
        points={CLOSE_POINTS}
        form={
          <EnquiryForm
            action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
            context={FORM_CONTEXT}
            scheduleHref={ROUTES.contact}
          />
        }
        texture={<TextureClosing />}
      />

      {/* ── 08 · L close, contact strip ─────────────────────────────────────────────────────── */}
      <Title id="l-no-points">
        No points: the lede and a contact strip a <code>stack</code> under it — where to write,
        how fast we answer, which hours we keep. The strip follows the copy rather than pinning
        to the form&rsquo;s foot (it ends in a key and a value, not an action), and the deeper
        air under it is where the equaliser stands tallest.
      </Title>
      <CtaSection
        eyebrow="Hiring a design partner"
        heading="Bring the problem as it is"
        body={[
          'You do not need a brief. Describe what is not working, and we will help decide what kind of project it should become.',
          'A principal designer reads every enquiry.',
        ]}
        form={
          <EnquiryForm
            action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
            context={{ ...FORM_CONTEXT, placement: 'kit-cta-specimen-2' }}
            scheduleHref={ROUTES.contact}
            urlLabel="Where can we see it?"
          />
        }
        contact={[
          { label: 'Write to', value: 'hello@tcules.com', href: 'mailto:hello@tcules.com' },
          { label: 'Reply', value: 'Within one working day' },
          { label: 'Hours', value: 'IST, GMT and ET' },
        ]}
        texture={<TextureClosing />}
      />

      {/* ── 09 · L close, centred, two actions ──────────────────────────────────────────────────── */}
      <Title id="l-open">
        <code>arrangement=&quot;open&quot;</code>: the close that asks for a click, as one
        centred object at display scale — the lede, three points held to the middle 8 of 12, and
        two actions on one axis — with the <code>closing</code> equaliser rising at both flanks,
        clear of the column.
      </Title>
      <CtaSection
        arrangement="open"
        eyebrow="Next step"
        heading="See how we would approach your product"
        body={[
          'Read three engagements like yours, or book a call and we will sketch a first phase with you.',
        ]}
        points={OPEN_POINTS}
        converts
        actions={[
          { label: 'Book a call', href: ROUTES.contact },
          { label: 'See case studies', href: ROUTES.caseStudies },
        ]}
        texture={<TextureClosing side="both" />}
      />

      {/* ── 10 · CtaRow under a card set ───────────────────────────────────────────────────── */}
      <Title id="row-cards">
        A C-image band: centred H-title, three whole-card links, then a section-level CtaRow — a
        primary link, the band&rsquo;s blue Signal, centred under the centred head. Rule off: a
        centred hairline narrower than the card grid matched no edge on the page.
      </Title>
      <ContentSection
        align="center"
        eyebrow="Selected work"
        heading="Products we have shipped"
        footer={
          <CtaRow
            align="center"
            rule={false}
            note="Each case study names the decision that changed the product."
            actions={[{ label: 'All case studies', href: ROUTES.caseStudies }]}
          />
        }
      >
        <Layout as="ul" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="column" equalRows>
          {CASES.map((card) => (
            <BlockCard
              key={card.title}
              title={card.title}
              body={card.body}
              href={ROUTES.caseStudies}
              tracks={3}
              media={{ type: 'image', image: photo(card.image) }}
            />
          ))}
        </Layout>
      </ContentSection>

      {/* ── 11 · CtaRow under ruled rows ───────────────────────────────────────────────────── */}
      <Title id="row-rows">
        A D band: beside head with a stat aside, three numbered rows, and a neutral link CtaRow
        with its note — rule off, because the last row&rsquo;s own rule closes the body. The
        aside ends above the body&rsquo;s foot, so the band closes on the CtaRow&rsquo;s one
        line.
      </Title>
      <ContentSection
        arrangement="beside"
        eyebrow="How an engagement runs"
        heading="Three phases, one team throughout"
        lead="The people who interview your users are the people who ship your interface."
        aside={<Proof figures={[PHASE_STAT]} />}
        footer={
          /* A link row: blue, always (owner, 7 Oct 2026 — colour follows the kind of action, and
             a link is never ink in content). It carries its trailing arrow. */
          <CtaRow
            rule={false}
            note="Each phase ends in something your team can run without us."
            actions={[{ label: 'How we work', href: ROUTES.howWeWork }]}
          />
        }
      >
        <Layout as="ol" rowGap="none">
          {PHASES.map((phase, index) => (
            <ListCard
              key={phase.title}
              title={phase.title}
              body={phase.body}
              titleAs="h3"
              marker={{ type: 'number', value: index + 1 }}
            />
          ))}
        </Layout>
      </ContentSection>

      {/* ── 12 · Surface proof on tint ─────────────────────────────────────────────────────── */}
      <Title id="tint">
        Surface proof — on pages, tint is the proof band only (§ 1.7). The K offer on tint:
        every ink restates itself, the markers stay blue at 5.51:1.
      </Title>
      <CtaSection
        arrangement="offer"
        surface="tint"
        eyebrow="Design-to-code audit"
        heading="Close the gap between the file and the build"
        body={[
          'We compare your Figma library with production and show exactly where the two disagree.',
        ]}
        points={[
          { label: 'A census of every component' },
          { label: 'Drift, ranked by who sees it' },
          { label: 'A handoff fix that holds' },
        ]}
        converts
        actions={[
          { label: 'Request the audit', href: ROUTES.designToCodeAudit },
          { label: 'What it covers', href: ROUTES.audits },
        ]}
        media={{ image: photo('hands-trackpad') }}
      />
    </>
  );
}
