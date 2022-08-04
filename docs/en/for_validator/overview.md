# Overview

### Introduction

MetaOS is based on [Tendermint Core](https://github.com/tendermint/tendermint/blob/master/docs/introduction/what-is-tendermint.md), which relies on a set of validators that are responsible for committing new blocks in the blockchain. These validators participate in the consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key.

Validator candidates can bond their own staking tokens and have the tokens "delegated", or staked, to them by token holders. The MTOS is MetaOS's native token. At its onset, MetaOS will launch with 21 validators. The validators are determined by who has the most stake delegated to them - the top 21 validator candidates with the most stake will become MetaOS validators.

Validators and their delegators will earn MTOS as block provisions and tokens as transaction fees through execution of the Tendermint consensus protocol. Initially, transaction fees will be paid in MetaOS but in the future, any token in the Cosmos ecosystem will be valid as fee tender if it is whitelisted by governance. Note that validators can set commission on the fees their delegators receive as additional incentive.

If validators double sign, are frequently offline or do not participate in governance, their staked MTOS (including MTOS of users that delegated to them) can be slashed. The penalty depends on the severity of the violation.

### Hardware

There currently exists no appropriate cloud solution for validator key management. This may change when cloud SGX becomes more widely available. For this reason, validators must set up a physical operation secured with restricted access. A good starting place, for example, would be co-locating in secure data centers.

Validators should expect to equip their datacenter with redundant power, connectivity, and storage backups. Having several redundant networking boxes for fiber, firewall and switching is recommended, as well as small servers with redundant hard drive and failover.

We anticipate that network requirements will be low initially. The current testnet requires minimal resources. Bandwidth, CPU and memory requirements will rise as the network grows. Large hard drives are recommended for storing complete blockchain histories.

### Supported OS

We officially support macOS, Windows and Linux only in the following architectures:

- `darwin/arm64`
- `darwin/x86_64`
- `linux/arm64`
- `linux/x86_64`
- `windows/x86_64`

### Minimum Requirements

To run mainnet or testnet validator nodes, you will need a machine with the following minimum hardware requirements:

- 4 or more physical CPU cores
- At least 500GB of SSD disk storage
- At least 32GB of memory (RAM)
- At least 100mbps network bandwidth

As the usage of the blockchain grows, the server requirements may increase as well, so you should have a plan for updating your server as well.

### Get Involved

Set up a dedicated validator's website, social profile (eg: Twitter) and signal your intention to become a validator on Discord. This is important since users will want to have information about the entity they are staking their MTOS to.