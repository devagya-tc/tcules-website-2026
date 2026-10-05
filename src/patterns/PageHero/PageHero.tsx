import type { ReactNode } from 'react';

import {
  Button,
  Cluster,
  Layout,
  Media,
  Section,
  type MediaImage,
  type SectionSurface,
} from '@/components';
import { FULL_COLUMN, HERO_BESIDE } from '@/lib/image-sizes';
import { repeatsTrail, sameLabel, type HeroTrail } from '@/lib/trail';

import styles from './PageHero.module.css';

/**
 * Who made the thing, in the four kinds the corpus has. The role is the token that selects a
 * LABEL — it is not a string the caller writes — which is what stops one route saying "Author"
 * and another "Written by" for the same fact.
 *
 * `reviewer` is null on all 15 of the long-read pages today. It stays a role inside `credits`
 * rather than becoming its own prop, so an absent reviewer is an absent group: no <dt>, no label
 * and no space. A separate `reviewer?: string[]` would be a "Reviewed by" hole waiting for the
 * day somebody writes `reviewer={[]}` instead of omitting it, and this way the empty case cannot
 * be expressed at all.
 */
export type HeroCreditRole = 'author' | 'host' | 'guest' | 'reviewer';

/**
 * One credit group — one label, one or more people, one <dd>.
 *
 * `people` is a non-empty tuple, so `{ role: 'guest', people: [] }` does not compile. That
 * matters: it would have rendered a "With" label above nothing.
 *
 * One group per role rather than one per person is what keeps the label from being repeated
 * three times for a podcast with three guests — the names are joined into a single value.
 */
export type HeroCredit = { role: HeroCreditRole; people: readonly [string, ...string[]] };

/**
 * The dates, as ISO strings. `published` is required, so a modified-only date cannot be
 * expressed; `modified` renders only when it is present AND differs from `published`, because
 * two identical dates under two different labels is a fact about the CMS, not about the page.
 */
export type HeroDates = { published: string; modified?: string };

/** One action. `href` comes from `@/lib/routes` at the call site, never written out there. */
export type HeroAction = { label: string; href: string };

/**
 * A still image in the hero: the image RECORD, nested rather than spread.
 *
 * Nested because the record has a `kind` of its own — capture, cut-out, illustration, photograph —
 * and this union needs a discriminant too. Spread into one object, the two would share a name and
 * one would overwrite the other (docs/specs/Media.md § 17 Q7), so the union discriminates on `type`
 * and the record keeps `kind` untouched, exactly as a page received it from `@/content`.
 *
 * The record is `Media`'s own `MediaImage` — master `src`, intrinsic `width` and `height`, `alt`,
 * the derived `sources`, and the kind that decides its edge. PageHero adds nothing to it and reads
 * nothing out of it: the edge, the srcset and the loading are `Media`'s, and the width is the
 * arrangement's. Supply the master at 2560 (ruling M2); a narrower asset upscales in the full
 * column, and the fix belongs to the asset.
 *
 * `alt` describes what the image SHOWS and must not restate the title or the lead. An illustration
 * cover or banner takes `alt=""` (ch05 § 9a): the h1 already names what it stands for.
 */
export type HeroImage = {
  type: 'image';
  image: MediaImage;
};

/**
 * A YouTube video in the hero, as an id and a title rather than a URL or an embed snippet.
 *
 * `id` is the eleven-character video id — `dQw4w9WgXcQ` — never a watch URL, never a share link
 * and never an `<iframe>`. The component builds the src, which is what keeps every hero on the
 * same host (youtube-nocookie.com), the same parameters and the same referrer policy; a caller
 * passing a URL would be a caller who could pass any URL, and a caller passing markup would be
 * an injection point in the opening block of 129 pages. The id is interpolated into the path, so a
 * value containing `?` or `/` reaches YouTube as a malformed path and renders an unavailable frame
 * — it cannot reach another host, which is the property that matters.
 *
 * `title` is required, because it is the accessible name of the frame and the only thing a
 * screen-reader user gets before entering someone else's document. "YouTube video player" is
 * what the embed snippet ships and it names nothing — say what the video is.
 */
export type HeroVideo = {
  type: 'youtube';
  id: string;
  title: string;
};

