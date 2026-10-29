---
title: "At launch, nothing is written that the content does not carry"
date: 2026-10-29
status: active
area: [content, process]
source: "Owner, 29 Oct 2026, answering docs/research/insight-structured-data.md § 5 (PR #166)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

In the owner's words: "if we don't have it in the content, we don't write it in the launch phase."

A slot that a format supports renders only when the content carries it. This covers:
- transcripts, chapters and duration;
- key takeaways and FAQ;
- guests, speakers, findings and outcomes.

No one writes the content to fill a slot before 6 Nov.

**Why.** Content is locked to the 26 Oct copy, and the ~70 live insights and 20 live case studies ship
as they are. There are no transcripts. Content invented for a template is unreviewed copy on a hard date.

**The mistake it prevents.** Generating transcripts from YouTube captions, writing takeaways or FAQs
for live Strapi articles, or inventing chapter lists because the watch/listen shape has a slot for
them.

**How to apply.** Templates design for the full set of slots (stress content in `/design`, per
decisions/2026-09-25-design-content-agnostic), and every optional slot collapses cleanly when it is
empty. The structured data is generated from the same fields, so no markup claims something the page
does not show. This does not block design-only changes made from content that already exists, such as
embedding a recording the copy already links.
