/**
 * THE SERVICE STORY — the shape a service page is DESIGNED in, rather than the shape the CMS sends.
 *
 * A proposal for tracker 3.1 (semantic section view models), written from the six service lines'
 * own content on 29 Sep 2026. The CMS sends a flat run of `rich-text`, `card-grid`, `table` and
 * `quote` blocks; a page built from that can only ever say "here is some text, here is a grid".
 * This names what each block IS for — a signal and what it may mean, a route and the condition that
 * picks it, an intervention on a scale of disruption — so the template can give each job its own
 * shape.
 *
 * Types only, and a leaf: `@/content` fixtures are typed against it and `@/templates/ServicePage`
 * renders it, and neither can import the other (CLAUDE.md § Scope), so the one definition lives
 * below both. Nothing here is Strapi's; the mapping to it is `docs/strapi-changes.md`'s problem.
 */

/** The glyphs a story may name. A subset of the Icon set, checked where the template renders it. */
export type StoryGlyph =
  | 'widget'
  | 'layers'
  | 'code'
  | 'ruler-pen'
  | 'monitor'
  | 'smartphone'
  | 'graph-up'
  | 'shield-check'
  | 'lock'
  | 'clock-circle'
  | 'database'
  | 'server'
  | 'users-group-rounded'
  | 'user'
  | 'checklist'
  | 'key'
  | 'refresh'
  | 'undo-left'
  | 'chat-round-dots'
  | 'question-circle'
  | 'notebook'
  | 'flag'
  | 'cpu'
  | 'eye'
  | 'document-text'
  | 'check-circle'
  | 'close-circle';

export type StoryLink = { label: string; href: string };

/** A case study as a page cites it. The page resolves `slug` to the cover and the path. */
export type StoryCase = {
  slug: string;
  client: string;
  /** What the case shows FOR THIS PAGE — not the case's own listing title. */
  title: string;
  body: string;
  /** Resolved by the page from the listing, never authored. */
  href?: string;
  cover?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    sources?: { src: string; width: number }[];
  };
};

/**
 * Where an image should go that does not exist yet. Rendered only in review mode (`?slots=1`).
 *
 * A slot is read by someone deciding whether the image is worth making, so it says what the image
 * is FOR before anything about how it looks (1 Oct 2026, owner: "i'd appreciate if the description
 * told me what the illustration/image would describe and not what the drawing looks like"). It was
 * one `brief` written as drawing instructions in the illustration system's own vocabulary — "UI
 * shorthand", "peridot", "dashed outline" — which skipped the step ch05 §4 puts first: the message.
 * How it is drawn belongs to the illustration concept, written after the message is agreed.
 *
 * Every field is plain language a reader of the page would understand: no brand-system terms, no
 * colours, no drawing devices.
 */
export type StorySlot = {
  kind: 'illustration' | 'cut-out' | 'photograph' | 'portrait';
  /** The one thing a reader should understand from the image. One or two sentences. */
  message: string;
  /** What is in the picture, named as things in the page's own story — not shapes or styles. */
  shows: string;
  /** Why it sits here rather than anywhere else on the page. */
  placement?: string;
  /** The ratio the placement fixes, if it fixes one. */
  ratio?: '1/1' | '3/2' | '4/3' | '16/9';
};

