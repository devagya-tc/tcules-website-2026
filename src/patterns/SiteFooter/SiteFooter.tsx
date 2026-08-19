import Link from 'next/link';

import { Button, Cluster, Layout, Logo, Section } from '@/components';

import styles from './SiteFooter.module.css';
import type { SiteFooterProps } from './types';

/**
 * SiteFooter — the closing band: brand, newsletter, directory, contact, utility.
 *
 * A SERVER component, and worth keeping that way. Nothing here is stateful, nothing reads the URL,
 * and the newsletter posts as a plain form rather than through JavaScript — so the footer ships no
 * client bundle at all. That is why `'use client'` is confined to SiteNav, which genuinely needs
 * it: a footer on every page of the site is the wrong place to hand the browser a hydration cost
 * for nothing.
 *
 * ── Five bands, five shapes ─────────────────────────────────────────────────────────────────────
 * The one decision worth defending. A footer is the easiest place in a site to end up with four
 * identical rectangles of small links, and the rule here is that if you squint it has to read as
 * more than one idea. So:
 *
 *   1  BRAND      the mark at 40, a tagline at lead, one solid action, three mono links.
 *                 Left-weighted and tall. Weight comes from scale and position, not a tint.
 *   2  NEWSLETTER two columns — the pitch, and the field. The only form on the page.
 *   3  DIRECTORY  five narrow columns of body-sm links. Deliberately the quietest block.
 *   4  CONTACT    four mono key/value cells and an address. Dense, small, a different face.
 *   5  UTILITY    one line: the legal notice against the utility links.
 *
 * Bands 2 to 5 are separated by a hairline with air on both sides, and by nothing else — no
 * alternating grounds, because varying the ground behind a block is how a page ends up with five
 * bands and one idea.
 */
export function SiteFooter({
  brand,
  groups,
  cta,
  newsletter,
  meta,
  address,
  utility,
  legal,
  surface = 'ink',
}: SiteFooterProps) {
  return (
    <Section as="footer" surface={surface}>
      <Layout rowGap="stack">
        {/* ── 1 · Brand ───────────────────────────────────────────────────────────────
            No hairline and no inset: it is the first band, and a rule above the mark would be a
            rule against the section's own top padding. */}
        <Layout rowGap="block">
          <Layout rowGap="text">
            {/* The mark carries its own name here. Unlike the header's, it is not inside a link,
                so nothing else announces it. */}
            <Logo size="lg" />
            <p className={styles.tagline}>{brand.tagline}</p>
          </Layout>

          <Cluster rowGap="block" colGap="block">
            <Button as={Link} href={cta.href} size="lg">
              {cta.label}
            </Button>
            {/* Mono, uppercase — a different face from the sans directory below, so three links
                beside a solid button do not read as the start of another link list. */}
            <Cluster as="ul" rowGap="tight" colGap="text">
              {brand.social.map((social) => (
                <li key={social.label}>
                  {/* A plain anchor, not a Link: next/link prefetches and client-navigates, and
                      neither means anything for another origin. `noreferrer` implies `noopener`,
                      and both are stated because the pair is what reviews look for. */}
                  <a
                    className={styles.socialLink}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </Cluster>
          </Cluster>
        </Layout>

        {/* ── 2 · Newsletter ──────────────────────────────────────────────────────── */}
        <Layout className={styles.band} columns={[1, 1]} colGap="column" rowGap="stack">
          <Layout rowGap="block">
            <Layout rowGap="tight">
              <p className={styles.label}>Newsletter</p>
              <p className={styles.title}>{newsletter.title}</p>
            </Layout>
            <p className={styles.body}>{newsletter.description}</p>
          </Layout>

          {/* A plain POST, no JavaScript. NOTHING SERVES THIS ENDPOINT YET — see ENDPOINTS in
              @/lib/routes. `align="end"` so a field and button that have wrapped onto two lines
              still sit on one baseline. */}
          <form action={newsletter.action} method="post">
            <Cluster rowGap="tight" colGap="tight" align="end">
              {/* The input is WRAPPED by its label rather than wired to it with an id. A real
                  label is required — a placeholder is not one, it disappears the moment anyone
                  types — and wrapping means the pattern needs no generated id, which is what keeps
                  it a server component and lets four of them coexist on the proving ground without
                  three broken `for` references. */}
              <label className={styles.fieldLabel}>
                <span className={styles.fieldLabelText}>{newsletter.fieldLabel}</span>
                <input
                  className={styles.field}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={newsletter.placeholder}
                  required
                />
              </label>
              <Button type="submit">{newsletter.cta.label}</Button>
            </Cluster>
          </form>
        </Layout>

        {/* ── 3 · Directory ───────────────────────────────────────────────────────────
            Five columns at lg, three at md, one below. The link rest state is ink rather than
            blue: forty blue links is not forty signals, it is a blue block. */}
        <Layout
          className={styles.band}
          columns={{ base: 1, md: 3, lg: 5 }}
          colGap="gutter"
          rowGap="stack"
        >
          {groups.map((group) => (
            <Layout key={group.title} rowGap="block">
              <p className={styles.label}>{group.title}</p>
              <Layout as="ul" rowGap="tight">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </Layout>
            </Layout>
          ))}
        </Layout>

        {/* ── 4 · Contact ─────────────────────────────────────────────────────────────
            A description list of key/value cells rather than a paragraph, because these are four
            different KINDS of fact and running them together as prose makes the reader work out
            which is which. `<div>` inside `<dl>` is valid and is what lets each pair be a
            Layout. */}
        <Layout className={styles.band} rowGap="stack">
          <Layout as="dl" columns={{ base: 2, md: 4 }} colGap="gutter" rowGap="gutter">
            {meta.map((item) => (
              <Layout key={item.key} rowGap="inline">
                <dt className={styles.metaKey}>{item.key}</dt>
                <dd className={styles.metaValue}>
                  {item.href ? (
                    <a className={styles.metaLink} href={item.href}>
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </Layout>
            ))}
          </Layout>
          <p className={styles.address}>{address}</p>
        </Layout>

        {/* ── 5 · Utility ─────────────────────────────────────────────────────────── */}
        <Cluster className={styles.band} justify="between" rowGap="text" colGap="text">
          <p className={styles.legal}>{legal}</p>
          <Cluster as="ul" rowGap="tight" colGap="text">
            {utility.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.utilityLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </Cluster>
        </Cluster>
      </Layout>
    </Section>
  );
}
