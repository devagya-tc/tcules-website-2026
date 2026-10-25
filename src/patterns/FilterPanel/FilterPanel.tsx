import { Button, Chip, Cluster, Icon, Layout } from '@/components';

import styles from './FilterPanel.module.css';

/** One option in a group: the value it posts, its label, and whether it is in effect. */
export type FilterPanelOption = { value: string; label: string; checked?: boolean };

/** One group of options ("Topic", "Industry"): the field name its options post under. */
export type FilterPanelGroup = {
  name: string;
  label: string;
  options: readonly FilterPanelOption[];
};

export type FilterPanelProps = {
  /** The panel's id: the trigger opens it by this, so it is unique on the page. */
  id: string;
  /** Where the form goes: the page's own path. */
  action: string;
  /** The query the form keeps (a search in effect, a specimen's own parameters). */
  params?: readonly (readonly [string, string])[];
  groups: readonly FilterPanelGroup[];
  /** The page with no filter in effect (the search kept), for Reset. */
  resetHref: string;
  /** The panel's heading. Authored case. */
  heading?: string;
  /** The trigger's label. Authored case; the button sets the case. */
  triggerLabel?: string;
};

/**
 * TIER 2 — FilterPanel, a listing's filters in a side panel (owner, 23 Oct 2026: "do the filters
 * like the claude reference", claude.com/resources/product-announcements).
 *
 * A trigger names the filters, with how many are in effect; it opens a panel down the screen's end
 * edge: the heading and a close (the chrome mark, neutral), each GROUP a disclosure of its options as chips (the site's pick
 * control, never ticked boxes: form-choices-are-chips), then Reset and Apply. Apply posts the form
 * by GET, so the URL holds the filters and a filtered page can be shared; Reset is a link to the page
 * with none.
 *
 * The panel is a POPOVER (`popover="auto"`): it opens and shuts with no script — the trigger and the
 * close name it, Escape and a press outside shut it — and sits in the top layer over the page. It
 * declares no surface: it reads its ground and inks from the band it is placed in.
 */
export function FilterPanel({
  id,
  action,
  params = [],
  groups,
  resetHref,
  heading = 'Filter',
  triggerLabel = 'Filters',
}: FilterPanelProps) {
  const shown = groups.filter((group) => group.options.length > 0);
  if (shown.length === 0) return null;
  const inEffect = shown.reduce(
    (sum, group) => sum + group.options.filter((option) => option.checked).length,
    0,
  );
  const headingId = `${id}-heading`;
  return (
    <>
      <Button emphasis="ghost" popoverTarget={id} aria-haspopup="dialog">
        {inEffect > 0 ? `${triggerLabel} · ${inEffect}` : triggerLabel}
      </Button>
      <div
        id={id}
        popover="auto"
        role="dialog"
        aria-labelledby={headingId}
        className={styles.panel}
      >
        <form action={action} method="get">
          {params.map(([key, value]) => (
            <input key={`${key}=${value}`} type="hidden" name={key} value={value} />
          ))}
          <Layout rowGap="stack">
            <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="center">
              <h2 id={headingId} className={styles.heading}>
                {heading}
              </h2>
              <Button
                type="button"
                iconOnly
                emphasis="ghost"
                tone="neutral"
                icon={<Icon name="chrome-close" />}
                aria-label="Close filters"
                popoverTarget={id}
                popoverTargetAction="hide"
              />
            </Layout>
            <Layout rowGap="none">
              {shown.map((group, index) => (
                /* The first group open, and any that holds a choice. */
                <details
                  key={group.name}
                  className={styles.group}
                  open={index === 0 || group.options.some((option) => option.checked)}
                >
                  <summary className={styles.summary}>
                    <Layout columns={{ base: [1, 'auto'] }} colGap="block" align="center">
                      <span className={styles.groupLabel}>{group.label}</span>
                      <span className={styles.caret} aria-hidden="true">
                        <Icon name="alt-arrow-down" size="sm" />
                      </span>
                    </Layout>
                  </summary>
                  <fieldset className={styles.options}>
                    <legend className={styles.hidden}>{group.label}</legend>
                    <Cluster colGap="tight" rowGap="tight">
                      {group.options.map((option) => (
                        <Chip
                          key={option.value}
                          type="checkbox"
                          name={group.name}
                          value={option.value}
                          defaultChecked={option.checked}
                          tick={<Icon name="chrome-check" />}
                        >
                          {option.label}
                        </Chip>
                      ))}
                    </Cluster>
                  </fieldset>
                </details>
              ))}
            </Layout>
            <Layout columns={{ base: 2 }} colGap="text">
              <Button as="a" href={resetHref} emphasis="ghost">
                Reset
              </Button>
              <Button type="submit">Apply</Button>
            </Layout>
          </Layout>
        </form>
      </div>
    </>
  );
}
