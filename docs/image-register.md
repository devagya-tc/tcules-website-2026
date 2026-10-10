# Image register — `_pages` corpus

Every image slot the first-pass pages need that the frontmatter does **not** already bind. A
`media_bindings` entry with `status: BOUND_EXISTING_PUBLIC_ASSET` and an `asset_uri` is used as is
and does not appear here. Anything else gets a labelled placeholder in the page and a row below, so
the asset list is generated from the design rather than guessed. No image is generated in this pass.

Started 10 Oct 2026. Briefs and generation happen later.

## Columns

| Column        | Meaning                                                              |
| ------------- | -------------------------------------------------------------------- |
| Page          | Route the slot is on (`/services/product-design`).                   |
| Band          | Band id the image sits in or beside.                                 |
| Kind          | `illustration`, `product shot`, `studio photo`, `icon` or `diagram`. |
| What it shows | The subject, in one sentence. Concept first, not style.              |
| Ratio         | The frame the design reserves, e.g. `16:9`, `4:3`, `1:1`.            |

## Register

| Page | Band | Kind | What it shows | Ratio |
| ---- | ---- | ---- | ------------- | ----- |
| `/` | hero | illustration | The product-decision survival model (`visual_plan`): how one consequential product decision survives from research, through design and coded prototype, into shipped software, with one Tcules practice carrying it across every step. | 5:4 |
| `/` | client-recognition | icon | Approved client logo SVGs for Dealpath, Benchmark Gensuite, Eden AI, JoVE and Ringier Media Switzerland (Doodle's exists). Until then the grid renders names. | intrinsic (logo cell) |
| `/` | why-tcules | studio photo | A Tcules team working through a product with a lot going on: roles, permissions and exceptions mapped on a wall during a working session. | 4:5 |
| `/` | ai-native-practice | studio photo | Tcules designers and engineers using AI in their own work (exploring options, prototyping in code, checking a build against the design), with a person making the call. | 3:2 |
| `/services/product-design` | hero | illustration | Uncertainty mapped to the design medium that resolves it (research, workflow, interface, prototype, code), with Doodle, Dealpath, Eden AI, Auxentios and Scissors pinned where their work sat (`visual_plan`). Replaces the interim service-line illustration. | 5:4 |
| `/services/product-design` | starting-points | studio photo | A designer watching a customer use the product and noting the step where the workflow trips them up. | 3:2 |
| `/services/product-design` | engagement | studio photo | An experienced Tcules designer working inside a client's own tools and meetings, beside the client's product team. | 4:5 |
| `/audits/design-to-code-audit` | hero | illustration | One component followed from intent through the design system, implementation and runtime to acceptance (`visual_plan`), with the point where a gap enters marked and traced back to its cause. | 5:4 |
| `/audits/design-to-code-audit` | recognition | studio photo | A designer and a developer comparing the approved design with the shipped screen side by side, pointing at the same mismatch. | 3:2 |
| `/audits/design-to-code-audit` | deliverables | product shot | The audit's difference record: a shipped screen beside the approved design, each gap tagged by type (defect, missing state, adaptation, system gap, sign-off gap) and cause. | 4:5 |
| `/audits/design-to-code-audit` | why-tcules | studio photo | A Tcules design engineer with the Figma file and the repository open together, following a gap back to where it started. | 6:5 |
| `/expertise/healthtech` | hero | illustration | Patient, clinician, carer, healthcare professional and operations team each seeing their own view of one shared case, with records and bookings arriving from connected systems and specialist rules framing what each may see (`signature_model`). | 5:4 |
| `/expertise/healthtech` | approach | studio photo | A researcher running a usability session with a nurse on a real task, on the device the nurse actually uses. | 4:5 |
| `/expertise/healthtech` | proof (CuramCare) | product shot | CuramCare: a family member and a carer each seeing their own part of the same care arrangement, across the web platform and the two apps (frontmatter `healthtech_asset`; approved screen required). The frontmatter asks for one screen (`healthtech_asset`, CuramCare or Vovisto); if only one is approved it goes in the CuramCare slot and the Vovisto band drops its media. | 4:5 |
| `/expertise/healthtech` | proof (Vovisto) | product shot | Vovisto: a travel coordinator's view and a healthcare professional's portal view of the same congress trip (budget, approval, flights, hotel). Approved screen required. The frontmatter asks for one screen (`healthtech_asset`, CuramCare or Vovisto); if only one is approved it goes in the CuramCare slot and the Vovisto band drops its media. | 4:5 |
| `/tools/design-system-drift-checker` | how-to-use-it | product shot | The Drift Checker record builder mid-trace: one select field recorded across Figma, Storybook and the shipped product, each finding marked aligned, difference found, unknown or intentional exception (`v11_tool_interface`). | 6:5 |
| `/insights/cpq-ux-design` | the-quote-is-the-shared-object | diagram | The responsibility map: six roles (sales representative, sales manager, product, pricing, solution and maintenance experts) contributing to one quotation, with where information changes and where a hand-off or exit sits. | 16:9 |
| `/insights/cpq-ux-design` | design-for-the-revision-not-the-first-draft | diagram | Two versions of one quote side by side: the lines that changed marked, the one change that moved the price called out, and which version the customer saw. Added in the critic pass. | 16:9 |
| `/about` | studio (split from the hero) | studio photo | Product Design at the centre of the studio: Tcules designers and engineers modelling a product together at a wall in the Ahmedabad studio. Added in the critic pass. | 4:5 |
| `/about` | what-remains-constant | studio photo | The Ahmedabad studio in its city: the place the practice took shape, with work for clients elsewhere visible inside. Added in the critic pass. | 4:5 |
| `/about` | difference | studio photo | A senior Tcules designer and an engineer working through a complex product's roles, rules and states together at one screen. | 4:5 |
| `/about` | how-we-work | studio photo | A Tcules lead designer working directly with a client team, in the client's own tools and review rhythm. | 3:2 |
| `/about` | careers | studio photo | Designers and engineers at work together in the Ahmedabad studio, critiquing one piece of work, framed wide enough to read as the whole studio (Banner `below`, critic pass). | 3:1 |
| `/case-studies` (new-products); `/services/product-design` (complex-products) | case cover: Auxentios | product shot | Auxentios' industrial quoting product: one shared quoting workflow where six specialist roles contribute to the same quote. | 16:9 master |
| `/case-studies` (new-products) | case cover: Novus Insights | product shot | Novus Insights' survey tool: an AI-suggested starting questionnaire with the researcher editing and deciding. | 16:9 master |
| `/case-studies` (new-products) | case cover: Kirana store payments | product shot | The small-shop payment app shaped by twenty merchant interviews (client name withheld: no client marks). | 16:9 master |
| `/case-studies` (new-products) | case cover: OctiFi | product shot | OctiFi's mobile lending flow: onboarding and loans across two markets. | 16:9 master |
| `/case-studies` (established-products); `/case-studies/benchmark-gensuite-…` (related) | case cover: Gold Image Printing | product shot | Gold Image Printing's online ordering site and internal production system shown as one product. | 16:9 master (3:2 thumbnail and pair crops) |
| `/case-studies` (established-products) | case cover: Ryzeo | product shot | Ryzeo's marketing automation platform, at the part research decided to fix first. | 16:9 master (3:2 thumbnail crop) |
| `/case-studies` (established-products); `/services/product-design` (complex-products) | case cover: Scissors | product shot | Scissors' staffing software: clients, candidates and jobs connected in one model, so details entered once carry through. | 16:9 master (3:2 thumbnail crop) |
| `/case-studies` (ai-products); `/about` (work-you-can-inspect) | case cover: Omny AI | product shot | Omny AI: AI suggestions held separate from the final listing until a person accepts them. | 16:9 master |
| `/case-studies` (designed-and-built) | case cover: The Wandering Raven | product shot | The Wandering Raven's creative-writing learning world for young learners, built inside Moodle. | 16:9 master (4:5 crop for the story split) |
