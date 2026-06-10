:::tip[**Hardhat 2 is reaching end of life and is being replaced by Hardhat 3**]
Hardhat 3 is stable and production ready, and teams are already migrating.
Hardhat 2 will be upgraded to support the Glamsterdam hardfork and will continue
to receive bug fixes and security fixes until its **end of life** — the earlier
of the **Hegota mainnet activation** or the **1<sup>st</sup> of July 2027**.
After that, there will be no further Hardhat 2 releases.

**Plan your migration to Hardhat 3 now**.
:::

Hardhat 3 is stable and production ready: Solidity tests as first-class,
multi-chain support, a performant Rust-powered runtime via EDR. To support the
changing Node.js ecosystem, Hardhat 3 and its plugin system have been redesigned
to be ESM native.

Hardhat will always put stability first, which is why Hardhat 3 has spent the
last 9 months in beta: stabilizing the API, closing bugs and removing migration
friction for our Hardhat 2 users. Teams across the ecosystem are already moving
over, see our
[migration guide](https://hardhat.org/docs/migrate-from-hardhat2) to join
them (or our
[Foundry migration guide](https://hardhat.org/docs/migrate-from-foundry)
for projects coming across).

## Hardhat 2 end of life

We are introducing an **end of life** policy for Hardhat 2, as the Node.js
ecosystem moves beyond the CommonJS module system it uses.

Hardhat 2 will be upgraded to support the **Glamsterdam** hardfork and will
continue to receive bug fixes and security fixes until it reaches end of life.
It will **not** be upgraded to the **Hegota** hardfork or any of its EIPs.

Hardhat 2 will reach **end of life** on whichever date comes first between:

- the activation of **the Hegota hardfork** on Ethereum mainnet
- the **1<sup>st</sup> of July 2027**, if Hegota is delayed

After that date, no further releases should be expected, including for security
fixes. If you haven't started yet, now is the time to plan your move to
Hardhat 3. The
[Hardhat 2 migration guide](https://hardhat.org/docs/migrate-from-hardhat2)
walks you through the upgrade in just a few easy steps, and we are rolling out
an agent skill soon which can migrate most of your repository automatically.
