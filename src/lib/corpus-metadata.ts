import type { Metadata } from 'next';

import type { CorpusPage } from './corpus-types';

/**
 * A corpus page's `<head>`, from its `seo` block as authored: title, description, canonical and
 * robots. `og_image` is `IMAGE_ASSET_REQUIRED` on most pages, so no Open Graph image is declared and
 * `ogImageAlt` has nothing to describe yet; both arrive with the assets.
 *
 * `robots` is the frontmatter's `index,follow` / `noindex,nofollow` string, read as the two
 * directives it is rather than passed through as an opaque value.
 */
export function corpusMetadata(page: CorpusPage): Metadata {
  const { seo } = page;
  const directives = seo.robots.split(',').map((part) => part.trim().toLowerCase());
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
    robots: {
      index: !directives.includes('noindex'),
      follow: !directives.includes('nofollow'),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: seo.canonical,
    },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
  };
}
