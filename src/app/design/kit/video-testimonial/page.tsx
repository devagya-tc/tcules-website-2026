import type { ReactNode } from 'react';

import { Button, Icon, Layout, Section } from '@/components';
import { getKitPhoto } from '@/lib/photos';
import {
  ContentSection,
  Proof,
  VideoTestimonial,
  type ProofQuote,
  type VideoTestimonialFilm,
} from '@/patterns';

import { specimenStyles as s } from '../../_specimen/Specimen';

/* ── Content ─────────────────────────────────────────────────────────────────────────
   FICTIONAL throughout (visual-direction § 5.8): invented people at invented companies, never
   beside a real mark or the real score. Two ~5-minute client interviews exist and are not yet
   delivered, so each film here is a STAND-IN: an 8-second silent clip recorded from the poster
   photograph itself (public/kit/video/), with a WebVTT captions file in the track slot. The poster,
   the play control, the swap to the player, the captions and the focus hand-off are all real; the
   running time printed is the interview's, not the clip's. */

const CHALKBOARD: VideoTestimonialFilm = {
  sources: [{ src: '/kit/video/interview-chalkboard.webm', type: 'video/webm' }],
  captions: [{ src: '/kit/video/interview-chalkboard.en.vtt', srclang: 'en', label: 'English' }],
  duration: '4:52',
};

const TABLET: VideoTestimonialFilm = {
  sources: [{ src: '/kit/video/interview-tablet.webm', type: 'video/webm' }],
  captions: [{ src: '/kit/video/interview-tablet.en.vtt', srclang: 'en', label: 'English' }],
  duration: '5:08',
};

const PEERS: readonly [ProofQuote, ProofQuote] = [
  {
    quoteHtml:
      '<p>Every decision came with the reason attached, so our board could follow the work without a deck.</p>',
    name: 'Mira Castell',
    role: 'COO',
    company: 'Harbourline',
  },
  {
    quoteHtml:
      '<p>They told us which of our ideas to drop, and they were right about all three of them.</p>',
    name: 'Tobias Wren',
    role: 'Founder',
    company: 'Quillmark',
  },
];

/* ── Showcase scaffolding ─────────────────────────────────────────────────────────── */

type Variation = { id: string; title: string; note: string };

const VARIATIONS = {
  featured: {
    id: 'featured',
    title: 'Featured, under a head',
    note: 'The band’s one object: a 16:9 poster in the 3 of [3, 2] at 64, the pulled line beside it at the display quote role (34), the label and the speaker hung on the quote’s text edge. Paper, with a stacked head.',
  },
  featuredBare: {
    id: 'featured-bare',
    title: 'Featured, alone on tint',
    note: 'No head: the film is the band. The same unit on tint — every colour comes from the surface, so nothing is re-specified. Different poster, different speaker.',
  },
  inRow: {
    id: 'in-row',
    title: 'In-row, beside two text quotes',
    note: 'Three peers at 32, bottom-aligned so the three speakers share a line. The film takes one track with the poster above its quote at the reading role (28) — the size its two Proof compact neighbours are set at — so the row reads as three voices, one of them on camera.',
  },
  ink: {
    id: 'ink',
    title: 'Surface proof: featured on ink',
    note: 'Token proof, not a recommended band — ink is reserved site-wide. The label and the rule lift to brandeis-300 and the disc stays the blue solid. Blue is not shown: blue is never a ground (owner ruling); its block exists so a nested surface cannot inherit the wrong ink.',
  },
} satisfies Record<string, Variation>;

const ORDER: Variation[] = [
  VARIATIONS.featured,
  VARIATIONS.featuredBare,
  VARIATIONS.inRow,
  VARIATIONS.ink,
];

const CONTRACT: { key: string; body: string }[] = [
  {
    key: 'No autoplay',
    body: 'Nothing loads until someone presses play — preload none, one photograph on the page. Sound starts only from that press.',
  },
  {
    key: 'Captions',
    body: 'A track slot: each WebVTT file is a <track kind="captions">, the first on by default. A captioned film says so before it plays.',
  },
  {
    key: 'Keyboard',
    body: 'The poster is one button, named for the film and its length. Pressing it hands focus to the player, so Space and the arrows work at once.',
  },
  {
    key: 'Reduced motion',
    body: 'The poster’s push-in and the disc’s swell are dropped, not shortened. The hover still darkens the disc: that is a state, not motion.',
  },
];

