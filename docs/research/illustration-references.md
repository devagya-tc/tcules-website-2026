# Illustration references (owner's picks)

**Collected:** 22 Oct 2026, by the owner, after the six service heroes were re-tested against the acceptance
gates (`docs/decisions/2026-10-22-illustration-acceptance-gates.md`). This file is context for the next round.
It is not a ruling. Where adopting something would change ch05, that change needs its own ruling first.

## The references

| # | Reference | Owner's note | What it is |
|---|---|---|---|
| R1 | [Infrastructure, Rw Studio](https://dribbble.com/shots/27276846-Infrastructure) | "Direct representation of design system" | A design system drawn as a physical device. Three stacked chassis trays, like an exploded small computer. Bottom: loose cubes (primitives). Middle: assembled mechanisms (components). Top: controls, swatches and an "Aa" tile (the interface). One green accent recurs on every tray. |
| R2 | [Business isometric illustration set, Graphics4u (UI8)](https://ui8.net/graphics4u/products/isometric-illustration-set) | "Clearly indicates finance" | Recognisable objects from the domain: a phone with a balance, a card on a dock, a calculator, progress cubes. The objects are joined by cables. 30/60 isometric. |
| R3 | [Integr website, Plainthing Studio](https://dribbble.com/shots/26327015-Integr-Website-Animation) | "Uses the same basis for drawing various concepts" | One drawing system across a whole site. The same square platform, checker inset, cables and small satellite objects appear every time, with a different central machine per concept: a scroll for streaming, a spinning stack for transformation, a lock for security. |
| R4 | Owner's screenshot, source not recorded. MLOps / DevOps layer stacks | "Quality and cleanliness of the illustration" | Two exploded stacks, each held in a base tray. The layer names are tabs built into the layers' edges, dashed verticals run at the corners, and cards with icons sit on each layer. Drawn in one tonal blue ramp, with a thin dark outline. |
| R5 | Owner's screenshot, source not recorded. Green terraced tower | "Parts of the same piece, a new perspective on how we can draw ours" | One assembled object instead of an exploded stack. A terraced base with bars rising from it, and two cards (profile, image) leaning against its sides. |
| R6 | Owner's screenshot, source not recorded. Agency process line | "Process as a production line (metaphorical)" | Five machines on one platform, linked by a U-shaped conveyor that carries sheets: brief taker, task setter, idea station, processor, projector. |

R1 and R3 were viewed from their pages, and R2 from the owner's screenshot. The images are not stored in the
repo, because they are third-party work.

## What we can adopt

1. **Draw the subject as an object, not a diagram (R1, R2, R5).** Every reference is recognisable as its
   subject before it is understood: a device, a card, a calculator, a machine. Our heroes are abstract planes
   and panels, so a stranger can't tell what they are about. The gates test the *change* and never the
   *subject*. Gate 7 should require the stranger to name both. This needs a ruling.
2. **One base, a centrepiece per concept (R3).** A shared platform and vocabulary across all six heroes, with a
   different central machine per service carrying that service's event. The set reads as one family, and gate 8
   (its own silhouette) is met by the centrepiece rather than by inventing a new construction each time.
3. **Labels built into the object (R4).** A tab on the layer's edge instead of a leader line to the side. This
   is the fix for the "floor directory" problem in the Design Systems round-5 label mocks.
4. **The process as a line the item travels along (R6).** It makes gates 1 and 5 literal: the item goes in as
   one thing and comes out as another, on a belt everyone already reads. A U-shaped belt keeps the
   composition roughly square, within the aspect limit.
5. **Assemble rather than explode (R5).** One built object, with its parts attached to its sides, as an
   alternative to the exploded stack, which gate 8 reserves for the Intent Stack.
6. **Craft (R4, R5).**
   - A thin dark outline with two flat tones (top and side).
   - One hue ramp plus one accent.
   - A few large, simple masses, with detail concentrated at the one focal point.
   - Plenty of empty space.

   ch05 already has the light from the upper right and the one accent. What the references add is the
   discipline of large masses and one focal point, which is gate 4 seen as craft.

## Where the references conflict with ch05

Adopting any of these needs an owner ruling and then `/dbf-update 05`. Nothing below is adopted yet.

| ch05 today (§4a) | The references | Notes |
|---|---|---|
| Planes are flat with no thickness, except the plinth, the item and the cylinder | Trays, casings and devices all have thickness (R1, R3, R4, R5) | This is the biggest difference, and most of what makes R1 and R4 feel tangible |
| Square corners, with curves only where they are the form | Rounded corners throughout (R1, R4, R5) | |
| Line-led: filled area must not exceed open area | Tonal fills cover most of the surface (R4, R5) | |
| No prose or type inside the image, annotation only | Type set on the object: R1's "Aa", R4's tab labels | R4's tabs are annotation in function but sit on the object |
| No numbers unless the quantity is the subject | Numbered stations (R6), amounts and percentages (R2) | Keep ch05's rule; don't adopt this |
| Projection is 2:1 (26.57°) | R2 is true 30° | Keep ours |
| | Clichéd props, such as R6's light bulb | Avoid. A prop has to mean something specific (gates 2 and 6) |

## For Design Systems specifically

R1 is the owner's "direct representation of design system". It is recognisable, but it has no event: it is a
definition (primitives, components, interface), so it fails gate 1 as it stands. What it offers is the
*object*: a design system you could hold, whose levels are visible in what each tray contains. A concept that
keeps R1's object and gives it an event passes both tests. For example, many teams' loose, unequal parts go in,
and one assembled answer comes out, on R6's line or R3's platform.
