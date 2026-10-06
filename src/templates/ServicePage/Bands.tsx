import { Fragment, type ReactNode } from 'react';

import { TextureHorizon } from '@/components';
import { Banner, ContentSection, CtaRow, CtaSection, Statement, Thread } from '@/patterns';
import { getKitPhoto } from '@/lib/photos';
import type { StoryBlock } from '@/lib/service-story';

import {
  AsidePhoto,
  Cases,
  Ledger,
  Router,
  Signals,
  StatAside,
  StatRows,
  StepsBlock,
  StoryBlockView,
  type Labels,
} from './Blocks';
import type { Archetype, Band, SectionBand } from './plan';

/**
 * One planned band (plan.ts) as its kit band. Every decision — archetype, alignment, head side,
 * photograph, texture — was made by the plan; this file only places what it is told, through the
 * band patterns' own props (ContentSection, CtaSection, Banner). No band here sets a distance, a
 * ground through `className`, or a grid of its own.
 */

type Context = { labels: Labels; slots: boolean };

/* Centred bands whose body becomes a start-aligned column on a phone — a vertical thread, stacked
   contrast lists, stacked text cards — centre their head from 1024 only (ContentSection
   `center-lg`). A strip of marks, a set of covers and an accordion stay centred at every width. */
const CENTRE_FROM_LG: ReadonlySet<Archetype> = new Set(['E', 'N', 'C-text']);

/* Bands whose body ends on its own rule (a ladder, an accordion, two ruled lists): their `more`
   row takes no hairline, or the two rules a stack apart read as a double rule (CtaRow `rule`). */
const ENDS_RULED: ReadonlySet<Archetype> = new Set(['D', 'D-faq', 'F', 'N']);

/** The section's other blocks, after the one that gave the band its job. */
function rest(blocks: readonly StoryBlock[], lead: StoryBlock | undefined, ctx: Context) {
  return blocks
    .filter((block) => block !== lead)
    .map((block, index) => (
      <Fragment key={index}>
        <StoryBlockView block={block} labels={ctx.labels} slots={ctx.slots} />
      </Fragment>
    ));
}

function firstJob(blocks: readonly StoryBlock[]) {
  return blocks.find((block) => block.kind !== 'note' && block.kind !== 'slot');
}

function SectionBandView({ band, ctx }: { band: SectionBand; ctx: Context }) {
  const { section, archetype, photo } = band;
  const job = firstJob(section.blocks);
  const head = {
    eyebrow: section.eyebrow,
    heading: section.heading,
    headingId: section.id,
    lead: section.lead,
    'data-band': archetype,
    /* The deep-page link (`more`), the band's foot in every arrangement. */
    footer: section.more ? (
      <CtaRow rule={!ENDS_RULED.has(archetype)} actions={[section.more]} />
    ) : undefined,
  };
  const others = rest(section.blocks, job, ctx);
  const texture = band.horizon ? <TextureHorizon /> : undefined;

  switch (archetype) {
    /* B — the photograph beside the head and its tiles (§ 3.4 B). The copy column takes the 667 and
       the photo 4:5 in 477; the counterweight field closes a column with room for it (≤ 2 tiles). */
    case 'B': {
      if (job?.kind !== 'signals' || !photo) break;
      return (
        <ContentSection
          {...head}
          arrangement="media"
          /* Four tiles fill the 667 copy column (594 of the photo's 596 at 1470), so their head keeps
             the h2 role: a two-line display head took the band to 887. Two tiles leave the room a
             display head and the counterweight field need (ContentSectionMedia `head`). */
          media={{
            image: getKitPhoto(photo),
            side: 'start',
            counterweight: band.counterweight,
            head: band.counterweight ? 'display' : 'title',
          }}
        >
          <Signals block={job} inSplit />
          {others}
        </ContentSection>
      );
    }

    /* C-icon — the router: a beside head with its photograph, linked icon cards (cmp-services). */
    case 'C-icon': {
      if (job?.kind !== 'router') break;
      const body = (
        <>
          <Router block={job} />
          {others}
        </>
      );
      return photo ? (
        <ContentSection
          {...head}
          arrangement="beside"
          asideFill
          aside={<AsidePhoto id={photo} />}
          headSide={band.headSide}
          texture={texture}
        >
          {body}
        </ContentSection>
      ) : (
        <ContentSection {...head} arrangement="beside" texture={texture}>
          {body}
        </ContentSection>
      );
    }

    /* C-pair — two cases beside a head that carries the way to every case (§ 1.4 C-pair:
       H-beside-actions + 2 pair cards). The cases' scope note is a Callout under the cards, never a
       paragraph in the head track: there it floated a `stack` under the lead in small type and read
       as an orphaned footnote (fix round 1, 7 Oct 2026). */
    case 'C-pair': {
      if (job?.kind !== 'cases') break;
      return (
        <ContentSection
          {...head}
          arrangement="beside"
          texture={texture}
          actions={<CtaRow rule={false} actions={[ctx.labels.allCases]} />}
        >
          <Cases block={job} labels={ctx.labels} withNote />
          {others}
        </ContentSection>
      );
    }

    /* F — Steps beside a head with its photograph (§ 3.4 F, the approved method). At the default
       density: § 1.3 gives `tight` to I and `open` to J only, and density is never a way to make a
       band fit (fix round 1 — it had been `tight`, which also broke the 192 seam either side). */
    case 'F': {
      if (job?.kind !== 'steps') break;
      const body = (
        <>
          <StepsBlock block={job} />
          {others}
        </>
      );
      return photo ? (
        <ContentSection
          {...head}
          arrangement="beside"
          asideFill
          aside={<AsidePhoto id={photo} />}
          headSide={band.headSide}
        >
          {body}
        </ContentSection>
      ) : (
        <ContentSection {...head} arrangement="beside">
          {body}
        </ContentSection>
      );
    }

    /* D — read-down rows beside a head with its aside: the figure when the job is a stat, else the
       photograph (§ 3.3: D always has one). */
    case 'D': {
      if (!job) break;
      const body =
        job.kind === 'stat' ? (
          <StatRows block={job} />
        ) : job.kind === 'ledger' ? (
          <Ledger block={job} />
        ) : job.kind === 'router' ? (
          <Router block={job} />
        ) : (
          <StoryBlockView block={job} labels={ctx.labels} slots={ctx.slots} />
        );
      const aside: ReactNode =
        job.kind === 'stat' ? (
          <StatAside block={job} />
        ) : photo ? (
          <AsidePhoto id={photo} />
        ) : null;
      if (!aside) {
        return (
          <ContentSection {...head} arrangement="beside">
            {body}
            {others}
          </ContentSection>
        );
      }
      return (
        <ContentSection
          {...head}
          arrangement="beside"
          aside={aside}
          asideFill={job.kind !== 'stat'}
          headSide={band.headSide}
        >
          {body}
          {others}
        </ContentSection>
      );
    }

    /* G — the proof band, the page's one tint band (§ 1.7). */
    case 'G':
      return (
        <ContentSection {...head} surface="tint">
          {section.blocks.map((block, index) => (
            <Fragment key={index}>
              <StoryBlockView block={block} labels={ctx.labels} slots={ctx.slots} />
            </Fragment>
          ))}
        </ContentSection>
      );

    default:
      break;
  }

  /* Everything else is a stacked band — centred or start-aligned as planned — with every block in
     order: E (a diagram), H (marks), M (covers), N (the contrast pair), D-faq, C-text. A centred
     thread centres its stages on their tracks, so the rail sits on the head's axis. */
  const blocks = section.blocks.map((block, index) => (
    <Fragment key={index}>
      {block.kind === 'thread' && band.centred ? (
        <Thread stages={block.items} loop={block.loop} align="center" />
      ) : (
        <StoryBlockView block={block} labels={ctx.labels} slots={ctx.slots} />
      )}
    </Fragment>
  ));
  if (band.centred) {
    return (
      <ContentSection
        {...head}
        align={CENTRE_FROM_LG.has(archetype) ? 'center-lg' : 'center'}
        texture={texture}
      >
        {blocks}
      </ContentSection>
    );
  }
  /* A diagram under the H-row (plan `headRow`): the heading beside its lead, so the diagram — the
     band's large thing — keeps the height a stacked head would have spent (§ 3.4 E). */
  if (band.headRow) {
    /* Its `more` link closes the lead in the H-row's trailing track rather than opening a foot under
       the diagram: beside the heading it costs ~20, under the diagram a rule and a row (~100). */
    return (
      <ContentSection
        {...head}
        footer={undefined}
        arrangement="split-head"
        texture={texture}
        actions={
          section.more ? <CtaRow rule={false} actions={[section.more]} /> : undefined
        }
      >
        {blocks}
      </ContentSection>
    );
  }
  return (
    <ContentSection {...head} texture={texture}>
      {blocks}
    </ContentSection>
  );
}

