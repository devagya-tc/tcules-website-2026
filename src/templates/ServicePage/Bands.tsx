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
    /* B — the photograph beside the head and its tiles (§ 3.4 B). Four tiles fill the 667 copy
       column (594 of the photo's 596 at 1470), so the photo takes the 477 at 4:5. Two tiles take
       `weight: 'photo'` (plan `photoWeight`): the photograph in the 667 at 6:5, the copy in the 477
       centred on it. Both keep the h2 role — a display head beside the hero's display h1 and the J
       statement made three display voices, two back to back (fix round 2) — and neither carries
       the counterweight texture (plan § 6.4). */
    case 'B': {
      if (job?.kind !== 'signals' || !photo) break;
      return (
        <ContentSection
          {...head}
          arrangement="media"
          media={{
            image: getKitPhoto(photo),
            side: 'start',
            weight: band.photoWeight ? 'photo' : 'copy',
            head: 'title',
          }}
        >
          <Signals block={job} inSplit />
          {others}
        </ContentSection>
      );
    }

    /* C-icon — the router: linked icon cards (cmp-services). Four routes are a media split (plan
       `split`): the photograph 4:5 in the 477 running the copy column's height, the head and the
       2 × 2 of cards in the 667, on the side opposite the page's last photo-led band; on a phone the
       photo leads at 4:3. Six take the beside head with its photograph in the head track. */
    case 'C-icon': {
      if (job?.kind !== 'router') break;
      const body = (
        <>
          <Router block={job} />
          {others}
        </>
      );
      if (photo && band.split) {
        return (
          <ContentSection
            {...head}
            arrangement="media"
            media={{
              image: getKitPhoto(photo),
              side: band.headSide === 'start' ? 'end' : 'start',
              height: 'copy',
              head: 'title',
            }}
          >
            {body}
          </ContentSection>
        );
      }
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

    /* G — the proof band, the page's one tint band (§ 1.7). A typographic quote centres its head
       with it (plan § 3.5), the `more` link its foot; a G with a case keeps the start edge, the link
       closing the head under the lead. Never the H-row: a text-only head is one column (owner,
       7 Oct 2026). */
    case 'G': {
      const proofBlocks = section.blocks.map((block, index) => (
        <Fragment key={index}>
          <StoryBlockView block={block} labels={ctx.labels} slots={ctx.slots} />
        </Fragment>
      ));
      return band.centred ? (
        <ContentSection {...head} surface="tint" align="center">
          {proofBlocks}
        </ContentSection>
      ) : (
        <ContentSection
          {...head}
          footer={undefined}
          surface="tint"
          actions={section.more ? <CtaRow rule={false} actions={[section.more]} /> : undefined}
        >
          {proofBlocks}
        </ContentSection>
      );
    }

    default:
      break;
  }

  /* Everything else is a stacked band — centred or start-aligned as planned — with every block in
     order: E (a diagram), H (marks), M (covers), N (the contrast pair), D-faq,
     C-text. A centred
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
  /* A full-column body (a diagram, a set of covers) under a stacked head (plan `moreInHead`): the
     `more` link closes the head, a `stack` under the lead, rather than opening a ruled foot under
     the body — under the diagram a rule and a row cost ~100 of the band's fold. The head is one
     column: eyebrow → heading → lead → action (owner, 7 Oct 2026, retiring the H-row). */
  if (band.moreInHead) {
    return (
      <ContentSection
        {...head}
        footer={undefined}
        texture={texture}
        actions={section.more ? <CtaRow rule={false} actions={[section.more]} /> : undefined}
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
        /* The offer's points are what the reader gets, so they are a CHECK ROW, not a numbered
           list (fix round 2): the 01/02 numeral is the page's sequence device — the method's steps
           and the close's next steps — and on the offer's deliverables a third run of numerals made
           the accent repetition. One glyph for every point, so no story has to choose icons. */
        markers="icon"
        points={offer.points?.map((point) => ({ ...point, icon: 'check-circle' as const }))}
        actions={offer.actions}
        media={
          band.photo
            ? {
                image: getKitPhoto(band.photo),
                side: 'end',
                frame: band.frame,
                phone: band.photoFirst ? 'before' : 'after',
              }
            : undefined
        }
      />
    );
  }

  if (band.kind === 'statement') {
    const { statement } = band;
    /* J — one sentence at the display role, the page's display-scale moment, with the link that
       says where the claim is shown in full (§ 3.4 J). Centred across the full measure where the
       plan centred it, else on the start edge with its eyebrow directly above it; the `corner`
       field when the plan spent the texture here. */
    return (
      <Statement
        id={statement.id}
        eyebrow={statement.eyebrow}
        size="display"
        align={band.centred ? 'center' : 'start'}
        texture={band.corner ? 'corner' : undefined}
        actions={
          statement.action ? <CtaRow rule={false} actions={[statement.action]} /> : undefined
        }
      >
        {statement.text}
      </Statement>
    );
  }

  /* I — the banner: a stacked head over the page's 3:1 photograph (§ 3.4 I). Without a photograph
     there is no banner to show, so the band is the head and its link, in one column. */
  const { banner } = band;
  const action = <CtaRow rule={false} actions={[banner.action]} />;
  if (!band.photo) {
    return (
      <ContentSection
        eyebrow={banner.eyebrow}
        heading={banner.heading}
        headingId={banner.id}
        lead={banner.lead}
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
