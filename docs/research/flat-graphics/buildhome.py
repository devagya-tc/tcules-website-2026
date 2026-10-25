import json, os, re, sys, urllib.parse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import hover as h

D = os.path.dirname(os.path.abspath(__file__))
g = json.load(open(sys.argv[1]))
css, html = g['css'], g['html']
# Inline the textures; drop the dev server's own font faces (the page loads the real fonts from Google).
for u, body in g['inl'].items():
    if u.endswith('.svg'):
        css = css.replace(u, 'data:image/svg+xml,' + urllib.parse.quote(body))
css = re.sub(r'@font-face\s*\{[^}]*__nextjs_font[^}]*\}', '', css)

ORDER = ['product-design', 'product-modernisation', 'design-systems', 'ai-product-ux', 'design-engineering',
         'software-development']
svgs = list(re.finditer(r'<svg class="Sketch-module[^"]*"[^>]*>.*?</svg>', html, flags=re.S))
assert len(svgs) == 6, len(svgs)
out, last = [], 0
for m, name in zip(svgs, ORDER):
    x, y, w, hh = h.BOX[name]
    cls = re.search(r'class="([^"]*)"', m.group(0)).group(1)
    out.append(html[last:m.start()])
    out.append(f'<svg class="{cls} nd" viewBox="{x} {y} {w} {hh}" width="{w}" height="{hh}" '
               f'style="--skt-units:{w}" focusable="false" aria-hidden="true">{h.H[name]}</svg>')
    last = m.end()
out.append(html[last:])
section = ''.join(out)

tpl = open(f'{D}/home-template.html').read()
open(sys.argv[2], 'w').write(tpl.replace('{{SITE_CSS}}', css).replace('{{SECTION}}', section))
print('ok')
