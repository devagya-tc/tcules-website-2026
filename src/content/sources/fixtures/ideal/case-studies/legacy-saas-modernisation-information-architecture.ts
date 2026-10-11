import type { CaseStory } from '../../../../types';

/**
 * IDEAL RENDERING — the Benchmark Gensuite case as Strapi holds it today, copied locally and
 * structured so it can be designed (owner, 11 Oct 2026: "make a local copy of the content and then
 * design it in a nice way so we have the actual rendering of how it should be ideally").
 *
 * Every word is the CMS's, copied from the live entry on 11 Oct 2026. What changed is STRUCTURE only:
 * the body's rich text is split into the parts its formatting implied — a chapter's "01 / THE
 * OPPORTUNITY" label, its paragraphs, a blockquote with its bold attribution, a "Label: text" list,
 * the bold "PRODUCT PRINCIPLE:" line, and each figure with its italic caption and numbered notes.
 * Labels authored in capitals (COMPANY, BENCHMARK TECHNICAL LEADERSHIP) are kept in sentence case,
 * because the capitals were presentation and the mono voice applies them again.
 *
 * Images point at the CMS's own Cloudinary assets. The model is `CaseStory` (@/content types),
 * which doubles as the recommendation for how Strapi should model a case body.
 */
export const benchmarkGensuite: CaseStory = {
  "slug": "legacy-saas-modernisation-information-architecture",
  "title": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite.",
  "description": "Modernising a large enterprise suite is a design-systems problem, not a collection of isolated redesigns.",
  "publishedAt": "2026-08-18T07:29:26.478Z",
  "heroImage": {
    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788440931/bm_hero_8f488b0e82.webp",
    "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — hero image",
    "width": 12641,
    "height": 7114,
    "kind": "capture",
    "sources": [
      {
        "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788440931/thumbnail_bm_hero_8f488b0e82.webp",
        "width": 245
      },
      {
        "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788440932/small_bm_hero_8f488b0e82.webp",
        "width": 500
      },
      {
        "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788440932/medium_bm_hero_8f488b0e82.webp",
        "width": 750
      },
      {
        "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788440932/large_bm_hero_8f488b0e82.webp",
        "width": 1000
      }
    ],
    "mime": "image/webp"
  },
  "profile": [
    {
      "id": "846",
      "label": "Company",
      "value": "Benchmark Gensuite"
    },
    {
      "id": "847",
      "label": "Sector",
      "value": "Enterprise EHS, sustainability and operational-risk software"
    },
    {
      "id": "848",
      "label": "The work",
      "value": "Enterprise UX modernisation and scope selector experience redesign."
    }
  ],
  "categories": [
    "Modernise & Replatform"
  ],
  "tags": [
    "Design System",
    "Information Design",
    "High Fidelity Prototypes",
    "SaaS"
  ],
  "statements": [
    {
      "id": "478",
      "title": "Problem",
      "body": "Benchmark needed to modernise the user experience while preserving the established workflows existing customers relied on."
    },
    {
      "id": "479",
      "title": "Solution",
      "body": "We tested the shared foundation in a high-reuse feature and identified opportunities to refine the scope selector's interaction model beyond a visual refresh."
    }
  ],
  "chapters": [
    {
      "id": "chapter-01",
      "number": "01",
      "label": "The opportunity",
      "heading": "Balancing familiarity with expectations for a modern experience",
      "parts": [
        {
          "type": "paragraphs",
          "paragraphs": [
            "Existing customers valued familiarity. Prospective customers brought evolving expectations for modern enterprise software experiences.",
            "Benchmark needed to improve the experience while preserving the familiarity and workflows valued by existing customers. The request was measured: move the front end towards a newer framework, improve the look and feel, and create visible progress without turning recognition into retraining.",
            "Familiarity was not resistance to change. It was part of how customers completed important work efficiently."
          ]
        },
        {
          "type": "quote",
          "quote": "For established users, familiarity and consistency are important parts of efficient workflows.",
          "attribution": "Benchmark technical leadership"
        }
      ]
    },
    {
      "id": "chapter-02",
      "number": "02",
      "label": "The constraint",
      "heading": "One product that could not stop while it changed",
      "parts": [
        {
          "type": "paragraphs",
          "paragraphs": [
            "Benchmark could not pause a shared enterprise platform for a screen-by-screen redesign. Isolated improvements would not deliver the desired consistency across the broader experience.",
            "The work therefore began at the shared layer and moved into one high-use feature."
          ]
        },
        {
          "type": "steps",
            "ordered": true,
          "items": [
            {
              "label": "Stabilise",
              "body": "resolve reusable components and their states."
            },
            {
              "label": "Apply",
              "body": "assemble those foundations inside a real product workflow."
            },
            {
              "label": "Evaluate",
              "body": "distinguish visual opportunities from interaction-model opportunities."
            },
            {
              "label": "Refine",
              "body": "focus investment where research indicates the greatest user and product value."
            }
          ]
        },
        {
          "type": "principle",
          "label": "Product principle",
          "text": "Effective modernisation goes beyond visual updates to consider the complete interaction experience."
        }
      ]
    },
    {
      "id": "chapter-03",
      "number": "03",
      "label": "The UX findings",
      "heading": "Clarifying the interaction model",
      "parts": [
        {
          "type": "paragraphs",
          "paragraphs": [
            "The first pass modernised the components and preserved the existing model. That exercise was useful because the next opportunity for improvement became clearer.",
            "Search, archive controls and navigation each had a useful role, but the interface could communicate their scope and behaviour with greater consistency. Search appeared in places where its boundary could be more explicit. Archive controls appeared in more than one area and could be unified. Nearby sites introduced a location-based way of finding the right scope, while the hierarchy supported browsing through the organisation."
          ]
        },
        {
          "type": "figures",
          "figures": [
            {
              "id": "figure-1",
              "image": {
                "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/benchmark_04_search_boundary_704697aae5.png",
                "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — project image 6",
                "width": 1600,
                "height": 484,
                "kind": "capture",
                "sources": [
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/thumbnail_benchmark_04_search_boundary_704697aae5.png",
                    "width": 245
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/small_benchmark_04_search_boundary_704697aae5.png",
                    "width": 500
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/medium_benchmark_04_search_boundary_704697aae5.png",
                    "width": 750
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/large_benchmark_04_search_boundary_704697aae5.png",
                    "width": 1000
                  }
                ],
                "mime": "image/png"
              },
              "label": "Figure 1",
              "caption": "Legacy Scope Selector, “All” view",
              "notes": [
                "Opportunity to more clearly distinguish navigation and filtering",
                "Opportunity to clarify the role of the Custom Group viewing mode"
              ]
            },
            {
              "id": "figure-2",
              "image": {
                "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/benchmark_05_archive_control_3bcd8ec524.png",
                "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — project image 8",
                "width": 1600,
                "height": 484,
                "kind": "capture",
                "sources": [
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/thumbnail_benchmark_05_archive_control_3bcd8ec524.png",
                    "width": 245
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/small_benchmark_05_archive_control_3bcd8ec524.png",
                    "width": 500
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/medium_benchmark_05_archive_control_3bcd8ec524.png",
                    "width": 750
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/large_benchmark_05_archive_control_3bcd8ec524.png",
                    "width": 1000
                  }
                ],
                "mime": "image/png"
              },
              "label": "Figure 2",
              "caption": "Legacy Scope Selector, “My” view",
              "notes": [
                "Opportunity to more clearly distinguish Search Results from the \"My\" view",
                "Search behaviour varies by viewing mode"
              ]
            },
            {
              "id": "figure-3",
              "image": {
                "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788442416/benchmark_03_legacy_scope_selector_aece9e3e17.png",
                "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — project image 10",
                "width": 1600,
                "height": 484,
                "kind": "capture",
                "sources": [
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788442416/thumbnail_benchmark_03_legacy_scope_selector_aece9e3e17.png",
                    "width": 245
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788442416/small_benchmark_03_legacy_scope_selector_aece9e3e17.png",
                    "width": 500
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788442416/medium_benchmark_03_legacy_scope_selector_aece9e3e17.png",
                    "width": 750
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1788442416/large_benchmark_03_legacy_scope_selector_aece9e3e17.png",
                    "width": 1000
                  }
                ],
                "mime": "image/png"
              },
              "label": "Figure 3",
              "caption": "Legacy Scope Selector, “Search Results” on left, “All” view on right",
              "notes": [
                "Opportunity to unify Archived Sites controls and behaviour"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "chapter-04",
      "number": "04",
      "label": "The decision",
      "heading": "Three user needs, supported by three distinct views",
      "parts": [
        {
          "type": "paragraphs",
          "paragraphs": [
            "The selector had to support three user needs. Separating them gave each view a clearer role:"
          ]
        },
        {
          "type": "steps",
          "items": [
            {
              "label": "Browse the organisation",
              "body": "move through the hierarchy and choose the scope of work."
            },
            {
              "label": "Return to recents and favourites",
              "body": "re-enter the parts of the organisation used most often."
            },
            {
              "label": "Find sites nearby",
              "body": "use location rather than hierarchy to identify the relevant site."
            }
          ]
        },
        {
          "type": "paragraphs",
          "paragraphs": [
            "Each view could now clearly communicate the scope of its search. Browse could support hierarchy. Recents and favourites could support return behaviour. Nearby could make location the primary way of finding the relevant site."
          ]
        },
        {
          "type": "figures",
          "figures": [
            {
              "id": "figure-4",
              "image": {
                "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014613/Redesigned_SS_Nav_7427598ce2.png",
                "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — project image 13",
                "width": 3200,
                "height": 968,
                "kind": "capture",
                "sources": [
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/thumbnail_Redesigned_SS_Nav_7427598ce2.png",
                    "width": 245
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/small_Redesigned_SS_Nav_7427598ce2.png",
                    "width": 500
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/medium_Redesigned_SS_Nav_7427598ce2.png",
                    "width": 750
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/large_Redesigned_SS_Nav_7427598ce2.png",
                    "width": 1000
                  }
                ],
                "mime": "image/png"
              },
              "label": "Figure 4",
              "caption": "Redesigned Scope Selector",
              "notes": [
                "Simplified navigation with clearer labels for each user need",
                "Distinct views for Browse, Recents and Favourites, and Nearby"
              ]
            },
            {
              "id": "figure-5",
              "image": {
                "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/Redesigned_SS_Search_d5f5fd2fbf.png",
                "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — project image 15",
                "width": 3200,
                "height": 968,
                "kind": "capture",
                "sources": [
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/thumbnail_Redesigned_SS_Search_d5f5fd2fbf.png",
                    "width": 245
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/small_Redesigned_SS_Search_d5f5fd2fbf.png",
                    "width": 500
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/medium_Redesigned_SS_Search_d5f5fd2fbf.png",
                    "width": 750
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014614/large_Redesigned_SS_Search_d5f5fd2fbf.png",
                    "width": 1000
                  }
                ],
                "mime": "image/png"
              },
              "label": "Figure 5",
              "caption": "Redesigned Scope Selector",
              "notes": [
                "Search behaviour appropriate to each viewing mode"
              ]
            },
            {
              "id": "figure-6",
              "image": {
                "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014615/Redesigned_SS_Archived_c65a408565.png",
                "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — project image 17",
                "width": 3200,
                "height": 1608,
                "kind": "capture",
                "sources": [
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014615/thumbnail_Redesigned_SS_Archived_c65a408565.png",
                    "width": 245
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014615/small_Redesigned_SS_Archived_c65a408565.png",
                    "width": 500
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014615/medium_Redesigned_SS_Archived_c65a408565.png",
                    "width": 750
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1786014615/large_Redesigned_SS_Archived_c65a408565.png",
                    "width": 1000
                  }
                ],
                "mime": "image/png"
              },
              "label": "Figure 6",
              "caption": "Redesigned Scope Selector",
              "notes": [
                "Unified Archived Sites control and behaviour"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "chapter-05",
      "number": "05",
      "label": "Design engineering",
      "heading": "Reviewing behaviour, not pictures",
      "parts": [
        {
          "type": "paragraphs",
          "paragraphs": [
            "Benchmark needed working HTML, CSS and JavaScript so stakeholders could review interaction behaviour and implementation feasibility before broader production decisions. Tcules used coded prototypes to preserve interaction intent and make the design easier to test with the people responsible for taking it forward.",
            "The attachments prototype explored organisation, nested folders, previews, reordering and system states while the direction was still open to review."
          ]
        },
        {
          "type": "quote",
          "quote": "I was curious if you use an external library for the drag and drop because Bootstrap 5 doesn't natively support drag and drop.",
          "attribution": "Benchmark engineering stakeholder"
        }
      ]
    },
    {
      "id": "chapter-06",
      "number": "06",
      "label": "Where it stands",
      "heading": "Validated design direction",
      "parts": [
        {
          "type": "paragraphs",
          "paragraphs": [
            "The work established and validated the design direction and feasibility ahead of broader implementation. It created a component direction for the Bootstrap 5.3 migration target and a selected three-view direction for the scope selector.",
            "The modules had not reached customers when this case was documented. There is no adoption, task-time or commercial outcome to claim yet. Benchmark retained responsibility for implementation across the wider platform. The evidence here is validated design direction and feasibility review ahead of broader implementation."
          ]
        },
        {
          "type": "figures",
          "figures": [
            {
              "id": "figure-7",
              "image": {
                "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/benchmark_07_attachments_prototype_08aedb3f85.png",
                "alt": "Benchmark Gensuite: Evolving the experience across a 75+ application enterprise suite. — project image 23",
                "width": 1600,
                "height": 580,
                "kind": "capture",
                "sources": [
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/thumbnail_benchmark_07_attachments_prototype_08aedb3f85.png",
                    "width": 245
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/small_benchmark_07_attachments_prototype_08aedb3f85.png",
                    "width": 500
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/medium_benchmark_07_attachments_prototype_08aedb3f85.png",
                    "width": 750
                  },
                  {
                    "src": "https://res.cloudinary.com/dbay1gb0s/image/upload/v1785918561/large_benchmark_07_attachments_prototype_08aedb3f85.png",
                    "width": 1000
                  }
                ],
                "mime": "image/png"
              },
              "label": "Figure 7",
              "caption": "Legacy Attachments Modal on left, Redesigned Attachments Modal on right",
              "notes": []
            }
          ]
        }
      ]
    }
  ],
  "closing": {
    "label": "What this proves",
    "heading": "Modernising a mature enterprise platform requires identifying where targeted UX and architectural changes can create the greatest value while preserving the workflows customers depend on.",
    "paragraphs": [
      "A framework upgrade, visual refresh, interaction-model change and design-system programme are different investments. Distinguishing among them helps focus investment where it can deliver the greatest value."
    ]
  },
  "seo": {
    "title": "Benchmark Gensuite enterprise SaaS modernisation case study | Tcules",
    "description": "Benchmark Gensuite needed help moving an ageing front end to Bootstrap 5.3, improving the interface without making customers relearn the platform."
  }
};
