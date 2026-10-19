# Tcules Evidence, Trust, Search, Visual and CMS Content System

This file governs selection and composition. It should not be copied wholesale into page prose.

# 1. Trust-marker system

A trust marker must answer a trust question. Typical questions are:

- Are you a legitimate, established studio?
- Have you worked at meaningful scale?
- Have credible organisations trusted you?
- Have you solved a problem like mine?
- Can you work with complexity?
- Can you carry design into implementation?
- Do you understand AI product behaviour?
- Did the work produce a verified outcome?
- Will your team be credible to work with?

## Trust-marker types

Maintain an inventory covering, where available:
- client logos;
- named case studies;
- project artefacts/screenshots;
- quantified company-scale statistics;
- verified project/business outcomes;
- testimonials and independent reviews;
- reviewer role/seniority;
- awards/directories/ratings;
- years operating;
- countries/projects served;
- AI project experience;
- team/practice credentials;
- talks/publications;
- delivery/process risk reducers;
- real studio/team imagery.

## Required inventory fields

For each marker maintain:
- `id`
- `type`
- `source`
- `exact_text_or_fact`
- `attribution`
- `source_date`
- `last_verified`
- `claim_types_supported`
- `service_tags`
- `problem_tags`
- `industry_tags`
- `icp_tags`
- `ai_relevance`
- `brand_equity` (0–3)
- `specificity` (0–3)
- `evidence_strength` (0–3)
- `recency` or project date
- `visual_asset`
- `usage_restrictions`
- `current_page_uses`

## Selection order

Use this order rather than filling template slots:

1. **claim fit**
2. **buyer/problem relevance**
3. **evidence strength and specificity**
4. **brand equity**
5. **recency**
6. **strategic relevance**, including AI where relevant
7. **novelty/diversity across the browsing journey**
8. **visual quality**

No marker is better than a mismatched marker.

### Testimonials

Short is not weak. A one-line quote is often stronger when it contains one specific, credible signal.

Prefer a precise observation, credible attribution, a senior or directly involved role, and tight connection to the nearby claim.

Do not force testimonials into every page. Do not repeatedly use the same quote merely because it is broadly positive.

Use longer testimonials only when the detail itself adds proof.

### Independent vs supporting trust blocks

Use an independent trust block when the proof itself answers an important page-level doubt, for example:
- recognisable client set;
- strong scale statistics;
- unusually powerful review;
- verified outcome cluster;
- distinctive AI/product track record.

Use inline/supporting proof when it substantiates a local proposition, for example:
- case fragment beside a service mechanism;
- quote beside a collaboration claim;
- screenshot beside a capability claim;
- metric beside an outcome statement.

Avoid generic “trust sections” that gather unrelated proof.

# 2. Case-study selection

Do not use one global case-study ranking for every placement.

## Placement-specific scoring

Default decision weights:
- problem/service relevance: **35**
- evidence quality and case completeness: **20**
- recency: **15**
- client brand equity: **10**
- strategic relevance, including AI where appropriate: **10**
- visual/artefact quality: **5**
- diversity/novelty relative to nearby cases: **5**

Treat these as decision support, not mathematical truth.

## Placement rules

### Homepage
Curate a portfolio, not merely the top scores. Balance:
- strongest recognisable client/brand proof;
- strongest recent work;
- credible AI-native/AI-major work;
- representative product complexity;
- different product situations;
- strong visual material.

### Service pages
Problem and service relevance dominate brand equity.

### Expertise pages
Relevant domain/product evidence dominates. Be explicit when the page is research-led rather than delivery-led.

### Case-study index
Use editorial prioritisation combining relevance to current ICP, recency, brand equity, strategic direction and completeness. Do not let old but famous work permanently crowd out stronger current proof.

# 3. FAQ standard for SEO and GEO

FAQs are not mandatory page furniture.

Add them only where meaningful questions remain after the main page.

Good FAQ questions:
- correspond to real buyer/search uncertainty;
- clarify scope, fit, process, trade-offs, timing, collaboration or terminology;
- can be answered specifically by Tcules;
- do not simply restate section headings.

Good answers:
- answer directly in the first sentence;
- stand alone when extracted;
- use canonical entities and service names naturally;
- add specific mechanism, boundary or example;
- link to deeper proof where useful;
- avoid sales filler;
- avoid unsupported generalisations.

