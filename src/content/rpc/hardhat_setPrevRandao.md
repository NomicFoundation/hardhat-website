```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

await provider.request({
  method: "hardhat_setPrevRandao",
  params: [
    "0x1234567812345678123456781234567812345678123456781234567812345678",
  ],
});
```
