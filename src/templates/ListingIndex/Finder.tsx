'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { type MouseEvent, type ReactNode, useEffect, useRef } from 'react';

/* ── The finder's behaviour: the URL is the state, the layout never moves ──────────────
   Jatin, 26 Oct 2026: "URL change hogi, result change hoga, woh more or less stable rahega". A tick
   in the rail applies at once: the form is a GET form (next/form), so its fields ARE the query, and
   it navigates on the client — replacing the history entry, never scrolling to the top — and the
   server renders the results for the new query. Without script it is a plain GET form, and the
   search field's Enter applies everything. */

/** Where the reader's focus was when the form re-rendered for a new query: put back after. */
let refocus: { name: string; value: string } | null = null;

/** Bring the listing's head into view when a change leaves the reader below the new results. */
function settle(anchor: string) {
  const top = document.getElementById(anchor);
  if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: 'start' });
}

/**
 * The rail's controls as one GET form on the page's own path. Keyed by the query by the caller, so a
 * chip removed in the content (a link) re-renders the ticks from the URL.
 */
export function FinderForm({
  action,
  anchor,
  children,
}: {
  action: string;
  /** The id of the element the reader is brought back to (the listing's top). */
  anchor: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!refocus) return;
    const { name, value } = refocus;
    refocus = null;
    ref.current
      ?.querySelector<HTMLInputElement>(`input[name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`)
      ?.focus({ preventScroll: true });
  }, []);

  return (
    <Form
      ref={ref}
      action={action}
      replace
      scroll={false}
      onSubmit={(event) => {
        /* An empty search says nothing: left out of the URL (`?q=` on every tick), put back after. */
        const blank = [...event.currentTarget.querySelectorAll<HTMLInputElement>('input')].filter(
          (input) => input.type === 'search' && !input.value.trim(),
        );
        blank.forEach((input) => (input.disabled = true));
        setTimeout(() => blank.forEach((input) => (input.disabled = false)));
      }}
      onChange={(event) => {
        const field = event.target as unknown as HTMLInputElement;
        /* A tick applies at once; the search field applies on Enter, never per keystroke. */
        if (field.type !== 'checkbox' && field.type !== 'radio') return;
        refocus = { name: field.name, value: field.value };
        event.currentTarget.requestSubmit();
        settle(anchor);
      }}
    >
      {children}
    </Form>
  );
}

/**
 * The picks over the results: each chip and "Clear all" is a link to the page without it, followed on
 * the client in place, as a tick is.
 */
export function FinderLinks({ anchor, children }: { anchor: string; children: ReactNode }) {
  const router = useRouter();
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as HTMLElement).closest('a');
    /* Only a link to this same page with another query: a piece's own link navigates as usual. */
    if (
      !link ||
      link.origin !== window.location.origin ||
      link.pathname !== window.location.pathname
    )
      return;
    event.preventDefault();
    router.replace(`${link.pathname}${link.search}`, { scroll: false });
    settle(anchor);
  };
  return <div onClick={onClick}>{children}</div>;
}
