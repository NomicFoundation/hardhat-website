---
title: Hardhat plugin development
description: How to extend and customize Hardhat's behavior using plugins
---

<!--

Personas:
  - New plugin author without context
  - HH2 plugin author
  - Existing HH3 plguin author with advanced needs
  - An advanced HH3 user wanting to learn more about it

WIP outlines:

- Intro to what's a plugin
  - What can a plugin do / functional high-level overview
  - How plugins are architectured / High-level technical overview (a plugin is just an object...)
    - lifecycle of a plugin
      - lazy loading modules of the plugin
    - Exension primitives: hooks and tasks
  - Builtin plugins
    - minimal core
    - builtin plugins
    - official plugins
    - community plugins
  - What's next
- Tutorial
  - Idea: basic plugin that extends the network connection, the config, and adds a task.
  - Writing a first hook
    - Types of hooks (chained vs non chained)
    - category of hooks (config is a special case)
    - Which one to use in the tutorial?
  - Writing a task
    - Basic example task
    - Override task
  - plugin dependencies
  - typescript extensions
  - npm dependencies
  - Best practices (if needed)
- publishing/distributing plugins
  - Adding it to the list of plugins
- prototyping a plugin
- testing a plugin
- migrating a plugin from Hardhat 2
- Reference:
  - api
  - hooks
  - Dynamic hooks
  - User interruptions
- extending other plugins

- Documenting your plugin
  - Adding it to the list of plugins
- Getting support
  - Plugin author's tg

[ ] Link this section from the list of plugins

-->

# Hardhat plugin development guide

TODO
