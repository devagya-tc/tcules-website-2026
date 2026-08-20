'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { FocusEvent, PointerEvent } from 'react';

import { Button, Cluster, Icon, Layout, Logo, Section } from '@/components';
import { isActivePath } from '@/lib/activePath';
import { cx } from '@/lib/cx';
import { ROUTES } from '@/lib/routes';

import styles from './SiteNav.module.css';
import type {
  SiteNavBarBlock,
  SiteNavBlock,
  SiteNavItem,
  SiteNavProps,
  SiteNavRailBlock,
  SiteNavRowsBlock,
} from './types';

/**
 * SiteNav — the site header: a sticky bar, a mega-menu panel per item that has one, and a drawer
 * below 1024.
 *
 * ── Route-aware, and it has to be ───────────────────────────────────────────────────────────────
 * Patterns in this repo are data-blind and take what they render as props, which this one does —
 * the whole IA arrives as `items` and `cta`. It is not route-BLIND, and cannot be: an item's
 * current state is a fact about the URL, and `usePathname` is the only way to read it. That is the
 * one thing this pattern knows that a pattern normally would not, and it is why it imports
 * `@/lib/routes` for the single destination that is structural rather than editorial — the home
 * link on the wordmark. Every other href comes from props.
 *
 * ── The disclosure model ────────────────────────────────────────────────────────────────────────
 * An item with a panel is a `<button aria-expanded>`, not a link. A control that both navigates
 * and opens has to pick one on click and is wrong for half its users; the panel's own bar block
 * carries "All services", so the destination is not lost. Items with nothing to group stay plain
 * links.
 *
 * The panel renders INSIDE its own `<li>`, which is what puts it next in the tab order after the
 * trigger that opened it. It still spans the full width, because the `<li>` is not positioned and
 * an absolutely positioned box resolves against the nearest positioned ancestor — the `<header>`.
 * Rendering it as a sibling of the whole list would have been simpler to style and would have put
 * a keyboard user through all five items before reaching the panel they just opened.
 *
 * Opens on pointer for a mouse, on click or Enter for everything else. Closes on Escape (returning
 * focus to its trigger), on a pointer leaving the header, on focus leaving the header, on a
 * pointerdown outside it, and on a route change.
 */
type NavState = {
  /** The path this state was set on. See the note in the component. */
  path: string;
  /** Which desktop panel is open, by item key. One at a time. */
  panel: string | null;
  /** Whether the compact drawer is open. */
  drawer: boolean;
  /** Which of the drawer's accordions is expanded. Independent of the desktop panel. */
  drawerPanel: string | null;
};

const closed = (path: string): NavState => ({
  path,
  panel: null,
  drawer: false,
  drawerPanel: null,
});

