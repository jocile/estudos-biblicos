import { getStudies } from '@/lib/markdown';
import { NextResponse } from 'next/server';

// Cache de estudos para busca — roda no servidor, só fs
export async function GET() {
  const studies = await getStudies();

  const index = studies.map(({ slug, metadata }) => ({
    slug,
    title: metadata.title ?? '',
    description: metadata.description ?? '',
    category: metadata.category ?? '',
    tags: metadata.tags ?? [],
  }));

  return NextResponse.json(index);
}
