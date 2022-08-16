# MetaOS Bridge

MetaOS provides a `TokenBridge` to transfer assets between MetaOS chain and Ethereum chain, so that users can safely and conveniently transfer MetaOS assets(`NativeDenom` or `CW20`) to Ethereum(`WrappedERC20`) or transfer Ethereum `ERC20` token to MetaOS(`WrappedDenom`).

MetaOS Bridge is implemented by [Wormhole](https://github.com/certusone/wormhole) open source protocol. Unlike the [official wormhole](https://wormhole.com/) [bridge](https://www.portalbridge.com),only `MetaOS` chain and `Ethereum` chain has joined our network(maybe more other blockchains would be joined in future).The operating parameters and guardian set of `MetaOS` wormhole network are also different from the official. Refer to the public information on the [Official WebSite](waiting for supplying) for details.

If you want to learn more about `Wormhole` protocol, just read the [Official Document of Wormhole](https://docs.wormhole.com/wormhole/).

### Supporting Assets: 

- `NativeDenom` of MetaOS
- `CW20 token` of MetaOS
- `ERC20 token` of Ethereum

### Un-Supporting Assets:

- all `NFT` assets
- other assets

### The form of assets

**After being transferred**:
- All assets of MetaOS transferred are locked in `token-brdige` contract address, and corresponding `WrappedERC20` assets are minted to Ethereum recipient account.
- All ERC20 tokens of ethereum transferred are locked in `token-bridge` contract address, and corresponding `WrappedDenom` assets are minted to MetaOS recipient account.

**After being transferred back**:
- All `WrappedERC20` assets which source from MetaOS are burned from Ethereum sender account, and corresponding original assets of MetaOS are unlocked to recipient account.
- All `WrappedDenom` assets which source from Ethereum are burned from MetaOS sender account, and corresponding original `ERC20` assets of Ethereum are unlocked to recipient account.


