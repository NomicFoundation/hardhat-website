import { NewsType } from '../components/landingBlocks/WhatIsNewBlock';

export default async function getHardHatReleases() {
  try {
    const response = await fetch('https://api.github.com/repos/NomicFoundation/hardhat/releases');

    if (!response.ok) {
      console.error(`GitHub API error (releases): ${response.status}`);
      return [];
    }

    const releases = await response.json();
    return releases.slice(0, 3).map((release: NewsType) => {
      const bodyText = release.body?.split('###')[0] || '';
      return { ...release, body: bodyText };
    });
  } catch (error) {
    console.error('Error fetching Hardhat releases:', error);
    return [];
  }
}
