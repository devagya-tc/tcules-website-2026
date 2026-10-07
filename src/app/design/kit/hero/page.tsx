import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Cluster, Layout, Section } from '@/components';
import { getIdealServiceStory } from '@/content';
import { Breadcrumbs, ListCard, PageHero, type HeroAction, type PageHeroProps } from '@/patterns';
import { ILLUSTRATION_LEGENDS } from '@/lib/illustration-legends';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES, auditPath, caseStudyPath, servicePath } from '@/lib/routes';
import { heroTrail, slugLabel, type TrailItem } from '@/lib/trail';

import t from '../../_specimen/typeroles.module.css';

export const metadata: Metadata = {
  title: 'Hero family · kit | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/hero — the hero family of the Tcules UI kit (visual-direction § 2.3 to § 2.5).
 *
 * Laid out as a showcase rather than a dump: an intro band that indexes the family, then each
 * variation as a tint label strip followed by the hero itself, at full width, exactly as a page
 * opens. Every hero is a real PageHero fed real or considered copy and catalogue photographs; the
 * strips say what each proves and what it costs at 1470 × 830.
 *
 * Fold: `npm run fold:check` measures every band and every [data-fold-hero] at 1470 and 390
 * (fold.config.json lists the route); the "Ends at" facts are its numbers, nav included. A hero opens a
 * page, so its budget is band + the 73 of SiteNav. The centred-head comparison cannot meet it and
 * carries data-fold-exempt (§ 10 item 2).
 *
 * Photographs: one temperature family for the whole page (§ 5.5): four neutral, quiet frames in daylight, all
 * from 2400 masters, each decorative (`alt=""`): the copy beside it says what it stands for.
 */

const photo = (id: PhotoId, alt: string) => getKitPhoto(id, { alt });

/** A service story's hero props, from the designed fixtures — the same copy the six pages carry. */
function serviceHero(slug: string) {
  const story = getIdealServiceStory(slug);
  if (!story) notFound();
  const crumbs: TrailItem[] = [
    { label: 'Home', href: ROUTES.home },
    { label: 'Services', href: ROUTES.services },
    { label: slugLabel(slug), href: servicePath(slug) },
  ];
  const { hero } = story;
  return {
    hero,
    trail: heroTrail(crumbs, hero.title, (trail) => <Breadcrumbs {...trail} />),
    media: {
      type: 'image' as const,
      image: { ...hero.illustration, alt: '', kind: 'illustration' as const },
      cut: ILLUSTRATION_LEGENDS[hero.illustration.src],
    },
  };
}

const START: HeroAction = { label: 'Start a project', href: ROUTES.contact };

type Variation = {
  id: string;
  name: string;
  /** The index label: a mono button label does not wrap, so it must fit 390. */
  short: string;
  note: string;
  facts: readonly string[];
  exempt?: string;
  hero: PageHeroProps;
};

function variations(): Variation[] {
  const product = serviceHero('product-design');
  const engineering = serviceHero('design-engineering');
  const software = serviceHero('software-development');

  const caseCrumbs: TrailItem[] = [
    { label: 'Home', href: ROUTES.home },
    { label: 'Case studies', href: ROUTES.caseStudies },
    { label: 'Ledgerline', href: caseStudyPath('ledgerline') },
  ];
  const caseTitle = 'Month-end close, rebuilt around the people who run it';

  return [
    {
      id: 'service',
      short: 'Illustration, two actions',
      name: 'Illustration beside the copy, two actions',
      note: 'The locked service hero (ruling H2). The trail joins the copy, 32 above the title, and the pair is centred on the drawing. One solid ask and one blue link. Below 1440 the drawing’s labels become numbered markers with a legend, so they stay readable at every width.',
      facts: ['Ends at 729', 'Accent + Field', 'Numbered legend below 1440'],
      hero: {
        trail: product.trail,
        title: product.hero.title,
        body: [product.hero.lead],
        actions: product.hero.actions,
        arrangement: 'beside',
        media: product.media,
      },
    },
    {
      id: 'single',
      short: 'Illustration, one action',
      name: 'Illustration, one action',
      note: 'A page with a single ask drops the link and keeps the shape. The solid stands alone under the lead, and the trail stays 32 above the title rather than floating at the band’s top.',
      facts: ['Ends at 699', 'Accent + Field'],
      hero: {
        trail: engineering.trail,
        title: engineering.hero.title,
        body: [engineering.hero.lead],
        actions: engineering.hero.actions,
        arrangement: 'beside',
        media: engineering.media,
      },
    },
    {
      id: 'tags',
      short: 'Illustration with tags',
      name: 'Illustration with tags',
      note: 'Six tags as an unboxed grid after the actions: two balanced rows of three, three rows of two on a phone, each marked by one blue pixel of the texture’s grid. The hero sets six at most; the rest of the stack belongs in the page. Keep the title to three lines.',
      facts: ['Ends at 792', 'Six at most', 'Accent + Field'],
      hero: {
        trail: software.trail,
        title: software.hero.title,
        body: [software.hero.lead],
        actions: software.hero.actions,
        arrangement: 'beside',
        media: software.media,
        /* The fixture carries nine; the hero sets six (PageHero warns past six). */
        tags: software.hero.tags?.slice(0, 6),
      },
    },
    {
      id: 'photograph',
      short: 'Photograph, foot field',
      name: 'Photograph beside the copy, a field under it',
      note: 'The photograph opening (kit/home takes it without the field since page-showcase fix round 2). A 5:4 photograph at 572 × 458, top-aligned on the eyebrow, radius 8. Under the copy, a field of the texture steps up toward the photograph and stands on its foot line: its edges are the copy track’s and its floor the photograph’s, so it reads as part of the grid. A two-line title leaves it the room.',
      facts: ['Ends at 723', 'Accent + Texture', 'Foot field from 1440'],
      hero: {
        eyebrow: 'Product design and engineering studio',
        title: 'Built to hold up in production',
        body: [
          'We design and build B2B, workflow and AI products, from the first model of the work to the code that ships it.',
        ],
        actions: [START, { label: 'See the work', href: ROUTES.caseStudies }],
        arrangement: 'beside',
        media: {
          type: 'image',
          ratio: '5/4',
          image: photo('wireframe-wall', ''),
        },
        texture: true,
      },
    },
    {
      id: 'announcement',
      short: 'Wide photograph, news',
      name: 'The photograph leads, with an announcement above',
      note: 'The second photograph idea: copy 2 to media 3 from 1440, a 3:2 photograph at 686 × 457. Above it one line of news, a blue pixel, a blue flag, a sentence and a link; on a phone the sentence wraps beside the flag and the link drops below. The strip goes above any shape and is never a second ask.',
      facts: ['Ends at 792', 'Accent only', 'Copy 2 : media 3'],
      hero: {
        announcement: {
          label: 'New',
          text: 'The AI Product UX readiness audit now runs in two weeks.',
          action: { label: 'See the audit', href: auditPath('ai-product-ux-readiness') },
        },
        eyebrow: 'The studio',
        title: 'A small team that owns the whole product',
        body: [
          'Researchers, designers and engineers in one room, accountable for the decision and for the software it becomes.',
        ],
        actions: [START, { label: 'How we work', href: ROUTES.howWeWork }],
        arrangement: 'wide',
        media: {
          type: 'image',
          ratio: '3/2',
          image: photo('whiteboard-pair-laptop', ''),
        },
      },
    },
    {
      id: 'display',
      short: 'Title-led panorama',
      name: 'Title-led, with a panorama below',
      note: 'The split header: the title and lead in three fifths, the ask on the lead’s last line and flush with the column’s end, then a 4:1 photograph across the full column. The calmest frame in the catalogue, an empty studio, so the panorama is light and air rather than a second subject.',
      facts: ['Ends at 781', 'Accent only', '4:1 · 3:2 on a phone'],
      hero: {
        title: 'How we work',
        body: [
          'What happens in each week of an engagement, who is in the room, and what you hold at the end of it.',
        ],
        actions: [
          { label: 'Book an intro call', href: ROUTES.contact },
          { label: 'Read a sample plan', href: '#display' },
        ],
        arrangement: 'display',
        media: {
          type: 'image',
          ratio: { base: '3/2', lg: '4/1' },
          image: photo('office-calm-interior', ''),
        },
      },
    },
    {
      id: 'text-field',
      short: 'Text with the field',
      name: 'No media, the field beside the copy',
      note: 'The kit/services-index opening. The copy takes two thirds and the texture the last, a field that steps up to the column’s end edge and sinks into the floor, so the title stands in the clearing it leaves (Quantum’s move, made structural). Below 1024 it is not drawn: only the horizon runs there (§ 3.7).',
      facts: ['Ends at 629', 'Accent + Texture', 'Field track [2, 1]'],
      hero: {
        trail: heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: 'Services', href: ROUTES.services },
          ],
          'Six ways into one accountable product team',
          (trail) => <Breadcrumbs {...trail} />,
        ),
        title: 'Six ways into one accountable product team',
        body: [
          'Design, systems, engineering and modernisation, run as one practice so a decision made in research survives into the code.',
        ],
        actions: [START, { label: 'Compare the services', href: '#compare' }],
        texture: true,
      },
    },
    {
      id: 'text',
      short: 'Text only',
      name: 'No media, no texture',
      note: 'The quietest opening: type alone. For a page whose first band carries the image, so the hero does not compete with it.',
      facts: ['Ends at 590', 'Accent only'],
      hero: {
        trail: heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: 'Expertise', href: ROUTES.expertise },
          ],
          'Products we know from the inside',
          (trail) => <Breadcrumbs {...trail} />,
        ),
        title: 'Products we know from the inside',
        body: [
          'Workflow software, AI and developer tools, data products, marketplaces and fintech: the kinds of product where the model of the work decides the interface.',
        ],
        actions: [{ label: 'Book an intro call', href: ROUTES.contact }],
      },
    },
    {
      id: 'category',
      short: 'Category eyebrow',
      name: 'Eyebrow as a category beside the trail',
      note: '“Case study · Fintech” stands 32 under Home / Case studies: a section crumb is repeated only by equalling it, and this says a format and a sector the trail cannot. A bare “Case study”, or “Ledgerline · Fintech” under a Ledgerline crumb, would be dropped.',
      facts: ['Ends at 775', 'Accent only', 'Two-tier eyebrow rule'],
      hero: {
        trail: heroTrail(caseCrumbs, caseTitle, (trail) => <Breadcrumbs {...trail} />),
        eyebrow: 'Case study · Fintech',
        title: caseTitle,
        body: [
          'A reconciliation console for a payments team of forty, designed with the analysts who close the books each month.',
        ],
        actions: [START, { label: 'All case studies', href: ROUTES.caseStudies }],
        arrangement: 'beside',
        media: {
          type: 'image',
          ratio: '5/4',
          image: photo('pair-at-laptop-sticky-wall', ''),
        },
      },
    },
    {
      id: 'centred',
      short: 'Centred comparison',
      name: 'Centred head, media below: the owner comparison',
      note: 'Product Design’s content in the other shape: the trail, a centred title, the lead and the actions, then the drawing capped at 860, about eight of twelve columns, so it keeps the split’s scale. It cannot end above the fold, so it is exempt and shown beside the locked shape (01). H2 stands unless the owner picks this.',
      facts: ['Fold-exempt', 'Accent + Field', '§ 10 item 2'],
      exempt:
        'owner comparison: centred head + media below cannot end above 830 (visual-direction § 2.3, § 10 item 2)',
      hero: {
        trail: product.trail,
        title: product.hero.title,
        body: [product.hero.lead],
        actions: product.hero.actions,
        arrangement: 'centred',
        media: product.media,
      },
    },
  ];
}