export function SiteNav({ items, cta, surface = 'paper' }: SiteNavProps) {
  /* `?? '/'` for the Pages-Router case the hook documents, where it can be null before the router
     initialises. Nothing here should crash because a path is not known yet. */
  const pathname = usePathname() ?? '/';

  /**
   * Open/closed state, STAMPED WITH THE PATH IT WAS SET ON.
   *
   * A route change has to close everything — click a row inside a panel and the panel would
   * otherwise sit over the page it just navigated to. The obvious form of that is an effect on
   * `pathname` that calls setState, and it is wrong twice over: it renders the new page with the
   * panel still open and then renders again to close it, and the React compiler's lint rule rejects
   * it outright. Carrying the path in the state instead makes "closed" DERIVED — one render, no
   * effect, and no window in which the stale panel is on screen.
   */
  const [state, setState] = useState<NavState>(() => closed(pathname));

  /* If the state was set on a different path, it is stale and everything is shut. */
  const open = state.path === pathname ? state : closed(pathname);
  const { panel: openKey, drawer: drawerOpen, drawerPanel: drawerKey } = open;

  /* Every writer goes through this, so no caller can set a field and forget to re-stamp the path —
     which would make the next navigation fail to close anything. */
  const setNav = useCallback(
    (patch: Partial<Omit<NavState, 'path'>>) => {
      setState((current) => ({
        ...(current.path === pathname ? current : closed(pathname)),
        ...patch,
        path: pathname,
      }));
    },
    [pathname],
  );

  const headerRef = useRef<HTMLElement>(null);
  /* React-generated, so two SiteNavs on one page (the proving ground renders four) cannot collide
     on the ids that wire aria-controls to its panels. */
  const uid = useId();
  const triggerId = (key: string) => `${uid}-trigger-${key}`;
  const panelId = (key: string) => `${uid}-panel-${key}`;
  const drawerId = `${uid}-drawer`;
  const menuButtonId = `${uid}-menu`;

  const closeAll = useCallback(() => {
    setNav({ panel: null, drawer: false, drawerPanel: null });
  }, [setNav]);

  /* Escape and outside-pointerdown. Bound only while something is open, so a page with a closed
     header carries no document listeners at all. Escape hands focus back to the control that
     opened the panel — a keyboard user who dismisses a panel and lands at the top of the document
     has been moved, not helped. */
  useEffect(() => {
    if (openKey === null && !drawerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      /* Whichever control opened the thing being dismissed gets the focus back. Escaping out of a
         drawer and landing at the top of the document is being moved, not helped — and the drawer
         case needs stating separately, because closing it removes the element focus was inside. */
      const returnTo = document.getElementById(
        openKey === null ? menuButtonId : triggerId(openKey),
      );
      closeAll();
      returnTo?.focus();
    };

    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeAll();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
    /* triggerId and menuButtonId are derived from `uid`, which is stable for the component's
       lifetime, so listing `uid` covers both. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openKey, drawerOpen, closeAll, uid]);

  /* Focus leaving the header closes the panel — a Tab out of the last link in a panel should not
     leave it hanging open behind the page. The drawer deliberately does NOT close on this: it is a
     sheet a touch user opened on purpose, and it stays until they dismiss it. */
  const onHeaderBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setNav({ panel: null });
  };

  /* Pointer opens are gated to a mouse. On touch, `pointerenter` fires on tap — so an ungated
     handler would open a panel and then the click would immediately toggle it shut. Touch below
     1024 gets the drawer; touch on a tablet in landscape gets click-to-open, which is correct. */
  const onItemPointerEnter = (event: PointerEvent<HTMLLIElement>, item: SiteNavItem) => {
    if (event.pointerType !== 'mouse' || !item.panel) return;
    setNav({ panel: item.key });
  };

  const onHeaderPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    setNav({ panel: null });
  };

  return (
    <header
      ref={headerRef}
      className={styles.header}
      onPointerLeave={onHeaderPointerLeave}
      onBlur={onHeaderBlur}
    >
      {/* `as="div"`, not `as="header"` — the <header> above is the landmark AND the positioning
          context the panel resolves against, and two nested headers would announce two banners.
          `flush` because the bar's height is a fixed geometry rather than one of Section's three
          vertical-air steps, all of which are taller than the whole bar. */}
      <Section as="div" surface={surface} flush className={styles.bar}>
        <Cluster className={styles.barRow} justify="between" colGap="text" nowrap>
          <Link href={ROUTES.home} className={styles.brand} aria-label="Tcules — home">
            {/* title="" — the link above carries the accessible name, so the mark is decorative
                and a screen reader is not made to say "Tcules" twice. */}
            <Logo size="md" title="" />
          </Link>

          <Cluster as="ul" className={styles.items} colGap="inline" nowrap>
            {items.map((item) => {
              const isOpen = openKey === item.key;
              const active = isActivePath(pathname, item.href, item.matchPaths);
              const label = <span className={styles.itemLabel}>{item.label}</span>;

              return (
                <li
                  key={item.key}
                  className={styles.item}
                  onPointerEnter={(event) => onItemPointerEnter(event, item)}
                >
                  {item.panel ? (
                    <>
                      <button
                        type="button"
                        id={triggerId(item.key)}
                        className={cx(
                          styles.itemControl,
                          (active || isOpen) && styles.itemActive,
                        )}
                        /* aria-controls only while the panel exists in the DOM. Pointing it at an
                           id that is not rendered is a broken reference, not a hint. */
                        aria-expanded={isOpen}
                        aria-controls={isOpen ? panelId(item.key) : undefined}
                        onClick={() => setNav({ panel: isOpen ? null : item.key })}
                      >
                        {label}
                        <Icon
                          name="chevron-down"
                          className={cx(styles.chevron, isOpen && styles.chevronOpen)}
                        />
                      </button>
                      {isOpen ? (
                        <NavPanel
                          id={panelId(item.key)}
                          blocks={item.panel}
                          surface={surface}
                        />
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cx(styles.itemControl, active && styles.itemActive)}
                      /* aria-current is EXACT. `active` is a family match so the bar stays lit
                         inside a section, but announcing five pages as "current page" is a lie. */
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </Cluster>

          <Cluster colGap="tight" nowrap>
            <Button as={Link} href={cta.href} size="sm" className={styles.cta}>
              {cta.label}
            </Button>
            <Button
              id={menuButtonId}
              className={styles.menuButton}
              emphasis="ghost"
              tone="neutral"
              iconOnly
              icon={<Icon name={drawerOpen ? 'close' : 'menu'} />}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls={drawerOpen ? drawerId : undefined}
              onClick={() => setNav({ panel: null, drawerPanel: null, drawer: !drawerOpen })}
            />
          </Cluster>
        </Cluster>
      </Section>

      {drawerOpen ? (
        <Section as="div" id={drawerId} surface={surface} flush className={styles.drawer}>
          <Layout rowGap="gutter">
            <Layout as="ul" rowGap="none">
              {items.map((item) => {
                const expanded = drawerKey === item.key;
                const active = isActivePath(pathname, item.href, item.matchPaths);

                return (
                  <li key={item.key} className={styles.drawerItem}>
                    {item.panel ? (
                      <>
                        <button
                          type="button"
                          className={cx(styles.drawerControl, active && styles.drawerActive)}
                          aria-expanded={expanded}
                          onClick={() => setNav({ drawerPanel: expanded ? null : item.key })}
                        >
                          <Cluster justify="between" colGap="text" nowrap>
                            <span className={styles.drawerLabel}>{item.label}</span>
                            <Icon
                              name="chevron-down"
                              className={cx(styles.chevron, expanded && styles.chevronOpen)}
                            />
                          </Cluster>
                        </button>
                        {expanded ? <DrawerPanel blocks={item.panel} /> : null}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cx(styles.drawerControl, active && styles.drawerActive)}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        <Cluster justify="between" colGap="text" nowrap>
                          <span className={styles.drawerLabel}>{item.label}</span>
                          <Icon name="chevron-right" className={styles.chevron} />
                        </Cluster>
                      </Link>
                    )}
                  </li>
                );
              })}
            </Layout>

            <Cluster>
              {/* lg on touch: at 48 the box already clears the 44px hit floor, which is why this
                  needs no extendHitArea. */}
              <Button as={Link} href={cta.href} size="lg">
                {cta.label}
              </Button>
            </Cluster>
          </Layout>
        </Section>
      ) : null}
    </header>
  );
}

/** Split a panel's blocks by kind. One rail and one bar at most; any number of rows blocks. */
function sortBlocks(blocks: SiteNavBlock[]) {
  return {
    rows: blocks.filter((block): block is SiteNavRowsBlock => block.kind === 'rows'),
    rail: blocks.find((block): block is SiteNavRailBlock => block.kind === 'rail'),
    bar: blocks.find((block): block is SiteNavBarBlock => block.kind === 'bar'),
  };
}

/**
 * The mega-menu panel — a full-width band under the bar, overlaying the page.
 *
 * Its own Section, so it paints its own ground and insets its own content to the same 1240 column
 * as every other band on the page. That is the only way to get a full-bleed overlay whose contents
 * still line up with the page behind it: re-deriving the gutter maths locally would put the panel
 * a few pixels off every band under it at some viewport, and the drift would be invisible in code.
 */
function NavPanel({
  id,
  blocks,
  surface,
}: {
  id: string;
  blocks: SiteNavBlock[];
  surface: SiteNavProps['surface'];
}) {
  const { rows, rail, bar } = sortBlocks(blocks);

  return (
    <Section as="div" id={id} surface={surface} flush className={styles.panel}>
      <Layout rowGap="gutter">
        {/* [2,1] when there is a rail, one track when there is not — Layout collapses it to a
            stack below md on its own, and the rail's rule flips from its side to its top there. */}
        <Layout columns={rail ? [2, 1] : undefined} colGap="gutter" rowGap="stack">
          <Layout rowGap="stack">
            {rows.map((block) => (
              <Layout key={block.label ?? 'rows'} rowGap="block">
                {block.label ? <p className={styles.blockLabel}>{block.label}</p> : null}
                {/* block, not tight: each row is two lines with an 8px hover fill around it, so
                    at `tight` the fills of two rows would touch. */}
                <Layout as="ul" columns={block.columns ?? 1} colGap="gutter" rowGap="block">
                  {block.items.map((row) => (
                    <li key={row.href}>
                      <Link href={row.href} className={styles.row}>
                        <Cluster colGap="tight" align="start" nowrap>
                          {row.icon ? (
                            <Icon name={row.icon} className={styles.rowIcon} />
                          ) : null}
                          <Layout className={styles.rowText} rowGap="inline">
                            <span className={styles.rowLabel}>{row.label}</span>
                            <span className={styles.rowPromise}>{row.promise}</span>
                          </Layout>
                        </Cluster>
                      </Link>
                    </li>
                  ))}
                </Layout>
              </Layout>
            ))}
          </Layout>

          {rail ? (
            <Layout className={styles.rail} rowGap="stack">
              {rail.compartments?.map((compartment) => (
                <Layout key={compartment.title} rowGap="block">
                  <Layout rowGap="tight">
                    <p className={styles.blockLabel}>{compartment.eyebrow}</p>
                    <p className={styles.railTitle}>{compartment.title}</p>
                    <p className={styles.railBody}>{compartment.description}</p>
                  </Layout>
                  {/* A Cluster of one, so the button stays content-sized: a bare grid child
                      stretches to its track and a full-width link emphasis reads as a rule. */}
                  <Cluster>
                    <Button
                      as={Link}
                      href={compartment.action.href}
                      emphasis="link"
                      tone="primary"
                      size="sm"
                      icon={<Icon name="arrow-right" />}
                    >
                      {compartment.action.label}
                    </Button>
                  </Cluster>
                </Layout>
              ))}

              {rail.groups?.map((group) => (
                <Layout key={group.label} rowGap="block">
                  <p className={styles.blockLabel}>{group.label}</p>
                  <Layout as="ul" rowGap="tight">
                    {group.links.map((link) => (
                      <li key={`${group.label}-${link.label}`}>
                        <Link href={link.href} className={styles.railLink}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </Layout>
                </Layout>
              ))}
            </Layout>
          ) : null}
        </Layout>

        {bar ? (
          <Cluster className={styles.panelBar}>
            <Button
              as={Link}
              href={bar.link.href}
              emphasis="link"
              tone="neutral"
              size="sm"
              icon={<Icon name="arrow-right" />}
            >
              {bar.link.label}
            </Button>
          </Cluster>
        ) : null}
      </Layout>
    </Section>
  );
}

/**
 * A drawer accordion's contents — the same blocks, flattened.
 *
 * Rows lose their marks and their promises here, deliberately. A phone gives a panel roughly one
 * column and no hover, so six rows of mark-plus-title-plus-sentence is 40 lines of scrolling
 * before the second top-level item is reachable — the promise is what sells a service on a page
 * with room, and what buries the navigation on one without. The rail's compartments come through
 * as their action links for the same reason.
 */
function DrawerPanel({ blocks }: { blocks: SiteNavBlock[] }) {
  const { rows, rail, bar } = sortBlocks(blocks);

  return (
    <Layout className={styles.drawerPanel} rowGap="text">
      {rows.map((block) => (
        <Layout key={block.label ?? 'rows'} rowGap="tight">
          {block.label ? <p className={styles.blockLabel}>{block.label}</p> : null}
          <Layout as="ul" rowGap="tight">
            {block.items.map((row) => (
              <li key={row.href}>
                <Link href={row.href} className={styles.drawerLink}>
                  {row.label}
                </Link>
              </li>
            ))}
          </Layout>
        </Layout>
      ))}

      {rail?.compartments?.length ? (
        <Layout as="ul" rowGap="tight">
          {rail.compartments.map((compartment) => (
            <li key={compartment.title}>
              <Link href={compartment.action.href} className={styles.drawerLink}>
                {compartment.action.label}
              </Link>
            </li>
          ))}
        </Layout>
      ) : null}

      {rail?.groups?.map((group) => (
        <Layout key={group.label} rowGap="tight">
          <p className={styles.blockLabel}>{group.label}</p>
          <Layout as="ul" rowGap="tight">
            {group.links.map((link) => (
              <li key={`${group.label}-${link.label}`}>
                <Link href={link.href} className={styles.drawerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Layout>
        </Layout>
      ))}

      {bar ? (
        <Cluster>
          <Button
            as={Link}
            href={bar.link.href}
            emphasis="link"
            tone="neutral"
            size="sm"
            icon={<Icon name="arrow-right" />}
          >
            {bar.link.label}
          </Button>
        </Cluster>
      ) : null}
    </Layout>
  );
}
