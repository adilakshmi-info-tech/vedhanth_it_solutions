import { getHeroSlides } from '@/lib/data';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async (request) => {
  const limit = Number(new URL(request.url).searchParams.get('limit')) || 5;
  const slides = await getHeroSlides(limit);
  return ok(slides);
});
