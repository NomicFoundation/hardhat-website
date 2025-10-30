---
title: Cookbook
description: Cookbook
sidebar:
  order: 9
---

This section contains a collection of recipes for common tasks.

We encourage you to contribute your own recipes to this section, by submitting a pull request to this [document](https://github.com/NomicFoundation/hardhat-website/edit/main/src/content/docs/docs/guides/cookbook.md).

## Using Hardhat 3 with a proxy server

Hardhat supports the `http_proxy` environment variable. When this variable is set, Hardhat will send its requests through the given proxy for things like JSON-RPC requests, mainnet forking and downloading compilers.

There's also support for the `no_proxy` variable, which accepts a comma separated list of hosts or `"*"`. Any host included in this list will not be proxied. Note that requests to `"localhost"` or `"127.0.0.1"` are never proxied.
