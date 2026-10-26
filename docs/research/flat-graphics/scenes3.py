"""Round 3: round 2 plus one focal point (2), hatching (3), sheets behind (4), copy rhythm (6), one live
area, and motion data. 5 (glyphs in chips) is a switch on software-development.

Motion attributes, read by the page's engine:
  data-t="ms"              a path that draws from its start at t, a pen travelling its head
  data-nopen               ...drawn without the pen (ticks, a code line)
  data-land                lands (scales in) when a drawing route's head reaches it; "halo" grows slower
  data-after               lands once every route has finished
  data-slide="dx,dy"       arrives from an offset (with data-t, data-dur)
  data-press               presses (with data-t)
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import scenes as s0
from scenes import rect, path, circle, glyph, route, arrow, lifted, R

S = {}


def a(el, **kw):
    """Add attributes to an element string's first tag."""
    attrs = ''.join(f' data-{k.replace("_", "-")}="{v}"' if v is not True else f' data-{k.replace("_", "-")}'
                    for k, v in kw.items())
    i = el.index(' ')
    return el[:i] + attrs + el[i:]


def g(inner, **kw):
    return a(f'<g >{inner}</g>', **kw)


def mroute(pts, t, cls='l'):
    return a(route(pts, cls), t=t)


def port(x, y):
    return a(circle(x, y, 2.5, 'port'), land=1)


def ring(x, y):
    return a(circle(x, y, 3, 'ring'), land=1)


def halo_c(x, y, r=18, after=False):
    return a(circle(x, y, r, 'halo'), **({'after': 'halo'} if after else {'land': 'halo'}))


HATCH = ('<defs><pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" '
         'patternTransform="rotate(45)"><path d="M0,0 L0,5" class="hatchline"/></pattern></defs>')


def hatched(x, y, w, h, rx):
    return (f'<rect class="hatchfill" fill="url(#hatch)" x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}"/>'
            + rect(x, y, w, h, rx, 'd'))


# ── new-product ─────────────────────────────────────────────────────────────────────────────────
S['new-product'] = HATCH + ''.join([
    rect(30, 30, 200, 120, 8, 'd'),
    rect(50, 50, 80, 80, 4, 'r'),
    path('M62,70 L114,70', 'c2r'), path('M62,82 L110,82', 'c'), path('M62,94 L92,94', 'c'),
    rect(62, 108, 36, 12, 6, 's'),
    hatched(150, 50, 60, 20, 4), hatched(150, 110, 60, 20, 4),
    mroute([(130, 90), (258, 90)], 0),
    port(130, 90), ring(230, 90),
    halo_c(270, 90),
    g(circle(270, 90, 11, 's') + glyph('flag', 270, 90, 12, 'g-on'), land=1),
])

# ── product-design ──────────────────────────────────────────────────────────────────────────────
S['product-design'] = ''.join([
    rect(50, 30, 220, 120, 8, 'f'),
    path('M70,50 L118,50', 'c2b'),
    rect(70, 80, 40, 20, 4, 'f'), path('M80,90 L100,90', 'c'),
    mroute([(110, 90), (139, 90)], 0),
    port(110, 90),
    halo_c(150, 90),
    a(path('M150,78 L162,90 L150,102 L138,90 Z', 's'), land=1),
    mroute([(162, 90), (180, 90), (180, 70), (210, 70)], 380),
    mroute([(162, 90), (180, 90), (180, 110), (210, 110)], 380),
    a(arrow(210, 70, 'r'), land=1), a(arrow(210, 110, 'r'), land=1),
    rect(210, 60, 40, 20, 4, 'f'), path('M220,70 L240,70', 'c'),
    rect(210, 100, 40, 20, 4, 'f'), path('M220,110 L234,110', 'c'),
])

# ── product-modernisation ──────────────────────────────────────────────────────────────────────
clutter = ''.join([
    path('M44,50 L96,50', 'cq'), rect(102, 45, 16, 10, 2, 'q'),
    path('M44,62 L118,62', 'cq'),
    rect(44, 70, 34, 14, 2, 'q'), path('M84,77 L116,77', 'cq'),
    path('M50,92 L104,92', 'cq'), path('M44,102 L112,102', 'cq'),
    rect(60, 110, 54, 12, 2, 'q'), path('M44,130 L74,130', 'cq'), path('M82,130 L108,130', 'cq'),
])
S['product-modernisation'] = ''.join([
    rect(30, 30, 100, 120, 8, 'q'),
    clutter,
    mroute([(130, 90), (190, 90)], 0),
    a(arrow(190, 90, 'r'), land=1),
    port(130, 90),
    rect(190, 30, 100, 120, 8, 'f'),
    path('M210,50 L254,50', 'c2b'), path('M210,62 L240,62', 'c'),
    a(rect(204, 74, 72, 32, 8, 'halo'), after='halo'),
    a(rect(210, 80, 60, 20, 4, 's'), after=1),
    rect(210, 118, 26, 16, 4, 'q'), rect(244, 118, 26, 16, 4, 'q'),
])

