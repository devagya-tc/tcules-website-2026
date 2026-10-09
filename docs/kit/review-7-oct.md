# 7 Oct review — follow-ups

Owner rulings from the 7 Oct component review (Fathom recording 190423730), as corrected by the owner on
8 Oct. This list is the source of truth, not the raw transcript, which has no speaker labels and is part
Hindi. Next review: **Fri 9 Oct, components only**. Content, the image inventory and the illustration
rework come later, once the owner delivers the copy.

`[ ]` todo · `[x]` done (commit)

## Packages

- [x] **r7-buttons — no neutral/ink solid buttons.** (kit/r7-buttons) Three kinds remain: a **blue solid** for the
      one main action on a page (hero and/or the bottom CTA), a **blue ghost** that pairs with it, and a
      **link button** for every other (navigational) action. "Start with a UX product audit" inside a
      band is a link, not a button. This reverses `fix/tone` ("converts blue, else ink"): remove the
      ink solid tone and migrate every call site.
- [ ] **r7-logos — boxed logo grid.** Reference: Enorm, Dribbble
      (https://dribbble.com/shots/26454188-Enorm-Technology-Client-Logos-Partner-Trust-Section-UI). Each
      logo sits in its own boxed cell with equal weight (**owner, 8 Oct: work with the 9 logos we have** in public/clients), so the box reads as the logo even though our marks
      differ in kind: wordmark, badge (GT Tools), symbol between words (Doodle). Boxes are allowed here
      because a logo cell is not a card; record this as the named exception to "no boxes". The section
      heading is demoted to eyebrow-size context text (the reviewer said the title was "a hero instrument",
      with the IA reversed and the logos not leading). It may lead with the rating badge. No marquee. The
      whole section is at most one MacBook Air viewport tall (830 at 1470).
- [ ] **r7-hero — rating badge in the eyebrow**, and a smaller lead. Reference for the badge as
      eyebrow: https://doodle.com/en/. The lead was too large; visitor-facing pages get the smaller lead.
      SEO-only pages may compromise, but the component default is the smaller size.
- [x] **r7-testimonials.** (kit/r7-testimonials)
      - G·02 ("Typographic, with a CtaRow") is the favourite. It must be available both as-is and inside
        the auto-advancing Slider; the slider version is a new variant.
      - The featured large-image variants are "all good options"; keep them.
      - G-case (case card + testimonial) was rejected for 5+ competing elements. If kept, the card loses
        its description and the rating badge.
      - Never put a rating beside a client quote (the "customer vouching for you while you say others
        do too" problem). Ratings go with the client list, beside the CTA or enquiry, and in facts & figures.
      - No headshots. When a quote has no image, the content shifts to the start and a tag takes the
        image's place.
- [ ] **r7-video — video testimonial.** Allowed and wanted (two ~5-minute client interviews exist). Design it
      beautifully: poster image with play affordance, quote pull and attribution, keyboard and reduced
      motion, no autoplay with sound.
- [ ] **r7-statement — retire the display size.** "Way too big", "not a title-level thing but a very
      special text". The smaller variant reads better. Trying the secondary brand shapes is the owner's
      job (Figma); leave a graphic slot ready if it fits cleanly.
- [ ] **r7-cards — clickable-card sections.**
      - The boxed 6-card grid with an image beside it was too busy. The arrangement is eyebrow, heading,
        body, then the cards.
      - **Rule:** no decorative image in a section that has clickable cards.
      - Size each icon to the card title beside it (cap-height or line-height relationship, from a token,
        not eyeballed); they were far too big.
      - Remove the box borders: the boxed card variant goes.
      - The top-hairline variant stays as it is. Type stays as it is.
- [ ] **r7-form — compact EnquiryForm.** No visible labels: the placeholder or help text acts as the
      label, and each field keeps an accessible, visually hidden label. Keep "We reply within a business
      day".
- [ ] **r7-howwework — "How we work" as its own component.** This is the USP: the engagement model. One
      accountable team from the first question to ship; part-time assignment with the idle cost absorbed
      by Tcules; the team stretches so the client never suffers. **Owner, 8 Oct:** work with the copy we
      have, and look on https://tcules.com (WebFetch its how-we-work, about and engagement pages) for
      more relevant copy. Do not invent claims. Design it properly; do not reuse a generic
      list. It must not create hard separation twice (a hairline AND an icon per row was criticised).
- [ ] **r7-facts — facts & figures.** About four facts in one section: aggregate rating, years, projects,
      team. No testimonial in it. Compose from Stat and RatingBadge before building anything new.
      **Owner, 8 Oct:** the placeholder figures are fine as they are. This is **crucial for Friday's
      review**: it must be at least as beautiful as the best of the other kit components, never a plain
      row of numbers. Judge it side by side with the logo grid and the featured testimonials.
- [ ] **r7-rules — codify:**
      - Never two text-heavy sections back to back; follow a text-heavy band with a visual one. Make this
        a check in the ServicePage plan.
      - IRL photographs carry a consistent tone layer. The treatment is still TBD, so add the rule and a
        Media hook, not a final filter.
      - Proof items are logos, case studies, testimonials and the platform rating. They are a set, not
        a ranking.
- [ ] **r7-pages — apply to the six service pages** after the packages land: logo grid, button kinds,
      statement size, card-section arrangement, no rating beside a quote, the text-heavy rule.

## Not in this batch

The nav (each item is worked on individually), "fictional / worked example" labels (content stage), the
about page's missing image ratios (current-content page), the illustration rework (Bhumika, content stage),
the image inventory (content stage), the dynamic three-path enquiry form (later), and cookie consent
(low priority).
