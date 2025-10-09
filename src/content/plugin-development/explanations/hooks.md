---
title: Hooks and Hook Handlers
description: An explanation about Hardhat 3's Hooks and Hook Handlers
---

# Hooks and Hook Handlers

Hardhat 3 allows plugins to extend its functionality and that of other plugins using the Hooks system.

## What's a Hook?

Hooks are extension points that allow you to introduce custom logic to the execution of Hardhat. You can add new functionality and intercept existing behavior to customize it.

Different workflows of Hardhat define their own Hooks. When we build a piece of functionality that a plugin may want to customize, we define a Hook and run it. That is, instead of just implementing the default behavior, we add an extension point and use the normal behavior as default.

For example, there's a `NetworkHooks#newConnection` Hook that allows you to customize the behavior of `network.connect()`.

Plugins can define their own Hooks too, so they can also be extensible.

### Hook Categories

Hooks are divided into categories. Each of them provides a set of Hooks for specific areas of Hardhat. By doing this we split the implementation of plugins into different areas, achieving three things:

1. We keep the Hooks and Hook Handlers organized
2. Hardhat can load faster, as not every category is needed every time
3. We make Hardhat more robust, as an error in a Hook Handler won't affect workloads that don't use that Hook Category

To learn more about this, read [Hook Handlers' lifecycle](./lifecycle.md#hook-handlers-lifecycle) explanation.

Some examples of Hook Categories are:

- `config`: Hooks related to the config system
- `network`: Hooks related to the network management
- `test`: Hooks related to the test tasks
- `solidity`: Hooks related to the Solidity build system

## What's a Hook Handler?

A Hook Handler is a function that is executed when a Hook is run. They are defined by plugins and implement their custom logic. You can think of them as callbacks that implement a Hook's type and are executed when the Hook runs.

Most Hook Handlers are defined in the [`HardhatPlugin`'s `hookHandlers` property](../reference/hardhat-plugin-object.md#hookhandlers) and only loaded when needed. To learn more about their lifecycle, read the [Lifecycle of the components of a Hardhat 3 plugin](../explanations/lifecycle.md) explanation.

## Different types of Hooks

This section explains the different types of Hooks and how they work.

### Chained Hooks

This is the most common type of Hook, and they always look like this:

<!-- prettier-ignore-start -->
```ts
type MyChainedHook = (
  context: HookContext,
  ...hookHandlerArguments,
  next: (
    nextContext: HookContext,
    ...nextArguments
  ) => Promise<ReturnType>
) => Promise<ReturnType>;
```
<!-- prettier-ignore-end -->

When a Chained Hook is run, its Hook Handlers receive a `next` function as their last parameter.

The `next` function forms a chain of responsibility, where each Hook Handler of a Hook is connected to the next one. The order of this chain is defined as follows:

- [Dynamic Hook Handlers](#dynamic-hook-handlers) are first, in reverse order of their registration.
- The Hook Handlers defined in the plugins' `hookHandlers` properties come next. They are in the reverse order of the resolved list of plugins, which means that the Hook Handlers defined by the plugins you depend on always come after your own. Read [this section](./lifecycle.md#plugin-list-resolution) to understand how this order is determined.
- The default behavior comes last and doesn't have a `next` function.

The first Hook Handler to be executed will receive the parameters passed to the Hook run as `hookHandlerArguments`.

Using the `next` function, each Hook Handler decides when and if it wants to pass control to the next Hook Handler in the chain. Running `next` returns the result of executing the next Hook Handler.

This lets you choose if your Hook Handler should customize the behavior you are hooking into before or after the next Hook Handlers.

A Hook Handler can also decide not to call `next` at all and return a value directly, but it should never call it more than once.

When calling `next`, it should pass the same `context`, but can decide to pass a different set of arguments as `nextArguments`. To learn more about the `context`, read the [Hook Context](#hook-context) section.

For example, the Hook Handler for `NetworkHooks#onRequest` of the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template/) looks like this:

```ts
async onRequest(context, networkConnection, jsonRpcRequest, next) {
  console.log(`Request from connection ${networkConnection.id} is being processed — Method: ${jsonRpcRequest.method}`);

  return next(context, networkConnection, jsonRpcRequest);
}
```

It prints a message when a request is received and passes control to the next Hook Handler in the chain.

### Parallel Hooks

Parallel Hooks are Hooks that run in an unknown order. They don't have access to a `next` function, and Hardhat doesn't guarantee any execution order.

```ts
type MyParallelHook = (
  context: HookContext,
  ...hookHandlerArguments
) => Promise<ReturnType>;
```

All the Hook Handlers of a Parallel Hook are always executed and receive the same parameters that are passed to the Hook run.

### Sequential Hooks

Sequential Hooks are the least common type of Hook. If you are thinking about defining one, consider using a [Parallel Hook](#parallel-hooks) instead.

When a Sequential Hook is run, its Hook Handlers are always executed in the same order. They don't have access to a `next` function, and Hardhat guarantees that all of them are executed in order.

A Sequential Hook looks like this:

```ts
type MySequentialHook = (
  context: HookContext,
  ...hookHandlerArguments
) => Promise<ReturnType>;
```

All the Hook Handlers of a Sequential Hook are always executed and receive the same parameters that are passed to the Hook run.

The order in which they are executed is exactly the opposite of the [Chained Hooks](#chained-hooks)'s order.

## Hook Context

The `context` is an object that gives access to most of the functionality of Hardhat to Hook Handlers. You can think of it as a trimmed-down version of the Hardhat Runtime Environment.

The only thing that the Hook Handlers can't access is the `tasks` property, as mixing Hook Handlers and Hardhat Tasks is not allowed.

## Dynamic Hook Handlers

You can also define Hook Handlers dynamically using the Hardhat Runtime Environment. This is useful when you want to customize the behavior of Hardhat during the execution of a task, instead of everywhere.

For example, this task action registers a Hook Handler for the `NetworkHooks#newConnection` Hook before executing the rest of the logic:

```ts
export default async function (
  taskArguments: MyTaskTaskArguments,
  hre: HardhatRuntimeEnvironment
) {
  const networkHandlers: Partial<NetworkHooks> = {
    async newConnection(context, next) {
      const conn = await next(context);

      console.log("New connection created with ID", conn.id);

      return conn;
    },
  };

  try {
    hre.hooks.registerHandlers("network", networkHandlers);

    // Logic that may use the network
  } finally {
    hre.hooks.unregisterHandlers("network", networkHandlers);
  }
}
```

This allows you to connect the Hardhat Tasks to the Hooks system and create Hook Handlers with state that depends on the execution of a task.

## Config Hooks

The Hooks in the `config` category are a special case, as they are run before the Hardhat Runtime Environment initialization is complete.

They are defined in the same way as the rest of the Hooks, but their Hook Handlers don't receive the `context` parameter.
