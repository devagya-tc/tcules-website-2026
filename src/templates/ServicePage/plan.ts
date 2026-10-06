import { SERVICE_PHOTO_SLOTS, type PhotoId, type ServicePhotoSlots } from '@/lib/photos';
import type {
  ServiceStory,
  StoryBanner,
  StoryBlock,
  StoryOffer,
  StorySection,
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
 *          the two head-track asides in page order, the router preferring `aside1`.
 *   § 6.4  the texture signature: `counterweight` on B where its copy column has room, `horizon` on
 *          the band directly above the tint proof band unless it ends in ruled rows, `closing` on L.
 *
 * Pure: the same story always gets the same plan. Every decision a renderer needs is on the band,
 * so Bands.tsx only places what it is told.
 */

/** The § 3.4 archetypes a service page uses. */
export type Archetype =
  | 'B' // media split: a photograph beside the head and tiles
  | 'C-text' // tiles under a head: signals with no photograph to stand beside
  | 'C-icon' // the icon router: beside head + photo aside, linked icon cards
  | 'C-pair' // two cases beside a head and its action
  | 'D' // read-down rows beside a head with an aside
  | 'D-faq' // a centred accordion
  | 'E' // a full-column diagram under a head
  | 'F' // numbered steps beside a head with a photo aside
  | 'G' // the proof band, on tint
  | 'H' // client marks
  | 'I' // the banner
  | 'K' // the mid-page offer
  | 'M' // a centred set of linked covers
  | 'N'; // the contrast pair

type BandBase = {
  archetype: Archetype;
  /** Centred head (§ 3.5). */
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
  /** B only: the copy column has room for the counterweight field (≤ 2 tiles). */
  counterweight: boolean;
};

export type OfferBand = BandBase & { kind: 'offer'; offer: StoryOffer; photo?: PhotoId };
export type BannerBand = BandBase & { kind: 'banner'; banner: StoryBanner; photo?: PhotoId };
export type Band = SectionBand | OfferBand | BannerBand;

/** The kinds a section's job is read from: its first block that is not a note or a slot. */
const QUIET: ReadonlySet<StoryBlock['kind']> = new Set(['note', 'slot']);

/** Bands whose body ends in a ruled ladder: no `horizon` under them (§ 6.3, "never above ruled rows"). */
const RULED: ReadonlySet<Archetype> = new Set(['D', 'D-faq', 'F', 'N']);

/** Bands that are always centred, and bands that centre unless their neighbour already does. */
const ALWAYS_CENTRED: ReadonlySet<Archetype> = new Set(['H', 'M', 'D-faq']);
const MAY_CENTRE: ReadonlySet<Archetype> = new Set(['E', 'N', 'C-text']);

/** Bands with a head-track aside. */
const ASIDE: ReadonlySet<Archetype> = new Set(['C-icon', 'D', 'F']);

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
      return {
        kind: 'offer',
        offer: entry,
        archetype: 'K',
        centred: false,
        horizon: false,
        photo: slots?.k,
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
    let counterweight = false;
    if (archetype === 'B') {
      bUsed = true;
      photo = slots?.b;
      const signals = job(entry);
      counterweight = signals?.kind === 'signals' && signals.items.length <= 2;
    } else if (archetype === 'C-icon') {
      photo = takeAside(0);
    } else if (archetype === 'F' || archetype === 'D') {
      photo = takeAside(1);
    }
    return {
      kind: 'section',
      section: entry,
      archetype,
      centred: ALWAYS_CENTRED.has(archetype),
      horizon: false,
      photo,
      headSide: 'start',
      counterweight,
    };
  });

  /* Pass 2: the page-level rules. */
  let asideCount = 0;
  bands.forEach((band, index) => {
    const before = bands[index - 1];
    const after = bands[index + 1];
    if (band.kind === 'section') {
      /* § 3.5: a band that may centre does so only where neither neighbour is centred. */
      if (MAY_CENTRE.has(band.archetype)) {
        band.centred = !before?.centred && !(after && ALWAYS_CENTRED.has(after.archetype));
      }
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

  return bands;
}
