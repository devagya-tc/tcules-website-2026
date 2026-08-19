import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Tcules',
  description: 'Tcules website',
};

/**
 * The root shell.
 *
 * The <link> below is the token system's one network call. It belongs here rather than in
 * tokens/fonts.css because an @import inside a bundled stylesheet is position-invalid and gets
 * dropped at build time — silently, leaving every family on its local fallback. See
 * src/styles/tokens/fonts.css for the full note and the self-hosting path.
 *
 * Still absent on purpose: nav and footer are patterns that do not exist yet, and analytics is
 * added at launch, not during scaffolding.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- the rule targets the
            Pages Router (it wants fonts in pages/_document.js so they are not per-page). This IS
            the App Router root layout, so a link here already applies to every route, which is
            exactly what the rule is asking for. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Public+Sans:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
