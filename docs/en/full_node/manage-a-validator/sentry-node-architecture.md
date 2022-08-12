# Sentry Node Architecture

> **Tip**: 
> 
> Part of this document is copied from [here](https://forum.cosmos.network/t/sentry-node-architecture-overview/454). 
> You can also learn more about validator security through [Tendermint Documents](https://docs.tendermint.com/master/nodes/validators.html#setting-up-a-validator).

### Disclaimer

It is important to understand that this is only one example of solving DDoS mitigation for validator nodes. For diversity in the network, validators are encouraged to implement their own solutions. Each validator is responsible for their own solution. This example might be missing crucial security features that need to be implemented for production use.

### Problem description

On the MetaOS network, a validator node can be attacked using the Distributed Denial of Service method. The validator node has a fixed IP address and opens a RESTful API port facing the Internet.

### Proposed solution

To mitigate the issue, multiple distributed nodes (sentry nodes) are deployed in cloud environments. With the possibility of easy scaling, it is harder to make an impact on the validator node. New sentry nodes can be brought up during a DDoS attack and using the gossip network they can be integrated into the transaction flow.

### Network layout

![network-layout](../../img/sentry_layout.png)

The solution provided here is based on Amazon AWS services. Google Cloud has similar solutions to solve this issue.

The proposed network diagram is similar to the classical backend/frontend separation of services in a corporate environment. The “backend” in this case is the private network of the validator in the data center. The data center network might involve multiple subnets, firewalls and redundancy devices, which is not detailed on this diagram. The important point is that the data center allows direct connectivity to the chosen cloud environment. Amazon AWS has “Direct Connect”, while Google Cloud has “Partner Interconnect”. This is a dedicated connection to the cloud provider (usually directly to your virtual private cloud instance in one of the regions).

All sentry nodes (the “frontend”) connect to the validator using this private connection. The validator does not have a public IP address to provide its services.

Amazon has multiple availability zones within a region. One can install sentry nodes in other regions too. In this case the second, third and further regions need to have a private connection to the validator node. This can be achieved by VPC Peering (“VPC Network Peering” in Google Cloud). In this case, the second, third and further region sentry nodes will be directed to the first region and through the direct connect to the data center, arriving to the validator.

A more persistent solution (not detailed on the diagram) is to have multiple direct connections to different regions from the data center. This way VPC Peering is not mandatory, although still beneficial for the sentry nodes. This overcomes the risk of depending on one region. It is more costly.

### Local configuration

![local-config](../../img/local_config.png)

The validator is only going to talk to the sentry nodes, while sentry nodes have the ability to talk to the validator node on the private channel and talk to public nodes elsewhere on the Internet. Optionally, they could be set up to talk to each other on the private network too.

The `config.toml` configuration is going to determine the logical setup of the network. Four parameters define how a node communicates:
- `pex`: boolean value. It turns the peer exchange reactor (gossip protocol) on or off in a node. When `pex=false`, only the list of nodes in the `persistent_peers` list are available for connection.
- `persistent_peers`: comma-separated list of `nodeid@ip:port` values that define a list of peers that are expected to be online at all times and the node is expected to be able to connect to them. This is necessary at first startup so the node has a few other nodes to connect to. It is not as crucial when the peer exchange reactor already filled with a list of nodes that are available. If some nodes are not available, they will be skipped and later retried for a while before completely dropping them. If no nodes are available from this list and `pex=false`, then the node will not be able to join the network.
- `private_peer_ids`: comma-separate list of nodeid values, that should not be gossiped at all times. This setting tells which nodes should not be handed out to others, when `pex=true`. If `pex=false`, this setting can be omitted.
- `addr_book_strict`: boolean value with a twisted name. In short, turn this off if someone of the nodes are on a LAN IP. By default, only nodes with a routable address will be considered for connection. This is what “strict” address book means. If this setting is turned off (false), non-routable IP addresses, like addresses in a private network, can be added to the address book.

### Validator node configuration

| Config Option     | Setting               |
| -------------     | -------               |
| pex               | false                 |
| persistent_peers  | list of sentry nodes  |
| private_peer_ids  | omitted               |
| addr_book_strict  | false                 |

The validator node should have `pex=false` set, so it doesn't even try to gossip. The validator node will only communicate with the sentry nodes. The sentry nodes should be added to the `persistent_peers` list, so the validator is able to connect to them. As `pex=false`, the `private_peer_ids` setting can be omitted. Since the validator is on a private network and it will connect to the sentry nodes also on a private network, `addr_book_strict=false` has to be set.

### Sentry node configuration

| Config Option     | Setting                                       |
| -------------     | -------                                       |
| pex               | true                                          |
| persistent_peers  | validator node, optionally other sentry nodes |
| private_peer_ids  | validator node id                             |
| addr_book_strict  | false                                         |

The sentry nodes should be able to talk to nodes on the Internet, and they should benefit from the peer exchange reactor, hence `pex=true` is set. They should also make sure they don't gossip the validator node id and IP address, hence the `private_peer_ids` should contain the validator node's ID. Also, the validator node is expected to be up and running and since it's not gossip-ed, the only way to connect to it is to add it to the `persistent_peers` list. Because the validator is on a private network, `addr_book_strict=false` needs to be set.

It was implied that sentry nodes have both a public and a private address but only the public IP should be gossip-ed. This can be achieved by explicitly setting the `--external-ip` setting during the init of the sentry node.

### Challenges

#### Direct connection

Although both Google Cloud and Amazon AWS have direct connection capabilities, costs can go up quickly when multiple direct connections are established to the data center. The network configuration becomes convoluted too.

On the other hand, it is the only way to make cloud connectivity redundant. If the region where the direct connection is established goes down, the regions connected using VPC peering lose connection to the validator.

Also, not all data centers have direct connect capabilities. Check the relevant documentation in the cloud and with the data center.

#### Dynamic scaling

The sentry node architecture in the cloud begs for automated scaling. Unfortunately to add a new sentry node to the network, there are few challenges.
- The `persistent_peers settings` in the configuration need to be updated and the service reloaded at least on the validator. This requires some kind of configuration management that is out of scope for `tendermint` right now. (Look into Devops tooling)
- The new node will take a long time to sync if it has to start from scratch. It's an interesting idea to save the blockchain state from other nodes at a regular basis (for example to S3 or by snapshotting an instance) and deploy that when a new node is added. The added complexity requires the scaling services like CloudFormation and AutoScaling to add extra logic for proper deployment.

#### Ops

The validator node doesn't require a public Internet connection for its service, but it still requires maintenance, security updates and monitoring. This can be achieved through a server hosted in the cloud, or a separate Internet connection in the data center (preferably with VPN connectivity). It is strongly recommended to hire/contract someone with operations experience for a secure setup.

The sentry nodes require maintenance and security updates too. Since they have a public-facing interface, extra care need to be taken for proper maintenance. For example, we don't want to end up with snapshots that contain malware, that was introduced on an instance earlier.

#### Why not all-in with the cloud?

Putting the validator in the cloud has technical difficulties. The KMS services provided by Amazon and Google are missing someone of the algorithms that Tendermint is using. Setting up a validator without KMS is a big security risk for production use.

The other issue is that VPC Peering is not available among different cloud providers. The alternative option is VPN over public Internet. Or the validator is locked into one cloud provider, which is also a risk.

#### Other attacks to resolve

The DDoS attack described here is not the only attack to be resolved for a validator node. For example the HTTP port open to the Internet is susceptible for man-in-the-middle attacks. Although this attack doesn't impact the MetaOS network, it can impact the validator node. A malicious attacker can present an altered state of the network to the validator node and force it to behave incorrectly from the network perspective - which can lead to slashing of the validator node's tokens. The SNA does not target to resolve this, however it provides some coverage by making the man-in-the-middle attack harder, because of the multiple sentry nodes.

### Summary

The above solution provides a way to hide the IP address of the validator node and provide a more easily scalable list of public IP addresses for DDoS mitigation. As mentioned before, this is one such proposed architecture and hopefully more will surface in the community with active discussion around them.
