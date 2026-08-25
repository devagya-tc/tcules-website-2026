import type { ReactNode } from 'react';

import { Button, Cluster, Layout, Section, type SectionSurface } from '@/components';

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
 * A still image under the hero — the four fields Figure's contract already established, plus the
 * `kind` tag that tells it apart from a video.
 *
 * All four arrive together or not at all, so there is no way to ship a `src` and discover the
 * missing dimension at runtime. `width` and `height` are the asset's INTRINSIC pixel dimensions
 * and NOT a size request: CSS scales the box to the band's content column, and these two are what
 * let the browser reserve the right block-size before the stylesheet arrives. A hero is the one
 * place on a page where that shift is most visible, because there is nothing above it to absorb it.
 *
 * Deliver the asset at 1240 or wider. The stylesheet does not cap the image at its intrinsic
 * width, so a narrower asset upscales and looks soft — the fix belongs to the asset, and a cap
 * here would turn a content fault into a layout one by leaving a short image in a column-width row.
 *
 * `alt` is required and describes what the image SHOWS. It must not restate the title or the lead:
 * a reader on a screen reader has already heard both by the time they reach it.
 */
export type HeroImage = {
  kind: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A YouTube video under the hero, as an id and a title rather than a URL or an embed snippet.
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
  kind: 'youtube';
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
 * hairline, the four surface inks and the embed's host and parameters at the CALL SITE, on 129
 * routes, in a tier whose whole job is composition. The two renderings are a closed set and the
 * component owns them.
 */
export type HeroMedia = HeroImage | HeroVideo;

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
   * The category this page belongs to — filled on 32 of 129 routes. Uppercased by the
   * stylesheet, not by the data, so the frontmatter keeps its authored casing.
   *
   * A slot, not a variant: absent renders no element and no seam, which is why there is no
   * `variant="caseStudy"` selecting it. It sits 24px above the title rather than 8, because 8
   * under a 12px label reads as a caption stuck to the title and 24 reads as a label above one.
   */
  eyebrow?: string;
  /**
   * The credit groups, in array order, before the dates. Empty renders no `<dl>` at all — not
   * an empty one, and no 48px seam above nothing.
   */
  credits?: readonly HeroCredit[];
  /** The date pairs, after the credits. Absent renders nothing. */
  dates?: HeroDates;
  /**
   * Nought, one or two. Position decides emphasis: the first renders solid/primary, the second
   * ghost/neutral.
   *
   * Those are the three counts the corpus has, as a type — a third entry has no member of the
   * union to match, so it is a compile error rather than a review comment. The second emphasis is
   * a consequence of a second entry, not a slot waiting to be filled, which is why there is no
   * `emphasis` on HeroAction.
   */
  actions?: readonly [] | readonly [HeroAction] | readonly [HeroAction, HeroAction];
  /**
   * The ground this band paints. It must match the `Breadcrumbs` above it, or the seam goes
   * two-tone. Defaults to `paper`.
   *
   * That instruction leads deliberately: a prop doc is truncated at 127 characters in the
   * `.prompt.md` the design agent reads, so the first sentence is the only part that reaches it,
   * and this is the one thing about this prop that no check and neither component can catch.
   *
   * A prop here rather than an inherited attribute, and it is the same answer SiteNav,
   * SiteFooter and Breadcrumbs already give: a control reads `data-surface` from an ancestor
   * because it sits inside somebody else's band, and a pattern that OWNS a band has no ancestor
   * to ask. PageHero IS the band.
   *
   * It must equal the `surface` of the Breadcrumbs immediately above, or the seam between the
   * two bands reads as a two-tone split. Hold one constant in the page template and pass it
   * twice — that mismatch is the one thing neither component can check for itself.
   */
  surface?: SectionSurface;
  /**
   * An image or a YouTube embed, LAST in the band — below the actions, not beside the copy.
   *
   * That placement leads for the same reason `surface`'s instruction does: it is the thing about
   * this prop a caller is most likely to assume wrongly, and the first sentence is the only part
   * that reaches the design agent's `.prompt.md`.
   *
   * It is the only box in the component and the only part that reaches both edges of the content
   * column, which is what it is for: a hero whose blocks are all left-set text at three sizes
   * reads as one idea however good the type is. Everything above it stays inside a measure; this
   * does not.
   *
   * Below the actions rather than under the copy, so the byline stays tight to the title it
   * credits and the actions stay in the reading flow rather than stranded under a picture.
   *
   * Absent renders no element and no seam. There is no placeholder box and no ratio reserved for
   * a hero that has no media — 97 of 129 routes will not fill this, and a hero that left room for
   * it would be a hero with a hole in it.
   */
  media?: HeroMedia;
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
 * One h1, an optional eyebrow above it, one to six paragraphs of lead copy, an optional byline
 * of credits and dates, an optional caller block, nought to two actions and an optional image or
 * YouTube embed last. It is the first thing inside <main> on all 129 routes and there is never a
 * second one: two heroes are two h1s, and the `string` typing of `title` is what makes that hard
 * to do by accident.
 *
 * ONE variant and ONE size, which is the most consequential decision in its spec. The three
 * arrangements the brief described are one arrangement: no page differs in how the hero is
 * arranged, only in which optional slot is filled, and the two slots that do the differentiating
 * — eyebrow and byline — are independent of each other. A `variant="caseStudy"` would have been
 * a name for a page family styled identically to the default.
 *
 * It contributes no colour and no distance: the six inks come from --hero-* in
 * tokens/components/page-hero.css, which re-declares the whole set once per surface, and every
 * seam is a Section, Layout or Cluster gap. So the same markup is correct on paper, on tint, on
 * an ink band and on the blue pivot — including a tint hero standing between two ink bands.
 *
 * The non-uniform rhythm comes entirely from NESTING rather than from a knob, which is why
 * `stack`, `opening` and `copy` all exist as levels even though none of them renders anything
 * visible: 24 inside the opening, 16 between paragraphs, 48 between blocks. Tighten by grouping,
 * loosen by separating.
 *
 * It renders its OWN band — a Section at default density, so 96 of air above the title — which
 * is what discharges the obligation Breadcrumbs' band leaves: the trail contributes nothing
 * downward beyond its focus ring's reach, because the air between the trail and the hero is the
 * hero band's to give. Being a band, it can only be a direct child of the page or its template.
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
  credits = [],
  dates,
  actions = [],
  media,
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
      {/* ── stack · 48 between blocks ────────────────────────────────────────────
          Single-track at every width, so DOM order is visual order everywhere and there is
          nothing to reflow. No colGap, because there is no column seam to size.

          Every child below is conditional except the opening, and each renders NO ELEMENT when
          its slot is empty rather than an empty one — a Layout gap exists only between rendered
          children, so an absent slot costs no seam. No route ever shows 48px of air above
          nothing. */}
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

        {/* ── actions · 8 both axes ─────────────────────────────────────────────
            Anchors, because a hero action always navigates — which is why Space does nothing on
            them and why that is correct rather than a gap.

            size="md" with extendHitArea, not size="lg". The box is 40 and the touch floor is
            44, so the extension reaches the floor without moving the row: the alternative would
            make the hero's controls 48 while every other control on the site stayed at 40, and
            the hero would be claiming a loudness the design does not intend. An action missing
            the extension is the one failure this component can ship that a screenshot will not
            show. */}
        {controls.length > 0 ? (
          <Cluster colGap="tight" rowGap="tight">
            {controls.map((action, index) => (
              <Button
                key={action.href}
                as="a"
                href={action.href}
                emphasis={index === 0 ? 'solid' : 'ghost'}
                tone={index === 0 ? 'primary' : 'neutral'}
                size="md"
                extendHitArea
              >
                {action.label}
              </Button>
            ))}
          </Cluster>
        ) : null}

        {/* ── media · the last row of the stack ──────────────────────────────────
            One slot, two renderings, mutually exclusive by the union — so there is no wrapper
            element and no third class. Each of these IS a row of the stack, 48 below the actions.

            The width is the band's content column in both cases, which is the whole point of the
            slot: it is the only part of the hero that is not capped at a measure, and that is
            what gives the band a second shape.

            Nothing here is conditional on `surface`. The rule around both boxes is
            --hero-media-rule-ink, re-declared once per surface in the token layer, so an image on
            an ink band gets the near-invisible edge that ground wants without this file knowing
            which ground it is on. */}
        {media === undefined ? null : media.kind === 'image' ? (
          /* A native image, owned here rather than accepted as a node: the repository has no
             Image primitive and no next/image precedent, and Figure already established the
             src/alt/width/height contract for a repo-owned <img>.

             NOT loading="lazy", and this is the one place in the codebase that says so. Figure's
             thumbnail is lazy and its comment names the single case that would mis-serve — "an
             above-the-fold hero image", which "cannot exist yet: PageHero has no image slot".
             This is that slot. A hero image is the LCP element on the routes that have one, so
             deferring it defers the largest paint on the page; fetchPriority="high" goes further
             and asks for it ahead of the other images in the document, which on a page opening is
             true by construction. */
          /* eslint-disable-next-line @next/next/no-img-element -- accepted native-image contract */
          <img
            className={styles.image}
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          /* youtube-nocookie.com rather than youtube.com: it withholds the tracking cookies until
             a visitor actually presses play, and nothing about the embed needs them before then.
             The whole URL is built here rather than taken from the caller, so all 129 routes embed
             the same way — see HeroVideo's doc. There are no query parameters, deliberately: every
             one YouTube offers changes the player's behaviour, and a default nobody chose is
             better than one this component chose for 129 pages without being asked.

             loading="lazy" here and NOT on the image above, which looks inconsistent and is not.
             A video frame is never the paint a reader is waiting for — it is an object they have
             to decide to press — and the embed pulls the player's own scripts from another origin,
             which is real weight to keep off the critical path of every hero that has one.

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
    </Section>
  );
}
