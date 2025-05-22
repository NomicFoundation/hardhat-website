export default async function getPosts() {
  const API_KEY = process.env.NEXT_GHOST_CMS_API_KEY;
  const endpoint = `${process.env.NEXT_GHOST_CMS_CONTENT_URL}/posts?key=${API_KEY}&filter=tag:[hardhat,hardhat-ignition]`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    console.error(`HTTP error! Status: ${response.status}`);
    return [];
  }

  const data = await response.json();
  return data.posts.slice(0, 3);
}
