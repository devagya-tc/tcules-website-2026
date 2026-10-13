---
route: /glossary/design-intent
slug: design-intent
page_name: Design Intent
page_type: defined_term
seo:
  title: What is design intent? Meaning and example | Tcules
  description: 'Design intent is what a design is meant to do and why: the behaviour and product choices a build must keep, well beyond how the screen looks.'
  canonical: https://www.tcules.com/glossary/design-intent
  robots: index,follow
social:
  og_title: What is design intent? Meaning and example | Tcules
  og_description: 'Design intent is what a design is meant to do and why: the behaviour and product choices a build must keep, well beyond how the screen looks.'
  og_image: https://www.tcules.com/assets/og/glossary.png
  og_image_alt: Tcules social card headed Glossary, on a white background with the Tcules wordmark.
  og_type: website
  og_url: https://www.tcules.com/glossary/design-intent
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: What is design intent? Meaning and example | Tcules
  twitter_description: 'Design intent is what a design is meant to do and why: the behaviour and product choices a build must keep, well beyond how the screen looks.'
  twitter_image: https://www.tcules.com/assets/og/glossary.png
search_context:
  primary_intent: what is design intent
  primary_buyer_question: What does design intent include?
  key_entities:
  - Design Intent
  buyer_question_evidence:
    status: NO_V7_QUESTION_EVIDENCE; DO_NOT_ADD_FAQ_WITHOUT_RESEARCH
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Glossary
    url: /glossary
  - name: Design Intent
    url: /glossary/design-intent
render:
  band_order:
  - practice
  - comparison
  - next
structured_data:
  types:
  - WebPage
  - DefinedTerm
  - BreadcrumbList
  organization_ref: https://www.tcules.com/#organization
  page_creator_ref: https://www.tcules.com/#organization
  defined_term_set_ref: https://www.tcules.com/glossary#glossary
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
  feature_dependencies: []
  legal_dependencies: []
migration:
  redirects_from: []
content_governance:
  v10_role: canonical_concept_definition
  commercialisation: none
  master_contract: Tcules Website V11, Editorial Embodiment & Visual Proof Pass
  repair_pass: V10.1_AUDIT_REPAIR
  editorial_pass: V11_EDITORIAL_EMBODIMENT_VISUAL_PROOF
  pre_review_repair: V11.1_PRE_REVIEW_REPAIR
  language: en-GB
page_composition:
  editorial_review:
    section_components:
      practice: argument_thesis
      comparison: argument_thesis
      next: argument_thesis
  media_bindings: []
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
  cms_contract:
    version: semantic-v11
---

*Glossary · Design Intent*

# Design intent

Design intent is the product decision and intended behaviour that an implementation must preserve across content, state, devices and constraints. When it matters: During implementation and review, real content and screen sizes can require changes to a mock-up. Design intent provides the reference for deciding whether a change preserves the intended behaviour or introduces a defect.

Design intent includes information priority, interaction, feedback, consequence, responsive change and accessibility. Pixel identity can conflict with intent when content or viewport changes. A desktop comparison table may become labelled mobile records because reading order and action priority matter more than preserving columns.

[Design to code](/glossary/design-to-code) translates this intent into software. [Implementation QA](/services/design-engineering/implementation-qa) checks the running behaviour, while a [Design-to-Code Audit](/audits/design-to-code-audit) can diagnose wider correspondence failures.

## How is design intent used in practice? {#practice}

Design intent is the product meaning an implementation is supposed to preserve. A button position is not intent by itself. The intent may be that a user can compare alternatives before committing, that a status remains visible after an action, or that an error leaves a recoverable path. Those statements give design and engineering something substantive to compare when screens and code differ.

The [Design-to-Code Audit](/audits/design-to-code-audit) traces an important behaviour through the sources a team uses so a visual difference can be separated from a product-rule difference.

## How does design intent differ from a design specification? {#comparison}

The table distinguishes the product decision from one representation of that decision.

| Design intent | Design specification |
|---|---|
| States what behaviour, meaning or consequence must survive | Describes how an approved solution is represented for implementation |
| Can remain valid when the exact UI changes | May need to change when the implementation or design system changes |
| Helps resolve disagreements between artefacts | Gives engineering a concrete reference for one solution |

## Why design intent matters in product work {#next}

Where intent and running code disagree, a trace through both is what settles it.

[See the Design-to-Code Audit](/audits/design-to-code-audit)