/**
 * The media slot — an image or a YouTube embed, never both and never two.
 *
 * A discriminated union rather than two optional props, so `image` and `video` set together is not
 * a case anyone has to decide what to do about: it does not compile. And a union rather than a
 * `ReactNode` slot, which is the other shape this could have taken — the sideways idiom this repo
 * uses everywhere else. It is refused here for one reason: a ReactNode would put the 16/9 box, the
 * hairline, the `sizes` for the arrangement, the LCP priority and the embed's host and parameters
 * at the CALL SITE, on 129 routes, in a tier whose whole job is composition. The two renderings
 * are a closed set and the component owns them.
 */
export type HeroMedia = HeroImage | HeroVideo;

/**
 * The page's ancestor trail, inside the hero's band (kit `fdn-top`, 5 Oct 2026):
 * `{ crumbs: ReactNode; labels: readonly string[]; structural?: number }`, declared in `@/lib/trail`
 * and re-exported here.
 *
 * `crumbs` is a slot: the rendered `<Breadcrumbs …/>`. A slot rather than the items, because a
 * pattern does not import a pattern — the caller composes, and PageHero only places what it is
 * handed, 32 above the split.
 *
 * `labels` are the rendered crumbs' labels, beside the slot because a ReactNode cannot be read.
 * They are used for one thing: in development PageHero warns when the eyebrow or the title says
 * the same words as a crumb. `structural` is how many of them, from the start, are the site's
 * structure (Home and a section index from `SECTION_INDEXES`), which the eyebrow repeats only by
 * equalling. None is written by hand — `heroTrail(items, title, render)` builds all three from one
 * array, and drops a last crumb that repeats the title before any is made.
 */
export type { HeroTrail };

/**
 * Where the media sits against the copy. A PRESENTATION choice, made by the page-type template per
 * family, in code (ruling H1) — never a CMS field, because it says nothing about the content.
 *
 *   stacked  one column: the copy, then the media below it as a full-column block. The default,
 *            and the only arrangement a hero with no media has. This IS the "below" of ruling H1:
 *            media below the copy is today's single column with the media slot filled, so it has
 *            one name rather than two (spec § 4).
 *   beside   from 1024 up, the copy and the media in two equal tracks (text 1 : media 1, ruling H2),
 *            96 apart (`section`: a split, not peer halves), the media at its own ratio inside its
 *            track (H3). An illustration is centred on the copy; any other image is top-aligned.
 *            Below 1024 it stacks — copy, then media — and renders exactly as `stacked`.
 *
 * `beside` with no media renders `stacked`: there is nothing to put beside the copy, and a
 * template that sets `beside` for a family must still render the member that has no image. That is
 * the no-visual state, which is the common one, and it is not an error.
 */
export type HeroArrangement = 'stacked' | 'beside';

