# EnquiryForm

> **Amended, home round 3 (11 Oct 2026).** `caption` takes the page's own resting line (the corpus's "After sending"), and `fieldScale="lg"` sets every field at Input's lg step (48, the value at the lead role). See docs/page-mapping.md § 19.

## 0. Front matter

|                     |                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `EnquiryForm`                                                                                                                                                                                                                                     |
| **Tier**            | 2 · pattern (`src/patterns/EnquiryForm/`)                                                                                                                                                                                                         |
| **Status**          | implemented                                                                                                                                                                                                                                       |
| **Token prefix**    | `--enq-*` (collides with nothing in the taken list: `--crumb-`, `--btn-`, `--cta-`, `--foot-`, `--icn-`, `--lay-`, `--logo-`, `--nav-`, `--hero-`, `--prose-`, `--sec-`)                                                                          |
| **Designer / date** | Design, 21 August 2026                                                                                                                                                                                                                            |
| **Implements**      | Brief 09 — EnquiryForm. Consumes brief 08's shipped `CtaSection` (`form` slot).                                                                                                                                                                   |
| **Implemented at**  | `src/patterns/EnquiryForm/EnquiryForm.tsx` · `src/patterns/EnquiryForm/EnquiryForm.module.css` · `src/styles/tokens/components/enquiry-form.css` · primitive dependency `src/components/Input/` · specimen `src/app/design/enquiry-form/page.tsx` |
| **Rendered from**   | `guidelines/docs/vocabulary.md` (read in full; every token name below is verbatim from it, or is a request in §16)                                                                                                                                |

> **Amended 8 Oct 2026 (r7-form, owner ruling of 7 Oct; `docs/kit/review-7-oct.md`).** Applied in the build; where anything below disagrees, this wins:
>
> 1. **No visible labels.** Each field's placeholder is its visible cue and carries the label's own words ("Name", "Email", "What are you working on?", "Website (optional)"); the `<label for>` stays, visually hidden (`--enq-hidden-size`), so the accessible name survives typing. `--enq-label-ink` and the label's focus accent are deleted. A field that needs more than its noun takes a visible hint above the control.
> 2. **Compact rhythm.** No message line is reserved (`--enq-message-reserve` deleted): the fields are one group at `text` (pairs `text` both ways), the actions a `block` below it. A field's message row is always mounted as a polite live region, empty and zero-tall at rest, and opens a `tight` under its field when it has something to say.
> 3. **Errors on send.** Submit validates every required field first: each gets its message, the line beside the submit turns to "N answers need a look before this can send", focus moves to the first invalid field, and nothing is posted.
> 4. **The caption is "We reply within a business day."**, beside (or under) the submit.
> 5. **`numbered` is retired**: its numerals led labels that no longer render.
> 6. **Input's line field is 44 tall** with the value on its rule (`--inp-line-height-md` = `--inp-height-touch`, `--inp-line-inset-top` 14); unlabelled, it meets the touch floor alone. The lined textarea floors at 68.

> **Amended 29 Sep 2026 (tracker 2.17).** Four changes, approved by the owner, applied in place below:
>
> 1. **"See available times" moved into this component.** It sits in the action row beside the submit — one `Cluster colGap="block"`, wrapping on a narrow column — as `Button emphasis="link" tone="primary" size="lg"` (primary since fdn-blue, 6 Oct 2026: a text link is blue at rest) with a trailing `arrow-right` glyph. `scheduleHref` is now a prop: **required** on `enquiry` and `audit` (the 56-instance constraint moved here from `CtaSection`, which no longer takes `scheduleHref`), optional on `contact`. The Success view carries the same link on, so there is still exactly one per band.
> 2. **The submit is `size="lg"`** (48px). At 40 it stood under 44px phone fields and read as the smaller thing; lg clears the touch floor, so `extendHitArea` is gone.
> 3. **The status hairline is gone.** It sat directly over the submit, where the `block` seam already separates the field set from the actions, and drew a rule over an empty line at Idle. The Error state now moves the status **ink** (`--enq-status-ink-error`) instead of its rule; `--enq-status-rule` and `--enq-status-rule-error` are deleted.
> 4. **`Input` has one treatment.** Its `quiet` emphasis — rendered nearly identically to `standard` on paper and ink — was merged into standard and deleted, with its tokens and the `emphasis` prop. `SiteFooter` now uses the standard field.
>
> The field stack was already at `rowGap="text"` between groups (§7a); that is unchanged, and with messages shown the label → control → message groups read as groups (label-to-field 8, message-to-next-label 16 on top of the reserved line).

