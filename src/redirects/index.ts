import type { AstroConfig } from "astro";

import hh2 from "./hh2";
import nextToStarlight from "./next-to-starlight";
import errorCodes from "./error-codes";
import shortlinks from "./shortlinks";

export default {
  ...hh2,
  ...nextToStarlight,
  ...errorCodes,
  ...shortlinks,
} satisfies AstroConfig["redirects"];
