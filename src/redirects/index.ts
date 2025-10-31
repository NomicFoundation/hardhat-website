import type { AstroConfig } from "astro";

import hh2 from "./hh2";
import nextToStarlight from "./next-to-starlight";
import errorRedirects from "./error-codes";
import shortlinks from "./shortlinks";
import inAppShortlinks from "./in-app-shortlinks";
import movedPagesRedirects from "./moved-pages";

const redirects: AstroConfig["redirects"] = {};

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
    redirects[from] = {
      destination: to,
      status: 302,
    };
  }
}

export default redirects;
