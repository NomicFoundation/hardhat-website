export default async function getPosts() {
  const API_KEY = process.env.NEXT_GHOST_CMS_API_KEY;
  const CONTENT_URL = process.env.NEXT_GHOST_CMS_CONTENT_URL;

  if (!API_KEY || !CONTENT_URL) {
    if (!process.env.VERCEL_ENV) {
      return [];
    }

    throw new Error(
      `Please set NEXT_GHOST_CMS_API_KEY and NEXT_GHOST_CMS_CONTENT_URL environment variables`
    );
  }

  const endpoint = `${CONTENT_URL}/posts?key=${API_KEY}&filter=tag:[hardhat,hardhat-ignition]`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data.posts.slice(0, 3);
}
