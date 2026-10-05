import { Fragment } from 'react';

import { Cluster, Tag } from '@/components';
import {
  Breadcrumbs,
  ContentSection,
  CtaSection,
  EnquiryForm,
  PageHero,
  type BreadcrumbItem,
} from '@/patterns';
import type { ServiceStory } from '@/lib/service-story';
import { ROUTES, servicePath } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';

import { StoryBlockView } from './Blocks';

export type ServicePageProps = {
  story: ServiceStory;
  breadcrumbs: readonly BreadcrumbItem[];
  /** Where the enquiry form posts. */
  formAction: string;
  /** Review mode: render the image slots the page is designed to carry but does not have yet. */
  slots?: boolean;
};

/**
 * TIER 3 — the service page, composed from a ServiceStory.
 *
 * The page makes three decisions for every service line, once:
 *
 *   1. It opens on the line's illustration, beside the copy (ruling H1: the template chooses the
 *      arrangement per family). A method has no screen to show, so the illustration IS the hero's
 *      image — ch05 §1 and visual-assets-plan § The mapping. The trail sits inside the hero, and
 *      there is no hero eyebrow: the last crumb is the service's name, and an eyebrow under it
 *      would say it twice (kit `fdn-top`, visual-direction § 2.3). One solid action, one neutral
 *      link; the hero spends its Accent and the illustration is its Field.
 *   2. Every section is a ContentSection, and every block inside it is a named job with its own
 *      shape (Blocks.tsx, Diagrams.tsx). Variety comes from the ARRANGEMENT of those jobs, never
 *      from the ground: paper throughout, tint earned by the proof band and the page's asks — a mid-page
 *      offer band (CtaSection `offer`, a `StoryOffer` section) and the close.
 *   3. It closes on the ask as a form, not as a paragraph. The CMS close was heading, text and a
 *      disclaimer with nothing to act on.
 */
export function ServicePage({
  story,
  breadcrumbs,
  formAction,
  slots = false,
}: ServicePageProps) {
  const { hero, sections, close } = story;

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
      >
        {hero.tags && hero.tags.length > 0 ? (
          <Cluster as="ul" colGap="tight" rowGap="tight">
            {hero.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </Cluster>
        ) : null}
      </PageHero>

      {sections.map((section) =>
        section.type === 'offer' ? (
          <CtaSection
            key={section.id}
            arrangement="offer"
            surface="tint"
            eyebrow={section.eyebrow}
            heading={section.heading}
            body={[section.body]}
            points={section.points}
            actions={section.actions}
          />
        ) : (
          <ContentSection
            key={section.id}
            heading={section.heading}
            headingId={section.id}
            eyebrow={section.eyebrow}
            lead={section.lead}
            surface={section.surface ?? 'paper'}
            density={section.density}
            arrangement={section.arrangement}
          >
            {section.blocks.map((block, index) => (
              <Fragment key={`${section.id}-${index}`}>
                <StoryBlockView block={block} slots={slots} />
              </Fragment>
            ))}
          </ContentSection>
        ),
      )}

      <div id="enquiry">
        <CtaSection
          surface="tint"
          heading={close.heading}
          body={[close.body, close.note]}
          points={close.points}
          form={
            <EnquiryForm
              action={formAction}
              scheduleHref={ROUTES.contact}
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
      </div>
    </>
  );
}
