import { WIKIPEDIA_API_BASE } from "@/constant/mapConfig";

export async function getPlaceImage(place: string): Promise<string | null> {
  try {
    const candidates = place.split("|");

    for (const candidate of candidates) {
      const image = await fetchWikipediaImage(candidate);
      if (image) return image;
    }

    return null;
  } catch {
    return null;
  }
}

async function fetchWikipediaImage(query: string): Promise<string | null> {
  let url = `${WIKIPEDIA_API_BASE}&prop=pageimages&format=json&pithumbsize=600&titles=${encodeURIComponent(query)}&origin=*`;

  let res = await fetch(url);
  let data = await res.json();

  let pages = data?.query?.pages;
  if (pages) {
    const page = pages[Object.keys(pages)[0]];
    if (page?.thumbnail?.source) return page.thumbnail.source;
  }

  const searchUrl = `${WIKIPEDIA_API_BASE}&list=search&format=json&srsearch=${encodeURIComponent(
    query
  )}&origin=*`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  const title = searchData?.query?.search?.[0]?.title;
  if (!title) return null;

  url = `${WIKIPEDIA_API_BASE}&prop=pageimages&format=json&pithumbsize=600&titles=${encodeURIComponent(
    title
  )}&origin=*`;

  res = await fetch(url);
  data = await res.json();

  pages = data?.query?.pages;
  if (!pages) return null;

  const page = pages[Object.keys(pages)[0]];
  return page?.thumbnail?.source || null;
}

