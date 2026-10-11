import { notFound } from 'next/navigation';

import { Layout, Section } from '@/components';
import { ContentSection, Gateway } from '@/patterns';
import { getCorpusPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { gatewayItems } from '@/templates';

import { Specimen } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * /design/kit/gateway — the situation selector (home "What do you need next?", round 6, 11 Oct 2026).
 *
 * On the real corpus band (read from the content seam, so the words and the links are home's own,
 * never restated here). One arrangement: rounds 1–5's cards, lists and grids were withdrawn after the
 * owner rejected them (page-mapping § 22). Shown on paper and on tint, the two grounds a band may
 * take.
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
            <p className={t.eyebrow}>UI kit · the situation selector</p>
            <h1>Gateway</h1>
            <p className={t.lead}>
              Six reader situations down one column. The reader recognises their situation first, so
              the titles are the band&rsquo;s largest repeated thing; one is lit, and its sentence
              and service stand beside it, level with it. Point at or Tab to another situation and
              the answer follows. Below 1024 every situation shows its sentence and service.
            </p>
          </Layout>
        </Layout>
      </Section>

      <Variation
        id="paper"
        title="G.1 · Selector on paper — home"
        note="From 1024: the lit title in ink with its arrow, five at rest in the quieter ink, the answer in the trailing 5 of [7, 5] at lead size with the service as the link, moving level with the lit title. Below 1024: every title, sentence and service in one column. Every word is in the HTML at every width."
      />
      <ContentSection heading={heading} headingId="gw-paper">
        <Gateway items={items} />
      </ContentSection>

      <Variation
        id="tint"
        title="G.2 · Selector on tint"
        note="The same on the tint ground: the resting titles step to neutral-600 to keep 3:1."
      />
      <ContentSection heading={heading} headingId="gw-tint" surface="tint">
        <Gateway items={items} />
      </ContentSection>
    </>
  );
}
