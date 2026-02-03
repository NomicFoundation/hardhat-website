Writes a single storage position of an account.

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_setStorageAt",
  params: [
    "0x0d2026b3EE6eC71FC6746ADb6311F6d3Ba1C000B",
    "0x0",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
});
```
