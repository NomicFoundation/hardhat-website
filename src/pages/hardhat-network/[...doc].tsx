import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  doc?: string[];
}

export const getServerSideProps: GetServerSideProps<{}, Params> = async ({
  resolvedUrl,
}) => {
  return {
    redirect: {
      destination: `/hardhat2/redirect?r=${encodeURIComponent(resolvedUrl)}`,
      permanent: false,
    },
  };
};

export default function Nop() {
  return null;
}
