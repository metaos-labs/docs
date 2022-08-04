# Run a Validator

### Create Your Validator

Your node consensus public key can be used to create a new validator by staking MetaOS tokens. 
You can find your validator pubkey by running:
```bash
metaosd tendermint show-validator
```

To create your validator on testnet, just use the following command:
```bash
metaosd tx staking create-validator \
  --amount=1000000umtos \
  --pubkey=$(evmosd tendermint show-validator) \
  --moniker="choose a moniker" \
  --chain-id=<chain_id> \
  --commission-rate="0.05" \
  --commission-max-rate="0.10" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --gas="auto" \
  --gas-prices="0.025umtos" \
  --from=<key_name>

```

You can confirm that you are in the validator set by using a third party explorer.

### Confirm Your Validator is Running

Your validator is active if the following command returns anything:

```bash
metaosd query tendermint-validator-set | grep "$(metaosd tendermint show-address)"
```

### Halting Your Validator

When attempting to perform routine maintenance or planning for an upcoming coordinated upgrade, it can be useful to have your validator systematically and gracefully halt. 
You can achieve this by either setting the `halt-height` to the height at which you want your node to shutdown or by passing the `--halt-height` flag to `metaosd`. The node will shutdown with a zero exit code at that given height after committing the block.

