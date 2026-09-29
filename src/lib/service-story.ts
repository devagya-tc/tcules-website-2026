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

/** Where an image should go that does not exist yet. Rendered only in review mode (`?slots=1`). */
export type StorySlot = {
  kind: 'illustration' | 'cut-out' | 'photograph' | 'portrait';
  brief: string;
  /** The ratio the placement fixes, if it fixes one. */
  ratio?: '1/1' | '3/2' | '4/3' | '16/9';
};

export type StoryBlock =
  /** Things a reader can see, and what each may mean. The symptom leads; the meaning qualifies it. */
  | {
      kind: 'signals';
      /** The mono key over each meaning, e.g. "May be". */
      key?: string;
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
      columns: 1 | 2 | 3;
      marker: 'icon' | 'number';
      items: readonly { title: string; body: string; icon?: StoryGlyph }[];
    }
  /** Which route to take, chosen by the condition you are in. Condition first, route second. */
  | {
      kind: 'router';
      items: readonly { when: string; route: StoryLink; settles?: string }[];
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
      columns: { name: string; when: string; settles: string };
      items: readonly { name: string; when: string; settles: string }[];
    }
  /** One decision carried through every representation, drawn as the same chip in every row. */
  | {
      kind: 'representations';
      specimen: string;
      columns: { name: string; holds: string; fails: string };
      items: readonly { name: string; holds: string; fails: string }[];
    }
  /** A record with named fields — a spec sheet, not a table of options. */
  | {
      kind: 'record';
      title: string;
      meta: string;
      items: readonly { field: string; question: string; icon: StoryGlyph }[];
    }
  /** One statement in two halves — what one party does, what the other keeps — as one list split
      into two columns under one rule, the same row style on both sides. */
  | {
      kind: 'contrast';
      /** Two to four columns of one list. */
      sides: readonly [ContrastSide, ContrastSide, ...ContrastSide[]];
    }
  /** Several parts inside one frame that keeps them current — the five-part system. */
  | {
      kind: 'parts';
      items: readonly { name: string; body: string; icon: StoryGlyph }[];
      frame: { name: string; body: string; icon: StoryGlyph };
    }
  /** A slice cut through layers, with the levels it is accepted at. */
  | {
      kind: 'slice';
      layers: readonly string[];
      label: string;
      levels: readonly { title: string; body: string; icon: StoryGlyph }[];
    }
  /** The temporary states that live between the current product and the target one. */
  | { kind: 'bridge'; from: string; to: string; label: string; items: readonly string[] }
  /** Linked stages the same decision passes through, with an optional return path. */
  | { kind: 'thread'; items: readonly { title: string; body?: string }[]; loop?: string }
  /** One figure, stated in words beside it. */
  | { kind: 'stat'; value: string; label: string; body: string }
  | { kind: 'faq'; items: readonly { question: string; answerHtml: string }[] }
  /** A quiet boundary on the claim before it (Callout). */
  | { kind: 'note'; label?: string; html: string }
  /** A one-line ask inside a section, where the argument has just earned it. Not a band. */
  | { kind: 'nudge'; body: string; action: StoryLink }
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

export type ContrastSide = {
  label: string;
  items: readonly string[];
};

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