> **Amended 6 Oct 2026 (UI kit, `cmp-form`).** Applied in the build; where a row below disagrees, this wins:
>
> 1. **A fourth variant, `compact`:** Name and Email as a pair (`Layout columns="fit" minTrack="xs" colGap="block"`, so the pair stacks where the form's own track cannot hold two 192px fields), then "What are you working on?", then the submit with ONE line beside it (`Cluster colGap="block"`). That line is the caption at rest and the status once there is one: the same `role="status"` live region, in the caption voice, so an idle form spends no row on an empty status line. 369 tall in the 667 track it was sized for (visual-direction § 1.4, L beside a photo); where its track cannot hold the pair it stacks and grows by one field (≈ 465 at 392, 536 at 326). The name/email pair reopens Q7 for compact only (§ 17, open for the owner). It posts the enquiry context (`context` required, no `intent`) and `name`, `email`, `what_are_you_working_on`. **No scheduling link** (`scheduleHref?: never`); a placement that wants both asks uses `enquiry`.
> 2. **The form is a pattern, not CtaSection's part.** Its bounds are its own floor and measure: `--enq-form-min-inline` 16rem, `--enq-form-max-inline` 470px (full sets), and a new `--enq-compact-max-inline` 667px (the [5, 7] copy track at 1470). It sits in CtaSection's form column, in ContentSection's `media` copy column beside a 4:5 photograph, as a block under a centred head, in a `beside` body track, and in the offer's form slot.
> 3. **The control's minimum moved out of Input.** `--inp-min-inline` is deleted: a 16rem floor on the box overflowed every track narrower than it (the Input specimen scrolled sideways at 768–899). The floor belongs to the composing pattern: EnquiryForm's `--enq-form-min-inline`, and SiteFooter's new `--foot-field-min-inline` on the newsletter field's label. The § 7(b), § 12 and appendix rows are updated in place.
> 4. **Specimens:** `/design/enquiry-form` adds `compact` (and compact on all four surfaces); the family showcase is `/design/kit/form`.
>
> **Amended 6 Oct 2026 (cmp-form fix round).** Supersedes item 2 above and every row below that disagrees:
>
> 5. **One width policy.** Every variant fills its track down to `--enq-form-min-inline`. `--enq-form-max-inline` (470) and `--enq-compact-max-inline` (667) are deleted. `width="measure"` caps any variant at `--enq-form-measure` (667) and is for the centred standalone placement only, where a centred body row is the whole column.
> 6. **Box fields by default (owner, 7 Oct 2026; was `line`).** `fields="line" | "box"` (default `box`). `line` sets Input's new `appearance="line"`: no fill, no box, one rule under the value that turns blue and doubles on focus; the lined textarea floors at 104 and grows with its text. `box` keeps the filled control.
> 7. **Blue marks** (`--enq-accent-ink`, per surface): a trailing arrow on every submit, a shield mark leading the caption (a danger triangle in the error ink once the line is an error), the label of the focused field, the success check, and the success steps' numerals.
> 8. **Grouping.** Fields at `text` inside; the actions a `stack` below them. The caption/status is one live line under the actions on the full sets and beside the submit on compact; on compact it asks for `--enq-note-min-inline` (15rem) beside the submit and otherwise wraps under it.
> 9. **Success.** Reads mark → thanks at `--text-h4` ("Thanks. We have your enquiry.") → "Here is what happens next." → three numbered steps (blue `--text-index` numerals, `--text-h6` labels, `--text-body-sm` clauses) → the scheduling link where there is one. The success rule and `--enq-success-rule`, and the unused `--enq-status-ink`, are deleted.
> 10. **Fields are declared once.** Each variant is a list of field specs rendered by one function, so the compact and contact Name and Email (and their blur validators) cannot drift.
>
> **Amended 6 Oct 2026 (cmp-form final round).** Supersedes items 6, 8 and 9 where they disagree:
>
> 11. **The value sits on its rule.** Input's line control is 32 tall (`--inp-line-height-md`) with a 6px optical inset under the value, and the label sits a `--gap-inline` over it (box fields keep `tight`). Label to own rule is about 36; own rule to the next label is the reserved message line plus `block`, about 51. At 40 with the value centred the two were 59 and 53, and a label read as belonging to either rule. The lined textarea floors at 64 (two lines) and every textarea carries a placeholder hint, so an empty one reads as a field.
> 12. **One row step.** Every row, the actions included, is one `Layout rowGap="block"`: field to field and last field to submit both measure the message reserve plus 24. Pairs (`fit`, `xs`) sit side by side where the track holds two 192px fields: compact pairs Name/Email, and **contact pairs Name/Company and Email/Phone** (five fields in three rows; one per row it was 1021 tall at 1470).
> 13. **`nextSteps`** (`{ label, detail? }[]`) is the caller's copy, not the pattern's: the success view numbers the steps it is given, and with none it says "We will reply to the address you gave us." On a close, pass CtaSection's `points` straight through so the promise is written once; ServicePage passes `close.points`.
> 14. **`numbered`** leads each label with a blue `--text-ui-sm` numeral (aria-hidden), for placements with no other accent. **`submit="full"`** sets the submit across the track with the line under it.
> 15. **The caption balances** (`text-wrap: balance`), so one sentence over two lines no longer leaves "nothing else." alone.
> 16. **Line invalid with keyboard focus** keeps the doubled danger rule and adds the focus ring under it as a second rule (the ground's gap, then the ring colour). Line disabled reads `--inp-line-disabled-fg` / `--inp-line-disabled-rule` per surface; on blue the line invalid rule is danger-300.

Three things were read rather than assumed, and they change the shape of this document:

1. **`CtaSection` exists.** It is a shipped pattern with `form?: React.ReactNode`, `scheduleHref?: string` (removed 29 Sep 2026 — see the amendment above), `actions`, `proof`, `arrangement="split" | "open" | "offer"` and `surface`. So the ground, the content column, the heading, the body, the points, the schedule link and the vertical air are **not in this spec**. This component is what goes in `form`.
2. **`Button` exists** and owns every action treatment — including the one thing this component cannot express (see §16, Button `busy`).
3. **`Input` now discharges the repository's approved `Input` / `--inp-*` reservation** (§17 Q9). It is the control-only primitive: `EnquiryForm` keeps labels, flags and messages, and composes `Input` for the input and textarea boxes. The footer used its `quiet` emphasis with the same 40px geometry and surface treatment; since 29 Sep 2026 there is one treatment and the footer uses it.

---

> **Owner amendment, 7 Oct 2026 — pairing and arrows** (`docs/specs/Button.md` § 14a). The submit is
> the converting action: solid, and it no longer carries `arrow-right` on any variant. "See available
> times" is its partner, so it is `ghost` / `primary` with the trailing arrow (it navigates) — in the
> action row and on the success view alike — not `link`. Question 5's answer is superseded on that
> point; the rest of its argument (a secondary navigation choice, not a second ask) still holds.

## 1. Identity

**What it is.** The site's shared enquiry behavior: the enquiry/audit set has three visible controls and six or seven hidden context fields; the contact set has five visible client-contact controls and no hidden context fields. All three have one submit, one status line, and a success panel that replaces the form.

**Tier, and why.** Tier 2, pattern. It composes primitives (`Layout`, `Cluster`, `Button`), holds submission behaviour, and accepts either the route-derived enquiry context or the fixed client-contact record. A control is a primitive; a _form_ is a block on a page. It lives in `src/patterns/` and it may import primitives freely — `Layout`, `Cluster` and `Button` are all tier 1, so no lint rule is touched. The page passes it into its enclosing page pattern, which keeps patterns from importing one another.

**What it is NOT — three things, each naming what does that instead.**

| It is not                                                     | What does that instead                                                                                                                                                              |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A section, a band or a ground                                 | The enclosing `CtaSection` or `PageHero` paints the surface, owns the content column and vertical air, and emits `data-surface` that this component reads                           |
| A text input or textarea box                                  | `Input` (tier 1), approved in §17 Q9 and built first. `EnquiryForm` composes it and draws no control treatment of its own; labels and messages remain this pattern's responsibility |
| The scheduling action, or the button that opens the scheduler | Where present, `CtaSection` renders it outside this component and outside the `<form>`, so the single action survives Success without being duplicated                              |

**Nearest existing component, and why this is not a prop on it.** `SiteFooter`'s newsletter field — one input and one submit whose former private `--foot-field-*` values supplied the `Input` reservation. That footer capture is one field with no validity, no async lifecycle and no success replacement, so it composes `Input` (the `quiet` emphasis it used was deleted 29 Sep 2026); it does not become a form variant. This is not a prop on the enclosing page pattern because that pattern deliberately has no submission or content-source knowledge. The overlap is the _control_, not the form — which is Q1 again.

**How many appear on a page.** Exactly one. Commercial enquiry/audit routes place it inside `CtaSection`; `/contact` places it in `PageHero`'s established extras slot. It is never standalone and never appears twice on one page.

---

## 2. Anatomy

Names below are semantic anatomy names. A name becomes a local CSS class or `--enq-{part}-*` slot
only when this pattern paints it; arrangement-only parts stay as `Layout`/`Cluster` composition,
primitive-owned `control` and `submit` read `--inp-*`/`--btn-*`, and hidden inputs need neither.

| Part       | Required                   | Content slot                      | Notes                                                                                                                                        |
| ---------- | -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `form`     | required                   | —                                 | The `<form>` element. Arrangement only — **carries no value of its own**                                                                     |
| `fieldset` | required                   | —                                 | The three groups as one visual unit. Arrangement only — **no value of its own**                                                              |
| `group`    | required, ×3               | —                                 | Label + control + message as one unit. Arrangement only — **no value of its own**                                                            |
| `label`    | required                   | label text (from the label set)   | Always visible. Never a placeholder standing in for a label                                                                                  |
| `optional` | optional fields only        | " (optional)" inside the label    | The label's own role, `--enq-hint-ink`. Was a separate mono "Optional" flag until 1 Oct 2026 |
| `control`  | required                   | user text                         | `input[type=email]`, `textarea`, `input[type=url]`                                                                                           |
| `message`  | required (rendered always) | the validity sentence             | Always in the DOM, empty at rest — that is what reserves its line and what makes its id a safe `aria-describedby` target                     |
| `status`   | required (rendered always) | the submitting / error sentence   | `role="status"`, empty at Idle                                                                                                               |
| `submit`   | required                   | submit label (from the label set) | A `Button` — **carries no `--enq-*` value; `--btn-*` owns it**                                                                               |
| `actions`  | required                   | —                                 | The `Cluster` holding `submit` and, when `scheduleHref` is given, the "See available times" link. Arrangement only — **no value of its own** |
| `caption`  | required                   | the one-line privacy sentence     | Below the submit                                                                                                                             |
| `success`  | conditional                | success heading + sentence        | Replaces `form` entirely, and carries the schedule link on after the sentence (amended 29 Sep 2026)                                          |
| `hidden`   | required, ×6 or ×7         | —                                 | `input[type=hidden]`. Not rendered visually, not focusable, no tokens                                                                        |

Caller inputs are the field set (§3 `variant`, `urlLabel`), `context` for enquiry/audit, `action` (the endpoint), and the optional `onSubmitted` callback. There is no arbitrary node slot.

---

## 3. Props / API

| Prop          | Exact literal union                                                                                                                                                                | Default                 | What it decides                                                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`     | `"enquiry" \| "audit" \| "contact" \| "compact"`                                                                                                                                  | `"enquiry"`             | Selects the closed field set and submit copy; audit adds `intent`, contact maps five visible controls directly to the client-contact mutation, and compact (6 Oct 2026) is name · email · the question, with no scheduling link |
| `urlLabel`    | `"Website" \| "Link to the work" \| "Where can we see it?" \| "Site to audit"` | variant default (`Website` / `Site to audit`) | 1 Oct 2026: the plain noun is the default; the two longer labels stay for placements whose page asks a different question of the link |
| `context`     | `EnquiryContext` (object: `originRoute: string` · `placement: string` · `family: string` · `serviceOrAudit: string` · `referrer: string` · `campaign: string` · `intent?: string`) | Required except contact | The six or seven hidden fields. `intent` is required for audit; the entire object is forbidden for contact                                          |
| `action`      | `string`                                                                                                                                                                           | — (required)            | The endpoint. The component posts; it does not know what is on the other end                                                                        |
| `onSubmitted` | `(() => void) \| undefined`                                                                                                                                                        | `undefined`             | Analytics hook. Fires once, after Success renders                                                                                                   |
| `scheduleHref` | `string` | required on enquiry and audit, optional on contact, refused on compact | The "See available times" link beside the submit and in the success view (29 Sep 2026) |
| `width` | `"track" \| "measure"` | `"track"` | Every variant fills its track; `measure` caps it at `--enq-form-measure` (667) for a form under a centred head (6 Oct 2026) |
| `fields` | `"line" \| "box"` | `"line"` | Input's appearance for every field (6 Oct 2026) |
| ~~`numbered`~~ | — | — | Retired 8 Oct 2026 (r7-form): it numbered labels that no longer render |
| `submit` | `"inline" \| "full"` | `"inline"` | `full` sets the submit across the track with the line under it (6 Oct 2026, final round) |
| `nextSteps` | `readonly EnquiryNextStep[]` (`{ label: string; detail?: string }`) | none | The success view's numbered steps, the caller's copy; on a close, CtaSection's `points` passed straight through (6 Oct 2026, final round) |

**Approved tier-1 dependency.** `Input` renders either an `input` or a `textarea` through a discriminated `as="input" | "textarea"` API, forwards the native attributes for that element, and has one emphasis — the `emphasis="standard" | "quiet"` prop was deleted 29 Sep 2026 (tracker 2.17) — and two appearances since 6 Oct 2026 (`appearance="box" | "line"`, set from `fields`). `invalid` forces the invalid class and `aria-invalid="true"`; a caller's native `aria-invalid="grammar" | "spelling" | boolean` remains intact, and native `disabled` carries Submitting. Both `EnquiryForm` and `SiteFooter` use that one treatment (§17 Q9).

**Deliberately NOT props, and why**

| Not a prop                                        | Why                                                                                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `surface`                                         | Never. The ground belongs to the enclosing page pattern; this component reads `data-surface` from an ancestor and re-declares its own tokens per surface. A `surface` prop here would let a form claim a ground its band does not have   |
| colour, padding, gap, radius, height, width       | Tokens, per surface, in this file. A caller who can pass them can put one of the 56 out of alignment with the other 55                                                                                                                   |
| `arrangement` / `columns`                         | Stacked is the only arrangement (§4). No route resolves to anything else                                                                                                                                                                 |
| `heading`, `body`                                 | The enclosing page pattern owns the heading and body. A form with its own heading gives the band two                                                                                                                                     |
| ~~`scheduleHref`~~ — **now a prop (29 Sep 2026)** | Was: `CtaSection` renders it beside the form. Now the form renders it in its own action row beside the submit, and `CtaSection` no longer takes it, so there is still one per band. Required on `enquiry`/`audit`, optional on `contact` |
| `state`, `busy`, `errorMessage`                   | Internal. The five states are the component's own machine, not the caller's; a forced state is a specimen concern (§15) and is reached there through `action` pointing at a stub endpoint                                                |
| `labels` as a free string map                     | Free strings mean dozens of wordings within a year. Closed discriminated field sets keep the three variants consistent                                                                                                                   |

**Prop combinations that must be a COMPILE error, not a review comment**

1. `variant="audit"` with any `urlLabel` other than `"Site to audit"`, and `variant="enquiry"` with `"Site to audit"` — a discriminated union on `variant`, not two independent props.
2. `variant="audit"` without `context.intent`, and `variant="enquiry"` **with** `context.intent` — the discriminant carries the context type too.
3. `variant="contact"` with either `urlLabel` or `context` — the contact fields map directly to the mutation and carry neither enquiry-only input.
4. Enquiry/audit `context` missing any of the six always-required keys. All six are non-optional strings; empty string is legal, absent is not.

---

## 4. Variants × sizes

Enquiry and audit are label sets; contact is the five-field contact shape. All three have **one size** and one lifecycle.

|                       | md (the only size)                                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `enquiry` (49 routes) | email · "What are you working on?" · optional URL (three wordings) · submit "Send enquiry" · 6 hidden fields                              |
| `audit` (7 routes)    | email · "What are you working on?" · optional URL ("Site to audit") · submit "Request free audit" · 7 hidden fields (`intent`) |
| `compact` (kit, 6 Oct 2026) | name and email as a pair (stacked under 400) · "What are you working on?" · submit "Send enquiry" with the caption/status line beside it · 6 hidden fields · no scheduling link |

**Steps with size:** nothing, because there is one size. **Amended 29 Sep 2026:** the submit is `Button size="lg"` (48px), not md. The md/40 agreement with the desktop field broke on a phone, where the fields step to 44 and a 40px submit under them read as the smaller thing; lg clears the touch floor on its own. The schedule link beside it is lg too, so the two labels set at one type size.

**Deliberately does not step:** field height, gap steps and type roles are identical in all variants. Enquiry and audit differ only in strings and one hidden input; contact adds two single-line controls while preserving the same stack geometry.

**Considered and rejected**

| Rejected                                                              | Why                                                                                                                                                                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arrangement="two-column"` (email and URL side by side) — **revised 6 Oct 2026:** compact and contact now PAIR fields where the form's own track holds two 192px tracks (`fit`, `xs`); the full enquiry/audit sets stay one per row, which is what this row still rejects | No route resolves to it. It also breaks the 470px track it actually gets (§7): two tracks of ~203 hold neither an email address nor a URL without scrolling the value                          |
| `arrangement="inline-row"` (email + submit on one line, footer-style) | That is the newsletter capture, and `SiteFooter` already has it. These multi-field forms cannot be a row                                                                                       |
| `size="sm"` for the offer arrangement                                 | `CtaSection arrangement="offer"` does not pass `form` on any of the 7 audit routes' mid-page instances; the audit form is in the closing band at full size                                     |
| A compact "email only" variant                                        | Then the question "what are you working on?" — the only field a designer reads before replying — becomes optional, and the reply gets worse. Rejected on the value of the reply, not on layout |

---

## 5. States

From the fixed model, and nothing else:

| Model state             | Suffix          | Applies? | Parts whose value moves                                                                                                                                                                                                               |
| ----------------------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rest                    | none            | yes      | base for every part                                                                                                                                                                                                                   |
| hover                   | `-hover`        | yes      | `control` — `--inp-standard-rule-hover` only. The label, value and ground hold                                                                                                                                                        |
| focus (keyboard)        | `-hover` + ring | yes      | `control` — the hover rule value **plus** `--inp-standard-ring-color` at `--focus-ring-width` / `--focus-ring-offset`                                                                                                                 |
| pressed                 | `-pressed`      | **no**   | Excluded. Nothing in this component is pressable: the only press target is `submit`, and `Button` owns `--btn-*-pressed`. No `--enq-*-pressed` token exists, and that absence is the assertion that nothing here changes on `:active` |
| held (active / current) | `-pressed`      | **no**   | Excluded. No control here is ever "the current one"                                                                                                                                                                                   |
| disabled                | own tokens      | yes      | `control` — `--inp-disabled-bg`, `--inp-disabled-fg`, `--inp-disabled-rule`. No state opacity. Reached only while Submitting                                                                                                          |
| expanded                | `-expanded`     | **no**   | Excluded. Nothing opens                                                                                                                                                                                                               |

**The brief's five states, mapped onto that model.** Three of the five are not in the model at all and are raised as mechanisms in §16 — they are written here so the argument is visible, not so it is smuggled in.

| Brief state    | How it is built                                                                                                                                                                         | Rule                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Idle**       | rest                                                                                                                                                                                    | `message` and `status` present and empty                                                                                    |
| **Invalid**    | `control` at `--inp-standard-invalid-rule` and `--border-width-2`, `aria-invalid="true"`, `message` filled, plus the `close-circle` glyph inside the message                            | **Per field, on blur.** Never on keystroke, never on submit-sweep. A field the visitor has not left yet has not been judged |
| **Submitting** | `submit` **busy, not disabled** (§16 request 3); the three `control`s disabled; `status` filled; `aria-busy="true"` on `form`                                                           | The label and the focus survive because the button survives. Focus is moved to `submit` before the controls disable (§11)   |
| **Success**    | `form` unmounts; `success` mounts in its place                                                                                                                                          | Replaces the form. Nothing is left to fill in                                                                               |
| **Error**      | `submit` returns to rest, controls re-enable, `status` filled and its ink moves to `--enq-status-ink-error` (was its rule, `--enq-status-rule-error`; the rule was deleted 29 Sep 2026) | **Keeps every character typed.** The component never re-mounts the controls on failure                                      |

Hover and pressed cannot be identical here because pressed does not exist; the audit line for that check is answered by the exclusion above. Within the states that do exist, **no state is carried by colour alone**: Invalid pairs its colour with the `close-circle` glyph, a 2px rule and `aria-invalid`; disabled pairs its tokens with the native `disabled` attribute; Submitting pairs its colour change with a live-region sentence and `aria-busy`.

---

## 6. Per-surface colour

One row per token, four columns, every cell a real name. The control rows are owned by the approved `Input` / `--inp-*` layer; the label, flag, message, status, success and caption rows stay under `--enq-*`. `--color-danger-*` is approved in §17 Q2 and is marked (req) wherever it appears.

| Token                                                                                | paper                                                                                                  | tint                                                                               | ink                                                                                | blue                                                                               |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `--enq-label-ink`                                                                    | `--color-neutral-700` · 8.14:1 on `--color-paper`                                                      | `--color-neutral-700` · 7.27:1 on `--color-paper-deep`                             | `--color-neutral-200` · 12.83:1 on `--color-neutral-950`                           | `--color-brandeis-50` · 5.57:1 on `--color-brandeis-500`                           |
| `--enq-hint-ink` (was `--enq-flag-ink`, renamed 1 Oct 2026: the "(optional)" and a hint) | `--color-neutral-600` · 4.92:1 on `--color-paper` | `--color-neutral-700` | `--color-neutral-400` | `--color-brandeis-100` |
| `--inp-standard-bg`                                                                  | `--color-white` · n/a — decoration                                                                     | `--color-paper` · n/a — decoration                                                 | `--color-neutral-900` · n/a — decoration                                           | `--color-white` · n/a — decoration                                                 |
| `--inp-standard-fg`                                                                  | `--color-neutral-900` · 14.75:1 on `--color-white`                                                     | `--color-neutral-900` · 14.62:1 on `--color-paper`                                 | `--color-neutral-50` · 13.53:1 on `--color-neutral-900`                            | `--color-neutral-900` · 14.75:1 on `--color-white`                                 |
| `--inp-standard-placeholder-fg`                                                      | `--color-neutral-600` · 4.97:1 on `--color-white`                                                      | `--color-neutral-600` · 4.92:1 on `--color-paper`                                  | `--color-neutral-400` · 6.88:1 on `--color-neutral-900`                            | `--color-neutral-600` · 4.97:1 on `--color-white`                                  |
| `--inp-standard-rule`                                                                | `--color-neutral-300` · n/a — decoration                                                               | `--color-neutral-400` · n/a — decoration                                           | `--color-neutral-700` · n/a — decoration                                           | `--color-brandeis-200` · n/a — decoration                                          |
| `--inp-standard-rule-hover`                                                          | `--color-neutral-500` · n/a — decoration                                                               | `--color-neutral-600` · n/a — decoration                                           | `--color-neutral-500` · n/a — decoration                                           | `--color-brandeis-400` · n/a — decoration                                          |
| `--inp-standard-ring-color`                                                          | `--color-brandeis-500` · 6.18:1 on `--color-paper` (its gap colour)                                    | `--color-brandeis-500` · 5.51:1 on `--color-paper-deep`                            | `--color-brandeis-300` · 7.32:1 on `--color-neutral-950`                           | `--color-white` · 6.23:1 on `--color-brandeis-500`                                 |
| `--inp-standard-ring-gap-color`                                                      | `--color-paper` · n/a — decoration                                                                     | `--color-paper-deep` · n/a — decoration                                            | `--color-neutral-950` · n/a — decoration                                           | `--color-brandeis-500` · n/a — decoration                                          |
| `--inp-disabled-bg`                                                                  | `--color-neutral-100` · n/a — decoration                                                               | `--color-neutral-200` · n/a — decoration                                           | `--color-neutral-950` · n/a — decoration                                           | `--color-neutral-100` · n/a — decoration                                           |
| `--inp-disabled-fg`                                                                  | `--color-neutral-500` · 2.67:1 on `--color-neutral-100` — **deliberate exception, disabled is exempt** | `--color-neutral-500` · 2.37:1 on `--color-neutral-200` — **deliberate exception** | `--color-neutral-600` · 3.48:1 on `--color-neutral-950` — **deliberate exception** | `--color-neutral-500` · 2.67:1 on `--color-neutral-100` — **deliberate exception** |
| `--inp-disabled-rule`                                                                | `--color-neutral-200` · n/a — decoration                                                               | `--color-neutral-300` · n/a — decoration                                           | `--color-neutral-800` · n/a — decoration                                           | `--color-neutral-300` · n/a — decoration                                           |
| `--inp-standard-invalid-rule`                                                        | `--color-danger-600` (req) · n/a — decoration                                                          | `--color-danger-600` (req) · n/a — decoration                                      | `--color-danger-300` (req) · n/a — decoration                                      | `--color-danger-600` (req) · 6.54:1 on the white field it borders                  |
| `--enq-message-invalid-ink`                                                          | `--color-danger-600` (req) · 6.48:1 on `--color-paper`                                                 | `--color-danger-600` (req) · 5.78:1 on `--color-paper-deep`                        | `--color-danger-300` (req) · 8.65:1 on `--color-neutral-950`                       | `--color-danger-100` (req) · 5.03:1 on `--color-brandeis-500`                      |
| `--enq-status-ink`                                                                   | `--color-neutral-900` · 14.62:1 on `--color-paper`                                                     | `--color-neutral-900` · 13.06:1 on `--color-paper-deep`                            | `--color-neutral-100` · 14.47:1 on `--color-neutral-950`                           | `--color-white` · 6.23:1 on `--color-brandeis-500`                                 |
| `--enq-status-ink-error` (29 Sep 2026; replaces `--enq-status-rule` / `-rule-error`) | `--color-danger-600` (req) · 6.48:1 on `--color-paper`                                                 | `--color-danger-600` (req) · 5.78:1 on `--color-paper-deep`                        | `--color-danger-300` (req) · 8.65:1 on `--color-neutral-950`                       | `--color-danger-100` (req) · 5.03:1 on `--color-brandeis-500`                      |
| `--enq-success-ink`                                                                  | `--color-neutral-900` · 14.62:1 on `--color-paper`                                                     | `--color-neutral-900` · 13.06:1 on `--color-paper-deep`                            | `--color-neutral-50` · 15.84:1 on `--color-neutral-950`                            | `--color-white` · 6.23:1 on `--color-brandeis-500`                                 |
| `--enq-success-rule`                                                                 | `--color-success-500` · n/a — decoration (3.01:1 on `--color-paper`)                                   | `--color-success-500` · n/a — decoration (2.69:1 on `--color-paper-deep`)          | `--color-success-500` · n/a — decoration (5.68:1 on `--color-neutral-950`)         | `--color-white` · n/a — decoration (6.23:1 on `--color-brandeis-500`)              |
| `--enq-caption-ink`                                                                  | `--color-neutral-600` · 4.92:1 on `--color-paper`                                                      | `--color-neutral-700` · 7.27:1 on `--color-paper-deep`                             | `--color-neutral-400` · 8.05:1 on `--color-neutral-950`                            | `--color-brandeis-100` · 4.91:1 on `--color-brandeis-500`                          |

19 rows × 4 cells = 76 cells, none empty, none a delta. Eleven rows belong to `Input`; eight belong to `EnquiryForm`.

**`Input emphasis="quiet"` — deleted 29 Sep 2026 (tracker 2.17).** This paragraph and its seven-row table recorded the footer's preserved treatment. On paper and ink it rendered nearly identically to `standard`, so the owner merged it into standard and deleted it: the `--inp-quiet-*` tokens are gone from every surface block, and `SiteFooter` uses the standard field. The one visible consequence is on a blue footer, where the field is now white rather than recessed to `--color-brandeis-600`.

**paper.** The control lifts off the band rather than sinking into it: `--color-white` against `--color-paper` is a half-step of warmth, enough to read as an inset without a shadow (there is only `--shadow-none`). Because the field ground is whiter than the band, the placeholder can sit at `--color-neutral-600` and still clear the floor at 4.97:1 — measured on white, not on paper, which is the distinction the delta-table failure was made of. The ring is `--color-brandeis-500` at 6.18:1 against the band showing through the 2px offset.

**tint.** Everything steps one rung darker because the ground came up. The field ground is `--color-paper` — the trick that works on paper (white on paper) has no room left here, so the field takes the lighter _paper_ and the band keeps the deeper one. `--enq-hint-ink` is the one row that had to move for contrast rather than for taste: `--color-neutral-600` measures **4.39:1** on `--color-paper-deep` and fails, so the flag lifts to `--color-neutral-700` at 7.27:1 and reads slightly louder than it does on paper. The rest rule moves to `--color-neutral-400` and hover to `--color-neutral-600`, keeping the same one-rung separation the paper column has.

**ink.** The polarity inverts and nothing else survives translation. The field ground is `--color-neutral-900` — one step off the `--color-neutral-950` band, which is not enough separation on its own, so the rest rule carries the box at `--color-neutral-700` and hover _lightens_ to `--color-neutral-500` rather than darkening. The ring cannot be `--color-brandeis-500` here (3.28:1 against the band, and it disappears against a dark field) so it lifts three steps to `--color-brandeis-300` at 7.32:1. Disabled is the only place where a field is allowed to equal the band: `--color-neutral-950` ground with a `--color-neutral-800` rule reads as an empty outline, which is what unavailable should look like.

**blue.** The loudest ground gets the quietest form: the control returns to `--color-white`, so rows 4–5 are the paper values again and the field is the calmest rectangle in the band. The ring cannot be blue on blue, so it is `--color-white` at 6.23:1. This is the tightest column in the table — the label at `--color-brandeis-50` is 5.57:1 and the flag and caption at `--color-brandeis-100` are 4.91:1, with no rung left below them, which is why `--color-brandeis-200` (3.78:1) appears here only as a rule and never as text. `--enq-success-rule` is the one row where the value is not the semantic colour: `--color-success-500` measures 2.05:1 on `--color-brandeis-500` and would read as dirt, so the rule goes `--color-white` and the success meaning is carried by the sentence and the `check-circle` glyph.

**Nested surface.** Neither component paints a ground: `EnquiryForm` and its child `Input` inherit whichever `data-surface` `CtaSection` emitted, and both token layers restate their complete sets on all four surfaces. The case that actually occurs is the reverse: **this component inside a band whose surface differs from the page's other bands** — e.g. the closing `CtaSection surface="blue"` under a page of `paper` sections. The specimen's nested band (§15) renders the whole form inside a `blue` band inside an `ink` page to prove no value leaked in from the level above.

---

## 7. Geometry & spacing

### (a) Distances — gap-scale role names only

| Where                                            | Role              | Owner                                                       |
| ------------------------------------------------ | ----------------- | ----------------------------------------------------------- |
| `group` → `group` inside `fieldset`              | `text`            | `Layout rowGap="text"`                                      |
| `label` → `control` → `message` inside a `group` | `tight`           | `Layout rowGap="tight"`                                     |
| `label` → "(optional)" | none — one text run inside the `<label>` | — |
| `fieldset` → `status` → `actions` group          | `block`           | `Layout rowGap="block"` on `form`                           |
| `submit` → schedule link (inline, wraps)         | `block` / `tight` | `Cluster colGap="block" rowGap="tight"` — added 29 Sep 2026 |
| `submit` → `caption`                             | `text`            | `Layout rowGap="text"` on the actions group                 |
| glyph → text inside `message`                    | `tight`           | `Cluster colGap="tight"`                                    |
| `success` rule → heading → sentence              | `block`           | `Layout rowGap="block"`                                     |

The non-uniform rhythm is nesting, not a knob: `tight` inside a group, `text` between groups, and `block` between the field set, status and action group. No child sets outer spacing anywhere.

### (b) Component sizes — t-shirt named, each measured against something real

| Name                      | Token                      | Value     | Measured against                                                                                                                                                                                                                                                                                                                                       |
| ------------------------- | -------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| input height, md          | `--inp-height-md`          | 40px      | `--btn-height-md` 40px — the md Button (the submit is lg since 29 Sep 2026, see §4); also migrates `--foot-field-height` 40px, so the site has one input height                                                                                                                                                                                        |
| input height, touch       | `--inp-height-touch`       | 44px      | `--btn-hit-min` / `--crumb-hit-min` 44px — the touch floor the rest of the system already states                                                                                                                                                                                                                                                       |
| input inline padding      | `--inp-padding-x`          | 12px      | migrates `--foot-field-padding-x` 12px and matches `--nav-item-padding-x` 12px — the existing inset for a 40px control                                                                                                                                                                                                                                 |
| textarea block padding    | `--inp-textarea-padding-y` | 12px      | the same optical inset on the multiline axis; it is part of the 128px four-line measurement below, not a gap between siblings                                                                                                                                                                                                                          |
| ~~input minimum inline size~~ | ~~`--inp-min-inline`~~ | ~~16rem~~ | **Deleted 6 Oct 2026**: the floor moved to the composing patterns (`--enq-form-min-inline`, `--foot-field-min-inline`), because on the box it overflowed every narrower track. Was: migrates `--foot-field-min-inline` 16rem **unchanged**, and stays rem on purpose: a form field should grow with the reader's text size, which a px floor would stop it doing. This row said 256px and grounded it in equalling `--lay-track-sm`; that equality holds only at a 16px root and is a coincidence rather than a reason. Corrected at build |
| form minimum inline size  | `--enq-form-min-inline`    | 16rem     | the form's usable floor, and since 6 Oct 2026 the only one (Input carries none); the pattern and its Success replacement keep the same minimum even when the controls unmount                                                                                                                                                          |
| compact max inline size   | `--enq-compact-max-inline` | 667px     | 6 Oct 2026: the copy track of a [5, 7] split at 1470, where the compact form sits beside a 4:5 photograph; under a centred head this measure is what centres, and in a 763 beside track it stops short |
| form max inline size      | `--enq-form-max-inline`    | 470px     | the track it holds at ≥1024: `--sec-container` 1240 less `--gap-column` 64, split [3,2] by `CtaSection arrangement="split"` = 470px. Below 1024 the band stacks and the cap stops a 1240-wide email field                                                                                                                                              |
| textarea min block size   | `--inp-textarea-min-block` | 128px     | four lines of `--text-body` (16 × 1.6 = 25.6 → 102px) plus the control's own vertical inset (2 × 12px), rounded up to 128                                                                                                                                                                                                                              |
| message reserve           | `--enq-message-reserve`    | 19px      | one line of `--text-caption` (13 × 1.45 = 18.85 → 19px). The `message` element is always rendered at this minimum, so filling it moves nothing below it                                                                                                                                                                                                |

### (c) Optical corrections reaching the space ramp

Two, both inside `Input`: `--inp-padding-x` and `--inp-textarea-padding-y` reach `--space-12`. They are optical control insets, not sibling separation and not `--gap-*`; the first migrates the footer's existing argued inset, and the second applies the same measured inset on the multiline axis. The label-to-control distance remains genuinely `tight` and should re-tune with the gap scale. Count: 2.

### Radius, border, shadow, z

| Property                           | Value                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------- |
| Radius, control                    | `--radius-8` (equals `--btn-radius` 8px and `--foot-field-radius` 8px) |
| Radius, success panel              | `--radius-0` — it is a region, not a card                              |
| Border width, rest / hover / focus | `--border-width-1`                                                     |
| Border width, invalid              | `--border-width-2` — the second, non-colour carrier of Invalid         |
| Focus ring                         | `--focus-ring-width` 2px at `--focus-ring-offset` 2px                  |
| Shadow                             | `--shadow-none`. There is no other value, and a form does not float    |
| Z-layer                            | `--z-base`. Nothing here stacks                                        |

---

## 8. Typography

| Part                  | Role              | Tracking companion                         | Case                                                                                                                        |
| --------------------- | ----------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `label`               | `--text-body-sm`  | none — this role has no tracking companion | Sentence case: "What are you working on?". **Amended 25 Aug 2026** — was `--text-ui` (mono); see _Case as a decision_ below |
| `optional`            | the label's role, `--text-body-sm` | none | Sentence case, quieter ink: "Website (optional)" |
| `control` value       | `--text-body`     | none — this role has no tracking companion | As typed                                                                                                                    |
| `control` placeholder | `--text-body`     | none — this role has no tracking companion | Sentence case. Used only for a format example ("you@company.com"), never to replace a label                                 |
| `message`             | `--text-caption`  | none — this role has no tracking companion | Says what to do, a few words, no period: "Enter your email", "Enter a valid email" |
| `status`              | `--text-body-sm`  | none — this role has no tracking companion | Sentence case: "Sending your enquiry." / "That did not send. Your answers are still here — try again."                      |
| `success` sentence    | `--text-lead`     | none — this role has no tracking companion | Sentence case: "Thanks — we have your enquiry."                                                                             |
| `success` heading     | `--text-h5`       | `--text-h5-tracking`                       | Sentence case: "One reply, within a working day." See Q6 — the element level is an open question, the role is not           |
| `caption`             | `--text-caption`  | none — this role has no tracking companion | Sentence case: "We reply to the address you give us, and use it for nothing else."                                          |
| `submit` label        | `--btn-*` owns it | —                                          | Sentence case: "Send enquiry" / "Request free audit"                                                                        |

**Measures.** Parts carrying running text: `success` sentence and `caption` take `--measure-body` (68ch); in the 470px track `--text-lead` at 20px yields about 41ch and `--text-caption` about 62ch, so the cap never binds at desktop and binds only in the stacked band below 1024, which is what it is for. The `control` value is capped by `--enq-form-max-inline` 470px — roughly 55ch of `--text-body` — comfortably inside the measure. `message` is one line by design.

**Case as a decision. Reversed on 25 Aug 2026, and the argument survived the reversal.** The system now says mono is always uppercase (`tokens/primitives.css` § Type · case), which put this section's conclusion — sentence-case labels — in direct conflict with its own choice of a mono role for them. The paragraph below is what it said, and every word of it still holds:

> Everything is sentence case, including the submit. This form is the site's most conversational moment; the mono UI roles (`--text-ui`, `--text-micro`) already carry enough system voice through their family and tracking that upper-casing the labels would make a question read like a field name.

So the label moved off mono rather than off sentence case: **`label` is now `--text-body-sm`** — sans, 14/1.55, no tracking companion to restate, one step up in size from the 13px it left, and a different voice from the `--text-caption` message beneath it, which is the one distinction those two lines have to keep. "What are you working on?" reads as a question, which was the point. Under the rule this is the resolution rather than an exception: a label that must stay sentence case is not a mono label.

What stays mono, and therefore uppercase: the `flag` — "Optional" is a field's _status_ rather than part of the question, which is exactly the job `--text-micro` names — and the `submit`, which is a `Button` and takes the control's case with the rest of the control. The eyebrow above the band is `CtaSection`'s and stays upper. So the contrast this section wanted is intact and now runs along a family line as well as a case line: sans questions, mono apparatus.

---

## 9. Responsive

**At 1023.** `CtaSection` collapses its split, so the form stops being a 470px companion track and becomes a full-width block. `--enq-form-max-inline` 470px holds it at the width it was designed for rather than letting the fields run to 1240. Nothing inside the form re-arranges — it was already stacked.

**At 767.** `--inp-height-md` re-declares to `--inp-height-touch` 44px and `--inp-textarea-min-block` holds. The form is still one column of three groups.

**What must NOT change.** The gap scale does not shift responsively: `tight`, `text` and `block` are the same distances at 375 as at 1440. No media query swaps one step for another and no media query changes a type role — `--text-body` is 16px everywhere, and the title roles that do re-declare at 1023 and 767 all belong to `CtaSection`, not here. The arrangement may change; the distance may not.

**Touch targets — one legal means each, stated.** The three `control`s reach 44px by **stepping the size up** (`--inp-height-touch`): each field is the only thing on its row, so growing it moves nothing beside it. The `submit` and the scheduling link beside it are `size="lg"` (48px) since 29 Sep 2026, so both clear the floor with their own box and neither needs `extendHitArea`. (Before: the submit was md with `extendHitArea`, and the link was `CtaSection`'s.)

---

## 10. Composition

```jsx
// the page — EnquiryForm goes INTO CtaSection, so no pattern imports a pattern
<CtaSection
  surface="blue" arrangement="split"
  heading="Start with a conversation about the work"
  body={['Tell us what you are trying to ship and who it is for.']}
  form={<EnquiryForm variant="enquiry" urlLabel="Site or product URL" action="/api/enquiry" context={ctx} scheduleHref="/book" />}
/>

// EnquiryForm
<form aria-label="Send an enquiry" aria-busy={submitting || undefined}>
  <Layout rowGap="block">                            {/* fields → status → actions */}
    <Layout rowGap="text">                           {/* fields: group to group */}
      <Layout rowGap="tight">                        {/* group: label → control → message */}
        <label />                                    {/* URL label wraps in Cluster with its flag */}
        <Input />
        <Cluster colGap="tight" align="center">       {/* message, always rendered */}
          <Icon name="close-circle" />
          <span />
        </Cluster>
      </Layout>
      {/* × 3 — textarea and URL use the same group shape */}
    </Layout>
    <p role="status" />                              {/* status, always rendered */}
    <Layout rowGap="text">                           {/* actions: submit → caption */}
      <Cluster colGap="block" rowGap="tight" align="center">   {/* amended 29 Sep 2026 */}
        <Button type="submit" size="lg" busy={submitting}>Send enquiry</Button>
        <Button as="a" href={scheduleHref} emphasis="link" tone="primary" size="lg"
                icon={<Icon name="arrow-right" />}>See available times</Button>
      </Cluster>
      <p />                                          {/* caption */}
    </Layout>
  </Layout>
  {/* hidden × 6 or 7 — inside the form element, outside every Layout */}
</form>

// Success — replaces the whole tree above
<div role="status" tabIndex={-1}>
  <Layout rowGap="block">
    <hr />                                           {/* success rule */}
    <h3 />                                           {/* Q6 */}
    <Cluster colGap="tight" align="center"><Icon name="check-circle" /><p /></Cluster>
    <Cluster>{/* the same schedule link, carried on */}</Cluster>
  </Layout>
</div>
```

Restated, because each has already gone wrong somewhere in this codebase: **no hand-rolled grid or flex for arrangement** — every distance above belongs to a `Layout` or a `Cluster`; the only `inline-flex` in the component is inside `Button`'s own box, which is not arrangement. **No margins on children, ever** — the container owns the gap, including the `message` and the `caption`. **Never override `Section` from outside** — no background, no colour, no horizontal padding, no `max-width` on or around the `CtaSection` that holds this; `--enq-form-max-inline` caps _this component's own_ box, which is not the content column. **One sanctioned exception, and it is the proving ground's:** §15 item 7 requires the 256px floor to be rendered rather than asserted, and the only way to constrain a band's width is from outside it. So `/design/enquiry-form` wraps a `CtaSection` in the harness's `trackSm`, labels the band an illegal placement, and says on the page that the misalignment is the cost of the test. That is the one place the rule above is broken on purpose; anywhere else it is a defect. These two sections used to contradict each other outright.

`colGap` is stated only where a `Cluster` puts two things side by side; no `Layout` here sets `columns`, so no `Layout` here sets `colGap`.

---

## 11. Accessibility

**Semantics and elements.** A real `<form>` with `noValidate` (validity is per-field on blur, not a browser sweep on submit) and `method="post"`. Every visible control has an always-visible `<label for>`. Native email, telephone, URL and textarea semantics are retained. `Button` renders a native `button type="submit"`. Enquiry/audit context uses `input type="hidden"` — not focusable and not in the accessibility tree. No `fieldset`/`legend`: each closed set has visible labels and the form's own name (below) covers it.

**Where ids come from.** Every id is generated with React `useId` inside the component and suffixed per part (`{id}-email`, `{id}-email-msg`, `{id}-url-flag`, `{id}-status`). No id is a prop, no id is a literal, and **no idref points outside this component** — including at `CtaSection`'s heading, which does not expose an id. The form's accessible name is an `aria-label` derived from `variant`: "Send an enquiry", "Request a free audit", or "Contact Tcules".

**Every `aria-describedby` and `aria-controls` target is always rendered.** `message` and `status` are in the DOM in every state, empty at rest (compact, 6 Oct 2026: its `status` holds the caption at rest, so the reassurance and the status share one line beside the submit; the region still exists in every state) — that is the reason they are required parts in §2 rather than conditional ones. There is no `aria-controls` in this component: the only thing that appears and disappears is the Success panel, and it _replaces_ its own trigger, so nothing survives to point at it. If the panel were instead revealed beside the form, `aria-controls` would name it and the panel would have to be rendered empty from the start for the idref to resolve; specifying the replacement avoids that entirely.

**Keyboard**

| Key               | Where      | What happens                                                                                                                   |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Tab`             | anywhere   | email → textarea → URL → submit → (out of the form, to `CtaSection`'s schedule link)                                           |
| `Shift+Tab`       | anywhere   | the reverse. Hidden inputs are never in the order                                                                              |
| `Enter`           | email, URL | submits the form                                                                                                               |
| `Enter`           | textarea   | inserts a newline. **Deliberately not submit** — the one field that holds more than a line must be able to hold a paragraph    |
| `Enter` / `Space` | submit     | submits                                                                                                                        |
| `Escape`          | anywhere   | **deliberately unbound.** Nothing here is dismissable; binding it would teach the visitor that Escape discards a typed enquiry |
| Arrow keys        | anywhere   | **deliberately unbound.** No composite widget, no roving tabindex — three inputs and a button                                  |

**Focus order, and where focus goes after every state change**

| Transition           | Focus                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blur → Invalid       | stays where the visitor put it. Validation never steals focus                                                                                                                                                                   |
| submit → Submitting  | moves to `submit` **before** the controls disable. This is why the button is busy and not disabled: a disabled button loses focus to `<body>`, and then Error returns the visitor to the top of the page instead of to the form |
| Submitting → Error   | stays on `submit`, which is now at rest and still labelled. The status sentence is announced by the live region, not by a focus move                                                                                            |
| Submitting → Success | moves to the `success` region (`tabIndex={-1}`, focused on mount); the next `Tab` reaches `CtaSection`'s persistent schedule link                                                                                               |
| Success → (nothing)  | terminal. There is no route back to the form on the same page load                                                                                                                                                              |

**ARIA per state**

| Attribute                  | Idle                                                    | Invalid                                                    | Submitting           | Error     | Success                        |
| -------------------------- | ------------------------------------------------------- | ---------------------------------------------------------- | -------------------- | --------- | ------------------------------ |
| `form aria-busy`           | absent                                                  | absent                                                     | `"true"`             | absent    | n/a (unmounted)                |
| `control aria-invalid`     | absent                                                  | `"true"` on that field only                                | unchanged            | unchanged | n/a                            |
| `control aria-describedby` | `{id}-{field}-msg` (+ `{id}-url-flag` on the URL field) | same                                                       | same                 | same      | n/a                            |
| `control disabled`         | absent                                                  | absent                                                     | present on all three | absent    | n/a                            |
| `status role`              | `status`                                                | `status`                                                   | `status`             | `status`  | n/a                            |
| `status aria-live`         | `polite`                                                | `polite`                                                   | `polite`             | `polite`  | n/a                            |
| `success role`             | n/a                                                     | n/a                                                        | n/a                  | n/a       | `status`, `aria-live="polite"` |
| `Icon` in `message`        | —                                                       | `aria-hidden` (default) — the sentence carries the meaning | —                    | —         | —                              |

**Focus ring.** `:focus-visible` only, never `:focus` — a mouse click into a field must not draw a ring. `--focus-ring-width` 2px at `--focus-ring-offset` 2px, measured against the colour visible in that offset (the band ground) in every column of §6: 6.18:1 · 5.51:1 · 7.32:1 · 6.23:1, all above the 3:1 floor.

**Contrast floors restated.** Text and meaningful glyphs 4.5:1; there is no text over 24px in this component so the 3:1 large-text allowance is never used; focus ring 3:1 against its own gap colour; disabled exempt and marked as the exception in four cells of §6. The `close-circle` glyph in `message` is decorative because the sentence beside it says the same thing, and it is coloured with the message ink regardless — so it clears 4.5:1 on all four surfaces even though it is not required to.

**Reduced motion.** `@media (prefers-reduced-motion: reduce)` sets the transition duration to `--duration-instant`. Nothing else changes, because nothing moves (§13).

**What a screen reader actually says.** Entering the form: "Send an enquiry, form. Email address, edit text, blank." On blur of an empty email: "That does not look like an email address." On submit: "Sending your enquiry." On success, focus reaches the status region containing: "One reply, within a working day. Thanks — we have your enquiry." The next `Tab` reaches the enclosing CTA's "See available times" link.

---

## 12. Content edge cases

| Case                                                                  | Required handling                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Longest realistic string                                              | The longest label was "URL of the site to audit" (24 characters; "Site to audit" since 1 Oct 2026) at `--text-body-sm` — sans and untracked since 25 Aug 2026, so it sets _narrower_ than the tracked mono it replaced; it fits one line in the 470px track and wraps to two in the 256px minimum without moving the control, because the group is a `Layout rowGap="tight"` stack, not a row                                                                                                                                                                                                                              |
| One long unbroken token (a URL)                                       | The URL control scrolls horizontally as typed — native input behaviour, no wrapping, no `overflow-wrap`. The echoed value in `message` (if a message quotes it) is truncated with an ellipsis at the control's inline size; the `textarea` breaks a pasted URL mid-token so a paragraph cannot force a horizontal scrollbar on the form                                                                                                                                                                                                                                                 |
| Zero items                                                            | There is no collection. Each variant selects a fixed non-empty control set, so a form with no fields cannot occur                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| One item                                                              | Not reachable. The email field alone is a different component (`SiteFooter`'s newsletter), and no prop makes this form shrink to it                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Many items (2× expected)                                              | Not reachable — callers cannot append fields to any closed variant. The contact set is fixed at five; the enquiry/audit set is fixed at three                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Missing image or missing optional slot                                | No images or arbitrary node slots exist (§16 requests none). The optional `flag` is rendered only on the enquiry/audit URL group; no empty wrapper or seam appears elsewhere                                                                                                                                                                                                                                                                                                                                                                                                            |
| Empty required-ish text                                               | `urlLabel` cannot be empty (closed union). If `context` values arrive empty they still render as empty hidden inputs rather than being dropped, so the endpoint always receives seven or six keys and can tell "unknown" from "absent"                                                                                                                                                                                                                                                                                                                                                  |
| The narrow track at 767                                               | Input height steps to `--inp-height-touch` 44px — **in `Input.module.css`'s media query, not by re-declaring `--inp-height-md` in the token layer as an earlier draft of this row said.** The module is the right home because the step must exclude `textarea`, which already clears the floor through its 128px minimum and would be stretched by a blanket re-declaration. the form's `--enq-form-min-inline` holds the controls (Input has no floor since 6 Oct 2026); labels may wrap to two lines; the submit stays one line at both label lengths ("Request free audit" is 18 characters at `--btn-*`, ~150px against a 256px minimum) |
| **A parent that does not size it** (a wrapping row, not a grid track) | The `form` sets `min-inline-size: --enq-form-min-inline` 256px (the controls take the form's width; Input carries no floor of its own since 6 Oct 2026), so a `Cluster` or a shrink-to-fit parent cannot collapse either shape below a usable field. That 256px is the stated minimum; `--enq-form-max-inline` 470px is the stated maximum; between them the form is fluid                                                                                                                                                                                                                                           |
| Logical properties rather than left/right                             | Every inset, cap and rule is logical: `padding-inline`, `min-inline-size`, `max-inline-size`, `min-block-size`, `border-block-start` on the status rule. No `left`, `right`, `margin-left` or `text-align: left` anywhere in the component                                                                                                                                                                                                                                                                                                                                              |
| This component's surface nested inside a different one                | Neither `EnquiryForm` nor `Input` owns a ground; both layers declare their complete token sets under all four surfaces, so they are correct the instant `data-surface` changes on any ancestor. §15 renders them in a `blue` band inside an `ink` page to prove no paper value leaked through                                                                                                                                                                                                                                                                                           |
| Two of this component adjacent                                        | Two forms on one page is a **bug**, not a layout. The specimen renders an adjacent enquiry pair (§15) so the reviewer can see that ids do not collide — `useId` guarantees it — but the route rule stands at one form per page                                                                                                                                                                                                                                                                                                                                                          |
| Interactive content inside a slot                                     | Not reachable: `EnquiryForm` accepts no `ReactNode` slot. Its submit is owned markup, and `CtaSection` renders the scheduling link outside the form; callers cannot nest a second form or a control inside a control through this API                                                                                                                                                                                                                                                                                                                                                   |

---

## 13. Motion

| Property                                                                                        | Duration          | Easing              |
| ----------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| `border-color` on `control` (rest → hover → invalid)                                            | `--duration-fast` | `--easing-standard` |
| `color` on `status` (neutral ink → error ink; was `border-color` on its rule until 29 Sep 2026) | `--duration-fast` | `--easing-standard` |
| `outline-color` on the focus ring                                                               | `--duration-fast` | `--easing-standard` |

**Corrected at build, and the correction went against this table.** It previously listed `color` on
`label`, `message` and `status`, and the build had implemented all three literally. None of them can
fire: `--enq-label-ink`, `--enq-message-invalid-ink` and `--enq-status-ink` are each one constant per
surface, there is no second value in the token layer and no state class that would select one — and
§5 of this document says so in as many words ("the label, value and ground hold"). So the three
`transition: color` declarations were deleted rather than given states, and the `status` rule's
`border-color` — the one colour in the component that genuinely travels, and the only transition
this table never named — took their place above.

**What does NOT move.** No transform. No rotation. No scale. No fade — the Success panel replaces the form on the same frame, it does not cross-dissolve. No height animation: `--enq-message-reserve` exists precisely so the invalid message can appear without an animated height. No spinner, and no glyph rotation for Submitting — the busy state is a token change plus a live-region sentence, which is why §16 asks for `Button busy` rather than for a spinner. `Button`'s link-underline wipe is the system's one moving-rule precedent and this component does not extend it.

**Reduced motion.** All three transitions collapse to `--duration-instant`, and the selector list
was trimmed with the table above: it named `.label` and `.message`, which neutralised nothing. Every state remains fully distinguishable without them, because every state change is a colour change plus a glyph, a rule width or an ARIA attribute.

---

## 14. Do's and Don'ts

|       | Statement                                                                                                  | How a reviewer decides it                                                                                                           |
| ----- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Do    | Every surface-dependent `--enq-*` and `--inp-*` token is declared under all four `data-surface` blocks     | Count identical declarations per surface: 7 `--enq-*` plus 19 `--inp-*` = 26 × 4                                                    |
| Do    | `message` and `status` are in the DOM at Idle, empty (compact: `status` holds the caption)                 | Inspect the Idle specimen column; both elements exist                                                                               |
| Do    | The submit and the scheduling link are `size="lg"` (48), clearing the touch floor without `extendHitArea` (29 Sep 2026) | Grep EnquiryForm for `size="lg"` on both; `extendHitArea` has zero uses                                                              |
| Do    | Validation fires on `blur` and on no other event                                                           | Grep for `onBlur`; there must be no `onChange`- or `onSubmit`-driven validity call                                                  |
| Do    | Focus lands on the submit before the controls disable                                                      | Tab into the textarea, press Enter, and check the focused element in the Submitting column                                          |
| Do    | Every id is `useId`-derived                                                                                | Grep for `id="` with a literal string: zero hits                                                                                    |
| Don't | No state uses opacity                                                                                      | `EnquiryForm.module.css` has zero opacity declarations; `Input` uses only `opacity: 1` to defeat user-agent placeholder attenuation |
| Don't | No `margin` on any child                                                                                   | Grep for `margin`: zero hits                                                                                                        |
| Don't | No `background`, `color`, `padding-inline` or `max-width` applied to or around the enclosing `CtaSection`  | Read the page file's `CtaSection` call site: props only                                                                             |
| Don't | No `disabled` on the submit in any state                                                                   | Grep the submit's props for `disabled`: zero hits                                                                                   |
| Don't | No hex, `rgb()` or `hsl()` in the component's styles                                                       | Grep for `#`, `rgb(`, `hsl(`: zero hits                                                                                             |
| Don't | No `:has()`, and no selector that walks upward                                                             | Grep for `:has(`: zero hits. The only upward read is `data-surface`, which is a downward-inherited attribute                        |
| Don't | No raw px for a distance — every gap is a `Layout`/`Cluster` role name                                     | Grep the component's styles for `gap`: zero hits; grep the JSX for `rowGap`/`colGap`: role names only                               |
| Don't | Success does not render beside the form                                                                    | Toggle the Success specimen: the three controls are gone from the DOM, not hidden                                                   |

---

## 15. Specimen plan — `/design/enquiry-form`

Every band is a real `CtaSection` with this component in `form`, because that is the only place it ships.

1. **Variant ladder.** Separate real `CtaSection` bands render enquiry, audit, and contact. A following contract caption lists the six shared hidden names, audit's seventh `intent`, and the contact variant's direct mutation-field mapping.
2. **Interactive lifecycle mounts.** The form does not expose a dishonest forced-state prop. Labelled bands point to success, error and three-second pending endpoints; blur reaches Invalid, submission reaches Submitting and the endpoint reaches Error or Success. Hover, pressed and keyboard focus remain native interactions, so the page tells the reviewer to point, hold and Tab. Browser acceptance records each reached DOM state.
3. **All four surfaces as sibling bands, identical markup.** `paper`, `tint`, `ink`, `blue`, each holds the same enquiry form. Invalid is reached by blurring a field on each band rather than by adding specimen-only state to the production API.
4. **Nested-surface band.** A `blue` `CtaSection` immediately after an `ink` one, both holding the form, so a leaked value shows up as a mismatch between the two.
5. **Edge cases.** The audit band renders the 24-character label; the contract caption lists seven hidden fields and empty context values; a 256px illegal parent and a wrapping `Cluster` expose the minimum. Long prefilled native values are rendered on `/design/input`, the primitive that owns scrolling and wrapping, and are pasted through the real form during browser acceptance. The page is also checked at 375px to exercise the 767 rule.
6. **Two of the component adjacent** — two `CtaSection` bands back to back, with the note that this is a bug the specimen exists to make visible, and a check that no id collides.
7. **The component in a narrow track** — inside a 256px specimen track to prove the stated minimum, and inside a `Cluster` (a parent that does not size it) to prove it does not collapse.

---

## 16. New token requests

Six approved requests. Q1 is the separate architecture decision about _where_ rows 1–13 live rather than about a value; Q2 approves all three danger steps, and Q3 approves the three mechanism requests below.

```
NEW TOKEN REQUEST
Name:         --color-danger-600
Layer:        1 primitive
Value:        #B3261E
Why nothing existing works:  The palette has --color-success-500 and no failure counterpart, so a
              form cannot say "this is wrong" in any colour. The closest existing token is
              --color-neutral-900, which measures 14.62:1 on paper and reads as ordinary body ink —
              an invalid message in it is indistinguishable from the caption above it, leaving the
              close-circle glyph as the only carrier and putting the whole state on one 16px shape.
              --color-peridot-600 is forbidden (peridot never fills an action or a state) and
              --color-brandeis-500 means "clickable" everywhere else in the system. This step
              measures 6.48:1 on --color-paper and 5.78:1 on --color-paper-deep.
Blast radius: Every future form, every destructive confirm, and SiteFooter's newsletter field once
              it validates. If the value changes, the two ratios above must be re-measured; nothing
              geometric depends on it.

NEW TOKEN REQUEST
Name:         --color-danger-300
Layer:        1 primitive
Value:        #F5A29B
Why nothing existing works:  --color-danger-600 measures 1.82:1 on --color-neutral-950 and is
              unreadable on the ink surface; the four-surface rule requires the ink column to lift
              several steps, exactly as --color-brandeis-300 does for the focus ring. This step
              measures 8.65:1 on --color-neutral-950.
Blast radius: The ink column of every future form and confirm. Same ramp as above — the two must be
              re-tuned together or the ink and paper columns drift apart.

NEW TOKEN REQUEST
Name:         --color-danger-100
Layer:        1 primitive
Value:        #FFE0DC
Why nothing existing works:  On --color-brandeis-500, --color-danger-600 measures 1.52:1 and
              --color-danger-300 measures 3.12:1 — both under the 4.5:1 floor for the message
              sentence. The blue column has no rung below --color-brandeis-100 (4.91:1) to borrow,
              which is why this is the third step rather than a reuse. This step measures 5.03:1 on
              --color-brandeis-500 and 13.93:1 on --color-neutral-950.
Blast radius: The blue column of every future form. If blue ever changes ground, all three danger
              steps need re-measuring against it.

NEW MECHANISM REQUEST
Name:         per-field validity (aria-invalid + a reserved message line)
Layer:        3 component (a state axis, not a value)
Value:        A validity axis orthogonal to the fixed state model: a field may be invalid while
              being at rest, hovered or focused. Rendered as --inp-invalid-rule at
              --border-width-2, a close-circle glyph, a sentence in --enq-message-invalid-ink, and
              aria-invalid="true".
Why nothing existing works:  The fixed model has rest, hover, focus, pressed, held, disabled and
              expanded — none of which is a judgement about content, and all of which are about
              pointer or keyboard position. Encoding invalid as "pressed" or as a held class would
              make the token names lie, and encoding it as disabled would make a fixable field
              unusable. No existing component in the system validates anything, so there is no
              precedent to copy.
Blast radius: Every future form and the SiteFooter newsletter field. It adds one axis to the state
              table and one always-rendered element per field; it changes no existing component
              until the footer is refactored (Q1).

NEW MECHANISM REQUEST
Name:         asynchronous submission lifecycle (Submitting · Error · Success replacement)
Layer:        3 component
Value:        Three transitions on a form: Idle → Submitting (aria-busy on the form, controls
              disabled with their own tokens, focus moved to the submit, a polite live region
              filled), Submitting → Error (controls re-enabled with every character preserved,
              --enq-status-rule-error, focus held on the submit), Submitting → Success (the form
              unmounts and a focused role="status" region replaces it). No fade, no spinner, no
              height animation.
Why nothing existing works:  The system's stated position is that nothing is asynchronous and
              nothing fades, and that position is correct for all eleven shipped components — none
              of them talks to a server. This one does, on 56 routes. The alternative is a full page
              navigation to a thank-you route, which loses the typed answers on failure and costs a
              round trip on success; the brief rules it out by requiring that Error keeps what was
              typed. What this request does NOT ask for: any motion, any opacity, any new colour
              beyond the danger ramp above, or any portal.
Blast radius: Establishes the precedent that a pattern may hold async state. The lint rules and the
              state-model documentation both need the exemption written down, or the next component
              will copy the pattern without the argument.

NEW MECHANISM REQUEST
Name:         Button busy (a prop and its own token set, --btn-*-busy)
Layer:        3 component (Button, not EnquiryForm)
Value:        busy?: boolean. The button keeps its label, its focusability and its accessible name,
              takes aria-busy="true", and renders in its own busy tokens — declared, like every
              other Button state, once per surface. No spinner, no glyph, no opacity.
Why nothing existing works:  The brief forbids a disabled submit (it loses the label and the focus)
              and forbids opacity, and this component may not restyle a Button from outside. So
              there is no legal way to render "sending" on the control the visitor just pressed.
              The closest existing state is `active`, which means "this is the current one" and is
              wrong: a busy button is not selected. Note the ownership — this request belongs to
              Button's owner, and until it lands the Submitting state is carried only by the status
              sentence and aria-busy, which is announced but not seen.
Blast radius: Button, on all four surfaces × three emphases × two tones, plus one row in its state
              table. Every future form submit, and any action that talks to a server.
```

---

## 17. Open questions

All nine questions were resolved by the owner on **21 August 2026**. The original options and recommendations remain below, with the accepted decision recorded inline. Nothing remains BLOCKING. **One question is open again (6 Oct 2026): Q7, for `compact` and `contact`, below.**

**1. Does a tier-1 `Field` primitive get specified first? — ANSWERED, then superseded by Q9 on 21 August 2026.**
Options: (a) specify `Field` now; `EnquiryForm` composes it and draws no input of its own; `SiteFooter`'s newsletter field is refactored onto it in the same change. (b) `EnquiryForm` owns `--enq-field-*` and the site has two bespoke field token sets.
**Recommendation: (a).** Rows 1–13 of §6 are a _control_, not a form — they are the same 52 cells the footer already answered privately, and a second private answer means two sets that cannot read each other and diverge on the first re-tune. `Field` is a primitive by the tier test (a control, arranging nothing above itself), and it is small: label, control, flag, message, seven tokens' worth of surface work. Under (a) this document keeps §6 rows 14–19, §7's sizes for the form box and the textarea, the state machine, the hidden set, and the Success panel — and rows 1–13 move to `--fld-*` **verbatim, values and measured ratios unchanged**, which is why they are specified in full here either way. Blocking because it decides what this component _is_: a form that composes a control, or a form that contains one.

**Owner decision at spec review — accepted 21 August 2026: (a).** The shared-control decision stands. Gate 2 later discovered the repository's explicit `Input` / `--inp-*` reservation, so Q9 supersedes the primitive's name and narrows it to the control box; labels, flags and messages stay with `EnquiryForm`.

**2. Is the danger ramp granted? — ANSWERED, 21 August 2026.**
Options: (a) grant the three steps in §16. (b) refuse, and Invalid is carried by `--border-width-2`, the `close-circle` glyph and a message in the ordinary body ink.
**Recommendation: (a).** Under (b) the invalid message is typographically identical to the caption two rows below it, and the state rests on one 16px glyph. Blocking because four rows of the colour table have no legal value without it.

**Owner decision — accepted 21 August 2026: (a).** Add `--color-danger-600`, `--color-danger-300`, and `--color-danger-100` with the values and measured contrast ratios in §16.

**3. Is the async lifecycle mechanism granted, and does `Button` get `busy`? — ANSWERED, 21 August 2026.**
Options: (a) grant both. (b) grant the lifecycle, refuse `busy` — Submitting is then announced but invisible. (c) refuse both and navigate to a thank-you route, losing the typed answers on failure.
**Recommendation: (a).** (c) is ruled out by the brief's Error rule. If only (b) is available, ship it and log the gap — an invisible busy state is bad; a disabled submit is worse.

**Owner decision — accepted 21 August 2026: (a).** Add the async lifecycle to `EnquiryForm` and add the visible, focus-preserving `busy` state to `Button` on all four surfaces.

**4. What does Success replace the form with? — ANSWERED, 21 August 2026.** Options: (a) a sentence. (b) a sentence and the scheduling action. (c) a sentence, the scheduling action, and what happens next.
**Recommendation: (b)** — the heading, one sentence naming the reply and its window, and `scheduleAction`. This is the only place the visitor has finished something and still has attention; leaving them a single next step they might actually want is worth more than a reassurance paragraph. (c) duplicates `CtaSection`'s `points`, which are still on screen above. Non-blocking — (a) is a two-line change.

**Owner decision — accepted 21 August 2026: (b). Implementation reconciliation.** The intent is
preserved with one scheduling action, but brief 08 already makes that action mandatory and
persistent in `CtaSection`. Rendering a second node inside Success produced two identically named
links and violated `CtaSection`'s exact-one invariant. Success therefore renders the heading and
reply sentence; the CTA-owned scheduling action remains immediately after it in DOM and visual order.

**5. Is "See available times" a link-emphasis `Button` or a solid secondary? — ANSWERED, 21 August 2026.**
Options: (a) `emphasis="link"`. (b) `emphasis="ghost" tone="neutral"`. (c) `emphasis="solid" tone="primary"`.
**Recommendation: (a)** for the action that survives Success. It remains a full-sized, focusable anchor with the system link rule and 44px hit area, while reading as a secondary navigation choice rather than another form action. Solid primary would read as a second ask.

**Owner decision — revised 21 August 2026: (a).** The scheduling action remains required by brief 08 and owned by `CtaSection`, which renders it as `emphasis="link" tone="neutral"`; EnquiryForm neither duplicates nor restyles it. *Superseded:* since 29 Sep 2026 EnquiryForm renders it, and since fdn-blue (6 Oct 2026) at `tone="primary"`.

**Superseded in part, 29 Sep 2026 (tracker 2.17).** Still (a), link emphasis, neutral — now `size="lg"` with a trailing `arrow-right`. Ownership moved: EnquiryForm renders it beside its submit and carries it into Success, and `CtaSection` no longer renders it, so the band still has exactly one.

**6. What element level carries the Success heading? — ANSWERED, 21 August 2026.** The role is `--text-h5`; the element is the question. `CtaSection` owns the band's `h2`, so the Success heading is an `h3` at `--text-h5` scale — a level-vs-scale mismatch this system has no `Heading` component to mediate.
Options: (a) `h3` at `--text-h5`. (b) no heading; the `--text-lead` sentence alone.
**Recommendation: (a)**, and note that this is the second component to want a level-independent heading role. Non-blocking.

**Owner decision — accepted 21 August 2026: (a).** Render an `h3` at the `--text-h5` role.

**7. Are the two-column and inline-row arrangements specified? — ANSWERED 21 August 2026; REOPENED 6 Oct 2026 for compact and contact (OPEN, non-blocking).**
**Recommendation: no** — Stacked only, as §4 records. All 56 routes resolve to Stacked, and the 470px track cannot hold two useful tracks. Non-blocking; recorded so the next reader knows it was decided rather than forgotten.

**Owner decision — accepted 21 August 2026: no.** Stacked is the only arrangement.

**Reopened 6 Oct 2026 for `compact` — OPEN, for the owner.** (Extended in the final round to `contact`, which pairs Name/Company and Email/Phone the same way so its five fields fit a band: one per row they were 1021 tall at 1470.) The kit brief asks for a compact form of name, email, message and submit at ≤ 400 tall. Stacked, those four are 480; so compact sets name and email as a pair wherever its own track holds two 192px fields (the 667 copy column beside a photo, the centred and beside bands) and stacks them below that. The full field sets stay stacked, as decided. Owner: confirm the pair, or rule a shorter textarea for compact instead.

**8. Where do the four URL wordings live — a closed union in code, or a CMS field? — ANSWERED, 21 August 2026.**
Options: (a) the union in §3. (b) a free string off the route record.
**Recommendation: (a).** A free string is how 56 routes become 56 wordings; a union makes a fifth wording a review. Non-blocking, but it is a one-way door: (a) → (b) is trivial, (b) → (a) means auditing 56 records.

**Owner decision — accepted 21 August 2026: (a).** Keep the four URL labels as the closed literal union in §3.

**9. Does the accepted `Field` name supersede the repository's reserved `Input`, or does the reservation win? — ANSWERED, 21 August 2026; was BLOCKING at build Gate 2.**
Options: (a) keep `Field` / `--fld-*`, supersede the reservation, and let the footer adopt the standard field treatment; (b) use the reserved `Input` / `--inp-*` primitive and preserve the footer treatment.
**Recommendation after reading the reservation:** (b). The reservation predates this spec and is explicit in both `footer.css` and `SiteFooter.module.css`. `Input` is the control-only seam those files planned: the pattern continues to own its label and message composition, while the reusable box owns `bg` / `fg`, rules, focus, disabled and invalid. Preserving the footer requires a second reusable emphasis rather than a footer override, so the API is `emphasis="standard" | "quiet"`; the existing footer geometry and surface treatment move into `quiet`, and `standard` takes the enquiry values above. The light-surface placeholder alone steps darker to clear the text floor.

**Owner decision — accepted 21 August 2026: (b).** Use `Input` and preserve the footer treatment. `EnquiryForm` uses the default `standard` emphasis; `SiteFooter` uses `quiet`. This decision discharges the reservation and keeps the tier rule: neither pattern styles a native input privately.

**Superseded 29 Sep 2026 (tracker 2.17).** `quiet` rendered nearly identically to `standard` on paper and ink; the owner merged it into standard and deleted it, with the `emphasis` prop. `SiteFooter` uses the standard field. The reservation discharge stands.

---

## Amendment · 1 Oct 2026 — the field contract (owner)

Owner: *"i'd like the field labels to be much simpler. Email Address could simply be Email … the
'optional' label is also not very pretty. the error messages could also be much much simpler. some
fields don't need to reserve space for hints like the Site URL field … fields that need validation can
have that other fields don't."* Asked to be recorded as a pattern in the component.

**The cause.** `FieldGroup` gave every field one anatomy: a label, an optional mono flag beside it, and
a message row always reserved under the control. A field that could never fail still held an empty
error line; "Optional" was a third voice in capitals; nothing in the frame pushed labels or errors to
be short. The URL field only had an error row because it rejected anything not starting with
`https://` — a rule a person had to learn that the form could apply itself.

**The pattern** — every field declares its contract, and the anatomy follows:

| Part | Rule |
|---|---|
| Label | The **noun** for the value: Email, Name, Company, Phone, Website. A longer label only where the noun is ambiguous or the field asks for free text ("What are you working on?" tells a person what to write). Never "Your …", never "… Address", never Title Case |
| Optional | Said **inside** the label, in the label's own role and `--enq-hint-ink`: "Website (optional)". Mark the minority only |
| Hint | A row under the label, `--text-caption` in `--enq-hint-ink`, **only when the field has something to explain**. The control's `aria-describedby` names it |
| Validation | **Only a field that can fail reserves the message row** (`--enq-message-reserve`, one caption line). A field that cannot fail has no row and no describedby to it |
| Errors | Say what to do, in a few words, no period, no blame: "Enter your email", "Enter a valid email", "Enter your phone number", "Add a message" |
| Normalise, don't reject | Every rule the form can apply itself is an error nobody sees. URL: a scheme-less value gets `https://` on blur; the field no longer validates |

**Applied:** enquiry/audit — Email · What are you working on? · Website (optional) / Site to audit
(optional). Contact — Name · Company · Email · Phone · Message. `FieldGroup` takes `label`,
`optional`, `hint?: { id, text }` and `validation?: { id, message }`; the `flag` slot and its id are
gone. §2, §3, §6, §7 and §8 rows are amended in place; where older prose below still says "flag" or
quotes an old label, this amendment wins.

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states a tier (2 pattern), a Status (implemented), and a token prefix (--enq-*) that
    collides with nothing in the taken list.
[x] Every part named in Anatomy appears in the colour table, the geometry list, or both — form,
    fieldset, group, actions and hidden are explicitly marked as carrying no value of their own.

NAMES
[x] Count of distinct token-shaped names used after implementation reconciliation: 119, including the
    historical --fld-* / --enq-field-* names retained only inside Q1's rejected option and the
    --foot-field-* migration sources. Every accepted implementation name appears verbatim in
    vocabulary.md, is an approved --inp-* / --enq-* component token, or is a NEW TOKEN REQUEST
    (--color-danger-600 / -300 / -100). Checked one at a time: --color-paper,
    --color-paper-deep, --color-white, --color-neutral-100/200/300/400/500/600/700/800/900/950,
    --color-brandeis-50/100/200/300/400/500, --color-success-500, --gap-tight/-text/-block
    (as Layout/Cluster role names), --text-ui, --text-ui-tracking, --text-micro,
    --text-micro-tracking, --text-mono-case, --text-body, --text-body-sm, --text-caption, --text-lead, --text-h5,
    --text-h5-tracking, --measure-body, --radius-0, --radius-8, --border-width-1, --border-width-2,
    --focus-ring-width, --focus-ring-offset, --duration-fast, --duration-instant,
    --easing-standard, --shadow-none, --z-base, --btn-height-md, --btn-hit-min, --btn-radius,
    --crumb-hit-min, --foot-field-height, --foot-field-padding-x, --foot-field-radius,
    --foot-field-min-inline, --nav-item-padding-x, --sec-container, --lay-track-sm.
[x] Every glyph named (close-circle, check-circle) is in the 17-glyph set. No new glyph requested.
[x] Every prop and prop VALUE given for Section, Layout or Cluster is in the published unions:
    Layout rowGap tight|text|block, columns={2}|"tile", minTrack="sm", colGap="gutter",
    as="form"; Cluster colGap="tight" rowGap="tight" align="center"; CtaSection
    arrangement="split", surface paper|tint|ink|blue.
[x] Zero hex codes / rgb() / hsl() / colour words outside the contrast measurements and the three
    NEW TOKEN REQUEST value lines, where the brief requires an exact value.
[x] Zero Tailwind class names. Zero CSS declarations, selectors or @media blocks (media queries are
    named in prose as "at 1023" and "at 767" only).
[x] Every --text-* role paired with a tracking companion is on the list that has one (ui, micro,
    h5). The seven with none are marked "none — this role has no tracking companion".
[x] Every layout distance is a gap-scale role name, referred to by name.
[x] Every space-ramp reach carries its justification sentence. Count: 2 — Input's inline padding
    and textarea block padding, both optical control insets at --space-12 rather than sibling gaps.
[x] Every literal pixel value is a component size or a container cap, t-shirt named, and says what
    it was measured against. Count: 8 (§7b).

COLOUR AND CONTRAST
[x] One row per token, four columns: paper, tint, ink, blue.
[x] No cell is empty, "same as paper", or a delta. Rows: 20 × 4 in the main ownership table plus
    7 × 4 in Input's preserved quiet-emphasis table = 108 cells.
[x] Every text colour has a measured ratio against the exact ground or fill it sits on — the field
    inks are measured on the field ground, not on the band; the flag, label, message, status,
    success and caption inks are measured on the band ground they actually sit on.
[x] Every text ratio is ≥ 4.5:1 except the four --inp-disabled-fg cells, each marked as the
    deliberate exception.
[x] The focus ring is measured against its own gap colour on all four surfaces: 6.18 · 5.51 · 7.32
    · 6.23.
[x] Decoration is marked "n/a — decoration".
[x] One paragraph per surface explains what moved and why.
[x] The nested-surface case is addressed in §6 and rendered in §15 band 4.

STATES
[x] Every state claimed comes from the fixed model with the repo's suffix; the three that do not
    exist in the model (validity, submitting, error) are raised as NEW MECHANISM REQUESTs with
    their arguments, not added quietly.
[x] Pressed does not exist in this component, and its absence is stated as an assertion in §5, so
    the hover-versus-pressed check resolves by exclusion rather than by a duplicate value.
[x] Every state token introduced moves on at least one surface: -hover moves the rule on all four;
    -disabled and -invalid move on all four. No token was kept whose value never changes.
[x] Every state token is declared on all four surfaces, including where it equals rest.
[x] Disabled uses its own three tokens and no opacity. No state is carried by colour alone —
    Invalid adds a glyph, a 2px rule and aria-invalid; Submitting adds a live sentence and
    aria-busy; disabled adds the native attribute.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement is a Section (CtaSection's), a Layout or a Cluster. colGap is stated on every
    Cluster that puts two things side by side, and on the one specimen Layout that sets columns;
    omitted on every single-track Layout.
[x] No margin on any child, anywhere in the spec.
[x] No media query changes a gap step or a type role. The only responsive change is the field
    height token and the arrangement CtaSection performs.
[x] Every part carrying running text names a measure (--measure-body for the success sentence and
    the caption; the 470px cap for the control value).
[x] Every interactive target reaches 44px on touch: fields by stepping the size up
    (--inp-height-touch), buttons by Button extendHitArea. Both means stated, each with its
    reason.
[x] Every ARIA idref points at an element that is ALWAYS rendered (message, status, flag), and §11
    states what would be required of aria-controls if the Success panel were revealed rather than
    substituted.
[x] No selector walks upward; no :has(); every state is a prop, a class or a native attribute.
    data-surface is read downward.

COMPLETENESS
[x] All thirteen content edge-case rows answered; the unreachable ones say why they are
    unreachable rather than "n/a".
[x] The "parent that does not size it" row names the minimum: --enq-form-min-inline 16rem (was --inp-min-inline, deleted 6 Oct 2026).
[x] Do's and Don'ts are testable — each row names the grep, the specimen column or the diff count
    that decides it.
[x] The specimen plan renders all three variants × the one size × all four surfaces, reaches Invalid,
    Submitting, Error and Success through the real blur/submission lifecycle, notes that
    hover/pressed/focus must be performed, and includes the nested-surface band, both-adjacent,
    the 256px track and the unsized Cluster parent. Primitive-owned long-value behavior is rendered
    on `/design/input` and repeated during browser acceptance.
[x] Section 16 lists six justified requests in the block form.
[x] Every open question has options, a recommendation, and its owner decision recorded inline.
    Three were BLOCKING in the design review; Q9 was BLOCKING at build Gate 2. All four are resolved.
[x] Squint test: the block reads as three ideas, not one rectangle repeated — a tight label/control
    pair repeated at the text rhythm, a block-sized break, then the action group at a different rhythm
    with a caption below it; and Success is a different shape entirely (a rule, a heading at
    display scale and one lead line) rather than the form's silhouette refilled. The CTA-owned
    scheduling action remains beneath either shape, so there is exactly one next step.
```


## Amendment · 16 Oct 2026 — errors on send only (owner)

"Errors must not show until a person clicks submit. We don't show errors on focus change." This reverses
the blur-only rule wherever this spec states it (§ 7 Invalid row, § 11 semantics and the screen-reader
script, § 14 the `onBlur` Do, § 15 items 2 and 3):

- **Invalid is reached by a send only.** The submit sweep flags every failing field at once, says how
  many need a look and moves focus to the first, as before. Leaving a field never judges it.
- **Editing a flagged field only clears its message**, the moment its value is valid (`onInput`). No
  message is ever added while someone types or moves between fields.
- The URL field still normalises its value on blur. That is not validation and shows nothing.
- The screen reader hears the field's message after a send, not on leaving the field.

## Amendment · 16 Oct 2026 — `dress`: the card and the message (owner, the home close)

"It just looks like a blank box with a few lines." The enquiry set (variant `enquiry` only) takes an
optional `dress`; behaviour, field names, validation, statuses and the success view are unchanged.
- **`card`**: the form's own h3 (`title`), VISIBLE labels (`--text-label`, new) over `fill` fields
  (new Input appearance: a soft well, no rule at rest), "Optional" at the end of the link field's label
  row, an example in the big field (`prompt`), and a foot under a hairline: the send and one line,
  "or write to {writeTo} · {note}", which a send's status replaces.
- **`message`**: a person (`from`: name, role, portrait as a circle) and their one-sentence `note` in a
  bubble, then a composer: the big field first (`bare` Input, new), email and link as its keyed
  details, the send in its foot beside "or write to". The composer draws the focus indicator
  (`:focus-within`), which is why `bare` is never used outside it.
- Copy is the caller's. New `--enq-*` surface tokens on all four surfaces; the form's floor is 14rem.
