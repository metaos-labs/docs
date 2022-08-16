# Join a network

It is highly recommended that you set up a private local network before joining a public network. 
This will help you get familiar with the setup process, and provide an environment for testing. 
The following sections outline this process. 
If you want to join a public network without setting up a private network, 
you can skip to [join a public network ](#join-a-public-network).

## Set up a local private network

Validators can set up a private MetaOS network to become familiar with running a full MetaOS node before joining a public network.

### Create a single node

The simplest MetaOS network you can set up is a local testnet with just a single node. In a single-node environment, you have one account and are the only validator signing blocks for your private network.

1. Initialize your genesis file that will bootstrap the network. Replace the following variables with your own information:

   ```bash
   metaosd init --chain-id=<testnet-name> <node-moniker>
   ```

2. Generate a MetaOS account. Replace the variable with your account name:

   ```bash
   metaosd keys add <account-name>
   ```

> #### Get tokens
> **Tip**:
> 
> In order for `metaosd` to recognize a wallet address, it must contain tokens. 
> For the testnet, use [the faucet](https://faucet.metaos.im/) to send MTOS to your wallet. 
> If you are on mainnet, send funds from an existing wallet. 1-3 MTOS are sufficient for most setup processes.

### Add your account to the genesis

Run the following commands to add your account and set the initial balance:

```bash
metaosd add-genesis-account $(metaosd keys show <account-name> -a) 100000000umtos
metaosd gentx <my-account> 10000000umtos --chain-id=<testnet-name>
metaosd collect-gentxs
```

### Start your private MetaOS network

Run the following command to start your private network:

```bash
metaosd start
```

If the private MetaOS network is set up correctly, your `metaosd` node will be running on `tcp://localhost:26656`, listening for incoming transactions, and signing blocks.

## Join a public network

These instructions are for setting up a brand new full node from scratch. You can join a public MetaOS network, such as the mainnet or testnet, by completing the following steps:

### 1. Select a network

Specify the network you want to join by choosing the corresponding **genesis file** and **seeds**:

| Network     | Type    | Genesis                                                                                           | Addressbook                     | Seeds                     |
| :---------- | :------ | :------------------------------------------------------------------------------------------------ | :------------------------------ | :------------------------ |
| `main-1`    | Mainnet | [not available yet]                                                                               |  [not available yet]            | [not available yet]       |
| `test-1`    | Testnet | [not available yet]                                                                               |  [not available yet]            | [not available yet]       |

### 2. Download genesis file and address book

**Genesis-transaction** specifies the account balances and parameters at the start of the network to use when replaying transactions and syncing.

**Addressbook** lists a selection of peers for your node to dial to in order to discover other nodes in the network. Public address books of peers are made available by the MetaOS community.

Choose a `testnet` or `mainnet` address type and download the appropriate genesis-transaction and address-book. Links to these are posted in [Select-a-network](#1-select-a-network).

- For default `metaosd` configurations, the `genesis` and `addressbook` files should be placed under `~/.metaos/config/genesis.json` and `~/.metaos/config/addrbook.json` respectively.

Continue to the [Sync](sync.md) page to find out more about syncing your node.