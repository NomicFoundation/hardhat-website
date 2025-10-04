---
title: Using the Hardhat 3 plugin template
description: How to use the Hardhat 3 plugin template repository to build your own plugin
---

# Using the Hardhat 3 plugin template

This guides will show you how to use the [official GitHub template repository](https://github.com/nomicfoundation/hardhat3-plugin-template/) to build your own Hardhat 3 plugin, which includes all the boilerplate needed for a new plugin.

## Prerequisites

To use the template, you'll need to have Node.js 22+ and `pnpm` installed on your machine.

## Using the template repository

To create a new repository based on the template, click [here](https://github.com/new?template_name=hardhat3-plugin-template&template_owner=NomicFoundation) and follow the instructions on GitHub.

Then, clone your new repository to your local machine.

## Understanding your new repository

The repository you just created is structured as a [`pnpm`](https://pnpm.io/) monorepo with the following packages:

- `packages/plugin`: The plugin itself, which contains the plugin boilerplate.
- `packages/example-project`: An example Hardhat 3 project that uses the plugin.

All the development will happen in the `packages/plugin` directory, while `packages/example-project` is a playground to experiment with your plugin, and manually test it.

## Trying out your plugin

Before changing anything, let's test the boilerplate plugin.

```sh
pnpm install
pnpm build
```

And try the plugin out in `packages/example-project` with:

```sh
cd packages/example-project
pnpm hardhat my-task
```

which should print `Hola, Hardhat!`.

:::tip

Running `pnpm watch` in the `packages/plugin` directory can be helpful when using the example project.

If you keep a terminal running it, things will normally be rebuilt by the time you try them out in the `example-project`.

:::

### Learn more

You can learn more about the Hardhat 3 plugin template's setup by reading it's [README.md](https://github.com/NomicFoundation/hardhat3-plugin-template/blob/main/README.md).