/** The tint strip that names a variation. Specimen chrome: it labels the band below it. */
function Label({ index, variation }: { index: number; variation: Variation }) {
  return (
    <Section surface="tint" density="tight" id={variation.id}>
      <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="block" align="start">
        <Layout rowGap="tight">
          <p className={t.index}>{String(index + 1).padStart(2, '0')}</p>
          <h2 className={t.h4}>{variation.name}</h2>
        </Layout>
        <Layout rowGap="block">
          <p className={t.body}>{variation.note}</p>
          <Cluster as="ul" colGap="block" rowGap="tight">
            {variation.facts.map((fact) => (
              <li key={fact} className={t.eyebrow}>
                {fact}
              </li>
            ))}
          </Cluster>
        </Layout>
      </Layout>
    </Section>
  );
}

export default function HeroKitSpecimen() {
  const list = variations();
  return (
    <>
      <Section>
        <Layout rowGap="column">
          <Layout columns={{ lg: [3, 2] }} colGap="section" rowGap="block" align="baseline">
            <Layout rowGap="block">
              <p className={t.eyebrow}>UI kit · Hero family</p>
              <h1 className={t.display}>One hero, ten openings</h1>
            </Layout>
            <p className={t.lead}>
              One PageHero, three kinds of media and five arrangements. Each shape is measured at
              1470 × 830 and at 390 with the nav above it, and spends at most two blue masses.
            </p>
          </Layout>
          <Layout as="ol" columns={{ base: 2, lg: 5 }} colGap="gutter" rowGap="gutter">
            {/* ListCard renders its own <li>. */}
            {list.map((variation, index) => (
              <ListCard
                key={variation.id}
                form="tile"
                size="sm"
                marker={{ type: 'number', value: index + 1, tone: 'neutral' }}
                title={variation.short}
                body={variation.facts[0]}
                href={`#${variation.id}`}
              />
            ))}
          </Layout>
        </Layout>
      </Section>

      {list.map((variation, index) => (
        <div key={variation.id} data-kit-variation={variation.id}>
          <Label index={index} variation={variation} />
          {/* data-fold-hero: fold:check measures this hero + the nav against 830. */}
          <div data-fold-hero="" data-fold-exempt={variation.exempt}>
            <PageHero {...variation.hero} />
          </div>
        </div>
      ))}
    </>
  );
}
