import type { ReactNode } from 'react';

import { Layout } from '@/components';

import styles from './ClaimSet.module.css';

/**
 * A claim's words. `spread`: a claim with no example fills its slide, so from 1024 its blocks run in
 * two peer columns, the first taking the larger half, rather than one line across the full width.
 */
export function ClaimWords({
  words,
  spread = false,
}: {
  words: readonly ReactNode[];
  spread?: boolean;
}) {
  if (!spread || words.length < 2)
    return (
      <Layout rowGap="text" className={spread ? undefined : styles.words}>
        {words}
      </Layout>
    );
  const half = Math.ceil(words.length / 2);
  return (
    <Layout columns={{ lg: [1, 1] }} colGap="column" rowGap="text" align="start">
      <Layout rowGap="text">{words.slice(0, half)}</Layout>
      <Layout rowGap="text">{words.slice(half)}</Layout>
    </Layout>
  );
}
