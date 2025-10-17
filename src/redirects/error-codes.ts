import type { AstroConfig } from "astro";

import { getErrors } from "../content/hardhat-errors";

const errors = await getErrors();

const redirects: Record<string, { status: 302; destination: string }> = {};

for (const error of errors) {
  for (const category of error.categories) {
    for (const errorDescriptor of category.errors) {
      redirects[`hhe${errorDescriptor.code}`] = {
        status: 302,
        destination: `/docs/reference/errors#${errorDescriptor.slug}`,
      };
    }
  }
}

export default redirects satisfies AstroConfig["redirects"];
