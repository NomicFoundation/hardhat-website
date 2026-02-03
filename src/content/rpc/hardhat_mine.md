Mine any number of blocks at once, in constant time.

Arguments:

- count: number of blocks to mine (default: 1)
- interval: timestamp interval between blocks in seconds (default: 1)

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

// Mine 256 blocks
await provider.request({
  method: "hardhat_mine",
  params: ["0x100"],
});

// Mine 1000 blocks with 1-minute intervals between each
await provider.request({
  method: "hardhat_mine",
  params: ["0x3e8", "0x3c"],
});
```
