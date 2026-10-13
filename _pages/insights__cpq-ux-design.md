---
route: /insights/cpq-ux-design
slug: cpq-ux-design
page_name: 'CPQ UX: designing configure-price-quote software sales teams will use'
page_type: article
seo:
  title: 'CPQ UX: how to design quoting software reps use | Tcules'
  description: 'How to design CPQ software around the quote: who contributes, rules that explain themselves, visible
    prices and approvals, and revisions that keep context.'
  canonical: https://www.tcules.com/insights/cpq-ux-design
  robots: index,follow
social:
  og_title: 'CPQ UX: how to design quoting software reps use | Tcules'
  og_description: 'How to design CPQ software around the quote: who contributes, rules that explain themselves,
    visible prices and approvals, and revisions that keep context.'
  og_image: https://www.tcules.com/assets/og/insights.png
  og_image_alt: Tcules social card headed Insights, on a white background with the Tcules wordmark.
  og_type: article
  article_published_time: null
  article_modified_time: '2026-10-07'
  og_url: https://www.tcules.com/insights/cpq-ux-design
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: 'CPQ UX: how to design quoting software reps use | Tcules'
  twitter_description: 'How to design CPQ software around the quote: who contributes, rules that explain themselves,
    visible prices and approvals, and revisions that keep context.'
  twitter_image: https://www.tcules.com/assets/og/insights.png
search_context:
  primary_intent: CPQ UX design
  primary_buyer_question: How should configure-price-quote software be designed so sales teams use it?
  key_entities:
  - CPQ
  - configure-price-quote
  - quote approval
  - quote revision
  - Auxentios
  buyer_question_evidence:
    status: NO_V7_QUESTION_EVIDENCE; DO_NOT_ADD_FAQ_WITHOUT_RESEARCH
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Insights
    url: /insights
  - name: 'CPQ UX: designing configure-price-quote software sales teams will use'
    url: /insights/cpq-ux-design
render:
  band_order:
  - how-should-cpq-software-be-designed
  - decide-which-kind-of-quote-you-are-designing-for
  - the-quote-is-the-shared-object
  - make-the-configuration-rules-explain-themselves
  - make-the-price-and-the-approval-visible-before-submission
  - design-for-the-revision-not-the-first-draft
  - how-to-tell-whether-reps-are-using-it
  - if-you-are-re-platforming-move-the-model-not-the-screens
  - cpq-ux-checklist
  - where-this-work-sits
structured_data:
  types:
  - WebPage
  - Article
  - BreadcrumbList
  organization_ref: https://www.tcules.com/#organization
  article_publisher_ref: https://www.tcules.com/#organization
  article_author_source: editorial.author
  article_date_published_source: editorial.published_at
  article_date_modified_source: editorial.modified_at
  article_date_published: null
  article_date_modified: '2026-10-07'
  article_authors:
  - type: Organization
    name: Tcules
    ref: https://www.tcules.com/#organization
editorial:
  author: Tcules Editorial
  author_role: Product & Design Engineering, Tcules
  reviewer: null
  published_at: null
  modified_at: '2026-10-07'
  date_as_displayed: Last updated on 7 Oct ’26
  reading_time_as_displayed: 11 Min Read
  topic_tags:
  - SaaS
  - Data-heavy
  standfirst: 'How to design CPQ software around the quote: who contributes, rules that explain themselves, visible
    prices and approvals, and revisions that keep context.'
release:
  content_state: LIVE_CAPTURE_2026-10-08
  site_release_state: SITE_RELEASE_HOLD
  composition: NOT_COMPOSITION_VALIDATED
  production: NOT_PRODUCTION_VALIDATED
  free_audit_role: DOES_NOT_DEPEND_ON_FREE_AUDIT
  site_dependencies:
  - SITE_PRODUCTION_QA
  - MIGRATION_EXECUTION
  - SITEMAP_DEPLOYMENT
  - SOCIAL_IMAGE_ASSET_VALIDATION
  - HUMAN_MARKETING_REVIEW
  route_dependencies:
  - CLAIM_EVIDENCE_VERIFICATION
  feature_dependencies: []
  legal_dependencies: []
migration:
  redirects_from: []
