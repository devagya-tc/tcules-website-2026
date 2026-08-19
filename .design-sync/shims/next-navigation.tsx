/**
 * `next/navigation` — host-framework shim for the design-sync bundle. See next-link.tsx for why
 * the real module cannot be bundled.
 *
 * SiteNav reads exactly one thing from this module: `usePathname()`, which it feeds to
 * isActivePath() to decide which bar item is lit. That is a genuine design-system state, so the
 * shim does not hard-code it away — it reads `globalThis.__DS_PATHNAME__`, letting a preview
 * state which page it is depicting before it renders:
 *
 *   (globalThis as any).__DS_PATHNAME__ = '/services';
 *
 * Unset, it answers '/' — the home route, which isActivePath treats as an exact match, so the
 * default is a nav bar with Home lit and nothing else. No route change happens inside a static
 * card, so a plain read is sufficient; there is nothing to subscribe to.
 */
export function usePathname(): string {
  const p = (globalThis as { __DS_PATHNAME__?: string }).__DS_PATHNAME__;
  return typeof p === 'string' ? p : '/';
}
