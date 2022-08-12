# Updates

## Upgrade the testnet

These instructions are for full nodes running older testnets that would like to upgrade to the latest testnet.

### 1. Reset data

Remove the outdated files and reset the data:

```bash
rm ~/.metaos/config/genesis.json
rm ~/.metaos/config/addrbook.json
metaosd unsafe-reset-all
```

Your node is now in a pristine state, keeping the original `priv_validator.json` and `config.toml`. If you had any sentry nodes or full nodes set up before, your node will still try to connect to them but may fail if they haven't also been upgraded.

> ### DANGER!
> 
> Make sure that every node has a unique `priv_validator.json`. 
> Do not copy the `priv_validator.json` from an old node to multiple new nodes. 
> Running two nodes with the same `priv_validator.json` will cause you to double sign.

### 2. Software upgrade

Now it is time to upgrade the software. Go to the project directory and run:

```bash
git checkout main && git pull
make build
```

New `metaosd` binary file will be created into `./build/` folder. Use the new `metaosd` to instead of the old one.

> **Tip**:
> 
> If you have issues at this step, please check that you have a compatible version of GO installed (v1.18+).

The previous command uses `main` as it contains the latest stable release.

Your full node is now cleanly upgraded!
