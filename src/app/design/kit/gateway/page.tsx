import { notFound } from 'next/navigation';

import { Layout, Section } from '@/components';
import { ContentSection, Gateway } from '@/patterns';
import { getCorpusPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { gatewayItems } from '@/templates';

import { Specimen } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * /design/kit/gateway — the situation router (home "What do you need next?", round 4, 11 Oct 2026).
 *
 * Three directions on the real corpus band (read from the content seam, so the words and the links
 * are home's own, never restated here), each a Gateway arrangement. The chosen one is home's; the
 * other two stay visible as explored alternatives so the owner can compare them in the browser.
 */

/** A caption strip above a band: the direction's name and what to look for. Scaffolding. */
function Variation({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <Section flush id={id}>
      <Specimen title={title} note={note}>
        {null}
      </Specimen>
    </Section>
  );
}

export default async function KitGatewayPage() {
  const page = await getCorpusPage(ROUTES.home);
  const band = page?.bands.find((b) => b.id === 'product-situations');
  if (!band) notFound();
  const items = gatewayItems(band);
  const heading = band.headingText;

  return (
    <>
      <Section>
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · the situation router</p>
            <h1>Gateway</h1>
            <p className={t.lead}>
              Six reader situations, each a whole link to the service that answers it. The title is
              the reason to click, so it leads; the sentence supports it; the service is named where
              the row ends. Three directions, on home&rsquo;s own words.
            </p>
          </Layout>
          <Layout as="ul" rowGap="tight" className={t.uiLg}>
            <li>
              <a href="#index">A · Index (chosen, on home)</a>
            </li>
            <li>
              <a href="#rows">B · Split rows (explored)</a>
            </li>
            <li>
              <a href="#grid">C · Decision grid (explored)</a>
            </li>
          </Layout>
        </Layout>
      </Section>

      <Variation
        id="index"
        title="A · Index — chosen, on home"
        note="One column under the display heading: each situation at h3 on one line, the service named under it on its cue, the sentence quiet beside them in 5 of [7, 5]. The six titles run down one edge, so they scan in one pass, and each says where it leads without a sentence being read. No rule between rows; the whole row is one link, and under the pointer it raises a ground across both tracks (hover a row). Scored 23 / 25. 814 at 1440, 1,347 at 390."
      />
      <ContentSection heading={heading} headingId="gw-index" headingSize="display">
        <Gateway items={items} arrangement="index" />
      </ContentSection>

      <Variation
        id="rows"
        title="B · Split rows — explored alternative"
        note="ContentSection beside: the display heading owns the leading track, the six situations stack in the trailing one as ruled rows, the title and the service on one line, the sentence under them. The calmest of the three, but the heading's track is empty under two lines of type, the h4 titles compete with the cue at each row's end, and the band runs 879 at 1440 — 49 past the fold. Scored 19 / 25."
      />
      <ContentSection
        heading={heading}
        headingId="gw-rows"
        headingSize="display"
        arrangement="beside"
      >
        <Gateway items={items} arrangement="rows" />
      </ContentSection>

      <Variation
        id="grid"
        title="C · Decision grid — explored alternative"
        note="A ruled cell per situation, three across: the service as a quiet mono line over the h4 title, the sentence, a blue arrow at the foot. The titles zigzag across two rows and wrap, it runs 845 at 1440 and 1,834 at 390, and it is a 3 × 2 grid two bands above What we do's 3 × 2 icon boxes, so the page repeats a shape. Scored 14 / 25."
      />
      <ContentSection heading={heading} headingId="gw-grid" headingSize="display">
        <Gateway items={items} arrangement="grid" />
      </ContentSection>
    </>
  );
}
