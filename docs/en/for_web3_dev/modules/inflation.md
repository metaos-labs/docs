# `inflation`

## Abstract

在权益证明 (PoS) 区块链中，inflation被用来激励用户参与网络、创建新代币并将其分发给参与质押的用户，参与者可以使用他们的代币与网络交互、抵押其资产以获得奖励并投票支持治理提案。

尤其是在网络的早期阶段，Staking 回报很高，因为与网络交互的人较少，所以inflation可以作为激励 Staking 从而保护网络的主要手段。

随着更多的用户参与质押，网络变得越来越稳定和分散,投票治理提案的权力被分配给了更多的人,整个网络就会变得去中心化



## MetaOS Inflation Model

Inflation模块在整个经济模型中发挥着重要作用,第一年将通过该模块发行 1.5 亿MTOS,发行量将随着时间递减,最终完成3亿代币的发行,代币发行进行了如下设计:

- 每个epoch铸造一次代币,新铸造的代币将全部分发给validator节点(默认一天铸造一次),
- 每隔一定数量的epoch代币的发行量都将减少(默认每隔365个epoch,pos奖励将减少二分之一)

Inflation模块代币的发行量衰减是通过指数公式实现的,默认每365个epoch衰减一次:

```
periodProvision = exponentialDecay       *  bondingIncentive
f(x)            = (a * (1 - r) ^ x + c)  *  (1 + maxVariance - bondedRatio * (maxVariance / bondingTarget))

epochProvision = periodProvision / epochsPerPeriod

where (with default values):
x = variable    = year
a = 150000000.000000000000000016 = initial value
r = 0.5         = decay factor
c = 0   = long term supply

bondedRatio   = variable  = fraction of the staking tokens which are currently bonded
maxVariance   = 0       = the max amount to increase inflation
bondingTarget = 0.66      = our optimal bonded ratio


Example with bondedRatio = bondingTarget:

period  periodProvision  cumulated     epochProvision  //为了方便展示,这里计算结果保留整数
f(0)    150000000      	 150000000   	 410 959
f(1)     75000000        225000000	 	 205 479
f(2)     37500000        262500000     102 740

```









# State

## State Objects

The `x/inflation` module keeps the following objects in state:

| State Object       | Description                    | Key         | Value                        | Store |
| :----------------- | :----------------------------- | :---------- | :--------------------------- | :---- |
| Period             | Period Counter                 | `[]byte{1}` | `[]byte{period}`             | KV    |
| EpochMintProvision | Epoch mint provision bytes     | `[]byte{2}` | `[]byte{epochMintProvision}` | KV    |
| EpochIdentifier    | Epoch identifier bytes         | `[]byte{3}` | `[]byte{epochIdentifier}`    | KV    |
| EpochsPerPeriod    | Epochs per period bytes        | `[]byte{4}` | `[]byte{epochsPerPeriod}`    | KV    |
| SkippedEpochs      | Number of skipped epochs bytes | `[]byte{5}` | `[]byte{skippedEpochs}`      | KV    |

### Period

Counter to keep track of amount of past periods, based on the epochs per period.

### EpochMintProvision

Amount of tokens that are allocated for exponention inflation each epoch.

### EpochIdentifier

Identifier to trigger epoch hooks.

### EpochsPerPeriod

Amount of epochs in one period



## Genesis State

The `x/inflation` module's `GenesisState` defines the state necessary for initializing the chain from a previously exported height. 



```go
type GenesisState struct {
	// params defines all the paramaters of the module.
	Params Params `protobuf:"bytes,1,opt,name=params,proto3" json:"params"`
	// amount of past periods, based on the epochs per period param
	Period uint64 `protobuf:"varint,2,opt,name=period,proto3" json:"period,omitempty"`
	// inflation epoch identifier
	EpochIdentifier string `protobuf:"bytes,3,opt,name=epoch_identifier,json=epochIdentifier,proto3" json:"epoch_identifier,omitempty"`
	// number of epochs after which inflation is recalculated
	EpochsPerPeriod int64 `protobuf:"varint,4,opt,name=epochs_per_period,json=epochsPerPeriod,proto3" json:"epochs_per_period,omitempty"`
	// number of epochs that have passed while inflation is disabled
	SkippedEpochs uint64 `protobuf:"varint,5,opt,name=skipped_epochs,json=skippedEpochs,proto3" json:"skipped_epochs,omitempty"`
}

```









# Hooks

The `x/inflation` module implements the `AfterEpochEnd` hook from the `epoch` module in order to allocate inflation.

## Epoch Hook: Inflation

The epoch hook handles the inflation logic which is run at the end of each epoch. It is responsible for minting and allocating the epoch mint provision as well as updating it:

