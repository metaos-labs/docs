# Additional Settings

> ### Tip:
> 
> For more information on seeds and peers, visit the [Tendermint documentation](https://github.com/tendermint/tendermint/blob/master/docs/tendermint-core/using-tendermint.md#peers).
> 
> You can also find more useful information from [here](https://docs.tendermint.com/master/nodes/configuration.html#p2p-settings).

### seed_mode

In seed mode, your node constantly crawls the network and looks for peers. 
If another node requests addresses, it responds and disconnects. 
Seed mode will not work if the peer-exchange reactor is disabled.

Edit the following settings in `config.toml`.

```toml
seed_mode = true
pex = true
```

### seeds

To manually identify seed nodes, edit the following setting in `config.toml`.

```toml
# Comma separated list of seed nodes to connect to
seeds = "id100000000000000000000000000000000@1.2.3.4:26656,id200000000000000000000000000000000@2.3.4.5:4444"
```

### persistent_peers

The nodes you specify are the trusted persistent peers that can help anchor your node in the p2p network. 
If the connection fails, they are dialed and automatically redialed for 24 hours. 
The automatic redial functionality uses exponential backoff and stops after 24 hours of trying to connect.

If the value of `persistent_peers_max_dial_period` is more than zero, the pause between each call to each persistent peer will not exceed `persistent_peers_max_dial_period` during exponential backoff, and the automatic redial process continues.

```toml
# Comma-separated list of nodeid@ip:port values that define a list of peers that are expected to be online at all times 
# and the node is expected to be able to connect to them. 
# This is necessary at first startup so the node  has a few other nodes to connect to. 
# It is not as crucial when the peer exchange reactor already filled a list of nodes that are available. 
# If some nodes are not available, they will be skipped and later retried for a while before completely dropping them. 
# If no nodes are available from this list and pex=false, then the node will not be able to join the network.
persistent_peers = "id100000000000000000000000000000000@1.2.3.4:26656,id200000000000000000000000000000000@2.3.4.5:26656"
```

### private_peer_ids

This setting tells which nodes should not be handed out to others, when `pex`=true. 
If `pex`=false, this setting can be `omitted`.

```toml
# Comma-separate list of nodeid values, that should not be gossiped at all times.
private_peer_ids = "id100000000000000000000000000000000,id200000000000000000000000000000000"
```

> **Tip**：Use this command to query tendermint node id:
> ```bash
> metaosd tendermint show-node-id
> ```