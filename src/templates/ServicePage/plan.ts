import {
  qualifies,
  SERVICE_PHOTO_SLOTS,
  type PhotoId,
  type ServicePhotoSlots,
} from '@/lib/photos';
import type {
  ServiceStory,
  StoryBanner,
  StoryBlock,
  StoryOffer,
  StorySection,
  StoryStatement,
} from '@/lib/service-story';

/**
 * THE BAND PLAN — where the template decides arrangement, so no story has to.
 *
 * A story says what each section argues; it never says how the section is laid out (the
 * `arrangement`, `surface` and `density` fields left the story on 6 Oct 2026). This file reads the
 * JOB each section's blocks do and gives it a kit band (visual-direction § 3.4), then walks the page
 * once to apply the page-level rules no single band can see:
 *
 *   § 3.4  every job has one archetype: signals → B, steps → F, ledger and stat → D, router → the
 *          C-icon router (or the list router), cases → C-pair or M, proof → G on tint, fit → N,
 *          faq → D-faq, logos → H, resources → M, the diagrams → E, offer → K, banner → I.
 *   § 3.5  centred heads never sit in adjacent bands: a band that may go either way yields.
 *   § 3.2  consecutive beside-with-aside bands mirror (`headSide`), so two are never one rectangle.
 *   § 5.6  the page's photographs come from its slot table (SERVICE_PHOTO_SLOTS): B, I and K by role,
 *          the head-track asides in page order, D (never a router) taking `aside2`;
 *          F takes none and a page may name none (image pass, 7 Oct 2026). K's frame follows
 *          its photograph: landscape 3:2 where the master resolves at 667, else the portrait 4:5.
 *   § 6.4  the texture signature: `horizon` on the band directly above the tint proof band unless it
 *          ends in ruled rows, `closing` on L, and the third placement on the J statement — the
 *          stepped `corner` field in the band's top-end corner (fix round 2; it was `head-half`, which
 *          read as a pale smudge and ran behind the sentence's first line). B carries no texture
 *          (page-design-systems fix round 2, 6 Oct 2026): its `counterweight` floated under two tiles
 *          as a free-standing grey rectangle, a skeleton loader at 1470 and an orphaned block at 390.
 *   § 3.2  a B with two tiles gives the photograph the large track (`photoWeight`, 667 at 6:5 beside
 *          the copy's 477): two tiles leave a 667 copy column half empty, and the photograph is what
 *          the band can spend the width on. Four tiles fill the 667, so the photo keeps the 477.
 *   § 3.4  a section of clickable cards — the C-icon router, the list router, the C-pair cases —
 *          stacks its head over the cards at full width and carries no photograph (owner, 9 Oct
 *          2026): the cards read as the heading's continuation, never as a grid beside a head.
 *   § 3.5  J centres its sentence across the full measure unless a neighbour is centred (fix round
 *          2): a split J between two beside bands put four bands' content on one 1/3 line.
 *   § 7.1  the head form follows the body: a thread's E band centres its head from 1024 (start below,
 *          over the vertical thread); every other diagram, and M (a set of covers), takes a stacked
 *          start head whose `more` link closes it under the lead (`moreInHead`) rather than a ruled
 *          foot under the body. The H-row (heading beside its lead) is retired (owner, 7 Oct 2026):
 *          a text-only head is never split left/right.
 *   § 1.7  never two text-heavy bands back to back (owner, 7 Oct 2026): a dev warning, not a
 *          rearrangement, because the fix is the story's order and the plan never reorders it.
 *          `textHeavy` below is the definition.
 *
 * Pure: the same story always gets the same plan. Every decision a renderer needs is on the band,
 * so Bands.tsx only places what it is told.
 */

/** The § 3.4 archetypes a service page uses. */
export type Archetype =
  | 'B' // media split: a photograph beside the head and tiles
  | 'C-text' // tiles under a head: signals with no photograph to stand beside
  | 'C-icon' // the icon router: stacked head over linked icon cards, no photograph
  | 'C-pair' // a stacked head and its action over two cases
  | 'D' // read-down rows beside a head with an aside
  | 'D-faq' // a centred accordion
  | 'E' // a full-column diagram under a head
  | 'F' // numbered steps beside a head (no photograph since the 7 Oct 2026 image pass)
  | 'G' // the proof band, on tint
  | 'H' // client marks
  | 'I' // the banner
  | 'J' // the statement: one sentence at the display role
  | 'K' // the mid-page offer
  | 'M' // a full-width row of linked covers under a stacked head
  | 'N'; // the contrast pair

