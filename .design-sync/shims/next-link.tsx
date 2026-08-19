/**
 * `next/link` — host-framework shim for the design-sync bundle.
 *
 * SiteNav and SiteFooter navigate, so they import next/link. Claude Design has no Next runtime:
 * pulling the real module in drags Next's client router into the bundle, which reads
 * `process.env.__NEXT_*` at module scope and throws `ReferenceError: process is not defined`
 * before a single export reaches window.Tcules — every component fails, not just the two.
 *
 * What Link contributes to a rendered page is an <a> with an href. That is what this renders.
 * The Next-only props are destructured off so they cannot leak to the DOM as invalid attributes;
 * everything else is forwarded, so className, aria-label, onClick and the rest behave exactly as
 * they do in the app.
 *
 * Wired in via `paths` in .design-sync/tsconfig.bundle.json — no component source is touched.
 */
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
  locale?: string | false;
};

export default function Link({
  href,
  children,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  passHref: _passHref,
  legacyBehavior: _legacyBehavior,
  locale: _locale,
  ...rest
}: LinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
