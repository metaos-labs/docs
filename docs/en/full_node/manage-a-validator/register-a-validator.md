# Register a validator

This is a detailed step-by-step guide for setting up a MetaOS validator. Please be aware that while it is easy to set up a rudimentary validating node, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

## 1. Retrieve your PubKey

The Consensus PubKey of your node is required to create a new validator. Run:

```bash
metaosd tendermint show-validator
```

## 2. Create a new validator

> ### Get tokens
> **Tip**:
> 
> In order for MetaOSd to recognize a wallet address it must contain tokens. For the testnet, use [the faucet](https://faucet.metaos.im/) to send MTOS to your wallet. If you are on mainnet, send funds from an existing wallet. 1-3 MTOS are sufficient for most setup processes.

To create the validator and initialize it with a self-delegation, run the following command. `key-name` is the name of the Application Operator Key that is used to sign transactions.

```bash
metaosd tx staking create-validator \
    --amount=1000000000000000000000000umtos \
    --pubkey=$(<your-consensus-PubKey>) \
    --moniker="<your-moniker>" \
    --chain-id=<chain_id> \
    --from=<key-name> \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1" \
    --gas=auto \
    --gas-adjustment="1.2"
```

> ### Warning
> 
> When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage-point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.

## 3. Confirm your validator is active

If running the following command returns something, your validator is active:

```bash
metaosd query tendermint-validator-set | grep "$(metaosd tendermint show-address)"
```

You are looking for the `bech32` encoded `address` in the `~/.metaos/config/priv_validator_key.json` file.

> #### Note
> 
> Only the top 21 validators in voting power are included in the active validator set.

## 4. Secure your keys and have a backup plan

Protecting and having a contingency backup plan for your keys will help mitigate catastrophic hardware or software failures of the node.
It is a good practice to test your backup plan on a testnet node in case of node failure.

## 5. Suggestions

If you become a validator, and you want to make yourself known to potential delegators. Consider the following options to help improve your visibility.

### Set up a website

Set up a website so that your delegators can find you. It is recommended that you make a custom section for MetaOS delegators that instructs them how to [delegate](delegate-to-a-validator.md) `MTOS` tokens.

### Announce yourself on social software

Introduce yourself on the social software you are using. In the future, MetaOS will have its own official social mode to be public.