export function BandView({ band, labels, slots }: { band: Band } & Context) {
  if (band.kind === 'section') return <SectionBandView band={band} ctx={{ labels, slots }} />;

  if (band.kind === 'offer') {
    const { offer } = band;
    /* K — the mid-page offer on paper, its quiet photograph at the end (§ 3.4 K, § 5.6). The frame
       follows the photograph (plan `frame`): a landscape master takes the [5, 7] offer, the photo
       the band's large thing and the points a strip under both — a different rectangle from B's
       portrait split, which a page that opens on B needs (fix round 1, 7 Oct 2026). */
    return (
      <CtaSection
        arrangement="offer"
        data-band="K"
        eyebrow={offer.eyebrow}
        heading={offer.heading}
        body={[offer.body]}
        points={offer.points}
        actions={offer.actions}
        media={
          band.photo
            ? { image: getKitPhoto(band.photo), side: 'end', frame: band.frame }
            : undefined
        }
      />
    );
  }

  if (band.kind === 'statement') {
    const { statement } = band;
    /* J — one sentence at the h1 role, the page's display-scale moment, with the link that says
       where the claim is shown in full (§ 3.4 J). `head-half` when the plan spent the texture here. */
    return (
      <Statement
        id={statement.id}
        eyebrow={statement.eyebrow}
        size="display"
        texture={band.headHalf ? 'head-half' : undefined}
        actions={
          statement.action ? <CtaRow rule={false} actions={[statement.action]} /> : undefined
        }
      >
        {statement.text}
      </Statement>
    );
  }

  /* I — the banner: an H-row over the page's 3:1 photograph (§ 3.4 I). Without a photograph there
     is no banner to show, so the band is the head and its link. */
  const { banner } = band;
  const action = <CtaRow rule={false} actions={[banner.action]} />;
  if (!band.photo) {
    return (
      <ContentSection
        eyebrow={banner.eyebrow}
        heading={banner.heading}
        headingId={banner.id}
        lead={banner.lead}
        arrangement="split-head"
        actions={action}
        data-band="I"
      />
    );
  }
  return (
    <Banner
      eyebrow={banner.eyebrow}
      heading={banner.heading}
      headingId={banner.id}
      lead={banner.lead}
      actions={action}
      image={getKitPhoto(band.photo)}
    />
  );
}
