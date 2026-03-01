import { source, getLLMText } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const slug =
    params.slug && params.slug.length === 1 && params.slug[0] === 'index' ? [] : params.slug;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export async function generateStaticParams() {
  const params = await source.generateParams();
  return params.map((p) => ({
    slug: p.slug.length === 0 ? ['index'] : p.slug,
  }));
}
