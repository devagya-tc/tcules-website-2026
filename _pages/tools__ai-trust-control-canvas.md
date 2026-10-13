---
route: /tools/ai-trust-control-canvas
slug: ai-trust-control-canvas
page_name: AI Trust and Control Canvas
page_type: tool
seo:
  title: AI trust and control canvas for product teams | Tcules
  description: Set out the checks, approvals and recovery around one AI output, then download a control brief your design and engineering teams can work from.
  canonical: https://www.tcules.com/tools/ai-trust-control-canvas
  robots: index,follow
social:
  og_title: AI trust and control canvas for product teams | Tcules
  og_description: Set out the checks, approvals and recovery around one AI output, then download a control brief your design and engineering teams can work from.
  og_image: https://www.tcules.com/assets/og/tools.png
  og_image_alt: Tcules social card headed Tools, on a white background with the Tcules wordmark.
  og_type: website
  og_url: https://www.tcules.com/tools/ai-trust-control-canvas
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: AI trust and control canvas for product teams | Tcules
  twitter_description: Set out the checks, approvals and recovery around one AI output, then download a control brief your design and engineering teams can work from.
  twitter_image: https://www.tcules.com/assets/og/tools.png
search_context:
  primary_intent: design trust and control for an AI output
  primary_buyer_question: What must a person inspect and control before this AI output changes something?
  supporting_questions:
  - What evidence should I record?
  - How should I interpret an unknown or a gap?
  - What can I take into the next team review?
  key_entities:
  - AI trust
  - calibrated trust
  - override
  - recovery
  - evidence
  answer_unit_strategy: utility decision; worked interpretation; limitations; related practice
  buyer_question_evidence:
    source_registry: _system/buyer-question-coverage-v7.yaml
    editorial_method: manual_readthrough_in_v7
    questions_retained_or_exposed:
    - What evidence should I record?
    - How should I interpret an unknown or a gap?
    - What can I take into the next team review?
    questions_withheld: []
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Tools
    url: /tools
  - name: AI Trust and Control Canvas
    url: /tools/ai-trust-control-canvas
render:
  band_order:
  - fill-the-canvas-in-order-because-each-block-cons
  - workspace
  - reading-your-canvas
  - what-this-does-not-tell-you
  - next
structured_data:
  types:
  - WebPage
  - BreadcrumbList
  organization_ref: https://www.tcules.com/#organization
  page_creator_ref: https://www.tcules.com/#organization
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
  route_dependencies:
  - CLAIM_EVIDENCE_VERIFICATION
  feature_dependencies:
  - TOOL_PRODUCTION_ACCEPTANCE
  legal_dependencies: []
migration:
  redirects_from: []
page_composition:
  visual_plan: tool_record_and_worked_example
  tool:
    id: ai-trust-control-canvas
    mount_anchor: workspace
    mode: manual_evidence_record
    processing: browser_only
    persistence: none
    export: markdown
    method_version: '2026-09-08'
  cms_contract:
    version: semantic-v11
  editorial_review:
    section_components:
      fill-the-canvas-in-order-because-each-block-cons: argument_thesis
      workspace: argument_thesis
      reading-your-canvas: argument_thesis
      what-this-does-not-tell-you: argument_thesis
      next: argument_thesis
  media_bindings: []
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
  visual_requirements:
  - id: v11_tool_interface
    status: ASSET_REQUIRED
    supports_section: fill-the-canvas-in-order-because-each-block-cons
    communication_job: Show the actual tool or a representative interactive state.
    asset_uri: null
    alt_caption_intent: Describe what the artefact demonstrates, not merely what it looks like.
    mobile_treatment: Preserve the decision-relevant detail; use a crop or progressive reveal instead of shrinking dense artefacts below readable size.
content_governance:
  master_contract: Tcules Website V11, Editorial Embodiment & Visual Proof Pass
  repair_pass: V10.1_AUDIT_REPAIR
  editorial_pass: V11_EDITORIAL_EMBODIMENT_VISUAL_PROOF
  pre_review_repair: V11.1_PRE_REVIEW_REPAIR
  language: en-GB
---

*Free tools · AI interaction design*

# Decide what a person must be able to check before AI changes something

The AI Trust and Control Canvas maps what a person must be able to inspect, approve, change or recover before an AI output becomes an action. A suggested paragraph, a changed account record and a sent customer message need different controls. The useful starting point is what can happen after the output is accepted.

The result is a control brief your designer and engineer can work through together.
[Build a control canvas](#workspace)

## A missing control is a design question, not a blank cell {#fill-the-canvas-in-order-because-each-block-cons}
In the AI Trust and Control Canvas, an unknown means a control decision is not yet safe to assume. Record what is missing: evidence, authority, reversibility, escalation or implementation behaviour. The gap becomes useful when the team can name who resolves it and what must be true before the AI output is allowed to progress.

Name the output exactly as the user encounters it. Then follow the action it can trigger: who or what changes, who is affected, and which consequences can still be corrected.

“Human approval” is incomplete if the reviewer has no evidence, no time or no authority to reject the proposal. Record what that person can actually inspect and do.

## Build the control plan for one output {#workspace}

| Part of the interaction | Specify |
|---|---|
| Output and consequence | The proposal, resulting action, affected people or records and reversibility |
| Evidence | Sources the user can inspect, their freshness and relevant missing information |
| Uncertainty | Known limitations or conflicting evidence the interface can reliably reveal |
| Authority | Who may accept, edit, reject, act manually or escalate |
| Commitment | The precise point where a draft becomes an action; what must be confirmed there |
| Recovery | Detection, correction, notification and handling of dependent actions |
| Review record | What must be available later to reconstruct the action, with an agreed access and retention policy |

A generated explanation is not proof that an output is correct. Prefer inspectable evidence and explicit limitations. Only show confidence measures when their meaning and usefulness have been established for this task.

## An undo button cannot retrieve a message someone has read {#reading-your-canvas}

Worked example, not a client result. An assistant drafts a notice about an account change. Before sending, the reviewer sees the recipient, the proposed change and the supporting account record. They can edit or reject it.

After sending, recovery means correcting the account where appropriate and sending a correction to the recipient. Removing the message from the sender's screen does not reverse its effect. The canvas should name that limitation and the person responsible for the correction.

| If the record shows | Resolve next |
|---|---|
| A consequential action with no effective review or recovery | Set authority and containment before enabling the action |
| An approval step with no usable evidence | Test whether the reviewer can identify a representative wrong proposal |
| A harmless, editable draft with heavy confirmation | Test whether lighter controls preserve what matters |
| A correction that leaves dependent records wrong | Define propagation and notification, including what cannot be reversed |

## A control plan still needs to be tested {#what-this-does-not-tell-you}

Try the interaction with a plausible wrong output, missing evidence and a reviewer who disagrees. Observe whether the person can find and use the controls in time.

The canvas is informed by [Microsoft's human-AI interaction guidelines](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/). It does not establish model accuracy, legal sufficiency or a universal level of acceptable risk.

## Keep the control brief with the implementation {#next}

Download the canvas and turn each unresolved control into an acceptance check. The [BuildTwin case](/case-studies/ai-quality-control-expert-review-buildtwin) shows design work around expert review of AI-generated analysis.

For help designing the interaction, see [Trust, Control and Recovery](/services/ai-product-ux/trust-control-recovery).

