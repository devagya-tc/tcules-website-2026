'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Icon, Layout, Media, type MediaImage } from '@/components';
import { cx } from '@/lib/cx';

import styles from './VideoTestimonial.module.css';

/**
 * VideoTestimonial — a client interview on film: the poster, a play control, the line pulled from
 * it and who said it (7 Oct review, r7-video).
 *
 * ── The contract ─────────────────────────────────────────────────────────────────
 *   No autoplay, ever. Before the reader presses play there is no <video> source fetched at all:
 *   the element is in the DOM with `preload="none"`, under the poster, so the page costs one
 *   photograph. Sound starts only because a person pressed a button.
 *   The poster is a photograph from the record (Media, the photograph radius), and NO TYPE is set
 *   on it (owner ruling): the running time and the captions note are in the text beside it.
 *   Pressing play swaps the poster for the native player in the same 16:9 box, starts it inside
 *   the click (a user gesture, so the browser lets it play with sound), and moves focus to the
 *   player, so the next key a keyboard user presses reaches its controls.
 *   Captions are a TRACK SLOT: `captions` renders one <track kind="captions"> per file. A film
 *   with captions says so in its label before it is played.
 *   Reduced motion: the poster's push-in and the disc's swell are dropped, not shortened.
 *
 * ── Semantics ────────────────────────────────────────────────────────────────────
 *   A <figure>: the film is the figure, and its caption is the pulled line (a <blockquote>) and
 *   the speaker. The play control is a <button> whose name says what it plays and for how long.
 *
 * ── Variants ─────────────────────────────────────────────────────────────────────
 *   featured   a large poster with the quote beside it from 1024 — [3, 2], 64 between — and the
 *              quote under it below. The band's one object; takes the display quote role.
 *   in-row     a smaller poster with the quote under it, made to sit as one item of a row beside
 *              text quotes. Takes the reading quote role, the size its text-quote peers set.
 *
 * Owns no band and no ground; the caller places it in a Section, and the surface reaches it through
 * data-surface. Imports components only — a pattern does not import a pattern, so the two text
 * quotes an in-row film sits beside are the caller's (Proof, compact).
 */

export type VideoTestimonialVariant = 'featured' | 'in-row';

/** One encoding of the film. Listed best first; the browser plays the first type it supports. */
export type VideoTestimonialSource = {
  src: string;
  /** The MIME type, e.g. `video/mp4` or `video/webm`. Required so the browser can skip what it cannot play without fetching it. */
  type: string;
};

/** One captions file (WebVTT). The slot is a list so a second language is data, not a prop. */
export type VideoTestimonialCaptions = {
  src: string;
  /** BCP 47 language tag of the captions, e.g. `en`. */
  srclang: string;
  /** What the player's captions menu calls this track, e.g. "English". */
  label: string;
};

export type VideoTestimonialFilm = {
  sources: readonly VideoTestimonialSource[];
  /** The track slot. Empty or absent: no captions, and the label does not claim any. */
  captions?: readonly VideoTestimonialCaptions[];
  /** Running time as published, `m:ss` — "4:52". Read in the label and in the control's name. */
  duration: string;
};

export type VideoTestimonialProps = {
  variant: VideoTestimonialVariant;
  /** The poster: a photograph record, as Media takes it. Its `alt` is ignored — see `film`. */
  poster: MediaImage;
  film: VideoTestimonialFilm;
  /** The line pulled from the interview. Plain text; no quotation marks — the rule says it is speech. */
  quote: string;
  /** The speaker. Required: named attribution is mandatory, as for every quote on the site. */
  name: string;
  /** The speaker's title. Optional; missing, it leaves no separator. */
  role?: string;
  /** The client. */
  company: string;
  /**
   * What the film is called, in the label above the quote — "Client interview" by default. Sentence
   * case as authored; the mono role uppercases it in presentation only.
   */
  label?: string;
  /**
   * The rendered width of the poster, as a `sizes` list. The variant has a default for its usual
   * placement; pass one when the caller's track is a different width.
   */
  sizes?: string;
};

