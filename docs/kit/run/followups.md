# Follow-ups to verify after merge
- hero: PageHero must not import ILLUSTRATION_LEGENDS from @/lib (content seam); picture/cut art direction belongs in Media; HeroAnnouncement in barrels.
- form: Input .control.line:disabled must clear invalid box-shadow; EnquiryNextStep in barrels; enquiry-form specimen numbered/full/sent on all surfaces. Owner Q7: contact form pairs fields in two columns (reopened).
- logos: 5-track grid only from xl (1024-1130 squeeze); owner Q: ClientMark sizes step below 768.
- main checkout: audit-component SKILL.md fix uncommitted.
- ALL kit/* specimen pages: check for nested <main> (layout.tsx already renders main) — kit/process and kit/readdown confirmed; return fragments.
- ServicePage/Blocks.tsx Fit duplicates Contrast until cmp-service-pages swaps it.
- Owner Q: accept the short-form kit specs (Banner, Statement, Stat, Contrast) or require full template?
- CONFIRMED STILL OPEN after merge fe5ef15: PageHero.tsx:16/527 imports ILLUSTRATION_LEGENDS (content-seam break) and :754 inlines <picture> art direction (belongs in Media); HeroAnnouncement not in barrels. Fix after the run (invisible in review; architectural).
