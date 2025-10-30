---
title: Version control of deployments
description: How to version control your deployments
sidebar:
  label: Versioning your deployments
  order: 8
---

Hardhat Ignition creates files for each deployment. The files are stored under the directory `./ignition/deployments/<DeploymentId>`. To understand the files created, please read our [Deployment artifacts](/ignition/docs/explanations/deployment-artifacts) guide.

If you want to store your deployments in version control, the recommended way is committing the entire `./ignition/deployments` directory.

Note that if you don't keep track of your deployments, you won't be able to extend your executed deployment by modifying your modules, so consider committing them.
