"""The ten Sketch scenes redrawn to the six rules, on the 320 x 180 drawing.

The grid: the plate's dots sit at 10 + 20k on both axes. Nodes, ports, turns and line ends go there.
Weights: 1 for every outline and construction line, 2 for copy and the subject route, 2.5 for an
object that floats above the surface (with a flat offset under it). Dash 6 4. Corners: 8 for a
screen, 4 inside, pills stay pills; one turn radius, 6, for every route.
"""
import json, math, os

G = json.load(open(os.path.join(os.path.dirname(__file__), 'glyphs.json')))
R = 6          # the one turn radius
MONO_W = 0.68  # Geist Mono advance + 0.08em tracking, per em


def tw(text, size):
    return len(text) * size * MONO_W


def rect(x, y, w, h, rx, cls):
    return f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}"/>'


def path(d, cls):
    return f'<path class="{cls}" d="{d}"/>'


def circle(cx, cy, r, cls):
    return f'<circle class="{cls}" cx="{cx}" cy="{cy}" r="{r}"/>'


TEXT = False  # round 2 (owner, 25 Oct): the words made the drawings read as diagrams


def label(x, y, text, cls='lab', anchor='start', size=7):
    if not TEXT:
        return ''
    return (f'<text class="{cls}" x="{x}" y="{y}" font-size="{size}" '
            f'text-anchor="{anchor}">{text}</text>')


def code(x, y, text, size=7.5):
    if not TEXT:
        return path(f'M{x},{y - 2.6} L{x + 50},{y - 2.6}', 'l')
    return f'<text class="code" x="{x}" y="{y}" font-size="{size}">{text}</text>'


def glyph(name, cx, cy, size, cls):
    s = size / 24
    ps = ''.join(f'<path d="{d}"/>' for d in G[name])
    return (f'<g class="{cls}" transform="translate({cx - size / 2},{cy - size / 2}) '
            f'scale({s})">{ps}</g>')


def tab(fx, fy, text, cls='f', lab='lab'):
    """A folder tab on a frame's top edge at x = fx: its label in mono, the seam under it open."""
    if not TEXT:
        return ''
    w = tw(text, 7) + 12
    h = 12
    d = (f'M{fx},{fy} L{fx},{fy - h + 4} A4,4 0 0 1 {fx + 4},{fy - h} '
         f'L{fx + w - 4},{fy - h} A4,4 0 0 1 {fx + w},{fy - h + 4} L{fx + w},{fy}')
    seam = '' if cls == 'd' else f'<rect class="seam" x="{fx + 0.5}" y="{fy - 1}" width="{w - 1}" height="2"/>'
    return (f'<path class="tab {cls}" d="{d}"/>{seam}'
            + label(fx + 6, fy - 3.5, text, lab))


def route(pts, cls='l', r=R):
    """An orthogonal route through pts, every turn a true quarter arc of radius r."""
    d = f'M{pts[0][0]},{pts[0][1]}'
    for i in range(1, len(pts) - 1):
        (x0, y0), (x1, y1), (x2, y2) = pts[i - 1], pts[i], pts[i + 1]
        ax, ay = (x1 - x0), (y1 - y0)
        bx, by = (x2 - x1), (y2 - y1)
        la, lb = math.hypot(ax, ay), math.hypot(bx, by)
        ux, uy, vx, vy = ax / la, ay / la, bx / lb, by / lb
        sweep = 1 if ux * vy - uy * vx > 0 else 0
        d += f' L{x1 - ux * r:g},{y1 - uy * r:g} A{r},{r} 0 0 {sweep} {x1 + vx * r:g},{y1 + vy * r:g}'
    d += f' L{pts[-1][0]},{pts[-1][1]}'
    return path(d, cls)


def arrow(x, y, dir, cls='ah'):
    """The one arrowhead: a filled triangle, tip at (x, y), 7 long, 8 wide."""
    dx, dy = {'r': (1, 0), 'l': (-1, 0), 'u': (0, -1), 'd': (0, 1)}[dir]
    bx, by = x - dx * 7, y - dy * 7
    px, py = -dy * 4, dx * 4
    return f'<path class="{cls}" d="M{x},{y} L{bx + px:g},{by + py:g} L{bx - px:g},{by - py:g} Z"/>'


def port(x, y):
    return circle(x, y, 2.5, 'port')


def ring(x, y):
    return circle(x, y, 3, 'ring')


def pill(cx, cy, text, cls='pill', lab='lab-a', size=7):
    if not TEXT:
        return ''
    w = tw(text, size) + 10
    return (rect(cx - w / 2, cy - 6, w, 12, 6, cls)
            + label(cx, cy + 2.5, text, lab, 'middle', size))


