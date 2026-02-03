Modifies the balance of an account.

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_setBalance",
  params: ["0x0d2026b3EE6eC71FC6746ADb6311F6d3Ba1C000B", "0x1000"],
});
```
