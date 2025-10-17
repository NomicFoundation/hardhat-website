---
title: Creating a custom task
description: Hardhat 3 plugin tutorial - Creating a custom task
---

# Creating a custom task

Let's now define a task that prints the `myAccount` address of the network Hardhat is connected to, with a customizable title.

## Defining the task in your `HardhatPlugin` object

Tasks are defined in the `tasks` property of the `HardhatPlugin` object.

If you open `packages/plugin/src/index.ts`, you'll find the `tasks` property, an array of task definitions. You already have one:

```ts
task("my-task", "Prints a greeting.")
  .addOption({
    name: "who",
    description: "Who is receiving the greeting.",
    type: ArgumentType.STRING,
    defaultValue: "Hardhat",
  })
  .setAction(() => import("./tasks/my-task.js"))
  .build();
```

Replace it with this code:

```ts{8}
task("my-account", "Prints your account.")
  .addOption({
    name: "title",
    description: "The title to use before printing the account.",
    type: ArgumentType.STRING,
    defaultValue: "My account:",
  })
  .setAction(() => import("./tasks/my-account.js"))
  .build(),
```

You'll get an error in the highlighted line because a file is missing. We'll create it in the next section.

## Creating a task action file

The task action is defined in a separate file that's only imported when the task runs.

Create the file `packages/plugin/src/tasks/my-account.ts` with this code:

```ts
import { HardhatRuntimeEnvironment } from "hardhat/types/hre";

interface MyAccountTaskArguments {
  title: string;
}

export default async function (
  taskArguments: MyAccountTaskArguments,
  hre: HardhatRuntimeEnvironment
) {
  const conn = await hre.network.connect();
  console.log(taskArguments.title);
  console.log(conn.myAccount);
}
```

Here we define the task arguments interface and action (the function that executes when the task runs).

The task action must be an async function and exported as `default`.

:::tip
The task arguments interface, `MyAccountTaskArguments`, is type-safe. You'll get a compilation error if it doesn't match the arguments in the task definition.
:::

You can remove `packages/plugin/src/tasks/my-task.ts`, as it's no longer needed.

## Trying out your task

To try out your task, build the plugin and run this in the example project:

```sh
pnpm hardhat my-account --title MiCuenta
MiCuenta
0x70997970c51812dc3a010c7d01b50e0d17dc79c8
```
