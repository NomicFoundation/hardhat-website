Allows sending transactions from the specified address without needing access to its private key. Works with both EOAs and contract addresses.

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_impersonateAccount",
  params: ["0x364d6D0333432C3Ac016Ca832fb8594A8cE43Ca6"],
});
```
