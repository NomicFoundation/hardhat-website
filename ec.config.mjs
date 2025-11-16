/**
 * @file This file configures Expressive Code, which can't always be fully configured from the `astro.config.ts` file.
 * @see https://expressive-code.com/key-features/code-component/#using-an-ecconfigmjs-file
 */
import { defineEcConfig } from "@astrojs/starlight/expressive-code";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

export default defineEcConfig({
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  defaultProps: {
    showLineNumbers: false,
    collapseStyle: "collapsible-start",
  },
});
