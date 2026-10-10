import type { ReactElement } from 'react';

import { Layout, Section } from '@/components';
import {
  BlockCardSet,
  Breadcrumbs,
  ContentSection,
  CtaSection,
  ListCard,
  PageHero,
  Proof,
  type BlockCardImage,
  type BreadcrumbItem,
  type HeroAction,
  type ProofQuote,
} from '@/patterns';
import { heroTrail } from '@/lib/trail';

/**
 * One case study as the index shows it. The template's own shape, not the view model's: a template
 * may not import @/content, so the page maps its record onto this and the template never learns
 * where the record came from — the CMS, or the ideal-content fixture the specimen reads.
 */
export type CaseStudyIndexItem = {
  id: string;
  href: string;
  title: string;
  /** The one line under the title: 8–15 words (strapi-changes.md §13). */
  description: string;
  /** Who the work was for. Leads the eyebrow when present. */
  client?: string;
  /** The engagement's categories. The eyebrow's fallback while `client` is missing. */
  categories?: readonly string[];
  cover?: BlockCardImage;
  /**
   * The description as trusted inline HTML, one entry per paragraph (page-mapping G3). Exclusive
   * with `description`, which it replaces where a card carries more than a line ("Our role: …").
   */
  bodyHtml?: readonly string[];
  /** The cta wording on a featured card ("Read the Doodle case"). Absent, the card's default. */
  ctaLabel?: string;
};

/**
 * One group of cases under its own heading (page-mapping G9). The section's ARRANGEMENT is decided
 * here from its position and its count, never from its id, so a fifth group arrives already shaped:
 *
 *   first, four or more   the featured set: the first case leads at full width, the rest under it
 *                         (BlockCardSet `auto`, ruling C3), each with a cta
 *   one                   a story: the cover beside the case's title line and body, then its client's
 *                         words (`quote`) after the work
 *   five or more          thumbnail rows in two columns, a denser catalogue shape than the covers
 *   two to four           equal covers, linked whole cards
 *
 * Neighbouring groups differ because their counts differ, which is the variation the page needs
 * without a ground change.
 */
export type CaseStudyIndexSection = {
  id: string;
  heading: string;
  items: readonly CaseStudyIndexItem[];
  /** The client's words, after the work. Shown only on a one-case story. */
  quote?: ProofQuote;
};

export type CaseStudyIndexClosing = {
  eyebrow?: string;
  heading: string;
  body?: string;
  action?: HeroAction;
  /**
   * The close's form (G9), composed by the caller and placed in the split close: a pattern does not
   * import a pattern, so the page hands over the EnquiryForm it configured. With a form the close
   * needs no action, because the form is the ask.
   */
  form?: ReactElement;
  /** The close's anchor, so the hero's "#enquiry" lands on it. */
  id?: string;
};

export type CaseStudyIndexProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  /**
   * The opening, by ROLE rather than by element (29 Sep). `name` is what the page is called
   * ("Selected case studies") and `message` is what it argues — the line a visitor should leave
   * with. The template sets the message as the h1, and takes no action: this page's job is to get a
   * case study read, and a hero button ahead of the cards competes with that. A blank message falls
   * back to the name as the h1.
   *
   * The name is no longer an eyebrow (kit `fdn-top`, 5 Oct 2026). The trail names the page (the
   * route passes its nav label, "Case studies", as the last crumb) and now sits inside the hero 32
   * above the title, so an eyebrow saying the name again repeated the line directly over it.
   */
  hero: {
    name: string;
    message: string;
    /** The line above the title, as authored. */
    eyebrow?: string;
    /** The opening paragraphs under the title. */
    lede?: readonly string[];
    /**
     * The hero's one ask (G9). Absent, the hero takes none: an index's job is to get a case read, and
     * the 29 Sep ruling keeps a button off it. A page whose copy authors one passes it, and the content
     * team is asked to drop it (proposal P15).
     */
    action?: HeroAction;
    /** The paper hero's end-fade, for a hero with no media. */
    texture?: boolean;
  };
  /** The flat set: one grid of every case, straight under the h1. Ignored when `sections` is given. */
  items?: readonly CaseStudyIndexItem[];
  /** Grouped cases, each under its own heading (G9). Replaces `items`. */
  sections?: readonly CaseStudyIndexSection[];
  /** The page's close. Rendered only when it carries an `action`: a close without an ask is not one. */
  closing?: CaseStudyIndexClosing;
};

