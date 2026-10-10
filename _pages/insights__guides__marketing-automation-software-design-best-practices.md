---
route: /insights/guides/marketing-automation-software-design-best-practices
slug: marketing-automation-software-design-best-practices
page_name: Design marketing automation around decisions, not dashboards
page_type: guide
seo:
  title: 'Marketing automation UX: design the campaign model | Tcules'
  description: Make marketing automation software easier to understand by modelling audiences, signals, rules, actions, permissions and campaign state in the interface.
  canonical: https://www.tcules.com/insights/guides/marketing-automation-software-design-best-practices
  robots: index,follow
social:
  og_title: 'Marketing automation UX: design the campaign model | Tcules'
  og_description: Make marketing automation software easier to understand by modelling audiences, signals, rules, actions, permissions and campaign state in the interface.
  og_image: https://www.tcules.com/assets/og/insights.png
  og_image_alt: Tcules social card headed Insights, on a white background with the Tcules wordmark.
  og_type: article
  article_published_time: '2025-05-02'
  article_modified_time: '2026-09-08'
  og_url: https://www.tcules.com/insights/guides/marketing-automation-software-design-best-practices
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: 'Marketing automation UX: design the campaign model | Tcules'
  twitter_description: Make marketing automation software easier to understand by modelling audiences, signals, rules, actions, permissions and campaign state in the interface.
  twitter_image: https://www.tcules.com/assets/og/insights.png
search_context:
  primary_intent: Design marketing automation around decisions, not dashboards
  primary_buyer_question: What happens when a message should not send?
  key_entities:
  - marketing automation software
  - consent and suppression
  - message approval
  buyer_question_evidence:
    status: NO_V7_QUESTION_EVIDENCE; DO_NOT_ADD_FAQ_WITHOUT_RESEARCH
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Insights
    url: /insights
  - name: Guides
    url: /insights/guides
  - name: Design marketing automation around decisions, not dashboards
    url: /insights/guides/marketing-automation-software-design-best-practices
subscription:
  form: insights_newsletter
  anchor: subscribe
  visible_fields:
  - Email
  consent:
    type: explicit_opt_in_checkbox
    confirmation: none, simple opt-in
    unsubscribe: one_click_link_in_every_email
  submit_label: Subscribe
  hidden_context: origin_route, placement, referrer, campaign
  processor: cms_record_and_notify
  on_success:
    heading: You are subscribed
    body: A few times a month, and one click unsubscribes from any email.
render:
  band_order:
  - model-the-campaign-before-the-interface
  - make-rules-reviewable-at-the-moment-of-consequen
  - design-different-modes-for-different-work
  - ai-changes-the-review-problem
  - follow-a-signal-into-the-action-it-changes
  - evaluate-the-operating-model
  - what-happens-when-a-message-should-not-send
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
  article_date_published: '2025-05-02'
  article_date_modified: '2026-09-08'
  article_authors:
  - type: Person
    name: Yash Bhatt
    profile_url: null
    profile_status: PROFILE_ROUTE_REQUIRED
editorial:
  author: Yash Bhatt
  reviewer: null
  published_at: '2025-05-02'
  modified_at: '2026-09-08'
release:
  content_state: CONTENT_READY
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
  route_dependencies: []
  feature_dependencies:
  - NEWSLETTER_PROCESSOR_NAMED
  legal_dependencies: []
migration:
  redirects_from: []
content_governance:
  master_contract: Tcules Website V11, Editorial Embodiment & Visual Proof Pass
  v10_role: decision_guide_preserve_and_refine
  authorship_policy: preserve_named_human_author_and_real_dates_where_present
  repair_pass: V10.1_AUDIT_REPAIR
  editorial_pass: V11_EDITORIAL_EMBODIMENT_VISUAL_PROOF
  pre_review_repair: V11.1_PRE_REVIEW_REPAIR
  language: en-GB
page_composition:
  editorial_review:
    section_components:
      model-the-campaign-before-the-interface: argument_thesis
      make-rules-reviewable-at-the-moment-of-consequen: argument_thesis
      design-different-modes-for-different-work: case_or_artefact_proof
      ai-changes-the-review-problem: argument_thesis
      follow-a-signal-into-the-action-it-changes: argument_thesis
      evaluate-the-operating-model: argument_thesis
      what-happens-when-a-message-should-not-send: method_process
  media_bindings: []
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
  cms_contract:
    version: semantic-v11
  shared_components:
  - newsletter_signup
  related_content:
  - anchor: See MarTech and SalesTech
    target: /expertise/martech-salestech
    source: moved_from_v10_visible_related_section
---

*Insights · Guide*

# Design marketing automation around decisions, not dashboards

