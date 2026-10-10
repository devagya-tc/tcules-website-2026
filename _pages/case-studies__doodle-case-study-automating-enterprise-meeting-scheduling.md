---
route: /case-studies/doodle-case-study-automating-enterprise-meeting-scheduling
slug: doodle-case-study-automating-enterprise-meeting-scheduling
page_name: Designing enterprise scheduling around confidence
page_type: case_study
seo:
  title: 'Doodle: designing enterprise meeting scheduling | Tcules'
  description: Tcules used research and object modelling to define priority, tentative availability and a bookability interface for Doodle's enterprise scheduling direction.
  canonical: https://www.tcules.com/case-studies/doodle-case-study-automating-enterprise-meeting-scheduling
  robots: index,follow
social:
  og_title: 'Doodle: designing enterprise meeting scheduling | Tcules'
  og_description: Tcules used research and object modelling to define priority, tentative availability and a bookability interface for Doodle's enterprise scheduling direction.
  og_image: https://www.tcules.com/assets/og/case-studies.png
  og_image_alt: Tcules social card headed Selected work, on a white background with the Tcules wordmark.
  og_type: website
  og_url: https://www.tcules.com/case-studies/doodle-case-study-automating-enterprise-meeting-scheduling
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: 'Doodle: designing enterprise meeting scheduling | Tcules'
  twitter_description: Tcules used research and object modelling to define priority, tentative availability and a bookability interface for Doodle's enterprise scheduling direction.
  twitter_image: https://www.tcules.com/assets/og/case-studies.png
search_context:
  primary_intent: enterprise scheduling workflow case study
  primary_buyer_question: How do you make availability and priority visible in enterprise scheduling?
  key_entities:
  - Doodle
  - enterprise scheduling
  - meeting priority
  - tentative availability
  buyer_question_evidence:
    status: NO_V7_QUESTION_EVIDENCE; DO_NOT_ADD_FAQ_WITHOUT_RESEARCH
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Case Studies
    url: /case-studies
  - name: Designing enterprise scheduling around confidence
    url: /case-studies/doodle-case-study-automating-enterprise-meeting-scheduling
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
  scheduling_label: See available times
  scheduling_behavior: lazy_secondary
  hidden_context: origin_route, placement, case, referrer, campaign
  on_success:
    heading: Your enquiry has reached us
    body: A practitioner will read your enquiry and reply within one business day. They can discuss the product work with you.
    retain_entered_data: true
  processor: cms_record_and_notify
render:
  band_order:
  - case-context
  - the-brief-contained-an-undefined-variable
  - priority-became-part-of-the-scheduling-model
  - the-interface-had-to-fit-a-product-that-already-
  - what-this-case-establishes
  - use-this-when-automation-outruns-the-criteria-be
  - delivery-impact
  - related
  - enquiry
page_composition:
  case_meta:
    component_type: case_meta
    placement: in_hero_above_headline
    company: Doodle
  visual_plan: verified_case_media
  media_bindings:
  - id: doodle_object_model
    role: demonstrate
    supports_section: priority-became-part-of-the-scheduling-model
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1766139496/660d1d45ed4ca3f2169cdb83_tricky_part_real_32fb6878e0.webp
    source: current public Tcules case media
    alt_intent: Object model used to connect meeting priority, availability and scheduling behaviour
    status: BOUND_EXISTING_PUBLIC_ASSET
    caption: null
    attribution: Tcules project/studio media
    mobile_treatment: preserve subject and readable product detail; crop only if the communication job survives
    motion_alternative: not_applicable
  cms_contract:
    version: semantic-v11
  editorial_review:
    section_components:
      case-context: argument_thesis
      the-brief-contained-an-undefined-variable: argument_thesis
      priority-became-part-of-the-scheduling-model: argument_thesis
      the-interface-had-to-fit-a-product-that-already-: argument_thesis
      what-this-case-establishes: argument_thesis
      use-this-when-automation-outruns-the-criteria-be: argument_thesis
      delivery-impact: argument_thesis
      related: argument_thesis
      enquiry: enquiry
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
structured_data:
  types:
  - WebPage
  - BreadcrumbList
  organization_ref: https://www.tcules.com/#organization
  page_creator_ref: https://www.tcules.com/#organization
case_impact:
  public_section: delivery-impact
  evidence_level: evidence_bounded_operational_impact
  measurement_program_ref: _system/case-study-evidence-programme.yaml#doodle
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
case_metadata:
  id: doodle
  project_period_start: null
  project_period_end_or_ongoing: null
  project_period_note: Not established in current evidence
  recency_rankable: false
  case_fact_last_verified: null
  strategic_tags:
  - B2B_SAAS
  - PRODUCT_DESIGN
  - DESIGN_SYSTEM_EXTENSION
  evidence_status: public_bounded_no_claim_gate
  available_media_quality: strong
content_governance:
  master_contract: Tcules Website V11, Editorial Embodiment & Visual Proof Pass
  v10_role: structured_case_proof
  historical_claim_policy: preserve_evidence_boundary_no_ai_native_retrofit
  repair_pass: V10.1_AUDIT_REPAIR
  editorial_pass: V11_EDITORIAL_EMBODIMENT_VISUAL_PROOF
  pre_review_repair: V11.1_PRE_REVIEW_REPAIR
  language: en-GB