# ── design-systems ──────────────────────────────────────────────────────────────────────────────
cell = s0.cell
lib = ''.join([
    cell(40, 38, rect(48, 44, 24, 12, 6, 'q2')),
    cell(100, 38, rect(108, 44, 22, 12, 6, 'q2') + circle(124, 50, 4, 'knob')),
    cell(40, 78, rect(46, 84, 28, 12, 3, 'q2') + path('M51,87 L51,93', 'cq1')),
    cell(100, 78, rect(106, 86, 8, 8, 2, 'q2') + path('M118,90 L132,90', 'cq')),
    cell(40, 118, circle(52, 130, 5, 'q2') + path('M62,130 L72,130', 'cq')),
    cell(100, 118, rect(108, 124, 24, 12, 6, 'soft')),
])
S['design-systems'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    lib,
    mroute([(140, 130), (170, 130), (170, 90), (190, 90)], 0),
    rect(190, 30, 100, 120, 8, 'f'),
    port(140, 130), ring(190, 90),
    path('M210,50 L262,50', 'c2b'), path('M210,62 L250,62', 'c'), path('M210,74 L234,74', 'c'),
    a(rect(202, 92, 56, 28, 10, 'halo'), after='halo'),
    a(rect(210, 100, 40, 12, 6, 's'), after=1),
    path('M210,134 L262,134', 'cq'),
])

# ── ai-product-ux: the card widened to the live area ──────────────────────────────────────────────
def cursor(shadow):
    d = 'M0,0 L0,17 L4.6,12.9 L7.6,19.6 L10.6,18.3 L7.7,11.7 L13.6,11.7 Z'
    return f'<path class="{"lift-s" if shadow else "lift"}" d="{d}" transform="translate(121,113)"/>'


S['ai-product-ux'] = ''.join([
    rect(50, 30, 220, 120, 8, 'f'),
    glyph('stars', 70, 50, 12, 'g-a'),
    path('M84,50 L140,50', 'c2b'),
    path('M70,70 L226,70', 'c'), path('M70,82 L212,82', 'c'), path('M70,94 L158,94', 'c'),
    a(rect(70, 104, 58, 16, 8, 's'), press=1, t=1000),
    rect(136, 104, 62, 16, 8, 'q'),
    g(lifted(cursor, 2, 2), slide='16,12', t=150, dur=850),
])

# ── design-engineering ──────────────────────────────────────────────────────────────────────────
code_lines = ''.join(
    path(f'M{x1},{y} L{x2},{y}', 'cq') for y, x1, x2 in
    [(50, 198, 236), (62, 206, 270), (74, 206, 252), (106, 206, 262), (118, 206, 240), (130, 198, 222)])
S['design-engineering'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    path('M50,50 L110,50', 'c2b'), path('M50,62 L94,62', 'c'),
    a(rect(54, 76, 64, 28, 12, 'halo'), land='halo'),
    a(rect(62, 82, 48, 16, 8, 's'), land=1),
    path('M50,122 L130,122', 'c'), path('M50,134 L102,134', 'c'),
    rect(170, 30, 120, 120, 8, 'f'),
    path('M190,30 L190,150', 'rule'), code_lines,
    rect(194, 82, 86, 16, 3, 'r0'),
    a(path('M200,90 L250,90', 'l'), t=650, nopen=1),
    mroute([(110, 90), (194, 90)], 0),
    ring(150, 90), ring(170, 90),
])

# ── software-development (chips: technique 5, a switch) ──────────────────────────────────────────
def software(chips):
    def layer(y, gl, w):
        mark = (rect(56, y - 8, 16, 16, 4, 'chip') + glyph(gl, 64, y, 10, 'g-q')) if chips \
            else glyph(gl, 64, y, 12, 'g-q')
        return rect(50, y - 12, 140, 24, 4, 'f') + mark + path(f'M80,{y} L{w},{y}', 'c')
    return ''.join([
        path('M120,62 L120,78 M120,102 L120,118', 'rule'),
        layer(50, 'monitor', 150), layer(90, 'server', 136), layer(130, 'database', 120),
        mroute([(190, 50), (210, 50), (210, 90)], 0),
        mroute([(190, 130), (210, 130), (210, 90)], 0),
        mroute([(190, 90), (239, 90)], 260),
        port(190, 50), port(190, 90), port(190, 130),
        a(circle(210, 90, 3.5, 'port'), land=1),
        halo_c(250, 90),
        g(circle(250, 90, 11, 's') + glyph('arrow-right-up', 250, 90, 12, 'g-on'), land=1),
    ])