export type PageHeroProps = {
  /**
   * The page's one `h1`, rendered verbatim.
   *
   * A `string` and not a `ReactNode`, and that typing is the enforcement mechanism for the
   * one-h1-per-page constraint rather than a convenience: `title={<span>…</span>}` does not
   * compile, so a second heading cannot be smuggled through this prop six months from now.
   *
   * An empty string renders an empty `<h1>` anyway. There is no fallback copy — no "Untitled",
   * no em dash — because a fallback is how a content fault ships, and the empty element is what
   * makes the fault findable in an audit.
   */
  title: string;
  /**
   * The paragraphs, in order. Non-empty by type, because all 129 routes have at least one.
   *
   * `body[0]` renders as the lead at --text-lead (20) and `body[1…]` as body copy at --text-body
   * (16). That split gives the copy an internal hierarchy which scales from one paragraph to six
   * without a prop and without a count-driven rule the caller cannot see.
   *
   * The paragraphs were 18 and are now 16, which is the same role the page's Prose body takes: the
   * hero's copy MEETS body scale rather than sitting a step above it, and the whole of the band's
   * internal hierarchy is now carried by the lead. 20 against 16 is a wider step than 20 against
   * 18, so a hero with five or six paragraphs reads as a lead followed by body copy more clearly
   * than it did, rather than as one block of slightly-large text.
   *
   * Empty strings are dropped before the roles are assigned, so a blank entry produces no <p>
   * and no seam around nothing. Depth beyond six is not capped and not warned about — beyond
   * six the content belongs in the page body, and that is a review comment on a route rather
   * than a behaviour in a component.
   */
  body: readonly [string, ...string[]];
  /**
   * A category or format the trail cannot say (`Fintech · Platform rebuild`, `Ep 12 · 48 min`,
   * `Case study · Fintech`). Never a crumb's words: a name the trail says ("Product Design
   * specialist" under "… / Product design"), or a section crumb on its own (`Case study` under
   * Home / Case studies is the crumb read twice; `Case study · Fintech` adds what it cannot).
   *
   * That rule leads for the design agent's `.prompt.md`. Since the trail moved inside the hero
   * (kit `fdn-top`, 5 Oct 2026), an eyebrow that repeats a crumb stands 32px under the trail that
   * already said it; PageHero warns in development when it says a named crumb as a whole-word
   * phrase ("Product Design specialist" under "Product design") or equals a structural one
   * ("Services"), by the same comparison `eyebrowBesideTrail` uses (`repeatsTrail`, `@/lib/trail`).
   * Uppercased by the stylesheet, not by the data, so the frontmatter keeps its authored casing.
   *
   * A slot, not a variant: absent renders no element and no seam, which is why there is no
   * `variant="caseStudy"` selecting it. It sits 24px above the title rather than 8, because 8
   * under a 12px label reads as a caption stuck to the title and 24 reads as a label above one.
   */
  eyebrow?: string;
  /**
   * The ancestor trail, built by `heroTrail(items, title, (t) => <Breadcrumbs {...t} />)`. Sits 32
   * above the split.
   *
   * Inside the hero's band rather than in a band of its own, so the hero's 96 of top padding is
   * the air above the trail and nothing stacks a second band's padding on top of it. See
   * `HeroTrail`. Absent renders no element and no seam.
   */
  trail?: HeroTrail;
  /**
   * The credit groups, in array order, before the dates. Empty renders no `<dl>` at all — not
   * an empty one, and no 48px seam above nothing.
   */
  credits?: readonly HeroCredit[];
  /** The date pairs, after the credits. Absent renders nothing. */
  dates?: HeroDates;
  /**
   * Nought, one or two. Position decides emphasis: the first renders solid/primary, the second
   * a neutral link-style action.
   *
   * The second was ghost/neutral until 5 Oct 2026. The hero spends one Accent (the solid button)
   * and, beside media, one Field; a neutral link is ink and spends nothing (visual-direction § 4.2),
   * so the pair reads as one action and one alternative rather than as two buttons.
   *
   * Those are the three counts the corpus has, as a type — a third entry has no member of the
   * union to match, so it is a compile error rather than a review comment. The second emphasis is
   * a consequence of a second entry, not a slot waiting to be filled, which is why there is no
   * `emphasis` on HeroAction.
   */
  actions?: readonly [] | readonly [HeroAction] | readonly [HeroAction, HeroAction];
  /**
   * The ground this band paints, and therefore the trail's too. Defaults to `paper`.
   *
   * A prop here rather than an inherited attribute, and it is the same answer SiteNav and
   * SiteFooter give: a control reads `data-surface` from an ancestor because it sits inside
   * somebody else's band, and a pattern that OWNS a band has no ancestor to ask. PageHero IS the
   * band. Since the trail moved inside it (5 Oct 2026) there is no second band to keep in step —
   * the crumbs read this one's ground, so a two-tone seam at the top of a page can no longer be
   * written.
   */
  surface?: SectionSurface;
  /**
   * An image or a YouTube embed: below the copy, or beside it from 1024 — see `arrangement`.
   *
   * That placement leads for the same reason `surface`'s instruction does: it is the thing about
   * this prop a caller is most likely to assume wrongly, and the first sentence is the only part
   * that reaches the design agent's `.prompt.md`.
   *
   * It is the only part of the hero that is not capped at a measure: in `stacked` it takes the full
   * content column, in `beside` the whole of its track. Its height follows the asset's own ratio,
   * uncropped, at every width (ruling H3); only the video has a box of its own, 16/9, because that
   * is what YouTube serves. A very tall asset renders tall — a supply problem the 326 check
   * catches, not something this component clips.
   *
   * An image renders through `Media`, which owns its edge by `kind` (a capture takes the hairline,
   * a cut-out, an illustration and a photograph take none), its srcset, and its loading. It is
   * always `priority`: a hero image is the LCP element on the routes that have one.
   *
   * Absent renders no element and no seam. There is no placeholder box and no ratio reserved for
   * a hero that has no media — 97 of 129 routes will not fill this, and a hero that left room for
   * it would be a hero with a hole in it.
   */
  media?: HeroMedia;
  /**
   * Media below the copy (`stacked`, the default) or beside it from 1024 (`beside`). Set by the page template, never by content.
   *
   * The first sentence leads for the design agent's `.prompt.md`, as `surface`'s does. Ruling H1:
   * the page-type template chooses the arrangement per family, in code; it is never a CMS field.
   * With no `media` both values render the same single column. See `HeroArrangement`.
   */
  arrangement?: HeroArrangement;
  /**
   * The `extras` row, between the byline and the actions. No `Section` inside it, and any headings
   * in it start at h3.
   *
   * Both constraints lead for the same reason `surface`'s does — see that prop. One route uses the
   * slot today (`/contact`'s stat block).
   *
   * It carries no colour and no distance of its own, which is the point of it: whatever is
   * passed reads --sec-* from the hero's own band, so a Layout of stats inside a blue hero is
   * white-on-blue without being told. A slot that imposed an ink or a step would be a slot the
   * caller had to fight.
   *
   * It must not contain a `Section` (the content column would inset twice), a `Breadcrumbs`, or
   * another `PageHero`. Headings inside it start at h3, because the page's body sections use h2
   * and a hero adjunct is subordinate to them.
   */
  children?: ReactNode;
};

