# Remote Signer

The MetaOS is powered by the Tendermint consensus. Tendermint provides a remote signer option for validators. A remote signer enables the operator to store the validator key on a different machine minimizing the attack surface if a server were to be compromised.

The remote signer protocol implements a [client and server architecture](https://en.wikipedia.org/wiki/Client%E2%80%93server_model). When Tendermint requires the public key or signature for a proposal or vote it requests it from the remote signer.

To run a secure validator and remote signer system it is recommended to use a VPC (virtual private cloud) or a private connection.

## Validator keys protecting

Protecting a validator's consensus key is the most important factor to take in when designing your setup. The key that a validator is given upon creation of the node is called a consensus key, it has to be online at all times in order to vote on blocks. It is **not recommended** to merely hold your private key in the default json file (priv_validator_key.json). Fortunately, the [Interchain Foundation](https://interchain.io) has worked with a team to build a key management server for validators. You can find documentation on how to use it [here](https://github.com/iqlusioninc/tmkms), it is used extensively in production. You are not limited to using this tool, there are also HSMs (opens new window), there is not a recommended HSM.

Currently Tendermint uses [Ed25519](https://ed25519.cr.yp.to) keys which are widely supported across the security sector and HSMs.

## Use `tmkms`

[tmkms](https://github.com/iqlusioninc/tmkms) support the following signing backend providers:

#### Hardware Security Modules

- [FortanixDSM](https://github.com/iqlusioninc/tmkms/blob/main/README.fortanixdsm.md) (gated under the `fortanixdsm` cargo feature. See [README.fortanixdsm.md](https://github.com/iqlusioninc/tmkms/blob/main/README.fortanixdsm.md) for more info)
- [YubiHSM2](https://github.com/iqlusioninc/tmkms/blob/main/README.yubihsm.md) (gated under the `yubihsm` cargo feature. See [README.yubihsm.md](https://github.com/iqlusioninc/tmkms/blob/main/README.yubihsm.md) for more info)
- [Ledger](https://www.ledger.com/) (gated under the `ledger` cargo feature)

#### Software-Only

- `softsign` backend which uses [ed25519-dalek](https://github.com/dalek-cryptography/ed25519-dalek)

> ### Tip
> 
> Hardware security modules are recommended, but we will use `softsign` to show how to use `tmkms` to manage validator keys and implement remote signing.

### Installing `tmkms`

Read [this](https://github.com/iqlusioninc/tmkms#installation) to learn how to install `tmkms`.

Here we use `softsign` module, so we should use `--features=softsign` flag to build and install `tmkms`.

### Configuration

#### 1. `tmkms init`

The `tmkms init` command can be used to generate a directory containing the configuration files needed to run the KMS.
Run this:
```shell
tmkms init /path/to/kms/home
```

For example:
```shell
tmkms init ~/.kms/
```

Please view `~/.kms` folder.

#### 2. Prepare keys files

If the validator key file(usually at `~/.metaos/config/priv_validator_key.json`) has been prepared already, run the following command to import and create a consensus key file for KMS:
```shell
tmkms softsign import /path/to/validator/key/file /path/to/target/consensus/key/file
```

For example:
```shell
tmkms softsign import ~/.metaos/config/priv_validator_key.json ~/.kms/secrets/consensus.key
```

We also need to create a `signing-connection.key` for identifying the remote signing connection. When we run `tmkms init` command, it should be created as `~/.kms/secrets/kms-identity.key` file. If you want to create a new one, run the following command:
```shell
tmkms softsign kengen /path/to/signing/connection/file
```

For example:
```shell
tmkms softsign kengen ~/.kms/secrets/kms-identity.key
```

#### 3. Edit `tmkms.toml`

`tmkms.toml` example:
```toml
# Tendermint KMS configuration file

## Chain Configuration

### MetaOS Network

[[chain]]
id = "metaos_99237-1"
key_format = { type = "bech32", account_key_prefix = "mtospub", consensus_key_prefix = "mtosvalconspub" }
state_file = "/home/user/.kms/state/metaos_99237-1-consensus.json"

## Signing Provider Configuration

### Software-based Signer Configuration

[[providers.softsign]]
chain_ids = ["metaos_99237-1"]
key_type = "consensus"
path = "/home/user/.kms/secrets/consensus.key"

## Validator Configuration

[[validator]]
chain_id = "metaos_99237-1"
addr = "tcp://127.0.0.1:26660" # The `priv_validator_laddr` address in `~/.metaos/config/config.toml` on the validator instance.
secret_key = "/home/user/.kms/secrets/kms-identity.key"
protocol_version = "v0.34" # This should be set same as the version of Tendermint, use `metaosd tendermint version` to check. If you are using `ledger` module , `ledger` should be set. 
reconnect = true
```

#### 4. Change MetaOS validator configuration

Locate to the `config.toml` file in the home path for `metaosd` running as a MetaOS validator. Set the `priv_validator_laddr` value:
```toml
...
# TCP or UNIX socket address for Tendermint to listen on for
# connections from an external PrivValidator process
priv_validator_laddr = "tcp://127.0.0.1:26660"
...
```

Then backup your validator key file(such as `priv_validator_key.json`) and remove it from the validator instance.

#### 5. Run `tmkms`

Run the following command to start KMS:
```shell
tmkms start -c /path/to/tmkms.toml
```

Example:
```shell
tmkms start -c ~/.kms/tmkms.toml
```

Output:
```shell
2022-08-12T07:27:05.904223Z  INFO tmkms::commands::start: tmkms 0.12.2 starting up...
2022-08-12T07:27:05.909628Z  INFO tmkms::keyring: [keyring:softsign] added consensus Ed25519 key: mtosvalconspub1zcjduepqq7520jcw4guf2swcc8aqhh2pj533egrqam3h0lya8cl2e2ekyelq3kjr7t
2022-08-12T07:27:05.912771Z  INFO tmkms::connection::tcp: KMS node ID: 0f185204711dd6a576e082396576e5b54ba4624e
2022-08-12T07:27:05.912997Z ERROR tmkms::client: [metaos_99237-1@tcp://127.0.0.1:26660] I/O error: Connection refused (os error 111)
```

#### 6. Run or Restart the validator instance

You will find the following context in the logs of `metaosd`:
```shell
3:34PM INF Starting SignerListenerEndpoint service impl=SignerListenerEndpoint module=privval server=node
3:34PM INF SignerListener: Listening for new connection module=privval server=node
3:34PM INF SignerListener: Blocking for connection module=privval server=node
3:34PM INF SignerListener: Connected module=privval server=node
```

And you will also watch the change of `tmkms` output:
```shell
2022-08-12T07:35:20.823150Z  INFO tmkms::connection::tcp: KMS node ID: 0f185204711dd6a576e082396576e5b54ba4624e
2022-08-12T07:35:20.824130Z  INFO tmkms::session: [metaos_99237-1@tcp://127.0.0.1:26660] connected to validator successfully
2022-08-12T07:35:20.824164Z  WARN tmkms::session: [metaos_99237-1@tcp://127.0.0.1:26660]: unverified validator peer ID! (d9bbd8d7470f480d63736bee1a32f75a60999024)
2022-08-12T07:35:21.863242Z  INFO tmkms::session: [metaos_99237-1@tcp://127.0.0.1:26660] signed Proposal:88552DEB62 at h/r/s 1198/0/0 (0 ms)
```

If `tmkms` instance crashed, you will find the following context in the logs of `metaosd`:
```shell
3:36PM INF SignerListener: Blocking for connection module=privval server=node
3:37PM ERR SignerListener: Ping timeout module=privval server=node
```

## Challenge

You must ensure the stability of the `tmkms` service and avoid its unexpected interruption, because this will cause the validator to be slashed.

> ## Caution!
> 
> Do not let a remote signer serve multiple validator instances on the same network. This may cause `double-signing` problems to cause the validator to be slashed even jailed.



