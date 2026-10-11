import { Fragment, type ReactNode } from 'react';

import { Layout, Media, Section, type MediaImage } from '@/components';
import { PageHero, Statement, type HeroTrail } from '@/patterns';

import styles from './CaseStory.module.css';

/* The template takes its own shapes, structurally the content seam's `CaseStory` — a template never
   imports @/content, so the route passes the story straight in. */
export type CaseStoryFigureProps = {
  id: string;
  image: MediaImage;
  label: string;
  caption: string;
  notes: readonly string[];
};

export type CaseStoryPartProps =
  | { type: 'paragraphs'; paragraphs: readonly string[] }
  | { type: 'quote'; quote: string; attribution: string }
  | {
      type: 'steps';
      ordered?: boolean;
      items: readonly { label: string; body: string }[];
    }
  | { type: 'principle'; label: string; text: string }
  | { type: 'figures'; figures: readonly CaseStoryFigureProps[] };

export type CaseStoryChapterProps = {
  id: string;
  number: string;
  label: string;
  heading: string;
  parts: readonly CaseStoryPartProps[];
};

export type CaseStoryProps = {
  trail?: HeroTrail;
  story: {
    title: string;
    description: string;
    publishedAt?: string;
    heroImage?: MediaImage;
    profile: readonly { id: string; label: string; value: string }[];
    categories: readonly string[];
    tags: readonly string[];
    statements: readonly { id: string; title: string; body: string }[];
    chapters: readonly CaseStoryChapterProps[];
    closing?: { label: string; heading: string; paragraphs: readonly string[] };
  };
};

/** The reading column's parts: words that sit beside the chapter's number. */
type Reading = Extract<CaseStoryPartProps, { type: 'paragraphs' | 'quote' }>;
/** The parts that break out of the reading column to the full width of the band. */
type Breakout = Extract<CaseStoryPartProps, { type: 'steps' | 'figures' }>;

/**
 * A chapter's parts in runs: consecutive reading parts form one row beside the chapter's marker
 * column; steps and figures break out to the band's width. A principle is not in a chapter's band at
 * all — it is a Statement band of its own after it, the one sentence the chapter stands on.
 */
function runsOf(parts: readonly CaseStoryPartProps[]) {
  const runs: ({ kind: 'reading'; parts: Reading[] } | { kind: 'breakout'; part: Breakout })[] =
    [];
  for (const part of parts) {
    if (part.type === 'principle') continue;
    if (part.type === 'paragraphs' || part.type === 'quote') {
      const last = runs.at(-1);
      if (last?.kind === 'reading') last.parts.push(part);
      else runs.push({ kind: 'reading', parts: [part] });
    } else runs.push({ kind: 'breakout', part });
  }
  return runs;
}

