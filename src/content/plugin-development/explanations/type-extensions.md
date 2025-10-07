---
title: Type extensions
description: What are type extensions in a Hardhat 3 plugin and how to use them
---

# Type extensions

When building a Hardhat 3 plugin, you'll often need to extend a TypeScript type from Hardhat or a plugin you're using as a dependency. This is done with a Type Extension.

## How do Type Extensions work?

Type Extensions are a combination of two features of TypeScript:

- Module Augmentation
- Declaration Merging

### Module Augmentation

Module Augmentation lets you add new type declarations as if they were defined in another module.

You can augment a module in any `.ts` file. First, import the module you want to augment. Then use the `declare module` syntax to declare it again with the new types.

For example, if you want to add a new `MyType` type to the `hardhat/types/network` module, you can do it like this:

```ts
import "hardhat/types/network";
declare module "hardhat/types/network" {
  export interface MyType {
    // ...
  }
}
```

Now, any code that imports `hardhat/types/network` has access to the `MyType` type.

### Declaration Merging

Declaration Merging happens when a module declares a type more than once. TypeScript merges the different properties of each declaration into a single one.

For example, if you have these two declarations in a single file:

```ts
interface MyType {
  propOne: number;
}

interface MyType {
  propTwo: number;
}
```

This is equivalent to having this:

```ts
interface MyType {
  propOne: number;
  propTwo: number;
}
```

### Combining both to extend an existing type

If you augment a module and then redeclare one of its existing types, TypeScript will merge the two declarations into a single one, effectively adding the properties of your new declaration to the original one.

For example, if you augment the `hardhat/types/network` module and then redeclare the `NetworkConnection` type like this:

```ts
import "hardhat/types/network";
declare module "hardhat/types/network" {
  export interface NetworkConnection {
    myProp: string;
  }
}
```

The `NetworkConnection` type will now have a `myProp` property everywhere it's used.

## Type extension vs runtime behavior

Type Extensions are exclusively a type-level concept. Adding a property to a type doesn't automatically add it to the values of that type at runtime.

Make sure your Type Extensions align with your plugin's actual behavior by adding any property at runtime as well. This is normally done with Hook Handlers.

In the example above, you'd need to hook into the `NetworkConnection` creation to add the `myProp` property to it.

## Loading your plugin's type extensions

To make TypeScript aware of your type extensions, import them in your plugin's index file. Normally, adding this import to your `index.ts` file is enough:

```ts
import "./type-extensions.js";
```

## Learn more

To learn more about how Module Augmentation and Declaration Merging work, read the [official TypeScript documentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
