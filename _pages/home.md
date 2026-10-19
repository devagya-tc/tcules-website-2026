---
route: /
slug: home
page_name: Homepage
page_type: page
seo:
  title: 'Tcules: Product Design Studio for SaaS & Complex Software'
  description: Product design studio for SaaS and complex software. We design new products and improve established ones, from research to code, for clients in 19 countries.
  canonical: https://www.tcules.com/
  robots: index,follow
social:
  og_title: 'Tcules: Product Design Studio for SaaS & Complex Software'
  og_description: Product design studio for SaaS and complex software. We design new products and improve established ones, from research to code, for clients in 19 countries.
  og_image: IMAGE_ASSET_REQUIRED
  og_image_alt: Tcules, a digital product design studio for SaaS and complex software.
  og_type: website
  og_url: https://www.tcules.com/
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: 'Tcules: Product Design Studio for SaaS & Complex Software'
  twitter_description: Product design studio for SaaS and complex software. We design new products and improve established ones, from research to code, for clients in 19 countries.
  twitter_image: IMAGE_ASSET_REQUIRED
search_context:
  primary_intent: product design studio for SaaS and complex software
  primary_buyer_question: Can Tcules help us make a consequential product move and carry the right decisions far enough to become real?
  supporting_questions:
  - Can you design and build a whole product?
  - Can you work with our existing team?
  - Can we start small?
  - Is Tcules a UI/UX design agency?
  - Do you only work with SaaS companies?
  - How do you work with teams outside India?
  key_entities:
  - Tcules
  - Product Design
  - SaaS
  - complex software
  - Product Modernisation
  - Design Systems
  - AI Product UX
  - Design Engineering
  - Software Development
  primary_query: product design studio for SaaS
navigation:
  breadcrumb:
  - name: Home
    url: /
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
  - client-recognition
  - product-situations
  - selected-work
  - capabilities
  - why-tcules
  - client-voices
  - ai-native-practice
  - expertise
  - faq
  - enquiry
page_composition:
  client_recognition:
    component_type: client_logo_strip
    placement: after_hero
    clients: &id001
    - Doodle
    - Dealpath
    - Benchmark Gensuite
    - Eden AI
    - JoVE
    - Ringier Media Switzerland
    asset_policy: Use approved client logo assets; render names as fallback; never invent a logo asset.
  visual_plan: product_decision_survival_model_plus_inspectable_case_artefacts
  media_bindings:
  - id: home_doodle_cover
    role: proof
    supports_section: flagship-work
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1788500386/Thumbnail_case_study_doodle_e1840df53b.webp
    source: current public Tcules case study thumbnail (/case-studies)
    alt_intent: Doodle's booking page, a team calendar with the most bookable meeting slots highlighted
    status: BOUND_EXISTING_PUBLIC_ASSET
  - id: home_eden_ai_cover
    role: proof
    supports_section: flagship-work
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1788505970/Thumbnail_case_study_eden_AI_258a48e39d.webp
    source: current public Tcules case study thumbnail (/case-studies)
    alt_intent: Eden AI workflow builder chaining an input, an AI detection step and if/else logic to an output
    status: BOUND_EXISTING_PUBLIC_ASSET
  - id: home_doodle_object_model
    role: proof
    supports_section: flagship-work
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1766139496/660d1d45ed4ca3f2169cdb83_tricky_part_real_32fb6878e0.webp
    source: current public Tcules case media
    alt_intent: Doodle product model connecting meeting priority, availability and scheduling behaviour
    status: BOUND_EXISTING_PUBLIC_ASSET
  - id: home_dealpath_workflow
    role: proof
    supports_section: flagship-work
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1787139518/section_3_ffd1c5cb2a.webp
    source: current public Tcules case media
    alt_intent: Dealpath workflow redesign that searches existing deals before creating a new record
    status: BOUND_EXISTING_PUBLIC_ASSET
  - id: home_benchmark_scope_selector
    role: proof
    supports_section: flagship-work
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014613/Redesigned_SS_Nav_7427598ce2.png
    source: current public Tcules case media
    alt_intent: Benchmark Gensuite scope selector separating different ways of finding and defining scope
    status: BOUND_EXISTING_PUBLIC_ASSET
  - id: home_eden_unified_search
    role: proof
    supports_section: flagship-work
    asset_uri: https://res.cloudinary.com/dbay1gb0s/image/upload/v1773124788/Eden_AI_2_f04afef6ad.webp
    source: current public Tcules case media
    alt_intent: Eden AI workflow builder showing unified search and AI-assisted creation
    status: BOUND_EXISTING_PUBLIC_ASSET
  testimonial_ids:
  - FP-DOODLE-EFFICIENCY
  - FP-EDEN-DEVELOPERS
  - CL-VIDEOPLASTY-DECISIONS
  - CL-AUX-COMPLEXITY
  - DRAFT-PRIMELIS-TEAM
  - CL-RINGIER-COLLAB
  - UW-JOVE-INTEGRATION
  - DRAFT-KNOVOS-CANDOUR
  - DRAFT-CURAMCARE-RESEARCH-BUILD
  - DRAFT-DOODLE-RESEARCH
  - DRAFT-EDEN-PLATFORM
  logo_client_ids: *id001
  trust_module_policy: required_commercial_relation_module
  external_review:
    source: Clutch
    rating: '4.8'
    review_count: 13
    checked: '2026-10-08'
    reverify: on launch day