function Label({ variation }: { variation: Variation }) {
  const n = String(ORDER.indexOf(variation) + 1).padStart(2, '0');
  return (
    <Section id={variation.id}>
      <Layout rowGap="tight" className={s.spec}>
        <p className={s.specTitle}>
          Video · {n} — {variation.title}
        </p>
        <p className={s.specNote}>{variation.note}</p>
      </Layout>
    </Section>
  );
}

function Band({ variation, children }: { variation: Variation; children: ReactNode }) {
  return (
    <>
      <Label variation={variation} />
      {children}
    </>
  );
}

export default function VideoTestimonialKitPage() {
  return (
    <>
      {/* ── Intro ─────────────────────────────────────────────────────────────────── */}
      <Section>
        <Layout columns={{ base: 1, lg: [5, 7] }} colGap="column" rowGap="stack">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <p className={s.eyebrow}>UI kit · Family G</p>
              <h1>Video testimonial</h1>
              <p className={s.specNote}>
                A client interview, set so the reader chooses to watch it: the poster, one play
                control, the line worth hearing pulled out beside it, and who said it. Two
                variants of one VideoTestimonial pattern — featured, the band’s one object, and
                in-row, one voice among text quotes.
              </p>
            </Layout>
            <Layout as="ol" rowGap="text">
              {ORDER.map((v, i) => (
                <li key={v.id}>
                  <Button
                    as="a"
                    href={`#${v.id}`}
                    emphasis="link"
                    tone="primary"
                    size="sm"
                    icon={<Icon name="arrow-right" />}
                  >
                    {`${String(i + 1).padStart(2, '0')}  ${v.title}`}
                  </Button>
                </li>
              ))}
            </Layout>
          </Layout>
          <Layout as="dl" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
            {CONTRACT.map((c) => (
              <Layout key={c.key} rowGap="tight">
                <dt className={s.eyebrow}>{c.key}</dt>
                <dd className={s.specNote}>{c.body}</dd>
              </Layout>
            ))}
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 Featured, under a head ─────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.featured}>
        <ContentSection
          eyebrow="Client stories"
          heading="Hear it from the people who shipped it"
          headingId="kit-video-featured"
          data-band="G-video-featured"
        >
          <VideoTestimonial
            variant="featured"
            poster={getKitPhoto('conversation-chalkboard')}
            film={CHALKBOARD}
            quote="They didn’t start with screens. They started with how our planners actually make a call — and three weeks in, the booking flow had gone from eleven steps to four."
            name="Asha Raman"
            role="Head of Product"
            company="Northwind Travel"
          />
        </ContentSection>
      </Band>

      {/* ── 02 Featured, alone on tint ────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.featuredBare}>
        <Section surface="tint" data-band="G-video-featured">
          <VideoTestimonial
            variant="featured"
            poster={getKitPhoto('colleagues-tablet-chat')}
            film={TABLET}
            quote="The research changed what we built first. We shipped the thing customers asked for, not the thing we assumed they wanted."
            name="Daniel Okafor"
            role="VP Engineering"
            company="Ledgerline"
          />
        </Section>
      </Band>

      {/* ── 03 In-row ─────────────────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.inRow}>
        <ContentSection
          surface="tint"
          heading="In our clients’ words"
          headingId="kit-video-in-row"
          data-band="G-video-in-row"
        >
          {/* Bottom-aligned: the three attributions share one line and the three quotes sit on
              one band, so the film's poster rises above a row of peers rather than pushing its
              own quote below theirs. */}
          <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="stack" align="end">
            <VideoTestimonial
              variant="in-row"
              poster={getKitPhoto('conversation-chalkboard')}
              film={CHALKBOARD}
              quote="Three weeks in, the booking flow had gone from eleven steps to four."
              name="Asha Raman"
              role="Head of Product"
              company="Northwind Travel"
            />
            <Proof arrangement="compact" quote={PEERS[0]} />
            <Proof arrangement="compact" quote={PEERS[1]} />
          </Layout>
        </ContentSection>
      </Band>

      {/* ── 04 Surface proof: ink ─────────────────────────────────────────────────── */}
      <Band variation={VARIATIONS.ink}>
        <Section surface="ink" data-band="G-video-featured">
          <VideoTestimonial
            variant="featured"
            poster={getKitPhoto('pair-laptop-pointing')}
            film={CHALKBOARD}
            quote="We stopped arguing about opinions. Every review started from what the last round of users actually did."
            name="Lena Hoffmann"
            role="Director of Design"
            company="Fairway Health"
          />
        </Section>
      </Band>
    </>
  );
}
