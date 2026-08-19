/**
 * design-sync library entry.
 *
 * This repo is a Next.js app, not a published package, so there is no dist/ entry for the
 * converter to bundle. Rather than let it synthesize one from every .tsx under src/ — which
 * would drag route files, next/link and the @/content seam into the bundle — this file names
 * the design system's actual public surface: the two tier barrels, and nothing else.
 *
 * The CSS import is what makes the bundle self-styling: ds-styles.css chains through
 * app/globals.css to the token system, the reset and the base element layer, and esbuild
 * inlines the whole chain (plus every *.module.css reached from the components) into
 * _ds_bundle.css.
 */
import './ds-styles.css';

export * from '@/components';
export * from '@/patterns';
