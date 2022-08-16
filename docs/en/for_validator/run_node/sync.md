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
{
  "NodeInfo":
  {
    "protocol_version":
    {
      "p2p": "8",
      "block": "11",
      "app": "0"
    },
    "id": "a6b231498ad9ee4ea0c38dd83684a752a87c82f0",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "metaos_99237-1",
    "version": "0.34.19",
    "channels": "40202122233038606100",
    "moniker": "mynode",
    "other":
    {
      "tx_index": "on",
      "rpc_address": "tcp://0.0.0.0:26657"
    }
  },
  "SyncInfo":
  {
    "latest_block_hash": "2D15A083EFE7F52F7F601DC4834210FF0D2D65837DAD1B89E7379EC753492FC3",
    "latest_app_hash": "30A6F61A4CDCAA4929849B4826FA6DD0A95186E4CD18FBB5C8ECB7878887F89D",
    "latest_block_height": "430135",
    "latest_block_time": "2022-08-15T02:42:45.411875236Z",
    "earliest_block_hash": "F9A1B0DF7CA526BD032E145ABD777098158CB35B5A8505EE98E8F6D3B0172D66",
    "earliest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "earliest_block_height": "1",
    "earliest_block_time": "2022-07-29T04:20:36.8705157Z",
    "catching_up": false
  },
  "ValidatorInfo":
  {
    "Address": "D878EABC94C9CFFE5999B7D20857AE2985C69422",
    "PubKey":
    {
      "type": "tendermint/PubKeyEd25519",
      "value": "STAG+dzw9eYKWCnCMKsxu5Br+x9gVEPtB6UlUeEtcHk="
    },
    "VotingPower": "0"
  }
}
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

If you have an address book downloaded, you may keep it. Otherwise, you will need to download the [appropriate addressbook](join-a-network.mdoin-a-public-network).

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
If you are a validator, continue to [manage a MetaOS validator](../../full_node/manage-a-validator/README.md) for the next steps.
