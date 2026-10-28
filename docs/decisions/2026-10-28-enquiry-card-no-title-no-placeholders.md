---
title: The enquiry card has no title and no placeholders; its labels stay
date: 2026-10-28
status: active
area: [forms, components]
source: "Jatin, feedback session 26 Oct 2026 (Jatin, Devagya, Mihir, Yash), seen live on the home close; logged by Devagya 28 Oct 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

The enquiry form's card dress carries no heading of its own and no placeholder in any field. Each field
keeps its visible label, so the card reads as labels over empty fields, then the send. This holds on
every card, not only on home.

**Why.** In the call Jatin first asked to remove "the help text inside", then tried the labels removed
instead. Devagya objected that a placeholder vanishes as you type ("I don't know in the moment what I was
typing"). Jatin picked the version with labels and no placeholders: "Looks cleaner than the previous one
because the amount of text is lesser … So much cleaner now, right?" On the form title, Devagya asked
"Should I also remove this form title?" and Jatin answered "Let's do that."

**The mistake it prevents.** The card as shipped on 25 Oct: "Start a project" as an h3 on the insights hub
close, and every field doubled up with grey example text ("you@company.com", "A link, a Figma file, or two
lines about the problem.", "https://") under a label that already named it. The 25 Oct untitled card
(`card-untitled`, home only) was one instance of this. It is now the only card, and the separate dress is
gone.

**How to apply.** `EnquiryDress` `card` has no `title` and no `prompt`. Its fields pass `placeholder: null`
and its link takes none. `ENQUIRY_DRESS.card` is the single site card. The plain set (no dress) still uses
the placeholder as the cue, with the label hidden (2026-10-07-enquiry-form-compact-placeholder-labels). The
chip dress keeps its per-pick follow-up prompt, which is a question the form asks rather than help text.
