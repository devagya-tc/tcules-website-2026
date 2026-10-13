import type { CorpusBand, CorpusBlock, CorpusPage } from '@/lib/corpus-types';

import { formBeforeFaq } from './order';
import { boldLead, linkLead, plain } from './text';

/**
 * OfferPage's plan: for every band of a corpus page, WHAT SHAPE it is and, from the page's rhythm,
 * how it is laid out. Pure data in, pure data out; `OfferPage.tsx` only places what it is told.
 *
 * The page-mapping (docs/page-mapping.md) is the design; this file is its rules, applied by the
 * words' structure rather than by a table of routes, so thirty more service pages, six audits and
 * twelve expertise pages take the same decisions without a new template.
 *
 *   1. SHAPE. A band is classified by the shape of its blocks (`kindOf`). A few shapes the structure
 *      cannot tell apart are told by the band id, which is the content team's own vocabulary
 *      (`complex-products` and `proof` are both "labelled claims ending in a quote", but one names
 *      products and the other names cases).
 *   2. SPLIT. One band may become two units (page-mapping § 0 rule 3): a head and its closing
 *      sentence; the first principles and the rest. A case set and the quote it ends on are NOT split
 *      (home round 2, 10 Oct 2026): the quote sits beside its own case inside the band, and a story's
 *      quote beside its story. A split's second
 *      part keeps the reading order, so no word moves.
 *   3. RHYTHM. Media sides alternate (the first is at the start); a third media split in a row
 *      becomes a read-down with the photograph aside; the close is tint unless the band above is, and
 *      two tints never touch. (The tint quote bands, and the horizon texture that announced them,
 *      went with the split quotes in home round 2.)
 *
 * Units are emitted in document order, with the one sanctioned exception every corpus template
 * shares (`formBeforeFaq`, order.ts): the enquiry form sits immediately before the FAQ.
 */

export type OfferKind =
  | 'outcomes'
  | 'symptoms'
  | 'record'
  | 'cases'
  | 'tiles'
  | 'router'
  | 'thread'
  | 'table'
  | 'deliverables'
  | 'reasons'
  | 'personas'
  | 'principles'
  | 'caseStories'
  | 'faq'
  | 'enquiry'
  | 'generic';

/** Which half of a split a unit is. `whole` is a band that did not split. */
export type OfferPart = 'whole' | 'a' | 'b';

export type OfferUnit = {
  /** The unit's anchor: the band's id, and `<id>-2` for a split's second part (page-mapping § 3). */
  id: string;
  band: CorpusBand;
  kind: OfferKind;
  part: OfferPart;
  /** For `caseStories`, which `###` item this unit shows. */
  itemIndex?: number;
  surface: 'paper' | 'tint';
  /** The side a media-carrying unit's photograph sits on, alternating down the page. */
  side?: 'start' | 'end';
  /** `reasons` is a media split (`B`) unless a third in a row would follow, then a read-down (`D`). */
  variant?: 'B' | 'D';
  /** Visual (a photograph, artefact, drawing, boxed table, icon set) or text-heavy: page-mapping § 3. */
  visual: boolean;
};

/* ── Shape signatures ───────────────────────────────────────────────────────────── */

type Sig = 'Q' | 'F' | 'T' | 'I' | 'K' | 'U' | 'L' | 'A' | 'P';

function sigOf(block: CorpusBlock): Sig | null {
  switch (block.type) {
    case 'quote':
      return 'Q';
    case 'form':
      return 'F';
    case 'table':
      return 'T';
    case 'item':
      return 'I';
    case 'links':
      return 'K';
    case 'list':
      return 'U';
    case 'labelled':
      return 'L';
    case 'comment':
      return null;
    case 'paragraph':
      if (boldLead(block.runs)) return 'L';
      if (linkLead(block)) return 'A';
      return 'P';
  }
}

function signature(band: CorpusBand): string {
  return band.blocks
    .map(sigOf)
    .filter((sig): sig is Sig => sig !== null)
    .join('');
}

