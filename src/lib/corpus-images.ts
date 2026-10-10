import type { CorpusMediaBinding } from './corpus-types';
import { CORPUS_ASSET_SIZES } from './corpus-assets.generated';

/**
 * An image record for an asset the corpus frontmatter binds (`media_bindings`, status
 * BOUND_EXISTING_PUBLIC_ASSET), with its measured size and the site's delivery ladder.
 *
 * Structurally a `MediaImage` (lib is a leaf). The kind is `capture`: every bound asset in the
 * corpus is a product screen or a studio photograph the content team placed, and Media renders a
 * capture whole, with its hairline, so nothing is graded or re-cropped by the kit's photograph rules.
 *
 * `sources` are Cloudinary width transforms (the same 1240, 652 and 320 rungs Strapi derives for
 * every CMS image, Media.md ruling M2), so a 392px card is not handed a 5760px master. They are
 * made only where a rung is narrower than the master, and not for an animated GIF.
 *
 * `alt` is the binding's `alt_intent`, as authored. A binding with none gets an empty alt, which is
 * honest about the gap: the file carries no description to render, and a proposal asks for one.
 */
export type CorpusImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: 'capture';
  sources?: readonly { src: string; width: number }[];
};

const RUNGS = [1240, 652, 320] as const;
const CLOUDINARY = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;

export function corpusImage(binding: CorpusMediaBinding): CorpusImage {
  const url = binding.assetUri;
  if (!url) throw new Error(`Binding "${binding.id}" has no asset_uri; use a placeholder.`);
  const size = CORPUS_ASSET_SIZES[url];
  if (!size) {
    throw new Error(
      `Bound asset for "${binding.id}" is not measured (${url}). Run \`npm run corpus:assets\`.`,
    );
  }
  const match = CLOUDINARY.exec(url);
  const animated = /\.gif($|\?)/i.test(url);
  const sources =
    match && !animated
      ? RUNGS.filter((w) => w < size.width).map((w) => ({
          src: `${match[1]}w_${w},c_limit,q_auto/${match[2]}`,
          width: w,
        }))
      : undefined;
  return {
    src: url,
    alt: binding.altIntent ?? '',
    width: size.width,
    height: size.height,
    kind: 'capture',
    ...(sources && sources.length > 0 ? { sources } : {}),
  };
}

/**
 * A bound binding by its id (`product_design_dealpath`). Ids, not `supports_section`: the frontmatter
 * labels a case artefact's section loosely (`proof`), and the id is the one name the content team
 * gave each asset.
 */
export function boundBinding(
  bindings: readonly CorpusMediaBinding[],
  id: string,
): CorpusMediaBinding | undefined {
  return bindings.find((b) => b.id === id && b.bound);
}
