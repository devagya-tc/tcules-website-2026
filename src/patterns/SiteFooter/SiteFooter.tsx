import Link from 'next/link';

import { Button, Cluster, Icon, Input, Layout, Logo, Section } from '@/components';

import { BrandMark } from './BrandMark';
import styles from './SiteFooter.module.css';
import type { SiteFooterProps, SiteFooterSocial } from './types';

/**
 * SiteFooter — the closing band: brand, directory, newsletter, contact, utility.
 *
 * A SERVER component, and worth keeping that way. Nothing here is stateful, nothing reads the URL,
 * and the newsletter posts as a plain form rather than through JavaScript — so the footer ships no
 * client bundle at all. That is why `'use client'` is confined to SiteNav, which genuinely needs
 * it: a footer on every page of the site is the wrong place to hand the browser a hydration cost
 * for nothing. The mobile accordions below are native `<details>`, chosen so that constraint
 * survives them.
 *
 * ── Five bands, five shapes ─────────────────────────────────────────────────────────────────────
 * The one decision worth defending. A footer is the easiest place in a site to end up with four
 * identical rectangles of small links, and the rule here is that if you squint it has to read as
 * more than one idea. So:
 *
 *   1  BRAND      the mark at 40 and a tagline at lead on one side, the action and the rating
 *                 badge on the other. Left-weighted and tall; the weight is scale and position.
 *   2  DIRECTORY  six narrow columns of body-sm links. Deliberately the quietest block.
 *   3  NEWSLETTER two columns — the pitch, and the field. The only form on the page.
 *   4  CONTACT    four mono key/value cells and an address. Dense, small, a different face.
 *   5  UTILITY    one line: the utility links against the legal notice.
 *
 * Bands 2 to 5 are separated by a hairline with air on both sides, and by nothing else — no
 * alternating grounds, because varying the ground behind a block is how a page ends up with five
 * bands and one idea. Under all of it sits the watermark: the mark again, oversized, at
 * --opacity-faint, which is ground rather than a sixth band.
 *
 * ── Why the directory is rendered twice ─────────────────────────────────────────────────────────
 * The design is a six-column grid at lg and six collapsed accordions below it. Those are two
 * different DOM shapes, not one shape restyled, and with no JavaScript nothing can turn one into
 * the other at runtime. Forcing a closed `<details>` visually open with `display` DOES NOT WORK in
 * Chrome — the UA hides closed content more strongly than a `display` override undoes, which was
 * verified rather than assumed. So both are rendered and CSS picks one.
 *
 * The cost is that the directory's links appear twice in the markup. That is accepted, and the
 * alternative was worse: the audit requires every link to be in the rendered mobile HTML, which
 * rules out shipping only the accordions' contents when open. `display: none` removes the inactive
 * copy from the accessibility tree and the tab order both, so only one is ever reachable.
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
  /* Rendered at the foot of the last directory column on desktop, and as its own row on mobile.
     One list, declared once, placed twice — see the note on the directory above. */
  const socialList = (
    <Cluster as="ul" className={styles.socialList} rowGap="tight" colGap="text">
      {brand.social.map((social: SiteFooterSocial) => (
        <li key={social.label}>
          {/* A plain anchor, not a Link: next/link prefetches and client-navigates, and neither
              means anything for another origin. `noreferrer` implies `noopener`, and both are
              stated because the pair is what reviews look for. */}
          <a
            className={styles.socialLink}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            <BrandMark name={social.mark} />
            {social.label}
            {/* The system draws no diagonal arrow, so the horizontal one is rotated. If ↗ starts
                recurring elsewhere, that is the point at which it earns a glyph of its own rather
                than a rotation in every consumer. */}
            <span className={styles.outboundCue}>
              <Icon name="arrow-right" size="sm" />
            </span>
          </a>
        </li>
      ))}
    </Cluster>
  );

  return (
    <Section as="footer" surface={surface}>
      <Layout rowGap="stack">
        {/* ── 1 · Brand ───────────────────────────────────────────────────────────────
            No hairline and no inset: it is the first band, and a rule above the mark would be a
            rule against the section's own top padding.

            Opposed rather than stacked: the mark and its sentence read left, the thing to DO reads
            right, and the gap between them is what stops the band being one more full-width
            rectangle. Two tracks at 2:1 rather than a Cluster, because Cluster's gap scale stops
            at 24 and the two halves need a column's worth of air to read as opposed rather than
            adjacent. One track below md, where the right group left-aligns under the tagline. */}
        <Layout
          columns={{ base: 1, md: [2, 1] }}
          colGap="column"
          rowGap="gutter"
        >
          <Layout className={styles.brandIdentity} rowGap="block">
            {/* The mark carries its own name here. Unlike the header's, it is not inside a link,
                so nothing else announces it. */}
            {/* Mono on every ground, the light ones included: the footer is UI chrome, where ch02
                v1.0 makes the whole wordmark neutral-950 — and white on ink and blue. The accent
                bar is for the mark at marketing scale, which this is not. */}
            <Logo size="lg" variant="mono" />
            <p className={styles.tagline}>{brand.tagline}</p>
          </Layout>

          <Layout className={styles.brandAction} rowGap="block">
            {/* md, not lg. The tagline beside it is the band's weight; an lg button opposite a
                lede line makes two things compete for the same job, and the badge under it reads
                as a caption to a smaller control rather than an equal to a larger one. */}
            <Button as={Link} href={cta.href}>
              {cta.label}
            </Button>
            {brand.rating ? (
              <a
                className={styles.ratingBadge}
                href={brand.rating.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {/* Decorative: "4.8 on Clutch" is already the whole claim, and a star announced as
                    "black star" adds nothing a screen reader needs. */}
                <span className={styles.ratingStar} aria-hidden="true">
                  ★
                </span>
                {brand.rating.score} on
                {/* Mark and word tighter than the badge's own padding, so the two read as one
                    lockup rather than as a third item in the row. */}
                <span className={styles.ratingLockup}>
                  <BrandMark name={brand.rating.mark} />
                  {brand.rating.platform}
                </span>
              </a>
            ) : null}
          </Layout>
        </Layout>

        {/* ── 2 · Directory ───────────────────────────────────────────────────────────
            Six columns at lg, accordions below it. The link rest state is ink rather than blue:
            forty blue links is not forty signals, it is a blue block. */}
        <div className={styles.band}>
          {/* Desktop. Six tracks exactly — the group count is the column count, so a seventh group
              would wrap rather than squeeze, which is the failure worth seeing.

              The breakpoint toggle lives on this wrapper rather than on the Layout, because both
              would be single-class selectors and which one won `display` would come down to the
              order the bundler happened to emit them in. */}
          <div className={styles.directoryDesktop}>
            <Layout columns={6} colGap="gutter" rowGap="stack">
              {groups.map((group, index) => (
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
                  {/* The socials hang off the last column under a hairline of their own. They are
                      not a group — no label, and a rule instead — so the column reads as a list
                      that has ended rather than as a seventh heading. */}
                  {index === groups.length - 1 ? (
                    <div className={styles.columnSocial}>{socialList}</div>
                  ) : null}
                </Layout>
              ))}
            </Layout>
          </div>

          {/* Mobile. Native <details>: collapsed by default, no script, and every link present in
              the markup whether or not a group is open. */}
          <div className={styles.directoryAccordions}>
            {groups.map((group) => (
              <details key={group.title} className={styles.accordion}>
                <summary className={styles.accordionSummary}>
                  <span className={styles.label}>{group.title}</span>
                  <span className={styles.accordionChevron}>
                    <Icon name="chevron-down" size="sm" />
                  </span>
                </summary>
                <Layout as="ul" className={styles.accordionPanel} rowGap="tight">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link href={link.href} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </Layout>
              </details>
            ))}
            {/* Outside the accordions and always visible: a profile link that can only be reached
                by opening a panel is a profile link nobody reaches. No rule of its own — it sits
                under the last accordion's, so it reads as the end of the directory. */}
            <div className={styles.mobileSocial}>{socialList}</div>
          </div>
        </div>

        {/* ── 3 · Newsletter ──────────────────────────────────────────────────────── */}
        <Layout className={styles.band} columns={[1, 1]} colGap="column" rowGap="stack">
          <Layout rowGap="block">
            {/* The label and title nest at tight INSIDE a block stack. Flattening all three to
                block makes them read as three unrelated lines rather than an eyebrow on a title
                with a sentence under it. */}
            <Layout rowGap="tight">
              <p className={styles.label}>Newsletter</p>
              <p className={styles.title}>{newsletter.title}</p>
            </Layout>
            <p className={styles.body}>{newsletter.description}</p>
          </Layout>

          {/* A plain POST, no JavaScript. NOTHING SERVES THIS ENDPOINT YET — see ENDPOINTS in
              @/lib/routes. `align="end"` so a field and button that have wrapped onto two lines
              still sit on one baseline. */}
          <form action={newsletter.action} method="post" className={styles.newsletterForm}>
            <Cluster rowGap="tight" colGap="tight" align="end">
              {/* The input is WRAPPED by its label rather than wired to it with an id. A real
                  label is required — a placeholder is not one, it disappears the moment anyone
                  types — and wrapping means the pattern needs no generated id, which is what keeps
                  it a server component and lets four of them coexist on the proving ground without
                  three broken `for` references. */}
              <label className={styles.fieldLabel}>
                <span className={styles.fieldLabelText}>{newsletter.fieldLabel}</span>
                <Input
                  emphasis="quiet"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={newsletter.placeholder}
                  required
                />
              </label>
              {/* Ghost rather than solid: the page already has one primary action, two bands up,
                  and a second solid button here would split the ask. extendHitArea because this
                  one has nothing to help it — the field beside it is wrapped in a label that
                  forwards taps, and this Button is not. 40px box, 44px target, row height
                  unchanged. */}
              <Button type="submit" emphasis="ghost" extendHitArea>
                {newsletter.cta.label}
              </Button>
            </Cluster>
          </form>
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

        {/* ── 5 · Utility ───────────────────────────────────────────────────────────
            Links lead, the notice closes. The links take the legal treatment rather than the
            directory's: they are the quietest thing in the footer, and giving them link ink would
            make four pieces of small print look like a sixth navigation group. */}
        <Cluster className={styles.band} justify="between" rowGap="text" colGap="text">
          <Cluster as="ul" rowGap="tight" colGap="text">
            {utility.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.utilityLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </Cluster>
          <p className={styles.legal}>{legal}</p>
        </Cluster>
      </Layout>

      {/* ── Watermark ───────────────────────────────────────────────────────────────
          The mark again, oversized, as ground rather than as a mark. Rendered at a real size
          rather than transformed: a transform contributes nothing to layout height, so a scaled
          mark paints outside the document and cannot be scrolled to. Decorative — the wordmark is
          already announced once at the top of the band, and twice is noise. */}
      <div className={styles.watermark} aria-hidden="true">
        <Logo size="lg" variant="mono" title="" />
      </div>
    </Section>
  );
}