/* The label a role selects. A fixed map rather than a prop, and it does NOT change with the
   count — two authors are still "Written by". A hero whose credit label read differently on one
   route is a bug, which is why there is no `authorLabel`. */
/* Authored casing, uppercased by the stylesheet — the same division the eyebrow makes. Reversing
   the case is one declaration in PageHero.module.css and no edit here. */
const CREDIT_LABELS: Record<HeroCreditRole, string> = {
  author: 'Written by',
  host: 'Hosted by',
  guest: 'With',
  reviewer: 'Reviewed by',
};

/* "Updated" rather than "Modified": the byline is read by people, and one of those two words is
   what a person calls it. Both labels live here for the same reason the credit labels do. */
const PUBLISHED_LABEL = 'Published';
const MODIFIED_LABEL = 'Updated';

/* One long date, formatted once at module scope rather than per render.
   `timeZone: 'UTC'` is load-bearing rather than tidy: a bare "2026-03-03" parses as UTC
   midnight, so formatting it in any zone behind UTC yields 2 March — which would render one date
   on the server and another in a Los Angeles browser, and hydration would not complain because
   both are valid text. Pinning the zone makes the output a function of the string alone. */
const LONG_DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/* An unparseable date renders verbatim instead of "Invalid Date". The spec does not name this
   case — its edge cases are about content shape rather than content validity — but the failure
   mode of the alternative is a page shipping the literal string "Invalid Date" in its byline,
   which is worse than showing the frontmatter's own bad value where an author can recognise it. */
const formatDate = (iso: string) => {
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? iso : LONG_DATE.format(parsed);
};

/* One name alone; two joined with "and"; three or more comma-separated with "and" before the
   last. Written out rather than taken from Intl.ListFormat, because this is a fixed English
   label decision the spec makes once and locale data is free to disagree with it. */
const joinPeople = (people: readonly string[]) =>
  people.length <= 2
    ? people.join(' and ')
    : `${people.slice(0, -1).join(', ')} and ${people[people.length - 1]}`;

/* A rendered byline row: one <dt>, one <dd>. Credits and dates become the same shape here so
   the <dl> maps once — the two are different content but identical structure, and a second map
   would be a second chance for the key/value markup to drift. */
type BylinePair = { id: string; label: string; value: ReactNode };

