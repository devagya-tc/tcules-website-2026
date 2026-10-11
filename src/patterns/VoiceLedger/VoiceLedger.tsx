import type { ReactNode } from 'react';

import { Layout, Section, type SectionSurface } from '@/components';

import styles from './VoiceLedger.module.css';

/** One complaint, in the customer's words, and where the work starts. */
export type VoiceLedgerItem = {
  /** The complaint as authored, with its quote marks ("\"Customers keep getting stuck.\""). */
  voice: string;
  /** Where we start: plain text, or inline content the caller renders (a link, emphasis). */
  reply: ReactNode;
};

export type VoiceLedgerProps = {
  /** The band's anchor. */
  id?: string;
  /** The h2, the band's accessible name. */
  heading: string;
  headingId: string;
  /** An optional sentence under the heading. */
  lead?: string;
  /** Three to six complaints. */
  items: readonly VoiceLedgerItem[];
  /** Default `paper`. */
  surface?: SectionSurface;
};

/**
 * Straight quote marks and apostrophes as typographic ones. Typesetting: the marks change, the
 * words never do (page-mapping § 0 rule 1: a component may draw the punctuation it owns).
 */
function typeset(text: string): string {
  return text
    .replace(/(^|[\s([{—–])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/(^|[\s([{—–])'/g, '$1‘')
    .replace(/'/g, '’');
}

/**
 * The complaint with its own quote marks drawn as the row's blue mark: the opening mark hangs into
 * the margin so the words keep the column's edge, the closing mark sits after the last word. Text
 * without marks renders as authored.
 */
function Voice({ text }: { text: string }) {
  const set = typeset(text);
  const match = /^“([\s\S]*)”([.!?]?)$/.exec(set);
  if (!match) return <>{set}</>;
  return (
    <>
      <span className={styles.open} aria-hidden="true">
        “
      </span>
      {match[1]}
      <span className={styles.close} aria-hidden="true">
        ”
      </span>
      {match[2]}
    </>
  );
}

/**
 * VoiceLedger — the complaints a team says out loud, each answered by where we start
 * (product-design round 6, 11 Oct 2026; page-mapping § 23).
 *
 * The band's job is recognition: a visitor may not know which service they need, but they know
 * what is going wrong, and they say it in these words. So the complaint is the band's large thing,
 * set in the upright serif at h4 (two steps under the band's h2) in the leading 7 of [7, 5] from
 * 1024, one row each on a hairline; the answer is the reply beside it, its first line on the
 * complaint's first baseline. The complaint's own quote marks are its blue mark, the opening one
 * hung into the margin, so the eye runs down a column of marks. Below 1024 each reply sits under
 * its complaint.
 *
 * Owner, 11 Oct 2026: the italic speech voice was hard to read and a blue arrow before each reply
 * made the rows look clickable. Upright type, and the quote marks — which say "speech", not "go" —
 * replace both.
 *
 * It is a ledger, not a card set: the items are lines of speech, read in one pass down one edge,
 * not objects to compare. No photograph: the words are the picture.
 */
export function VoiceLedger({
  id,
  heading,
  headingId,
  lead,
  items,
  surface = 'paper',
}: VoiceLedgerProps) {
  const shown = items.filter((item) => item.voice.trim().length > 0);
  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="voice-ledger">
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </Layout>
        <Layout as="ul" rowGap="none" className={styles.list}>
          {shown.map((item) => (
            <li key={item.voice} className={styles.row}>
              <Layout
                columns={{ base: 1, lg: [7, 5] }}
                colGap="column"
                rowGap="text"
                align="first-baseline"
              >
                <h3 className={styles.voice}>
                  <Voice text={item.voice} />
                </h3>
                <p className={styles.reply}>{item.reply}</p>
              </Layout>
            </li>
          ))}
        </Layout>
      </Layout>
    </Section>
  );
}