def lifted(shape_fn, dx=3, dy=3):
    """A floating object: its own silhouette under it, offset flat, then the object."""
    return f'<g transform="translate({dx},{dy})" class="lift-shadow">{shape_fn(True)}</g>{shape_fn(False)}'


S = {}

# ── new-product: the whole product dashed, its first release built solid, the launch lit ──────────
S['new-product'] = ''.join([
    rect(30, 30, 200, 120, 8, 'd'),
    tab(40, 30, 'PRODUCT', 'd', 'lab-q'),
    rect(50, 50, 80, 80, 4, 'r'),
    label(62, 66, 'V1', 'lab-a'),
    path('M62,82 L114,82', 'c'), path('M62,94 L100,94', 'c'),
    rect(62, 108, 36, 12, 6, 's'),
    rect(150, 50, 60, 20, 4, 'd'),
    rect(150, 110, 60, 20, 4, 'd'),
    route([(130, 90), (258, 90)]),
    port(130, 90), ring(230, 90),
    circle(270, 90, 18, 'halo'), circle(270, 90, 11, 's'),
    glyph('flag', 270, 90, 12, 'g-on'),
    label(270, 124, 'LAUNCH', 'lab', 'middle'),
])

# ── product-design: a screen whose one flow is drawn through it, the decision lit ──────────────────
S['product-design'] = ''.join([
    rect(50, 30, 220, 120, 8, 'f'),
    tab(60, 30, 'FLOW'),
    rect(70, 80, 40, 20, 4, 'f'), path('M80,90 L100,90', 'c'),
    route([(110, 90), (139, 90)]),
    port(110, 90),
    circle(150, 90, 18, 'halo'),
    path('M150,78 L162,90 L150,102 L138,90 Z', 's'),
    route([(162, 90), (180, 90), (180, 70), (210, 70)]),
    route([(162, 90), (180, 90), (180, 110), (210, 110)]),
    arrow(210, 70, 'r'), arrow(210, 110, 'r'),
    label(196, 65, 'YES', 'lab', 'middle'), label(196, 105, 'NO', 'lab', 'middle'),
    rect(210, 60, 40, 20, 4, 'f'), path('M220,70 L240,70', 'c'),
    rect(210, 100, 40, 20, 4, 'f'), path('M220,110 L234,110', 'c'),
])

# ── product-modernisation: the cluttered screen, then the same screen clean ───────────────────────
clutter = ''.join([
    path('M44,50 L96,50', 'cq'), rect(102, 45, 16, 10, 2, 'q'),
    path('M44,62 L118,62', 'cq'),
    rect(44, 70, 34, 14, 2, 'q'), path('M84,77 L116,77', 'cq'),
    path('M50,92 L104,92', 'cq'), path('M44,102 L112,102', 'cq'),
    rect(60, 110, 54, 12, 2, 'q'), path('M44,130 L74,130', 'cq'), path('M82,130 L108,130', 'cq'),
])
S['product-modernisation'] = ''.join([
    rect(30, 30, 100, 120, 8, 'q'),
    tab(40, 30, 'BEFORE', 'q', 'lab-q'),
    clutter,
    route([(130, 90), (190, 90)]),
    arrow(190, 90, 'r'),
    port(130, 90),
    pill(160, 90, 'REBUILD', 'pill', size=6),
    rect(190, 30, 100, 120, 8, 'f'),
    tab(200, 30, 'AFTER'),
    path('M210,50 L250,50', 'c'),
    rect(210, 70, 60, 20, 4, 'r'),
    rect(210, 110, 26, 20, 4, 'q'), rect(244, 110, 26, 20, 4, 'q'),
])

# ── design-systems: a set of components, one placed into a screen ─────────────────────────────────
def cell(x, y, inner, cls='q'):
    return rect(x, y, 40, 24, 4, cls) + inner


lib = ''.join([
    cell(40, 38, rect(48, 44, 24, 12, 6, 'q2')),                                  # button (ghost)
    cell(100, 38, rect(108, 44, 22, 12, 6, 'q2') + circle(124, 50, 4, 'knob')),     # toggle
    cell(40, 78, rect(46, 84, 28, 12, 3, 'q2') + path('M51,87 L51,93', 'cq1')),     # input
    cell(100, 78, rect(106, 86, 8, 8, 2, 'q2') + path('M118,90 L132,90', 'cq')),    # checkbox
    cell(40, 118, circle(52, 130, 5, 'q2') + path('M62,130 L72,130', 'cq')),        # avatar
    cell(100, 118, rect(108, 124, 24, 12, 6, 's'), 'r'),                           # the button
])
S['design-systems'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    tab(40, 30, 'COMPONENTS'),
    lib,
    route([(140, 130), (170, 130), (170, 90), (190, 90)]),
    rect(190, 30, 100, 120, 8, 'f'),
    tab(200, 30, 'SCREEN'),
    port(140, 130), ring(190, 90),
    path('M210,50 L262,50', 'c'), path('M210,62 L246,62', 'c'),
    rect(210, 84, 40, 12, 6, 's'),
    path('M210,116 L270,116', 'cq'), path('M210,128 L250,128', 'cq'),
])

