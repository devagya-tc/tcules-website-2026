'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Rehearse — drive the REAL controls of the form inside it once, on mount, so a specimen can show
 * a state that only exists after interaction (a blurred empty field, a failed send, a sent form)
 * without the component growing a demo prop. Route-local scaffolding for the proving ground, like
 * Specimen: it types into the fields, blurs them and submits, exactly as a person would, and the
 * component under test does the rest.
 *
 *   fill    values by field `name`, written before anything else
 *   blur    focus and blur every visible field, in order: blur validation runs as it would
 *   submit  submit the form (its action decides the outcome)
 *
 * The page's scroll position is put back afterwards, because a submit moves focus (to the submit,
 * then to the success region) and focus scrolls; after a submit, focus inside it is released. A
 * ref guards the run, so React's development double-invoke does not submit twice.
 */
export function Rehearse({
  fill,
  blur = false,
  submit = false,
  children,
}: {
  fill?: Record<string, string>;
  blur?: boolean;
  submit?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);
  const saved = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    /* The run happens once; the clean-up below happens per effect, so React's development
       re-mount re-arms the timers it cleared rather than leaving the page un-restored. */
    if (!ran.current) {
      ran.current = true;
      saved.current = { x: window.scrollX, y: window.scrollY };
      const fields = [
        ...root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
          'input:not([type="hidden"]), textarea',
        ),
      ];
      for (const field of fields) {
        const value = fill?.[field.name];
        if (value !== undefined) field.value = value;
      }
      if (blur) {
        for (const field of fields) {
          field.focus({ preventScroll: true });
          field.blur();
        }
      }
      if (submit) root.querySelector('form')?.requestSubmit();
    }

    const { x, y } = saved.current;
    const timers = [0, 300, 900].map((ms) => setTimeout(() => window.scrollTo(x, y), ms));
    /* A person would move on; the specimen should not sit with a focus ring on the sent form.
       Only focus INSIDE this rehearsal is released. */
    if (submit) {
      timers.push(
        setTimeout(() => {
          const active = document.activeElement;
          if (active instanceof HTMLElement && root.contains(active)) active.blur();
        }, 900),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [fill, blur, submit]);

  return <div ref={ref}>{children}</div>;
}
