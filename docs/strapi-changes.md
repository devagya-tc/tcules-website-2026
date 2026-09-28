# Strapi changes — recommendations for the CMS owner

Added to as the frontend work finds them (tracker 0.5). These are recommendations. We don't do the
Strapi work: each entry says what the frontend needs and why, and leaves the schema to the CMS owner.

Each entry: **what** · **why** · **found in** (task or component).

---

## 1. Components mirror Strapi one-to-one on content, never on layout

**What.** Each semantic section in Strapi (Situation, Capability set, Mechanism, Proof, FAQ, Related,
Enquiry) should have exactly the fields of the frontend component's **content props**, with the
same names and the same shapes: heading, lead, items, the proof relations. Editors pick a component,
fill in its fields, and it renders. No translation layer in between.

**Presentation props stay in code and never become Strapi fields.** That covers arrangement,
`imageSide`, orientation, density, surface and column counts. Where content meaning changes the
rendering (ordered vs unordered, featured vs standard, proof type), a semantic variant field is fine.

**Why.** Mirroring content removes the mapping layer, so a Strapi remodel no longer means changing
code. Keeping presentation out follows the handoff's boundary rule ("do not store layout
instructions in Strapi") and lets the design change without a CMS migration. The test for any field
is: *does it change what the section says, or only how it looks?* Only the first goes in Strapi.

**Found in.** 24 Sep call; tracker 3.1.

