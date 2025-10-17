---
title: Using the Hardhat 3 plugin template
description: How to use the Hardhat 3 plugin template repository to build your own plugin
---

# Using the Hardhat 3 plugin template

This guide shows you how to use the [official GitHub template repository](https://github.com/nomicfoundation/hardhat3-plugin-template/) to build your own Hardhat 3 plugin. The template includes all the boilerplate needed for a new plugin.

## Prerequisites

To use the template, you'll need Node.js 22+ and `pnpm` installed on your machine.

## Using the template repository

To create a new repository based on the template, click [here](https://github.com/new?template_name=hardhat3-plugin-template&template_owner=NomicFoundation) and follow the instructions on GitHub.

Then, clone your new repository to your local machine.

## Understanding your new repository

The repository you just created is structured as a [`pnpm`](https://pnpm.io/) monorepo with the following packages:

- `packages/plugin`: The plugin itself, including the plugin boilerplate.
- `packages/example-project`: An example Hardhat 3 project that uses the plugin.

You'll do all development in the `packages/plugin` directory, while `packages/example-project` is a playground to experiment with your plugin and manually test it.

To learn how to write automated tests for your plugin, read [this guide](./integration-tests.md).

## Trying out your plugin

Before changing anything, let's test the boilerplate plugin.

```sh
pnpm install
pnpm build
```

Try the plugin out in `packages/example-project` with:

```sh
cd packages/example-project
pnpm hardhat my-task
```

This should print `Hola, Hardhat!`.

:::tip

Running `pnpm watch` in the `packages/plugin` directory helps when using the example project.

If you keep a terminal running it, the plugin will normally rebuild by the time you try it out in the `example-project`.

:::

### Learn more

Learn more about the Hardhat 3 plugin template's setup by reading its [README.md](https://github.com/NomicFoundation/hardhat3-plugin-template/blob/main/README.md).
