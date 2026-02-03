Get debug traces of already-mined transactions.

Arguments:

- transactionHash
- traceConfig: optional object with the following properties:
  - disableMemory: optional boolean, default value is false
  - disableStack: optional boolean, default value is false
  - disableStorage: optional boolean, default value is false

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

const trace = await provider.request({
  method: "debug_traceTransaction",
  params: ["0x123..."],
});
```

You can also pass a `traceConfig` object to disable certain properties:

```typescript
const trace = await provider.request({
  method: "debug_traceTransaction",
  params: [
    "0x123...",
    {
      disableMemory: true,
      disableStack: true,
      disableStorage: true,
    },
  ],
});
```