S['software-development'] = software(True)  # 5 kept (owner, 25 Oct): glyphs in chips

# ── code-review: sheets behind, the whole set 20 left so it centres ───────────────────────────────
rows = [46, 58, 70, 82, 94, 106, 118, 130, 142]
file_lines = ''.join(
    path(f'M{x1},{y} L{x2},{y}', 'cq') for y, x1, x2 in
    [(46, 126, 202), (58, 134, 228), (70, 134, 194), (106, 134, 216), (118, 126, 206),
     (130, 134, 180), (142, 126, 220)])
ticks = ''.join(a(path(f'M242,{y} L245,{y + 3} L250,{y - 3}', 'tk'), t=i * 130, nopen=1)
                for i, y in enumerate([46, 58, 130, 142]))
S['code-review'] = '<g transform="translate(-20,0)">' + ''.join([
    rect(98, 22, 180, 120, 8, 'q'), rect(94, 26, 180, 120, 8, 'q'),
    rect(90, 30, 180, 120, 8, 'f'),
    path('M116,30 L116,150', 'rule'),
    file_lines, ticks, s0.hi,
    g(lifted(s0.lens, 3, 3), slide='20,12', t=420, dur=900),
]) + '</g>'

# ── security-checklist ──────────────────────────────────────────────────────────────────────────
def check_row(y, done, x2, i):
    box = (rect(46, y - 6, 12, 12, 3, 's')
           + a(path(f'M49,{y} L51.5,{y + 2.5} L55,{y - 2.5}', 'tk-on'), t=i * 160, nopen=1)
           if done else rect(46, y - 6, 12, 12, 3, 'q'))
    return box + path(f'M70,{y} L{x2},{y}', 'c' if done else 'cq')


S['security-checklist'] = ''.join([
    rect(30, 30, 120, 120, 8, 'f'),
    path('M46,50 L98,50', 'c2b'),
    check_row(70, True, 130, 0), check_row(90, True, 116, 1), check_row(110, True, 126, 2),
    check_row(130, False, 112, 3),
    mroute([(150, 90), (178, 90)], 560),
    port(150, 90),
    rect(184, 40, 12, 100, 6, 'f'),
    halo_c(190, 90),
    g(circle(190, 90, 11, 's') + glyph('lock', 190, 90, 11, 'g-on'), land=1),
    ''.join(g(glyph('user', x, 72, 20, 'g-q'), slide='14,0', t=i * 120, dur=760)
            for i, x in enumerate((230, 260, 290))),
    path('M218,90 L302,90', 'rule'),
    route([(290, 110), (204, 110)], 'dq'),
    arrow(203, 110, 'l', 'ah-q'),
])

# ── prototype-to-production ─────────────────────────────────────────────────────────────────────
q_nodes = [(250, 110), (210, 130), (170, 130), (150, 110)]
S['prototype-to-production'] = ''.join([
    rect(210, 30, 80, 40, 6, 'd'),
    path('M222,44 L262,44', 'cq'), path('M222,56 L248,56', 'cq'),
    mroute([(250, 70), (250, 130), (150, 130), (150, 90), (112, 90)], 0),
    a(arrow(112, 90, 'l'), land=1),
    port(250, 70),
    ''.join(a(circle(x, y, 6.5, 'qnode'), land=1) for x, y in q_nodes),
    path('M50,60 L50,120 A30,8 0 0 0 110,120 L110,60', 'f'),
    path('M50,80 A30,8 0 0 0 110,80', 'rule'),
    path('M50,100 A30,8 0 0 0 110,100', 'rule'),
    '<ellipse class="r" cx="80" cy="60" rx="30" ry="8"/>',
    a('<ellipse class="halo" cx="80" cy="60" rx="38" ry="13"/>', after='halo'),
    a('<ellipse class="s" cx="80" cy="60" rx="30" ry="8"/>', after=1),
    circle(98, 114, 3, 's'),
])

ORDER = ['new-product', 'product-design', 'product-modernisation', 'design-systems', 'ai-product-ux',
         'design-engineering', 'software-development', 'code-review', 'security-checklist',
         'prototype-to-production']
