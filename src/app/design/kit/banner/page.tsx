import type { ReactNode } from 'react';

import { Layout, Section, type MediaImage } from '@/components';
import { Banner, CtaRow, PageHero, Statement } from '@/patterns';
import { getKitPhoto } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../../_specimen/Specimen';

/**
 * cmp-banner — the family specimen, laid out as a page.
 *
 * Every variation the family owns, each as a live band under a caption band, so the bands sit edge
 * to edge on the 1240 column exactly as they would on a route and `fold:check` can measure them by
 * their `data-band`. Copy is showcase copy in the Tcules voice, at the § 1.5 ceilings; photographs
 * are the kit registry's, each one at least 1.9× its rendered box (§ 5.4).
 */

/* The product-design hero illustration, standing in for a banner's own drawing. A specimen asset
   only: a page that places an illustration in a banner draws one for it (ch05 § 4c). */
const ILLUSTRATION: MediaImage = {
  src: '/illustrations/services/product-design.paper.svg',
  alt: '',
  width: 962,
  height: 714,
  kind: 'illustration',
  /* The phone zoom's window (fix round 2): 1/1.8 of the drawing, x 317 to 852 of its 290 to 1252
     viewBox. Every callout in it keeps its label: EVIDENCE (its text starts at 318) with its arrow
     and the dashed evidence ellipse, and PRODUCT MODEL over the whole blue model panel (its edge
     is at 850). MODEL FIRST and the screen fall wholly outside, arrow and label together, rather
     than leaving an arrow pointing at nothing. The yellow path runs off the end edge, which
     reads as the model continuing into the screens the heading promises. */
  focus: { x: 0.306, y: 0.5 },
};

/**
 * A caption band: the variation's index and name in the head track, what to look for in the body
 * track, a hairline above. Tight, so the specimen band beneath keeps its own air.
 */