type BandBase = {
  archetype: Archetype;
  /** Centred head (§ 3.5). On an E or N band, from 1024 only: below it the body reads down a
      start edge, and a centred head over a start-aligned body is two alignments in one band. */
  centred: boolean;
  /** `horizon` at the band's foot (§ 6.4 item 2). */
  horizon: boolean;
};

export type SectionBand = BandBase & {
  kind: 'section';
  section: StorySection;
  /** The head-track or media photograph, if the band carries one. */
  photo?: PhotoId;
  /** `headSide` for a beside band with an aside (§ 3.2 rule 4 for head tracks). */
  headSide: 'start' | 'end';
  /** B only: the photograph takes the large track, because the copy is two tiles (§ 3.2). */
  photoWeight: boolean;
  /** E (a diagram) and M (covers): the `more` link closes the stacked head, under the lead, rather
      than opening a ruled foot under the full-column body. (It was `headRow`, the H-row, retired
      7 Oct 2026: a text-only head is never split left/right.) */
  moreInHead: boolean;
};

export type OfferBand = BandBase & {
  kind: 'offer';
  offer: StoryOffer;
  photo?: PhotoId;
  /** The photograph's frame: landscape where the master resolves at the 667 track (§ 5.4). */
  frame: 'portrait' | 'landscape';
  /** Below 1024, the photo above the copy: set where a neighbour is a head → photo → body band,
      which at 390 would otherwise repeat K's shape (fix round 2). */
  photoFirst: boolean;
};
export type BannerBand = BandBase & { kind: 'banner'; banner: StoryBanner; photo?: PhotoId };
export type StatementBand = BandBase & {
  kind: 'statement';
  statement: StoryStatement;
  /** The `corner` field, when the page's texture budget has the placement to spend here. */
  corner: boolean;
};
export type Band = SectionBand | OfferBand | BannerBand | StatementBand;

/** The kinds a section's job is read from: its first block that is not a note or a slot. */
const QUIET: ReadonlySet<StoryBlock['kind']> = new Set(['note', 'slot']);

/** Bands whose body ends in a ruled ladder: no `horizon` under them (§ 6.3, "never above ruled rows"). */
const RULED: ReadonlySet<Archetype> = new Set(['D', 'D-faq', 'F', 'N']);

/** Bands that are always centred, and bands that centre unless their neighbour already does. */
/* M is not among them (fix round 2): a set of covers is a full-width image-card row under a start
   head, a different shape from the centred H and D-faq heads. */
const ALWAYS_CENTRED: ReadonlySet<Archetype> = new Set(['H', 'D-faq']);
const MAY_CENTRE: ReadonlySet<Archetype> = new Set(['E', 'N', 'C-text']);

/** Texture placements per page at 8 or more bands (§ 6.4). */
const TEXTURE_BUDGET = 3;

/** Bands with a head-track aside. */
const ASIDE: ReadonlySet<Archetype> = new Set(['D', 'F']);

function job(section: StorySection): StoryBlock | undefined {
  return section.blocks.find((block) => !QUIET.has(block.kind));
}

function routerHasIcons(block: Extract<StoryBlock, { kind: 'router' }>): boolean {
  const count = block.items.length + (block.also ? 1 : 0);
  const all =
    block.items.every((item) => item.icon) && (!block.also || Boolean(block.also.icon));
  /* An icon set is 4 or 6 (§ 3.4 C-icon): any other count reads as a grid with a hole. */
  return all && (count === 4 || count === 6);
}

function archetypeOf(section: StorySection, bAvailable: boolean): Archetype {
  const block = job(section);
  if (!block) return 'E';
  switch (block.kind) {
    case 'signals':
      return bAvailable && block.items.length <= 4 ? 'B' : 'C-text';
    case 'steps':
      return 'F';
    case 'ledger':
    case 'stat':
      return 'D';
    case 'router':
      return routerHasIcons(block) ? 'C-icon' : 'D';
    case 'cases':
      return block.items.length <= 2 ? 'C-pair' : 'M';
    case 'proof':
      return 'G';
    case 'fit':
      return 'N';
    case 'faq':
      return 'D-faq';
    case 'logos':
      return 'H';
    case 'resources':
      return 'M';
    default:
      /* Every diagram is E; an unrecognised job falls back to the same full-column band. */
      return 'E';
  }
}