/**
 * PageHero — the opening block of a page, built to docs/specs/PageHero.md.
 *
 * An optional ancestor trail, one h1, an optional eyebrow above it, one to six paragraphs of lead
 * copy, an optional byline
 * of credits and dates, an optional caller block, nought to two actions and an optional image or
 * YouTube embed, below the copy or beside it. It is the first thing inside <main> on all 129 routes
 * and there is never a second one: two heroes are two h1s, and the `string` typing of `title` is
 * what makes that hard to do by accident.
 *
 * ONE variant, ONE size and TWO arrangements. The three page families the first brief described
 * (text-left, article, case study) are still one arrangement of the copy: they differ only in which
 * optional slot is filled. What does differ is where an IMAGE goes — below the copy, or beside it
 * from 1024 — and that is `arrangement`, a presentation prop the page template sets per family
 * (ruling H1). With no media the two render the same single column.
 *
 * It contributes no colour and no distance: the six inks come from --hero-* in
 * tokens/components/page-hero.css, which re-declares the whole set once per surface, and every
 * seam is a Section, Layout or Cluster gap. So the same markup is correct on paper, on tint, on
 * an ink band and on the blue pivot — including a tint hero standing between two ink bands.
 *
 * The non-uniform rhythm comes entirely from NESTING rather than from a knob, which is why
 * `top`, `stack`, `opening` and `copy` all exist as levels even though none of them renders
 * anything visible: 16 between paragraphs, 24 inside the opening, 32 from the trail to the split,
 * 48 between blocks, and 96 between the copy and the media when they stand side by side. Tighten
 * by grouping, loosen by separating.
 *
 * It renders its OWN band — a Section at default density, so 96 of air above the trail (or the
 * title, with no trail). The trail lives inside that band (kit `fdn-top`, 5 Oct 2026): it was a
 * band of its own with 64 above it, and the two paddings stacked to put a service page's h1 at
 * 296. Being a band, the hero can only be a direct child of the page or its template.
 * It must not go inside a Section (the column would inset twice), a Layout track (a band is not
 * a row) or a Cluster (which would shrink it to its longest word).
 *
 * NO STATES, and that is an assertion rather than an omission: nothing this component styles
 * responds to a pointer, no element it renders is focusable, nothing opens, and focus never moves
 * as a consequence of this component. Given the same props it renders the same pixels at every
 * moment of its life. The two stateful things that can appear in the band are a Button, which owns
 * every value it paints, and — when `media` is a video — an <iframe> whose document belongs to
 * youtube-nocookie on another origin: it has states, it has focus rings, and not one of them is
 * reachable from this component's stylesheet at any cost. An iframe element is not itself in the
 * tab order; Tab moves INTO that document.
 *
 * A server component. No state, no effect, no ref, no DOM handler.
 */
