---
route: /services/design-engineering/implementation-qa
slug: implementation-qa
page_name: Implementation QA
page_type: service
seo:
  title: 'Design QA: Check Your Build Against the Design | Tcules'
  description: 'Design QA for SaaS releases: implementation QA compares your working product with the agreed design, sorts every difference and gives engineers clear fixes.'
  canonical: https://www.tcules.com/services/design-engineering/implementation-qa
  robots: index,follow
social:
  og_title: 'Design QA: Check Your Build Against the Design | Tcules'
  og_description: 'Design QA for SaaS releases: implementation QA compares your working product with the agreed design, sorts every difference and gives engineers clear fixes.'
  og_image: IMAGE_ASSET_REQUIRED
  og_image_alt: IMAGE_ASSET_REQUIRED
  og_type: website
  og_url: https://www.tcules.com/services/design-engineering/implementation-qa
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: 'Design QA: Check Your Build Against the Design | Tcules'
  twitter_description: 'Design QA for SaaS releases: implementation QA compares your working product with the agreed design, sorts every difference and gives engineers clear fixes.'
  twitter_image: IMAGE_ASSET_REQUIRED
search_context:
  primary_intent: design implementation QA for SaaS and complex products
  primary_buyer_question: Which runtime differences are defects, legitimate adaptations or product questions that need a new decision?
  supporting_questions:
  - Is implementation QA the same as visual QA?
  - How is this different from a Design-to-Code Audit?
  - What do you need from us?
  - Do you check that fixes worked?
  primary_query: design QA
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Services
    url: /services
  - name: Design Engineering
    url: /services/design-engineering
  - name: Implementation QA
    url: /services/design-engineering/implementation-qa
conversion:
  form: project_enquiry
  anchor: enquiry
  visible_fields:
  - Email
  - What are you working on?
  - Product or company URL
  optional_fields:
  - Product or company URL
  submit_label: Send enquiry
  hidden_context: origin_route, placement, family, service_or_audit, referrer, campaign
  on_success:
    heading: Your enquiry has reached us.
    body: We'll reply within one business day.
    retain_entered_data: true
    post_submit_scheduling: optional_only_if_runtime_supports
  processor: cms_record_and_notify
render:
  band_order:
  - recognition
  - coverage
  - triage
  - finding
  - why-tcules
  - faq
  - enquiry
page_composition:
  visual_plan: match_legitimate_adaptation_defect_missing_state_unresolved_product_decision
  media_bindings:
  - id: implementation_qa_asset
    role: demonstrate
    supports_section: proof
    status: ASSET_REQUIRED
    communication_job: Show a real or safely redacted design-to-runtime comparison or implementation-QA finding with intended behaviour, observed runtime behaviour, classification and accepted correction.
  testimonial_ids:
  - DRAFT-KNOVOS-CANDOUR
  institutional_trust:
    component_type: institutional_fact_row
    facts:
    - founded_2017
    - projects_90plus
    - client_countries_19
    placement: compact_near_hero
    claim_policy: Verify these institution-level facts at publication. Reuse their sources, not hardcoded display values.
  proof_claim_policy: NO_STANDALONE_QA_CASE;EDEN_SPECS_QUOTE_ADJACENT_ONLY
  content_composition:
    primary_intent: design implementation QA
    recognition_count: 3
    signature_model_type: implementation-difference-triage
    proof_component: source_bound_named_case_or_explicit_proof_gap
    testimonial_component: verbatim_quote_with_source_scope_in_cms
    form_anchor: enquiry
    mobile_table_policy: stack_as_labelled_rows
  signature_explanatory_object:
    type: implementation-difference-triage
    sequence:
    - Design intent
    - Observed behaviour
    - Defect or adaptation?
    - Disposition
    - Verification
    label: Editorial explanatory diagram; not a client artefact
    media_rights: Conceptual only; real project visuals require approval
  testimonial_context: GENERAL_STUDIO_ENDORSEMENT_NOT_ROUTE_SPECIFIC
  source_evidence_boundary: Benchmark and GT Tools support implementation-aware Product Design; neither is proof of a formal separate QA service with measured defect reduction.
  editorial_proof_review: REVIEW_IF_SOURCE_PROOF_SECTION_ALREADY_HAS_CAVEAT; NEVER_ATTRIBUTE_METRICS_FROM_GENERIC_TESTIMONIAL
  signature_proposition: Not every difference is a defect. The valuable work is determining which divergences compromise product meaning and which are intentional changes.
structured_data:
  types:
  - WebPage
  - Service
  - BreadcrumbList
  - FAQPage
  organization_ref: https://www.tcules.com/#organization
  service_provider_ref: https://www.tcules.com/#organization
