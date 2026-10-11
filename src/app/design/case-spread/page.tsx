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
            A worked example argues one thing: we changed a real product and this is what it got. The
            outcome is the claim — its sentence at lead-lg behind a blue start rule (Callout&rsquo;s
            example mark) with the action under it — beside the evidence at 16:9; the problem and what
            we did are the backstory on hairlines underneath, on the same [5, 7] tracks.
          </p>
        </Layout>
      </Section>

      <Variation
        id="shape"
        title="1 · Claim, evidence, two story parts — the shape"
        note="From 1024 row 1 is [5, 7]: heading, claim, action | image (top on the heading's top). Row 2 is the story on the same tracks, so the short part sits under the claim and the long one under the image. Below 1024: heading, claim, action, image, story."
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
        note="Three parts take three equal tracks. Without an action the claim ends the column."
      />
      <CaseSpread
        heading="Example: a staffing product"
        headingId="csp-three"
        claim={CLAIM}
        image={IMAGE}
        story={[
          PROBLEM,
          DID,
          { title: 'What stayed.', body: 'The screens people already knew, wherever they worked.' },
        ]}
      />

      <Variation
        id="tint"
        title="3 · Tint ground"
        note="Every --csp-* token restated on tint; the claim's rule stays the accent."
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
    </>
  );
}
