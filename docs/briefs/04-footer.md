# Brief 04 — Footer

> **Ships today. Do not specify this.** `src/patterns/SiteFooter` is built as six unlike bands rather
> than one repeated list of link groups, which is more than the audit's two arrangements asked for.
> One audit rule needs verifying and it is the one that matters most.

| | |
|---|---|
| Inventory | #04 Footer — 129 pages, 100%, 2 arrangements |
| Implemented at | `src/patterns/SiteFooter/` · `src/styles/tokens/components/footer.css` · `/design/site-footer` |
| API | `brand` · `groups` · `cta` · `newsletter` · `meta` · `address` · `utility` · `legal` · `surface` (defaults `ink`) |

## The two arrangements, mapped

| Audit arrangement | What ships |
|---|---|
| Desktop · six columns plus identity and a legal row | six bands: brand, newsletter, directory (`groups`, any number), contact (`meta` + `address`), utility, legal |
| Mobile · five accordions | **verify.** No disclosure mechanism is visible in the props |

## The one rule that must hold

**Every link stays in the rendered mobile HTML.** The audit quotes the sitemap directly on this: the
mobile groups may collapse *visually*, but all 38 links stay in the markup. A footer that renders a
column only when opened is a footer that search engines and screen readers cannot see.

That is a testable claim, and it is what `npm run build && npm run aria:check` plus a look at the
rendered source settles. Check it before anything else here.

If a disclosure is needed, note that it is **not** brief 14 — `Accordion` is a content component for
FAQ sections. A footer group that collapses is chrome, it belongs to the footer, and giving the two
one implementation welds a body block to the site frame.

## What to verify rather than specify

1. **Mobile disclosure, with every link in the markup.** See above.
2. **Columns whose pages do not exist.** Team, Security and Confidentiality, Accessibility, Product
   Stages, Engagement Models — five links with no content file, and Product Stages and Engagement
   Models have no assigned route in the sitemap either. Build the structure to hold them; the links
   go live as pages land. Confirm the fixture carries them.
3. **No cookie-policy link in the legal row.** The cookie policy is reached from the consent popup.
   Legal row is privacy, terms, accessibility, HTML sitemap, copyright. Check the fixture.
4. **The Clutch profile** is the only external profile in 129 files, and it is also Stat's source
   link (brief 17). One href, two consumers — it belongs in `@/lib/routes`.

## A note on the newsletter field

`--foot-field-height`, `--foot-field-padding-x`, `--foot-field-radius`, `--foot-field-rule-width` and
`--foot-field-min-inline` mean the footer has **already rolled its own text field**. Brief 09 needs a
second one. Two form fields with two token sets is the drift the token rules exist to prevent, so
read that brief's open question 1 against this file — it is the same decision seen from the other
side.