Marketing automation becomes difficult when a product represents each capability as a separate screen. The operator does not think in navigation labels. They are trying to decide who should receive what, after which signal, under which rule, through which channel, with whose approval and how success or failure will be known.

By Yash Bhatt · Published 2 May 2025 · Updated 8 September 2026

The design task is to make that operating model visible without flattening its power.

## Model the campaign before the interface {#model-the-campaign-before-the-interface}

A campaign can be represented through six connected objects:

A signal is interpreted by a rule for an audience; the resulting action requires authority and changes campaign or record state. Those six objects are the model.

How the parts connect: a signal is interpreted by a rule for an audience; the resulting action requires authority and changes campaign or record state.

1. Audience: people or accounts that qualify.
2. Signal: an event, attribute or change that may start or alter the campaign.
3. Rule: the condition that interprets the signal.
4. Action: the message, task, update or route produced by the rule.
5. Authority: the person or system permitted to approve and execute it.
6. State: draft, scheduled, running, paused, failed, completed or superseded.

[MarTech and SalesTech](/expertise/martech-salestech) applies this model to identity, consent, attribution, automation and revenue work.

Products become hard to reason about when these objects are hidden in forms and settings. A marketer may see that a campaign is active without being able to answer which audience definition was used, which version of the content will send or what happens when an integration fails.

## Make rules reviewable at the moment of consequence {#make-rules-reviewable-at-the-moment-of-consequen}

An automation builder needs more than a visual canvas. It should answer:

- What enters this branch?
- Which records are excluded and why?
- Which data is stale or missing?
- What action will occur next?
- Can the action be previewed for a representative record?
- Who can publish, pause or override it?
- What happens to records already in progress when the rule changes?

The state of records already in progress is frequently missed. A campaign is not only a definition; it is also a population moving through states over time.

## Design different modes for different work {#design-different-modes-for-different-work}

A first-time operator may need guided assembly and safe defaults. An experienced operator may need dense comparison, bulk changes and direct access to rule logic. One simplified path cannot serve every mode.

Use progressive disclosure around consequence:

- keep common setup visible;
- reveal advanced conditions where they change qualification or action;
- show the generated interpretation in plain language;
- make exceptions reviewable rather than burying them;
- preserve a path to the underlying logic for expert users.

## AI changes the review problem {#ai-changes-the-review-problem}

AI can draft content, suggest audiences, interpret performance and recommend actions. Each use introduces a different scope and ownership.

Drafting can tolerate quick iteration if no message is sent automatically. Audience selection can create exclusion or targeting risk. Autonomous changes to spend, recipients or customer records carry greater consequence and need stronger authority, review and recovery.

Do not use “AI assistant” as one product category. Decide the evidence, control and recovery separately for each role the model plays:

| AI role | Evidence shown | Human control | Recovery |
|---|---|---|---|
| Draft | source inputs and editable output | accept, edit or discard | version history |
| Explain | metrics and interpretation basis | inspect underlying data | correct interpretation |
| Recommend | options, trade-offs and confidence | choose or defer | record decision |
| Act | action scope and affected records | approve, limit or stop | reverse where possible |

## Follow a signal into the action it changes {#follow-a-signal-into-the-action-it-changes}

A signal is evaluated against a versioned rule for a defined audience. The rule branches records into actions, authority gates publication and each record keeps a visible state and history. For example, a trial account reaching day 10 may be checked for role, activation and support status; accounts with unresolved support issues should leave the upgrade path and enter a service task. Show data freshness, the number of affected records and what happens to work already in progress.

## Evaluate the operating model before optimising the interface {#evaluate-the-operating-model}

Useful measures depend on the decision:

- Can an operator predict who will be affected before launch?
- Can a reviewer identify the source of a recommendation?
- Can support explain why a record entered a state?
- Can a failed integration be isolated and recovered?
- Can two campaign versions be compared without losing history?

Open rate or conversion may matter commercially, but neither proves that the product model is understandable or dependable.

Tcules applies this model to [MarTech and SalesTech products](/expertise/martech-salestech). The [Ryzeo case](/case-studies/ryzeo-marketing-automation-ux-revamp) shows a bounded example of restructuring a marketing automation product around clearer workflows.

## What happens when a message should not send? {#what-happens-when-a-message-should-not-send}

The workflow is incomplete if it models only successful sends. Define what happens when a person is unreachable in the selected channel, is suppressed, has reached a frequency cap, no longer qualifies or encounters an aborted send. These states must be visible to operators and must not silently route a person into an unintended branch.

Apply message pressure at the customer level as well as per channel. Priority rules should protect operational messages from being displaced by promotion, while suppression must override eligibility when consent, recent action, preference or product state makes the message inappropriate. If AI changes the audience or path, show the input, proposed change, consequence and recovery before execution.
