---
route: /insights/articles/generative-ai-product-patterns-for-saas
slug: generative-ai-product-patterns-for-saas
page_name: Seven generative AI product patterns for SaaS
page_type: article
seo:
  title: Seven generative AI product patterns for SaaS | Tcules
  description: 'Seven generative AI patterns for SaaS: generation, transformation, retrieval, recommendation and action, and how to choose by risk, authority and testing.'
  canonical: https://www.tcules.com/insights/articles/generative-ai-product-patterns-for-saas
  robots: index,follow
social:
  og_title: Seven generative AI product patterns for SaaS | Tcules
  og_description: 'Seven generative AI patterns for SaaS: generation, transformation, retrieval, recommendation and action, and how to choose by risk, authority and testing.'
  og_image: https://www.tcules.com/assets/og/insights.png
  og_image_alt: Tcules social card headed Insights, on a white background with the Tcules wordmark.
  og_type: article
  article_published_time: '2025-05-02'
  article_modified_time: '2026-09-08'
  og_url: https://www.tcules.com/insights/articles/generative-ai-product-patterns-for-saas
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: Seven generative AI product patterns for SaaS | Tcules
  twitter_description: 'Seven generative AI patterns for SaaS: generation, transformation, retrieval, recommendation and action, and how to choose by risk, authority and testing.'
  twitter_image: https://www.tcules.com/assets/og/insights.png
search_context:
  primary_intent: Seven generative AI product patterns for SaaS
  primary_buyer_question: Which generative AI interaction pattern fits the work our users need to do?
  key_entities:
  - generative AI product patterns
  - AI product controls
  - SaaS
  buyer_question_evidence:
    status: NO_V7_QUESTION_EVIDENCE; DO_NOT_ADD_FAQ_WITHOUT_RESEARCH
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Insights
    url: /insights
  - name: Articles
    url: /insights/articles
  - name: Seven generative AI product patterns for SaaS
    url: /insights/articles/generative-ai-product-patterns-for-saas
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
  - 1-generate-a-candidate
  - 2-transform-supplied-material
  - 3-retrieve-and-synthesise
  - 4-recommend
  - 5-predict-or-detect
  - 6-orchestrate-a-workflow
  - 7-act-with-delegated-authority
  - each-pattern-needs-a-different-control
  - chat-is-not-the-product-model
  - how-to-choose
  - what-happens-when-ai-cannot-help
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
    name: Shoghi Bagul
    profile_url: null
    profile_status: PROFILE_ROUTE_REQUIRED
editorial:
  author: Shoghi Bagul
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
  redirects_from:
  - /insights/videos/generative-ai-product-patterns-for-saas
content_governance:
  master_contract: Tcules Website V11, Editorial Embodiment & Visual Proof Pass
  v10_role: editorial_preserve_and_refine
  authorship_policy: preserve_named_human_author_and_real_dates_where_present
  repair_pass: V10.1_AUDIT_REPAIR
  editorial_pass: V11_EDITORIAL_EMBODIMENT_VISUAL_PROOF
  pre_review_repair: V11.1_PRE_REVIEW_REPAIR
  language: en-GB
page_composition:
  editorial_review:
    section_components:
      1-generate-a-candidate: argument_thesis
      2-transform-supplied-material: argument_thesis
      3-retrieve-and-synthesise: argument_thesis
      4-recommend: comparison_decision
      5-predict-or-detect: argument_thesis
      6-orchestrate-a-workflow: case_or_artefact_proof
      7-act-with-delegated-authority: argument_thesis
      each-pattern-needs-a-different-control: argument_thesis
      chat-is-not-the-product-model: argument_thesis
      how-to-choose: comparison_decision
      what-happens-when-ai-cannot-help: method_process
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
  - anchor: See AI Product UX
    target: /services/ai-product-ux
    source: moved_from_v10_visible_related_section
---

*Insights · Article*

# Seven generative AI product patterns for SaaS

Start with the part of the user’s work where AI could help: finding information, developing a draft, judging a result or carrying out a task. Then decide what the system needs to know and what it may do. Seven patterns cover many current SaaS opportunities.

By Shoghi Bagul · Published 2 May 2025 · Updated 8 September 2026

