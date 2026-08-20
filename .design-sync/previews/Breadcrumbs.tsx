import { Breadcrumbs } from 'tcules-website-2026';
import type { BreadcrumbItem } from 'tcules-website-2026';

/** Four authored levels, which is the collapse threshold — so this renders first, …, parent, current. */
const TRAIL: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Product Design', href: '/services/product-design' },
  { label: 'Interaction and UI Design', href: '/services/product-design/interaction-ui-design' },
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
 * The ancestor trail above a page hero. It states POSITION — it is not a way of getting elsewhere,
 * which is what SiteNav is for.
 *
 * It brings its own band: a Section with 64 of air above and none below, so it can only be a direct
 * child of a page — never inside another Section, and never inside a Layout. The air below belongs
 * to the hero band that follows it, and `surface` must match that band.
 */
export function Default() {
  return <Breadcrumbs items={TRAIL} />;
}

/** Two levels — the shallowest legal trail. Fewer than two renders nothing at all. */
export function Shallow() {
  return (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Case Studies', href: '/case-studies' },
      ]}
    />
  );
}

/** Eight authored levels collapse to four rendered ones, with "5 levels omitted" announced. */
export function Deep() {
  return <Breadcrumbs items={DEEP} />;
}

/** On a tint panel: every muted value steps one darker, because the ground did. */
export function OnTint() {
  return <Breadcrumbs items={TRAIL} surface="tint" />;
}

/** On ink the direction inverts — ancestors lift, and the hover blue lifts three ramp steps. */
export function OnInk() {
  return <Breadcrumbs items={TRAIL} surface="ink" />;
}

/** On blue the ramp runs out: ancestors sit at brandeis-100 and the rule width carries pressed. */
export function OnBlue() {
  return <Breadcrumbs items={TRAIL} surface="blue" />;
}
