import HeroBlock from '../components/landingBlocks/HeroBlock';
import WhyHardhatBlock from '../components/landingBlocks/WhyHardhatBlock';

import EmailForm from '../components/landingBlocks/EmailForm';
import homepageContent from '../content/home';
import LandingLayout from '../components/LandingLayout';
import WhatIsNewBlock, { NewsType } from '../components/landingBlocks/WhatIsNewBlock';
import HardhatNews from '../components/landingBlocks/HardhatNews';
import getPosts from '../lib/getPosts';
import getHardHatReleases from '../lib/getHardHatReleases';

type HomePageType = {
  releases: NewsType[];
  posts: [];
};

const Home = ({ releases, posts }: HomePageType) => {
  return (
    <LandingLayout
      seo={{
        title: 'Hardhat',
        description:
          'Hardhat is an Ethereum development environment. Compile your contracts and run them on a development network. Get Solidity stack traces, console.log and more.',
      }}
      sidebarLayout={[]}
    >
      <HeroBlock content={homepageContent.heroBlockContent} />

      <WhyHardhatBlock content={homepageContent.whyHardhatContent} />
      <WhatIsNewBlock content={{ title: homepageContent.whatIsNewBlockContent.title, releases }} />
      <HardhatNews content={{ title: homepageContent.hardhatNewsContent.title, posts }} />
      <EmailForm endpoint={homepageContent.emailFormContent.endpoint} />
    </LandingLayout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const releases = await getHardHatReleases();
  const posts = await getPosts();
  return {
    props: {
      releases,
      posts,
    },
    revalidate: 3600,
  };
};