---

*Case study · Doodle*

# A free calendar slot is not the same as a dependable meeting

Doodle was exploring enterprise scheduling where an empty calendar slot did not necessarily mean a dependable meeting. Tcules used research and product modelling to connect meeting type, priority and tentative availability to a bookability interface, giving the MVP a clearer basis for comparing possible times before Doodle owned the scheduling engine and integrations.

Research changed what the product needed to know before it could suggest a dependable time.

## At a glance {#case-context}

| Product | Doodle's enterprise meeting-scheduling product, for people who arrange meetings across companies. |
|---|---|
| Our role | Research, product modelling, interface design and new components for Doodle's design system. |
| The key question | When is a free slot a time people will really keep, once you weigh up the type of meeting, its priority and everyone's tentative plans? |
| What we delivered | An MVP direction that links meeting priority and tentative availability to a bookability score in the interface. |

Related Tcules services: [Information Architecture and Workflow Design](/services/product-design/information-architecture-workflow-design) and [Design Systems](/services/design-systems).

## What was missing from the scheduling model? {#the-brief-contained-an-undefined-variable}
The initial problem could be described as automation: bring together availability and propose viable times for enterprise meetings. But automation only works when the product knows what it is optimising.

Tcules reviewed Doodle's existing research and product concepts, studied competitor patterns and prepared a research questionnaire for stakeholders and people who coordinated meetings across organisational boundaries. Tcules diagrammed the objects in play during discovery: participants, organisations, meeting types, time, calendars and scheduling conditions.

One interview surfaced the variable the current model did not represent. A participant's availability was affected by the importance of the meeting. Someone might appear unavailable for a routine conversation and still make time for a review, approval or customer commitment that carried greater priority.

The priority finding changed the product question. It was no longer only, “When is everyone free?” It became, “Given the type and priority of this meeting, how dependable is this time?”

## How could meeting priority change bookability? {#priority-became-part-of-the-scheduling-model}
Tcules developed a framework through which an organisation could identify meeting types and express their relative priority. Tentative weekly schedules added another layer: the system could distinguish established commitments from availability that was more provisional.

The interface direction brought those inputs together in a bookability score. The score was not a promise that a meeting would happen. It was a way to communicate the confidence available from the product's current information and help the organiser compare possible conditions.

The distinction between a score and certainty matters in enterprise workflow products. A number can create false authority when the interface does not reveal what it represents. Here, the useful product work was to connect the score to meeting type, priority and tentative availability, so the organiser could read it as decision support rather than certainty.

## The interface had to fit a product that already existed {#the-interface-had-to-fit-a-product-that-already-}

After the information structure was defined, Tcules explored interface concepts and developed the selected direction. Standard interactions could use existing Doodle components. The calendar and bookability work required additional components organised to remain consistent with the product system.

The new scheduling direction could take shape within Doodle's existing product language. Doodle owned the scheduling engine and calendar integrations; our work made the new product model visible and usable at the interface.

## Research changed what the product needed to know {#what-this-case-establishes}

The work moved the MVP from finding an empty slot to helping an organiser judge whether a meeting could hold.

| Initial question | Product direction |
|---|---|
| When is everyone available? | How dependable is this time for this meeting? |
| What does the calendar show? | What do meeting type, priority and tentative commitments tell us? |
| Which times can we offer? | How can the organiser compare the confidence behind those options? |

Resolving the product model early lets the interface support the decision people are actually making.

## Use this when automation outruns the criteria beneath it {#use-this-when-automation-outruns-the-criteria-be}

The case is relevant when a workflow appears ready for automation but the criteria beneath the decision are still implicit. In scheduling, the missing variable was priority. In another product it might be authority, risk, evidence quality, capacity or exception state.

The productive first move is not to generate more interface options. It is to identify the objects and variables the product must understand before it can make a responsible recommendation.

Finding the objects and variables a product must understand before it can act is described under [information architecture and workflow design](/services/product-design/information-architecture-workflow-design).

## What changed once the scheduling model changed {#delivery-impact}

| Impact dimension | What changed |
|---|---|
| Decision clarity | Meeting priority and tentative availability became explicit product variables instead of remaining assumptions behind an availability calculation. |
| Build readiness | The product model was carried into a bookability interface, giving the MVP a clearer specification before scheduling-engine and integration work. |
| System continuity | Existing Doodle components could be reused for standard interactions while new calendar and bookability patterns were added only where the model required them. |

## Related product-model work {#related}

Two other cases where the modelling had to come before the interface.

[Read the Scissors case](/case-studies/scissors-staffing-software-object-oriented-ux)

[Read the Auxentios case](/case-studies/auxentios-cpq-product-mvp-design)

[See Information Architecture and Workflow Design](/services/product-design/information-architecture-workflow-design)

## Tell us what the product is really scheduling {#enquiry}

Describe the workflow, the records it moves and the decision people keep having to make twice.
