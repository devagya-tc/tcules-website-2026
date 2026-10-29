---
title: "A form sits only on an island, brandeis or ink, with or without the drawing"
date: 2026-10-29
status: active
area: [forms, layout]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy, feat/r2-forms-cta)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (CtaSection `split` always renders an Island, `island?: 'blue' | 'ink'` defaulting to blue; the offer-with-form shape and the plain split's `.formPanel` / `--cta-panel-radius` removed; EnquiryBand and ListingIndex take no non-island close)"
---

"Retire this form variant: we only use the islands for forms; either in ink or brandeis (default), and
with (default) or without the illustration." The copy beside a white form panel on a tint band is gone.
Every enquiry form is CtaSection's island close: a brandeis (`blue`) island by default, or `ink`; the
drawing over the words by default, or none.

**Why.** The owner's ruling at the second review: the split close on tint read as a different, weaker
ask than home's island, on the pages that take the most enquiries.

**The mistake it prevents.** CtaSection's plain split (copy | form panel on a tint band) on the case
study close (`EnquiryBand surface="tint"`), the ServicePage template's close, a ListingIndex close
without an island, and the offer with a form inside a band; and the kit's compact form beside a
photograph, under a centred head, beside its head or on an ink band (`/design/kit/form` plates 02–07,
removed).

**How to apply.** `CtaSection` with a `form` always renders on an island (`island`, default `blue`;
a band of the island's own ground swaps it to the other of the two, never to paper or tint).
`EnquiryBand`'s `island` is optional: `surface` (blue), `dress` (card), `arrangement` (halves) and
`illustration` (true) default. A listing's close keeps home's halves with the moving field, as
2026-10-29-listing-close-is-home-halves ruled for /insights; the case-study index takes it too (that
entry's "the case-study index takes the plain close" no longer exists to take). A form placed in a
ContentSection or a hero is the retired variant by another name.