The seven AI product patterns may share a model or conversational surface, but they need different evidence, controls and evaluation.

## 1. AI can generate a candidate for a person to judge {#1-generate-a-candidate}

The system drafts text, structure, code, media or a plan. The user remains the author or approver.

Design for: editable output, source constraints, variations, preservation of user input and clear save state.

Evaluate: usefulness, correction effort, omission and whether the draft fits the intended audience or system.

## 2. AI can transform material a person provides {#2-transform-supplied-material}

The system summarises, rewrites, translates, classifies or extracts from bounded input.

Design for: source coverage, changed meaning, retained terminology, traceability and side-by-side review where consequence warrants it.

Evaluate: fidelity to the source, missing material and cost of verification.

## 3. AI can retrieve sources and synthesise an answer {#3-retrieve-and-synthesise}

The system finds relevant material and constructs an answer. The [AI Search and Recommendation service](/services/ai-product-ux/ai-search-recommendation) develops this into a product interaction with explicit corpus, evidence and recovery decisions.

Design for: source identity, passage support, freshness, access rights and a route from synthesis to evidence.

Evaluate: retrieval quality separately from answer quality. A fluent answer can conceal a missing source.

## 4. AI can recommend an option without making the decision {#4-recommend}

The system ranks options or proposes a next move.

Design for: recommendation basis, alternatives, objective, trade-offs and the ability to adjust the criteria.

Evaluate: decision quality, calibration and the effect on different users, not only click-through.

## 5. AI can predict or detect a condition in product data {#5-predict-or-detect}

The system estimates an outcome or identifies a pattern in data.

Design for: time window, data coverage, thresholds, false-positive and false-negative consequence, and escalation.

Evaluate: performance in the actual operating population and what happens around the threshold.

## 6. AI can orchestrate several steps across a workflow {#6-orchestrate-a-workflow}

The system translates an objective into steps across tools, records or people.

Design for: plan visibility, permission, step state, dependency, interruption, retry and partial completion.

Evaluate: correct completion, recovery effort and whether the user can understand what changed.

## 7. Act with delegated authority {#7-act-with-delegated-authority}

The system changes records, sends messages, moves money, deploys code or takes another consequential action.

Design for: bounded authority, preview, confirmation, least privilege, audit history, stop conditions and recovery.

Evaluate: safe completion and failure handling. Task speed alone is not sufficient.

## Each pattern needs a different control {#each-pattern-needs-a-different-control}

| Pattern | Typical authority | Primary uncertainty | Essential control |
|---|---|---|---|
| Generate | Suggest | Quality and fit | Edit or discard |
| Transform | Suggest | Fidelity | Compare with source |
| Retrieve and synthesise | Inform | Coverage and support | Inspect sources |
| Recommend | Influence | Objective and ranking | Alternatives and criteria |
| Predict or detect | Flag | Error distribution | Threshold and escalation |
| Orchestrate | Prepare or execute steps | Plan and dependency | Step-level review and state |
| Act | Commit | Consequence | Permission, stop and recovery |

The seven-pattern catalogue is a product-design framework, not a claim that every use requires the same model architecture.

## Chat is not the product model {#chat-is-not-the-product-model}

A conversational shell is useful for open expression and early discovery. It becomes weak when users need comparison, repeatability, durable state, bulk control or precise review. A mature product may combine language input with structured objects, previews and stateful workflows.

## How should a team choose an AI product pattern? {#how-to-choose}

Begin with the user's decision or work state. Select the narrowest pattern that creates value. Define what the model may influence, how people inspect it and what evidence will justify wider authority.

[AI Product UX](/services/ai-product-ux) carries that pattern into user control and evaluation.

## What happens when AI cannot help? {#what-happens-when-ai-cannot-help}

For each candidate pattern, describe three states before choosing it: useful output, uncertain or partial output, and no usable output. The product must say what remains possible in each state. That may mean editing a candidate, viewing sources, retrying with changed inputs, reverting an action or continuing through a non-AI path.

Delegated action requires the strictest boundary. Name the resources the system may change, the confirmation point, the activity record, the stop condition and the recovery owner. A generic model-quality score cannot replace evaluation against the actual work and consequence.
