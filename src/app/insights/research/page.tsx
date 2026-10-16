import { FormatIndexRoute, formatIndexMetadata } from '@/app/_insights/format';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export const generateMetadata = () => formatIndexMetadata('research');

/** Every research piece on one page (InsightsFormatIndex). Composition only: the work is in _insights/format. */
export default function Page({ searchParams }: Props) {
  return <FormatIndexRoute kind="research" searchParams={searchParams} />;
}