structured_data:
  types:
  - Organization
  - WebSite
  - WebPage
  - FAQPage
  organization_id: https://www.tcules.com/#organization
  website_id: https://www.tcules.com/#website
release:
  content_state: PILOT_DRAFT_V2_2026-10-08
  site_release_state: SITE_RELEASE_HOLD
  composition: NOT_COMPOSITION_VALIDATED
  production: NOT_PRODUCTION_VALIDATED
  route_dependencies:
  - FORM_ENDPOINT_VERIFICATION
  - CLAIM_EVIDENCE_VERIFICATION
  - EXTERNAL_REVIEW_SIGNAL_REVERIFY
  - IMAGE_ASSET_REQUIRED
content_governance:
  language: en-GB
  direct_quote_policy: preserve_verbatim_source_checked_2026-10-08
  governing_rules: Tcules-VNext-Working-2026-10-08/00_RULEBOOK.md
  source_body: source-pages-1-oct (1 Oct 2026) with Phase 3 candidate (8 Oct 2026) for Home
---

*Digital product design studio*

# Ambitious software, designed to feel simple

Tcules is a digital product design studio bringing research, design and code into one practice. We work alongside founders and product teams to create and improve software for the people who use it.

[Start a conversation](#enquiry)

**Founded 2017 · More than 90 projects · Clients in 19 countries · Based in Ahmedabad, India**

## Some of the teams we've worked with {#client-recognition}

Doodle · Dealpath · Benchmark Gensuite · Eden AI · JoVE · Ringier Media Switzerland

**4.8 out of 5 on Clutch** across 13 independent client reviews. [Read the reviews](https://clutch.co/profile/tcules-saas-product-design-studio)

## What do you need next? {#product-situations}

### Launch a new product

Got an idea, or a prototype you built with AI? We design a first release your customers can rely on, keep what already works and build it too.

[New Product Design & First Release](/services/new-product-design-first-release)

### Make your SaaS product easier to use

Smoother onboarding, simpler workflows, fewer support tickets about the same three screens. We find where the product makes people work too hard and fix it.

[Product Design](/services/product-design)

### Update an ageing product

Refresh how it looks and works without breaking the habits customers rely on. We agree with you which parts stay as they are and which to rebuild.

[Product Modernisation](/services/product-modernisation)

### Make your copilot or AI search easy to trust

Show users what the AI did, why, and how to change it, before it acts for them.

[AI Product UX](/services/ai-product-ux)

### Get every team building from the same system

One design system across Figma and code, with the rules and support that help every team adopt it, so your product stops looking like five different products.

[Design Systems](/services/design-systems)

### Make sure what ships matches the design

We work in code as well as in Figma, so we can check the product your customers see against what was designed.

[Design Engineering](/services/design-engineering)

## Selected work {#selected-work}

### Doodle: meeting times people will actually keep

Our research showed that meeting type, priority and "maybe" availability affect whether a time will hold, so we designed the MVP to show how dependable each option is.

> “Impressed with the design team's efficiency. Not a rush job, but constant iteration with our feedback. Collaborative approach led to a clear, well-defined MVP. Early users are happy, so are we!”  
> **Stephanie Leue, Doodle**

[Read the Doodle case](/case-studies/doodle-case-study-automating-enterprise-meeting-scheduling)

### Dealpath: search first, create second

Dealpath's "Add to pipeline" button always started a new deal, even when one already existed. We redesigned that flow so teams check for an existing deal first, and reorganised the listing card so the key details are quick to scan.

[Read the Dealpath case](/case-studies/enterprise-workflow-redesign-dealpath-real-estate)

### Benchmark Gensuite: a new interface tried in working code before rollout

Benchmark Gensuite was updating the interface of a large environment, health and safety suite. We built the new screens and controls as coded prototypes, so the team could check them against the way experienced users already work before rolling them out more widely.

[Read the Benchmark Gensuite case](/case-studies/benchmark-gensuite-enterprise-suite-modernisation)

### Eden AI: one way into the workflow builder

Users could start from a template, ask the AI for help or start from scratch, and each felt like a separate path. We brought all three into one starting point.

> “Our developers enjoyed working on the platform with the right UI/UX specs. Our users gave us great feedback about the new design, and they came forward and told us without us asking for it.”  
> **Samy Melaine, Founder & CPTO, Eden AI**

[Read the Eden AI case](/case-studies/eden-ai-workflow-builder-search-redesign)

[See all case studies](/case-studies)

## What we do {#capabilities}

Product Design is at the heart of every project. The services below apply it to particular problems or carry it into code.

**[Product Design](/services/product-design).** Research, workflows, interface design, prototyping and testing.

**[Product Modernisation](/services/product-modernisation).** Improving established software without breaking what customers rely on.

**[Design Systems](/services/design-systems).** One set of components and rules, shared by design and code.

**[AI Product UX](/services/ai-product-ux).** AI features people understand, trust and stay in control of.

**[Design Engineering](/services/design-engineering).** Design built and checked in real code.

**[Software Development](/services/software-development).** Our engineers turn the design into working software, with the designers beside them, for a first release or a product you already run. For GT Tools, we redesigned and built the Shopify store their buyers use to find and compare equipment.

## Why teams choose Tcules {#why-tcules}

### We get to the real problem first

A request for new screens often hides a bigger question. We find it before anyone designs the wrong thing.

> “The thought process behind every single decision they make. The team was skilled and knowledgeable in the workflow.”  
> **Eduard Stinga, Founder, VideoPlasty**

### We like software with a lot going on

Many roles, permissions, approvals and exceptions. For Auxentios, six specialist roles had to work on the same quotation, so we designed one shared quoting workflow for all of them.

> “We were impressed with their lead designer and team because they understood our complex concepts.”  
> **Ashok Mohanty, Founder, Auxentios Technology**

### We can build what we design

One team from first research to working software. For The Wandering Raven, we designed a creative-writing experience for young learners and built it into Moodle.

### We work as part of your team

We join your tools, your design system, your codebase and your meetings, and you talk directly to the people doing the work.

<!-- awaiting client sign-off -->
> “For three years Tcules has designed every one of our products. They work like part of our product team, improving them continuously and helping us shape AI features our customers can check and trust.”  
> **Clément Contamine, CPO, Primelis**

[How to choose a product design studio](/why-tcules)

## What clients say {#client-voices}

What it's like to work with us, from the people who did.

> “It was simply the most successful long-distance 3rd party collaboration I have seen. The company is on eye-level or above for the services they offer. Their staff were really good.”  
> **Roland Sailer, Director of Product, Ringier Media Switzerland**

> “The Tcules team integrated well with our internal PMs and designers, contributing meaningfully to high-fidelity design deliverables that most often met our product standards.”  
> **Dhanur Aashray Majety, Director, Product Management, JoVE**

<!-- awaiting client sign-off -->
> “Tcules told us what was really wrong, including the things we didn't want to hear, and then fixed them with us.”  
> **Akshay Vyas, Creative Head, Knovos**

<!-- awaiting client sign-off -->
> “Tcules started by asking our families and carers what got in their way, turned it into a clear product plan, then redesigned our web platform and both apps. Their developers built the frontend from those designs, so nothing got lost in the handover.”  
> **Jody O'Neill, CEO & Co-founder, CuramCare**

<!-- awaiting client sign-off -->
> “Their research changed how we thought about scheduling across companies. The MVP was clearer because of it, and so was our roadmap.”  
> **Stephanie Leue, Doodle**

<!-- awaiting client sign-off -->
> “Eden AI gives developers one way into hundreds of AI models, so the product has to be easy to find your way around. Tcules understood that quickly. Our developers had specs they could build from, and our users told us they loved the new design without being asked.”  
> **Samy Melaine, Founder & CPTO, Eden AI**

## How we use AI in our own work {#ai-native-practice}

We use AI across our own work: to research more widely, explore more options, prototype in code and check designs against what was built. Our designers and engineers make the calls and answer for the result.

[How we use AI at Tcules](/how-we-work/ai-native-product-design)

## Products we know well {#expertise}

[B2B SaaS and workflow software](/expertise/b2b-saas-workflow-software) · [AI products and developer tools](/expertise/ai-products-developer-tools) · [Data and analytics products](/expertise/data-analytics-decision-products) · [Commerce and transactional products](/expertise/commerce-transactional-products) · [Marketplaces and multi-sided platforms](/expertise/marketplaces-multi-sided-platforms) · [FinTech and InsurTech](/expertise/fintech-insurtech) · [HealthTech](/expertise/healthtech) · [MarTech and SalesTech](/expertise/martech-salestech)

## Questions we're often asked {#faq}

### Can you design and build a whole product?

Yes. Our designers shape the product and our engineers build it with them, as one team. What you approve in design is what reaches your customers. You keep the commercial, legal and final business calls.

### Can you work with our existing team?

Yes. We can take on a defined piece of work, or join your product, design and engineering team and work in your tools.

### Can we start small?

Yes. One workflow or one problem is a good place to start. If it makes sense to do more, we will tell you why.

### Is Tcules a UI/UX design agency?

We do UI and UX design, plus the research, product thinking and engineering around it. That is why we call ourselves a digital product design studio.

### Do you only work with SaaS companies?

No. SaaS is our main focus, and we also work on AI products, ecommerce, internal tools and other complex software.

### How do you work with teams outside India?

We work with clients in 19 countries. We agree working hours that overlap with yours, work in your tools and channels, and you speak directly with the people on your project.

## Tell us what you're building {#enquiry}

A sketch, a prototype or a product with years of history behind it. Start wherever you are.

**Enquiry form**

- Email
- What are you working on?
- Product or company URL (optional)

**Submit:** Send enquiry

**After sending:** We'll reply within one business day.
