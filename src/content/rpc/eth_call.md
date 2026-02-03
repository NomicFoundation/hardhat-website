Executes a new message call immediately without creating a transaction on the blockchain. This can be used to simulate a transaction.

Supports an optional state override object to modify the chain state before execution.

```typescript
import hre from "hardhat";

const { provider } = await hre.network.connect();

const result = await provider.request({
  method: "eth_call",
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

You can also use a state override object to modify the state during the call:

```typescript
const result = await provider.request({
  method: "eth_call",
  params: [
    {
      from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      to: "0x4b23ad35Da73fEe8154CDc8b291c814028A4E743",
      data: "0xc0129d43",
    },
    "latest",
    {
      "0x6eE6DE5a56910E5353933761305AEF6a414d97BA": {
        balance: "0xde0b6b3a7640000",
        nonce: "0x123",
        stateDiff: {
          "0x0000000000000000000000000000000000000000000000000000000000000002":
            "0x000000000000000000000000000000000000000000000000000000000000000c",
        },
      },
    },
  ],
});
```
