---
title: Config system
description: An explanation about the Hardhat 3 config system and how to extend it
---

# Config system

- Hardhat has a flexible config system

  - Configs are just an object, not a file

- Config types split: User types vs resolved types

- The config system is extensible

  - What does it mean to extend them?

    - Customizing the config loading process
    - Extending the config types

- Config loading process

  - user config is loaded from a file or as an object

  - HardhatUserConfig extension: HardhatConfigHooks#extendUserConfig — Used when you want to add default values to the user config and let the rest of Hardhat resolve it, instead of resolving them yourself. For example, ensuring that a network config is always defined.

  - HardhatUserConfig validation

  - Config resolution: HardhatUserConfig -> HardhatConfig

- Extending the config types

  - The config types are split into user and resolved types, and multiple interfaces for each of them. For example, the `NetworkUserConfig` and `NetworkConfig` interfaces.

  - This allows you to extend any part of the config, instead of just the top-level types.

  - To read more about type extensions...

- Configuration Variables
  - What are they? How they are used?
  - Link to lifecycle
