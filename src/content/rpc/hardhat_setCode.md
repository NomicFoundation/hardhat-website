Modifies the bytecode stored at an account's address.

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_setCode",
  params: ["0x0d2026b3EE6eC71FC6746ADb6311F6d3Ba1C000B", "0xa1a2a3..."],
});
```