/**
 * The eyebrow is ONE label line above the title, and the client is that label: on an agency's
 * work index the client is what a reader scans for. Categories stand in only while the client is
 * missing (it is not in Strapi yet), so a card never carries two label lines — the stacked
 * client-plus-categories card was tried on 29 Sep and read as stuffed.
 */
function eyebrow(item: CaseStudyIndexItem): string | undefined {
  if (item.client?.trim()) return item.client;
  const categories = (item.categories ?? []).filter((name) => name.trim());
  return categories.length > 0 ? categories.join(' · ') : undefined;
}

/**
 * CaseStudyIndex — the case-study index page type: the opening with its trail, the set of case-study
 * cards (featured first, from BlockCardSet), and an optional close.
 *
 * It exists so that the live route and its specimen render one composition. The route passes what
 * the CMS holds; `/design/case-study-index` passes the same entries with their ideal copy
 * (src/content ideal fixture), which is how the page is judged at the content it was designed
 * for rather than at whatever the CMS holds today.
 */
export function CaseStudyIndex({
  breadcrumbs,
  hero,
  items = [],
  sections,
  closing,
}: CaseStudyIndexProps) {
  const message = hero.message.trim();
  const lede = (hero.lede ?? []).filter((paragraph) => paragraph.trim());

  return (
    <>
      <PageHero
        trail={heroTrail(breadcrumbs, message || hero.name, (t) => (
          <Breadcrumbs {...t} />
        ))}
        eyebrow={hero.eyebrow}
        title={message || hero.name}
        body={lede.length > 0 ? (lede as [string, ...string[]]) : undefined}
        actions={hero.action ? [hero.action] : undefined}
        texture={hero.texture}
        surface="paper"
      />

      {sections ? (
        sections.map((section, index) => (
          <div key={section.id} data-fold-exempt={FOLD_EXEMPT}>
            <SectionView section={section} first={index === 0} />
          </div>
        ))
      ) : items.length > 0 ? (
        /* The fold rule's one exception on this page (visual-direction § 1.3): an INDEX LIST is the
           page's whole content, grows with the CMS (4038 tall at 1470 with today's entries) and is
           read by scrolling, so no height could hold it. fold:check reports it with this reason and
           still measures the hero and the close. The remedy, if the list ever outgrows reading, is
           pagination, not a shorter card. A plain wrapper: no box, no class, no spacing. */
        <div data-fold-exempt={FOLD_EXEMPT}>
          <Section as="div" surface="paper">
            {/* The set IS the page's list, straight under the h1 with no band heading between, so
              its card titles are the page's h2s (axe heading-order: h1 → h3 skipped a level). */}
            <BlockCardSet
              titleAs="h2"
              items={items.map((item) => ({
                id: item.id,
                title: item.title,
                body: item.description,
                eyebrow: eyebrow(item),
                media: item.cover ? { type: 'image', image: item.cover } : undefined,
                href: item.href,
              }))}
            />
          </Section>
        </div>
      ) : null}

      {/* A close is an ask, so it renders only WITH its ask: an action, or the form that is one. Without
          either it was an inline, one-off tint band — a heading on a ground and nothing to do — that
          no other page type has; now it is absent, which is the honest shape of a close with nothing
          to ask. */}
      {closing?.form ? (
        <CtaSection
          id={closing.id}
          data-band="L"
          surface="tint"
          eyebrow={closing.eyebrow || undefined}
          heading={closing.heading}
          body={closing.body?.trim() ? [closing.body] : undefined}
          form={closing.form}
        />
      ) : closing?.action ? (
        <CtaSection
          arrangement="open"
          surface="tint"
          eyebrow={closing.eyebrow || undefined}
          heading={closing.heading}
          body={closing.body?.trim() ? [closing.body] : undefined}
          actions={[closing.action]}
        />
      ) : null}
    </>
  );
}

