# Install `metaosd`

`metaosd` is the command-line interface and daemon that connects to MetaOS and enables you to interact with the MetaOS blockchain. 
`metaosd` is the official Golang reference implementation of the MetaOS node software.

This guide is for developers who want to install `metaosd` and interact with `metaosd` without running a full node. 
If you want to run a full node or join a network, visit [Run a full MetaOS node](../../full-node/run-a-full-metaos-node/overview.md).

### Prerequisites

- [Golang v1.18 linux/amd64](https://golang.org/doc/install)
- Ensure your `GOPATH` and `GOBIN` environment variables are set up correctly.
- Linux users: install [build-essential](http://linux-command.org/en/build-essential.html).

#### `metaosd` for Mac

> If you are using a Mac, follow the [`metaosd` Mac installation guide](./metaosd-mac.md).

## From binary

The easiest way to install `metaosd` is by downloading a pre-built binary for your operating system. 
You can find the latest binaries on the [releases](https://github.com/metaos-labs/metaos/releases) page. 
If you have a Mac, follow the [Mac installation instructions](./metaosd-mac.md).

## From source

### 1. Get the MetaOS source code

Use `git` to retrieve [MetaOS](https://github.com/metaos-labs/metaos/), and check out the `main` branch, which contains the latest stable release.

```
git clone https://github.com/metaos-labs/metaos
cd metaos
git checkout [latest version]
```

### 2. Build MetaOS from source

Build MetaOS, and install the `metaosd` executable to your `GOPATH` environment variable.

```bash
make install
cp ./build/metaosd $GOPATH/bin
```

### 3. Verify your MetaOS installation

Verify that MetaOS is installed correctly.

```bash
metaosd version --long
```

The following example shows version information when MetaOS is installed correctly:

```bash
name: metaos
server_name: metaosd
version: 0.1.2
commit: e325d2f7d6365d2a9c3298a9449290576f25d72b
build_tags: netgo,ledger
go: go version go1.18.3 linux/amd64
```

> Tip: If the `metaosd: command not found` error message is returned, 
> confirm that the Go binary path is correctly configured by running the following command:
> 
> ```shell
> export PATH=$PATH:$(go env GOPATH)/bin
> ```

## Next steps

For more information on `metaosd` commands and usage, see [Using metaosd]().