1. Check if inflation is disabled. If it is, skip inflation, increment number of skipped epochs and return without proceeding to the next steps.
2. A block is commited, that signalizes that an `epoch` has ended (block `header.Time` has surpassed `epoch_start` + `epochIdentifier`).
3. Mint coin in amount of `epochMintProvision` and allocate according to inflation distribution to staking rewards.
4. If a period ends with current epoch,
   1. increment the period by 1 and set to store and
   2. recalculate epochMintProvision and set to store.









# Events

The `x/inflation` module emits the following events:

## Inflation

| Type        | Attibute Key         | Attibute Value                                |
| :---------- | :------------------- | :-------------------------------------------- |
| `inflation` | `"epoch_provisions"` | `{fmt.Sprintf("%d", epochNumber)}`            |
| `inflation` | `"epoch_number"`     | `{strconv.FormatUint(uint64(in.Epochs), 10)}` |
| `inflation` | `"amount"`           | `{mintedCoin.Amount.String()}`                |









# Parameters

The `x/inflation` module contains the parameters described below. 

| Key                      | Type                   | Default Value                              |
| :----------------------- | :--------------------- | :----------------------------------------- |
| `MintDenom`              | string                 | `DefaultDenom` // “umtos”                  |
| `ExponentialCalculation` | ExponentialCalculation | `A: sdk.NewDec(int64(150_000_000))`        |
|                          |                        | `R: sdk.NewDecWithPrec(50, 2)`             |
|                          |                        | `C: sdk.ZeroDec()`                         |
|                          |                        | `BondingTarget: sdk.NewDecWithPrec(66, 2)` |
|                          |                        | `MaxVariance: sdk.ZeroDec()`               |
| `InflationDistribution`  | InflationDistribution  | `StakingRewards: 100%`                     |
| `EnableInflation`        | bool                   | `true`                                     |

## Mint Denom

The `MintDenom` parameter sets the denomination in which new coins are minted.

## Exponential Calculation

The `ExponentialCalculation` parameter holds all values required for the calculation of the `epochMintProvision`. The values `A`, `R` and `C` describe the descrease of inflation over time. The `BondingTarget` and `MaxVariance` allow for an increase in inflation, which is automatically regulated by the `bonded ratio`, the portion of staked tokens in the network. 

## Enable Inflation

The `EnableInflation` parameter enables the daily inflation. If it is disabled, no tokens are minted and the number of skipped epochs increases for each passed epoch.









# Clients

A user can query the `x/inflation` module using the CLI, JSON-RPC, gRPC or REST.

## CLI

Find below a list of `metaosd` commands added with the `x/inflation` module. You can obtain the full list by using the `metaos -h` command.

### Queries

The `query` commands allow users to query `inflation` state.

**`period`**

Allows users to query the current inflation period.

```shell
metaosd query inflation period [flags]
```

**`epoch-mint-provision`**

Allows users to query the current inflation epoch provisions value.

```shell
metaosd query inflation epoch-mint-provision [flags]
```

**`skipped-epochs`**

Allows users to query the current number of skipped epochs.

```shell
metaosd query inflation skipped-epochs [flags]
```

**`total-supply`**

Allows users to query the total supply of tokens in circulation.

```shell
metaosd query inflation total-supply [flags]
```

**`inflation-rate`**

Allows users to query the inflation rate of the current period.

```shell
metaosd query inflation inflation-rate [flags]
```

**`params`**

Allows users to query the current inflation parameters.

```shell
metaosd query inflation params [flags]
```



### Proposals

The `tx gov submit-proposal` commands allow users to query create a proposal using the governance module CLI:

**`param-change`**

Allows users to submit a `ParameterChangeProposal`.

```shell
metaosd tx gov submit-proposal param-change [proposal-file] [flags]
```



## API

### Queries

| Verb  | Method                                                  | Description                                   |
| :---- | :------------------------------------------------------ | :-------------------------------------------- |
| `GET` | `/metaos-labs/metaos/inflation/v1/period`               | Gets current inflation period                 |
| `GET` | `/metaos-labs/metaos/inflation/v1/epoch_mint_provision` | Gets current inflation epoch provisions value |
| `GET` | `/metaos-labs/metaos/inflation/v1/skipped_epochs`       | Gets current number of skipped epochs         |
| `GET` | `/metaos-labs/metaos/inflation/v1/total_supply`         | Gets current total supply                     |
| `GET` | `/metaos-labs/metaos/inflation/v1/inflation_rate`       | Gets current inflation rate                   |
| `GET` | `/metaos-labs/metaos/inflation/v1/params`               | Gets current inflation parameters             |