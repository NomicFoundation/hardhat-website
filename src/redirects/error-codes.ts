import { getErrors } from "../content/hardhat-errors";
import type { Redirects } from "./types";

const errors = await getErrors();

const redirects: Redirects = [];

for (const error of errors) {
  for (const category of error.categories) {
    for (const errorDescriptor of category.errors) {
      redirects.push([
        `hhe${errorDescriptor.code}`,
        `/docs/reference/errors#${errorDescriptor.slug}`,
      ]);
    }
  }
}

export default redirects;
