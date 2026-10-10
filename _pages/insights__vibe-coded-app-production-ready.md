---
route: /insights/vibe-coded-app-production-ready
slug: vibe-coded-app-production-ready
page_name: I vibe-coded an app. Now what? The path from prototype to production
page_type: article
seo:
  title: Is your vibe-coded app ready for production? | Tcules
  description: Is your vibe-coded app ready for real users? What each audience demands, where these apps break first,
    and the steps from prototype to production.
  canonical: https://www.tcules.com/insights/vibe-coded-app-production-ready
  robots: index,follow
social:
  og_title: Is your vibe-coded app ready for production? | Tcules
  og_description: Is your vibe-coded app ready for real users? What each audience demands, where these apps break
    first, and the steps from prototype to production.
  og_image: https://www.tcules.com/assets/og/insights.png
  og_image_alt: Tcules social card headed Insights, on a white background with the Tcules wordmark.
  og_type: article
  article_published_time: null
  article_modified_time: '2026-10-07'
  og_url: https://www.tcules.com/insights/vibe-coded-app-production-ready
  og_site_name: Tcules
  og_locale: en_GB
  twitter_card: summary_large_image
  twitter_title: Is your vibe-coded app ready for production? | Tcules
  twitter_description: Is your vibe-coded app ready for real users? What each audience demands, where these apps
    break first, and the steps from prototype to production.
  twitter_image: https://www.tcules.com/assets/og/insights.png
search_context:
  primary_intent: vibe-coded app production readiness
  primary_buyer_question: Is my vibe-coded app ready for real users, and what has to happen before it is?
  key_entities:
  - vibe coding
  - AI-built prototype
  - production readiness
  - row level security
  - prototype hardening
  buyer_question_evidence:
    status: NO_V7_QUESTION_EVIDENCE; DO_NOT_ADD_FAQ_WITHOUT_RESEARCH
navigation:
  breadcrumb:
  - name: Home
    url: /
  - name: Insights
    url: /insights
  - name: I vibe-coded an app. Now what? The path from prototype to production
    url: /insights/vibe-coded-app-production-ready
render:
  band_order:
  - is-vibe-coding-production-ready
  - what-changes-when-real-users-arrive
  - where-do-vibe-coded-apps-break-first
  - the-path-from-prototype-to-production
  - should-you-keep-harden-or-rebuild-what-the-ai-built
  - who-can-help-with-which-part
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
  article_date_published: null
  article_date_modified: '2026-10-07'
  article_authors:
  - type: Organization
    name: Tcules
    ref: https://www.tcules.com/#organization
editorial:
  author: Tcules Editorial
  author_role: Product & Design Engineering, Tcules
  reviewer: null
  published_at: null
  modified_at: '2026-10-07'
  date_as_displayed: Last updated on 7 Oct ’26
  reading_time_as_displayed: 10 Min Read
  topic_tags:
  - AI-assisted workflows
  - Modernise & Replatform
  standfirst: Is your vibe-coded app ready for real users? What each audience demands, where these apps break first,
    and the steps from prototype to production.
release:
  content_state: LIVE_CAPTURE_2026-10-08
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
  feature_dependencies: []
  legal_dependencies: []
migration:
  redirects_from: []
content_governance:
  language: en-GB
  source: live_capture
  source_url: https://www.tcules.com/insights/vibe-coded-app-production-ready
  captured_at: '2026-10-08T19:46Z'
  change_log: 11-batch-6/live-capture-log.md
  governing_rules: Tcules-VNext-Working-2026-10-08/00_RULEBOOK.md
  direct_quote_policy: preserve_verbatim_source_checked
  authorship_policy: preserve_named_human_author_and_real_dates_where_present
page_composition:
  editorial_review:
    section_components:
      is-vibe-coding-production-ready: argument_thesis
      what-changes-when-real-users-arrive: comparison_decision
      where-do-vibe-coded-apps-break-first: argument_thesis
      the-path-from-prototype-to-production: comparison_decision
      should-you-keep-harden-or-rebuild-what-the-ai-built: comparison_decision
      who-can-help-with-which-part: argument_thesis
  media_bindings: []
  commercial_system:
    testimonial_ids: []
    version: commercial-v11
    composition_rule: semantic_jobs_and_evidence_not_fixed_counts
  cms_contract:
    version: semantic-v11
  related_content: []
---

*Insights · AI-assisted workflows · Modernise & Replatform*

# I vibe-coded an app. Now what? The path from prototype to production

