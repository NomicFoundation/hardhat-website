---
title: Type extensions
description: What are type extensions in a Hardhat 3 plugin and how to use them
---

# Type extensions

When building a Hardhat 3 plugin, you'll often need to extend a TypeScript type of Hardhat or a plugin your are using as a dependency. This is done with a Type Extension.

## How do Type Extensions work?

Type Extensions are a combination of two features of TypeScript:

- Module augmentation
- Declaration merging

### Module augmentation

Module augmentation allows you to add new type declaration as if they were defined in another module, the one that's being augmented.

You can augment a module in any `.ts` file. You need to import the module you want to augment, and then use the `declare module` to declare it again, adding the new declarations.

For example, if you want to add a new `MyType` type to the `hardhat/types/network` module, you can do it like this:

```ts
import "hardhat/types/network";
declare module "hardhat/types/network" {
  export interface MyType {
    // ...
  }
}
```

Now, everyone who imports `hardhat/types/network` will have access to the `MyType` type.

### Declaration merging

Declaration merging is a process that TypeScript applies when a module declares a type mode than once. It merges the different properties of each declaration into a single one.

For example, if you have these two declarations in a single file:

```ts
interface MyType {
  propOne: number;
}

interface MyType {
  propTwo: number;
}
```

is equivalent to having this:

```ts
interface MyType {
  propOne: number;
  propTwo: number;
}
```

### Combining both to extend an existing type

If you augment a module and then redeclare one of its existing types, typescript will merge the two declarations into a single one, effectively adding the properties of your new declaration to the original one.

For example, if you augment the `hardhat/types/network` module and then redeclare the `NetworkConnection` type like this:

```ts
import "hardhat/types/network";
declare module "hardhat/types/network" {
  export interface NetworkConnection {
    myProp: string;
  }
}
```

The `NetworkConnection` type will now have a `myProp` property, everywhere that's used.

## Type extension vs runtime behavior

Type extensions are exclusively a type-level concept. Adding a property to a type doesn't mean that it will automatically be added to the values of that type.

You need to make sure that your type extensions are aligned with the behavior of your plugin, adding any property at runtime as well. This is normally done with Hook Handlers.

In the example above, we would need to hook into the `NetworkConnection` creation to add the `myProp` property to it.

## Loading your plugin's type extensions

To make TypeScript aware of your type extensions, you need to import them in the index file of your plugin. Normally, an

```ts
import "./type-extensions.js";
```

in your `index.ts` file is enough.

## Learn more

To learn about the details of how Module Augmentation and Declaration Merging work, you can read the [official TypeScript documentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).
