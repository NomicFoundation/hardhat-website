import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  seo: {
    title: string;
    description: string;
  };
}

const commonTitlePart =
  " | Ethereum development environment for professionals by Nomic Foundation";

const SEO = ({ seo }: Props) => {
  const title = `${seo.title}${commonTitlePart}`;
  const router = useRouter();

  const [asPath] = router.asPath.split(/[?#]/);
  let canonicalPath = asPath.replace(/\.mdx?$/, "");
  canonicalPath = canonicalPath.replace(/\/index$/, "");
  if (canonicalPath === "") canonicalPath = "/";
  const canonicalUrl = `https://hardhat.org${canonicalPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta property="og:url" content="https://hardhat.org" />
      <meta property="og:image" content="/thumbnail.png" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export default SEO;