/* The poster widths at 1470, from Section's 1240 column (src/lib/image-sizes.ts arithmetic):
   featured is the 3 of [3, 2] with a 64 seam, (1240 - 64) * 3/5 ≈ 706; in-row is one of three
   tracks at 32, ≈ 392. Below 1024 each is the full column, the viewport less two 32 gutters. */
const SIZES: Record<VideoTestimonialVariant, string> = {
  featured: '(min-width: 1024px) 706px, calc(100vw - 64px)',
  'in-row': '(min-width: 1024px) 392px, calc(100vw - 64px)',
};

/** "4:52" → "4 minutes 52 seconds", so the control's name is not read as a clock time. */
function spokenDuration(duration: string): string {
  const [m = Number.NaN, s = Number.NaN] = duration.split(':').map((n) => Number.parseInt(n, 10));
  if (!Number.isFinite(m) || !Number.isFinite(s)) return duration;
  const parts: string[] = [];
  if (m > 0) parts.push(`${m} minute${m === 1 ? '' : 's'}`);
  if (s > 0) parts.push(`${s} second${s === 1 ? '' : 's'}`);
  return parts.join(' ') || duration;
}

export function VideoTestimonial({
  variant,
  poster,
  film,
  quote,
  name,
  role,
  company,
  label = 'Client interview',
  sizes,
}: VideoTestimonialProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const quoteId = useId();
  const captioned = (film.captions?.length ?? 0) > 0;
  const featured = variant === 'featured';

  function play() {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    /* Inside the click: a user gesture, so playback with sound is allowed. If the browser still
       refuses (a policy, a missing codec), the native controls are showing and the reader can
       press play there. */
    void video.play().catch(() => undefined);
  }

  /* Focus follows the film. The poster button is gone once playing, so without this the focus
     would fall to <body>; on the player instead, Space and the arrow keys reach its controls. */
  useEffect(() => {
    if (playing) videoRef.current?.focus();
  }, [playing]);

  const meta = [label, film.duration, captioned ? 'Captions' : undefined].filter(Boolean);
  const attribution = [role, company].filter(Boolean).join(', ');

  const screen = (
    <div className={cx(styles.screen, playing && styles.playing)}>
      <video
        ref={videoRef}
        className={styles.video}
        controls={playing}
        preload="none"
        playsInline
        tabIndex={playing ? 0 : -1}
        aria-hidden={playing ? undefined : true}
        aria-label={`${label}: ${name}, ${company}`}
      >
        {film.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        {film.captions?.map((track, i) => (
          <track
            key={track.src}
            kind="captions"
            src={track.src}
            srcLang={track.srclang}
            label={track.label}
            default={i === 0}
          />
        ))}
      </video>
      {playing ? null : (
        <button
          type="button"
          className={styles.poster}
          onClick={play}
          aria-label={`Play ${label}: ${name}, ${spokenDuration(film.duration)}${captioned ? ', captioned' : ''}`}
          aria-describedby={quoteId}
        >
          <span className={styles.frame}>
            <span className={styles.zoom}>
              <Media
                image={{ ...poster, alt: '' }}
                sizes={sizes ?? SIZES[variant]}
                fit="fill"
                edge="placement"
              />
            </span>
          </span>
          <span className={cx(styles.play, featured ? styles.playLg : styles.playMd)} aria-hidden>
            <Icon name="play" />
          </span>
        </button>
      )}
    </div>
  );

  const caption = (
    <Layout as="figcaption" rowGap={featured ? 'stack' : 'block'} className={styles.caption}>
      <Layout rowGap="block">
        <p className={styles.meta}>{meta.join(' · ')}</p>
        <blockquote id={quoteId} className={styles.quote}>
          <p>{quote}</p>
        </blockquote>
      </Layout>
      <p className={styles.attribution}>
        <span className={styles.name}>{name}</span>
        {attribution ? <span className={styles.role}>{attribution}</span> : null}
      </p>
    </Layout>
  );

  return (
    <Layout
      as="figure"
      columns={featured ? { base: 1, lg: [3, 2] } : undefined}
      colGap="column"
      rowGap={featured ? 'stack' : 'block'}
      align={featured ? 'center' : undefined}
      className={cx(styles.root, featured ? styles.featured : styles.inRow)}
    >
      {screen}
      {caption}
    </Layout>
  );
}