export function slotsFor(slug: string): ServicePhotoSlots | undefined {
  return Object.hasOwn(SERVICE_PHOTO_SLOTS, slug)
    ? SERVICE_PHOTO_SLOTS[slug as keyof typeof SERVICE_PHOTO_SLOTS]
    : undefined;
}

export function planBands(story: ServiceStory): Band[] {
  const slots = slotsFor(story.slug);
  let bUsed = false;
  const asides: (PhotoId | undefined)[] = slots ? [slots.aside1, slots.aside2] : [];
  /* The head-track asides in page order; a band takes its preferred slot, else whichever is left. */
  const takeAside = (prefer: 0 | 1): PhotoId | undefined => {
    const index = asides[prefer] ? prefer : asides.findIndex(Boolean);
    if (index < 0) return undefined;
    const id = asides[index];
    asides[index] = undefined;
    return id;
  };

  /* Pass 1: the archetype and the photographs, in page order. */
  const bands: Band[] = story.sections.map((entry): Band => {
    if (entry.type === 'offer') {
      const photo = slots?.k;
      return {
        kind: 'offer',
        offer: entry,
        archetype: 'K',
        centred: false,
        horizon: false,
        photo,
        frame: photo && qualifies(photo, 'offerWide') ? 'landscape' : 'portrait',
        photoFirst: false,
      };
    }
    if (entry.type === 'statement') {
      return {
        kind: 'statement',
        statement: entry,
        archetype: 'J',
        centred: false,
        horizon: false,
        corner: false,
      };
    }
    if (entry.type === 'banner') {
      return {
        kind: 'banner',
        banner: entry,
        archetype: 'I',
        centred: false,
        horizon: false,
        photo: slots?.i,
      };
    }
    const archetype = archetypeOf(entry, Boolean(slots) && !bUsed);
    let photo: PhotoId | undefined;
    let photoWeight = false;
    if (archetype === 'B') {
      bUsed = true;
      photo = slots?.b;
      const signals = job(entry);
      photoWeight = signals?.kind === 'signals' && signals.items.length <= 2;
    } else if (archetype === 'D' && job(entry)?.kind !== 'router') {
      photo = takeAside(1);
    }
    /* A router takes no photograph, icon (C-icon) or list (D): a section of clickable cards has no
       decorative image, and its head stacks over the cards (owner, 9 Oct 2026). The photo budget
       goes to the bands whose items are read, not clicked. */
    /* F takes no photograph (image pass, 7 Oct 2026): numbered steps are the band's shape, and a
       stock photo beside them neither shows the method nor fits it. The head sits beside the steps
       (a head | read-down split, which the 7 Oct ruling 2 keeps). */
    /* § 3.5: a G with no case beside its quote is the typographic band — the quote centred
       (Proof `align="center"`, "the typographic G band under a centred head") — so its head centres
       with it, lead or not (the H-row that took a lead is retired, 7 Oct 2026). A start head over a
       centred quote was two alignments in one band (page-design-systems fix round 2). */
    const proof = job(entry);
    const typographic = archetype === 'G' && proof?.kind === 'proof' && !proof.case;
    return {
      kind: 'section',
      section: entry,
      archetype,
      centred: ALWAYS_CENTRED.has(archetype) || typographic,
      horizon: false,
      photo,
      headSide: 'start',
      photoWeight,
      moreInHead: false,
    };
  });

  /* Pass 2: the page-level rules. */
  let asideCount = 0;
  bands.forEach((band, index) => {
    const before = bands[index - 1];
    const after = bands[index + 1];
    /* § 3.7 cadence at 390: a beside band with an aside stacks head → photo → body on a phone, and
       so does K. Beside each other they read as one rectangle twice, so K leads with its photo. */
    if (band.kind === 'offer' && band.photo) {
      const asideBand = (b: Band | undefined) =>
        b?.kind === 'section' && ASIDE.has(b.archetype) && Boolean(b.photo);
      band.photoFirst = asideBand(before) || asideBand(after);
    }
    if (band.kind === 'statement') {
      band.centred = !before?.centred && !(after && ALWAYS_CENTRED.has(after.archetype));
    }
    if (band.kind === 'section') {
      /* § 3.5: a band that may centre does so only where neither neighbour is centred. An E band
         centres only over a thread, whose rail centres with it; any other diagram is a full-column
         object under a stacked start head (§ 3.4 E). */
      const thread = job(band.section)?.kind === 'thread';
      if (MAY_CENTRE.has(band.archetype) && (band.archetype !== 'E' || thread)) {
        band.centred = !before?.centred && !(after && ALWAYS_CENTRED.has(after.archetype));
      }
      if (band.archetype === 'E' && !band.centred && !thread) band.moreInHead = true;
      if (band.archetype === 'M') band.moreInHead = true;
      /* § 3.2: beside-with-aside bands alternate the head's side down the page. */
      if (ASIDE.has(band.archetype) && band.photo) {
        band.headSide = asideCount % 2 === 0 ? 'start' : 'end';
        asideCount += 1;
      }
    }
    /* § 6.4 item 2: horizon above the tint proof band, on a paper band that does not end in rules
       and carries no photograph (a texture never sits behind an image). */
    if (
      after?.archetype === 'G' &&
      band.kind === 'section' &&
      !RULED.has(band.archetype) &&
      band.archetype !== 'B' &&
      band.archetype !== 'G'
    ) {
      band.horizon = true;
    }
  });

  /* Pass 3: § 6.4's budget. `closing` on L always counts (the close is the page's last band); a J
     statement takes `corner` only with a placement left over, never beside another textured band or
     directly above the close. */
  const textured = (band: Band | undefined): boolean => {
    if (!band) return false;
    if (band.horizon) return true;
    return band.kind === 'statement' && band.corner;
  };
  const spent = () => 1 + bands.filter(textured).length;
  bands.forEach((band, index) => {
    if (band.kind !== 'statement') return;
    const last = index === bands.length - 1;
    if (
      spent() < TEXTURE_BUDGET &&
      !last &&
      !textured(bands[index - 1]) &&
      !textured(bands[index + 1])
    ) {
      band.corner = true;
    }
  });

  if (process.env.NODE_ENV !== 'production') warnTextHeavyPairs(story.slug, bands);
  return bands;
}