release:
  content_state: BATCH4_DRAFT_2026-10-08
  site_release_state: SITE_RELEASE_HOLD
  composition: STATIC_PREVIEW_REQUIRES_FINAL_VISUAL_DESIGN
  production: NOT_PRODUCTION_VERIFIED
  route_dependencies:
  - FORM_ENDPOINT_VERIFICATION
  - CLAIM_EVIDENCE_VERIFICATION
  - IMPLEMENTATION_QA_ARTEFACT_REQUIRED
  - EXACT_OCT1_ASSEMBLED_BODY_DIFF
  - CLIENT_TESTIMONIAL_PERMISSION
  - CASE_MEDIA_AND_CLAIM_REVIEW
  - NO_STANDALONE_QA_CASE;EDEN_SPECS_QUOTE_ADJACENT_ONLY
content_governance:
  language: en-GB
  direct_quote_policy: preserve_verbatim_source_checked
  governing_rules: Tcules-VNext-Working-2026-10-08/00_RULEBOOK.md
  source_body: Tcules_Phase10_Canonical_Assembly_and_Publication_Gates_2026-10-08/assembled_authored_74/services__design-engineering__implementation-qa.md
---

*Design Engineering · Implementation QA*

# Design QA: a clear fix list before you release

Each finding names what was expected, what happened, how to reproduce it, why it matters and who owns the fix. We retest after the fix and close it once the product behaves as agreed.

[Start a conversation](#enquiry)

## When teams bring us in {#recognition}

**"The same bugs come back after every handoff."** Responsive and keyboard issues reappear release after release.

**"Designers and developers argue about what counts as a bug."** Nobody agreed which differences matter.

**"Our screenshot tests flag everything."** Hundreds of pixel changes, and no way to tell which ones matter to users.

**"Nobody has checked the edge cases."** The main screen looks right. The empty, error and permission states are anyone's guess.

## What we check {#coverage}

We start with the flows where a miss would cost your users most, then work outwards.

- Layout and components, against the design and your design system
- Loading, empty, error and disabled states
- Different user roles and permissions
- Small screens and resized windows
- Keyboard use, focus order and screen-reader labels
- Real content: long names, missing data, large numbers

## Sort every difference before anyone writes a ticket {#triage}

Screenshot tools are good at spotting change and hopeless at judging it. So each difference gets a type and a next step.

| Type | What it means | What happens next |
|---|---|---|
| Defect | Something agreed was lost in the build | Engineering fixes it |
| Justified change | The build changed for a good reason | The design is updated to match |
| Missing state | Nobody designed this case | Design it, then build it |
| Open question | The build exposed a product question | Your product owner decides |

Aim for a product where every difference is understood, rather than one that matches pixel for pixel.

## What a finding looks like {#finding}

Each finding is written so an engineer can act on it without a meeting. Here is an illustrative one.

| Field | Example |
|---|---|
| Expected | A missing required field shows an error next to that field |
| Actual | A general banner appears at the top of the form, and the field is unmarked |
| To reproduce | Leave "Company name" empty and select Save on a narrow screen |
| Why it matters | On a phone, users can't see which field failed |
| Type and owner | Defect, frontend team |

If a shared component is wrong across the whole product, the finding says so and names who owns the fix.

## Why Tcules {#why-tcules}

**We read the design and the code.** Our design engineers know why the design is the way it is, so findings explain the intent as well as the bug.

**We have taken a design through the build ourselves.** On GT Tools we designed the storefront and developed it in Shopify, fitting the design to the platform's limits. It helps us tell a defect from a justified change. [Read the GT Tools case](/case-studies/gt-tools-shopify-product-discovery)

**We can fix as well as find.** Our design engineers can correct frontend issues in your repository, or hand findings to your team.

<!-- awaiting client sign-off -->
> “Tcules told us what was really wrong, including the things we didn't want to hear, and then fixed them with us.”  
> **Akshay Vyas, Creative Head, Knovos**

## Frequently asked questions {#faq}

### Is implementation QA the same as visual QA?

No. Visual checks are one part. We also check states, behaviour, keyboard use, user roles and real content, which is where users tend to run into trouble.

### How is this different from a Design-to-Code Audit?

Implementation QA checks one release or product area before it goes out. The [Design-to-Code Audit](/audits/design-to-code-audit) looks across teams and releases to find where your process keeps losing design intent.

### What do you need from us?

Access to a test environment, the agreed designs, and someone who can make product calls on open questions.

### Do you check that fixes worked?

Yes. We retest each finding after the fix and close it only when the product behaves as agreed.

## Check the build before your customers do {#enquiry}

Send the product area, the agreed designs and the screens you're least sure about.

**Enquiry form**

- Email
- What are you working on?
- Product or company URL (optional)

**Submit:** Send enquiry

**After sending:** We'll reply within one business day.