/** The fold rule's one exception, on every list band (visual-direction § 1.3). */
const FOLD_EXEMPT =
  "Index list: the page's whole content, grows with the CMS and is read by scrolling (visual-direction § 1.3).";

/** The record's body: its HTML paragraphs where it has them, else its one line. */
const bodyOf = (item: CaseStudyIndexItem) =>
  item.bodyHtml ? { bodyHtml: item.bodyHtml } : { body: item.description };

const coverOf = (item: CaseStudyIndexItem) =>
  item.cover ? { media: { type: 'image' as const, image: item.cover } } : {};

/**
 * One group, shaped by its position and its count (see `CaseStudyIndexSection`). Every band is a
 * ContentSection on paper: the variation between neighbours is the arrangement, not the ground.
 */
function SectionView({ section, first }: { section: CaseStudyIndexSection; first: boolean }) {
  const { items } = section;
  const common = {
    id: section.id,
    heading: section.heading,
    headingId: `${section.id}-heading`,
  } as const;

  if (items.length === 0) return null;

  /* One case: a story. The cover beside the work, then what its client said. */
  if (items.length === 1) {
    const [item] = items as [CaseStudyIndexItem];
    const story = (
      <Layout rowGap="stack">
        <Layout as="ul" rowGap="none">
          <ListCard
            arrangement="stacked"
            size="md"
            titleAs="h3"
            title={item.title}
            href={item.href}
            {...bodyOf(item)}
          />
        </Layout>
        {section.quote ? <Proof arrangement="compact" quote={section.quote} /> : null}
      </Layout>
    );
    const cover = item.cover;
    return cover?.width && cover.height ? (
      <ContentSection
        {...common}
        data-band="B"
        arrangement="media"
        media={{
          image: { ...cover, width: cover.width, height: cover.height },
          side: 'start',
          head: 'title',
        }}
      >
        {story}
      </ContentSection>
    ) : (
      <ContentSection {...common} data-band="C-text">
        {story}
      </ContentSection>
    );
  }

  /* The first group, four or more: the featured set. */
  if (first && items.length >= 4) {
    return (
      <ContentSection {...common} data-band="M">
        <BlockCardSet
          lead="auto"
          cue="cta"
          scroll="never"
          items={items.map((item) => ({
            id: item.id,
            title: item.title,
            ...bodyOf(item),
            ...coverOf(item),
            href: item.href,
            ctaLabel: item.ctaLabel,
          }))}
        />
      </ContentSection>
    );
  }

  /* Five or more: thumbnail rows, two columns, filled down the first and then the second. */
  if (items.length >= 5) {
    const half = Math.ceil(items.length / 2);
    const columns = [items.slice(0, half), items.slice(half)];
    return (
      <ContentSection {...common} data-band="D">
        <Layout columns={{ base: 1, lg: 2 }} colGap="gutter" rowGap="none">
          {columns.map((column, index) => (
            <Layout as="ul" rowGap="none" key={index}>
              {column.map((item) => (
                <ListCard
                  key={item.id}
                  titleAs="h3"
                  title={item.title}
                  href={item.href}
                  marker={
                    item.cover
                      ? {
                          type: 'thumbnail',
                          image: {
                            ...item.cover,
                            width: item.cover.width ?? 1600,
                            height: item.cover.height ?? 900,
                          },
                        }
                      : undefined
                  }
                  {...bodyOf(item)}
                />
              ))}
            </Layout>
          ))}
        </Layout>
      </ContentSection>
    );
  }

  /* Two to four: equal covers, each a whole-card link. */
  return (
    <ContentSection {...common} data-band="M">
      <BlockCardSet
        lead="none"
        cue="title"
        scroll="never"
        across={items.length === 4 ? 4 : undefined}
        items={items.map((item) => ({
          id: item.id,
          title: item.title,
          ...bodyOf(item),
          ...coverOf(item),
          href: item.href,
        }))}
      />
    </ContentSection>
  );
}
