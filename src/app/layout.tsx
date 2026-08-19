import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Tcules',
  description: 'Tcules website',
};

/**
 * The root shell.
 *
 * Bare on purpose. No font loading, no analytics, no global nav or footer:
 *
 * • Fonts are a typography decision and typography is part of the token system, so
 *   next/font joins this file at the same time the type scale does. Until then the page
 *   renders in the browser default, which is honest rather than a placeholder to unpick.
 * • Nav and footer are patterns that do not exist yet. When they do, they mount here.
 * • Analytics and tag managers are added at launch, not during scaffolding.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
