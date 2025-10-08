---
title: Config system
description: An explanation about the Hardhat 3 config system and how to extend it
---

# Config system

Hardhat has a flexible and extensible configuration system. This document explains how it works and how to extend it.

## User vs resolved config

At its core, a Hardhat config is just a JavaScript object. While we usually talk about the Hardhat config as a single concept, there are actually two types of config objects:

- **User config**: This is the config object that the user defines. It is represented by the `HardhatUserConfig` type. This config can be incomplete, and it can contain values in different formats. For example, a field could accept a string or a number, and it could be optional.
- **Resolved config**: This is the config object that Hardhat uses internally. It is represented by the `HardhatConfig` type. This config is always complete, and all its values are in a canonical format. For example, that same field would always be a number in the resolved config, and it would use a default value if the user didn't provide one.

## The config initialization process

A user config is converted into a resolved config in three phases:

1. **Loading the user config**: the user config is loaded from a file or received as an object.
2. **Validating the user config**: the user config is checked to ensure that its structure and values are correct.
3. **Resolving the config**: the user config is transformed into the resolved config format.

## Extending the config

Each of the three phases in the initialization process can be extended using [hooks](./hooks.md). While each phase can be extended independently, in practice most use cases will fall into one of the following two categories:

- Hook into the loading phase to extend the user config
- Hook into both the validation and resolution phases to add new settings to the config

### Extending the user config

By default the user config object is the same as the one provided by the user. However, you can modify it during the loading phase using the `HardhatConfigHooks#extendUserConfig` hook. This hook is used when you want to add default values to _existing_ options. In this case, you can add the default values to the user config and let the rest of Hardhat resolve it, instead of resolving them yourself. For example, you can use this to ensure that a network config is always defined.

### Adding new settings to the config

The other main use case is adding new settings to the config. This involves both extending the config types and hooking into the validation and resolution phases.

#### Extending the config types

To add new settings to the config, you need to extend the config types. Since there are two types of config (user and resolved), you need to extend two types: the one corresponding to the user config, and another one corresponding to the resolved config.

For new top-level options, this means extending the `HardhatUserConfig` and `HardhatConfig` types. But it's also possible to extend nested options without having to redefine the entire config structure. For example, you can extend the `NetworkUserConfig` and `NetworkConfig` types to add new options to network configs.

You can learn more about type extensions in [this explainer](./type-extensions.md).

#### Extending the validation

Once you've extended the config types, you can hook into the validation phase using the `HardhatConfigHooks#validateUserConfig` hook. This hook is used when you want to validate the values of _new_ options. In this case, you need to validate them yourself, since Hardhat doesn't know about them. For example, you can use this to ensure that a numeric setting is within a certain range, or that a string setting matches a specific format.

When validating the user config, the hook handler should only check the values of your plugin's settings. You don't need to re-validate the existing settings, since other registered hook handlers will take care of that.

#### Extending the resolution

You hook into the resolution phase by adding a handler to the `HardhatConfigHooks#resolveConfig` hook. The job of this handler is to return a new `HardhatConfig` where all your plugin's settings have been added to the resolved config. Keep in mind that Hardhat won't do this for you, even if the settings are mandatory in the user config.

The resolution phase can be used to transform the user-provided values into their canonical format, and to add default values for settings that the user didn't provide.

## Configuration Variables

The config system has support for Configuration Variables, which are a way to refer to values that the user shouldn't set directly in the config file. Instead, these values are loaded in runtime when needed.

When adding new settings to the config, you can define them to accept configuration variables. This is done by using the `ConfigurationVariable` type in the user config type.

To learn more how configuration variables are loaded and used, read the [lifecycle explainer](./lifecycle.md#configuration-variables-lifecycle).
