# Restore a validator

A validator can be completely restored on a new MetaOS node with the following set of keys:

- The Consensus key, stored in `~/.metaos/config/priv_validator_key.json`
- The mnemonic to the validator wallet

> ### Danger
> 
> Before proceeding, ensure that the existing validator is not active. Double voting has severe slashing consequences.

To restore a validator:

1. Setup a full MetaOS node synced up to the latest block.
2. Replace the `~/.metaos/config/priv_validator_key.json` file of the new node with the associated file from the old node, then restart your node.