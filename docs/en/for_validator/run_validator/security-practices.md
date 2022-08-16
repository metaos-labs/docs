# Implement security practices

Each validator candidate is encouraged to run its operations independently. Diverse individual setups increase the resilience of the network.

## Manage digital keys with HSM

Key management is mission critical for validators. If an attacker gains access to a validator's private key, it puts the validator's entire delegated stake at risk. Hardware security modules are an important strategy for mitigating this risk.

Consider implementing this [key-management method](https://github.com/iqlusioninc/tmkms) by Iqulusion. Read [this](remote-signer.md) to learn how to use it.

## Defend against DDoS attacks

Validators are responsible for ensuring that the network can defend against denial of service attacks.

Validators can mitigate these attacks by carefully structuring their network topology in a sentry node architecture.

Validator nodes should only connect to full nodes they trust. They can be run by the same validator or other validators they know. A validator node will typically run in a data center. Most data centers provide direct links to major cloud providers. A validator can use these links to connect to sentry nodes in the cloud. This shifts the burden of denial-of-service from the validator's node directly to its sentry nodes. This may require new sentry nodes to be spun up or activated to mitigate attacks on existing ones.

Sentry nodes can be quickly spun up or used to change IP addresses. Because links to the sentry nodes are in private IP space, an internet based attack can't disturb them directly. This will ensure a validator's block proposals and votes always make it to the rest of the network.

Learn more about [sentry-node architecture](sentry-node-architecture.md).

1. For validators nodes, edit the `config.toml`:

   ```bash
   # Comma separated list of nodes to keep persistent connections to
   # Do not add private peers to this list if you don't want them advertised
   persistent_peers = "comma separated list of sentry node addresses"
   # List of node IDs, to which a connection will be (re)established ignoring any existing limits
   # Comma separated list of nodeID's. These nodes will be connected to no matter the limits of inbound and outbound peers. This is useful for when sentry nodes have full address books.
   unconditional_peer_ids = "optionally other sentry node IDs"
   # Set false for private or local networks
   addr_book_strict = false
   # Set true to enable the peer-exchange reactor
   pex = false
   ```

2. For sentry nodes, edit the `config.toml`:

   ```bash
   # Comma separated list of nodes to keep persistent connections to
   # Do not add private peers to this list if you don't want them advertised
   persistent_peers = "validator node address, optionally other sentry nodes"
   # List of node IDs, to which a connection will be (re)established ignoring any existing limits
   # Comma separated list of nodeID's. These nodes will be connected to no matter the limits of inbound and outbound peers. This is useful for when sentry nodes have full address books.
   unconditional_peer_ids = "validator node ID,optionally other sentry node IDs"
   # Comma separated list of peer IDs to keep private (will not be gossiped to other peers)
   private_peer_ids = "validator node ID"
   # Set false for private or local networks
   addr_book_strict = false
   # Set true to enable the peer-exchange reactor
   pex = false
   ```

> **Tip**: A node address has the following format: `nodeid@ip:port`, you can get the nodeid by running `metaosd tendermint show-node-id`, the default port is 26656.