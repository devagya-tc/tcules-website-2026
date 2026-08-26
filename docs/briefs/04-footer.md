# Brief 04 — Footer

> **Ships today. Do not specify this.** `src/patterns/SiteFooter` is built as five unlike bands rather
> than one repeated list of link groups, which is more than the audit's two arrangements asked for.
> One audit rule needs verifying and it is the one that matters most.

| | |
|---|---|
| Inventory | #04 Footer — 129 pages, 100%, 2 arrangements |
| Implemented at | `src/patterns/SiteFooter/` · `src/styles/tokens/components/footer.css` · `/design/site-footer` |
| API | `brand` (tagline · social · rating) · `groups` · `cta` · `newsletter` · `meta` · `address` · `utility` · `legal` · `surface` (defaults `ink`) |

## The two arrangements, mapped

| Audit arrangement | What ships |
|---|---|
| Desktop · six columns plus identity and a legal row | five bands: brand, directory (`groups` — six columns at lg), newsletter, contact (`meta` + `address`), utility. `utility` and `legal` are two props of the one closing line, not two bands |
| Mobile · five accordions | **six** native `<details>`, collapsed by default. Lab keeps its own rather than folding into Company — see below |

## The one rule that must hold

**Every link stays in the rendered mobile HTML.** The audit quotes the sitemap directly on this: the
mobile groups may collapse *visually*, but every directory link stays in the markup. A footer that
renders a column only when opened is a footer that search engines and screen readers cannot see.

The audit counted 38. What ships is **36** — 8 Services, 9 Expertise, 4 Work, 8 Insights, 2 Lab,
5 Company, counted from `groups` in `src/content/sources/fixtures/navigation.ts`. The gap is named
rather than smoothed over because the rule is "every link", not "38 links": a fixture that gains a
link must not turn this sentence into a failure.

Marketing's six-group IA is the same 36 links regrouped, not the "roughly double" its brief claims —
that is true of the old site, not of this fixture. Nothing new was added and no route was needed.

**Verified 2026-08-24.** Both renderings carry all 36; at 375px there are 83 anchors in the footer
markup and every one of the 36 directory links is present whether or not its panel is open. The
duplication is deliberate — see the note in `SiteFooter.tsx`.

That is a testable claim, and it is what `npm run build && npm run aria:check` plus a look at the
rendered source settles.

If a disclosure is needed, note that it is **not** brief 14 — `Accordion` is a content component for
FAQ sections. A footer group that collapses is chrome, it belongs to the footer, and giving the two
one implementation welds a body block to the site frame.

## What to verify rather than specify

1. ~~**Mobile disclosure, with every link in the markup.**~~ **Answered 2026-08-24** — six native
   `<details>`, and both renderings ship. See above.
2. **Columns whose pages do not exist.** Team, Security and Confidentiality, Accessibility, Product
   Stages, Engagement Models — five links with no content file, and Product Stages and Engagement
   Models have no assigned route in the sitemap either. Build the structure to hold them; the links
   go live as pages land. Confirm the fixture carries them.
3. **No cookie-policy link in the legal row.** The cookie policy is reached from the consent popup.
   Legal row is privacy, terms, accessibility, HTML sitemap, copyright. Check the fixture.
4. ~~**The Clutch profile**~~ **Done** — `EXTERNAL` in `@/lib/routes` holds all three off-site
   profiles, so Stat (brief 17) reads the same Clutch href the footer's rating badge does. The
   Clutch URL and its 4.8 are both real as of 2026-08-26 and are read off the same page, which is
   why they live beside each other. LinkedIn and YouTube were supplied the same day. Every off-site
   link the footer renders now resolves.

## A note on the newsletter field — ~~open~~ settled

`--foot-field-*` no longer exists. The footer's private text field was the drift this section
warned about, and it was resolved the way the section implies it should be: those tokens moved
unchanged into `Input`'s `quiet` emphasis, and SiteFooter composes the primitive. Brief 09's second
field is the same control. Nothing here rolls its own input any more.
