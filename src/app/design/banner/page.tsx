import type { ReactNode } from 'react';

import { Layout, Section, type SectionSurface } from '@/components';
import { Banner, CtaRow, TestimonialCard } from '@/patterns';
import { getKitPhoto } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * Banner — the proving ground.
 *
 * The family page (/design/kit/banner) shows each variation once, as a page would. This route is
 * coverage: every form on every surface with identical markup, every absent slot, stress copy at
 * the ceilings, and the strip's three shapes. Every specimen is a live band, so the 1240 column and
 * the seams are the real ones.
 */

const CTA = (
  <CtaRow actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]} rule={false} />
);
/* No blue band (fix round 1): blue is never a ground (owner ruling, § 4.3), and a specimen that
   paints one is the one place the branch would show it. The blue token block stays declared for
   self-containment, which tokens:check proves without a render. */
type ShownSurface = Exclude<SectionSurface, 'blue'>;
const SURFACES: readonly ShownSurface[] = ['paper', 'tint', 'ink'];
const SURFACE_NOTE: Record<ShownSurface, string> = {
  paper: 'Paper, the page ground.',
  tint: 'Surface proof — on pages, tint is the proof band only (§ 1.7).',
  ink: 'Surface proof — self-containment on ink; no page places a banner here.',
};

