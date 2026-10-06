import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Button, Cluster, Icon, Layout, Section, Tag } from '@/components';
import { getIdealServiceStory } from '@/content';
import { Breadcrumbs, PageHero, type HeroAction, type PageHeroProps } from '@/patterns';
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
 * Fold: each hero band is measured at 1470 and 390 (fold.config.json lists the route). A hero opens a
 * page, so its budget is band + the 73 of SiteNav. The centred-head comparison cannot meet it and
 * carries data-fold-exempt (§ 10 item 2).
 *
 * Photographs: one temperature family for the whole page (§ 5.5), neutral and quiet throughout.
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
      short: 'Illustration · two actions',
      name: 'Illustration beside the copy, two actions',
      note: 'The locked service hero (ruling H2). The trail sits 32 above the split, the title starts at 222, and the illustration is centred on the copy. One solid ask and one blue link.',
      facts: ['Ends ≤ 823', 'Accent + Field', 'No texture'],
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
      short: 'Illustration · one action',
      name: 'Illustration, one action',
      note: 'A page with a single ask drops the link and keeps the shape. The solid stands alone under the lead; nothing else changes.',
      facts: ['Ends ≤ 823', 'Accent + Field'],
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
      short: 'Illustration · tags',
      name: 'Illustration with Tags',
      note: 'Inert marks a stack under the lead. Allowed only when the title sets on three lines or fewer, because the row adds 32 + 48 and must stay inside the illustration’s height.',
      facts: ['Title ≤ 3 lines', 'Copy + 80', 'Accent + Field'],
      hero: {
        trail: software.trail,
        title: software.hero.title,
        body: [software.hero.lead],
        actions: software.hero.actions,
        arrangement: 'beside',
        media: software.media,
        tags: software.hero.tags,
      },
    },
    {
      id: 'photograph',
      short: 'Photograph · texture',
      name: 'Photograph beside the copy, with the hero-foot texture',
      note: 'The kit/home opening. A 5:4 photograph at 572 × 458, top-aligned on the eyebrow, radius 8 and no frame. The texture rises from the foot of the copy side, inside the padding, clear of every glyph.',
      facts: ['Ends at 723', 'Accent + Texture', 'hero-foot · start'],
      hero: {
        eyebrow: 'Product design and engineering studio',
        title: 'Product design that holds up in production',
        body: [
          'We design and build B2B, workflow and AI products, from the first model of the work to the code that ships it.',
        ],
        actions: [START, { label: 'See the work', href: ROUTES.caseStudies }],
        arrangement: 'beside',
        media: {
          type: 'image',
          ratio: '5/4',
          image: photo(
            'pair-at-laptop-sticky-wall',
            'Two designers at a laptop in front of a wall of sticky notes',
          ),
        },
        texture: true,
      },
    },
    {
      id: 'announcement',
      short: 'Photograph · announcement',
      name: 'Photograph with an announcement above',
      note: 'One line of news above the hero: a mark, a sentence and a link. It is never a second ask, so the band keeps one solid. Showcase pages only.',
      facts: ['Ends ≤ 797', 'Accent + Texture', 'Strip + 64'],
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
        arrangement: 'beside',
        media: {
          type: 'image',
          ratio: '5/4',
          image: photo(
            'workshop-whiteboard-lounge',
            'A facilitator at a whiteboard of sticky notes, three people listening from a sofa',
          ),
        },
        texture: true,
      },
    },
    {
      id: 'text-field',
      short: 'Text · field texture',
      name: 'No media, with the hero-field texture',
      note: 'The kit/services-index opening. The display title at its 26ch measure, then the lead and the actions, and the field in the empty end half. Below 1024 the field becomes a horizon along the foot.',
      facts: ['≈ 676 with trail', 'Accent + Texture', 'hero-field · end'],
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
      facts: ['≈ 676 with trail', 'Accent only'],
      hero: {
        trail: heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: 'How we work', href: ROUTES.howWeWork },
          ],
          'From the first call to the handover',
          (trail) => <Breadcrumbs {...trail} />,
        ),
        title: 'From the first call to the handover',
        body: [
          'What happens in each week of an engagement, who is in the room, and what you hold at the end of it.',
        ],
        actions: [{ label: 'Book an intro call', href: ROUTES.contact }],
      },
    },
    {
      id: 'category',
      short: 'Category eyebrow',
      name: 'Eyebrow as a category beside the trail',
      note: '“Case study · Fintech” stands 32 under Home / Case studies: a section crumb is repeated only by equalling it, and this says a format and a sector the trail cannot. A bare “Case study”, or “Ledgerline · Fintech” under a Ledgerline crumb, would be dropped.',
      facts: ['Ends ≤ 830', 'Accent only', 'Two-tier eyebrow rule'],
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
          image: photo(
            'board-review-backs',
            'A team reviewing a wall of sticky notes, seen from behind',
          ),
        },
      },
    },
    {
      id: 'centred',
      short: 'Centred comparison',
      name: 'Centred head, media below — the owner comparison',
      note: 'Product Design’s content in the other shape: the trail, a centred display title, the lead and the actions, then the illustration at the full 1240. It cannot end above the fold, so it is exempt from the rule and shown here beside the locked shape (01). H2 stands unless the owner picks this.',
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
          <Cluster as="ul" colGap="tight" rowGap="tight">
            {variation.facts.map((fact) => (
              <li key={fact}>
                <Tag>{fact}</Tag>
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
      <Section density="open">
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · Hero family</p>
            <h1 className={t.display}>Every page opens the same way, in one of nine shapes</h1>
            <p className={t.lead}>
              One PageHero, three kinds of media and two alignments. Each shape is measured at
              1470 × 830 and at 390, with the nav above it, and spends at most two blue masses.
            </p>
          </Layout>
          <Layout as="ol" rowGap="text">
            {list.map((variation, index) => (
              <li key={variation.id}>
                <Button
                  as="a"
                  href={`#${variation.id}`}
                  emphasis="link"
                  size="sm"
                  icon={<Icon name="arrow-right" />}
                >
                  {`${String(index + 1).padStart(2, '0')} · ${variation.short}`}
                </Button>
              </li>
            ))}
          </Layout>
        </Layout>
      </Section>

      {list.map((variation, index) => (
        <div key={variation.id} data-kit-variation={variation.id}>
          <Label index={index} variation={variation} />
          {variation.exempt ? (
            <div data-fold-exempt={variation.exempt}>
              <PageHero {...variation.hero} />
            </div>
          ) : (
            <PageHero {...variation.hero} />
          )}
        </div>
      ))}
    </>
  );
}
