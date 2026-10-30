---
title: "Home's Why Tcules reasons show their proof as the visual, not a drawing"
date: 2026-10-29
status: superseded
area: [layout, components, illustration]
source: "Owner (Devagya), 29 Oct 2026, home `why-tcules` (\"A product design partner for ambitious SaaS teams\") on the site rebuilt from the 26 Oct copy"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Reasons `proof`; home's reasons resolve their proof from their own sentences, src/lib/reason-proof.ts; offer pages keep `figure`)"
---

On home, "A product design partner for ambitious SaaS teams" is EVIDENCE, so each reason's visual is
its proof, never a drawing: "Products customers rely on" shows the four named clients' marks as a small
cluster (an approved mark, else the client's name typeset, never an invented mark); "AI that reached
production" shows the ConnectX case's own cover with "Live since late 2025" set as a figure; "Relationships
that last" shows the tenures as figures ("3 years · Primelis", "Since first concept · Vovisto", "Since the
first coded prototypes · Benchmark Gensuite"). The head sits above (heading, lead, the end action centred
on the heading), three columns, the proof above the title, the authored sentence with its links below
it, in full. One proof height across the three so the row reads level. No drawings, no hairlines, no
containers.

**Why.** The content names checkable proof, and it "was designed like a generic drawing + claim": an
isometric drawing beside a claim says less than the evidence the sentence already holds.

**The mistake it prevents.** Home's why-tcules drawn as the offer pages' Reasons, three isometric
drawings (the `home` reason-figure set) over three claims whose sentences name clients, a live case and
tenures.

**How to apply.** Home only: the offer pages keep the drawn Reasons. `Reasons` takes a `proof` per item
(`marks`, `cover` with one figure, or `figures`) in place of `figure`; from 1024 the proofs share one box
height (`--rsn-proof-height`), below it each is its own height. HomePage reads each reason's proof from
its own sentence (the clients it links, the case it links via `coverFor`) and the figures from
src/lib/reason-proof.ts, which checks in development that the sentence still says what each figure
restates. The figures restate the authored sentence, which never loses a word. Specimen: /design/reasons
15 and 16.
