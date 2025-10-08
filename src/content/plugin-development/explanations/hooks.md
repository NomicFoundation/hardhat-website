---
title: Hooks and Hook Handlers
description: An explanation about Hardhat 3's Hooks and Hook Handlers
---

# Hooks and Hook Handlers

- Intro: Hardhat 3 can be extending using its Hooks system.

- What's a Hook
- What's a Hook Handler
- When are Hook handlers run?

  - When Hardhat or a plugin executes something with potential for extensibilyt, it doesn't run the code directly, but defines a Hook instead, and runs it.

  - To understand how they are run, read the lifecycle of a hook handler.

- Different types of hooks

  - Chained Hooks
  - Sequential Hooks
  - Parallel Hooks

- Hook Context

- Config Hooks are an exception, because they don't have access to the Hook Context

- Dynamic Hook Handlers