*Tcules Editorial, Product & Design Engineering, Tcules · Last updated on 7 Oct ’26 · 10 min read*

A vibe-coded app is not production ready by default, and the tool you used does not decide it. It is ready for real users when someone can explain what it stores, who can see each record, what happens when a step fails, and who fixes it when it breaks. The prototype proved the idea. Production needs those answers.

This guide is for the founder or product lead holding a working app built with Lovable, Bolt, v0, Replit or Cursor, and wondering what to do before anyone else depends on it.

## Is vibe coding production ready? {#is-vibe-coding-production-ready}

The answer depends on what "vibe coding" means, and the original meaning already contains it. Andrej Karpathy [coined the term in February 2025](https://x.com/karpathy/status/1886192184808149383) for coding where you "forget that the code even exists," and called it "not too bad for throwaway weekend projects." Simon Willison later [drew the line more sharply](https://simonwillison.net/2025/Mar/19/vibe-coding/): vibe coding is building software with a model without reviewing the code it writes. His golden rule for production-quality AI-assisted programming is that he will not commit any code he could not explain to someone else.

So the honest reading of the question is this. An app can start as vibe coding and reach production. It cannot stay vibe coding and be production software, because production means someone has read, tested and taken responsibility for what runs. The path to production is the path from "nobody has looked" to "someone owns this."

That does not mean starting again. Some AI-built software is already in real use. SaaStr founder Jason Lemkin [reports running a dozen or more vibe-coded apps with over 800,000 total uses](https://saastr.com/weve-built-12-vibe-coded-apps-used-800000-times-i-love-it-but-i-still-have-to-maintain-them-every-single-day/), and in the same piece says that at that scale they need maintenance every day. That is one operator's account, not a benchmark, but it shows both halves: it can work, and it becomes a job.

## What changes when real users arrive? {#what-changes-when-real-users-arrive}

"Production" is not one bar. It is set by who uses the app next and what they trust it with. The table below is our judgement of the minimum for each step up; your domain or regulator may ask for more.

| Who uses it next | What has to be true before they do |
|---|---|
| Only you, or a demo you drive | Secrets such as API keys are not exposed in code or links you share. |
| Investors or testers on a guided walkthrough | Fake data is labelled as fake, nothing real is collected, and the demo path works on their device. |
| Your own team, as an internal tool | Access is limited to the team, data is backed up, and a named person can fix it when it breaks. |
| Paying customers or the public | Every record checks who is asking. Secrets stay on the server. Error, empty and recovery states are designed, not defaulted. Real data lives apart from where you experiment. Errors are monitored, and someone owns the code. |
| Payments, health, children's or other regulated data | Everything above, plus a specialist security review and whatever your regulations require. Lovable's [own security documentation](https://docs.lovable.dev/features/security) says apps handling sensitive data should consider an additional professional security review. |

The first useful decision is not technical. Write down who will use the app next and what they will put into it. That one sentence tells you which row you are in and how much of the rest of this guide applies.

## Where do vibe-coded apps break first? {#where-do-vibe-coded-apps-break-first}

The failures that reach the news cluster in a few places. So do the gaps that never make the news but decide whether anyone keeps using the product.

Who can see which data. In 2025, two Replit employees [scanned 1,645 apps showcased by Lovable and found 170 that let anyone read user data](https://www.semafor.com/article/05/29/2025/the-hottest-new-vibe-coding-startup-lovable-is-a-sitting-duck-for-hackers), including names, emails, financial details and API keys. The [published vulnerability](https://mattpalmer.io/posts/2025/05/CVE-2025-48757/) traced it to missing or insufficient row level security, the database rules that decide which rows each user may touch. Supabase's [own documentation](https://supabase.com/docs/guides/database/postgres/row-level-security) is blunt: a table in an exposed schema without those rules is readable and writable by any role with a grant on it. The app worked in the demo because the demo never had a second, hostile user.

Generated code that is functional but unsafe. Veracode tested code from more than 100 large language models on a benchmark of coding tasks and found that [45% of samples introduced a security flaw from the OWASP Top 10](https://www.veracode.com/blog/genai-code-security-report/), with no improvement from newer or larger models. That measures benchmark tasks, not deployed apps, so read it as a reason to review rather than as your app's odds.

Experiments touching real data. In July 2025 a Replit agent [deleted a live production database during a code freeze](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/) while Lemkin was building with it. The data was later recovered, and Replit responded by separating development and production databases automatically. The lesson applies to any tool: the place where you try things must not be the place where customers' records live.

The platform itself. Your builder is part of your risk surface. In April 2026 The Next Web [reported an authorisation flaw in Lovable's own API](https://thenextweb.com/news/lovable-vibe-coding-security-crisis-exposed) that exposed source code and database credentials from projects created before November 2025. You cannot fix the platform, but you can know where your data and credentials live and rotate them when something like this is disclosed.

The product decisions nobody asked for. Engineering checklists cover secrets, authentication, error handling, testing, CI and hosting. The product decisions behind those paths are a different layer, and that is where a builder tool fills silence with plausible defaults. What does a new account see before it has any data? What happens when someone closes the tab halfway through a task, or two people edit the same record? What can an admin do that a member cannot? A screen that says "Invitation sent" may not be connected to any email service at all. Accessibility is part of this too: researchers report that large language models generating web interfaces [frequently violate the Web Content Accessibility Guidelines](https://arxiv.org/abs/2510.13914), which can shut out keyboard and screen-reader users while the demo looks fine.

None of these are exotic. They are what a demo does not need and a product cannot do without.

## The path from prototype to production {#the-path-from-prototype-to-production}

Work through these in order. Each step has a check that tells you it is done. Depending on your row in the table above, some steps are one afternoon of your own time and some need another person.

| Step | Done when |
|---|---|
| 1. Name the next users and what they will trust the app with. | One sentence places you in a row of the table above, and everyone involved agrees with it. |
| 2. Walk one real workflow and label each step demonstrated, simulated or unknown. | You know which screens do real work and which only look finished. Our free [Prototype Readiness Checklist](/tools/prototype-readiness-checklist) gives you a structure for this. |
| 3. Close access and data gaps first. | Logged out, and logged in as a second user, you cannot see or change anyone else's records. No secret key ships to the browser. |
| 4. Separate experiments from real data, and back it up. | Your builder or agent cannot reach production data, and you have restored a backup at least once. |
| 5. Decide the states the demo never needed. | Empty, loading, error, interrupted work, a second user, revoked access, a phone screen and keyboard-only use each have a deliberate answer. |
| 6. Put someone who can explain the code in charge of it. | A named person can say what each critical part does, and has decided what to keep, harden or rebuild. |
| 7. Launch small, with a way to see failures and a way back. | Errors reach someone who acts on them, and you can roll back a bad release. |

Step 6 is easy to skip, because the app appears to run itself. Willison's rule and Lemkin's daily maintenance point the same way: once real people rely on the app, it needs an owner who understands it. For the security steps in detail, see our vibe-coded app security checklist. If your team is already reviewing AI output, our piece on accepting AI-generated frontend code covers what to check at review time.

## Should you keep, harden or rebuild what the AI built? {#should-you-keep-harden-or-rebuild-what-the-ai-built}

The UK government's service manual says [do not just copy prototype code into production](https://www.gov.uk/service-manual/design/making-prototypes), because prototype code does not need to meet the same standards as production code. That is sound advice, and it is not the same as throwing the prototype away. The decision is made part by part, on evidence:

| Decision | When it fits |
|---|---|
| Keep | The behaviour is right, someone can explain the code, and it already meets the conditions of your row in the table above. |
| Harden | The behaviour is right but the implementation took shortcuts that matter for your next users, such as access rules, error handling or data storage. |
| Redesign | The code may be fine, but the product behaviour was a default nobody chose, such as what happens on failure or who can do what. |
| Rebuild | The structure blocks the next version, for example a data model that cannot express the roles or records you now need. |

The interaction your users liked can be worth keeping even when the code underneath is not. That is why it pays to separate the product question from the code question before anyone quotes a rewrite.

## Who can help with which part? {#who-can-help-with-which-part}

Getting a vibe-coded app to production involves two kinds of review, and they are easy to confuse.

A product review asks whether the behaviour is decided: roles, states, recovery, and which parts of the demo were real. That is what our [Prototype Readiness Review](/audits/prototype-readiness-review) does. A practitioner walks your running app against the next version you intend to build, separates what it demonstrated from what it simulated, and says what to keep, specify, redesign or replace before development. A public link or screen recording is enough to start, and the findings are written so your own developers or another team can act on them.

A code and security review asks whether the implementation is safe and maintainable. It usually needs source access and the right specialist, and the product review does not replace it. If the code itself needs work, see vibe-coded app cleanup.

If you are not sure you need either yet, start with the free checklist in step 2. It will tell you how much of your app is real.

[Tell us who will use your app and what data it holds](/contact).