Do not create FAQs primarily to target keyword variants or because a template expects them.

Do not assume FAQ structured data will generate a rich search feature. Verify current search-engine support separately.

For generative-search visibility, prioritise:
- original/non-commodity information;
- clear entity relationships;
- direct answers;
- demonstrable experience;
- citations/sources where relevant;
- coherent internal linking;
- images/video/artefacts that add information;
- technically crawlable pages.

# 4. Visual-content planning

Every page should include a media decision, even when that decision is “text is sufficient”.

For each major section classify the preferred mode:
- `text`
- `visual-first`
- `mixed`
- `proof-media`
- `interactive`
- `human/studio`

## Preferred Tcules visual sources

In descending evidentiary value where applicable:
1. actual product artefact;
2. annotated screenshot;
3. before/after or state comparison;
4. workflow/IA/system diagram;
5. real data visual;
6. real studio/team photography;
7. bespoke explanatory illustration;
8. decorative art direction.

Do not fabricate client UI or outcomes to make a page look richer.

## Media brief fields

For each planned visual:
- communication job;
- section/claim supported;
- source asset;
- visual format;
- caption;
- alt-text intent;
- responsive behaviour;
- whether it is proof, explanation or atmosphere.

# 5. CMS content architecture

The CMS should encode meaning and reuse without making the website look templated.

## Principle: standardise semantics, not page rhetoric

A **component** is a semantic communication primitive.

A **page-family recipe** defines required jobs and allowed modules.

A **visual template** is only one rendering of those semantics.

Do not use one rigid section order for all pages in a family.

## Recommended reusable component registry

At minimum consider:
- hero;
- client-logo strip;
- stat group;
- situation/problem cards;
- service/responsibility cards;
- case-study feature;
- case-study grid;
- inline case proof;
- testimonial quote;
- review card;
- proof cluster;
- mechanism/process;
- workflow/diagram;
- comparison;
- artefact gallery;
- long-form explanation;
- callout;
- FAQ;
- CTA block;
- contact/inquiry;
- team/studio module;
- related insight;
- media block.

Each component contract should define:
- primary communication job;
- required fields;
- optional fields;
- canonical field meanings;
- copy budgets;
- allowed variants;
- sibling parallelism rule;
- supported evidence types;
- supported visual modes;
- responsive acceptance checks;
- page families where appropriate;
- maximum useful repetition per page where relevant.

## Page-family recipes

Define recipes for:
- homepage;
- services index;
- service detail;
- audit;
- expertise;
- case study;
- insight;
- glossary;
- tool;
- About;
- Careers;
- legal.

A recipe should specify:
- page-level decision job;
- required communication jobs;
- optional modules;
- evidence expectations;
- CTA role;
- visual expectations;
- SEO/entity requirements;
- disallowed redundancies.

It should **not** specify an identical sequence of eyebrow → H2 → paragraph → three cards unless the meaning genuinely requires it.

## Escape hatch

Allow a deliberately bespoke section when:
- the story cannot be represented honestly by an existing component;
- the exception materially improves comprehension or proof;
- the need is documented before creating a new reusable component.

Do not create a new component merely because the copy is long.

# 6. Page/content inventory fields

For efficient editorial and UI development, maintain machine-readable page records containing at least:
- route;
- page family;
- primary intent;
- buyer question;
- target audience/ICP;
- product situation/demand trigger;
- canonical entities;
- primary proposition;
- required proof types;
- selected proof IDs;
- selected case-study IDs;
- FAQ status;
- visual/media status;
- CTA stage;
- component sequence;
- content status;
- claim-verification status;
- legal status where relevant;
- composition status;
- production status.

This makes content, design and development review the same system rather than three disconnected spreadsheets.

# 7. Acceptance sequence

Review in this order:
1. Truth
2. Strategy/page purpose
3. Semantics
4. Evidence and trust
5. Copy
6. Copy × UI
7. Visual/content-mode choice
8. Page composition
9. Responsive behaviour
10. SEO/GEO and metadata
11. CMS/component integrity
12. Production

A failure earlier in the chain should normally be fixed before polishing later layers.