import { Layout, Section } from '@/components';
import { CaseSpread, CtaRow } from '@/patterns';
import { caseStudyPath, CASE_STUDY_SLUGS } from '@/lib/routes';
import { placeholderCover } from '@/lib/placeholders';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/case-spread — one worked example, with the emphasis where the argument is (product-design
 * round 6, 11 Oct 2026; page-mapping § 23). Every arrangement: the claim beside its 16:9 evidence
 * with two story parts (the shape), three parts, no action, and the paper and tint grounds. The
 * evidence is a register placeholder (a real capture is on /services/product-design).
 */

const IMAGE = placeholderCover('scissors');
const ACTION = (
  <CtaRow
    rule={false}
    actions={[{ label: 'Read the case', href: caseStudyPath(CASE_STUDY_SLUGS.Scissors) }]}
  />
);
const CLAIM = {
  title: 'The result.',
  body: 'One connected model of clients, candidates and jobs, so details entered once carry through the rest of the work.',
};
const PROBLEM = {
  title: 'The problem.',
  body: 'Onboarding, shortlisting, talent pools and job creation each ran as a separate sequence, and recruiters typed the same details four times.',
};
const DID = {
  title: 'What we did.',
  body: 'We interviewed recruiters, mapped the objects the work is really about, then redesigned all four sequences around them, keeping the screens people already knew where they worked.',
};

export default function CaseSpreadSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>CaseSpread</h1>
          <p className={t.lead}>
            A worked example argues one thing: we changed a real product and this is what it
            got. The story runs in the order it happened — the problem, what we did, the result
            — read down one column, held by type and spacing alone (no rail, no rules), with the
            action closing it; the evidence sits beside it at 16:9 and holds in view while the
            story is read.
          </p>
        </Layout>
      </Section>

      <Variation
        id="shape"
        title="1 · Problem, what we did, the result — the shape"
        note="The heading across the band, then [5, 7] from 1024: the story read down, the steps a `block` apart with no rail or rules, the action under it | the image at 16:9, its top on the problem's, sticky. Below 1024: heading, story, action, image."
      />
      <CaseSpread
        heading="Example: a staffing product"
        headingId="csp-shape"
        claim={CLAIM}
        action={ACTION}
        image={IMAGE}
        story={[PROBLEM, DID]}
      />

      <Variation
        id="three"
        title="2 · Three story parts, no action"
        note="Three steps before the result read down the same column. Without an action the result ends the column."
      />
      <CaseSpread
        heading="Example: a staffing product"
        headingId="csp-three"
        claim={CLAIM}
        image={IMAGE}
        story={[
          PROBLEM,
          DID,
          {
            title: 'What stayed.',
            body: 'The screens people already knew, wherever they worked.',
          },
        ]}
      />

      <Variation
        id="tint"
        title="3 · Tint ground"
        note="Every --csp-* token restated on tint."
      />
      <CaseSpread
        heading="Example: a staffing product"
        headingId="csp-tint"
        claim={CLAIM}
        action={ACTION}
        image={IMAGE}
        story={[PROBLEM, DID]}
        surface="tint"
      />

      <Variation
        id="strip"
        title="4 · The strip — the problem and what we did drawn, the result shown"
        note="`scenes` (owner, 26 Oct 2026, product-design page): an eyebrow over the case's name, the action at the head's end; the problem and what we did drawn on the same screen (a Sketch scene each) and the evidence as the result's picture, three on one ground joined in reading order; each step's words under its picture, no rules. Paper here; tint below, where the drawings' own plates are the panels."
      />
      <CaseSpread
        eyebrow="Example"
        heading="Dealpath"
        headingId="csp-strip"
        claim={CLAIM}
        action={ACTION}
        image={IMAGE}
        story={[PROBLEM, DID]}
        scenes={['case-dealpath-problem', 'case-dealpath-did']}
      />
      <CaseSpread
        eyebrow="Example"
        heading="Dealpath"
        headingId="csp-strip-tint"
        claim={CLAIM}
        action={ACTION}
        image={IMAGE}
        story={[PROBLEM, DID]}
        scenes={['case-dealpath-problem', 'case-dealpath-did']}
        surface="tint"
      />
    </>
  );
}
