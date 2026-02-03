```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_setNextBlockBaseFeePerGas",
  params: ["0x2540be400"], // 10 gwei
});
```
