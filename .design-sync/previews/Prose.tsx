import { Prose, Section } from 'tcules-website-2026';

/** The flow as it arrives from a CMS: one already-sanitised HTML string. */
const BODY = `
<h2>What a design system owes its engineers</h2>
<p>
  A system earns its keep at the moment someone stops checking whether it is right. Until then it
  is documentation, and documentation is the thing everyone agrees to read <em>later</em>.
</p>
<h3>Three rules that carry the weight</h3>
<ul>
  <li>Every distance comes from one scale, named for what it separates.</li>
  <li>Children never set their own outer spacing; the container owns the gap.</li>
  <li>A value with no token is a missing token, not a licence to write a number.</li>
</ul>
<blockquote>
  <p>If you squint and every block is the same rectangle, it is not finished.</p>
</blockquote>
<p>
  The repetition is deliberate — see <a href="/matter-design-system">the system</a>, or the
  <code>tokens/index.css</code> header for the short argument.
</p>
`;

/** The default flow on paper — headings, paragraphs, both list kinds, a quote and inline marks. */
export function Article() {
  return (
    <Section density="tight">
      <Prose as="article" html={BODY} />
    </Section>
  );
}

/**
 * The same flow authored in JSX rather than handed over as a string. `children` takes precedence
 * over `html`, and the treatment is identical.
 */
export function FromChildren() {
  return (
    <Section density="tight">
      <Prose>
        <h2>Authored in JSX</h2>
        <p>
          The same stylesheet, the same rhythm. Prose is the one component here that styles markup
          it did not write, which is why it is also the one allowed to use margins.
        </p>
        <ul>
          <li>No size prop, no measure override, no variants.</li>
          <li>One rich-text treatment, correct on all four surfaces.</li>
        </ul>
      </Prose>
    </Section>
  );
}

/**
 * The flow on the ink surface. Prose is never told where it is — the ink, the rules and the link
 * colour all come from the enclosing band's data-surface.
 */
export function OnInk() {
  return (
    <Section surface="ink" density="tight">
      <Prose>
        <h3>Correct on every ground</h3>
        <p>
          Prose is never told where it is. The ink, the rule down the quote and the link colour all
          come from the enclosing band&rsquo;s <code>data-surface</code>.
        </p>
        <blockquote>
          <p>One rich-text treatment, on four surfaces.</p>
        </blockquote>
      </Prose>
    </Section>
  );
}
