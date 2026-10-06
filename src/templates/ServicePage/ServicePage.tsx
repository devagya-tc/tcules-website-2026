import {
  Breadcrumbs,
  CtaSection,
  EnquiryForm,
  PageHero,
  type BreadcrumbItem,
} from '@/patterns';
import { TextureClosing } from '@/components';
import type { ServiceStory } from '@/lib/service-story';
import { ANCHORS, ROUTES, servicePath } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';

import { BandView } from './Bands';
import { planBands } from './plan';
import { withStandIns } from './standIns';

export type ServicePageProps = {
  story: ServiceStory;
  breadcrumbs: readonly BreadcrumbItem[];
  /** Where the enquiry form posts. */
  formAction: string;
  /** Review mode: render the image slots the page is designed to carry but does not have yet. */
  slots?: boolean;
};

/**
 * TIER 3 — the service page, composed from a ServiceStory out of the kit's bands (visual-direction
 * § 8.2, cmp-service-pages, 6 Oct 2026).
 *
 * The page makes four decisions for every service line, once:
 *
 *   1. It opens on the line's illustration beside the copy (ruling H2, § 2.3): the trail inside the
 *      hero, no hero eyebrow (the last crumb already names the service), one solid action and one
 *      blue link. The hero spends the solid and the illustration, so it carries no texture.
 *   2. It decides every band's ARRANGEMENT from the job the band's blocks do (plan.ts), never from
 *      the story — a story says what a section argues, and the template says how it is laid out.
 *      Each job is one kit archetype (§ 3.4), and the plan applies the page rules no band can see
 *      alone: centred heads never adjacent, beside bands mirrored, the § 5.6 photographs assigned,
 *      the § 6.4 texture signature placed.
 *   3. Paper carries the page. Tint is the proof band alone (§ 1.7); no ground is blue (§ 4).
 *   4. It closes on the ask as a form on paper, the `closing` texture under the copy (§ 3.4 L). The
 *      close is the enquiry anchor (ANCHORS.enquiry), so every "Start a project" lands on it.
 */
export function ServicePage({
  story,
  breadcrumbs,
  formAction,
  slots = false,
}: ServicePageProps) {
  /* Every coverless case and resource card takes a stand-in from the story's pool before anything
     renders (visual-direction § 5.7), so no block below ever sees a card it would draw half-empty. */
  const resolved = withStandIns(story);
  const { hero, close } = resolved;
  const bands = planBands(resolved);

  return (
    <>
      <PageHero
        surface="paper"
        trail={heroTrail(breadcrumbs, hero.title, (t) => (
          <Breadcrumbs {...t} />
        ))}
        title={hero.title}
        body={[hero.lead]}
        actions={hero.actions}
        arrangement="beside"
        media={{
          type: 'image',
          image: {
            src: hero.illustration.src,
            width: hero.illustration.width,
            height: hero.illustration.height,
            alt: '',
            kind: 'illustration',
          },
        }}
        tags={hero.tags ?? []}
      />

      {bands.map((band) => (
        <BandView
          key={
            band.kind === 'section'
              ? band.section.id
              : band.kind === 'offer'
                ? band.offer.id
                : band.banner.id
          }
          band={band}
          labels={resolved.labels}
          slots={slots}
        />
      ))}

      <CtaSection
        id={ANCHORS.enquiry}
        heading={close.heading}
        body={[close.body, close.note]}
        points={close.points}
        texture={<TextureClosing />}
        form={
          <EnquiryForm
            action={formAction}
            scheduleHref={ROUTES.contact}
            nextSteps={close.points}
            context={{
              originRoute: servicePath(story.slug),
              placement: 'service-close',
              family: 'service',
              serviceOrAudit: story.slug,
              referrer: '',
              campaign: '',
            }}
          />
        }
      />
    </>
  );
}