function Caption({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Section>
      <Layout
        columns={{ lg: [1, 2] }}
        colGap="section"
        rowGap="tight"
        align="start"
        className={s.spec}
      >
        <p className={s.specTitle}>
          {index} · {title}
        </p>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

export default function KitBannerSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={s.eyebrow}>Kit · cmp-banner</p>
          <h1>Banner, Statement and the strip</h1>
          <p className={s.specNote}>
            Three ways a page takes a breath. The I banner gives one photograph the whole band,
            with a head above it or beside it. The J statement sets one sentence at the h1 role
            with nothing else around it but air. The announcement strip is a single line on tint
            above the hero, for showcase pages only. Every band below is live, on the 1240
            column, and fits a 1470 × 830 screen with room to spare.
          </p>
        </Layout>
      </Section>

      {/* ── I · Banner, below ─────────────────────────────────────────────────────────── */}
      <Caption index="I.1" title="Banner below">
        A stacked head over a 3:1 photograph: eyebrow, heading and lead in one column, the blue
        link a stack under the lead, the photograph a stack beneath. (The H-row — heading in a
        one-third track, lead and link in the two-thirds — is retired: a text-only head is never
        split left/right, owner 7 Oct 2026.) At 390 the photograph crops 3:2.
      </Caption>
      <Banner
        eyebrow="How engagements start"
        heading="The work starts in the room"
        headingId="kit-banner-below"
        lead="Before anything is drawn, we sit with the people doing the work and map the decisions they make."
        actions={
          <CtaRow
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
            rule={false}
          />
        }
        image={{
          /* The work itself, not people posing beside it (fix round 2): hands and notebooks along
             a workshop table, faces out of frame. Anchored a little low, so the 3:1 crop holds
             the writing hands and the open pad rather than the shoulders above them. */
          ...getKitPhoto('workshop-hands-writing'),
          focus: { x: 0.45, y: 0.62 },
        }}
      />

      <Caption index="I.2" title="Banner below, no action">
        The same row with nothing to click: the lead alone in the trailing track, the blue rule
        the band&rsquo;s one accent. The photograph carries the band, which is the point of a
        banner.
      </Caption>
      <Banner
        eyebrow="The studio"
        heading="Quiet rooms, slow decisions"
        headingId="kit-banner-below-plain"
        lead="We keep teams small and calendars sparse, so the hard product calls get the attention they need."
        image={getKitPhoto('office-calm-interior')}
      />

      {/* ── I · Banner, beside ────────────────────────────────────────────────────────── */}
      <Caption index="I.3" title="Banner beside, photo right">
        A 3:2 photograph in 667 beside the copy in 477. The copy is a head and an action and
        nothing else, so it is centred on the photograph rather than stretched to it.
      </Caption>
      <Banner
        form="beside"
        eyebrow="Design engineering"
        heading="The flow is drawn before it is built"
        headingId="kit-banner-beside"
        lead="Every state, edge and handover is sketched with the engineers who will ship it, so nothing is rediscovered in code."
        actions={
          <CtaRow
            actions={[
              { label: 'Read about design engineering', href: ROUTES.designEngineering },
            ]}
            rule={false}
          />
        }
        /* A flow being drawn by hand, the subject in the middle third (fix round 2): the tablet
           shot had its stylus in the top-end corner over a blurred shirt. */
        image={getKitPhoto('hand-sketch-wireframe')}
      />

      <Caption index="I.4" title="Banner beside, photo left">
        mediaSide=&quot;start&quot; mirrors the split from 1024; the copy stays first in the
        reading order. The one solid ask a band may carry is the blue solid primary, the
        hero&rsquo;s, with its ghost partner beside it. On a page, never two beside banners
        within sight of each other: here they are a specimen set.
      </Caption>
      <Banner
        form="beside"
        mediaSide="start"
        eyebrow="Product audits"
        heading="A clear diagnosis in two weeks"
        headingId="kit-banner-beside-start"
        lead="A senior pair reviews the product, its data and its team, then hands you an ordered list of what to fix first."
        actions={
          <CtaRow
            emphasis="solid"
            converts
            actions={[
              { label: 'Book an audit', href: ROUTES.audits },
              { label: 'See a sample report', href: ROUTES.uxProductAudit },
            ]}
            rule={false}
          />
        }
        image={getKitPhoto('whiteboard-pair-laptop')}
      />

      <Caption index="I.5" title="Banner beside, illustration">
        An illustration in place of the photograph: whole, unboxed and unrounded, centred on the
        copy, and the band&rsquo;s blue mass, so it carries no texture. At 390 it zooms into the
        model panel; every callout left in the window keeps its label.
      </Caption>
      <Banner
        form="beside"
        eyebrow="Product design"
        heading="One model, then every screen after it"
        headingId="kit-banner-illustration"
        lead="We settle the product's records and rules first, design the behaviour second, and draw the surface last."
        actions={
          <CtaRow
            actions={[{ label: 'Explore product design', href: ROUTES.productDesign }]}
            rule={false}
          />
        }
        image={ILLUSTRATION}
      />

      {/* ── J · Statement ─────────────────────────────────────────────────────────────── */}
      <Caption index="J.1" title="Statement">
        One sentence at the h1 role, rendered as an h2: the page&rsquo;s only h1 is the
        hero&rsquo;s. The eyebrow directly above the sentence, a block apart, on the start edge;
        the sentence on its title measure, two lines at 1470, three at most at 1024. The rest is
        air, and the air is the design.
      </Caption>
      <Statement eyebrow="What we believe" id="kit-statement">
        Most product problems are decisions nobody has made yet.
      </Statement>

      <Caption index="J.2" title="Statement, head-half texture">
        The pixel grid arriving from the band&rsquo;s top-end corner, off its top and end edges.
        Its box stops 96 into the band, inside the 128 of open air, so only its feather reaches
        the sentence. From 1024 only.
      </Caption>
      <Statement eyebrow="How we work" id="kit-statement-texture" texture="head-half">
        Decide first. Then design what follows from it.
      </Statement>

      <Caption index="J.3" title="Statement as p">
        as=&quot;p&quot;: the same scale, kept out of the outline, for a statement that restates
        what the page already argues. A heading navigator lists nothing here.
      </Caption>
      <Statement eyebrow="In short" as="p">
        A small senior team, working in the open from week one.
      </Statement>

      <Caption index="J.4" title="Statement at display scale, with its link">
        size=&quot;display&quot;: the hero&rsquo;s display role on the display measure, for the
        one band that restates a page&rsquo;s argument at the scale of its opening (the service
        pages&rsquo; J). One link a stack under the sentence.
      </Caption>
      <Statement
        eyebrow="How we work"
        id="kit-statement-display"
        size="display"
        texture="head-half"
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
          />
        }
      >
        One accountable team, from the first question to the shipped build.
      </Statement>

      {/* ── The announcement strip ────────────────────────────────────────────────────── */}
      <Caption index="S.1" title="Announcement strip">
        Section density=&quot;strip&quot;: 24 of air, on tint, a blue mono label, one line of
        body-sm and one blue link. A strip, not a band: showcase pages only.
      </Caption>
      <Banner
        form="strip"
        label="New"
        message="Our field guide to modernising a live product, without stopping it, is out."
        link={{ label: 'Read the guide', href: ROUTES.guides }}
      />

      <Caption index="S.2" title="Strip above a hero">
        The kit/home opening (§ 8.3): the strip, then the photo hero. The strip is one line of
        copy and its 24 of air, and the hero still ends above the fold.
      </Caption>
      {/* A plain wrapper, no box and no seam: it only lets the shot script crop the pair as one. */}
      <div data-shot="strip-above-hero">
        <Banner
          form="strip"
          label="Studio"
          message="We are opening a design engineering practice in Bengaluru this winter."
          link={{ label: 'Meet the team', href: ROUTES.team }}
        />
        <PageHero
          title="Product design for teams who ship"
          body={[
            'A small senior studio for the product decisions that slow teams down: what to build, how it should behave, and how it reaches code.',
          ]}
          converts
          actions={[
            { label: 'Start a project', href: ROUTES.contact },
            { label: 'See our work', href: ROUTES.caseStudies },
          ]}
          arrangement="beside"
          /* Process, not a posed pair (fix round 2): a wall of printed wireframes being sorted. */
          media={{ type: 'image', image: getKitPhoto('wireframe-wall') }}
        />
      </div>
    </>
  );
}
