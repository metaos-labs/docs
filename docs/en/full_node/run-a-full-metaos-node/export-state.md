# Exporting state

MetaOS can export the entire application state to a JSON file. 
You can use this file for manual analysis or as the genesis file of a new network.

Export state:

```bash
metaosd export > [filename].json
```

You can also export a state from a particular height. 
The following command will export the state after the block height you specify:

```bash
metaosd export --height [height] > [filename].json
```

If you plan to start a new network from the exported state, export with the `--for-zero-height` flag:

```bash
metaosd export --height [height] --for-zero-height > [filename].json
```