# ── ai-product-ux: a suggestion with the person's accept, the AI's mark in its head ───────────────
def cursor(shadow):
    d = 'M0,0 L0,17 L4.6,12.9 L7.6,19.6 L10.6,18.3 L7.7,11.7 L13.6,11.7 Z'
    return f'<path class="{"lift-s" if shadow else "lift"}" d="{d}" transform="translate(141,113)"/>'


S['ai-product-ux'] = ''.join([
    rect(70, 30, 180, 120, 8, 'f'),
    glyph('stars', 90, 50, 12, 'g-a'),
    label(102, 52.5, 'SUGGESTION', 'lab-a'),
    '' if TEXT else path('M104,50 L150,50', 'c'),
    path('M90,74 L210,74', 'c'), path('M90,86 L186,86', 'c'),
    rect(90, 104, 58, 16, 8, 's'), label(119, 114.5, 'ACCEPT', 'lab-on', 'middle'),
    rect(156, 104, 62, 16, 8, 'q'), label(187, 114.5, 'DISMISS', 'lab-q', 'middle'),
    lifted(cursor, 2, 2),
])

# ── design-engineering: the design and its code side by side, one component shared ───────────────
code_lines = ''.join(
    path(f'M{x1},{y} L{x2},{y}', 'cq') for y, x1, x2 in
    [(50, 198, 236), (62, 206, 270), (74, 206, 252), (106, 206, 262), (118, 206, 240), (130, 198, 222)])
nums = ''.join(label(184, y + 2.5, str(i + 1), 'num', 'end', 6)
               for i, y in enumerate([50, 62, 74, 90, 106, 118, 130]) if y != 90)
S['design-engineering'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    tab(40, 30, 'DESIGN'),
    path('M50,54 L110,54', 'c'),
    rect(62, 82, 48, 16, 8, 's'),
    path('M50,122 L130,122', 'cq'), path('M50,134 L102,134', 'cq'),
    rect(170, 30, 120, 120, 8, 'f'),
    tab(180, 30, 'CODE'),
    path('M190,30 L190,150', 'rule'), nums, code_lines,
    rect(194, 82, 86, 16, 3, 'r'),
    code(200, 92.6, '&lt;Button /&gt;'),
    route([(110, 90), (194, 90)]),
    port(110, 90), ring(150, 90), ring(170, 90),
])

# ── software-development: three layers of a product, joined, the release lit ─────────────────────
layers = ''.join(
    rect(50, y - 12, 140, 24, 4, 'f') + glyph(g, 64, y, 12, 'g-q') + label(78, y + 2.5, t) + ('' if TEXT else path(f'M80,{y} L{w},{y}', 'c'))
    for y, g, t, w in [(50, 'monitor', 'INTERFACE', 150), (90, 'server', 'SERVICES', 136), (130, 'database', 'DATA', 120)])
S['software-development'] = ''.join([
    path('M120,62 L120,78 M120,102 L120,118', 'rule'),
    layers,
    route([(190, 50), (210, 50), (210, 90)]),
    route([(190, 130), (210, 130), (210, 90)]),
    route([(190, 90), (239, 90)]),
    port(190, 50), port(190, 90), port(190, 130),
    circle(210, 90, 3.5, 'port'),
    circle(250, 90, 18, 'halo'), circle(250, 90, 11, 's'),
    glyph('arrow-right-up', 250, 90, 12, 'g-on'),
    label(250, 124, 'RELEASE', 'lab', 'middle'),
])

# ── code-review: the file, the routine lines ticked, the two that matter under a lifted lens ──────
rows = [46, 58, 70, 82, 94, 106, 118, 130, 142]
lens_c, lens_r = (154, 88), 26
file_lines = ''.join(
    path(f'M{x1},{y} L{x2},{y}', 'cq') for y, x1, x2 in
    [(46, 126, 202), (58, 134, 228), (70, 134, 194), (106, 134, 216), (118, 126, 206),
     (130, 134, 180), (142, 126, 220)])
ticks = ''.join(path(f'M242,{y} L245,{y + 3} L250,{y - 3}', 'tk') for y in [46, 58, 130, 142])
hi = rect(120, 76, 136, 24, 4, 'r') + path('M132,82 L234,82', 'c2') + path('M132,94 L206,94', 'c2')