export function PageHero({
  title,
  body,
  eyebrow,
  trail,
  credits = [],
  dates,
  actions = [],
  media,
  arrangement = 'stacked',
  surface = 'paper',
  children,
}: PageHeroProps) {
  /* Blank entries are dropped BEFORE the roles are assigned, not after: an empty first string
     would otherwise make the lead an empty <p> and promote paragraph two to body scale, so the
     one route with a stray blank line in its frontmatter would render its opening one step
     quieter than every other route. */
  const paragraphs = body.filter((paragraph) => paragraph.trim().length > 0);
  const [lead, ...rest] = paragraphs;

  const pairs: BylinePair[] = credits.map((credit, index) => ({
    /* The role is not unique — a podcast can carry two guest groups — so the index is part of
       the key. These rows never reorder: they are frontmatter in array order. */
    id: `${credit.role}-${index}`,
    label: CREDIT_LABELS[credit.role],
    value: joinPeople(credit.people),
  }));

  if (dates) {
    pairs.push({
      id: 'published',
      label: PUBLISHED_LABEL,
      value: <time dateTime={dates.published}>{formatDate(dates.published)}</time>,
    });
    /* A modified date equal to the published one is not a second fact. Rendering both would put
       "Published 3 March 2026" and "Updated 3 March 2026" side by side, which reads as a mistake
       because it is one — the CMS stamping a modified date on save. */
    if (dates.modified && dates.modified !== dates.published) {
      pairs.push({
        id: 'modified',
        label: MODIFIED_LABEL,
        value: <time dateTime={dates.modified}>{formatDate(dates.modified)}</time>,
      });
    }
  }

  /* Widened from the tuple union to iterate. The union is what makes a third action a compile
     error at the call site; `.map` over a union of three tuple types is not callable, and this
     is the one line that reconciles the two. It weakens nothing: the narrowing has already done
     its work by the time a value reaches here. */
  const controls: readonly HeroAction[] = actions;

  /* The split is real only when there is something to split: `beside` with no media is the
     single column, and so is `stacked` with or without it. */
  const split = arrangement === 'beside' && media !== undefined;

  /* Against media, the copy's alignment follows what the media IS (visual-direction § 3.2). An
     illustration has no box, so the copy is centred on it and the two read as one pair; a
     photograph, a capture or a video has an edge, so the h1 and that top edge share a line. */
  const centred = split && media.type === 'image' && media.image.kind === 'illustration';

  /* The trail stands 32px above the copy, so anything in the copy that says a crumb's words again
     reads twice. Two warnings, and each asks the question the routes' own fix asks, from
     @/lib/trail, so the warning cannot disagree with the fix (zero-width characters, punctuation,
     case and a trailing "s" all ignored): `repeatsTrail` for the eyebrow, which `eyebrowBesideTrail`
     uses and which catches a crumb said INSIDE the eyebrow, and `sameLabel` for the title, which
     `heroTrail` uses.
     Warnings rather than refusals: the band renders, so the fault is visible on the page as well
     as in the console.

       eyebrow  owner, 5 Oct 2026: the hero eyebrow never repeats the crumb — any crumb, since a
                format eyebrow ("Audits") repeats a parent as surely as a name repeats the leaf.
                A crumb that names something is repeated by being said; the site's structure
                ("Home", a section index, `trail.structural`) only by being equalled.
       title    the last crumb names the page only when the h1 does not. `heroTrail` drops a leaf
                that repeats the title, so this fires only on a trail built by hand. */
  if (process.env.NODE_ENV !== 'production' && trail !== undefined) {
    if (eyebrow !== undefined && repeatsTrail(eyebrow, trail.labels, trail.structural)) {
      console.warn(
        `PageHero: eyebrow "${eyebrow}" repeats a crumb in the trail. Drop it, or replace it ` +
          `with a category or format the trail cannot say (for example "Fintech · Platform rebuild").`,
      );
    }
    const last = trail.labels.at(-1);
    if (last !== undefined && sameLabel(last, title)) {
      console.warn(
        `PageHero: the trail's last crumb "${last}" repeats the title. Build the trail with ` +
          `heroTrail (@/lib/trail), which ends it at the parent when the h1 names the page.`,
      );
    }
  }

  /* ── split · the arrangement ──────────────────────────────────────────────
      The one Layout that `arrangement` touches. Two children at most — the copy stack and
      the media — so DOM order is reading order at every width: copy, then media.

      stacked  single track at every width, 48 between the copy and the media. This is the
               "below" of ruling H1: media as a full-column block under the copy.
      beside   from 1024 (`lg`), two EQUAL tracks — text 1 : media 1, ruling H2 — with 96
               between them, --gap-section: copy beside an image is a split, two regions of
               different kind, and only peer halves take --gap-column (1 Oct 2026). Below
               1024 it is the stacked single track exactly, 48 and all.

      The alignment is never stretch: the copy and the media are unequal heights by design (H3 —
      the media keeps its own ratio), and the default stretch would pull the shorter cell to the
      row's height. Which of the other two follows the media's kind (visual-direction § 3.2):
        an illustration  centred on the copy. It has no box, so there is no edge to share, and a
                         drawing hung from the title's top line reads as dropped into a corner.
        anything else    top-aligned. A photograph, capture or video has an edge, and the h1 and
                         that top edge share a line; the difference in height is left as air.
      In `stacked` both are inert: a single-track row is always its content's height.

      `beside` with no media is not split: there is nothing to stand beside the copy, so the
      single track renders and the hero is the no-visual hero, which is the common one. */
  const content = (
    <Layout
      rowGap="stack"
      columns={split ? { lg: [1, 1] } : undefined}
      colGap={split ? 'section' : undefined}
      align={centred ? 'center' : 'start'}
    >
      {/* ── stack · 48 between blocks ──────────────────────────────────────────
          Single-track at every width. Every child below is conditional except the opening,
          and each renders NO ELEMENT when its slot is empty rather than an empty one — a Layout
          gap exists only between rendered children, so an absent slot costs no seam. No route
          ever shows 48px of air above nothing. */}
      <Layout rowGap="stack">
        {/* ── opening · 24 between label, title and copy ─────────────────────────
            One Layout with three children rather than two nested ones, because the
            eyebrow-to-title seam and the title-to-copy seam are the same step. */}
        <Layout rowGap="block">
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1 className={styles.title}>{title}</h1>
          {/* copy · 16 between paragraphs. Absent entirely when every entry was blank —
              never an empty <div> holding 16px of nothing. */}
          {lead === undefined ? null : (
            <Layout rowGap="text">
              <p className={styles.lead}>{lead}</p>
              {/* The index is the key. These rows are static frontmatter copy in array order —
                  they never reorder, they are never inserted into, and two paragraphs may be
                  identical strings, which makes the content itself a worse key than the position. */}
              {rest.map((paragraph, index) => (
                <p key={index} className={styles.body}>
                  {paragraph}
                </p>
              ))}
            </Layout>
          )}
        </Layout>

        {/* ── byline · 24 both axes ─────────────────────────────────────────────
            A <dl> rather than a Cluster of spans, because each <dt> is then announced
            immediately before its own <dd> — "Written by, Alice Chen and Ben Ndlovu" — instead
            of a row of unlabelled strings. <div> inside <dl> is valid and is what lets each
            pair be a Layout, which is the same shape SiteFooter's contact block takes.

            The ratio is what removes the need for decoration: 4px between a key and its value
            against 24px between one pair and the next is a six-fold difference, so each pair
            reads as one unit and the row reads as a row — no rule, no dot, no separator. */}
        {pairs.length > 0 ? (
          <Cluster as="dl" colGap="block" rowGap="block" align="start">
            {pairs.map((pair) => (
              <Layout key={pair.id} rowGap="inline">
                <dt className={styles.key}>{pair.label}</dt>
                <dd className={styles.value}>{pair.value}</dd>
              </Layout>
            ))}
          </Cluster>
        ) : null}

        {/* ── extras ───────────────────────────────────────────────────────────
            The one part that carries nothing at all — no class, because it has no rule to
            carry. The <div> exists only to group whatever is passed into ONE row of the stack;
            without it a fragment of three elements would become three rows at 48px each. */}
        {children == null ? null : <div>{children}</div>}

        {/* ── actions · one solid, one neutral link ─────────────────────────────────
            Anchors, because a hero action always navigates — which is why Space does nothing on
            them and why that is correct rather than a gap.

            The first is solid/primary, the hero's one Accent. The second is link-style and
            neutral: ink, not blue, so it spends nothing (visual-direction § 4.2) and reads as an
            alternative rather than as a second button competing with the first (5 Oct 2026; it
            was ghost/neutral). 24 between them, `block`, because a bare label 8 from a filled box
            reads as part of it; centred on the cross axis, because the link has no box of its
            own and its label must sit on the button's label line. 24 between wrapped rows too, so a
            link that wraps under the button keeps its 44px target clear of the button's box.

            size="md" with extendHitArea on both, not size="lg". The solid's box is 40 and the
            touch floor is 44, so the extension covers the missing 4 without moving the row: lg
            would make the hero's button 48 while every other control on the site stayed at 40,
            and the hero would be claiming a loudness the design does not intend. The link has no
            box: it is its label line, about 16 tall, so for it the extension is the whole of the
            44 target, centred on the label and reaching 14 above and below it, which is why the
            rows are 24 apart. An action missing the extension is the one failure this component
            can ship that a screenshot will not show. */}
        {controls.length > 0 ? (
          <Cluster colGap="block" rowGap="block" align="center">
            {controls.map((action, index) => (
              <Button
                key={action.href}
                as="a"
                href={action.href}
                emphasis={index === 0 ? 'solid' : 'link'}
                tone={index === 0 ? 'primary' : 'neutral'}
                size="md"
                extendHitArea
              >
                {action.label}
              </Button>
            ))}
          </Cluster>
        ) : null}
      </Layout>

      {/* ── media · below the copy, or beside it ─────────────────────────────────
          One slot, two renderings, mutually exclusive by the union — so there is no wrapper
          element and no class of PageHero's on the image. Each IS the split's second child.

          The width is the track's in both arrangements: the full content column in `stacked`,
          half of it less 48 in `beside`. The height is the asset's own (H3) — Media renders
          intrinsic, uncropped, and a tall asset is tall.

          Nothing here is conditional on `surface`. The image's edge is Media's, by kind, read
          from the band's data-surface through --media-*; the video's hairline is
          --hero-media-rule-ink, re-declared once per surface in this component's token layer. */}
      {media === undefined ? null : media.type === 'image' ? (
        /* Through Media, which owns the edge (a capture takes the hairline; a cut-out, an
           illustration and a photograph take none — ch05 §2, §2a, §4a), the srcset and the
           loading. PageHero owns the two things Media cannot know:

           `sizes` — the arrangement's width, from src/lib/image-sizes.ts. The beside value is
           only right when the split is real, which is why it follows `split` and not
           `arrangement`: a `beside` hero with its media stacked is a full-column image.

           `priority` — always. A hero image is the LCP element on every route that has one, so
           it is eager and fetched ahead of the document's other images. It is the one priority
           image on a page because there is one hero on a page. */
        <Media image={media.image} sizes={split ? HERO_BESIDE : FULL_COLUMN} priority />
      ) : (
        /* youtube-nocookie.com rather than youtube.com: it withholds the tracking cookies until
           a visitor actually presses play, and nothing about the embed needs them before then.
           The whole URL is built here rather than taken from the caller, so all 129 routes embed
           the same way — see HeroVideo's doc. There are no query parameters, deliberately: every
           one YouTube offers changes the player's behaviour, and a default nobody chose is
           better than one this component chose for 129 pages without being asked.

           loading="lazy" here and NOT on the image, which looks inconsistent and is not. A video
           frame is never the paint a reader is waiting for — it is an object they have to decide
           to press — and the embed pulls the player's own scripts from another origin, which is
           real weight to keep off the critical path of every hero that has one.

           `title` is the frame's accessible name and is required by the type. `allow` is the
           player's own feature list, minus autoplay: a hero that started playing on load would
           be the loudest thing on the site and nobody asked for it. */
        <iframe
          className={styles.video}
          src={`https://www.youtube-nocookie.com/embed/${media.id}`}
          title={media.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allowFullScreen
        />
      )}
    </Layout>
  );

  return (
    /* ── The band ────────────────────────────────────────────────────────────────
       The hero owns its band, at Section's DEFAULT density — 96 of air, one band shape on 129
       pages, which is what makes a page opening recognisable. There is no `density` prop: a
       route that wanted 64 would be asking for a quieter hero, which is a content problem.

       No className on the Section and no override of it from anywhere: the content column, the
       gutter, the ground and the vertical air are all --sec-*, and the only thing the caller
       decides about this band is which of the four grounds it paints.

       Deliberately NOT a labelled landmark. SiteNav owns banner, main owns main, SiteFooter owns
       contentinfo and Breadcrumbs owns its navigation; a fifth landmark at the top of every page
       is one more region to navigate past rather than to. It stays a <section> rather than a
       <div> because the hero is a self-contained thematic opening, and because that leaves
       aria-labelledby on the always-rendered h1 as a one-line change if it is ever wanted. */
    <Section surface={surface}>
      {trail === undefined ? (
        content
      ) : (
        /* ── top · the trail, 32 above the split ────────────────────────────────────
           `gutter`: the trail is a 13px apparatus line and the split opens on a 67px title, so the
           step that separates peers in a row is enough — the scale difference does the rest. The
           wrapper is a <div> because the crumbs bring their own landmark. */
        <Layout rowGap="gutter">
          {trail.crumbs}
          {content}
        </Layout>
      )}
    </Section>
  );
}
