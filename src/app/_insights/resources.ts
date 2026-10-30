import type { BlogResource, PodcastResource } from '@/content';
import { blogPath } from '@/lib/routes';
import type { InsightItem } from '@/templates';

/**
 * An insight page's "Explore other resources" as the site's insight cards: format, authored date,
 * own cover or drawn scene. Shared by the article, podcast and event routes, which all list blogs.
 */
export function resourceItems(
  resources: readonly (BlogResource | PodcastResource)[],
): InsightItem[] {
  return resources.map((resource) => ({
    id: resource.documentId,
    kind: resource.kind,
    title: resource.title,
    href: blogPath(resource.slug),
    ...(resource.description ? { description: resource.description } : {}),
    ...(resource.image
      ? {
          cover: {
            src: resource.image.src,
            alt: resource.image.alt,
            ...(resource.image.width && resource.image.height
              ? { width: resource.image.width, height: resource.image.height }
              : {}),
            ...(resource.image.sources ? { sources: resource.image.sources } : {}),
            ...(resource.image.kind ? { kind: resource.image.kind } : {}),
          },
        }
      : {}),
    ...(resource.publishedAt ? { publishedAt: resource.publishedAt } : {}),
    ...(resource.coverScene ? { scene: resource.coverScene } : {}),
  }));
}
