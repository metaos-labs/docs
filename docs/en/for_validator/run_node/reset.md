# Reset

## Complete reset

Occasionally you may need to perform a complete reset of your node due to data corruption or misconfiguration. 
Resetting will remove all data in `~/.metaos/data` and the addressbook in `~/.metaos/config/addrbook.json` and reset the node to genesis state.

To perform a complete reset of your `metaosd` state, use:

```
metaosd tendermint unsafe-reset-all
```

Running this command successfully will produce the following log:

```
[ INF ] Removed existing address book file=/home/user/.metaos/config/addrbook.json
[ INF ] Removed all blockchain history dir=/home/user/.metaos/data
[ INF ] Reset private validator file to genesis state keyFile=/home/user/.metaos/config/priv_validator_key.json stateFile=/home/user/.metaos/data/priv_validator_state.json
```

> #### Check the adressbook
> **Tip**:
> After resetting, make sure the addressbook contains peer addresses and is in the correct spot. 
> If not, [download an adressbook](join-a-network.md#1-select-a-network) and place it in `~/.metaos/config/`.

### Change Genesis

To change the genesis version, delete `~/.metaos/config/genesis.json`.

You can recreate a genesis version via the following steps:

```bash
 metaosd add-genesis-account $(metaosd keys show <account-name> -a) 100000000umtos,1000usd
 metaosd gentx <account-name> 10000000umtos --chain-id=<network-name>
 metaosd collect-gentxs
```

### Reset personal data

> **Danger**:
> 
> You may be unable to use your node and its associated accounts after changing your personal data. 
> Do not perform this action unless your node is disposable.

To change your personal data to a pristine state, delete both `~/.metaos/config/priv_validator_state.json` and `~/.metaos/config/node_key.json`.

### Node health

A healthy node will have the following files in place and populated:

- Addressbook `~/.metaos/config/addrbook.json`
- Genesis file `~/.metaos/config/genesis.json`
- Validator state `~/.metaos/config/priv_validator_state.json`
- Node key `~/.metaos/config/node_key.json`

### Re-sync

You can proceed to [re-sync manually](sync.md#sync-from-genesis) or [using a snapshot](sync.md#quicksync).