import { Breadcrumbs, Section } from 'tcules-website-2026';
import type { BreadcrumbItem } from 'tcules-website-2026';

/** Four authored levels, which is the collapse threshold — so this renders first, …, parent, current. */
const TRAIL: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Product Design', href: '/services/product-design' },
  {
    label: 'Interaction and UI Design',
    href: '/services/product-design/interaction-ui-design',
  },
];

/** Eight levels, to show that depth is free after four: still four items, five omitted. */
const DEEP: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Insights', href: '/insights' },
  { label: 'Guides', href: '/insights/guides' },
  { label: 'Design systems', href: '/insights/guides/design-systems' },
  { label: 'Tokens', href: '/insights/guides/design-systems/tokens' },
  { label: 'Naming', href: '/insights/guides/design-systems/tokens/naming' },
  { label: 'Prefixes', href: '/insights/guides/design-systems/tokens/naming/prefixes' },
  { label: 'Token naming', href: '/glossary/token-naming' },
];

/**
 * The ancestor trail at the top of a page hero. It states POSITION — it is not a way of getting
 * elsewhere, which is what SiteNav is for.
 *
 * It renders only the <nav> and its trail: no band, no air, no surface prop. On a page it goes in
 * PageHero's `trail` slot — `trail={{ crumbs: <Breadcrumbs items={ITEMS} />, labels: ITEMS.map(
 * (i) => i.label) }}`, which the site builds with `heroTrail` — and reads its colours from the hero
 * band's ground, as a Button does. These previews put it in a Section so it has a ground to read.
 */
export function Default() {
  return (
    <Section>
      <Breadcrumbs items={TRAIL} />
    </Section>
  );
}

/** Two levels — the shallowest legal trail. Fewer than two renders nothing at all. */
export function Shallow() {
  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
        ]}
      />
    </Section>
  );
}

/** A page whose h1 IS its name (an article, an audit, a glossary term): the trail ends at the
    PARENT, as a link, and nothing in it is current — the h1 directly below is the current page. */
export function EndsAtParent() {
  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/insights' },
          { label: 'Guides', href: '/insights/guides' },
        ]}
        endsWith="parent"
      />
    </Section>
  );
}

/** Eight authored levels collapse to four rendered ones, with "5 levels omitted" announced. */
export function Deep() {
  return (
    <Section>
      <Breadcrumbs items={DEEP} />
    </Section>
  );
}

/** In a tint band: every muted value steps one darker, because the ground did. */
export function OnTint() {
  return (
    <Section surface="tint">
      <Breadcrumbs items={TRAIL} />
    </Section>
  );
}

/** On ink the direction inverts — ancestors lift, and the hover blue lifts three ramp steps. */
export function OnInk() {
  return (
    <Section surface="ink">
      <Breadcrumbs items={TRAIL} />
    </Section>
  );
}

/** On blue the ramp runs out: ancestors sit at brandeis-100 and the rule width carries pressed. */
export function OnBlue() {
  return (
    <Section surface="blue">
      <Breadcrumbs items={TRAIL} />
    </Section>
  );
}
