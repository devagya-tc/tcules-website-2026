"""Service tile hover: each service drawing in two states, rest = the problem, hover = it solved.

One move per drawing, all parts on one transition (360ms, the owner's ease), both ways (decisions
2026-10-19-hover-is-a-move, -animated-drawing-story-first). Classes the page's CSS moves:
  tr      a route that traces (stroke-dashoffset, from its measured length to 0)
  grow    scales from 0 to 1 about its own centre
  lit     fill goes quiet -> accent        litS   stroke goes quiet -> accent
  glide   translates from its rest offset (--dx, --dy) to its place
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import scenes as s0
from scenes import rect, path, circle, glyph, route, arrow, lifted

H = {}


def c(el, cls):
    """Add a class to an element string's first class attribute."""
    return el.replace('class="', f'class="{cls} ', 1)


def tr(pts, cls='l'):
    return c(route(pts, cls), 'tr')


def grow(el):
    return c(el, 'grow')


# ── Product design: the decision is open, then made: both branches trace out, the decision lights ─
H['product-design'] = ''.join([
    rect(50, 30, 220, 120, 8, 'f'),
    path('M70,50 L118,50', 'c2b'),
    rect(70, 80, 40, 20, 4, 'f'), path('M80,90 L100,90', 'c'),
    route([(110, 90), (139, 90)]), circle(110, 90, 2.5, 'port'),
    grow(circle(150, 90, 18, 'halo')),
    c(path('M150,78 L162,90 L150,102 L138,90 Z', 'dia'), 'lit'),
    tr([(162, 90), (180, 90), (180, 70), (204, 70)]),
    tr([(162, 90), (180, 90), (180, 110), (204, 110)]),
    grow(arrow(210, 70, 'r')), grow(arrow(210, 110, 'r')),
    rect(210, 60, 40, 20, 4, 'f'), path('M220,70 L240,70', 'c'),
    rect(210, 100, 40, 20, 4, 'f'), path('M220,110 L234,110', 'c'),
])

# ── Product modernisation: the rebuild runs across, the clean screen's block lights ─────────────
H['product-modernisation'] = ''.join([
    rect(30, 30, 100, 120, 8, 'q'),
    path('M44,50 L96,50', 'cq'), rect(102, 45, 16, 10, 2, 'q'),
    path('M44,62 L118,62', 'cq'),
    rect(44, 70, 34, 14, 2, 'q'), path('M84,77 L116,77', 'cq'),
    path('M50,92 L104,92', 'cq'), path('M44,102 L112,102', 'cq'),
    rect(60, 110, 54, 12, 2, 'q'), path('M44,130 L74,130', 'cq'), path('M82,130 L108,130', 'cq'),
    circle(130, 90, 2.5, 'port'),
    tr([(130, 90), (184, 90)]),
    grow(arrow(190, 90, 'r')),
    rect(190, 30, 100, 120, 8, 'f'),
    path('M210,50 L254,50', 'c2b'), path('M210,62 L240,62', 'c'),
    grow(rect(204, 74, 72, 32, 8, 'halo')),
    c(rect(210, 80, 60, 20, 4, 'blk'), 'lit'),
    rect(210, 118, 26, 16, 4, 'q'), rect(244, 118, 26, 16, 4, 'q'),
])

# ── Design systems: the component is placed: its route traces to the screen and it lands in the slot ─
lib = ''.join([
    s0.cell(40, 38, rect(48, 44, 24, 12, 6, 'q2')),
    s0.cell(100, 38, rect(108, 44, 22, 12, 6, 'q2') + circle(124, 50, 4, 'knob')),
    s0.cell(40, 78, rect(46, 84, 28, 12, 3, 'q2') + path('M51,87 L51,93', 'cq1')),
    s0.cell(100, 78, rect(106, 86, 8, 8, 2, 'q2') + path('M118,90 L132,90', 'cq')),
    s0.cell(40, 118, circle(52, 130, 5, 'q2') + path('M62,130 L72,130', 'cq')),
    s0.cell(100, 118, rect(108, 124, 24, 12, 6, 'soft')),
])
H['design-systems'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    lib,
    circle(140, 130, 2.5, 'port'),
    tr([(140, 130), (170, 130), (170, 90), (190, 90)]),
    rect(190, 30, 100, 120, 8, 'f'),
    grow(circle(190, 90, 3, 'ring')),
    path('M210,50 L262,50', 'c2b'), path('M210,62 L250,62', 'c'), path('M210,74 L234,74', 'c'),
    rect(210, 100, 40, 12, 6, 'slot'),
    grow(rect(202, 92, 56, 28, 10, 'halo')),
    grow(rect(210, 100, 40, 12, 6, 's')),
    path('M210,134 L262,134', 'cq'),
])

