---
route: /services/product-design/information-architecture-workflow-design
slug: information-architecture-workflow-design
page_name: Information Architecture & Workflow Design
page_type: service
seo:
  title: Workflow Design & Information Architecture for SaaS | Tcules
  description: 'Workflow design and information architecture for complex software: records, roles, statuses and navigation that match how work moves through your team.'
  canonical: https://www.tcules.com/services/product-design/information-architecture-workflow-design
  robots: index,follow
social:
  og_title: Workflow Design & Information Architecture for SaaS | Tcules
  og_description: 'Workflow design and information architecture for complex software: records, roles, statuses and navigation that match how work moves through your team.'
  og_image: IMAGE_ASSET_REQUIRED
  og_image_alt: IMAGE_ASSET_REQUIRED
  og_type: website
  og_url: https://www.tcules.com/services/product-design/information-architecture-workflow-design
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: Workflow Design & Information Architecture for SaaS | Tcules
  twitter_description: 'Workflow design and information architecture for complex software: records, roles, statuses and navigation that match how work moves through your team.'
  twitter_image: IMAGE_ASSET_REQUIRED
search_context:
  primary_intent: information architecture and workflow design for SaaS and operational software
  primary_buyer_question: What model should the product use for work that spans records, roles, systems, states and time?
  supporting_questions:
  - Is information architecture just a sitemap?
  - How do roles and permissions change the design?
  - Should we start here or with research?
  primary_query: workflow design
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Services
    url: /services
  - name: Product Design
    url: /services/product-design
  - name: Information Architecture & Workflow Design
    url: /services/product-design/information-architecture-workflow-design
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
  - structure
  - workflows
  - proof
  - why-tcules
  - faq
  - enquiry
page_composition:
  visual_plan: object_role_state_rule_map_with_workflow_transitions
  media_bindings:
  - id: ia_workflow_dealpath
    role: demonstrate
    supports_section: proof
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1787139518/section_3_ffd1c5cb2a.webp
    alt_intent: Dealpath workflow redesign that checks for an existing deal before creating a new record.
    status: BOUND_EXISTING_PUBLIC_ASSET
  testimonial_ids:
  - FP-OCTIFI-REASONING
  institutional_trust:
    component_type: institutional_fact_row
    facts:
    - founded_2017
    - projects_90plus
    - client_countries_19
    placement: compact_hero_followup
    claim_policy: Resolve against canonical company facts and reconfirm at publication.
  client_recognition:
    component_type: client_recognition
    placement: hero_followup_or_contextual_proof
    clients:
    - Scissors
    - Auxentios
    - Dealpath
    - GT Tools
    asset_policy: Approved logo rights required; otherwise render accurate client names as text. Relationship does not imply endorsement or identical engagement scope.
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
  composition: STATIC_PREVIEW_UNVERIFIED
  production: NOT_PRODUCTION_VERIFIED
  route_dependencies:
  - FORM_ENDPOINT_VERIFICATION
  - CLAIM_EVIDENCE_VERIFICATION
  - EXACT_OCT1_PHASE6_SOURCE_DIFF
  - QUOTE_PUBLICATION_REVIEW
  - CLIENT_MEDIA_RIGHTS_CONFIRM
content_governance:
  language: en-GB
  direct_quote_policy: preserve_verbatim_source_checked
  governing_rules: Tcules-VNext-Working-2026-10-08/00_RULEBOOK.md
  source_body: Tcules_Phase10_Canonical_Assembly_and_Publication_Gates_2026-10-08/assembled_authored_74/services__product-design__information-architecture-workflow-design.md
---

*Workflow design & information architecture*

# Workflows break where work changes hands

For SaaS and enterprise software, we design the hand-offs, approvals, waits and rejections, so each role sees the same record with the right details and actions.