const QUOTE_MARK = /^["“‘']/;

/** A table whose second column is a quoted voice: its rows are people, not data compared across rows. */
function isPersonaTable(block: CorpusBlock | undefined): boolean {
  if (block?.type !== 'table' || block.header.length !== 2) return false;
  return (
    block.rows.length > 0 && block.rows.every((row) => QUOTE_MARK.test(plain(row[1] ?? [])))
  );
}

/** A labelled claim whose label is a quoted customer voice (`**"Customers keep getting stuck."** …`). */
function labelIsQuoted(block: CorpusBlock): boolean {
  const label =
    block.type === 'labelled'
      ? block.label
      : block.type === 'paragraph'
        ? boldLead(block.runs)?.label
        : undefined;
  return label !== undefined && QUOTE_MARK.test(plain(label));
}

/**
 * Bands the structure cannot tell apart, named by the id the content team gave them. Each entry says
 * what the band IS, not how it looks: the arrangement is the plan's.
 */
const ROLE_BY_ID: Readonly<Record<string, OfferKind>> = {
  'complex-products': 'cases',
  proof: 'cases',
  trace: 'thread',
  deliverables: 'deliverables',
  'worked-example': 'record',
  engagement: 'tiles',
  approach: 'principles',
  'why-tcules': 'reasons',
  'hard-parts': 'personas',
};

export function kindOf(band: CorpusBand): OfferKind {
  const sig = signature(band);
  if (sig.includes('F')) return 'enquiry';

  const items = band.blocks.filter(
    (b): b is Extract<CorpusBlock, { type: 'item' }> => b.type === 'item',
  );
  if (items.length >= 2 && sig === 'I'.repeat(items.length)) {
    return items.every((item) =>
      item.blocks.every(
        (b) => b.type === 'paragraph' || b.type === 'list' || b.type === 'comment',
      ),
    )
      ? 'faq'
      : 'caseStories';
  }

  if (/^A{3,}$/.test(sig)) return 'router';

  const labelled = band.blocks.filter((b) => sigOf(b) === 'L');
  if (labelled.length >= 3 && labelled.every(labelIsQuoted) && /^L+$/.test(sig))
    return 'symptoms';

  const byId = ROLE_BY_ID[band.id];
  if (byId === 'personas' && !isPersonaTable(band.blocks.find((b) => b.type === 'table'))) {
    return /T/.test(sig) ? 'table' : 'generic';
  }
  if (byId) return byId;

  if (/^PT/.test(sig))
    return isPersonaTable(band.blocks.find((b) => b.type === 'table')) ? 'personas' : 'table';
  if (/^L{3,6}Q?$/.test(sig)) return 'outcomes';
  return 'generic';
}

/* ── Planning ───────────────────────────────────────────────────────────────────── */

/* Product-design round 6 (11 Oct 2026, page-mapping § 23): `symptoms` (VoiceLedger), `record`
   (CaseSpread) and `tiles` (EngagementOptions) no longer carry a photograph beside their copy, so they
   take no side in the alternation. `record` keeps its evidence image, always at the end of its claim. */
const MEDIA_KINDS: ReadonlySet<OfferKind> = new Set([
  'deliverables',
  'reasons',
  'principles',
  'caseStories',
]);

/** Kinds that read as visual in the rhythm (a photograph, artefact, drawing, boxed table, icon set, covers). */
const VISUAL: ReadonlySet<OfferKind> = new Set([
  'symptoms',
  'record',
  'cases',
  'tiles',
  'router',
  'thread',
  'table',
  'deliverables',
  'reasons',
  'personas',
  'principles',
  'caseStories',
]);

type Draft = Omit<OfferUnit, 'surface' | 'side' | 'variant'> & {
  variant?: OfferUnit['variant'];
};

function drafts(page: CorpusPage): Draft[] {
  const units: Draft[] = [];
  const unit = (
    band: CorpusBand,
    kind: OfferKind,
    part: OfferPart,
    extra: Partial<Draft> = {},
  ) => {
    units.push({
      id: part === 'b' ? `${band.id}-2` : band.id,
      band,
      kind,
      part,
      visual: kind === 'generic' ? false : VISUAL.has(kind),
      ...extra,
    });
  };

  for (const band of formBeforeFaq(page.bands)) {
    const kind = kindOf(band);
    switch (kind) {
      case 'cases':
        /* M6: a set of cases and the quote it ends on stay ONE band (home round 2, 10 Oct 2026). The
           quote's case is featured with the quote beside it, and the other cases follow as the list
           (OfferBands CaseSet). Round 1 sent the quote to a tint band of its own after the set, where
           it no longer sat with the case it was about. */
        unit(band, 'cases', 'whole');
        break;
      case 'personas':
        unit(band, 'personas', 'a');
        unit(band, 'personas', 'b', { visual: false });
        break;
      case 'principles':
        unit(band, 'principles', 'a');
        unit(band, 'principles', 'b', { visual: false });
        break;
      case 'caseStories': {
        const items = band.blocks.filter((b) => b.type === 'item');
        items.forEach((_, index) =>
          unit(band, 'caseStories', index === 0 ? 'a' : 'b', {
            itemIndex: index,
            id: index === 0 ? band.id : `${band.id}-${index + 1}`,
          }),
        );
        /* A story's quote is set BESIDE its story, in the story's own band (OfferBands caseStories),
           never after the last story as a band of its own (home round 2, 10 Oct 2026). */
        break;
      }
      default:
        unit(band, kind, 'whole');
    }
  }
  return units;
}

/**
 * The page's units, with surfaces, media sides and texture decided from the whole sequence.
 */
export function planOffer(page: CorpusPage): OfferUnit[] {
  const raw = drafts(page);
  const planned: OfferUnit[] = [];
  /* The side the next media-carrying unit takes: the first is at the start, then they alternate. */
  let side: 'start' | 'end' = 'start';
  /* How many media splits (B) have come in a row. A read-down with a photograph aside (D) is a
     media unit for the sides but ends the run, as does any band with no photograph. */
  let bRun = 0;

  for (const draft of raw) {
    const prevTint = planned.at(-1)?.surface === 'tint';
    const surface: OfferUnit['surface'] =
      draft.kind === 'enquiry' && !prevTint ? 'tint' : 'paper';

    const carriesMedia =
      MEDIA_KINDS.has(draft.kind) && !(draft.kind === 'principles' && draft.part === 'b');
    /* Two media splits already in a row: a third would be a third B. A read-down with the
       photograph beside its head says the same thing in a different shape (page-mapping M11). */
    const variant: OfferUnit['variant'] =
      draft.kind === 'reasons' ? (bRun >= 2 ? 'D' : 'B') : undefined;
    const isB = carriesMedia && draft.kind !== 'symptoms' && variant !== 'D';

    let unitSide: OfferUnit['side'];
    if (carriesMedia) {
      unitSide = side;
      side = side === 'start' ? 'end' : 'start';
    }
    bRun = isB ? bRun + 1 : 0;

    planned.push({ ...draft, surface, side: unitSide, variant });
  }

  /* Rhythm: never two text-heavy bands adjacent (page-mapping § 3). A warning, not a refusal: the
     page renders as written and the fault is visible on it. */
  if (process.env.NODE_ENV !== 'production') {
    planned.forEach((unit, index) => {
      const next = planned[index + 1];
      if (
        next &&
        !unit.visual &&
        !next.visual &&
        unit.kind !== 'enquiry' &&
        next.kind !== 'enquiry'
      ) {
        console.warn(
          `OfferPage ${page.route}: two text-heavy bands adjacent (${unit.id}, ${next.id}). Mark the exception in docs/page-mapping.md.`,
        );
      }
    });
  }
  return planned;
}