# ── AI product UX: the person accepts: the cursor moves onto Accept and it fills ────────────────
def cursor(shadow):
    d = 'M0,0 L0,17 L4.6,12.9 L7.6,19.6 L10.6,18.3 L7.7,11.7 L13.6,11.7 Z'
    return f'<path class="{"lift-s" if shadow else "lift"}" d="{d}" transform="translate(121,113)"/>'


H['ai-product-ux'] = ''.join([
    rect(50, 30, 220, 120, 8, 'f'),
    glyph('stars', 70, 50, 12, 'g-a'),
    path('M84,50 L140,50', 'c2b'),
    path('M70,70 L226,70', 'c'), path('M70,82 L212,82', 'c'), path('M70,94 L158,94', 'c'),
    c(rect(70, 104, 58, 16, 8, 'btn'), 'lit litS'),
    rect(136, 104, 62, 16, 8, 'q'),
    f'<g class="glide" style="--dx:96px;--dy:14px">{lifted(cursor, 2, 2)}</g>',
])

# ── Design engineering: the component reaches the code: the route traces, the code line lights ──
code_lines = ''.join(
    path(f'M{x1},{y} L{x2},{y}', 'cq') for y, x1, x2 in
    [(50, 198, 236), (62, 206, 270), (74, 206, 252), (106, 206, 262), (118, 206, 240), (130, 198, 222)])
H['design-engineering'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    path('M50,50 L110,50', 'c2b'), path('M50,62 L94,62', 'c'),
    grow(rect(54, 76, 64, 28, 12, 'halo')),
    rect(62, 82, 48, 16, 8, 's'), circle(110, 90, 2.5, 'port'),
    path('M50,122 L130,122', 'c'), path('M50,134 L102,134', 'c'),
    rect(170, 30, 120, 120, 8, 'f'),
    path('M190,30 L190,150', 'rule'), code_lines,
    rect(194, 82, 86, 16, 3, 'r0'),
    c(path('M200,90 L250,90', 'codeln'), 'litS'),
    tr([(110, 90), (194, 90)]),
    grow(circle(150, 90, 3, 'ring')), grow(circle(170, 90, 3, 'ring')),
])

# ── Software development: the layers ship: the bus traces from all three, the release lights ────
def layer(y, gl, w):
    return (rect(50, y - 12, 140, 24, 4, 'f') + rect(56, y - 8, 16, 16, 4, 'chip')
            + glyph(gl, 64, y, 10, 'g-q') + path(f'M80,{y} L{w},{y}', 'c'))


H['software-development'] = ''.join([
    path('M120,62 L120,78 M120,102 L120,118', 'rule'),
    layer(50, 'monitor', 150), layer(90, 'server', 136), layer(130, 'database', 120),
    circle(190, 50, 2.5, 'port'), circle(190, 90, 2.5, 'port'), circle(190, 130, 2.5, 'port'),
    tr([(190, 50), (210, 50), (210, 90)]),
    tr([(190, 130), (210, 130), (210, 90)]),
    tr([(190, 90), (239, 90)]),
    grow(circle(210, 90, 3.5, 'port')),
    grow(circle(250, 90, 18, 'halo')),
    c(circle(250, 90, 11, 'node'), 'lit litS'),
    c(glyph('arrow-right-up', 250, 90, 12, 'g-rel'), 'lit'),
])

BOX = {
    'product-design': (46, 26, 228, 128), 'product-modernisation': (26, 26, 268, 128),
    'design-systems': (26, 26, 268, 128), 'ai-product-ux': (46, 26, 228, 128),
    'design-engineering': (26, 26, 268, 128), 'software-development': (46, 26, 228, 128),
}