[Start a conversation](#enquiry)

*Selected work: Scissors · Auxentios · Dealpath · GT Tools*

## Signs the structure is the problem {#recognition}

**"Every new feature gets its own menu item."** The navigation keeps growing and finding anything gets harder.

**"The same customer lives in four places."** Nobody decided which record is the real one.

**"Sales calls it an account. Support calls it a project."** Teams use different names for the same thing.

**"People finish the job in a spreadsheet."** The product loses track of work when it passes to someone else.

## Four questions to answer before designing screens {#structure}

| Part | The question we answer |
|---|---|
| **Records** | What does the product keep track of, and how are those things connected? |
| **People** | Who can see, create, change or approve each one? |
| **Status** | What does "draft", "blocked" or "approved" mean, and what can happen next? |
| **Rules** | Which conditions and exceptions decide whether work moves forward? |

Navigation, forms and dashboards come out of those answers, and the screens become simpler to design and build.

## Work that moves between people {#workflows}

A quote might start with sales, pass to a pricing expert, wait for the customer, then return for approval. Each person needs the same record with different details and different actions. We design the hand-offs, the waits, the rejections and the moment someone picks the work up again days later.

Depending on the job, you get a map of your records, a table of who can do what, task flows, status diagrams, a navigation structure and clickable prototypes.

## Untangling roles, records and catalogues {#proof}

### Scissors: enter a candidate once, use them everywhere

In Scissors' staffing software, the same clients, candidates and jobs come up placement after placement. We linked them properly, then redesigned onboarding, shortlisting, talent pools and job creation around those links. In the redesign, adding a candidate to a shortlist leaves their details untouched everywhere else.

[Read the Scissors case](/case-studies/scissors-staffing-software-object-oriented-ux)

### Auxentios: six roles, one quote

Sales representatives, sales managers and product, pricing, solution and maintenance experts all contribute to an industrial quote. We mapped who adds what and where work changes hands. The quoting workflow we designed gives each role clear hand-offs and exits, instead of forcing everyone through one fixed sequence.

[Read the Auxentios case](/case-studies/auxentios-cpq-product-mvp-design)

### Dealpath: a listing and a deal are different things

Dealpath's "Add to pipeline" action treated every property listing as a brand-new deal. We redesigned the flow to search existing deals first, with "create new" as the fallback, so people can attach a listing to a deal they already track instead of creating a duplicate. Dealpath's own team owned implementation.

[Read the Dealpath case](/case-studies/enterprise-workflow-redesign-dealpath-real-estate)

### GT Tools: one catalogue, two kinds of buyer

Some buyers of GT Tools' specialist automotive-glass equipment know the part number. Others are still comparing. We reworked navigation, search and category pages so both reach the right product, then developed the new store on Shopify.

[Read the GT Tools case](/case-studies/gt-tools-shopify-product-discovery)

## Why teams choose Tcules for this work {#why-tcules}

**We map the work first.** Records, roles and rules are settled early, so screens stop contradicting each other.

**You can see the reasoning behind every flow.** Each choice is written down, so your team can question it.

> “They deliberate sufficiently and outline clear thought processes in the flows.”  
> **Amin Nordin, Head of Growth, OctiFi**

## Frequently asked questions {#faq}

### Is information architecture just a sitemap?

For a website, largely. For software it also covers the records, roles and statuses behind the screens. Navigation is the part users see.

### How do roles and permissions change the design?

They decide which actions each person sees, who approves what, and what the screen says when someone can't go further. We design those moments on purpose instead of leaving them to defaults.

### Should we start here or with research?

If you don't yet know how people do the work, start with [UX Research](/services/product-design/ux-research). If the structure is sound and the screens are the problem, go to [Interaction & UI Design](/services/product-design/interaction-ui-design).

## Where does work go missing between people? {#enquiry}

Name the roles involved, the records they pass along and the step where someone always asks ‘who has this now?’

**Enquiry form**

- Email
- What are you working on?
- Product or company URL (optional)

**Submit:** Send enquiry

**After sending:** We'll reply within one business day.
