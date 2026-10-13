import type { IdealAboutPage } from '../../../types';

/**
 * IDEAL CONTENT — the About page with its copy cut to what a reader will take in (owner, 12 Oct 2026:
 * "a person would most likely not read a section with 5 paragraphs of text … design an ideal version
 * of the about page by optimizing the content lengths").
 *
 * Not a source. The live /about renders the `_pages/` corpus verbatim; this is the worked example of
 * the same page edited for LENGTH (owner, 12 Oct 2026: "optimize length and not change the narrative
 * or structure"). Every section of the corpus is here, in its order, under its own heading, with its
 * own items; each is cut to a sentence or two per paragraph. Facts (dates, counts, names, services,
 * clients, engagement models) and client quotes are the corpus's, unchanged. Rendered at
 * /design/about-ideal.
 *
 * Proposed copy for the content team, not approved copy.
 */
export const idealAbout: IdealAboutPage = {
  hero: {
    eyebrow: 'About Tcules',
    title:
      'Tcules is a digital product design studio shaped in Ahmedabad, creating software products for businesses across the world.',
    lede: 'For generations, Ahmedabad has turned ideas into things people live with. NID and CEPT helped establish modern design education in India here, and today they sit in a much broader design ecosystem.',
    stats: [
      { value: '2017', label: 'Founded' },
      { value: '90+', label: 'Projects' },
      { value: '19', label: 'Countries with clients' },
    ],
  },

  studio: {
    founding:
      'Tcules was founded here in 2017 by Jatin Leuva and Rakesh Chitroda. Since then we have worked on more than 90 projects across 19 countries.',
    centre: 'Product Design sits at the centre of the studio.',
    meaning:
      'Understanding people and systems well enough to make better product decisions, giving complicated ideas useful form, and carrying those decisions through to software that works.',
  },

  ahmedabad: {
    heading: 'Ahmedabad is part of how we work',
    paragraphs: [
      'Tcules worked remotely for its first five and a half years. In 2022 we opened our Ahmedabad studio and brought the team together.',
      'Working in one place lets designers and engineers share context, inspect the same product and own the quality of the whole.',
      'It also means talented people can build a career in Ahmedabad doing product work that reaches far beyond it.',
    ],
  },

  services: {
    heading: 'What Tcules does',
    lead: 'Six services with one discipline at the centre: Product Design.',
    items: [
      {
        title: 'Product Design',
        body: 'Research, product modelling, workflows, interaction and interface design: clarity about what the product should do and how it should behave.',
        href: '/services/product-design',
        label: 'Explore Product Design',
      },
      {
        title: 'Product Modernisation',
        body: 'Move established software forward without losing the knowledge and behaviours that still matter.',
        href: '/services/product-modernisation',
        label: 'Explore Product Modernisation',
      },
      {
        title: 'Design Systems',
        body: 'Turn repeated design decisions into a system connected to the product, from foundations to governance and adoption.',
        href: '/services/design-systems',
        label: 'Explore Design Systems',
      },
      {
        title: 'AI Product UX',
        body: 'Design how intelligent products recommend, ask for authority, act, show evidence and hand control back to people.',
        href: '/services/ai-product-ux',
        label: 'Explore AI Product UX',
      },
      {
        title: 'Design Engineering',
        body: 'Prototypes, frontend code and design-system implementation that shorten the distance between design intent and what ships.',
        href: '/services/design-engineering',
        label: 'Explore Design Engineering',
      },
      {
        title: 'Software Development',
        body: 'Frontend, backend, integrations, AI engineering, testing and release, when the product needs broader ownership.',
        href: '/services/software-development',
        label: 'Explore Software Development',
      },
    ],
  },

  practice: {
    heading: 'The practice keeps moving',
    lead: 'Product Design remains the centre. The capabilities and methods around it keep evolving with technology, products and our clients.',
    items: [
      {
        title: 'The products are changing.',
        body: 'Software is becoming more intelligent and able to act for people. We have worked across AI-native products, copilots and AI features, and into agentic software.',
      },
      {
        title: 'So is the practice.',
        body: 'Not new tools on an old process: learning where machines do useful work, where people need visibility and control, and where human judgement matters more.',
      },
    ],
  },

  who: {
    heading: 'Who Tcules works best with',
    lead: 'Three situations recur.',
    items: [
      {
        voice: 'Growth-stage and post-PMF SaaS teams',
        reply: 'Complex workflows, accumulated design debt, or a roadmap that needs stronger design ownership.',
      },
      {
        voice: 'Established software companies',
        reply: 'Modernising products, strengthening systems or bringing AI into consequential workflows.',
      },
      {
        voice: 'Founders building new software',
        reply: 'The opportunity is real; the product model and the first release still need working out.',
      },
    ],
    note: 'The common thread is not company size. It is a product decision that deserves experienced design attention.',
  },

  difference: {
    heading: 'What makes the practice different',
    items: [
      {
        title: 'Product Design is the centre, not a stage.',
        body: 'Research, modelling, workflows, interface, prototyping, Design Systems and implementation decisions belong to one responsibility: making and keeping good product decisions.',
      },
      {
        title: 'Complex software is treated as a design material.',
        body: 'Roles, rules, states, exceptions and habits are worked through, not simplified away, in a mature SaaS product, a new platform or an AI product.',
      },
      {
        title: 'Senior judgement stays close to the work.',
        body: 'The people shaping the direction stay involved, and you work with them directly. Specialists join when a problem needs them.',
      },
      {
        title: 'Design and engineering can stay connected.',
        body: 'Design and code in one practice, so decisions survive the journey from the design file to the working product.',
      },
      {
        title: 'AI is changing both sides of our work.',
        body: 'We design products that use AI, and use AI to practise Product Design: deciding where it helps, where it adds risk and where a person makes the call.',
      },
    ],
    link: { label: 'How AI-native Product Design works at Tcules', href: '/how-we-work/ai-native-product-design' },
  },

  how: {
    heading: 'How Tcules works',
    items: [
      {
        title: 'Start where the uncertainty is.',
        body: 'An audit, one difficult workflow or a defined problem, and stop there if that is all you need.',
      },
      {
        title: 'Work with the people doing the work.',
        body: 'No account-management layer. A lead designer is your main contact; specialists join when needed.',
      },
      {
        title: 'Work inside your product environment.',
        body: 'Your tools, Design System, codebase and review rhythm, not a separate agency process.',
      },
      {
        title: 'Stay connected across time zones.',
        body: 'Working hours agreed for each engagement, for real overlap with your team.',
      },
      {
        title: 'Match the commercial shape to the work.',
        body: 'Fixed-price audits, fixed-scope projects or a monthly partnership.',
      },
    ],
  },

  people: {
    heading: 'The people behind the studio',
    leaders: [
      {
        name: 'Jatin Leuva',
        role: 'Founder & CEO',
        bio: 'Leads product and practice direction. Focused on Product Design for complex software, where design meets implementation, and how AI changes both.',
        linkedin: { label: 'Follow Jatin on LinkedIn', href: 'https://in.linkedin.com/in/jatinuva' },
        portrait: 'jatin-leuva',
      },
      {
        name: 'Rakesh Chitroda',
        role: 'Co-founder and commercial lead',
        bio: 'Leads the commercial side, working with founders and product teams to find where the studio can make the most meaningful contribution.',
        linkedin: { label: 'Follow Rakesh on LinkedIn', href: 'https://www.linkedin.com/in/rakeshchitroda' },
        portrait: 'rakesh-chitroda',
      },
    ],
    follow: {
      body: 'The wider studio brings designers and engineers together in Ahmedabad around the products they are responsible for.',
      link: { label: 'Follow Tcules on LinkedIn', href: 'https://www.linkedin.com/company/tcules' },
    },
  },

  work: {
    heading: 'See the practice in the work',
    cases: [
      { name: 'Doodle', body: 'Research changing the underlying product model for enterprise scheduling.' },
      { name: 'Benchmark Gensuite', body: 'Modernisation balancing new expectations with established habits.' },
      { name: 'Omny AI', body: 'AI behaviour redesigned around deliberate human choice.' },
      { name: 'GT Tools', body: 'Product Design carried through implementation, not ending at hand-off.' },
    ],
    all: { label: 'Explore all case studies', href: '/case-studies' },
    lab: {
      heading: 'Future Interfaces Lab',
      lead: 'Where we explore emerging product behaviours and new ways of practising Product Design.',
      link: { label: 'Visit the Lab', href: '/future-interfaces-lab' },
    },
  },

  testimonials: {
    heading: 'What clients say',
    items: [
      {
        id: 'FP-EDEN-USERS',
        quoteHtml:
          '<p>Our users gave us great feedback about the new design, and they came forward and told us without us asking for it.</p>',
        name: 'Samy Melaine',
        role: 'Founder & CPTO',
        company: 'Eden AI',
      },
      {
        id: 'CL-RINGIER-COLLAB',
        quoteHtml:
          '<p>It was simply the most successful long-distance 3rd party collaboration I have seen. The company is on eye-level or above for the services they offer. Their staff were really good.</p>',
        name: 'Roland Sailer',
        role: 'Director of Product',
        company: 'Ringier Media Switzerland',
      },
      {
        id: 'UW-JOVE-INTEGRATION',
        quoteHtml:
          '<p>The Tcules team integrated well with our internal PMs and designers, contributing meaningfully to high-fidelity design deliverables that most often met our product standards.</p>',
        name: 'Dhanur Aashray Majety',
        role: 'Director, Product Management',
        company: 'JoVE',
      },
    ],
  },

  record: {
    heading: 'Tcules at a glance',
    rows: [
      ['Company', 'Tcules UX Private Limited'],
      ['Category', 'Digital product design studio'],
      ['Founded', '2017'],
      ['Founders', 'Jatin Leuva and Rakesh Chitroda'],
      ['Studio', 'Ahmedabad, India'],
      ['Core practice', 'Product Design'],
      ['Services', 'Product Design, Product Modernisation, Design Systems, AI Product UX, Design Engineering, Software Development'],
      ['Projects', 'More than 90'],
      ['Client reach', '19 countries'],
      ['Typical clients', 'Growth-stage SaaS teams, established software companies, founders building new software'],
      ['Selected clients', 'Doodle, Eden AI, Dealpath, Omny AI, Benchmark Gensuite, Knovos, Primelis, GT Tools'],
      ['Engagements', 'Fixed-price audits, fixed-scope projects, monthly partnerships'],
      ['Working model', 'Ahmedabad studio, working directly with product teams across time zones'],
      ['Collaboration', 'A lead designer as your main contact; specialists join as needed'],
      ['Website', 'tcules.com'],
      ['LinkedIn', 'linkedin.com/company/tcules'],
    ],
  },

  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Can Tcules work alongside our existing team?',
        answerHtml:
          '<p>Yes. We can own a defined product problem or join your team where more Product Design judgement is needed, inside your tools, Design System and codebase.</p>',
      },
      {
        question: 'Does Tcules only work with SaaS companies?',
        answerHtml:
          '<p>No. We have also worked on consumer products, marketplaces and operational platforms across FinTech, PropTech, HealthTech and EdTech. Product complexity predicts fit better than business model.</p>',
      },
      {
        question: 'Can you build products as well as design them?',
        answerHtml:
          '<p>Yes. Design Engineering takes the work into frontend code, and Software Development can carry it through backend, integrations, AI engineering, testing and release.</p>',
      },
      {
        question: 'How does an engagement usually begin?',
        answerHtml:
          '<p>Where the product needs clarity: an audit, one difficult workflow, research or a defined build. A bounded engagement does not have to become a larger one.</p>',
      },
      {
        question: 'Can you work with teams outside India?',
        answerHtml:
          '<p>Yes. We have worked with clients in 19 countries and agree working hours for each engagement so there is real overlap.</p>',
      },
      {
        question: 'What does an AI-native Product Design practice mean?',
        answerHtml:
          '<p>AI takes part in both the products we design and how we design them, from research and synthesis to implementation and verification.</p>',
      },
      {
        question: 'Why is Tcules based in Ahmedabad?',
        answerHtml:
          '<p>A deep design inheritance, strong design schools, an entrepreneurial culture and emerging talent, and a place where designers and engineers can build careers while working on products across the world.</p>',
      },
      {
        question: 'What is it like to work at Tcules?',
        answerHtml:
          '<p>An on-site product studio where people understand the product, question assumptions, critique work and take growing responsibility for the result.</p>',
      },
      {
        question: 'What does Tcules look for when hiring?',
        answerHtml:
          '<p>The ability to observe, reason, communicate, learn and make. As AI takes on routine production, framing problems and staying accountable for outcomes matter more.</p>',
      },
    ],
  },

  coda: {
    eyebrow: 'What remains constant',
    text: 'Software is our material. Ahmedabad is where the practice took shape. The world is where the work goes.',
  },

  cta: {
    heading: 'Work with Tcules',
    body: 'Creating a new product, modernising established software or working through a consequential AI problem? Tell us what is changing.',
    action: { label: 'Start a conversation', href: '/contact' },
  },

  careers: {
    heading: 'Build your career here',
    lead: 'Practise Product Design, Design Engineering or software development where the work and the people keep evolving.',
    action: { label: 'Explore careers at Tcules', href: '/careers' },
  },
};
