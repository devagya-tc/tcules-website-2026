import type { Metadata } from 'next';

import {
  BrandMark,
  Icon,
  Layout,
  RatingBadge,
  Section,
  Stat,
  type IconName,
} from '@/components';
import { getNavigation } from '@/content';
import {
  BlockCardSet,
  ContentSection,
  CtaRow,
  CtaSection,
  EngagementModel,
  EnquiryForm,
  LogoGrid,
  PageHero,
  Proof,
  type BlockCardSetItem,
  type CtaContact,
  type EngagementPoint,
  type ProofQuote,
} from '@/patterns';
import { getKitPhoto } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { CLIENTS } from '../../_specimen/clients';

export const metadata: Metadata = {
  title: 'Home · kit showcase | Design',
  robots: { index: false, follow: false },
};

/**
 * /design/kit/home — the home page recomposed from the components reviewed on 7–9 Oct 2026, each
 * used once, in an order that reads as one argument (review-7-oct.md; visual-direction § Owner
 * rulings · 9 Oct). Seven bands:
 *
 *    1  A        the hero: a plain eyebrow (never a crumb, never the rating), the photograph
 *                beside, ONE blue solid and its blue ghost — the page's main action
 *    2  H        who trusts us: the closed, rounded LogoGrid led by the Clutch RatingBadge, alone
 *    3  How      how we work: EngagementModel, full — the drawing beside its three points
 *    4  Facts    the record on tint: three plain Stats, nothing else in the band
 *    5  C-icon   what we do: a stacked head over six linked icon cards in borderless boxes, no
 *                photograph (owner, 9 Oct: a section of clickable cards takes no decorative image)
 *    6  G        a client in their words: Proof featured, the large portrait beside the quote, a
 *                link-button footer; no rating beside it (r7-testimonials)
 *    7  L        the close on tint: copy, the contact strip and the compact EnquiryForm
 *
 * Shapes down the page: split photo · boxed grid · drawing + list · numeral row · card grid ·
 * split portrait (photo at the start, the hero's at the end) · split form. Never two text-heavy bands adjacent: the card grid sits
 * between the numerals and the portrait. Grounds: paper ×3, tint, paper ×2, tint — the two tints
 * never touch. Each proof kind gets its own band (§ 5.8): logos + rating, record, testimonial.
 * Every action other than the hero's pair is a link button. Copy is showcase copy written inline
 * (§ 8.4); the figures are the owner-approved placeholders (8 Oct).
 */

/* ── 3 · EngagementModel — the how-we-work kit's copy (from tcules.com; no invented claims). */
const POINTS: readonly [EngagementPoint, EngagementPoint, EngagementPoint] = [
  {
    title: 'One team, first question to ship',
    body: 'The people who ask the first question are the people who ship the build, so nothing is lost in a handoff.',
  },
  {
    title: 'Part-time, and the idle time is ours',
    body: 'People are assigned to your product part-time. When the work goes quiet, the cost of that idle time is absorbed by Tcules.',
  },
  {
    title: 'A team that stretches',
    body: 'When the work peaks, the team stretches to meet it, so your product never waits on our capacity.',
  },
];

/* ── 4 · Facts — the record alone: no rating, no logos, no quote. */
const RECORD = [
  { value: '11', unit: 'years', label: 'Designing and shipping software with product teams.' },
  {
    value: '64',
    unit: 'products',
    label: 'Designed and shipped with teams in fintech, health and logistics.',
  },
  {
    value: '18',
    unit: 'people',
    label: 'Designers, researchers and design engineers, in one studio.',
  },
] as const;

/* ── 5 · C-icon — whole-card links; titles ≤ 5 words, bodies ≤ 14. */
const service = (
  id: string,
  icon: IconName,
  title: string,
  body: string,
  href: string,
): BlockCardSetItem => ({ id, icon, title, body, href });

const SERVICES: readonly BlockCardSetItem[] = [
  service(
    'home-product',
    'ruler-pen',
    'Product design',
    'For a product that works on paper but fights the people who use it daily.',
    ROUTES.productDesign,
  ),
  service(
    'home-systems',
    'layers',
    'Design systems',
    'For teams rebuilding the same button in every product, a little differently.',
    ROUTES.designSystems,
  ),
  service(
    'home-ai',
    'stars',
    'AI product UX',
    'For AI features that impress in the demo, then lose people’s trust in use.',
    ROUTES.aiProductUx,
  ),
  service(
    'home-engineering',
    'monitor',
    'Design engineering',
    'For designs that change shape somewhere between the file and the build.',
    ROUTES.designEngineering,
  ),
  service(
    'home-software',
    'database',
    'Software development',
    'For the build behind the design, held to the same standard the design set.',
    ROUTES.softwareDevelopment,
  ),
  service(
    'home-modern',
    'shield-check',
    'Product modernisation',
    'For a product old enough that every change feels like a risk to someone.',
    ROUTES.productModernisation,
  ),
];