/** Bands whose job is drawn rather than written: a diagram, client marks, a set of covers, an icon
    set, a case pair (cards with covers). Visual whatever photograph they carry. */
const DRAWN: ReadonlySet<Archetype> = new Set(['E', 'H', 'M', 'C-icon', 'C-pair']);

/**
 * TEXT-HEAVY (visual-direction § 1.7, owner 7 Oct 2026): a band a reader can only read. It carries no
 * photograph and its body is words — a statement (J), an accordion (D-faq), a contrast pair (N),
 * steps (F), tiles (C-text), and a ledger, stat or list router (D), a quote with no case (G), an
 * offer (K) or banner (I) when no photograph landed. A band is VISUAL when it carries a photograph
 * or its job is drawn (`DRAWN`). Read from the plan, not the story, so a slot table that loses a
 * photograph turns its band text-heavy and the check sees it.
 */
export function textHeavy(band: Band): boolean {
  if (DRAWN.has(band.archetype)) return false;
  if ('photo' in band && band.photo) return false;
  if (band.kind === 'section' && band.archetype === 'G') {
    const proof = job(band.section);
    return !(proof?.kind === 'proof' && proof.case);
  }
  return true;
}

/** The index of every band that follows a text-heavy band and is text-heavy itself. */
export function textHeavyPairs(bands: readonly Band[]): number[] {
  return bands.flatMap((band, index) => {
    const before = bands[index - 1];
    return before && textHeavy(before) && textHeavy(band) ? [index] : [];
  });
}

function warnTextHeavyPairs(slug: string, bands: readonly Band[]): void {
  for (const index of textHeavyPairs(bands)) {
    console.warn(
      `[ServicePage ${slug}] bands ${index} and ${index + 1} (${bands[index - 1]?.archetype}, ` +
        `${bands[index]?.archetype}) are both text-heavy. Follow a text-heavy band with a visual ` +
        'one (visual-direction § 1.7): reorder the story or give one a photograph.',
    );
  }
}
