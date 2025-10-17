import { NewsType } from "../components/landingBlocks/WhatIsNewBlock";

export default async function getHardHatReleases() {
  const response = await fetch(
    "https://api.github.com/repos/NomicFoundation/hardhat/releases"
  );

  if (!response.ok) {
    throw Error(`GitHub API error (releases): ${response.status}`);
  }

  const releases = await response.json();
  return releases.slice(0, 3).map((release: NewsType) => {
    const bodyText = release.body?.split("###")[0]?.trim();

    if (!bodyText) {
      throw Error(
        `Extracting description text from release failed:\n${release.body}`
      );
    }

    return { ...release, body: bodyText };
  });
}