/* ── 6 · G featured — a fictional client (§ 8.4); featured is the one place a portrait belongs. */
const portrait = getKitPhoto('portrait-woman-sunset-smile');
const QUOTE: ProofQuote = {
  name: 'Hannah Reiss',
  role: 'Head of Product',
  company: 'Fernbrook Health',
  portrait: {
    src: portrait.src,
    width: portrait.width,
    height: portrait.height,
    sources: portrait.sources,
  },
  quoteHtml:
    '<p>Every screen they cut was one our clinicians never had to learn, and every screen that stayed was argued for with evidence from our wards.</p>',
};

/* ── 7 · L — the contact strip under the close's copy. No reply-time cell: the form's own caption
   says it, and a second statement of it beside the form was the same claim twice. */
const CONTACT: readonly CtaContact[] = [
  { label: 'Write', value: 'hello@tcules.com', href: 'mailto:hello@tcules.com' },
  { label: 'Studio', value: 'Ahmedabad, India' },
];

const FORM_CONTEXT = {
  originRoute: ROUTES.designKitHome,
  placement: 'kit-home-close',
  family: 'home',
  serviceOrAudit: 'kit-home',
  referrer: '',
  campaign: '',
} as const;

export default async function KitHomePage() {
  const { footer } = await getNavigation();
  const rating = footer.brand.rating;

  return (
    <>
      {/* 1 · A — the page's one main action: the blue solid and its blue ghost. */}
      <PageHero
        data-band="A"
        data-fold-hero=""
        eyebrow="Product design studio"
        title="From first decision to shipped code"
        body={[
          'A senior team that settles what your product should do, designs how it behaves, and builds it in your codebase.',
        ]}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See the work', href: ROUTES.caseStudies },
        ]}
        arrangement="beside"
        media={{
          type: 'image',
          ratio: '5/4',
          image: getKitPhoto('pair-at-laptop-sticky-wall'),
        }}
      />

      {/* 2 · H — the client marks, led by the sourced rating; no other proof in the band. */}
      <Section data-band="H" aria-labelledby="home-clients">
        <LogoGrid
          marks={CLIENTS}
          badge={
            rating ? (
              <RatingBadge
                score={rating.score}
                platform={rating.platform}
                href={rating.href}
                icon={<Icon name="star" size="sm" />}
                mark={<BrandMark name="clutch" />}
              />
            ) : undefined
          }
          context="Product teams we have designed and shipped with"
          headingId="home-clients"
          align="center"
          edges="closed"
        />
      </Section>

      {/* 3 · How we work — the USP, full. Its one action is a link button. */}
      <EngagementModel
        eyebrow="How we work"
        heading="One accountable team, from the first question to the shipped build."
        headingId="home-how"
        lead="Less translation loss. Fewer handoffs. More ownership in the messy middle."
        points={POINTS}
        axis={['First question', 'Shipped build']}
        action={{ label: 'How we work', href: ROUTES.howWeWork }}
      />

      {/* 4 · Facts — the studio's record on its own, on tint. */}
      <ContentSection
        data-band="facts"
        surface="tint"
        eyebrow="The studio"
        heading="A small studio with a long record"
        headingId="home-record"
        headingSize="md"
      >
        <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="stack">
          {RECORD.map((fact) => (
            <Stat key={fact.unit} as="li" {...fact} />
          ))}
        </Layout>
      </ContentSection>

      {/* 5 · C-icon — head above, six linked icon cards in borderless boxes, no image. */}
      <ContentSection
        data-band="C-icon"
        eyebrow="What we do"
        heading="Find the service that fits"
        headingId="home-services"
        lead="Each has its own page. Most teams start with one, then add a second once it ships."
      >
        <BlockCardSet items={SERVICES} lead="none" across={3} frame="box" />
      </ContentSection>

      {/* 6 · G — one client, the large portrait beside the quote (mirrored: the hero's photo is at
          the end too, so the portrait takes the other side). No rating beside it. */}
      <Section data-band="G-featured">
        <Proof
          arrangement="featured"
          quote={QUOTE}
          footer={
            <CtaRow
              rule={false}
              actions={[{ label: 'Read the case', href: ROUTES.caseStudies }]}
            />
          }
        />
      </Section>

      {/* 7 · L — the close: copy, the contact strip and the compact form, on tint. */}
      <CtaSection
        data-band="L"
        eyebrow="Start a project"
        heading="Tell us what you are building"
        body={[
          'Three lines are enough to start: what the product does, who uses it, and the part that is not working yet.',
        ]}
        contact={CONTACT}
        form={
          <EnquiryForm
            variant="compact"
            action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
            context={FORM_CONTEXT}
          />
        }
      />
    </>
  );
}
