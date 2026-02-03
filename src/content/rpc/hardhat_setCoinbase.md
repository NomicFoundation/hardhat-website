Sets the coinbase address used in new blocks.

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_setCoinbase",
  params: ["0x0d2026b3EE6eC71FC6746ADb6311F6d3Ba1C000B"],
});
```