content_governance:
  language: en-GB
  source: live_capture
  source_url: https://www.tcules.com/insights/cpq-ux-design
  captured_at: '2026-10-08T19:46Z'
  change_log: 11-batch-6/live-capture-log.md
  governing_rules: Tcules-VNext-Working-2026-10-08/00_RULEBOOK.md
  direct_quote_policy: preserve_verbatim_source_checked
  authorship_policy: preserve_named_human_author_and_real_dates_where_present
page_composition:
  editorial_review:
    section_components:
      how-should-cpq-software-be-designed: argument_thesis
      decide-which-kind-of-quote-you-are-designing-for: comparison_decision
      the-quote-is-the-shared-object: argument_thesis
      make-the-configuration-rules-explain-themselves: argument_thesis
      make-the-price-and-the-approval-visible-before-submission: argument_thesis
      design-for-the-revision-not-the-first-draft: argument_thesis
      how-to-tell-whether-reps-are-using-it: argument_thesis
      if-you-are-re-platforming-move-the-model-not-the-screens: argument_thesis
      cpq-ux-checklist: comparison_decision
      where-this-work-sits: argument_thesis
  media_bindings: []
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
  cms_contract:
    version: semantic-v11
  related_content:
  - anchor: Auxentios CPQ case study
    target: /case-studies/auxentios-cpq-product-mvp-design
    source: live_body_link_remapped
---

*Insights · SaaS · Data-heavy*

# CPQ UX: designing configure-price-quote software sales teams will use

*Tcules Editorial, Product & Design Engineering, Tcules · Last updated on 7 Oct ’26 · 11 min read*

Design CPQ software around the quote, not around the rep's screen. Decide who contributes to a quote and with what authority, make configuration rules and price changes explain themselves, let people revise without starting over, and show what needs approval before anyone submits. The test reps apply is whether it is faster and safer than their spreadsheet.

## How should CPQ software be designed? {#how-should-cpq-software-be-designed}

