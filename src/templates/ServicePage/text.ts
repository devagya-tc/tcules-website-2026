/* Story fields are PLAIN TEXT, and Callout, Proof and DataTable take trusted HTML through Prose. So
   every plain field is escaped on its way into a paragraph: a quote with "<" or "&" in it is text,
   not markup. */
export function paragraph(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<p>${escaped}</p>`;
}
