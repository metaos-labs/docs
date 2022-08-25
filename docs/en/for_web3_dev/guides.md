# Guides

## Wallet Integration

### Implementation Checklist

The integration implementation checklist for dApp developers consists of three categories:

1. [Frontend features](#frontend)
2. [Transactions and wallet interactions](#transactions)
3. [Client-side provider]()

### Frontend

Make sure to create a wallet-connection button for Metamask and/or MetaOs-Wallet on the frontend of the application. 
For instance, consider the "Connect to a wallet" button on the interface of [https://app.metaos.im](https://app.metaos.im)

### Transactions

Developers enabling transactions on their dApp have to determine wallet type of the user, create the transaction, 
request signatures from the corresponding wallet, and finally broadcast the transaction to the network.

#### Determining Wallet Type
Developers should determine whether users are using Keplr or MetaMask. 
Whether MetaMask or MetaOs-Wallet is installed on the user device can be determined by checking the corresponding 
`window.ethereum` or `window.keplr` value.
- **For MetaMask**: `await window.ethereum.enable(chainId)`;
- **For MetaOs-Wallet**: `await window.keplr.enable(chainId)`;

If either `window.ethereum` or `window.keplr` returns undefined after document.load, then MetaMask (or, correspondingly, MetaOs-Wallet) is not installed. 
There are several ways to wait for the load event to check the status: for instance, developers can register functions to window.onload, or they can track the document's ready state through the document event listener.

After the user's wallet type has been determined, developers can proceed with creating, signing, and sending transactions.


### metaosd & Tendermint RPC
Upon installation and configuration of the MetaOS Daemon, developers can query account balances using `metaosd` with the following CLI command:
```bash
metaosd query bank balances mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh
balances:
- amount: "99999999000000000000000000"
  denom: umtos
pagination:
  next_key: null
  total: "0"
```

### JSON-RPC
Developers can query account balances of amtos using the eth_getBalance 
JSON-RPC method in conjunction with curl:
```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":[`$ETHADDRESS`, `$BLOCK`],"id":1}' -H "Content-Type: application/json" $NODE

# Result
{"jsonrpc":"2.0","id":1,"result":"0x36354d5575577c8000"}
```
where:
- `$ETHADDRESS` is the Etherum hex-address the balance is to be queried from. Note that MetaOs addresses (those beginning with mtos1...)
- can be converte.d to Ethereum addresses.
- `$BLOCK` is the block number or block hash (eg. "0x0"). The reasoning for this parameter is due to [EIP-1898](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1898.md).
- (optional if running local node) `$NODE` is the JSON-RPC node information is requested from.

Developers can also query account balances of x/erc20-module registered coins using the eth_call JSON-RPC method 
in conjunction with curl:
```bash
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"from":`SENDERCONTRACTADDRESS`, "to":`ERCCONTRACTADDRESS`, "data":`$DATA`}, `$BLOCK`],"id":1}'  -H "Content-Type: application/json" $NODE

# Result
{"jsonrpc":"2.0","id":1,"result":"0x"}
```
where:
- `$SENDERCONTRACTADDRESS` is the Ethereum hex-address this smart contract call is sent from.
- `$ERCCONTRACTADDRESS` is the Ethereum hex-address of the ERC-20 contract corresponding to the coin denomination being queried.
- `$DATA` is the hash of the [balanceof](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20) method signature and encoded parameters. 
balanceOf is a required method in every ERC-20 contract, and the encoded parameter is the address which is having its balance queried. 
For additional information, see the Ethereum Contract [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html).
- `$BLOCK` is the block number or block hash (eg. `"0x0"`). The reasoning for this parameter is due to [EIP-1898](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1898.md).
- (optional if running local node) `$NODE` is the JSON-RPC node information is requested from.

### gRPC
Developers can use [grpcurl](https://github.com/fullstorydev/grpcurl) with the AllBalances endpoint to query account balance by address for all denominations:
```bash
# Request
grpcurl $OUTPUT -d '{"address":`$METAOSADDRESS`}' $NODE cosmos.bank.v1beta1.Query/AllBalances

# Result
{
  "balances": [
    {
      "denom": "stake",
      "amount": "1000000000"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```
where:
- $METAOSADDRESS is the MetaOs address with balances of interest (eg. "mtos1...").
- $NODE is the Cosmos gRPC node information is requested from.
- (optional) $OUTPUT is the output format (eg. plaintext).

State can also be queried using gRPC within a Go program. The idea is to create a gRPC connection, then use the 
[Protobuf](https://developers.google.com/protocol-buffers)-generated client code to query the gRPC server.

```go
import (
    "context"
    "fmt"

  "google.golang.org/grpc"

    sdk "github.com/cosmos/cosmos-sdk/types"
  "github.com/cosmos/cosmos-sdk/types/tx"
)

func queryState() error {
    myAddress, err := GetMtosAddressFromBech32("mtos1...") 
    if err != nil {
        return err
    }

    // Create a connection to the gRPC server.
    grpcConn := grpc.Dial(
        "http://localhost:9090", // your gRPC server address.
        grpc.WithInsecure(), // the SDK doesn't support any transport security mechanism.
    )
    defer grpcConn.Close()

    // This creates a gRPC client to query the x/bank service.
    bankClient := banktypes.NewQueryClient(grpcConn)
    bankRes, err := bankClient.AllBalances(
        context.Background(),
        &banktypes.QueryAllBalancesRequest{Address: myAddress},
    )
    if err != nil {
        return err
    }

    fmt.Println(bankRes.GetBalances()) // prints the account balances.

    return nil
}


func GetMtosAddressFromBech32(address string) (string, error) {...}
```





