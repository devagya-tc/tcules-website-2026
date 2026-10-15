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
              Six reader situations down one column, every one at full ink. The reader recognises their
              situation first, so the titles are the band&rsquo;s largest repeated thing; a marker
              glides behind the current one and its sentence and service glide beside it. Below
              1024 every situation shows its sentence and service.
            </p>
          </Layout>
        </Layout>
      </Section>

      <Variation
        id="tiles"
        title="G.0 · Tiles and preview — home (round 10)"
        note="From 1024: six option tiles in a 3×2 on the left, titles only, each on a quiet ground; the first is current at rest. Pointer or focus makes a tile current (blue ground, arrow) and the preview on the right shows its drawing at 16:9, its sentence and its service. Clicking a tile goes to its service. Below 1024 every tile shows its sentence and service, two up from 768."
      />
      <ContentSection heading={heading} headingId="gw-tiles">
        <Gateway items={items} arrangement="tiles" />
      </ContentSection>

      <Variation
        id="grid"
        title="G.0b · Grid (round 9)"
        note="All six at equal weight in an even 3×2, every card a link: its drawing, its sans title, its sentence and its service, all visible with no interaction, in one fold. No ground at rest, so the copy is flush with the heading; the hover ground reaches past the copy. Two up from 768, one column below."
      />
      <ContentSection heading={heading} headingId="gw-grid">
        <Gateway items={items} arrangement="grid" />
      </ContentSection>

      <Variation
        id="paper"
        title="G.1 · Selector on paper"
        note="From 1024: every title at full ink. A faint blue marker sits behind the current situation and glides to whichever one the pointer or focus is on, with no delay; the answer (sentence at lead size, the service as the link) glides beside it, level with its title. Run the pointer down the list to browse. Below 1024: every title, sentence and service in one column. Every word is in the HTML at every width."
      />
      <ContentSection heading={heading} headingId="gw-paper">
        <Gateway items={items} />
      </ContentSection>

      <Variation
        id="tint"
        title="G.2 · Selector on tint"
        note="The same on the tint ground: the marker turns paper."
      />
      <ContentSection heading={heading} headingId="gw-tint" surface="tint">
        <Gateway items={items} />
      </ContentSection>

      <Variation
        id="expand"
        title="G.3 · Expanding rows — explored alternative"
        note="Ruled rows at full ink; from 1024 the current row opens in place to show its sentence and service, and the others shut. Calm and familiar (an accordion that follows the pointer), but it is in-flow: rows move as one opens and another closes, so it needs a beat of hover intent and cannot feel as fluid as the selector. Below 1024 every row is open."
      />
      <ContentSection heading={heading} headingId="gw-expand">
        <Gateway items={items} arrangement="expand" />
      </ContentSection>
    </>
  );
}
