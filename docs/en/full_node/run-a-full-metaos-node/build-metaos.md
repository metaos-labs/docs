# Build MetaOS

`metaosd` is the official Golang reference implementation of the MetaOS node software. Use this guide to install `metaosd`, the command-line interface and daemon that connects to MetaOS and enables you to interact with the MetaOS blockchain.

## Get the MetaOS source code

1. Use `git` to retrieve [MetaOS](https://github.com/metaos-labs/metaos/), and check out the `main` branch, which contains the latest stable release. You can find the latest tag on the [tags page](https://github.com/metaos-labs/metaos/tags) or via autocomplete in your terminal: type `git checkout v` and press `<TAB>`.
   
   ```
   git clone https://github.com/metaos-labs/metaos
   cd metaos
   git checkout [latest version]
   ```

2. Build MetaOS. This will install the `metaosd` executable to your [ `GOPATH` ](https://go.dev/doc/gopath_code) environment variable.
   
   ```bash
   make build
   cp ./build/metaosd $GOPATH/bin
   ```

3. Verify that MetaOS is installed correctly.
   
   ```bash
   metaosd version --long
   ```
   
   **Example**:
   
   ```bash
   name: metaos
   server_name: metaosd
   version: 0.1.2
   commit: e325d2f7d6365d2a9c3298a9449290576f25d72b
   build_tags: netgo,ledger
   go: go version go1.18.3 linux/amd64
   ```
   
   > **Tip**:
   > If the `metaosd: command not found` error message is returned, confirm that the Go binary path is correctly configured by running the following command:
   > 
   > ```bash
   > export PATH=$PATH:$(go env GOPATH)/bin
   > ```
