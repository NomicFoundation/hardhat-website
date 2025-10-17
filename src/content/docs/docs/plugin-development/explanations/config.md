---
title: Config system
description: An explanation about the Hardhat 3 config system and how to extend it
sidebar:
  order: 4
---

Hardhat has a flexible and extensible configuration system. This document explains how it works and how to extend it.

## User vs resolved config

At its core, a Hardhat config is just a JavaScript object. While we usually talk about the Hardhat config as a single concept, there are actually two types of config objects:

- **User config**: This is the config object that the user defines. It is represented by the `HardhatUserConfig` type. This config contains optional fields and can accept values in different formats. For example, a field could accept a `string`, a `number`, or be undefined.
- **Resolved config**: This is the config object that Hardhat uses internally. It is represented by the `HardhatConfig` type. This config is always complete, and all its values are in a canonical format. For example, that same field would always be a `number` in the resolved config, using a default value if needed.

## The config initialization process

A user config is converted into a resolved config in three phases:

1. **Loading the user config**: The user config is loaded from a file or received as an object.
2. **Validating the user config**: The user config is checked to ensure that its structure and values are correct.
3. **Resolving the config**: The user config is transformed into a resolved config object.

## Extending the config

Each of the three phases in the initialization process can be extended using [Hooks](/docs/plugin-development/explanations/hooks). While each phase can be extended independently, in practice most use cases will fall into one of the following two categories:

- Hook into the loading phase to extend the user config
- Hook into both the validation and resolution phases to add new settings to the config

### Extending the user config

By default, the user config object is the same as the one provided by the user. However, you can modify it during the loading phase using the `HardhatConfigHooks#extendUserConfig` Hook. This Hook is used when you want to add default values to _existing_ config settings. In this case, you can add the default values to the user config and let the rest of Hardhat resolve them, instead of resolving them yourself. For example, you can use this to ensure that a network config is always defined.

### Adding new settings to the config

The other main use case is adding new settings to the config. This involves both extending the config types and hooking into the validation and resolution phases.

#### Extending the config types

To add new settings to the config, you need to extend the config types. Since there are two types of config (user and resolved), you need to extend both: the user config and the resolved config.

For new top-level options, this means extending the `HardhatUserConfig` and `HardhatConfig` types. But it's also possible to extend nested options without having to redefine the entire config structure. For example, you can extend the `NetworkUserConfig` and `NetworkConfig` types to add new options to network configs.

You can learn more about type extensions in [this explanation](/docs/plugin-development/explanations/type-extensions).

#### Extending the validation

Once you've extended the config types, you can hook into the validation phase using the `HardhatConfigHooks#validateUserConfig` [Hook](/docs/plugin-development/explanations/hooks#whats-a-hook). This Hook is used when you want to validate the values of _new_ options. In this case, you need to validate them yourself, since Hardhat doesn't know about them. For example, you can use this to ensure that a numeric setting is within a certain range or that a string setting matches a specific format.

When validating the user config, the [Hook Handler](/docs/plugin-development/explanations/hooks#whats-a-hook-handler) should only check the values of your plugin's settings. You don't need to re-validate the existing settings, since other registered Hook Handlers will take care of that.

#### Extending the resolution

You can hook into the resolution phase by adding a handler to the `HardhatConfigHooks#resolveConfig` Hook. The job of this handler is to return a new `HardhatConfig` where all your plugin's settings have been added to the resolved config. Keep in mind that Hardhat won't do this for you, even if the settings are mandatory in the user config.

The resolution phase can be used to transform the user-provided values into their canonical format and to add default values for settings that the user didn't provide.

## Configuration Variables

The config system has support for Configuration Variables, which are a way to refer to values that the user shouldn't set directly in the config file. Instead, these values are loaded at runtime when needed.

When adding new settings to the config, you can define them to accept configuration variables. Use the `ConfigurationVariable` type in the user config type and resolve them using the `resolveConfigurationVariable` function received by your Hook Handler.

To learn more about how configuration variables are loaded and used, read the [lifecycle explanation](/docs/plugin-development/explanations/lifecycle#configuration-variables-lifecycle).