export type StoryBlock =
  /** Things a reader can see, and what each may mean. The symptom leads; the meaning qualifies it. */
  | {
      kind: 'signals';
      columns: 2 | 3 | 4 | 5;
      items: readonly { title: string; body: string; icon?: StoryGlyph }[];
    }
  /** A sequence where order matters. Horizontal from lg at five or fewer, a ladder beyond. */
  | {
      kind: 'steps';
      items: readonly { title: string; body: string }[];
      /** A worked example the steps are walked through, set above them. */
      example?: { label: string; body: string };
    }
  /** Rows of named things, each with a glyph or a number. The deliverables shape. */
  | {
      kind: 'ledger';
      /** A heading over the set, when the set is a sub-part of its section (h3). */
      heading?: string;
      columns: 1 | 2 | 3;
      marker: 'icon' | 'number' | 'none';
      items: readonly { title: string; body: string; icon?: StoryGlyph }[];
    }
  /** Which route to take, chosen by the condition you are in. Condition first, route second. */
  | {
      kind: 'router';
      items: readonly { when: string; route: StoryLink }[];
      /** A route that is not a service — an audit, a self-assessment — for the reader who cannot
          yet name their condition. Leads the set when it would otherwise leave a hole. */
      also?: { when: string; link: StoryLink };
    }
  /** Client work that evidences the page's claim, with the boundary of what it proves. */
  | { kind: 'cases'; items: readonly StoryCase[]; note?: string }
  /** What the work needs from you, against when it is the wrong service. */
  | {
      kind: 'fit';
      yes: { heading: string; items: readonly string[] };
      no: { heading: string; items: readonly string[] };
    }
  /** One attributed quotation, optionally beside the case it came from. */
  | {
      kind: 'proof';
      quote: {
        text: string;
        name: string;
        role?: string;
        company: string;
        portrait?: { src: string; width: number; height: number };
      };
      case?: StoryCase;
    }
  /** Options on one scale — least to most disruptive — each with its condition and its question. */
  | {
      kind: 'spectrum';
      axis: { from: string; to: string };
      /**
       * A column that SHOWS the axis, row by row, instead of stating it once in a caption. Only
       * meter is drawn for ONE meaning, never a generic bar (a generic bar reads as progress, which
       * got the first meter cut, 30 Sep): `disruption` — how much of the current product an option
       * shakes, a tremor trace; `authority` — how much of the decision the model holds rather than a
       * person, six slots filled from the model's side. Absent, the axis is a caption.
       */
      meter?: { kind: 'disruption' | 'authority'; label: string };
      columns: { name: string; when: string; settles: string };
      items: readonly { name: string; when: string; settles: string }[];
    }
  /** Comparison data — every row the same attributes, read across. A real table (DataTable). */
  | {
      kind: 'table';
      /** One line before the table, when it needs one. */
      summary?: string;
      keyColumn: string;
      columns: readonly string[];
      rows: readonly { header: string; cells: readonly string[] }[];
    }
  /** A record with named fields — a spec sheet, not a table of options. */
  | {
      kind: 'record';
      title: string;
      meta: string;
      items: readonly { field: string; question: string; icon: StoryGlyph }[];
    }
  /** Work moving through stages, each with its items; optionally what another party keeps
      throughout. A process, not steps (ProcessFlow). */
  | {
      kind: 'flow';
      actor?: string;
      stages: readonly { label: string; items: readonly string[] }[];
      throughout?: { label: string; items: readonly string[] };
    }
  /** A comparison laid out on the rows it compares: a check or a cross in every cell. Not two lists
      side by side — the reader should not have to line them up. */
  | {
      kind: 'matrix';
      keyColumn: string;
      columns: readonly string[];
      /** Screen-reader words for a check and a cross, e.g. "Answers it" / "Does not". */
      labels: { yes: string; no: string };
      rows: readonly { header: string; marks: readonly boolean[] }[];
    }
  /** Several parts inside one frame that keeps them current — the five-part system. */
  | {
      kind: 'parts';
      items: readonly { name: string; body: string; icon: StoryGlyph }[];
      frame: { name: string; body: string; icon: StoryGlyph };
    }
  /** The same work organised two ways — by layer, then by release — and the levels a release is
      accepted at. The pair is the argument: the first shows the problem the second solves. */
  | {
      kind: 'slice';
      layers: readonly string[];
      views: {
        layer: { title: string; note: string };
        slice: { title: string; note: string };
      };
      /** The words the grids need: a legend for a cell, the column name, the result row. */
      legend: { built: string; missing: string; path: string; works: string };
      levelsLabel: string;
      levels: readonly { title: string; body: string; icon: StoryGlyph }[];
    }
  /** The temporary states that live between the current product and the target one. */
  | {
      kind: 'bridge';
      from: string;
      to: string;
      label: string;
      items: readonly string[];
      /** The three phase heads over the timeline: before, during and after the move. */
      phases: { before: string; during: string; after: string };
    }
  /** Linked stages the same decision passes through, with an optional return path. */
  | { kind: 'thread'; items: readonly { title: string; body?: string }[]; loop?: string }
  /** One figure, stated in words beside it. */
  | {
      kind: 'stat';
      value: string;
      label: string;
      body: string;
      /** What the counted work consisted of. Unordered: these are rows, never numbered. */
      items?: readonly { title: string; body: string }[];
    }
  | { kind: 'faq'; items: readonly { question: string; answerHtml: string }[] }
  /** A quiet boundary on the claim before it (Callout). */
  | { kind: 'note'; label?: string; html: string }
  /** A one-line ask inside a section, where the argument has just earned it. Not a band. */
  | {
      kind: 'nudge';
      /** The condition, as the reader would say it — set at heading scale. */
      question: string;
      /** What to do about it, one line. */
      body: string;
      action: StoryLink;
      /** The softer way in, for a reader not ready for the main action. */
      secondary?: StoryLink;
    }
  /** Where to read further: articles, definitions, tools. Placed once, near the end of the page. */
  | {
      kind: 'resources';
      items: readonly {
        type: string;
        title: string;
        body: string;
        href: string;
        cta: string;
      }[];
    }
  /** An image that should exist here. Invisible unless the page is in review mode. */
  | { kind: 'slot'; slot: StorySlot };


export type StorySection = {
  type: 'section';
  id: string;
  heading: string;
  eyebrow?: string;
  lead?: string;
  arrangement?: 'stacked' | 'beside';
  surface?: 'paper' | 'tint';
  density?: 'tight' | 'open';
  blocks: readonly StoryBlock[];
};

export type ServiceStory = {
  slug: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body?: string;
    actions: readonly [StoryLink] | readonly [StoryLink, StoryLink];
    /** A service-line illustration: `public/illustrations/services/<name>.paper.svg`. */
    illustration: { src: string; width: number; height: number };
    tags?: readonly string[];
  };
  sections: readonly StorySection[];
  close: {
    heading: string;
    body: string;
    points: readonly { label: string; detail?: string }[];
    note: string;
  };
};
