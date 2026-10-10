---
route: /services/design-systems/design-system-strategy
slug: design-system-strategy
page_name: Design System Strategy
page_type: service
seo:
  title: 'Design System Strategy: Scope, Owners, First Build | Tcules'
  description: 'Design system strategy for SaaS teams: agree what is shared, what stays with each product, who approves changes and which components to build first.'
  canonical: https://www.tcules.com/services/design-systems/design-system-strategy
  robots: index,follow
social:
  og_title: 'Design System Strategy: Scope, Owners, First Build | Tcules'
  og_description: 'Design system strategy for SaaS teams: agree what is shared, what stays with each product, who approves changes and which components to build first.'
  og_image: IMAGE_ASSET_REQUIRED
  og_image_alt: IMAGE_ASSET_REQUIRED
  og_type: website
  og_url: https://www.tcules.com/services/design-systems/design-system-strategy
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: 'Design System Strategy: Scope, Owners, First Build | Tcules'
  twitter_description: 'Design system strategy for SaaS teams: agree what is shared, what stays with each product, who approves changes and which components to build first.'
  twitter_image: IMAGE_ASSET_REQUIRED
search_context:
  primary_intent: Design System strategy and consulting for SaaS product teams
  primary_buyer_question: What should our Design System actually be responsible for?
  supporting_questions:
  - Do we need a design system at all?
  - Can one design system serve several products or brands?
  - Who from our side needs to be involved?
  primary_query: design system strategy
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Services
    url: /services
  - name: Design Systems
    url: /services/design-systems
  - name: Design System Strategy
    url: /services/design-systems/design-system-strategy
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
  - scope
  - ownership
  - deliverables
  - proof
  - faq
  - enquiry
page_composition:
  visual_plan: responsibility_map_shared_product_local_platform_local_unresolved
  media_bindings:
  - id: design_system_strategy_scope_decision
    role: demonstrate
    supports_section: proof
    status: ASSET_REQUIRED
    communication_job: Show a real or safely redacted Design System scope decision with what was shared, what stayed local, who owned each decision and why.
  - id: design_system_strategy_matter
    role: inspect
    supports_section: proof
    asset_uri: /matter-design-system
    alt_intent: Matter, Tcules' public Design System reference.
    status: INTERNAL_WORKING_ARTIFACT
  testimonial_ids:
  - FP-AUXENTIOS-RESEARCH
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
    - Auxentios
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
  - STRATEGY_SCOPE_ARTIFACT_REQUIRED
  - EXACT_OCT1_PHASE6_SOURCE_DIFF
  - QUOTE_PUBLICATION_REVIEW
  - CLIENT_MEDIA_RIGHTS_CONFIRM
content_governance:
  language: en-GB
  direct_quote_policy: preserve_verbatim_source_checked
  governing_rules: Tcules-VNext-Working-2026-10-08/00_RULEBOOK.md
  source_body: Tcules_Phase10_Canonical_Assembly_and_Publication_Gates_2026-10-08/assembled_authored_74/services__design-systems__design-system-strategy.md
---

*Design system strategy*

# Settle what belongs in your design system

For SaaS and software teams that keep debating scope. We work out what should be shared, what stays with each product, who approves changes and what to build first.

[Start a conversation](#enquiry)

*Selected work: Auxentios*

## Signs you need a strategy first {#recognition}

**"We have a library, but nobody agrees what belongs in it."** Every new request turns into a debate about scope.

**"Three teams, three date pickers."** Similar components behave differently, and each team can defend its own version.

**"Who approves a change?"** Nobody is sure, so changes either stall or slip in unnoticed.

**"Should one system serve all our products?"** Brands and products differ, and nobody has agreed which differences matter.

Agreeing scope and ownership settles these arguments. Adding to the library rarely does.

## What goes in the system, and what stays out {#scope}

We sort every pattern your teams use into one of four groups.

| Group | What belongs there | Example |
|---|---|---|
| Shared | Patterns every product should handle the same way | Form validation, status labels, focus behaviour |
| Product-specific | Work that belongs to one product's workflow | A pricing screen only one team uses |
| Technical | Code choices that support the system without changing what users see | How components are packaged for each codebase |
| Still open | Patterns that look shared but need more real use first | A filter two teams have built in different ways |

The last group matters most. Standardise a pattern too early and every team inherits the wrong answer at once.

## Who approves which change {#ownership}

Changing a shared colour token touches every product. Changing one product's layout touches one team. The approval route should reflect that difference.

We name who owns the foundations, who releases coded components, who can approve a product exception and how breaking changes are announced. Every kind of change gets a named person and a clear route.

## What you get {#deliverables}

**An inventory.** What already exists in Figma and code, and which duplicates to merge.

**A scope map.** The four groups above, filled in for your products.

**A structure for the system.** How colours, type, spacing and components are organised, so the system grows without a reshuffle.

**Ownership and contribution rules.** Who proposes, who builds, who signs off and who releases.

**A first-release plan.** The components your products need first, in the order teams will use them.

Ready to build? That is [Design System Implementation](/services/design-systems/design-system-implementation). Already have a system that teams avoid? Start with a [Design System Audit](/audits/design-system-audit).

## Start with the product, then the components {#proof}

### Auxentios: the quoting workflow first, the components second

Six specialist roles, from sales to pricing to maintenance, contribute to each quote in Auxentios' industrial quoting product. Before any component was drawn, we worked out what each role needed from a quote. Only then did we turn the repeated interface needs into components, tokens and layout rules.

Building the library first would have made the screens consistent while leaving the quoting logic unclear.

> “The workflow between our teams was seamless. I found the team at Tcules to be knowledgeable, friendly and research oriented.”  
> **Ashok Mohanty, Founder, Auxentios**

[Read the Auxentios case](/case-studies/auxentios-cpq-product-mvp-design)

### Matter: our own design system

[Matter](/matter-design-system) is the design system we created ourselves. Explore it to see how we structure foundations and components.

## Frequently asked questions {#faq}

### Do we need a design system at all?

Only if several teams or products keep solving the same interface problems. One small team with one product may need a shared component library and a few rules, and that can be the right call.

### Can one design system serve several products or brands?

Yes, when the products share the same meaning underneath. Brand differences are usually handled with tokens and themes. Products that behave very differently may need a shared core with separate layers on top.

### Who from our side needs to be involved?

Someone who can make product calls, a lead designer, a lead frontend engineer, and a voice from each team that will use the system. Strategy goes wrong when engineering hears about it last.

## Whose design system is it, anyway? {#enquiry}

Tell us which products and teams it should serve, and where each one pulls a different way.

**Enquiry form**

- Email
- What are you working on?
- Product or company URL (optional)

**Submit:** Send enquiry

**After sending:** We'll reply within one business day.
