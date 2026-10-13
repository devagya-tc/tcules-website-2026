import { getKitPhoto, type PhotoId } from '../../../lib/photos.ts';
import type { TestimonialAvatarRecord } from '../../corpus-types.ts';

/**
 * PLACEHOLDER — portraits for the testimonial card's circular avatar, keyed by testimonial id.
 *
 * NOT THE SPEAKERS. The owner asked on 11 Oct 2026 (home review, round 3) to "show circular avatar
 * images for some and no images for some so we can test how that looks". Every portrait below is a
 * stock studio portrait from the kit registry (`public/kit/photos/portrait-*`), assigned to fill
 * that brief on about half the home page's testimonials; none of them shows the named person. A
 * face printed beside a named client's words is a claim about who said them, so each MUST be
 * replaced with the speaker's own photograph (with their consent) or removed before launch.
 * docs/content-proposals.md P40 tracks it; `placeholder: true` is how a check finds every one left.
 *
 * Read only through `getTestimonialAvatars` (source.ts). A testimonial with no entry renders with
 * no avatar at all — never an initials monogram (banned, home round 3).
 */
const PLACEHOLDER = true;

const avatar = (id: PhotoId): TestimonialAvatarRecord => {
  const photo = getKitPhoto(id);
  return {
    src: photo.src,
    width: photo.width,
    height: photo.height,
    sources: photo.sources,
    placeholder: PLACEHOLDER,
  };
};

export const TESTIMONIAL_AVATARS: Readonly<Record<string, TestimonialAvatarRecord>> = {
  /* Home: selected work — the Doodle diptych has one, Eden AI's has none. */
  'FP-DOODLE-EFFICIENCY': avatar('portrait-woman-laughing'),
  /* Home: why teams choose Tcules — two of the four supporting quotes. */
  'CL-AUX-COMPLEXITY': avatar('portrait-man-blue-office'),
  'DRAFT-PRIMELIS-TEAM': avatar('portrait-man-glasses-stripes'),
  /* Home: what clients say — three of the six cards. */
  'CL-RINGIER-COLLAB': avatar('portrait-man-glasses'),
  'DRAFT-KNOVOS-CANDOUR': avatar('portrait-man-green'),
  'DRAFT-DOODLE-RESEARCH': avatar('portrait-woman-grey'),
};
