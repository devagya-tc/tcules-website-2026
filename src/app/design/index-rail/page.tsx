import type { Metadata } from 'next';

import { Chip, Icon, Input, Layout, Section } from '@/components';
import { ROUTES } from '@/lib/routes';
import { Accordion, IndexRail } from '@/patterns';

import { Box, Specimen } from '../_specimen/Specimen';

export const metadata: Metadata = {
  title: 'IndexRail | Design',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** A stand-in view: a few named sections, each a jump target, tall enough to scroll through. */
function View({ prefix, names }: { prefix: string; names: readonly string[] }) {
  return (
    <Layout rowGap="section">
      {names.map((name) => (
        <section key={name} id={`${prefix}-${name.toLowerCase()}`} aria-label={name}>
          <Layout rowGap="block">
            <h2>{name}</h2>
            <Layout columns={{ md: 3 }} colGap="gutter" rowGap="gutter">
              <Box tall />
              <Box tall />
              <Box tall />
            </Layout>
          </Layout>
        </section>
      ))}
    </Layout>
  );
}

const TYPES = ['Articles', 'Events', 'Videos', 'Guides'] as const;
const TOPICS = ['Design systems', 'Prototypes', 'Modernisation'] as const;

/** The finder's controls (the insights hub, 28 Oct 2026): a search, then the filter groups. */
const GROUPS = [
  { label: 'Type', options: TYPES, picked: ['Events'] },
  { label: 'Topic', options: TOPICS, picked: [] },
  { label: 'Industry', options: ['B2B SaaS', 'Fintech', 'Edtech'], picked: [] },
] as const;

function Controls() {
  return (
    <Layout rowGap="block">
      <Input
        type="search"
        name="q"
        placeholder="Search insights"
        aria-label="Search insights"
        enterKeyHint="search"
      />
      <Accordion
        size="sm"
        items={GROUPS.map((group, index) => ({
          question: group.label,
          open: index === 0,
          content: (
            <Layout rowGap="text">
              {group.options.map((option) => (
                <Chip
                  key={option}
                  look="index"
                  type="checkbox"
                  name={`rail-${group.label.toLowerCase()}`}
                  value={option}
                  tick={<Icon name="chrome-check" />}
                  defaultChecked={(group.picked as readonly string[]).includes(option)}
                >
                  {option}
                </Chip>
              ))}
            </Layout>
          ),
        }))}
      />
    </Layout>
  );
}

/**
 * IndexRail — a curated listing page's rail beside its content, in its two modes:
 *
 *   views   BY TYPE / BY TOPIC: the switch changes the whole content column; both views are in the
 *           HTML, the hidden one `hidden`; the choice is held in `?view=` (try ?view=topic, reload,
 *           and switch: the URL follows without a reload). The list marks the section in view.
 *   picker  one list of pages, the current one marked; the content is the children.
 *   menu    a picker as one control naming the current page, its siblings opening under it.
 *   controls the rail holds the caller's controls (the insights finder's search and filter groups)
 *           in place of a list; below 1024 the bar is one button (`controlsLabel`) opening them.
 *
 * Below 1024 the rail sits above the content and an in-page jump list is dropped.
 */
export default async function IndexRailSpecimen({ searchParams }: Props) {
  const query = await searchParams;
  const view = Array.isArray(query.view) ? query.view[0] : query.view;
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>IndexRail</h1>
          <p>
            The rail of a curated listing page — the switch between two ways of curating it and
            the shown view’s sections, or a picker of sibling pages.
          </p>
        </Layout>
      </Section>
      <Section aria-label="Views">
        <Specimen
          title="views — BY TYPE / BY TOPIC"
          note="Switch labels are authored “By type” / “By topic”; mono sets them in capitals."
        >
          <IndexRail
            ariaLabel="Browse"
            param="view"
            initialMode={view}
            modes={[
              {
                id: 'type',
                label: 'By type',
                items: TYPES.map((name, i) => ({
                  label: name,
                  href: `#type-${name.toLowerCase()}`,
                  count: 42 - i * 9,
                })),
                panel: <View prefix="type" names={TYPES} />,
              },
              {
                id: 'topic',
                label: 'By topic',
                items: TOPICS.map((name) => ({
                  label: name,
                  href: `#topic-${name.toLowerCase()}`,
                })),
                panel: <View prefix="topic" names={TOPICS} />,
              },
            ]}
          />
        </Specimen>
      </Section>
      <Section aria-label="Picker">
        <Specimen
          title="picker — a format page's formats, the current one marked"
          note="aria-current=page on the current item: full ink and the blue tick; each entry a mono count and its label."
        >
          <IndexRail
            ariaLabel="Formats"
            modes={[
              {
                id: 'type',
                label: 'By type',
                items: [
                  { label: 'Articles', href: ROUTES.articles, current: true, count: 42 },
                  { label: 'Guides', href: ROUTES.guides, count: 10 },
                  { label: 'Videos', href: ROUTES.videos, count: 7 },
                  { label: 'Events', href: ROUTES.events, count: 3 },
                ],
              },
            ]}
          >
            <Layout columns={{ md: 2 }} colGap="gutter" rowGap="gutter">
              <Box tall />
              <Box tall />
            </Layout>
          </IndexRail>
        </Specimen>
      </Section>
      <Section aria-label="Menu">
        <Specimen
          title="picker as a menu — the current page named, its siblings under it"
          note="menu: a <details> control naming the current page, each entry led by its glyph; open, the list hangs, its parent page first over a rule, under it on the same ground. Shuts on Escape, a choice or a press outside. A format page's rail (23 Oct 2026)."
        >
          <IndexRail
            ariaLabel="Formats as a menu"
            menu
            parent={{
              label: 'All insights',
              href: ROUTES.insights,
              icon: <Icon name="widget" />,
            }}
            modes={[
              {
                id: 'type',
                label: 'By type',
                items: [
                  {
                    label: 'Articles',
                    href: ROUTES.articles,
                    icon: <Icon name="document-text" />,
                  },
                  {
                    label: 'Guides',
                    href: ROUTES.guides,
                    current: true,
                    icon: <Icon name="notebook" />,
                  },
                  {
                    label: 'Videos',
                    href: ROUTES.videos,
                    icon: <Icon name="videocamera-record" />,
                  },
                  { label: 'Events', href: ROUTES.events, icon: <Icon name="calendar" /> },
                ],
              },
            ]}
          >
            <Layout columns={{ md: 2 }} colGap="gutter" rowGap="gutter">
              <Box tall />
              <Box tall />
            </Layout>
          </IndexRail>
        </Specimen>
      </Section>
      <Section aria-label="Controls">
        <Specimen
          title="controls — the finder's search and filter groups in the rail's place"
          note="controls (the insights hub, 28 Oct 2026): the caller's controls stand in the sticky column, scrolling within it when taller than the screen, with room for a focus ring at its edges (Tab to the search field: the ring is whole). Below 1024 the bar holds one button, controlsLabel ('Filters · 1'), that opens them as a sheet. Here a search and Accordion size='sm' groups of index chips, Type open."
        >
          <IndexRail
            ariaLabel="Browse insights"
            modes={[{ id: 'finder', label: 'Browse insights', items: [] }]}
            controls={<Controls />}
            controlsLabel="Filters · 1"
          >
            <Layout columns={{ md: 3 }} colGap="gutter" rowGap="gutter">
              <Box tall />
              <Box tall />
              <Box tall />
              <Box tall />
              <Box tall />
              <Box tall />
            </Layout>
          </IndexRail>
        </Specimen>
      </Section>
    </>
  );
}