function Label({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Section>
      <Layout rowGap="block" className={s.spec}>
        <h2>{title}</h2>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

function FoldExempt({ reason, children }: { reason: string; children: ReactNode }) {
  return <div data-fold-exempt={reason}>{children}</div>;
}

export default function BannerSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Banner</h1>
          <p className={s.specNote}>
            The I band and the announcement strip. Three forms: <code>below</code> (a stacked
            head over a 3:1 photograph, 3:2 below 1024), <code>beside</code> (a 3:2 photograph
            or an illustration in 7 of [5, 7], the copy centred on it in 5) and{' '}
            <code>strip</code> (one line of body-sm and one blue link at Section&rsquo;s{' '}
            <code>strip</code> density). The banner is always <code>tight</code>. No frame on a
            photograph, radius 8, and no slot that could put type on the image. The family page
            is /design/kit/banner.
          </p>
        </Layout>
      </Section>

      <Label title="1 · below, on three surfaces">
        Identical markup; only the ground changes. The link stays blue (lifted to 300 on ink),
        the words stay ink.
      </Label>
      {SURFACES.map((surface) => (
        <Layout key={surface} rowGap="none">
          <Section surface={surface}>
            <p className={s.specTitle}>{SURFACE_NOTE[surface]}</p>
          </Section>
          <Banner
            surface={surface}
            eyebrow="How engagements start"
            heading="The work starts in the room"
            headingId={`bnr-below-${surface}`}
            lead="Before anything is drawn, we sit with the people doing the work and map the decisions they make."
            actions={CTA}
            image={{ ...getKitPhoto('workshop-hands-writing'), focus: { x: 0.45, y: 0.62 } }}
          />
        </Layout>
      ))}

      <Label title="2 · below, absent slots">
        No eyebrow; no lead and no action (the heading alone above the photograph, no empty
        trailing track); a lead with no action.
      </Label>
      <Banner
        heading="The work starts in the room"
        headingId="bnr-below-no-eyebrow"
        lead="Before anything is drawn, we sit with the people doing the work and map the decisions they make."
        actions={CTA}
        image={getKitPhoto('team-laptops-table')}
      />
      <Banner
        eyebrow="The studio"
        heading="Quiet rooms, slow decisions"
        headingId="bnr-below-heading-only"
        image={getKitPhoto('office-calm-interior')}
      />
      <Banner
        eyebrow="The studio"
        heading="Quiet rooms, slow decisions"
        headingId="bnr-below-lead-only"
        lead="We keep teams small and calendars sparse, so the hard product calls get the attention they need."
        image={getKitPhoto('sticky-wall-soft-focus')}
      />

      <Label title="2b · below, the action at the end of the heading's row">
        actionsAt=&quot;end&quot; (owner, 7 Oct 2026): the eyebrow on its own line, the heading and
        lead on the left, the action at the row&rsquo;s end with its top on the heading&rsquo;s top,
        from 1024. Below 1024 it falls back under the lead. The service page&rsquo;s I banner.
      </Label>
      <Banner
        eyebrow="Coded prototyping"
        heading="The work starts in the room"
        headingId="bnr-below-actions-end"
        lead="Before anything is drawn, we sit with the people doing the work and map the decisions they make."
        actionsAt="end"
        actions={CTA}
        image={getKitPhoto('team-laptops-table')}
      />

      <Label title="3 · beside, both sides, three surfaces">
        mediaSide end (default) and start. The copy is first in the DOM either way; reverse
        mirrors from 1024 only.
      </Label>
      {SURFACES.map((surface, i) => (
        <Layout key={surface} rowGap="none">
          <Section surface={surface}>
            <p className={s.specTitle}>
              {SURFACE_NOTE[surface]} mediaSide=&quot;{i % 2 ? 'start' : 'end'}&quot;
            </p>
          </Section>
          <Banner
            form="beside"
            surface={surface}
            mediaSide={i % 2 ? 'start' : 'end'}
            eyebrow="Design engineering"
            heading="The flow is drawn before it is built"
            headingId={`bnr-beside-${surface}`}
            lead="Every state, edge and handover is sketched with the engineers who will ship it, so nothing is rediscovered in code."
            actions={CTA}
            image={getKitPhoto('whiteboard-two-hands')}
          />
        </Layout>
      ))}

      <Label title="4 · beside, stress and absent slots">
        The ceiling (h2 on 3 lines in 477, lead on 3 lines: 389 of the 445 photograph), then the
        head alone with no action, then no eyebrow.
      </Label>
      <Banner
        form="beside"
        eyebrow="Product modernisation"
        heading="Replace the system without stopping the business that runs on it"
        headingId="bnr-beside-ceiling"
        lead="We map what the old product actually does, then move it in slices, so every release is one a team can trust."
        actions={CTA}
        image={getKitPhoto('board-review-backs')}
      />
      <Banner
        form="beside"
        mediaSide="start"
        eyebrow="The studio"
        heading="Quiet rooms, slow decisions"
        headingId="bnr-beside-no-action"
        lead="We keep teams small and calendars sparse, so the hard product calls get the attention they need."
        image={getKitPhoto('workshop-whiteboard-lounge')}
      />
      <FoldExempt reason="unbroken token: proves the heading wraps rather than widening the page">
        <Banner
          form="beside"
          heading="ProductModernisationAssessmentWorkbench"
          headingId="bnr-beside-token"
          lead="One unbroken token, to prove the heading wraps inside its track."
          image={getKitPhoto('desk-sketch-flatlay')}
        />
      </FoldExempt>

      <Label title="5 · strip">
        Tint (the default), with a label and a link; message only; and on paper and ink as
        surface proofs. Below 768 the link wraps under the message, 8 beneath.
      </Label>
      <Banner
        form="strip"
        label="New"
        message="Our field guide to modernising a live product, without stopping it, is out."
        link={{ label: 'Read the guide', href: ROUTES.guides }}
      />
      <Section>
        <p className={s.specTitle}>Message only</p>
      </Section>
      <Banner form="strip" message="The studio is closed for Diwali from 1 to 5 November." />
      <Section>
        <p className={s.specTitle}>Surface proofs: paper, then ink</p>
      </Section>
      <Banner
        form="strip"
        surface="paper"
        label="Event"
        message="Join our design systems clinic in Ahmedabad on 14 November."
        link={{ label: 'Save a seat', href: ROUTES.events }}
      />
      <Banner
        form="strip"
        surface="ink"
        label="Event"
        message="Join our design systems clinic in Ahmedabad on 14 November."
        link={{ label: 'Save a seat', href: ROUTES.events }}
      />

      {/* ── A run of beside banners: one band, one reason each (home round 3) ───────── */}
      <Section>
        <Layout rowGap="tight">
          <p className={s.specTitle}>A run · bandHead, h3 claims, a supporting quote, footer</p>
          <p className={s.specNote}>
            Home round 3 (11 Oct 2026): a band whose reasons each need a screen is a RUN of beside
            banners, alternating sides, one Section each. The run&rsquo;s h1 heading opens the
            first banner (<code>bandHead</code>) and its closing action ends the last (
            <code>footer</code>); each claim is an h3 at the h2 role (<code>headingAs</code>),
            and the client&rsquo;s words support it as the quiet unboxed card (
            <code>support</code>). The owner&rsquo;s ruling overrides &ldquo;never two beside
            banners in sight&rdquo; for a run.
          </p>
        </Layout>
      </Section>
      <Banner
        form="beside"
        bandHead={{ heading: 'Why teams pick a studio', headingId: 'spec-run-heading' }}
        heading="We find the real problem first"
        headingAs="h3"
        headingId="spec-run-one"
        lead="A request for new screens often hides a bigger question. We find it before anyone designs the wrong thing."
        support={
          <TestimonialCard
            size="sm"
            frame="none"
            item={{
              quoteHtml: '<p>“They found the real problem in the first week.”</p>',
              name: 'Alex Morgan',
              role: 'Head of Product',
              company: 'Northwind',
              rating: 5,
            }}
          />
        }
        image={getKitPhoto('whiteboard-pair-laptop')}
      />
      <Banner
        form="beside"
        mediaSide="start"
        heading="We like software with a lot going on"
        headingAs="h3"
        headingId="spec-run-two"
        lead="Many roles, permissions, approvals and exceptions, designed as one model."
        support={
          <TestimonialCard
            size="sm"
            frame="none"
            item={{
              quoteHtml: '<p>“They understood our complex concepts.”</p>',
              name: 'Priya Raman',
              role: 'VP Engineering',
              company: 'Contoso Health',
              rating: 4.5,
            }}
          />
        }
        footer={
          <CtaRow actions={[{ label: 'How to choose a studio', href: ROUTES.howWeWork }]} />
        }
        image={getKitPhoto('hand-sketch-wireframe')}
      />
    </>
  );
}
