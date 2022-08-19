# Overview

### Introduction

The tasks in this section describe how to set up a MetaOS validator.
While setting up a rudimentary validating node is easy, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

The MetaOS core is powered by the Tendermint consensus.
Validators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain.
Validators can cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake.
The top 21 validators make up the **Active Validator Set** and are the only validators that sign blocks and receive revenue.

Validators and their delegators earn the following rewards:

- **Gas**: Fees added on to each transaction to avoid spamming and pay for computing power. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold.

- **Other rewards?**: wait for supplying...

Validators can set commissions on the fees they receive as an additional incentive.

If validators double sign, are frequently offline, or do not participate in governance, their staked MTOS (including MTOS of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.

### System Configuration

> #### Recommended operating systems
>
> Caution:This guide has been tested against Linux distributions only.
> To ensure a successful production environment setup, consider using a Linux system.

Running a full MetaOS node is a resource-intensive process that requires a persistent server.

If you want to use MetaOS without downloading the entire blockchain, use [MetaOS Wallet](https://wallet.metaos.im/).
If you want to set up a local, WASM-enabled, private testnet for smart contracts, visit [install LocalMetaOS](../../develop/localmetaos/README.md).

#### Hardware Requirements

The minimum requirements for running a MetaOS full node are:

| Network                                                               | CPU cores      | RAM   | Disk                       | BANDWIDTH |
| --------------------------------------------------------------------- | -------------- | ----- | -------------------------- | --------- |
| [`main-1`](join-a-network.md#join-a-public-network)                   | 4 (+4 threads) | 32 GB | 2 TB (SSD 2000 MB/s R/W)   | 300 Mbps  |
| [`test-1`](join-a-network.md#join-a-public-network)                   | 2 (+2 threads) | 16 GB | 500 GB (SSD 1000 MB/s R/W) | 150 Mbps  |
| [`localmetaos`]()                                                     | 2              | 4 GB  | 20 GB (SSD 500 MB/s R/W)   | N/A       |
| [`private-network`](join-a-network.md#set-up-a-local-private-network) | 1              | 2 GB  | 20 GB (SSD 500 MB/s R/W)   | N/A       |

> #### Storage requirements
>
> Warning:
> As the network grows, the minimum hardware requirements will also grow.
> It is recommended that you monitor the system, so you can prevent it from running out of resources.

#### Prerequisites

- [Golang v1.18+ linux/amd64](https://go.dev/dl/)

  > #### Installing Go for MacOS & Linux
  >
  > Go releases can be found here: [ https://go.dev/dl/ ](https://go.dev/dl/)
  >
  > In your browser, you can right-click the correct release (V1.18) and `Copy link`.
  >
  > ```bash
  > # 1. Download the archive
  > wget https://go.dev/dl/go1.18.2.linux-amd64.tar.gz
  > # Optional: remove previous /go files:
  > sudo rm -rf /usr/local/go
  > # 2. Unpack:
  > sudo tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz
  > # 3. Add the path to the go-binary to your system path:
  > # (for this to persist, add this line to your ~/.profile or ~/.bashrc or  ~/.zshrc)
  > export PATH=$PATH:/usr/local/go/bin
  > # 4. Verify your installation:
  > go version
  > # go version go1.18.2 linux/amd64
  > ```

- Linux users: `sudo apt-get install -y build-essential`

### Commonly used ports

`metaosd` uses the following TCP ports. Toggle their settings to match your environment.

Most validators will only need to open the following port:

- `26656`: The default port for the P2P protocol. This port is used to communicate with other nodes and must be open to join a network. However, it does not have to be open to the public. For validator nodes, [configuring `persistent_peers`](run_node/additional-settings.md#persistent_peers) and closing this port to the public are recommended.

Additional ports:

- `26660`: The default port for interacting with the [Prometheus](https://prometheus.io) database, which can be used to monitor the environment. In the default configuration, this port is not open.

- `26657`: The default port for the RPC protocol. Because this port is used for querying and sending transactions, it must be open for serving queries from `metaosd`.

> #### Warning:
>
> Do not open port `26657` to the public unless you plan to run a public node.