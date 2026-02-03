Traces the execution of an `eth_call` within the context of a specific block's execution. See [Geth's documentation](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-debug#debugtracecall) for more info.

Arguments:

- transaction object
- blockTag: optional, default value is `"latest"`
- traceConfig: optional object with the following properties:
  - disableMemory: optional boolean, default value is false
  - disableStack: optional boolean, default value is false
  - disableStorage: optional boolean, default value is false

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

const result = await provider.request({
  method: "debug_traceCall",
  params: [
    {
      from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      to: "0x4b23ad35Da73fEe8154CDc8b291c814028A4E743",
      data: "0xc0129d43",
    },
    "latest",
  ],
});
```

You can also pass a `traceConfig` object to disable certain properties:

```typescript
const trace = await provider.request({
  method: "debug_traceCall",
  params: [
    {
      from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      to: "0x4b23ad35Da73fEe8154CDc8b291c814028A4E743",
      data: "0xc0129d43",
    },
    "latest",
    {
      disableMemory: true,
      disableStack: true,
      disableStorage: true,
    },
  ],
});
```
