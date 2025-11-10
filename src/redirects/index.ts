import type { AstroConfig } from "astro";

import hh2 from "./hh2";
import nextToStarlight from "./next-to-starlight";
import errorRedirects from "./error-codes";
import shortlinks from "./shortlinks";
import inAppShortlinks from "./in-app-shortlinks";
import movedPagesRedirects from "./moved-pages";

const redirects: Record<
  string,
  Exclude<AstroConfig["redirects"][string], string>
> = {};

// Sorted in increasing importance/presedence
const redirectCategories = [
  hh2,
  nextToStarlight,
  errorRedirects,
  shortlinks,
  inAppShortlinks,
  movedPagesRedirects,
];

for (const category of redirectCategories) {
  for (const [from, to] of category) {
    if (redirects[from] !== undefined) {
      throw new Error(`Duplicated redirect found!

From: ${from}
Lower priority redirection: ${redirects[from].destination}
Higher priority redirection: ${to}

How to resolve this error:

- If you just added the lower priority redirect, you should add a different one.
- If you just added the higher priority one, you can either add a different one, or decide that it has higher priority and remove the lower priority one`);
    }

    redirects[from] = {
      destination: to,
      status: 302,
    };
  }
}

export default redirects satisfies AstroConfig["redirects"];