Published guides to CPQ UX tend to treat it as an interface problem for the sales rep: a clear, simple layout, onboarding, consistent visual design, integration with the CRM ([UXmatters](https://www.uxmatters.com/mt/archives/2023/03/using-ux-design-to-enhance-the-performance-of-cpq-systems.php)). That advice is sound as far as it goes. It says little about where quoting gets hard when several people each own part of a quote.

Gartner describes CPQ suites as software supporting the configuration, pricing and quote generation that accompany solution and negotiated selling, typically built from rules or constraint engines, pricing engines and proposal generators, with approval workflows around them ([Gartner glossary](https://www.gartner.com/en/information-technology/glossary/configure-price-quote-cpq-application-suites)). Each of those parts produces a decision someone has to trust:

- this configuration is valid;
- this price is right;
- this discount is allowed, or who has to allow it;
- this version is the one the customer saw.

The design job is to make each of those decisions visible to the person who has to act on it, at the moment they act.

## Decide which kind of quote you are designing for {#decide-which-kind-of-quote-you-are-designing-for}

Before any screen, settle what a typical quote in your product looks like. The split below is our working judgement, not an industry taxonomy, but it changes almost every later decision.

|  | Rep-assembled quote | Expert-assembled quote |
|---|---|---|
| Typical contents | Plans, seats, add-ons, term, discount | Configured or engineered products, solution design, service and maintenance terms |
| Who changes it | The rep, with a manager or deal desk for discounts | The rep plus product, solution, pricing and service specialists |
| What slows it down | Fields, clicks and waiting for discount approval | Waiting for specialist input, lost context between hand-offs, rework after a late change |
| Design priority | Speed to a valid quote, good defaults, clear guardrails | Visible ownership, hand-offs, state and revision history |

A product can sit anywhere between the two. The expensive mistake is designing for one while your customers live in the other: a fast single-user form for quotes that really need three specialists, or a heavy collaborative workflow for a seat-count renewal.

## The quote is the shared object {#the-quote-is-the-shared-object}

When Tcules designed the MVP for Auxentios, an industrial CPQ product, the research included eight qualitative interviews with people in six roles: sales representative, sales manager, product expert, pricing expert, solution expert and maintenance expert. The existing work moved between CRM records, internal communication, product knowledge, pricing, service contracts and customer revisions.

Each role carried different knowledge and authority into the same quotation. The sales representative needed progress and customer context. The pricing expert needed commercial rules. Product and solution experts needed configuration detail. Maintenance work could change the offer after the initial product decision. Designing for one generic "enterprise user" would have hidden the coordination the product actually had to do.

So the research became a responsibility map: who contributes what to a quote, where information changes, and where a person needs a hand-off or an exit rather than a forced linear sequence. The product was expected to need more than 200 screens, so the interface system came after that model. Use cases were mapped to screens, and repeated needs were extracted into components. A component library built before the role model would have standardised visual fragments while leaving the product logic unresolved.

The case study sets out five questions for any workflow that crosses roles with different authority. They apply to any quoting product where more than one role touches the quote:

1. What shared object are these roles changing?
2. What evidence can each role see and contribute?
3. Who decides, approves or returns the work?
4. Which states and exceptions must survive a hand-off?
5. Which interface rules can become reusable without erasing role-specific work?

A boundary worth stating: that engagement was MVP design that Auxentios could take into development. It tells you how to model a multi-role quote. It is not evidence about rep adoption or quoting speed, and we don't cite it as such. The [Auxentios CPQ case study](/case-studies/auxentios-cpq-product-mvp-design) sets out what Tcules did and what the MVP could express.

## Make the configuration rules explain themselves {#make-the-configuration-rules-explain-themselves}

The configurator is where a CPQ earns or loses trust. The user research here is about web and sales configurators rather than rep-facing B2B tools, so treat it as close evidence, not direct evidence.

A 2022 survey of web configurator users by Leclercq, Abbasi, Dumas, Remiche and Heymans found that the validity of the configured product, and how well it matched the user's needs, were the most desired perceived values. Missing usability, missing product visualisation and a missing progress or state indicator were the worst defects ([Proceedings of the ACM on Human-Computer Interaction, 2022](https://doi.org/10.1145/3534519)). For a rep, validity is the whole point: a quote the factory or the billing system later rejects is worse than a slow one.

Four design moves follow.

Say why an option is unavailable. "Unavailable" teaches reps nothing. "Not available with a 12-month term" tells them what to change. This is the plain-language error rule in [Nielsen's heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/): name the problem precisely and suggest a fix. Configuration research treats detecting and diagnosing conflicting constraints and requirements as a subject in its own right ([Felfernig et al., 2014](https://tugraz.elsevierpure.com/en/publications/conflict-detection-and-diagnosis-in-configuration/)); the interface is where that diagnosis has to reach a person.

Let people change an earlier choice without starting over. Trentin, Perin and Forza call this flexible navigation: change a choice made at any earlier step, then revise only the later choices that the change made invalid, and keep a saved configuration to return to ([Trentin, Perin and Forza, 2012](https://ceur-ws.org/Vol-958/paper9.pdf); journal version in [Computers in Industry, 2013](https://www.sciencedirect.com/science/article/abs/pii/S0166361513000213)). In a CPQ, a change of region or term should flag the specific lines it broke, not reset the quote.

Show where the quote stands. Which sections are complete, which are waiting on someone, which are invalid. The same survey ranked a missing progress and state indicator among the worst defects.

Give experienced reps a direct path. Guided selling questionnaires can help new reps and slow down experienced ones. Nielsen's flexibility heuristic applies: shortcuts, hidden from novice users, that let experts move faster ([NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/)). Offer the guided path and a straight route to the catalogue, and let both produce the same valid quote.

The people who maintain the rules are users too. In the Auxentios research the pricing expert needed commercial rules; in any CPQ product someone, in product, pricing or sales operations, has to keep the rules current. If they can't see which rule blocked a quote, reps will route around the rule instead of getting it fixed.

## Make the price and the approval visible before submission {#make-the-price-and-the-approval-visible-before-submission}

A total with no build-up invites a spreadsheet check. Show how the price was reached: list price, rule-driven adjustments, the rep's discount, and which of those the rep controls. Trentin, Perin and Forza's "benefit-cost communication" makes the same point for configurators: show what each option gives and what it costs, including non-monetary costs such as a longer delivery lead time ([Trentin, Perin and Forza](https://ceur-ws.org/Vol-958/paper9.pdf)). Their paper also cautions that this can add choice complexity, for example when each option is priced individually, so pair it with navigation that narrows the options first.

Approvals need the same treatment. If a discount above a threshold needs a manager, show the threshold while the rep is editing, not as a rejection after submission. And when a rejected quote comes back, re-ask only what changed. Salesforce's Advanced Approvals implements this as Smart Approvals: on resubmission, approvers aren't asked again for a condition whose tested value hasn't changed ([Salesforce Trailhead](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/use-smart-approvals-to-evaluate-changes)). The principle holds whatever platform you build on. Every unnecessary re-approval teaches reps that the tool costs time.

## Design for the revision, not the first draft {#design-for-the-revision-not-the-first-draft}

The first quote is not necessarily the one that closes. Oracle's Siebel CRM documentation describes the negotiation phase plainly: users add or remove products and compare features and price; a revision creates a new record under the same quote number, and the original becomes read-only. It also notes that editing a quote does not by itself create a version ([Oracle documentation](https://docs.oracle.com/cd/G30557_01/books/OrdMgt/c-Revising-a-Quote-rq1004447.html)). That last detail is a design decision with consequences: if versions are opt-in, someone will overwrite the version the customer is holding.

In the Auxentios work, customer and internal communication continued while the quotation was revised. Design for that:

- Make "which version did the customer see?" answerable at a glance.
- Compare versions side by side and highlight what changed, and which change moved the price. Trentin, Perin and Forza describe this as easy comparison: showing which choices caused the price difference between two configurations ([Trentin, Perin and Forza](https://ceur-ws.org/Vol-958/paper9.pdf)).
- Keep the specialists' contributions attached to the version they applied to, so a late maintenance change doesn't silently invalidate an earlier pricing decision.

## How to tell whether reps are using it {#how-to-tell-whether-reps-are-using-it}

Login counts won't tell you. The workaround will. When a quote keeps leaving the product, for a spreadsheet, a chat thread to the pricing team or an emailed PDF edited by hand, it marks the part of the job the product has stopped supporting.

Signals worth watching (our judgement, not benchmarks):

- quotes built elsewhere and entered into the CPQ at the end;
- questions to product or pricing specialists that happen in chat rather than on the quote;
- quotes rejected at approval for reasons the rep could have seen while editing;
- resubmissions that re-trigger approvals nobody needed;
- disputes about which version the customer accepted.

The most reliable method is still the plainest: watch a few reps build real quotes, including one awkward deal. If the cause of the trouble is disputed inside the team, a structured [UX audit](/audits/ux-product-audit) can separate interface problems from model and rule problems before anything is redesigned.

## If you are re-platforming, move the model, not the screens {#if-you-are-re-platforming-move-the-model-not-the-screens}

Salesforce no longer sells new Salesforce CPQ licences to new customers. The product is in a maintenance phase with no announced end-of-life date, and Salesforce points new investment to Revenue Cloud Advanced ([Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/)). Existing customers can keep using it, and there is no forced migration.

For teams that do move, whether to Revenue Cloud, another CPQ or a product of their own, our advice is to treat the move as a chance to re-model the quote rather than a screen-for-screen port. Porting screens carries the old workarounds across with them. Re-mapping roles, rules, approvals and revisions first is slower at the start and gives the new build something coherent to express. Where the quoting tool sits inside an ageing product, that is [software modernisation](/services/product-modernisation) work as much as a CPQ project.

## CPQ UX checklist {#cpq-ux-checklist}

| Question | What good looks like | Warning sign |
|---|---|---|
| Who changes a quote? | Named roles, each seeing what they need and contributing on the quote itself | Specialists answer in chat or email; the rep re-keys it |
| Is the configuration valid? | Conflicts explained in plain language, with a way to fix them | Disabled options with no reason |
| What happens after an earlier change? | Only the invalidated choices are flagged | The quote resets or silently keeps invalid lines |
| Why is the price what it is? | A visible build-up, with rep-controlled parts marked | Reps check totals in a spreadsheet |
| Will this need approval? | Thresholds visible while editing; only changed conditions re-approved | Surprise rejections; repeat approvals for unchanged terms |
| Which version is live? | Versions created deliberately, compared side by side, customer-facing version clear | Overwritten quotes; disputes over what was sent |
| Can experts move fast? | A direct path alongside guided selling | Experienced reps click through required questions to get past them |
| Can rule owners see what blocked a quote? | Blocked quotes traceable to a named rule | Reps route around rules instead of reporting them |

## Where this work sits {#where-this-work-sits}

Modelling roles, records and hand-offs before drawing screens is a discipline Tcules applies across [B2B SaaS and workflow software](/expertise/b2b-saas-workflow-software). To see that approach applied to a quoting product, read the [Auxentios CPQ case study](/case-studies/auxentios-cpq-product-mvp-design): six specialist roles, eight interviews and one quotation workflow modelled before the interface system was built.

[Tell us where quotes slow down or need rework](/contact).