def lens(shadow):
    cx, cy = lens_c
    a = math.radians(135)
    x1, y1 = cx + math.cos(a) * (lens_r + 1), cy + math.sin(a) * (lens_r + 1)
    x2, y2 = cx + math.cos(a) * (lens_r + 24), cy + math.sin(a) * (lens_r + 24)
    if shadow:
        return (circle(cx, cy, lens_r, 'lift-s') +
                f'<path class="lift-s-h" d="M{x1:.1f},{y1:.1f} L{x2:.1f},{y2:.1f}"/>')
    inner = (f'<clipPath id="lensclip"><circle cx="{cx}" cy="{cy}" r="{lens_r}"/></clipPath>'
             f'<g clip-path="url(#lensclip)">{circle(cx, cy, lens_r, "lensfill")}'
             f'<g transform="translate({cx},{cy}) scale(1.35) translate({-cx},{-cy})">{hi}</g></g>')
    return (inner + circle(cx, cy, lens_r, 'lens') +
            f'<path class="lens-h" d="M{x1:.1f},{y1:.1f} L{x2:.1f},{y2:.1f}"/>')


S['code-review'] = ''.join([
    rect(90, 30, 180, 120, 8, 'f'),
    tab(100, 30, 'DIFF'),
    path('M116,30 L116,150', 'rule'),
    ''.join(label(110, y + 2.2, str(i + 12), 'num', 'end', 6) for i, y in enumerate(rows)),
    file_lines, ticks, hi,
    lifted(lens, 3, 3),
])

# ── security-checklist: three checks done, one open, holding the gate the users arrive at ─────────
def check_row(y, done, x2):
    box = (rect(46, y - 6, 12, 12, 3, 's') + path(f'M49,{y} L51.5,{y + 2.5} L55,{y - 2.5}', 'tk-on')
           if done else rect(46, y - 6, 12, 12, 3, 'q'))
    return box + path(f'M70,{y} L{x2},{y}', 'c' if done else 'cq')


S['security-checklist'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    tab(40, 30, 'CHECKS'),
    label(138, 52.5, '3 / 4', 'lab-a', 'end'),
    check_row(70, True, 130), check_row(90, True, 116), check_row(110, True, 126),
    check_row(130, False, 112),
    route([(150, 90), (178, 90)]),
    port(150, 90),
    rect(184, 40, 12, 100, 6, 'f'),
    circle(190, 90, 18, 'halo'), circle(190, 90, 11, 's'),
    glyph('lock', 190, 90, 11, 'g-on'),
    ''.join(glyph('user', x, 72, 20, 'g-q') for x in (230, 260, 290)),
    path('M218,90 L302,90', 'rule'),
    route([(290, 110), (204, 110)], 'dq'),
    arrow(203, 110, 'l', 'ah-q'),
    label(250, 130, 'USERS', 'lab', 'middle'),
])

# ── prototype-to-production: the dashed prototype, four questions on its route, the running store ─
q_nodes = [(250, 110), (210, 130), (170, 130), (150, 110)]
S['prototype-to-production'] = ''.join([
    rect(210, 30, 80, 40, 6, 'd'),
    tab(220, 30, 'PROTOTYPE', 'd', 'lab-q'),
    path('M222,44 L262,44', 'cq'), path('M222,56 L248,56', 'cq'),
    route([(250, 70), (250, 130), (150, 130), (150, 90), (112, 90)]),
    arrow(112, 90, 'l'),
    port(250, 70),
    ''.join(circle(x, y, 6.5, 'qnode') + label(x, y + 2.4, str(i + 1), 'lab-a', 'middle', 7)
            for i, (x, y) in enumerate(q_nodes)),
    # The store: a true cylinder, its top the lit face, two bands as true elliptic arcs.
    path('M50,60 L50,120 A30,8 0 0 0 110,120 L110,60', 'f'),
    '<ellipse class="r" cx="80" cy="60" rx="30" ry="8"/>',
    path('M50,80 A30,8 0 0 0 110,80', 'rule'),
    path('M50,100 A30,8 0 0 0 110,100', 'rule'),
    circle(98, 114, 3, 's'),
    label(80, 146, 'PRODUCTION', 'lab', 'middle'),
])

ORDER = ['new-product', 'product-design', 'product-modernisation', 'design-systems', 'ai-product-ux',
         'design-engineering', 'software-development', 'code-review', 'security-checklist',
         'prototype-to-production']


def svg(name):
    return (f'<svg class="nd" viewBox="0 0 320 180" aria-hidden="true">{S[name]}</svg>')