function ReadingPart({ part }: { part: Reading }) {
  if (part.type === 'quote') {
    return (
      <figure className={styles.quote}>
        <Layout rowGap="text">
          <blockquote className={styles.quoteText}>
            <p>“{part.quote}”</p>
          </blockquote>
          <figcaption className={styles.key}>{part.attribution}</figcaption>
        </Layout>
      </figure>
    );
  }
  return (
    <Layout rowGap="text">
      {part.paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </Layout>
  );
}

/**
 * Steps (a sequence: numbered) or peers (the three user needs: unnumbered), each item on its own
 * hairline. The label is the item's title; the body is its sentence, capitalised in presentation only
 * (the CMS wrote it as the tail of "Label: text").
 */
function Steps({ part }: { part: Extract<CaseStoryPartProps, { type: 'steps' }> }) {
  const n = part.items.length;
  return (
    <Layout
      as={part.ordered ? 'ol' : 'ul'}
      columns={{ base: 1, md: 2, lg: n === 3 ? 3 : n >= 4 ? 4 : 2 }}
      colGap="gutter"
      rowGap="stack"
    >
      {part.items.map((item, index) => (
        <li key={item.label} className={styles.step}>
          <Layout rowGap="text">
            {part.ordered ? (
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            ) : null}
            <h3 className={styles.stepTitle}>{item.label}</h3>
            <p className={styles.stepBody}>{item.body}</p>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

/**
 * An annotated figure: the capture at the band's width, then its label and caption in the marker
 * column and its numbered notes in the reading column, so each note reads as a callout on the image
 * above rather than as an italic list under it.
 */
function Figure({ figure }: { figure: CaseStoryFigureProps }) {
  return (
    <figure className={styles.figure} id={figure.id}>
      <Layout rowGap="block">
        <Media image={figure.image} sizes="(min-width: 1304px) 1240px, calc(100vw - 64px)" />
        <figcaption>
          <Layout columns={{ base: 1, lg: [1, 2] }} colGap="column" rowGap="text">
            <Layout rowGap="inline">
              <span className={styles.key}>{figure.label}</span>
              <span className={styles.caption}>{figure.caption}</span>
            </Layout>
            {figure.notes.length > 0 ? (
              <Layout as="ol" rowGap="tight">
                {figure.notes.map((note, index) => (
                  <Layout
                    as="li"
                    key={index}
                    columns={{ base: ['auto', 1] }}
                    colGap="text"
                    align="start"
                    className={styles.note}
                  >
                    <span className={styles.noteIndex} aria-hidden="true">
                      {index + 1}
                    </span>
                    <span>{note}</span>
                  </Layout>
                ))}
              </Layout>
            ) : null}
          </Layout>
        </figcaption>
      </Layout>
    </figure>
  );
}

function Chapter({ chapter }: { chapter: CaseStoryChapterProps }) {
  const headingId = `${chapter.id}-heading`;
  const runs = runsOf(chapter.parts);
  const marker = (
    <Layout rowGap="tight" className={styles.marker}>
      <span className={styles.number} aria-hidden="true">
        {chapter.number}
      </span>
      <span className={styles.key}>{chapter.label}</span>
    </Layout>
  );
  /* The first run of words sits beside the marker under the heading; a later run of words (after a
     breakout) keeps the reading column, so the text edge never moves within a chapter. */
  const row = (first: boolean, content: ReactNode, key: string) =>
    first ? (
      <Layout key={key} columns={{ base: 1, lg: [1, 2] }} colGap="column" rowGap="block" align="start">
        {marker}
        {content}
      </Layout>
    ) : (
      <Layout key={key} columns={{ base: 1, lg: [1, 2] }} offset={{ lg: 1 }} colGap="column">
        {content}
      </Layout>
    );
  const firstReading = runs[0]?.kind === 'reading' ? runs[0] : undefined;
  const rest = firstReading ? runs.slice(1) : runs;
  return (
    <Section surface="paper" aria-labelledby={headingId} id={chapter.id}>
      <Layout rowGap="section">
        {row(
          true,
          <Layout rowGap="block">
            <h2 id={headingId} className={styles.heading}>
              {chapter.heading}
            </h2>
            {firstReading?.parts.map((part, index) => <ReadingPart key={index} part={part} />)}
          </Layout>,
          'head',
        )}
        {rest.map((run, index) =>
          run.kind === 'reading' ? (
            row(
              false,
              <Layout rowGap="stack">
                {run.parts.map((part, i) => (
                  <ReadingPart key={i} part={part} />
                ))}
              </Layout>,
              `run-${index}`,
            )
          ) : run.part.type === 'steps' ? (
            <Steps key={`run-${index}`} part={run.part} />
          ) : (
            <Layout key={`run-${index}`} rowGap="section">
              {run.part.figures.map((figure) => (
                <Figure key={figure.id} figure={figure} />
              ))}
            </Layout>
          ),
        )}
      </Layout>
    </Section>
  );
}

/**
 * TIER 3 — a case study as a story (owner, 11 Oct 2026: the CMS's prose rendering "is horrible …
 * design it in a nice way so we have the actual rendering of how it should be ideally").
 *
 * The hero carries the record (company, sector, work, date) in its byline strip and the taxonomy
 * under the lede, then the capture. Problem and solution face each other as two large sentences.
 * Each chapter is a band: its number and label in a marker column that holds still beside the
 * reading column, the heading and words in the reading column, steps and figures out to the band's
 * width, a principle as its own Statement after the chapter. The close is what the case proves.
 */
export function CaseStory({ trail, story }: CaseStoryProps) {
  const published = story.publishedAt?.slice(0, 10);
  return (
    <>
      <PageHero
        trail={trail}
        title={story.title}
        body={[story.description]}
        surface="paper"
        facts={story.profile}
        labels={[...story.categories, ...story.tags]}
        dates={published ? { published } : undefined}
        media={story.heroImage ? { type: 'image', image: story.heroImage } : undefined}
      />

      {story.statements.length > 0 ? (
        <Section surface="paper" aria-label="Problem and solution">
          <Layout columns={{ base: 1, md: story.statements.length > 1 ? 2 : 1 }} colGap="column" rowGap="stack">
            {story.statements.map((statement) => (
              <Layout key={statement.id} rowGap="block" className={styles.statement}>
                <h2 className={styles.key}>{statement.title}</h2>
                <p className={styles.statementBody}>{statement.body}</p>
              </Layout>
            ))}
          </Layout>
        </Section>
      ) : null}

      {story.chapters.map((chapter) => {
        const principle = chapter.parts.find(
          (part): part is Extract<CaseStoryPartProps, { type: 'principle' }> =>
            part.type === 'principle',
        );
        return (
          <Fragment key={chapter.id}>
            <Chapter chapter={chapter} />
            {principle ? (
              <Statement as="p" align="start" eyebrow={principle.label} surface="tint">
                {principle.text}
              </Statement>
            ) : null}
          </Fragment>
        );
      })}

      {story.closing ? (
        <Section surface="tint" aria-labelledby="case-closing-heading">
          <Layout columns={{ base: 1, lg: [1, 2] }} colGap="column" rowGap="block" align="start">
            <Layout rowGap="tight" className={styles.marker}>
              <span className={styles.key}>{story.closing.label}</span>
            </Layout>
            <Layout rowGap="block">
              <h2 id="case-closing-heading" className={styles.closingHeading}>
                {story.closing.heading}
              </h2>
              {story.closing.paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.closingBody}>
                  {paragraph}
                </p>
              ))}
            </Layout>
          </Layout>
        </Section>
      ) : null}
    </>
  );
}
