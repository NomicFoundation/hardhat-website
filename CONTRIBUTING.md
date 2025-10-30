# Contributing to Hardhat's website

Thanks for your interest in contributing to Hardhat's website!

This website is built using [Astro](https://astro.build), and [Starlight](https://starlight.astro.build).

## Editing content

The website's content is located in the [`src/content`](./src/content) directory, and written in GitHub Flavored Markdown in MDX files.

You don't need to learn about Starlight to be able to edit the content.

### Using Astro components in MDX files

In MDX you can use an Astro component by importing it right below the frontmatter and then using it inline.

You can use:

- Our custom MDX components:
  - `@hh/Install.astro`: Which shows how to install npm packages with the different package managers (e.g. `pnpm add --save-dev foo`)
  - `@hh/Run.astro`: Which shows how to run an npm binary with the different package managers (e.g. `pnpm hardhat test`)
  - `@hh/RunRemote.astro`: Which shows how to run a remote binary with the different package managers (e.g. `pnpm dlx hardhat --init`)
- Some advaned Starlight components:
  - [`FileTree`](https://starlight.astro.build/components/file-tree/): To display the structure of a directory with file icons and collapsible sub-directories
  - [`Steps`](https://starlight.astro.build/components/steps/): To style a numbered list of tasks to create step-by-step guides

To use MDX, just change the extension of the file from `.md` to `.mdx`, and `import` the components you need right after the frontmatter.

For example:

```mdx
---
title: Example
description: An example of MDX
---

import Install from "@hh/Install.astro";

<Install packages="hardhat" />
```

### Adding a new page

In most cases, if you place a new `.md` file in a folder within the [`src/content`](./src/content) directory, it will be automatically added to the website. You can validate if it does by running the website locally and checking if it appears in its section's sidebar.

If it doesn't, you may need to edit the [`src/content.config.ts`](./src/content.config.ts) file to add it to the sidebar. We use [`starlight-sidebar-topics`](https://starlight-sidebar-topics.netlify.app/docs/getting-started/) to manage the different section's/topic's sidebars, so please refer to its documentation for more information.

### Internal links

All internal links should be absolute, starting from the root of the website. For example, if you want to link to the "Getting started" page, you should use `/docs/getting-started`.

Internal links, including `#hashes`, are validated when you run `pnpm build`.

## Running the website locally

To run the website locally, you'll need to install the dependencies:

```bash
pnpm install
```

Then, you can run the development server:

```bash
pnpm run dev
```

If you are running in a devcontainer you will have to run this instead:

```bash
pnpm run dev --host
```

## `@nomicfoundation/hardhat-errors` updates

To keep the list of errors updated, we render it using the latest version of `@nomicfoundation/hardhat-errors`.

We do this by installing the latest version of the package in the `errors` pnpm script and generating the `src/content/docs/docs/reference/errors.md` file.

The generated markdown file shouldn't be committed to the repository, and is ignored by git.

The `errors` script is run by the `prebuild` script of the `package.json` file.

This means that a build may modify your `package.json` lockfile, but please review these changes before committing them.

## Linting

We use `prettier`, `astro check`, and `starlight-links-validator` to lint/validate the website.

The first two can be run with `pnpm run lint` and `pnpm run lint:fix`. The latter only runs on `pnpm build`.

Note that `pnpm lint` ignores the community plugins list json, so that we don't get PRs adding plugins unecessarily blocked by the CI.
