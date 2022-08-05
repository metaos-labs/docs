# Run a Node

### Start node

```bash
metaosd start --json-rpc.enable=true --json-rpc.api="eth,web3,net"
```

### Key Management

Recover a key from a mnemonic
```bash
echo "your mnemonic here" | metaosd keys add $KEY --recover
```

You can generate a new key/mnemonic with:
```bash
metaosd keys add $KEY
``` 

To export your MetaOS key as an Ethereum private key (for use with Metamask for example):

```bash
metaosd keys unsafe-export-eth-key $KEY
```

For more about the available key commands, use the `--help` flag

```bash
metaosd keys -h
```

### Clearing data from chain
#### Reset Data
Alternatively, you can reset the blockchain database, remove the node's address book files, and reset the `priv_validator.json` to the genesis state.

First, remove the outdated files and reset the data.
```bash
rm $HOME/.metaos/config/addrbook.json $HOME/.metaos/config/genesis.json
metaosd tendermint unsafe-reset-all --home $HOME/.metaos
```

Your node is now in a pristine state while keeping the original `priv_validator.json` and `config.toml`. If you had any sentry nodes or full nodes setup before, your node will still try to connect to them, but may fail if they haven't also been upgraded.

#### Delete Data
Data for the metaosd binary should be stored at ~/.metaos, respectively by default. To **delete** the existing binaries and configuration, run:
```bash
rm -rf ~/.metaos
```

To clear all data except key storage (if keyring backend chosen) and then you can rerun the full node installation commands from above to start the node again.