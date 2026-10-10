import {
  Breadcrumbs,
  CtaSection,
  EnquiryForm,
  PageHero,
  type BreadcrumbItem,
} from '@/patterns';
import type { ServiceStory } from '@/lib/service-story';
import { ANCHORS, ROUTES, servicePath } from '@/lib/routes';
import { ILLUSTRATION_LEGENDS } from '@/lib/illustration-legends';
import { heroTrail } from '@/lib/trail';

import { BandView } from './Bands';
import { closeSurface, planBands, type Band } from './plan';
import { withStandIns } from './standIns';

/** A band's React key: the id of the story entry it renders. */
function bandKey(band: Band): string {
  switch (band.kind) {
    case 'section':
      return band.section.id;
    case 'offer':
      return band.offer.id;
    case 'banner':
      return band.banner.id;
    case 'statement':
      return band.statement.id;
  }
}

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
 *      hero, the sourced rating in the eyebrow's place (never a text eyebrow: the last crumb already
 *      names the service), one solid action and its ghost partner. The hero spends the solid and
 *      the illustration, so it carries no texture.
 *   2. It decides every band's ARRANGEMENT from the job the band's blocks do (plan.ts), never from
 *      the story — a story says what a section argues, and the template says how it is laid out.
 *      Each job is one kit archetype (§ 3.4), and the plan applies the page rules no band can see
 *      alone: centred heads never adjacent, beside bands mirrored, the § 5.6 photographs assigned,
 *      the § 6.4 texture signature placed.
 *   3. Paper carries the page. Tint is the proof band alone (§ 1.7); no ground is blue (§ 4).
 *   4. It closes on the ask as the compact form (r7-form: name, email, one question) on paper,
 *      the `closing` texture under the copy (§ 3.4 L). The close is the enquiry anchor (ANCHORS.enquiry), so every "Start a project" lands on it.
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
  /* The sourced rating leads the hero, in the eyebrow's place (r7-hero, owner 7 Oct 2026), where a
     story names one. It is not lent from the client strip: the badge adds a row over the title,
     and a hero written without it can lose the fold (software-development's ran 843 against 830). */
  const { rating } = hero;

  return (
    <>
      <PageHero
        surface="paper"
        data-band="A"
        data-fold-hero=""
        trail={heroTrail(breadcrumbs, hero.title, (t) => (
          <Breadcrumbs {...t} />
        ))}
        rating={rating}
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
          /* The numbered cut and its legend, generated per drawing by
             scripts/illustrations-phone.mjs. Looked up here, by the drawing's src, because PageHero
             renders only what it is handed. */
          cut: ILLUSTRATION_LEGENDS[hero.illustration.src],
        }}
        tags={hero.tags ?? []}
      />

      {bands.map((band) => (
        <BandView key={bandKey(band)} band={band} labels={resolved.labels} slots={slots} />
      ))}

      <CtaSection
        id={ANCHORS.enquiry}
        data-band="L"
        surface={closeSurface(bands)}
        eyebrow={close.eyebrow}
        heading={close.heading}
        body={[close.body, close.note]}
        points={close.points}
        form={
          <EnquiryForm
            variant="compact"
            action={formAction}
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
