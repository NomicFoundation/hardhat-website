# Contributing to Hardhat's website

Thanks for your interest in contributing to Hardhat's website!

This website is built using [Astro](https://astro.build), and [Starlight](https://starlight.astro.build).

## Editing content

The website's content is located in the [`src/content`](./src/content) directory, and written in GitHub Flavored Markdown in MDX files.

You don't need to learn about Starlight to be able to edit the content.

### Using Astro components in MDX files

In MDX you can use an Astro component by importing it right below the frontmatter and then using it inline.

#### Starlight MDX components

You can use Starlight MDX components by following this guide: https://starlight.astro.build/components/using-components/#using-a-component-in-mdx

The most interesting ones are:

- [`Code`](https://starlight.astro.build/components/code/): When the triple backticks syntax is not enough
- [`FileTree`](https://starlight.astro.build/components/file-tree/): To display the file system structure
- [`Steps`](https://starlight.astro.build/components/steps/): For ordered steps that the user should follow

`FileTree` and `Steps` should be used whenever it makes sense. `Code` only when the triple backticks aren't enough (see below for more info).

To use the `FileTree` component, you MUST add a `prettier-ignore` comment above, otherwise it will break when autoformatting the document. This is how it should look like:

```mdx
{/* prettier-ignore */}
<FileTree>
- file
- dir
  - file2
</FileTree>
```

#### Code snippets

Starlight uses [ExpressiveCode](https://expressive-code.com/) to render code snippets. It's compatible with the triple backtick syntax of markdown, but significantly more powerful.

See:

- https://starlight.astro.build/guides/authoring-content/#code-blocks
- https://expressive-code.com/key-features/syntax-highlighting/
- https://expressive-code.com/key-features/frames/
- https://expressive-code.com/key-features/text-markers/
- https://expressive-code.com/key-features/word-wrap/
- https://expressive-code.com/key-features/code-component/

We also use these plugins of ExpressiveCode:

- [`@expressive-code/plugin-line-numbers`](https://expressive-code.com/plugins/line-numbers/): To optionally show the line numbers of a snippet. By default we don't show them.
- [`@expressive-code/plugin-collapsible-sections`](https://expressive-code.com/plugins/collapsible-sections/): To be able to show complete and valid snippets (e.g. a valid config or task action file), while collapsing their unimportant parts by default. This is similar to how GitHub collapses unchanged parts of a diff.

Using `@expressive-code/plugin-collapsible-sections` we should try to keep every snippet to be valid code/config whenever possible.

#### Custom components

- `@hh/Install.astro`: Which shows how to install npm packages with the different package managers (e.g. `pnpm add --save-dev foo`). Receives `packages` as prop.
- `@hh/Run.astro`: Which shows how to run an npm binary with the different package managers (e.g. `pnpm hardhat test`). Receives `command` as prop (array or string of arrays), and an optional `prefix`.
- `@hh/RunRemote.astro`: Which shows how to run a remote binary with the different package managers (e.g. `pnpm dlx hardhat --init`). Receives `command` as prop.

```mdx
---
title: Example
description: An example of MDX
---

import Install from "@hh/Install.astro";

<Install packages="hardhat" />
```

### Spell checking

We use [cspell](https://cspell.org/#documentation) as a spell checker. It runs as part of `pnpm lint`, or as `pnpm spellcheck`.

If if reports a typo for a word that you know is correct (e.g. a technical term), please add it to `cspell-dictionary.txt`.

Note that cspell doesn't autofix your typos.

### Adding a new page

In most cases, if you place a new `.mdx` file in a folder within the [`src/content`](./src/content) directory, it will be automatically added to the website. You can validate if it does by running the website locally and checking if it appears in its section's sidebar.

If it doesn't, you may need to edit the [`src/content.config.ts`](./src/content.config.ts) file to add it to the sidebar. Top-level `/docs/guides/<foo>` documents are an example of that.

We use [`starlight-sidebar-topics`](https://starlight-sidebar-topics.netlify.app/docs/getting-started/) to manage the different section's/topic's sidebars, so please refer to its documentation for more information.

### Moving a page

To move a page from one URL to another one, you have to do two things:

1. Move the `.mdx` file.
2. Create an entry in `src/redirects/moved-pages.ts`

### Internal links

All internal links should be absolute, starting from the root of the website. For example, if you want to link to the "Getting started" page, you should use `/docs/getting-started`.

Internal links, including `#hashes`, are validated when you run `pnpm build`.

### Style guide

There's a STYLE.md guide explaining the style that the documentation should follow. It's based on Microsoft's, with tweaks to adapt it to our style, and to force Claude Code to not overindex on the some parts of it.

You can use Claude Code to help you follow the style guide. Read a few sections below to learn how.

## Running the website locally

To run the website locally, you'll need to install the dependencies:

```bash
pnpm install
```

Then, you can run the development server:

```bash
pnpm run dev
```

## `@nomicfoundation/hardhat-errors` updates

To keep the list of errors updated, we render it using the latest version of `@nomicfoundation/hardhat-errors`.

We do this by installing the latest version of the package in the `errors` pnpm script and generating the `src/content/docs/docs/reference/errors.md` file.

The generated markdown file shouldn't be committed to the repository, and is ignored by git.

The `errors` script is run by the `prebuild` script of the `package.json` file.

This means that a build may modify your `package.json` lockfile, but please review these changes before committing them.

## Linting

We use `prettier`, `astro check`, `cspell`, and `starlight-links-validator` to lint/validate the website.

The first two can be run with `pnpm run lint` and `pnpm run lint:fix`. `cspell` only with `pnpm lint` and `pnpm spellcheck`, as it doesn't fix typos automatically. The latter only runs on `pnpm build`.

Note that `pnpm lint` ignores the community plugins list json, so that we don't get PRs adding plugins unnecessarily blocked by the CI.

### Prettier and MDX limitations

Prettier doesn't have support for the latest version of MDX, so it doesn't support multi-line comments with `{/* */}`.

As a workaround, you can use this syntax:

```mdx
{
//
//
//
//
}
```

See:

- https://github.com/prettier/prettier/issues/15163
- https://github.com/prettier/prettier/issues/12209

## Using Claude Code as a copy editor

This repository has a shared setup of Claude Code that let's you use it as a [copy editor](https://en.wikipedia.org/wiki/Copy_editing), to improve the writing, and make apply the style guide to the text.

Take a look at `.claude/README.md` to learn how to use it.
