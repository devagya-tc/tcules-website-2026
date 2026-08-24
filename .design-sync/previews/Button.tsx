import { Button, Cluster, Icon, Layout } from 'tcules-website-2026';

/**
 * Three emphases × two tones — the primary variant axis, and the one that most changes
 * appearance. Copy follows the component's own rule: primary is the offer, neutral is the
 * utility that gets the work done.
 */
export function Emphasis() {
  return (
    <Layout rowGap="block">
      <Cluster colGap="tight" rowGap="tight">
        <Button emphasis="solid" tone="primary">
          Start a project
        </Button>
        <Button emphasis="ghost" tone="primary">
          See our work
        </Button>
        <Button emphasis="link" tone="primary">
          Read the case study
        </Button>
      </Cluster>
      <Cluster colGap="tight" rowGap="tight">
        <Button emphasis="solid" tone="neutral">
          Send message
        </Button>
        <Button emphasis="ghost" tone="neutral">
          Copy link
        </Button>
        <Button emphasis="link" tone="neutral">
          Download the PDF
        </Button>
      </Cluster>
    </Layout>
  );
}

/** Three heights: 32 for dense grids, 40 as the default, 48 for heroes and touch. */
export function Sizes() {
  return (
    <Cluster colGap="tight" rowGap="tight" align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Cluster>
  );
}

/**
 * The three variants: label alone, label with one glyph on one side, and the icon-only control —
 * which the type system forces to carry its own accessible name.
 */
export function WithIcons() {
  return (
    <Cluster colGap="tight" rowGap="tight">
      <Button iconLeft={<Icon name="download" />}>Download report</Button>
      <Button emphasis="ghost" tone="neutral" icon={<Icon name="check" />}>
        Mark reviewed
      </Button>
      <Button iconOnly icon={<Icon name="copy" />} aria-label="Copy link" />
      <Button
        iconOnly
        emphasis="ghost"
        tone="neutral"
        icon={<Icon name="close" />}
        aria-label="Dismiss"
      />
    </Cluster>
  );
}

/**
 * The THREE states a caller holds. Hover, press and focus are the stylesheet's business, take no
 * props, and cannot be shown statically — these are the three that application state owns.
 *
 *   `active`    the held second step: a selected filter, the current nav item, an open panel. It
 *               reads the same value a press reads, so pressing a stateful control previews the
 *               state it is about to take. A call to action never enters it.
 *   `busy`      an action in progress. Keeps the control FOCUSABLE and keeps its label, emits
 *               `aria-busy`, and suppresses pointer states.
 *   `disabled`  unavailable. Leaves the tab order, answers nothing, and uses its own tokens
 *               rather than opacity — unavailable should look unavailable.
 *
 * **`busy` and `disabled` are mutually exclusive in the type, and that is the important part.** A
 * button mid-request is not unavailable: disabling it drops focus on submit, which loses the
 * keyboard user's place and silently discards a screen reader's context. So a submit button that
 * is working is `busy`, never `disabled` with the label changed to "Submitting…" — which is what
 * this preview showed before `busy` existed.
 */
export function States() {
  return (
    <Layout rowGap="block">
      <Cluster colGap="tight" rowGap="tight">
        <Button emphasis="ghost" tone="neutral">
          All work
        </Button>
        <Button emphasis="ghost" tone="neutral" active>
          Design systems
        </Button>
        <Button emphasis="ghost" tone="neutral">
          AI product UX
        </Button>
      </Cluster>
      <Cluster colGap="tight" rowGap="tight">
        <Button busy>Send enquiry</Button>
        <Button emphasis="ghost" tone="neutral" busy>
          Exporting
        </Button>
        <Button emphasis="link" tone="primary" busy>
          Generating report
        </Button>
      </Cluster>
      <Cluster colGap="tight" rowGap="tight">
        <Button disabled>Send enquiry</Button>
        <Button emphasis="ghost" tone="neutral" disabled>
          Export unavailable
        </Button>
      </Cluster>
    </Layout>
  );
}

/** A button that navigates is an anchor — `as="a"` with an href, not a button with a click. */
export function AsAnchor() {
  return (
    <Cluster colGap="tight" rowGap="tight">
      <Button as="a" href="/contact" size="lg">
        Start a project
      </Button>
      <Button as="a" href="/case-studies" emphasis="link">
        Read the case study
      </Button>
    </Cluster>
  );
}
