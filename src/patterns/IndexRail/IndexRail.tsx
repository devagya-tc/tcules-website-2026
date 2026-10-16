'use client';

import { useEffect, useId, useState } from 'react';

import { Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './IndexRail.module.css';

/** One destination in a mode's list: an in-page section (`#id`) or another page. */
export type IndexRailItem = { label: string; href: string };

/** One way of browsing — "By topic", "By type" — and the list it shows. */
export type IndexRailMode = { id: string; label: string; items: readonly IndexRailItem[] };

export type IndexRailProps = {
  /** One or two modes. With two, a switch heads the rail; with one, the list stands alone. */
  modes: readonly IndexRailMode[];
  /** The small label over the list. Pass authored case; mono uppercases it. */
  label?: string;
  /** The nav's accessible name. */
  ariaLabel: string;
  className?: string;
};

/**
 * TIER 2 — IndexRail, a listing page's navigation (insights hub, 16 Oct 2026).
 *
 * After the IDEA of claude.com/resources: a sticky rail with a switch between two ways of browsing
 * over one jump list in the title serif. It is a designed object rather than a table of contents:
 * no counts, no rule between items, the current section marked by a short blue bar and full ink.
 *
 * The switch is two buttons (`aria-pressed`), not tabs: it swaps which list the nav shows, and the
 * lists are links. The current in-page section is tracked as the reader scrolls
 * (`aria-current="location"`); a mode whose items are pages has none.
 */
export function IndexRail({ modes, label = 'Jump to', ariaLabel, className }: IndexRailProps) {
  const uid = useId();
  const [mode, setMode] = useState(modes[0]?.id ?? '');
  const [current, setCurrent] = useState('');
  const active = modes.find((m) => m.id === mode) ?? modes[0];

  useEffect(() => {
    const ids = (active?.items ?? [])
      .map((item) => (item.href.startsWith('#') ? item.href.slice(1) : ''))
      .filter(Boolean);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);
    if (targets.length === 0) return;
    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const first = ids.find((id) => seen.get(id));
        if (first) setCurrent(first);
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [active]);

  if (!active) return null;

  return (
    <nav aria-label={ariaLabel} className={cx(styles.root, className)}>
      <Layout rowGap="stack">
        {modes.length > 1 ? (
          <div role="group" aria-label="Browse">
          <Layout columns={2} colGap="none" className={styles.switch}>
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                className={styles.mode}
                aria-pressed={m.id === active.id}
                aria-controls={`${uid}-list`}
                onClick={() => setMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </Layout>
          </div>
        ) : null}
        <Layout rowGap="block">
          <p className={styles.label}>{label}</p>
          <Layout as="ul" rowGap="text" id={`${uid}-list`} key={active.id} className={styles.list}>
            {active.items.map((item) => {
              const here = item.href === `#${current}`;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.item}
                    aria-current={here ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </Layout>
        </Layout>
      </Layout>
    </nav>
  );
}
