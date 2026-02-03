Modifies an account's nonce. The new nonce must be greater than the existing one to avoid transaction collisions.

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_setNonce",
  params: ["0x0d2026b3EE6eC71FC6746ADb6311F6d3Ba1C000B", "0x21"],
});
```
