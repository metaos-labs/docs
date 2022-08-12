# Sync

Use this guide to [sync the chain from from genesis](#sync-from-genesis) or use a [snapshot](#sync-from-snapshot) for a quicker sync.

## Sync from genesis

After [choosing a network](join-a-network.md#join-a-public-network), start the sync and check that everything is running smoothly:

```bash
metaosd start
metaosd status
# It will take a few seconds for metaosd to start.
```
Your node is now syncing. This process will take a long time. Make sure you've set it up on a stable connection so this process is not interrupted.

> #### Sync start times
> **Caution**:
> 
> Nodes take at least an hour to start syncing. This wait time is normal. 
> Before troubleshooting a sync, please wait an hour for the sync to start.
 
**Healthy Node Status Example**:

```json
wait for supplying...
```

Proceed to the [](#monitor-the-sync) section.

### Fast-sync for testing

Sometimes you may want to sync faster by foregoing checks.

> **Warning**
> 
> The following command should only be used by advanced users in non-production environments:
> ```bash
> metaosd start --x-crisis-skip-assert-invariants
> ```

## Sync from snapshot

You can significantly accelerate the synchronization process by providing `metaosd` with a recent snapshot of the network state. 
Snapshots are made publicly available by members of the MetaOS community. Currently, no snapshots available.

### Before using snapshots

Certain files will need to be absent or deleted before downloading a snapshot. 
A quicksync replaces blockchain data with a custom snapshot. 
For most use cases a "pruned" version is adequate. 
Pruned versions will have certain transactions removed from the archive to improve node performance. 
If you are running a node for archival purposes, you will want an `archive` or `default` download.

After choosing the appropriate download type, examine your node and ensure that `.metaos/data` is empty.

**Example**:

```bash
6:22PM INF Removed all blockchain history dir=/home/ubuntu/.metaos/data
```

> **Warning**:
> 
> If you are a validator, ensure that you do not remove your private key.
> 
> Example of a removed private key:
> 
> ```bash
> 6:22PM INF Reset private validator file to genesis state keyFile=/home/ubuntu/.metaos/config/priv_validator_key.json stateFile=/home/ubuntu/.metaos/data/priv_validator_state.json
> ```

If you have an address book downloaded, you may keep it. Otherwise, you will need to download the [appropriate addressbook](./join-a-network.md#join-a-public-network).

With an address book downloaded, run the following:

```bash
metaosd start
metaosd status
# It will take a few seconds for metaosd to start.
```

## Monitor the sync

Your node is catching up with the network by replaying all the transactions from genesis and recreating the blockchain state locally. 
You can verify this process by checking the `latest_block_height` in the `SyncInfo` of the `metaosd status` response:

```json
  {
    "SyncInfo": {
        "latest_block_height": "42", <-----
        "catching_up"        : true
    },
  ...
  }
```

Compare this height to the **Latest Blocks** by checking the API for the latest block heights on [LCD](https://node.metaos.im/blocks/latest) to see your progress.



## Sync complete

You can tell that your node is in sync with the network when `SyncInfo.catching_up` in the `metaosd status` response returns `false` and the `latest_block_height` corresponds to the public network blockheight found on the API for [LCD](https://node.metaos.im/blocks/latest).

```bash
metaosd status
```

**Example**:

```json
  {
    "SyncInfo": {
        "latest_block_height": "7356350",
        "catching_up"        : false
    },
  ...
  }
```


## Congratulations!

You've successfully joined a network as a full node operator. 
If you are a validator, continue to [manage a MetaOS validator](../manage-a-validator/README.md) for the next steps.
