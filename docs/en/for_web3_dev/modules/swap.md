# Swap

## Concepts

## CreatePool
用户可以通过指定`denom0`,`denom1`,`fee`及`sqrt_price`来创建流动池。其中`denom0`,`denom1`分别为交易对的`denom`，两者需要保持转化为小写后升序排列的顺序，`fee`对应不同的手续费级别，通过`denom0`,`denom1`及`fee`可以生成唯一的池地址，`sqrt_price`代表交易对价格的平方根。

## CreatePosition

创建完流动池后,用户可以通过设置指定的参数来创建仓位。通过`denom0`,`denom1`及`fee`可以确定对应的流动池；通过`tick_lower`及`tick_upper`可以确定交易对的价格范围，只有当价格在当前范围内才会提供流动性；通过`amount0_desired`及`amount1_desired`设置期望添加的两种代币数量，`amount0_min`及`amount1_min`设置添加两种代币的最低数量，以防止超出滑点限制；通过`recipient`指定了铸造的`NFT`的`owner`；通过`deadline`设置了交易的截止期限。

## IncreaseLiquidity

用户可以向流动池中添加流动性。通过`token_id`可以确定对应的流动仓位，进而确定相应的流动池；通过`amount0_desired`及`amount1_desired`设置期望添加的两种代币数量，`amount0_min`及`amount1_min`设置添加两种代币的最低数量，以防止超出滑点限制；通过`deadline`设置了交易的截止期限。

## DecreaseLiquidity

用户可以从流动池中移除流动性。通过`token_id`可以确定对应的流动仓位，进而确定相应的流动池；通过`liquidity`设置需要移除的流动性，进而可以计算出需要移除的两种代币的数量；通过`amount0_min`及`amount1_min`设置移除两种代币的最低数量，以防止超出滑点限制；通过`deadline`设置了交易的截止期限。

## Collect

用户可以从流动池中领取手续费。通过`token_id`可以确定对应的流动仓位，进而确定相应的流动池；通过`recipient`设置接收地址；通过`amount0_max`及`amount1_max`设置两种代币的最大领取数量；`collect_only`设置是否只领取欠的代币，false 表示先结算，再领取，这将会消耗更多的`gas`。

### SwapExactIn

用户可以通过设置指定数量的支付代币来交换另一种代币。通过通过`denoms`和`fees`来设置兑换目标代币的交易顺序；通过`amount_in`设置输入代币的数量，`amount_out_min`设置交换后获得的代币的最小数量，以防止超出滑点限制；通过`recipient`来设置接收地址；通过`deadline`设置了交易的截止期限。

### SwapExactOut

用户可以通过设置指定数量的输出代币来支付另一种代币。通过通过`denoms`和`fees`来设置兑换目标代币的交易顺序；通过`amount_out`设置输出代币的数量，`amount_in_max`设置交换后支付的代币的最大数量，以防止超出滑点限制；通过`recipient`来设置接收地址；通过`deadline`设置了交易的截止期限。

### CollectReward

用户可以从流动池中领取奖励。通过`token_id`可以确定对应的流动仓位，进而确定相应的流动池；通过`recipient`来设置接收地址；`collect_only`设置是否只领取欠的代币，false 表示先结算，再领取，这将会消耗更多的`gas`。

### CollectFeeProtocol

用户可以归集协议手续费到系统特定账户。通过设置`address`来确定相应的流动池。


### GovCorePool

管理员可以添加或删除核心池。通过设置`address`来确定相应的流动池；通过`action`来设置是`add`还是`remove`；通过`trigger_time`来设置生效时间。

## State

`swap` 模块保存以下主要对象的状态：

1. 池(Pool)
2. 池手续费(PoolFee)
3. 池slot0(PoolSlot0)
4. 池的预言机(PoolObservation)
5. 池仓位(PoolPosition)
6. PoolTick(PoolTick)
7. PoolWord(PoolWord)
8. 流动性仓位(LiquidityPosition)
9. NonfungiblePositionPool(NonfungiblePositionPool)
10. 核心池(CorePool)

此外，`swap` 模块还保留了以下索引来管理上述状态：

* 池：`0x00 | []byte(address) -> ProtocolBuffer（Pool）`
* 池手续费: `0x01 | BigEndian(fee) -> ProtocolBuffer(PoolFee)`
* 池slot0: `0x02 | []byte(address) -> ProtocolBuffer(PoolSlot0)`
* 池的预言机: `0x03 | byte(address length) | []byte(address) | []byte("/") | BigEndian(index) -> ProtocolBuffer(PoolObservation) `
* 池仓位: `0x04 | byte(address length) | []byte(address) | []byte("/") | byte(owner length) | []byte(owner) | []byte("/") | BigEndian(tickLower) | []byte("/") | BigEndian(tickUpper) -> ProtocolBuffer(PoolPosition)  `
* PoolTick: `0x05 | byte(address length) | []byte(address) | []byte("/") | BigEndian(index) -> ProtocolBuffer(PoolTick)  `
* PoolWord: ` 0x06 | byte(address length) | []byte(address) | []byte("/") | BigEndian(index) -> ProtocolBuffer(PoolWord) `
* 流动性仓位：`0x07 | []byte(tokenId) -> byte（LiquidityPosition）`
* NonfungiblePositionPool：`0x08 | 0x00 -> ProtocolBuffer（NonfungiblePositionPool）`
* 核心池: `0x0A | []byte(address) -> ProtocolBuffer(CorePool)`

## Messages

在本节中，我们将描述`swap`模块消息的处理和相应的状态更新。

### MsgCreatePool(创建流动性池消息)

创建流动性池。

```protobuf
message MsgCreatePool {
  string creator = 1;
  // the denom of denom0 in the pool
  string denom0 = 2;
  // the denom of denom1 in the pool
  string denom1 = 3;
  // the fee rate for the pool
  int32 fee = 4;
  // the initial square root price of the poo
  string sqrt_price = 5 [(gogoproto.moretags) = "yaml:\"sqrt_price\""];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `denom0`无效
* `denom1`无效
* `denom0`与`denom1`相同
* `toLower(denom0) > toLower(denom1)`
* `fee < 0`
* `sqrtPrice`无效的数 或者 `sqrtPrice < 0` 或者 `sqrtPrice`精度大于28

### MsgCreatePosition(创建仓位消息)

创建仓位。

```protobuf
message MsgCreatePosition {
  string creator = 1;
  // the denom of token0 in the pool
  string denom0 = 2;
  // the denom of token1 in the pool
  string denom1 = 3;
  // the fee rate for the pool
  int32 fee = 4;
  // the price lower bound of the position
  int32 tickLower = 5 [(gogoproto.moretags) = "yaml:\"tick_lower\""];
  // the price higher bound of the position
  int32 tickUpper = 6 [(gogoproto.moretags) = "yaml:\"tick_upper\""];
  // the desired amount of denom0 in the position
  string amount0Desired = 7 [(gogoproto.moretags) = "yaml:\"amount0_desired\""];
  // the desired amount of denom1 in the position
  string amount1Desired = 8 [(gogoproto.moretags) = "yaml:\"amount1_desired\""];
  // the minimum amount that denom0 needs to add when slippage occurs
  string amount0Min = 9 [(gogoproto.moretags) = "yaml:\"amount0_min\""];
  // the minimum amount that denom1 needs to add when slippage occurs
  string amount1Min = 10 [(gogoproto.moretags) = "yaml:\"amount1_min\""];
  // the minted NFT holder address
  string recipient = 11;
  // the time by which the transaction must be included to effect the change
  google.protobuf.Timestamp deadline = 12 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `recipient`地址无效
* `denom0`无效
* `denom1`无效
* `denom0`与`denom1`相同
* `toLower(denom0) > toLower(denom1)`
* `fee < 0`
* `tickLower < -887272 ` 或者 `tickUpper > 887272`
* `tickLower >= tickUpper `
* `amount0Desired`无效的整数或者`amount0Desired < 0`
* `amount1Desired`无效的整数或者`amount1Desired < 0`
* `amount0Min`无效的整数或者`amount0Min < 0`
* `amount1Min`无效的整数或者`amount1Min < 0`
* `deadline`未设置

### MsgIncreaseLiquidity(增加流动性消息)

增加流动性。

```protobuf
message MsgIncreaseLiquidity {
  // the message creator, with tokens paid for the message
  string creator = 1;
  // then id of the NFT for which liquidity is being increased
  string token_id = 2 [(gogoproto.moretags) = "yaml:\"token_id\""];
  // the desired amount of denom0 to be spent
  string amount0_desired = 3 [(gogoproto.moretags) = "yaml:\"amount0_desired\""];
  // the desired amount of denom1 to be spent
  string amount1_desired = 4 [(gogoproto.moretags) = "yaml:\"amount1_desired\""];
  // the minimum amount of denom0 to spend, which serves as a slippage check
  string amount0_min = 5 [(gogoproto.moretags) = "yaml:\"amount0_min\""];
  // the minimum amount of denom1 to spend, which serves as a slippage check
  string amount1_min = 6 [(gogoproto.moretags) = "yaml:\"amount1_min\""];
  // the time by which the transaction must be included to effect the change
  google.protobuf.Timestamp deadline = 7 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `tokenId`无效
* `amount0Desired`无效的整数或者`amount0Desired < 0`
* `amount1Desired`无效的整数或者`amount1Desired < 0`
* `amount0Min`无效的整数或者`amount0Min < 0`
* `amount1Min`无效的整数或者`amount1Min < 0`
* `deadline`未设置

### MsgDecreaseLiquidity(减少流动性消息)

减少流动性。

```protobuf
message MsgDecreaseLiquidity {
  string creator = 1;
  // then id of the NFT for which liquidity is being decreased
  string token_id = 2 [(gogoproto.moretags) = "yaml:\"token_id\""];
  // the amount by which liquidity will be decreased
  string liquidity = 3;
  // the minimum amount of denom0 that should be accounted for the burned liquidity
  string amount0_min = 4 [(gogoproto.moretags) = "yaml:\"amount0_min\""];
  // the minimum amount of denom1 that should be accounted for the burned liquidity
  string amount1_min = 5 [(gogoproto.moretags) = "yaml:\"amount1_min\""];
  // the time by which the transaction must be included to effect the change
  google.protobuf.Timestamp deadline = 6 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `tokenId`无效
* `liquidity`无效的数字
* `liquidity < 0`
* `liquidity`精度大于28
* `amount0Min`无效的整数或者`amount0Min < 0`
* `amount1Min`无效的整数或者`amount1Min < 0`
* `deadline`未设置

### MsgCollect(领取手续费消息)

领取手续费。

```protobuf
message MsgCollect {
  string creator = 1;
  // the id of the NFT for which tokens are being collected
  string token_id = 2 [(gogoproto.moretags) = "yaml:\"token_id\""];
  // the address that should receive the tokens
  string recipient = 3;
  // the maximum amount of denom0 to collect
  string amount0_max = 4 [(gogoproto.moretags) = "yaml:\"amount0_max\""];
  // the maximum amount of denom1 to collect
  string amount1_max = 5 [(gogoproto.moretags) = "yaml:\"amount1_max\""];
  // whether to get only owed tokens. True means only get the tokens that are owed(less gas), false means trigger settlement first, then collect(more gas)
  bool collect_only = 6 [(gogoproto.moretags) = "yaml:\"collect_only\""];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `recipient`地址无效
* `tokenId`无效
* `amount0Max`无效的整数或者`amount0Max < 0`
* `amount1Max`无效的整数或者`amount1Max < 0`

### MsgSwapExactIn(精确输入的交易消息)

精确输入的交易。

```protobuf
message MsgSwapExactIn {
  string creator = 1;
  string recipient = 2;
  string amountIn = 3 [(gogoproto.moretags) = "yaml:\"amount_in\""];
  string amountOutMin = 4 [(gogoproto.moretags) = "yaml:\"amount_out_min\""];
  repeated string denoms = 5;
  repeated int32 fees = 6;
  google.protobuf.Timestamp deadline = 7 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `recipient`地址无效
* `amountIn`无效的整数或者`amountIn <= 0`
* `AmountOutMin`无效的整数或者`AmountOutMin < 0`
* `len(denoms) < 2`
* `len(p.denoms) != len(p.fees)+1`
*  any of `denoms` is invalid
*  any of `fees` is negative
* `deadline`未设置

### MsgSwapExactOut(精确输出的交易消息)

精确输出的交易。

```protobuf
message MsgSwapExactOut {
  string creator = 1;
  string recipient = 2;
  string amountOut = 3 [(gogoproto.moretags) = "yaml:\"amount_out\""];
  string amountInMax = 4 [(gogoproto.moretags) = "yaml:\"amount_in_max\""];
  repeated string denoms = 5;
  repeated int32 fees = 6;
  google.protobuf.Timestamp deadline = 7 [(gogoproto.stdtime) = true, (gogoproto.nullable) = false];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `recipient`地址无效
* `amountOut`无效的整数或者`amountOut <= 0`
* `amountInMax`无效的整数或者`amount1Max < 0`
* `len(denoms) < 2`
* `len(p.denoms) != len(p.fees)+1`
*  any of `denoms` is invalid
*  any of `fees` is negative
* `deadline`未设置

### MsgCollectReward(领取奖励消息)

领取奖励。

```protobuf
message MsgCollectReward {
  string creator = 1;
  // the id of the NFT for which tokens are being collected
  string token_id = 2;
  // the address that should receive the tokens
  string recipient = 3;
  // whether to get only owed tokens. True means only get the tokens that are owed(less gas), false means trigger settlement first, then collect(more gas)
  bool collect_only = 4;
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `recipient`地址无效
* `tokenId`无效

### MsgCollectFeeProtocol(领取费用协议消息)

领取费用协议。

```protobuf
message MsgCollectFeeProtocol {
  string creator = 1;
  // the pool address
  string address = 2;
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `address`地址无效

### MsgGovCorePool(核心池治理消息)

核心池治理。

```protobuf
message MsgGovCorePool {
  string creator = 1;
  string address = 2;
  string action = 3;
  google.protobuf.Timestamp trigger_time = 4 [(gogoproto.moretags) = "yaml:\"trigger_time\"", (gogoproto.stdtime) = true, (gogoproto.nullable) = false];
}
```

在以下情况下，消息将失败：

* `creator`地址无效
* `address`地址无效
* `action`无效
* `triggerTime`未设置 或者 `triggerTime`未精确到秒

## Events

`swap` 模块发出以下事件：

### Handlers(处理器)

#### 创建池

| 类型                                          | 属性键          | 属性值           |
|---------------------------------------------|--------------|---------------|
| metaoslabs.metaos.swap.EventPoolCreated     | denom0       | {denom0}      |
| metaoslabs.metaos.swap.EventPoolCreated     | denom1       | {denom1}      |
| metaoslabs.metaos.swap.EventPoolCreated     | fee          | {fee}         |
| metaoslabs.metaos.swap.EventPoolCreated     | tick_spacing | {tickSpacing} |
| metaoslabs.metaos.swap.EventPoolCreated     | address      | {address}     |
| metaoslabs.metaos.swap.EventPoolInitialized | address      | {address}     |
| metaoslabs.metaos.swap.EventPoolInitialized | tick         | {tick}        |
| metaoslabs.metaos.swap.EventPoolInitialized | sqrt_price   | {sqrtPrice}   |

#### 创建仓位

| 类型                               | 属性键        | 属性值         |
|----------------------------------|------------|-------------|
| metaoslabs.metaos.swap.EventMint | address    | {address}   |
| metaoslabs.metaos.swap.EventMint | creator    | {creator}   |
| metaoslabs.metaos.swap.EventMint | owner      | {owner}     |
| metaoslabs.metaos.swap.EventMint | tick_lower | {tickLower} |
| metaoslabs.metaos.swap.EventMint | tick_upper | {tickUpper} |
| metaoslabs.metaos.swap.EventMint | amount     | {amount}    |
| metaoslabs.metaos.swap.EventMint | amount0    | {amount0}   |
| metaoslabs.metaos.swap.EventMint | amount1    | {amount1}   |

#### 添加流动性

| 类型                                            | 属性键        | 属性值         |
|-----------------------------------------------|------------|-------------|
| metaoslabs.metaos.swap.EventMint              | address    | {address}   |
| metaoslabs.metaos.swap.EventMint              | creator    | {creator}   |
| metaoslabs.metaos.swap.EventMint              | owner      | {owner}     |
| metaoslabs.metaos.swap.EventMint              | tick_lower | {tickLower} |
| metaoslabs.metaos.swap.EventMint              | tick_upper | {tickUpper} |
| metaoslabs.metaos.swap.EventMint              | amount     | {amount}    |
| metaoslabs.metaos.swap.EventMint              | amount0    | {amount0}   |
| metaoslabs.metaos.swap.EventMint              | amount1    | {amount1}   |
| metaoslabs.metaos.swap.EventIncreaseLiquidity | address    | {address}   |
| metaoslabs.metaos.swap.EventIncreaseLiquidity | token_id   | {tokenID}   |
| metaoslabs.metaos.swap.EventIncreaseLiquidity | liquidity  | {liquidity} |
| metaoslabs.metaos.swap.EventIncreaseLiquidity | amount0    | {amount0}   |
| metaoslabs.metaos.swap.EventIncreaseLiquidity | amount1    | {amount1}   |

#### 移除流动性

| 类型                                            | 属性键        | 属性值         |
|-----------------------------------------------|------------|-------------|
| metaoslabs.metaos.swap.EventBurn              | address    | {address}   |
| metaoslabs.metaos.swap.EventBurn              | owner      | {owner}     |
| metaoslabs.metaos.swap.EventBurn              | tick_lower | {tickLower} |
| metaoslabs.metaos.swap.EventBurn              | tick_upper | {tickUpper} |
| metaoslabs.metaos.swap.EventBurn              | amount     | {amount}    |
| metaoslabs.metaos.swap.EventBurn              | amount0    | {amount0}   |
| metaoslabs.metaos.swap.EventBurn              | amount1    | {amount1}   |
| metaoslabs.metaos.swap.EventDecreaseLiquidity | address    | {address}   |
| metaoslabs.metaos.swap.EventDecreaseLiquidity | token_id   | {tokenID}   |
| metaoslabs.metaos.swap.EventDecreaseLiquidity | liquidity  | {liquidity} |
| metaoslabs.metaos.swap.EventDecreaseLiquidity | amount0    | {amount0}   |
| metaoslabs.metaos.swap.EventDecreaseLiquidity | amount1    | {amount1}   |

#### 领取手续费

| 类型                                   | 属性键        | 属性值                |
|--------------------------------------|------------|--------------------|
| metaoslabs.metaos.swap.EventBurn [0] | address    | {address}          |
| metaoslabs.metaos.swap.EventBurn [0] | owner      | {owner}            |
| metaoslabs.metaos.swap.EventBurn [0] | tick_lower | {tickLower}        |
| metaoslabs.metaos.swap.EventBurn [0] | tick_upper | {tickUpper}        |
| metaoslabs.metaos.swap.EventBurn [0] | amount     | {amount}           |
| metaoslabs.metaos.swap.EventBurn [0] | amount0    | {amount0}          |
| metaoslabs.metaos.swap.EventBurn [0] | amount1    | {amount1}          |
| metaoslabs.metaos.swap.EventCollect  | address    | {address}          |
| metaoslabs.metaos.swap.EventCollect  | token_id   | {tokenID}          |
| metaoslabs.metaos.swap.EventCollect  | recipient  | {recipientAddress} |
| metaoslabs.metaos.swap.EventCollect  | amount0    | {amount0}          |
| metaoslabs.metaos.swap.EventCollect  | amount1    | {amount1}          |

* [0] 仅当collectOnly为false并且流动性仓位的流动性为正时才发出该事件。

#### 精确输入的交易

| 类型                               | 属性键        | 属性值                |
|----------------------------------|------------|--------------------|
| metaoslabs.metaos.swap.EventSwap | address    | {address}          |
| metaoslabs.metaos.swap.EventSwap | creator    | {creator}          |
| metaoslabs.metaos.swap.EventSwap | recipient  | {recipientAddress} |
| metaoslabs.metaos.swap.EventSwap | amount0    | {amount0}          |
| metaoslabs.metaos.swap.EventSwap | amount1    | {amount1}          |
| metaoslabs.metaos.swap.EventSwap | sqrt_price | {sqrtPrice}        |
| metaoslabs.metaos.swap.EventSwap | liquidity  | {liquidity}        |
| metaoslabs.metaos.swap.EventSwap | tick       | {tick}             |

#### 精确输出的交易

| 类型                               | 属性键        | 属性值                |
|----------------------------------|------------|--------------------|
| metaoslabs.metaos.swap.EventSwap | address    | {address}          |
| metaoslabs.metaos.swap.EventSwap | creator    | {creator}          |
| metaoslabs.metaos.swap.EventSwap | recipient  | {recipientAddress} |
| metaoslabs.metaos.swap.EventSwap | amount0    | {amount0}          |
| metaoslabs.metaos.swap.EventSwap | amount1    | {amount1}          |
| metaoslabs.metaos.swap.EventSwap | sqrt_price | {sqrtPrice}        |
| metaoslabs.metaos.swap.EventSwap | liquidity  | {liquidity}        |
| metaoslabs.metaos.swap.EventSwap | tick       | {tick}             |

#### 领取奖励

| 类型                                        | 属性键        | 属性值                |
|-------------------------------------------|------------|--------------------|
| metaoslabs.metaos.swap.EventBurn [0]      | address    | {address}          |
| metaoslabs.metaos.swap.EventBurn [0]      | owner      | {owner}            |
| metaoslabs.metaos.swap.EventBurn [0]      | tick_lower | {tickLower}        |
| metaoslabs.metaos.swap.EventBurn [0]      | tick_upper | {tickUpper}        |
| metaoslabs.metaos.swap.EventBurn [0]      | amount     | {amount}           |
| metaoslabs.metaos.swap.EventBurn [0]      | amount0    | {amount0}          |
| metaoslabs.metaos.swap.EventBurn [0]      | amount1    | {amount1}          |
| metaoslabs.metaos.swap.EventCollectReward | address    | {address}          |
| metaoslabs.metaos.swap.EventCollectReward | token_id   | {tokenID}          |
| metaoslabs.metaos.swap.EventCollectReward | creator    | {creator}          |
| metaoslabs.metaos.swap.EventCollectReward | recipient  | {recipientAddress} |
| metaoslabs.metaos.swap.EventCollectReward | rewards    | {rewardsAmount}    |

* [0] 仅当collectOnly为false并且流动性仓位的流动性为正时才发出该事件。

#### 领取费用协议

| 类型                                             | 属性键     | 属性值       |
|------------------------------------------------|---------|-----------|
| metaoslabs.metaos.swap.EventCollectFeeProtocol | address | {address} |
| metaoslabs.metaos.swap.EventCollectFeeProtocol | amount0 | {amount0} |
| metaoslabs.metaos.swap.EventCollectFeeProtocol | amount1 | {amount1} |

#### 核心池治理

| 类型                                         | 属性键          | 属性值           |
|--------------------------------------------|--------------|---------------|
| metaoslabs.metaos.swap.EventUpdateCorePool | address      | {address}     |
| metaoslabs.metaos.swap.EventUpdateCorePool | action       | {action}      |
| metaoslabs.metaos.swap.EventUpdateCorePool | trigger_time | {triggerTime} |

## Parameters(参数)

`swap`模块包含下列参数:

| 键             | 类型     | 示例                                            |
|---------------|--------|-----------------------------------------------|
| FeeProtocol   | int32  | 125000                                        |
| SuperOperator | string | "mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh" |
| GovBurnDenom  | string | "umtos"                                       |

<!--
序号: 6
-->

## Client

### CLI

用户可以使用 CLI 查询 `swap` 模块并与之交互。

#### 1. 查询

`query` 命令允许用户查询`swap`模块相关状态。

```bash
metaosd query swap --help
```

##### 1.1 NonfungiblePositionPool

`show-nonfungible-position-pool`命令允许用户查询NonfungiblePositionPool

```bash
metaosd query swap show-nonfungible-position-pool [flags]
```

示例:

```bash
metaosd query swap show-nonfungible-position-pool
```

输出示例:

```yaml
nonfungible_position_pool:
  next_token_id: "1"
```

##### 1.2 流动性仓位

`liquidity-positions`命令允许用户查询流动性仓位

```yaml
metaosd query swap liquidity-positions [flags]
```

###### 1.2.1 查询所有流动性仓位

示例:

```bash
metaosd query swap liquidity-positions
```

输出示例:

```yaml
liquidity_positions:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_inside0_last: "0"
  fee_growth_inside1_last: "0"
  liquidity: "45.3621929427803404693739454875"
  reward_growth_inside_lasts: []
  reward_oweds: []
  tick_lower: 24000
  tick_upper: 27000
  token_id: nft-1
  tokens_owed0: "0"
  tokens_owed1: "0"
pagination:
  next_key: null
  total: "0"
```

###### 1.2.2 根据`token-id`查询流动性仓位

示例:

```bash
metaosd query swap liquidity-positions --token-id nft-1
```

输出示例:

```yaml
liquidity_position:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_inside0_last: "0"
  fee_growth_inside1_last: "0"
  liquidity: "45.3621929427803404693739454875"
  reward_growth_inside_lasts: []
  reward_oweds: []
  tick_lower: 24000
  tick_upper: 27000
  token_id: nft-1
  tokens_owed0: "0.0000000000000000000000000000"
  tokens_owed1: "0.0000000000000000000000000000"
```

###### 1.2.3 根据`address`查询流动性仓位

示例:

```bash
metaosd query swap liquidity-positions --address mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh --skip-zero-liquidity false
```

输出示例:

```yaml
liquidity_positions:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_inside0_last: "0"
  fee_growth_inside1_last: "0"
  liquidity: "45.3621929427803404693739454875"
  reward_growth_inside_lasts: []
  reward_oweds: []
  tick_lower: 24000
  tick_upper: 27000
  token_id: nft-1
  tokens_owed0: "0"
  tokens_owed1: "0"
```

##### 1.3 池地址

`pool-address`命令允许用户查询流动性池的地址

```bash
metaosd query swap pool-address [denom0] [denom1] [flags]
```

示例:

```bash
metaosd query swap pool-address token/wbtc/1 token/weth/2 --pool-fee 3000
```

输出示例:

```yaml
mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

##### 1.4 池

`pools`命令允许用户查看流动性池信息

```bash
metaosd query swap pools [flags]
```

###### 1.4.1 查询所有流动性池信息

示例:

```bash
metaosd query swap pools
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pools:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  decimal0: 8
  decimal1: 18
  denom0: token/wbtc/1
  denom1: token/weth/2
  fee: 3000
  max_liquidity_per_tick: "11505743598341114571880798222544994"
  tick_spacing: 60
```

###### 1.4.2 根据地址查询流动性池信息

示例:

```bash
metaosd query swap pools --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例:

```yaml
pool:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  decimal0: 8
  decimal1: 18
  denom0: token/wbtc/1
  denom1: token/weth/2
  fee: 3000
  max_liquidity_per_tick: "11505743598341114571880798222544994"
  tick_spacing: 60
```

##### 1.5 查询流动性池费用等级

`pool-fees`命令允许用户查询流动性池费用等级

```bash
metaosd query swap pool-fees [flags]
```

###### 1.5.1 查询所有流动性池费用

示例:

```bash
metaosd query swap pool-fees
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_fees:
- fee: 100
  tick_spacing: 1
- fee: 500
  tick_spacing: 10
- fee: 3000
  tick_spacing: 60
- fee: 10000
  tick_spacing: 200
```

###### 1.5.2 根据`pool-fee`查询流动性池费用

示例:

```bash
metaosd query swap pool-fees --pool-fee 3000
```

输出示例:

```yaml
pool_fee:
  fee: 3000
  tick_spacing: 60
```

##### 1.6 查询池slot0

`pool-slot0s`允许用户查询池slot0

```bash
metaosd query swap pool-slot0s [flags]
```

###### 1.6.1 查询所有的池slot0

示例:

```bash
metaosd query swap pool-slot0s
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_slot0s:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_global0: "0"
  fee_growth_global1: "0"
  fee_protocol_owed0: "0"
  fee_protocol_owed1: "0"
  liquidity: "45.3621929427803404693739454875"
  observation_cardinality: 1
  observation_cardinality_next: 1
  observation_index: 0
  reward_configs: []
  reward_update_time_last: "2022-08-12T01:36:16Z"
  sqrt_price: "3.6065000000000000000000000000"
  tick: 25656
```

###### 1.6.2 根据地址查询池slot0

示例:

```bash
metaosd query swap pool-slot0s --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例:

```yaml
pool_slot0:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_global0: "0"
  fee_growth_global1: "0"
  fee_protocol_owed0: "0"
  fee_protocol_owed1: "0"
  liquidity: "45.3621929427803404693739454875"
  observation_cardinality: 1
  observation_cardinality_next: 1
  observation_index: 0
  reward_configs: []
  reward_update_time_last: "2022-08-12T01:36:16Z"
  sqrt_price: "3.6065000000000000000000000000"
  tick: 25656
```

##### 1.7 查询池slot0聚合信息

`pool-slot0-aggregations`命令允许用户查询池slot0聚合信息

```bash
metaosd query swap pool-slot0-aggregations [addresses] [flags]
```

示例:

```bash
metaosd query swap pool-slot0-aggregations mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例:

```yaml
pool_slot0_aggregations:
- pool:
    address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
    decimal0: 8
    decimal1: 18
    denom0: token/wbtc/1
    denom1: token/weth/2
    fee: 3000
    max_liquidity_per_tick: "11505743598341114571880798222544994"
    tick_spacing: 60
  pool_slot0:
    address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
    fee_growth_global0: "0"
    fee_growth_global1: "0"
    fee_protocol_owed0: "0"
    fee_protocol_owed1: "0"
    liquidity: "45.3621929427803404693739454875"
    observation_cardinality: 1
    observation_cardinality_next: 1
    observation_index: 0
    reward_configs: []
    reward_update_time_last: "2022-08-12T01:36:16Z"
    sqrt_price: "3.6065000000000000000000000000"
    tick: 25656
```

##### 1.8 查询池的预言机数据

`pool-observations`命令允许用户查询池的预言机数据

```bash
metaosd query swap pool-observations [flags]
```

###### 1.8.1 查询所有的池的预言机数据

示例:

```bash
metaosd query swap pool-observations
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_observations:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  block_timestamp: "2022-08-12T01:36:16Z"
  index: 0
  seconds_per_liquidity_cumulative: "10.0000000000000000000000000000"
  tick_cumulative: "256560"
```

###### 1.8.2 根据`address`查询池的预言机数据

示例:

```bash
metaosd query swap pool-observations --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_observations:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  block_timestamp: "2022-08-12T01:36:16Z"
  index: 0
  seconds_per_liquidity_cumulative: "10.0000000000000000000000000000"
  tick_cumulative: "256560"
```

###### 1.8.3 根据`address`及`index`查询池的预言机数据

示例:

```bash
metaosd query swap pool-observations --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg --index 0
```

输出示例:

```yaml
pool_observation:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  block_timestamp: "2022-08-12T01:36:16Z"
  index: 0
  seconds_per_liquidity_cumulative: "10.0000000000000000000000000000"
  tick_cumulative: "256560"
```

##### 1.9 查询池仓位信息

`pool-positions`命令允许用户查询池仓位信息

```bash
metaosd query swap pool-positions [flags]
```

###### 1.9.1 查询所有的池仓位信息

示例:

```bash
metaosd query swap pool-positions
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_positions:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_inside0: "0"
  fee_growth_inside1: "0"
  liquidity: "45.3621929427803404693739454875"
  owner: mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq
  reward_growth_insides: []
  reward_oweds: []
  tick_lower: 24000
  tick_upper: 27000
  tokens_owed0: "0"
  tokens_owed1: "0"
```

###### 1.9.2 根据`address`查询池仓位信息

示例:

```bash
metaosd query swap pool-positions --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_positions:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_inside0: "0"
  fee_growth_inside1: "0"
  liquidity: "45.3621929427803404693739454875"
  owner: mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq
  reward_growth_insides: []
  reward_oweds: []
  tick_lower: 24000
  tick_upper: 27000
  tokens_owed0: "0"
  tokens_owed1: "0"
```

###### 1.9.3 根据`address`和`owner`查询池仓位信息

示例:

```bash
metaosd query swap pool-positions --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg --owner mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_positions:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_inside0: "0"
  fee_growth_inside1: "0"
  liquidity: "45.3621929427803404693739454875"
  owner: mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq
  reward_growth_insides: []
  reward_oweds: []
  tick_lower: 24000
  tick_upper: 27000
  tokens_owed0: "0"
  tokens_owed1: "0"
```

##### 1.9.4 根据`address`,`owner`,`tickLower`及`tickUpper`查询池仓位信息

示例:

```bash
metaosd query swap pool-positions --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg --owner mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq --tick-lower 24000 --tick-upper 27000
```

输出示例:

```yaml
pool_position:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_inside0: "0"
  fee_growth_inside1: "0"
  liquidity: "45.3621929427803404693739454875"
  owner: mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq
  reward_growth_insides: []
  reward_oweds: []
  tick_lower: 24000
  tick_upper: 27000
  tokens_owed0: "0"
  tokens_owed1: "0"
```

##### 1.10 查询PoolTick

`pool-ticks`命令允许用户查询PoolTick信息

```bash
metaosd query swap pool-ticks [flags]
```

###### 1.10.1 查询所有的PoolTick信息

示例:

```bash
metaosd query swap pool-ticks
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_ticks:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_outside0: "0"
  fee_growth_outside1: "0"
  index: 24000
  liquidity_gross: "45.3621929427803404693739454875"
  liquidity_net: "45.3621929427803404693739454875"
  reward_growth_outsides: []
  seconds_outside: "1660270340"
  seconds_per_liquidity_outside: "5.0000000000000000000000000000"
  tick_cumulative_outside: "128280"
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_outside0: "0"
  fee_growth_outside1: "0"
  index: 27000
  liquidity_gross: "45.3621929427803404693739454875"
  liquidity_net: "-45.3621929427803404693739454875"
  reward_growth_outsides: []
  seconds_outside: "0"
  seconds_per_liquidity_outside: "0"
  tick_cumulative_outside: "0"
```

###### 1.10.2 根据`address`查询PoolTick信息

示例:

```bash
metaosd query swap pool-ticks --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_ticks:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_outside0: "0"
  fee_growth_outside1: "0"
  index: 24000
  liquidity_gross: "45.3621929427803404693739454875"
  liquidity_net: "45.3621929427803404693739454875"
  reward_growth_outsides: []
  seconds_outside: "1660270340"
  seconds_per_liquidity_outside: "5.0000000000000000000000000000"
  tick_cumulative_outside: "128280"
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_outside0: "0"
  fee_growth_outside1: "0"
  index: 27000
  liquidity_gross: "45.3621929427803404693739454875"
  liquidity_net: "-45.3621929427803404693739454875"
  reward_growth_outsides: []
  seconds_outside: "0"
  seconds_per_liquidity_outside: "0"
  tick_cumulative_outside: "0"
```

###### 1.10.3 根据`address`和`index`查询PoolTick信息

示例:

```bash
metaosd query swap pool-ticks --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg --index 27000
```

输出示例:

```yaml
pool_tick:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  fee_growth_outside0: "0"
  fee_growth_outside1: "0"
  index: 27000
  liquidity_gross: "45.3621929427803404693739454875"
  liquidity_net: "-45.3621929427803404693739454875"
  reward_growth_outsides: []
  seconds_outside: "0"
  seconds_per_liquidity_outside: "0"
  tick_cumulative_outside: "0"
```

##### 1.11 查询PoolWord

`pool-words`命令允许用户查询PoolWord信息

###### 1.11.1 查询所有的PoolWord

示例:

```bash
metaosd query swap pool-words
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_words:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  index: 1
  word: "100000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
```

###### 1.11.2 根据`address`查询PoolWord

示例:

```bash
metaosd query swap pool-words --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例:

```yaml
pagination:
  next_key: null
  total: "0"
pool_words:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  index: 1
  word: "100000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
```

###### 1.11.3 根据`address`和`index`查询PoolWord

示例:

```bash
metaosd query swap pool-words --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg --index 1
```

输出示例:

```yaml
pool_word:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
  index: 1
  word: "100000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
```

##### 1.12 查询流动性仓位代币uri

`show-liquidity-position-token-uri`命令允许用户查询流动性仓位代币uri

```bash
metaosd query swap show-liquidity-position-token-uri [token-id] [flags]
```

示例:

```bash
metaosd query swap show-liquidity-position-token-uri nft-1
```

输出示例:

```yaml
uri: data:application/json;base64,ewoJIm5hbWUiOiJNZXRhT1MgLSAwLjMlIC0gV0VUSC9XQlRDIC0gMTEuMDIxPD4xNC44NzciLAoJImRlc2NyaXB0aW9uIjoiVGhpcyBORlQgcmVwcmVzZW50cyBhIGxpcXVpZGl0eSBwb3NpdGlvbiBpbiBhIE1ldGFPUyBXRVRILVdCVEMgcG9vbC4gVGhlIG93bmVyIG9mIHRoaXMgTkZUIGNhbiBtb2RpZnkgb3IgcmVkZWVtIHRoZSBwb3NpdGlvbi5cblxuUG9vbCBBZGRyZXNzOm10b3MxcHg2eXR1ajZreGpoanJ3ZXV5Y2NzNjIybGo3ZjRhdm1yaHR3dmdcbldFVEggQWRkcmVzczp0b2tlbi93ZXRoLzJcbldCVEMgQWRkcmVzczp0b2tlbi93YnRjLzFcbkZlZSBUaWVyOjAuMyVcblRva2VuIElEOjFcblxu4pqg77iPIERJU0NMQUlNRVI6IER1ZSBkaWxpZ2VuY2UgaXMgaW1wZXJhdGl2ZSB3aGVuIGFzc2Vzc2luZyB0aGlzIE5GVC4gTWFrZSBzdXJlIHRva2VuIGFkZHJlc3NlcyBtYXRjaCB0aGUgZXhwZWN0ZWQgdG9rZW5zLCBhcyB0b2tlbiBzeW1ib2xzIG1heSBiZSBpbWl0YXRlZC4iLAoJImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTWprd0lpQm9aV2xuYUhROUlqVXdNQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTVNQ0ExTURBaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJS0NYaHRiRzV6T25oc2FXNXJQU2RvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySno0S0NUeGtaV1p6UGdvSkNUeG1hV3gwWlhJZ2FXUTlJbVl4SWo0S0NRa0pQR1psU1cxaFoyVWdjbVZ6ZFd4MFBTSndNQ0lnZUd4cGJtczZhSEpsWmowaVpHRjBZVHBwYldGblpTOXpkbWNyZUcxc08ySmhjMlUyTkN4RGFuaDZaRzFqWjJReWJHdGtSMmM1U25wSk5VMURZMmRoUjFad1dqSm9NRkJUWXpGTlJFRnVTVWhhY0ZwWVpFTmlNMmM1U25wQlowMURRWGxQVkVGblRsUkJkMHA1UWpSaVYzaDFZM293Ym1GSVVqQmpSRzkyVEROa00yUjVOVE5OZVRWMlkyMWpkazFxUVhkTlF6bDZaRzFqYmxCbmIwcFFTRXBzV1ROUloyUXliR3RrUjJjNVNucEpOVTFJUWpSS2VVSnZXbGRzYm1GSVVUbEtlbFYzVFVoQ05FcDVRbTFoVjNoelVGTmphazFFVG14WlZFRTFTbms0SzBOcWQzWmpNMXB1VUdkdlBTSXZQZ29KQ1FrOFptVkpiV0ZuWlNCeVpYTjFiSFE5SW5BeElpQjRiR2x1YXpwb2NtVm1QU0prWVhSaE9tbHRZV2RsTDNOMlp5dDRiV3c3WW1GelpUWTBMRU5xZUhwa2JXTm5aREpzYTJSSFp6bEtla2sxVFVOaloyRkhWbkJhTW1nd1VGTmpNVTFFUVc1SlNGcHdXbGhrUTJJelp6bEtla0ZuVFVOQmVVOVVRV2RPVkVGM1NubENOR0pYZUhWamVqQnVZVWhTTUdORWIzWk1NMlF6WkhrMU0wMTVOWFpqYldOMlRXcEJkMDFET1hwa2JXTnVVR2R2U2xCSFRuQmpiVTV6V2xOQ2FtVkVNRzVOVkVFMVNubENhbVZVTUc1TmFsbDVTbmxDZVZCVFkzaE5ha0ozWlVOaloxcHRiSE5pUkRCdVNYcFpNbGxxWnpOUFEyTjJVR2R2T0V3elRqSmFlalJMSWk4K0Nna0pDVHhtWlVsdFlXZGxJSEpsYzNWc2REMGljRElpSUhoc2FXNXJPbWh5WldZOUltUmhkR0U2YVcxaFoyVXZjM1puSzNodGJEdGlZWE5sTmpRc1EycDRlbVJ0WTJka01teHJaRWRuT1VwNlNUVk5RMk5uWVVkV2NGb3lhREJRVTJNeFRVUkJia2xJV25CYVdHUkRZak5uT1VwNlFXZE5RMEY1VDFSQlowNVVRWGRLZVVJMFlsZDRkV042TUc1aFNGSXdZMFJ2ZGt3elpETmtlVFV6VFhrMWRtTnRZM1pOYWtGM1RVTTVlbVJ0WTI1UVoyOUtVRWRPY0dOdFRuTmFVMEpxWlVRd2JrMVVSVEpLZVVKcVpWUXdiazE2WXpCS2VVSjVVRk5qZUUxcVFuZGxRMk5uV20xc2MySkVNRzVKZWtGNldsZEZkMDlYVm1oUFYwVjZXa1JHYkZsdFVUSlpWRkY2VFRKR2FFOVhSVFZPUkZacVQxUm5lbHB0U20xWmVscG9UMWRGYmt4Nk5FdFFRemw2WkcxakswTm5QVDBpTHo0S0NRa0pQR1psU1cxaFoyVWdjbVZ6ZFd4MFBTSndNeUlnZUd4cGJtczZhSEpsWmowaVpHRjBZVHBwYldGblpTOXpkbWNyZUcxc08ySmhjMlUyTkN4RGFuaDZaRzFqWjJReWJHdGtSMmM1U25wSk5VMURZMmRoUjFad1dqSm9NRkJUWXpGTlJFRnVTVWhhY0ZwWVpFTmlNMmM1U25wQlowMURRWGxQVkVGblRsUkJkMHA1UWpSaVYzaDFZM293Ym1GSVVqQmpSRzkyVEROa00yUjVOVE5OZVRWMlkyMWpkazFxUVhkTlF6bDZaRzFqYmxCbmIwcFFSMDV3WTIxT2MxcFRRbXBsUkRCdVRYcG5ia2xIVGpWUVUyTjVUbnBGYmtsSVNUbEtla1YzVFVoQ05FcDVRbTFoVjNoelVGTmphazVxV21sUFJHTTBXVzFhYlU5RVRUTmFSRmt4VGpKS2EwOVhTbWxPYlZWNFRqSk5NRnBYU1hkUFZFMDFXa1JGTkUweVNYZGFhV04yVUdkdk9Fd3pUakphZWpSTElpOCtDZ2tKQ1R4bVpVSnNaVzVrSUcxdlpHVTlJbTkyWlhKc1lYa2lJR2x1UFNKd01DSWdhVzR5UFNKd01TSXZQZ29KQ1FrOFptVkNiR1Z1WkNCdGIyUmxQU0psZUdOc2RYTnBiMjRpSUdsdU1qMGljRElpTHo0S0NRa0pQR1psUW14bGJtUWdiVzlrWlQwaWIzWmxjbXhoZVNJZ2FXNHlQU0p3TXlJZ2NtVnpkV3gwUFNKaWJHVnVaRTkxZENJdlBnb2dJQ0FnSUNBZ0lDQWdJQ0E4Wm1WSFlYVnpjMmxoYmtKc2RYSWdhVzQ5SW1Kc1pXNWtUM1YwSWlCemRHUkVaWFpwWVhScGIyNDlJalF5SWk4K0NpQWdJQ0FnSUNBZ1BDOW1hV3gwWlhJK0NpQWdJQ0FnSUNBZ1BHTnNhWEJRWVhSb0lHbGtQU0pqYjNKdVpYSnpJajRLSUNBZ0lDQWdJQ0FnSUNBZ1BISmxZM1FnZDJsa2RHZzlJakk1TUNJZ2FHVnBaMmgwUFNJMU1EQWlJSEo0UFNJME1pSWdjbms5SWpReUlpOCtDaUFnSUNBZ0lDQWdQQzlqYkdsd1VHRjBhRDRLSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpZEdWNGRDMXdZWFJvTFdFaUlHUTlJazAwTUNBeE1pQklNalV3SUVFeU9DQXlPQ0F3SURBZ01TQXlOemdnTkRBZ1ZqUTJNQ0JCTWpnZ01qZ2dNQ0F3SURFZ01qVXdJRFE0T0NCSU5EQWdRVEk0SURJNElEQWdNQ0F4SURFeUlEUTJNQ0JXTkRBZ1FUSTRJREk0SURBZ01DQXhJRFF3SURFeUlIb2lMejRLSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpYldsdWFXMWhjQ0lnWkQwaVRUSXpOQ0EwTkRSRE1qTTBJRFExTnk0NU5Ea2dNalF5TGpJeElEUTJNeUF5TlRNZ05EWXpJaTgrQ2lBZ0lDQWdJQ0FnUEdacGJIUmxjaUJwWkQwaWRHOXdMWEpsWjJsdmJpMWliSFZ5SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQR1psUjJGMWMzTnBZVzVDYkhWeUlHbHVQU0pUYjNWeVkyVkhjbUZ3YUdsaklpQnpkR1JFWlhacFlYUnBiMjQ5SWpJMElpOCtDaUFnSUNBZ0lDQWdQQzltYVd4MFpYSStDaUFnSUNBZ0lDQWdQR3hwYm1WaGNrZHlZV1JwWlc1MElHbGtQU0puY21Ga0xYVndJaUI0TVQwaU1TSWdlREk5SWpBaUlIa3hQU0l4SWlCNU1qMGlNQ0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHpkRzl3SUc5bVpuTmxkRDBpTUM0d0lpQnpkRzl3TFdOdmJHOXlQU0ozYUdsMFpTSWdjM1J2Y0MxdmNHRmphWFI1UFNJeElpOCtDaUFnSUNBZ0lDQWdJQ0FnSUR4emRHOXdJRzltWm5ObGREMGlMamtpSUhOMGIzQXRZMjlzYjNJOUluZG9hWFJsSWlCemRHOXdMVzl3WVdOcGRIazlJakFpTHo0S0lDQWdJQ0FnSUNBOEwyeHBibVZoY2tkeVlXUnBaVzUwUGdvZ0lDQWdJQ0FnSUR4c2FXNWxZWEpIY21Ga2FXVnVkQ0JwWkQwaVozSmhaQzFrYjNkdUlpQjRNVDBpTUNJZ2VESTlJakVpSUhreFBTSXdJaUI1TWowaU1TSStDaUFnSUNBZ0lDQWdJQ0FnSUR4emRHOXdJRzltWm5ObGREMGlNQzR3SWlCemRHOXdMV052Ykc5eVBTSjNhR2wwWlNJZ2MzUnZjQzF2Y0dGamFYUjVQU0l4SWk4K0NpQWdJQ0FnSUNBZ0lDQWdJRHh6ZEc5d0lHOW1abk5sZEQwaU1DNDVJaUJ6ZEc5d0xXTnZiRzl5UFNKM2FHbDBaU0lnYzNSdmNDMXZjR0ZqYVhSNVBTSXdJaTgrQ2lBZ0lDQWdJQ0FnUEM5c2FXNWxZWEpIY21Ga2FXVnVkRDRLSUNBZ0lDQWdJQ0E4YldGemF5QnBaRDBpWm1Ga1pTMTFjQ0lnYldGemEwTnZiblJsYm5SVmJtbDBjejBpYjJKcVpXTjBRbTkxYm1ScGJtZENiM2dpUGdvZ0lDQWdJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVNJZ2FHVnBaMmgwUFNJeElpQm1hV3hzUFNKMWNtd29JMmR5WVdRdGRYQXBJaTgrQ2lBZ0lDQWdJQ0FnUEM5dFlYTnJQZ29nSUNBZ0lDQWdJRHh0WVhOcklHbGtQU0ptWVdSbExXUnZkMjRpSUcxaGMydERiMjUwWlc1MFZXNXBkSE05SW05aWFtVmpkRUp2ZFc1a2FXNW5RbTk0SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQSEpsWTNRZ2QybGtkR2c5SWpFaUlHaGxhV2RvZEQwaU1TSWdabWxzYkQwaWRYSnNLQ05uY21Ga0xXUnZkMjRwSWk4K0NpQWdJQ0FnSUNBZ1BDOXRZWE5yUGdvZ0lDQWdJQ0FnSUR4dFlYTnJJR2xrUFNKdWIyNWxJaUJ0WVhOclEyOXVkR1Z1ZEZWdWFYUnpQU0p2WW1wbFkzUkNiM1Z1WkdsdVowSnZlQ0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUhkcFpIUm9QU0l4SWlCb1pXbG5hSFE5SWpFaUlHWnBiR3c5SW5kb2FYUmxJaTgrQ2lBZ0lDQWdJQ0FnUEM5dFlYTnJQZ29nSUNBZ0lDQWdJRHhzYVc1bFlYSkhjbUZrYVdWdWRDQnBaRDBpWjNKaFpDMXplVzFpYjJ3aVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4YzNSdmNDQnZabVp6WlhROUlqQXVOeUlnYzNSdmNDMWpiMnh2Y2owaWQyaHBkR1VpSUhOMGIzQXRiM0JoWTJsMGVUMGlNU0l2UGdvZ0lDQWdJQ0FnSUNBZ0lDQThjM1J2Y0NCdlptWnpaWFE5SWk0NU5TSWdjM1J2Y0MxamIyeHZjajBpZDJocGRHVWlJSE4wYjNBdGIzQmhZMmwwZVQwaU1DSXZQZ29nSUNBZ0lDQWdJRHd2YkdsdVpXRnlSM0poWkdsbGJuUStDaUFnSUNBZ0lDQWdQRzFoYzJzZ2FXUTlJbVpoWkdVdGMzbHRZbTlzSWlCdFlYTnJRMjl1ZEdWdWRGVnVhWFJ6UFNKMWMyVnlVM0JoWTJWUGJsVnpaU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUhkcFpIUm9QU0l5T1RCd2VDSWdhR1ZwWjJoMFBTSXlNREJ3ZUNJZ1ptbHNiRDBpZFhKc0tDTm5jbUZrTFhONWJXSnZiQ2tpTHo0S0lDQWdJQ0FnSUNBOEwyMWhjMnMrQ2lBZ0lDQThMMlJsWm5NK0NpQWdJQ0E4WnlCamJHbHdMWEJoZEdnOUluVnliQ2dqWTI5eWJtVnljeWtpUGdvZ0lDQWdJQ0FnSUR4eVpXTjBJR1pwYkd3OUlqQXpaV0V3T1NJZ2VEMGlNSEI0SWlCNVBTSXdjSGdpSUhkcFpIUm9QU0l5T1RCd2VDSWdhR1ZwWjJoMFBTSTFNREJ3ZUNJdlBnb2dJQ0FnSUNBZ0lEeHlaV04wSUhOMGVXeGxQU0ptYVd4MFpYSTZJSFZ5YkNnalpqRXBJaUI0UFNJd2NIZ2lJSGs5SWpCd2VDSWdkMmxrZEdnOUlqSTVNSEI0SWlCb1pXbG5hSFE5SWpVd01IQjRJaTgrQ2lBZ0lDQWdJQ0FnUEdjZ2MzUjViR1U5SW1acGJIUmxjanAxY213b0kzUnZjQzF5WldkcGIyNHRZbXgxY2lrN0lIUnlZVzV6Wm05eWJUcHpZMkZzWlNneExqVXBPeUIwY21GdWMyWnZjbTB0YjNKcFoybHVPbU5sYm5SbGNpQjBiM0E3SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQSEpsWTNRZ1ptbHNiRDBpYm05dVpTSWdlRDBpTUhCNElpQjVQU0l3Y0hnaUlIZHBaSFJvUFNJeU9UQndlQ0lnYUdWcFoyaDBQU0kxTURCd2VDSXZQZ29nSUNBZ0lDQWdJQ0FnSUNBOFpXeHNhWEJ6WlNCamVEMGlOVEFsSWlCamVUMGlNSEI0SWlCeWVEMGlNVGd3Y0hnaUlISjVQU0l4TWpCd2VDSWdabWxzYkQwaUl6QXdNQ0lnYjNCaFkybDBlVDBpTUM0NE5TSXZQZ29nSUNBZ0lDQWdJRHd2Wno0S0lDQWdJQ0FnSUNBOGNtVmpkQ0I0UFNJd0lpQjVQU0l3SWlCM2FXUjBhRDBpTWprd0lpQm9aV2xuYUhROUlqVXdNQ0lnY25nOUlqUXlJaUJ5ZVQwaU5ESWlJR1pwYkd3OUluSm5ZbUVvTUN3d0xEQXNNQ2tpSUhOMGNtOXJaVDBpY21kaVlTZ3lOVFVzTWpVMUxESTFOU3d3TGpJcElpOCtDaUFnSUNBOEwyYytDaUFnSUNBOGRHVjRkQ0IwWlhoMExYSmxibVJsY21sdVp6MGliM0IwYVcxcGVtVlRjR1ZsWkNJK0NpQWdJQ0FnSUNBZ1BIUmxlSFJRWVhSb0lITjBZWEowVDJabWMyVjBQU0l0TVRBd0pTSWdabWxzYkQwaWQyaHBkR1VpSUdadmJuUXRabUZ0YVd4NVBTSW5RMjkxY21sbGNpQk9aWGNuTENCdGIyNXZjM0JoWTJVaUlHWnZiblF0YzJsNlpUMGlNVEJ3ZUNJZ2VHeHBibXM2YUhKbFpqMGlJM1JsZUhRdGNHRjBhQzFoSWo1MGIydGxiaTkzWW5Sakx6RWc0b0NpSUZkQ1ZFTUtJQ0FnSUNBZ0lDQWdJQ0FnUEdGdWFXMWhkR1VnWVdSa2FYUnBkbVU5SW5OMWJTSWdZWFIwY21saWRYUmxUbUZ0WlQwaWMzUmhjblJQWm1aelpYUWlJR1p5YjIwOUlqQWxJaUIwYnowaU1UQXdKU0lnWW1WbmFXNDlJakJ6SWlCa2RYSTlJak13Y3lJZ2NtVndaV0YwUTI5MWJuUTlJbWx1WkdWbWFXNXBkR1VpTHo0S0lDQWdJQ0FnSUNBOEwzUmxlSFJRWVhSb1Bnb2dJQ0FnSUNBZ0lEeDBaWGgwVUdGMGFDQnpkR0Z5ZEU5bVpuTmxkRDBpTUNVaUlHWnBiR3c5SW5kb2FYUmxJaUJtYjI1MExXWmhiV2xzZVQwaUowTnZkWEpwWlhJZ1RtVjNKeXdnYlc5dWIzTndZV05sSWlCbWIyNTBMWE5wZW1VOUlqRXdjSGdpSUhoc2FXNXJPbWh5WldZOUlpTjBaWGgwTFhCaGRHZ3RZU0krZEc5clpXNHZkMkowWXk4eElPS0FvaUJYUWxSRENpQWdJQ0FnSUNBZ0lDQWdJRHhoYm1sdFlYUmxJR0ZrWkdsMGFYWmxQU0p6ZFcwaUlHRjBkSEpwWW5WMFpVNWhiV1U5SW5OMFlYSjBUMlptYzJWMElpQm1jbTl0UFNJd0pTSWdkRzg5SWpFd01DVWlJR0psWjJsdVBTSXdjeUlnWkhWeVBTSXpNSE1pSUhKbGNHVmhkRU52ZFc1MFBTSnBibVJsWm1sdWFYUmxJaTgrQ2lBZ0lDQWdJQ0FnUEM5MFpYaDBVR0YwYUQ0S0lDQWdJQ0FnSUNBOGRHVjRkRkJoZEdnZ2MzUmhjblJQWm1aelpYUTlJalV3SlNJZ1ptbHNiRDBpZDJocGRHVWlJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1UQndlQ0lnZUd4cGJtczZhSEpsWmowaUkzUmxlSFF0Y0dGMGFDMWhJajUwYjJ0bGJpOTNaWFJvTHpJZzRvQ2lJRmRGVkVnS0lDQWdJQ0FnSUNBZ0lDQWdQR0Z1YVcxaGRHVWdZV1JrYVhScGRtVTlJbk4xYlNJZ1lYUjBjbWxpZFhSbFRtRnRaVDBpYzNSaGNuUlBabVp6WlhRaUlHWnliMjA5SWpBbElpQjBiejBpTVRBd0pTSWdZbVZuYVc0OUlqQnpJaUJrZFhJOUlqTXdjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlMejRLSUNBZ0lDQWdJQ0E4TDNSbGVIUlFZWFJvUGdvZ0lDQWdJQ0FnSUR4MFpYaDBVR0YwYUNCemRHRnlkRTltWm5ObGREMGlMVFV3SlNJZ1ptbHNiRDBpZDJocGRHVWlJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1UQndlQ0lnZUd4cGJtczZhSEpsWmowaUkzUmxlSFF0Y0dGMGFDMWhJajUwYjJ0bGJpOTNaWFJvTHpJZzRvQ2lJRmRGVkVnS0lDQWdJQ0FnSUNBZ0lDQWdQR0Z1YVcxaGRHVWdZV1JrYVhScGRtVTlJbk4xYlNJZ1lYUjBjbWxpZFhSbFRtRnRaVDBpYzNSaGNuUlBabVp6WlhRaUlHWnliMjA5SWpBbElpQjBiejBpTVRBd0pTSWdZbVZuYVc0OUlqQnpJaUJrZFhJOUlqTXdjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlMejRLSUNBZ0lDQWdJQ0E4TDNSbGVIUlFZWFJvUGdvZ0lDQWdQQzkwWlhoMFBnb2dJQ0FnUEdjZ2JXRnphejBpZFhKc0tDTm1ZV1JsTFhONWJXSnZiQ2tpUGdvZ0lDQWdJQ0FnSUR4eVpXTjBJR1pwYkd3OUltNXZibVVpSUhnOUlqQndlQ0lnZVQwaU1IQjRJaUIzYVdSMGFEMGlNamt3Y0hnaUlHaGxhV2RvZEQwaU1qQXdjSGdpTHo0S0lDQWdJQ0FnSUNBOGRHVjRkQ0I1UFNJM01IQjRJaUI0UFNJek1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJZ1ptOXVkQzFtWVcxcGJIazlJaWREYjNWeWFXVnlJRTVsZHljc0lHMXZibTl6Y0dGalpTSWdabTl1ZEMxM1pXbG5hSFE5SWpJd01DSWdabTl1ZEMxemFYcGxQU0l6Tm5CNElqNVhSVlJJTDFkQ1ZFTThMM1JsZUhRK0NpQWdJQ0FnSUNBZ1BIUmxlSFFnZVQwaU1URTFjSGdpSUhnOUlqTXljSGdpSUdacGJHdzlJbmRvYVhSbElpQm1iMjUwTFdaaGJXbHNlVDBpSjBOdmRYSnBaWElnVG1WM0p5d2diVzl1YjNOd1lXTmxJaUJtYjI1MExYZGxhV2RvZEQwaU1qQXdJaUJtYjI1MExYTnBlbVU5SWpNMmNIZ2lQakF1TXlVOEwzUmxlSFErQ2lBZ0lDQThMMmMrQ2lBZ0lDQThjbVZqZENCNFBTSXhOaUlnZVQwaU1UWWlJSGRwWkhSb1BTSXlOVGdpSUdobGFXZG9kRDBpTkRZNElpQnllRDBpTWpZaUlISjVQU0l5TmlJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0tTSWdjM1J5YjJ0bFBTSnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVNaWtpTHo0S0lDQWdJRHhuSUcxaGMyczlJblZ5YkNnamJtOXVaU2tpSUhOMGVXeGxQU0owY21GdWMyWnZjbTA2ZEhKaGJuTnNZWFJsS0RjeWNIZ3NNVGc1Y0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCNFBTSXRNVFp3ZUNJZ2VUMGlMVEUyY0hnaUlIZHBaSFJvUFNJeE9EQndlQ0lnYUdWcFoyaDBQU0l4T0RCd2VDSWdabWxzYkQwaWJtOXVaU0l2UGdvZ0lDQWdJQ0FnSUR4d1lYUm9JR1E5SWsweElERkRNVGNnTnpNZ056TWdNVEk1SURFME5TQXhORFVpSUhOMGNtOXJaVDBpY21kaVlTZ3dMREFzTUN3d0xqTXBJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqTXljSGdpSUdacGJHdzlJbTV2Ym1VaUlITjBjbTlyWlMxc2FXNWxZMkZ3UFNKeWIzVnVaQ0l2UGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYldGemF6MGlkWEpzS0NOdWIyNWxLU0lnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTnpKd2VDd3hPRGx3ZUNraVBnb2dJQ0FnSUNBZ0lEeHlaV04wSUhnOUlpMHhObkI0SWlCNVBTSXRNVFp3ZUNJZ2QybGtkR2c5SWpFNE1IQjRJaUJvWldsbmFIUTlJakU0TUhCNElpQm1hV3hzUFNKdWIyNWxJaTgrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFZ01VTXhOeUEzTXlBM015QXhNamtnTVRRMUlERTBOU0lnYzNSeWIydGxQU0p5WjJKaEtESTFOU3d5TlRVc01qVTFMREVwSWlCbWFXeHNQU0p1YjI1bElpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpTHo0S0lDQWdJRHd2Wno0S0lDQWdJRHhqYVhKamJHVWdZM2c5SWpjemNIZ2lJR041UFNJeE9UQndlQ0lnY2owaU5IQjRJaUJtYVd4c1BTSjNhR2wwWlNJdlBnb2dJQ0FnUEdOcGNtTnNaU0JqZUQwaU1qRTNjSGdpSUdONVBTSXpNelJ3ZUNJZ2NqMGlOSEI0SWlCbWFXeHNQU0ozYUdsMFpTSXZQZ284WnlCemRIbHNaVDBpZEhKaGJuTm1iM0p0T25SeVlXNXpiR0YwWlNneU9YQjRMQ0F6T0RSd2VDa2lQZ29nSUNBZ0lDQWdJRHh5WldOMElIZHBaSFJvUFNJMk0zQjRJaUJvWldsbmFIUTlJakkyY0hnaUlISjRQU0k0Y0hnaUlISjVQU0k0Y0hnaUlHWnBiR3c5SW5KblltRW9NQ3d3TERBc01DNDJLU0l2UGdvZ0lDQWdJQ0FnSUR4MFpYaDBJSGc5SWpFeWNIZ2lJSGs5SWpFM2NIZ2lJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1USndlQ0lnWm1sc2JEMGlkMmhwZEdVaVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4ZEhOd1lXNGdabWxzYkQwaWNtZGlZU2d5TlRVc01qVTFMREkxTlN3d0xqWXBJajVKUkRvZ1BDOTBjM0JoYmo0eENpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpsd2VDd2dOREUwY0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRNemNIZ2lJR2hsYVdkb2REMGlNalp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0xqWXBJaTgrQ2lBZ0lDQWdJQ0FnUEhSbGVIUWdlRDBpTVRKd2VDSWdlVDBpTVRkd2VDSWdabTl1ZEMxbVlXMXBiSGs5SWlkRGIzVnlhV1Z5SUU1bGR5Y3NJRzF2Ym05emNHRmpaU0lnWm05dWRDMXphWHBsUFNJeE1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJRHgwYzNCaGJpQm1hV3hzUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU5pa2lQazFwYmlCVWFXTnJPaUE4TDNSemNHRnVQakkwTURBd0NpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpsd2VDd2dORFEwY0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRNemNIZ2lJR2hsYVdkb2REMGlNalp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0xqWXBJaTgrQ2lBZ0lDQWdJQ0FnUEhSbGVIUWdlRDBpTVRKd2VDSWdlVDBpTVRkd2VDSWdabTl1ZEMxbVlXMXBiSGs5SWlkRGIzVnlhV1Z5SUU1bGR5Y3NJRzF2Ym05emNHRmpaU0lnWm05dWRDMXphWHBsUFNJeE1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJRHgwYzNCaGJpQm1hV3hzUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU5pa2lQazFoZUNCVWFXTnJPaUE4TDNSemNHRnVQakkzTURBd0NpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpJMmNIZ3NJRFF6TTNCNEtTSStDaUFnSUNBZ0lDQWdQSEpsWTNRZ2QybGtkR2c5SWpNMmNIZ2lJR2hsYVdkb2REMGlNelp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpYm05dVpTSWdjM1J5YjJ0bFBTSnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVNaWtpTHo0S0lDQWdJQ0FnSUNBOGNHRjBhQ0J6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlHUTlJazA0SURsRE9DNHdNREF3TkNBeU1pNDVORGswSURFMkxqSXdPVGtnTWpnZ01qY2dNamdpSUdacGJHdzlJbTV2Ym1VaUlITjBjbTlyWlQwaWQyaHBkR1VpTHo0S0lDQWdJQ0FnSUNBOFkybHlZMnhsSUhOMGVXeGxQU0owY21GdWMyWnZjbTA2ZEhKaGJuTnNZWFJsTTJRb01UaHdlQ3dnTWpad2VDd2dNSEI0S1NJZ1kzZzlJakJ3ZUNJZ1kzazlJakJ3ZUNJZ2NqMGlOSEI0SWlCbWFXeHNQU0ozYUdsMFpTSXZQZ29nSUNBZ1BDOW5QZ29KUEdjZ2MzUjViR1U5SW5SeVlXNXpabTl5YlRwMGNtRnVjMnhoZEdVb01qSTJjSGdzSURNNU1uQjRLU0krQ2drSlBISmxZM1FnZDJsa2RHZzlJak0yY0hnaUlHaGxhV2RvZEQwaU16WndlQ0lnY25nOUlqaHdlQ0lnY25rOUlqaHdlQ0lnWm1sc2JEMGlibTl1WlNJZ2MzUnliMnRsUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU1pa2lMejRuTEFvSkNUeG5QZ29KQ1FrOGNHRjBhQ0J6ZEhsc1pUMGlkSEpoYm5ObWIzSnRPblJ5WVc1emJHRjBaU2cyY0hnc05uQjRLU0lnWkQwaVRURXlJREJNTVRJdU5qVXlNaUE1TGpVMk5UZzNUREU0SURFdU5qQTNOMHd4TXk0M09ERTVJREV3TGpJeE9ERk1Nakl1TXpreU15QTJUREUwTGpRek5ERWdMREV4TGpNME56aE1NalFnTVRKTU1UUXVORE0wTVNBeE1pNDJOVEl5VERJeUxqTTVNak1nTVRoTU1UTXVOemd4T1NBeE15NDNPREU1VERFNElESXlMak01TWpOTU1USXVOalV5TWlBeE5DNDBNelF4VERFeUlESTBUREV4TGpNME56Z2dNVFF1TkRNME1VdzJJREl5TGpNNUp5d3lNMHd4TUM0eU1UZ3hJREV6TGpjNE1UbE1NUzQyTURjM0lERTRURGt1TlRZMU9EY2dNVEl1TmpVeU1rd3dJREV5VERrdU5UWTFPRGNnTVRFdU16UTNPRXd4TGpZd056Y2dOa3d4TUM0eU1UZ3hJREV3TGpJeE9ERk1OaUF4TGpZd056ZE1NVEV1TXpRM09DQTVMalUyTlRnM1RERXlJREJhSWlCbWFXeHNQU0ozYUdsMFpTSXZQaXdLQ1FrSlBHRnVhVzFoZEdWVWNtRnVjMlp2Y20wZ1lYUjBjbWxpZFhSbFRtRnRaVDBpZEhKaGJuTm1iM0p0SWlCMGVYQmxQU0p5YjNSaGRHVWlJR1p5YjIwOUlqQWdNVGdnTVRnaUlIUnZQU0l6TmpBZ01UZ2dNVGdpSUdSMWNqMGlNVEJ6SWlCeVpYQmxZWFJEYjNWdWREMGlhVzVrWldacGJtbDBaU0l2UGdvSkNUd3ZaejRLQ1R3dlp6NEtQQzl6ZG1jK0NnPT0iCn0K
```

##### 1.13 查询精确输入的交易报价

`quote-swap-exact-in`命令允许查询精确输入的交易报价

```bash
metaosd query swap quote-swap-exact-in [amount-in] [flags]
```

示例:

```bash
metaosd query swap quote-swap-exact-in 100000000 --swap-denoms token/wbtc/1,token/weth/2 --swap-fees 3000
```

输出示例:

```yaml
amount_out: "12957652401107766574"
available: true
gas_used: "40985"
initialized_ticks_crossed: 0
```

##### 1.14 查询精确输出的交易报价

`quote-swap-exact-out`命令允许用户查询精确输出的交易报价

```bash
metaosd query swap quote-swap-exact-out [amount-out] [flags]
```

示例:

```bash
metaosd query swap quote-swap-exact-out 1000000000000000000 --swap-denoms token/wbtc/1,token/weth/2 --swap-fees 3000
```

输出示例:

```yaml
amount_in: null
available: false
gas_used: "0"
initialized_ticks_crossed: 0
```

##### 1.15 核心池

`core-pools` 命令允许用户查询所有核心池。

```bash
metaosd query swap core-pools [flags]
```

###### 1.15.1 查询所有的核心池

示例:

```bash
metaosd query swap core-pools
```

输出示例：

```yaml
core_pools:
- address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
pagination:
  next_key: null
  total: "0"
```

###### 1.15.2 根据`address`查询核心池

示例:

```bash
metaosd query swap core-pools --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

输出示例：

```yaml
corePool:
  address: mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

#### 2. 交易

`tx` 命令允许用户与 `swap` 模块进行交互。

```bash
metaosd tx swap --help
```

##### 2.1 创建流动池

`create-pool`命令允许用户创建流动池

```bash
metaosd tx swap create-pool [denom0] [denom1] [sqrt-price] [flags]
```

示例:

```
metaosd tx swap create-pool token/wbtc/1 token/weth/2 3.6065 --pool-fee 3000
```

##### 2.2 创建仓位

`create-position`命令允许用户创建仓位

```bash
metaosd tx swap create-position [denom0] [denom1] [tick-lower] [tick-upper] [amount0-desired] [amount1-desired] [amount0-min] [amount1-min] [recipient] [deadline] [flags]
```

示例:

```bash
metaosd tx swap create-position token/wbtc/1 token/weth/2 24000 27000 100000000 13000000000000000000 0 0 mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh 2022-08-12T08:00:00Z --pool-fee 3000
```

##### 2.3 添加流动性

`increase-liquidity`命令允许用户添加流动性

```bash
metaosd tx swap increase-liquidity [token-id] [amount0-desired] [amount1-desired] [amount0-min] [amount1-min] [deadline] [flags]
```

示例:

```bash
metaosd tx swap increase-liquidity nft-1 10000000000 1300000000000000000000 0 0 2022-08-12T08:00:00Z
```

##### 2.4 减少流动性

`decrease-liquidity`命令允许用户减少流动性

```bash
metaosd tx swap decrease-liquidity [token-id] [liquidity] [amount0-min] [amount1-min] [deadline] [flags]
```

示例:

```bash
metaosd tx swap decrease-liquidity nft-1 8 0 0 2022-08-12T08:00:00Z
```

##### 2.5 领取奖励

`collect`命令允许用户领取奖励

```bash
metaosd tx swap collect [token-id] [recipient] [amount0-max] [amount1-max] [flags]
```

示例:

```bash
metaosd tx swap collect nft-1 mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh 1 0
```

##### 2.6 精确输入交易

`swap-exact-in`命令允许用户执行精确输入的交易

```bash
metaosd tx swap swap-exact-in [recipient] [amount-in] [amount-out-min] [deadline] [flags]
```

示例:

```bash
metaosd tx swap swap-exact-in mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh 20000000 2500000000000000000 2022-08-12T08:00:00Z --swap-denoms token/wbtc/1,token/weth/2 --swap-fees 3000
```

##### 2.7 精确输出交易

`swap-exact-out`命令允许用户执行精确输出的交易

```bash
metaosd tx swap swap-exact-out [recipient] [amount-out] [amount-in-max] [deadline] [flags]
```

示例:

```bash
metaosd tx swap swap-exact-out mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh 2500000000000000000 20000000 2022-08-12T08:00:00Z --swap-denoms token/wbtc/1,token/weth/2 --swap-fees 3000
```

##### 2.8 领取奖励

`collect-reward`命令允许用户领取奖励

```bash
metaosd tx swap collect-reward [token-id] [recipient] [flags]
```

示例:

```bash
metaosd tx swap collect-reward nft-1 mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh
```

##### 2.9 领取协议费用

`collect-fee-protocol`命令允许用户领取协议费用

```bash
metaosd tx swap collect-fee-protocol [flags]
```

示例:

```bash
metaosd tx swap collect-fee-protocol --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

##### 2.10 核心池治理

`gov-core-pool`命令允许用户治理核心池

```
metaosd tx swap gov-core-pool [action] [trigger-time] [flags]
```

###### 2.10.1 添加核心池

示例:

```bash
metaosd tx swap gov-core-pool add 2022-08-11T10:18:00Z --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

###### 2.10.2 移除核心池

示例:

```bash
metaosd tx swap gov-core-pool remove 2022-08-11T10:19:00Z --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg
```

##### 2.11 启用交易费用提案

通过`gov`模块的`submit-proposal`命令来提交`enable-swap-fee`提案.

```bash
metaosd tx gov submit-proposal enable-swap-fee [tick-spacing] [flags]
```

示例:

```bash
metaosd tx gov submit-proposal enable-swap-fee 2 --pool-fee 200 --title 'Enable pool fee for 0.02%' --description 'Enable pool fee for 0.02%, and tick spacing is 200.' --deposit 10000umtos
```

##### 2.12 更新核心池

通过`gov`模块的`submit-proposal`命令来提交`update-core-pool`提案.

```bash
metaosd tx gov submit-proposal update-core-pool [action] [trigger-time] [flags]
```

示例:

```bash
metaosd tx gov submit-proposal update-core-pool add '2022-08-11T10:18:00Z' --address mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg --title 'Update core pool' --description 'Update core pool' --deposit 10000umtos
```

-----------------

### gRPC

用户可以使用 gRPC 端点查询`swap`模块。

#### 1. `NonfungiblePositionPool`允许查询NonfungiblePositionPool

`NonfungiblePositionPool`允许用户查询NonfungiblePositionPool。

```bash
metaoslabs.metaos.swap.Query/NonfungiblePositionPool
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/NonfungiblePositionPool
```

输出示例：

```json
{
  "nonfungiblePositionPool": {
    "nextTokenId": "1"
  }
}
```

#### 2. `LiquidityPosition`允许用户查询流动性仓位

```
metaoslabs.metaos.swap.Query/LiquidityPosition
```

示例:

```json
grpcurl -plaintext \
		-d '{"token_id": "nft-1"}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/LiquidityPosition
```

输出示例:

```json
{
  "liquidityPosition": {
    "tokenId": "nft-1",
    "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
    "feeGrowthInside0Last": "\u0000\u0000\u0000\u0000\u0002",
    "feeGrowthInside1Last": "\u0000\u0000\u0000\u0000\u0002",
    "tokensOwed0": "\u0000\u0000\u0000\u001c\u0002",
    "tokensOwed1": "\u0000\u0000\u0000\u001c\u0002",
    "tickLower": 24000,
    "tickUpper": 27000,
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
  }
}
```

#### 3. `LiquidityPositionByIds`允许通过ids查询流动性仓位

```
metaoslabs.metaos.swap.Query/LiquidityPositionByIds
```

示例:

```bash
grpcurl -plaintext \
		-d '{"token_ids": ["nft-1"] }' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/LiquidityPositionByIds
```

输出示例:

```bash
{
  "liquidityPositions": [
    {
      "tokenId": "nft-1",
      "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "feeGrowthInside0Last": "\u0000\u0000\u0000\u0000\u0002",
      "feeGrowthInside1Last": "\u0000\u0000\u0000\u0000\u0002",
      "tokensOwed0": "\u0000\u0000\u0000\u001c\u0002",
      "tokensOwed1": "\u0000\u0000\u0000\u001c\u0002",
      "tickLower": 24000,
      "tickUpper": 27000,
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
    }
  ]
}
```

#### 4. `LiquidityPositionAll`允许查询所有的流动性仓位

```
metaoslabs.metaos.swap.Query/LiquidityPositionAll
```

示例:

```
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/LiquidityPositionAll
```

输出示例:

```json
{
  "liquidityPositions": [
    {
      "tokenId": "nft-1",
      "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "feeGrowthInside0Last": "\u0000\u0000\u0000\u0000\u0002",
      "feeGrowthInside1Last": "\u0000\u0000\u0000\u0000\u0002",
      "tokensOwed0": "\u0000\u0000\u0000\u0000\u0002",
      "tokensOwed1": "\u0000\u0000\u0000\u0000\u0002",
      "tickLower": 24000,
      "tickUpper": 27000,
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

#### 5. `LiquidityPositionOwner`允许根据`owner`查询流动性仓位

```bash
metaoslabs.metaos.swap.Query/LiquidityPositionOwner
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address":"mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh","skip_zero_liquidity":false}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/LiquidityPositionOwner
```

输出示例:

```json
{
  "liquidityPositions": [
    {
      "tokenId": "nft-1",
      "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "feeGrowthInside0Last": "\u0000\u0000\u0000\u0000\u0002",
      "feeGrowthInside1Last": "\u0000\u0000\u0000\u0000\u0002",
      "tokensOwed0": "\u0000\u0000\u0000\u0000\u0002",
      "tokensOwed1": "\u0000\u0000\u0000\u0000\u0002",
      "tickLower": 24000,
      "tickUpper": 27000,
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
    }
  ]
}
```

#### 6. `LiquidityPositionTokenUri`允许查询流动性仓位代币uri

```
metaoslabs.metaos.swap.Query/LiquidityPositionTokenUri
```

示例:

```bash
grpcurl -plaintext \
		-d '{"token_id":"nft-1"}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/LiquidityPositionTokenUri
```

输出示例:

```json
{
  "uri": "data:application/json;base64,ewoJIm5hbWUiOiJNZXRhT1MgLSAwLjMlIC0gV0VUSC9XQlRDIC0gMTEuMDIxPD4xNC44NzciLAoJImRlc2NyaXB0aW9uIjoiVGhpcyBORlQgcmVwcmVzZW50cyBhIGxpcXVpZGl0eSBwb3NpdGlvbiBpbiBhIE1ldGFPUyBXRVRILVdCVEMgcG9vbC4gVGhlIG93bmVyIG9mIHRoaXMgTkZUIGNhbiBtb2RpZnkgb3IgcmVkZWVtIHRoZSBwb3NpdGlvbi5cblxuUG9vbCBBZGRyZXNzOm10b3MxcHg2eXR1ajZreGpoanJ3ZXV5Y2NzNjIybGo3ZjRhdm1yaHR3dmdcbldFVEggQWRkcmVzczp0b2tlbi93ZXRoLzJcbldCVEMgQWRkcmVzczp0b2tlbi93YnRjLzFcbkZlZSBUaWVyOjAuMyVcblRva2VuIElEOjFcblxu4pqg77iPIERJU0NMQUlNRVI6IER1ZSBkaWxpZ2VuY2UgaXMgaW1wZXJhdGl2ZSB3aGVuIGFzc2Vzc2luZyB0aGlzIE5GVC4gTWFrZSBzdXJlIHRva2VuIGFkZHJlc3NlcyBtYXRjaCB0aGUgZXhwZWN0ZWQgdG9rZW5zLCBhcyB0b2tlbiBzeW1ib2xzIG1heSBiZSBpbWl0YXRlZC4iLAoJImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTWprd0lpQm9aV2xuYUhROUlqVXdNQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTVNQ0ExTURBaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJS0NYaHRiRzV6T25oc2FXNXJQU2RvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySno0S0NUeGtaV1p6UGdvSkNUeG1hV3gwWlhJZ2FXUTlJbVl4SWo0S0NRa0pQR1psU1cxaFoyVWdjbVZ6ZFd4MFBTSndNQ0lnZUd4cGJtczZhSEpsWmowaVpHRjBZVHBwYldGblpTOXpkbWNyZUcxc08ySmhjMlUyTkN4RGFuaDZaRzFqWjJReWJHdGtSMmM1U25wSk5VMURZMmRoUjFad1dqSm9NRkJUWXpGTlJFRnVTVWhhY0ZwWVpFTmlNMmM1U25wQlowMURRWGxQVkVGblRsUkJkMHA1UWpSaVYzaDFZM293Ym1GSVVqQmpSRzkyVEROa00yUjVOVE5OZVRWMlkyMWpkazFxUVhkTlF6bDZaRzFqYmxCbmIwcFFTRXBzV1ROUloyUXliR3RrUjJjNVNucEpOVTFJUWpSS2VVSnZXbGRzYm1GSVVUbEtlbFYzVFVoQ05FcDVRbTFoVjNoelVGTmphazFFVG14WlZFRTFTbms0SzBOcWQzWmpNMXB1VUdkdlBTSXZQZ29KQ1FrOFptVkpiV0ZuWlNCeVpYTjFiSFE5SW5BeElpQjRiR2x1YXpwb2NtVm1QU0prWVhSaE9tbHRZV2RsTDNOMlp5dDRiV3c3WW1GelpUWTBMRU5xZUhwa2JXTm5aREpzYTJSSFp6bEtla2sxVFVOaloyRkhWbkJhTW1nd1VGTmpNVTFFUVc1SlNGcHdXbGhrUTJJelp6bEtla0ZuVFVOQmVVOVVRV2RPVkVGM1NubENOR0pYZUhWamVqQnVZVWhTTUdORWIzWk1NMlF6WkhrMU0wMTVOWFpqYldOMlRXcEJkMDFET1hwa2JXTnVVR2R2U2xCSFRuQmpiVTV6V2xOQ2FtVkVNRzVOVkVFMVNubENhbVZVTUc1TmFsbDVTbmxDZVZCVFkzaE5ha0ozWlVOaloxcHRiSE5pUkRCdVNYcFpNbGxxWnpOUFEyTjJVR2R2T0V3elRqSmFlalJMSWk4K0Nna0pDVHhtWlVsdFlXZGxJSEpsYzNWc2REMGljRElpSUhoc2FXNXJPbWh5WldZOUltUmhkR0U2YVcxaFoyVXZjM1puSzNodGJEdGlZWE5sTmpRc1EycDRlbVJ0WTJka01teHJaRWRuT1VwNlNUVk5RMk5uWVVkV2NGb3lhREJRVTJNeFRVUkJia2xJV25CYVdHUkRZak5uT1VwNlFXZE5RMEY1VDFSQlowNVVRWGRLZVVJMFlsZDRkV042TUc1aFNGSXdZMFJ2ZGt3elpETmtlVFV6VFhrMWRtTnRZM1pOYWtGM1RVTTVlbVJ0WTI1UVoyOUtVRWRPY0dOdFRuTmFVMEpxWlVRd2JrMVVSVEpLZVVKcVpWUXdiazE2WXpCS2VVSjVVRk5qZUUxcVFuZGxRMk5uV20xc2MySkVNRzVKZWtGNldsZEZkMDlYVm1oUFYwVjZXa1JHYkZsdFVUSlpWRkY2VFRKR2FFOVhSVFZPUkZacVQxUm5lbHB0U20xWmVscG9UMWRGYmt4Nk5FdFFRemw2WkcxakswTm5QVDBpTHo0S0NRa0pQR1psU1cxaFoyVWdjbVZ6ZFd4MFBTSndNeUlnZUd4cGJtczZhSEpsWmowaVpHRjBZVHBwYldGblpTOXpkbWNyZUcxc08ySmhjMlUyTkN4RGFuaDZaRzFqWjJReWJHdGtSMmM1U25wSk5VMURZMmRoUjFad1dqSm9NRkJUWXpGTlJFRnVTVWhhY0ZwWVpFTmlNMmM1U25wQlowMURRWGxQVkVGblRsUkJkMHA1UWpSaVYzaDFZM293Ym1GSVVqQmpSRzkyVEROa00yUjVOVE5OZVRWMlkyMWpkazFxUVhkTlF6bDZaRzFqYmxCbmIwcFFSMDV3WTIxT2MxcFRRbXBsUkRCdVRYcG5ia2xIVGpWUVUyTjVUbnBGYmtsSVNUbEtla1YzVFVoQ05FcDVRbTFoVjNoelVGTmphazVxV21sUFJHTTBXVzFhYlU5RVRUTmFSRmt4VGpKS2EwOVhTbWxPYlZWNFRqSk5NRnBYU1hkUFZFMDFXa1JGTkUweVNYZGFhV04yVUdkdk9Fd3pUakphZWpSTElpOCtDZ2tKQ1R4bVpVSnNaVzVrSUcxdlpHVTlJbTkyWlhKc1lYa2lJR2x1UFNKd01DSWdhVzR5UFNKd01TSXZQZ29KQ1FrOFptVkNiR1Z1WkNCdGIyUmxQU0psZUdOc2RYTnBiMjRpSUdsdU1qMGljRElpTHo0S0NRa0pQR1psUW14bGJtUWdiVzlrWlQwaWIzWmxjbXhoZVNJZ2FXNHlQU0p3TXlJZ2NtVnpkV3gwUFNKaWJHVnVaRTkxZENJdlBnb2dJQ0FnSUNBZ0lDQWdJQ0E4Wm1WSFlYVnpjMmxoYmtKc2RYSWdhVzQ5SW1Kc1pXNWtUM1YwSWlCemRHUkVaWFpwWVhScGIyNDlJalF5SWk4K0NpQWdJQ0FnSUNBZ1BDOW1hV3gwWlhJK0NpQWdJQ0FnSUNBZ1BHTnNhWEJRWVhSb0lHbGtQU0pqYjNKdVpYSnpJajRLSUNBZ0lDQWdJQ0FnSUNBZ1BISmxZM1FnZDJsa2RHZzlJakk1TUNJZ2FHVnBaMmgwUFNJMU1EQWlJSEo0UFNJME1pSWdjbms5SWpReUlpOCtDaUFnSUNBZ0lDQWdQQzlqYkdsd1VHRjBhRDRLSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpZEdWNGRDMXdZWFJvTFdFaUlHUTlJazAwTUNBeE1pQklNalV3SUVFeU9DQXlPQ0F3SURBZ01TQXlOemdnTkRBZ1ZqUTJNQ0JCTWpnZ01qZ2dNQ0F3SURFZ01qVXdJRFE0T0NCSU5EQWdRVEk0SURJNElEQWdNQ0F4SURFeUlEUTJNQ0JXTkRBZ1FUSTRJREk0SURBZ01DQXhJRFF3SURFeUlIb2lMejRLSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpYldsdWFXMWhjQ0lnWkQwaVRUSXpOQ0EwTkRSRE1qTTBJRFExTnk0NU5Ea2dNalF5TGpJeElEUTJNeUF5TlRNZ05EWXpJaTgrQ2lBZ0lDQWdJQ0FnUEdacGJIUmxjaUJwWkQwaWRHOXdMWEpsWjJsdmJpMWliSFZ5SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQR1psUjJGMWMzTnBZVzVDYkhWeUlHbHVQU0pUYjNWeVkyVkhjbUZ3YUdsaklpQnpkR1JFWlhacFlYUnBiMjQ5SWpJMElpOCtDaUFnSUNBZ0lDQWdQQzltYVd4MFpYSStDaUFnSUNBZ0lDQWdQR3hwYm1WaGNrZHlZV1JwWlc1MElHbGtQU0puY21Ga0xYVndJaUI0TVQwaU1TSWdlREk5SWpBaUlIa3hQU0l4SWlCNU1qMGlNQ0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHpkRzl3SUc5bVpuTmxkRDBpTUM0d0lpQnpkRzl3TFdOdmJHOXlQU0ozYUdsMFpTSWdjM1J2Y0MxdmNHRmphWFI1UFNJeElpOCtDaUFnSUNBZ0lDQWdJQ0FnSUR4emRHOXdJRzltWm5ObGREMGlMamtpSUhOMGIzQXRZMjlzYjNJOUluZG9hWFJsSWlCemRHOXdMVzl3WVdOcGRIazlJakFpTHo0S0lDQWdJQ0FnSUNBOEwyeHBibVZoY2tkeVlXUnBaVzUwUGdvZ0lDQWdJQ0FnSUR4c2FXNWxZWEpIY21Ga2FXVnVkQ0JwWkQwaVozSmhaQzFrYjNkdUlpQjRNVDBpTUNJZ2VESTlJakVpSUhreFBTSXdJaUI1TWowaU1TSStDaUFnSUNBZ0lDQWdJQ0FnSUR4emRHOXdJRzltWm5ObGREMGlNQzR3SWlCemRHOXdMV052Ykc5eVBTSjNhR2wwWlNJZ2MzUnZjQzF2Y0dGamFYUjVQU0l4SWk4K0NpQWdJQ0FnSUNBZ0lDQWdJRHh6ZEc5d0lHOW1abk5sZEQwaU1DNDVJaUJ6ZEc5d0xXTnZiRzl5UFNKM2FHbDBaU0lnYzNSdmNDMXZjR0ZqYVhSNVBTSXdJaTgrQ2lBZ0lDQWdJQ0FnUEM5c2FXNWxZWEpIY21Ga2FXVnVkRDRLSUNBZ0lDQWdJQ0E4YldGemF5QnBaRDBpWm1Ga1pTMTFjQ0lnYldGemEwTnZiblJsYm5SVmJtbDBjejBpYjJKcVpXTjBRbTkxYm1ScGJtZENiM2dpUGdvZ0lDQWdJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVNJZ2FHVnBaMmgwUFNJeElpQm1hV3hzUFNKMWNtd29JMmR5WVdRdGRYQXBJaTgrQ2lBZ0lDQWdJQ0FnUEM5dFlYTnJQZ29nSUNBZ0lDQWdJRHh0WVhOcklHbGtQU0ptWVdSbExXUnZkMjRpSUcxaGMydERiMjUwWlc1MFZXNXBkSE05SW05aWFtVmpkRUp2ZFc1a2FXNW5RbTk0SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQSEpsWTNRZ2QybGtkR2c5SWpFaUlHaGxhV2RvZEQwaU1TSWdabWxzYkQwaWRYSnNLQ05uY21Ga0xXUnZkMjRwSWk4K0NpQWdJQ0FnSUNBZ1BDOXRZWE5yUGdvZ0lDQWdJQ0FnSUR4dFlYTnJJR2xrUFNKdWIyNWxJaUJ0WVhOclEyOXVkR1Z1ZEZWdWFYUnpQU0p2WW1wbFkzUkNiM1Z1WkdsdVowSnZlQ0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUhkcFpIUm9QU0l4SWlCb1pXbG5hSFE5SWpFaUlHWnBiR3c5SW5kb2FYUmxJaTgrQ2lBZ0lDQWdJQ0FnUEM5dFlYTnJQZ29nSUNBZ0lDQWdJRHhzYVc1bFlYSkhjbUZrYVdWdWRDQnBaRDBpWjNKaFpDMXplVzFpYjJ3aVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4YzNSdmNDQnZabVp6WlhROUlqQXVOeUlnYzNSdmNDMWpiMnh2Y2owaWQyaHBkR1VpSUhOMGIzQXRiM0JoWTJsMGVUMGlNU0l2UGdvZ0lDQWdJQ0FnSUNBZ0lDQThjM1J2Y0NCdlptWnpaWFE5SWk0NU5TSWdjM1J2Y0MxamIyeHZjajBpZDJocGRHVWlJSE4wYjNBdGIzQmhZMmwwZVQwaU1DSXZQZ29nSUNBZ0lDQWdJRHd2YkdsdVpXRnlSM0poWkdsbGJuUStDaUFnSUNBZ0lDQWdQRzFoYzJzZ2FXUTlJbVpoWkdVdGMzbHRZbTlzSWlCdFlYTnJRMjl1ZEdWdWRGVnVhWFJ6UFNKMWMyVnlVM0JoWTJWUGJsVnpaU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUhkcFpIUm9QU0l5T1RCd2VDSWdhR1ZwWjJoMFBTSXlNREJ3ZUNJZ1ptbHNiRDBpZFhKc0tDTm5jbUZrTFhONWJXSnZiQ2tpTHo0S0lDQWdJQ0FnSUNBOEwyMWhjMnMrQ2lBZ0lDQThMMlJsWm5NK0NpQWdJQ0E4WnlCamJHbHdMWEJoZEdnOUluVnliQ2dqWTI5eWJtVnljeWtpUGdvZ0lDQWdJQ0FnSUR4eVpXTjBJR1pwYkd3OUlqQXpaV0V3T1NJZ2VEMGlNSEI0SWlCNVBTSXdjSGdpSUhkcFpIUm9QU0l5T1RCd2VDSWdhR1ZwWjJoMFBTSTFNREJ3ZUNJdlBnb2dJQ0FnSUNBZ0lEeHlaV04wSUhOMGVXeGxQU0ptYVd4MFpYSTZJSFZ5YkNnalpqRXBJaUI0UFNJd2NIZ2lJSGs5SWpCd2VDSWdkMmxrZEdnOUlqSTVNSEI0SWlCb1pXbG5hSFE5SWpVd01IQjRJaTgrQ2lBZ0lDQWdJQ0FnUEdjZ2MzUjViR1U5SW1acGJIUmxjanAxY213b0kzUnZjQzF5WldkcGIyNHRZbXgxY2lrN0lIUnlZVzV6Wm05eWJUcHpZMkZzWlNneExqVXBPeUIwY21GdWMyWnZjbTB0YjNKcFoybHVPbU5sYm5SbGNpQjBiM0E3SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQSEpsWTNRZ1ptbHNiRDBpYm05dVpTSWdlRDBpTUhCNElpQjVQU0l3Y0hnaUlIZHBaSFJvUFNJeU9UQndlQ0lnYUdWcFoyaDBQU0kxTURCd2VDSXZQZ29nSUNBZ0lDQWdJQ0FnSUNBOFpXeHNhWEJ6WlNCamVEMGlOVEFsSWlCamVUMGlNSEI0SWlCeWVEMGlNVGd3Y0hnaUlISjVQU0l4TWpCd2VDSWdabWxzYkQwaUl6QXdNQ0lnYjNCaFkybDBlVDBpTUM0NE5TSXZQZ29nSUNBZ0lDQWdJRHd2Wno0S0lDQWdJQ0FnSUNBOGNtVmpkQ0I0UFNJd0lpQjVQU0l3SWlCM2FXUjBhRDBpTWprd0lpQm9aV2xuYUhROUlqVXdNQ0lnY25nOUlqUXlJaUJ5ZVQwaU5ESWlJR1pwYkd3OUluSm5ZbUVvTUN3d0xEQXNNQ2tpSUhOMGNtOXJaVDBpY21kaVlTZ3lOVFVzTWpVMUxESTFOU3d3TGpJcElpOCtDaUFnSUNBOEwyYytDaUFnSUNBOGRHVjRkQ0IwWlhoMExYSmxibVJsY21sdVp6MGliM0IwYVcxcGVtVlRjR1ZsWkNJK0NpQWdJQ0FnSUNBZ1BIUmxlSFJRWVhSb0lITjBZWEowVDJabWMyVjBQU0l0TVRBd0pTSWdabWxzYkQwaWQyaHBkR1VpSUdadmJuUXRabUZ0YVd4NVBTSW5RMjkxY21sbGNpQk9aWGNuTENCdGIyNXZjM0JoWTJVaUlHWnZiblF0YzJsNlpUMGlNVEJ3ZUNJZ2VHeHBibXM2YUhKbFpqMGlJM1JsZUhRdGNHRjBhQzFoSWo1MGIydGxiaTkzWW5Sakx6RWc0b0NpSUZkQ1ZFTUtJQ0FnSUNBZ0lDQWdJQ0FnUEdGdWFXMWhkR1VnWVdSa2FYUnBkbVU5SW5OMWJTSWdZWFIwY21saWRYUmxUbUZ0WlQwaWMzUmhjblJQWm1aelpYUWlJR1p5YjIwOUlqQWxJaUIwYnowaU1UQXdKU0lnWW1WbmFXNDlJakJ6SWlCa2RYSTlJak13Y3lJZ2NtVndaV0YwUTI5MWJuUTlJbWx1WkdWbWFXNXBkR1VpTHo0S0lDQWdJQ0FnSUNBOEwzUmxlSFJRWVhSb1Bnb2dJQ0FnSUNBZ0lEeDBaWGgwVUdGMGFDQnpkR0Z5ZEU5bVpuTmxkRDBpTUNVaUlHWnBiR3c5SW5kb2FYUmxJaUJtYjI1MExXWmhiV2xzZVQwaUowTnZkWEpwWlhJZ1RtVjNKeXdnYlc5dWIzTndZV05sSWlCbWIyNTBMWE5wZW1VOUlqRXdjSGdpSUhoc2FXNXJPbWh5WldZOUlpTjBaWGgwTFhCaGRHZ3RZU0krZEc5clpXNHZkMkowWXk4eElPS0FvaUJYUWxSRENpQWdJQ0FnSUNBZ0lDQWdJRHhoYm1sdFlYUmxJR0ZrWkdsMGFYWmxQU0p6ZFcwaUlHRjBkSEpwWW5WMFpVNWhiV1U5SW5OMFlYSjBUMlptYzJWMElpQm1jbTl0UFNJd0pTSWdkRzg5SWpFd01DVWlJR0psWjJsdVBTSXdjeUlnWkhWeVBTSXpNSE1pSUhKbGNHVmhkRU52ZFc1MFBTSnBibVJsWm1sdWFYUmxJaTgrQ2lBZ0lDQWdJQ0FnUEM5MFpYaDBVR0YwYUQ0S0lDQWdJQ0FnSUNBOGRHVjRkRkJoZEdnZ2MzUmhjblJQWm1aelpYUTlJalV3SlNJZ1ptbHNiRDBpZDJocGRHVWlJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1UQndlQ0lnZUd4cGJtczZhSEpsWmowaUkzUmxlSFF0Y0dGMGFDMWhJajUwYjJ0bGJpOTNaWFJvTHpJZzRvQ2lJRmRGVkVnS0lDQWdJQ0FnSUNBZ0lDQWdQR0Z1YVcxaGRHVWdZV1JrYVhScGRtVTlJbk4xYlNJZ1lYUjBjbWxpZFhSbFRtRnRaVDBpYzNSaGNuUlBabVp6WlhRaUlHWnliMjA5SWpBbElpQjBiejBpTVRBd0pTSWdZbVZuYVc0OUlqQnpJaUJrZFhJOUlqTXdjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlMejRLSUNBZ0lDQWdJQ0E4TDNSbGVIUlFZWFJvUGdvZ0lDQWdJQ0FnSUR4MFpYaDBVR0YwYUNCemRHRnlkRTltWm5ObGREMGlMVFV3SlNJZ1ptbHNiRDBpZDJocGRHVWlJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1UQndlQ0lnZUd4cGJtczZhSEpsWmowaUkzUmxlSFF0Y0dGMGFDMWhJajUwYjJ0bGJpOTNaWFJvTHpJZzRvQ2lJRmRGVkVnS0lDQWdJQ0FnSUNBZ0lDQWdQR0Z1YVcxaGRHVWdZV1JrYVhScGRtVTlJbk4xYlNJZ1lYUjBjbWxpZFhSbFRtRnRaVDBpYzNSaGNuUlBabVp6WlhRaUlHWnliMjA5SWpBbElpQjBiejBpTVRBd0pTSWdZbVZuYVc0OUlqQnpJaUJrZFhJOUlqTXdjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlMejRLSUNBZ0lDQWdJQ0E4TDNSbGVIUlFZWFJvUGdvZ0lDQWdQQzkwWlhoMFBnb2dJQ0FnUEdjZ2JXRnphejBpZFhKc0tDTm1ZV1JsTFhONWJXSnZiQ2tpUGdvZ0lDQWdJQ0FnSUR4eVpXTjBJR1pwYkd3OUltNXZibVVpSUhnOUlqQndlQ0lnZVQwaU1IQjRJaUIzYVdSMGFEMGlNamt3Y0hnaUlHaGxhV2RvZEQwaU1qQXdjSGdpTHo0S0lDQWdJQ0FnSUNBOGRHVjRkQ0I1UFNJM01IQjRJaUI0UFNJek1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJZ1ptOXVkQzFtWVcxcGJIazlJaWREYjNWeWFXVnlJRTVsZHljc0lHMXZibTl6Y0dGalpTSWdabTl1ZEMxM1pXbG5hSFE5SWpJd01DSWdabTl1ZEMxemFYcGxQU0l6Tm5CNElqNVhSVlJJTDFkQ1ZFTThMM1JsZUhRK0NpQWdJQ0FnSUNBZ1BIUmxlSFFnZVQwaU1URTFjSGdpSUhnOUlqTXljSGdpSUdacGJHdzlJbmRvYVhSbElpQm1iMjUwTFdaaGJXbHNlVDBpSjBOdmRYSnBaWElnVG1WM0p5d2diVzl1YjNOd1lXTmxJaUJtYjI1MExYZGxhV2RvZEQwaU1qQXdJaUJtYjI1MExYTnBlbVU5SWpNMmNIZ2lQakF1TXlVOEwzUmxlSFErQ2lBZ0lDQThMMmMrQ2lBZ0lDQThjbVZqZENCNFBTSXhOaUlnZVQwaU1UWWlJSGRwWkhSb1BTSXlOVGdpSUdobGFXZG9kRDBpTkRZNElpQnllRDBpTWpZaUlISjVQU0l5TmlJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0tTSWdjM1J5YjJ0bFBTSnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVNaWtpTHo0S0lDQWdJRHhuSUcxaGMyczlJblZ5YkNnamJtOXVaU2tpSUhOMGVXeGxQU0owY21GdWMyWnZjbTA2ZEhKaGJuTnNZWFJsS0RjeWNIZ3NNVGc1Y0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCNFBTSXRNVFp3ZUNJZ2VUMGlMVEUyY0hnaUlIZHBaSFJvUFNJeE9EQndlQ0lnYUdWcFoyaDBQU0l4T0RCd2VDSWdabWxzYkQwaWJtOXVaU0l2UGdvZ0lDQWdJQ0FnSUR4d1lYUm9JR1E5SWsweElERkRNVGNnTnpNZ056TWdNVEk1SURFME5TQXhORFVpSUhOMGNtOXJaVDBpY21kaVlTZ3dMREFzTUN3d0xqTXBJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqTXljSGdpSUdacGJHdzlJbTV2Ym1VaUlITjBjbTlyWlMxc2FXNWxZMkZ3UFNKeWIzVnVaQ0l2UGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYldGemF6MGlkWEpzS0NOdWIyNWxLU0lnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTnpKd2VDd3hPRGx3ZUNraVBnb2dJQ0FnSUNBZ0lEeHlaV04wSUhnOUlpMHhObkI0SWlCNVBTSXRNVFp3ZUNJZ2QybGtkR2c5SWpFNE1IQjRJaUJvWldsbmFIUTlJakU0TUhCNElpQm1hV3hzUFNKdWIyNWxJaTgrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFZ01VTXhOeUEzTXlBM015QXhNamtnTVRRMUlERTBOU0lnYzNSeWIydGxQU0p5WjJKaEtESTFOU3d5TlRVc01qVTFMREVwSWlCbWFXeHNQU0p1YjI1bElpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpTHo0S0lDQWdJRHd2Wno0S0lDQWdJRHhqYVhKamJHVWdZM2c5SWpjemNIZ2lJR041UFNJeE9UQndlQ0lnY2owaU5IQjRJaUJtYVd4c1BTSjNhR2wwWlNJdlBnb2dJQ0FnUEdOcGNtTnNaU0JqZUQwaU1qRTNjSGdpSUdONVBTSXpNelJ3ZUNJZ2NqMGlOSEI0SWlCbWFXeHNQU0ozYUdsMFpTSXZQZ284WnlCemRIbHNaVDBpZEhKaGJuTm1iM0p0T25SeVlXNXpiR0YwWlNneU9YQjRMQ0F6T0RSd2VDa2lQZ29nSUNBZ0lDQWdJRHh5WldOMElIZHBaSFJvUFNJMk0zQjRJaUJvWldsbmFIUTlJakkyY0hnaUlISjRQU0k0Y0hnaUlISjVQU0k0Y0hnaUlHWnBiR3c5SW5KblltRW9NQ3d3TERBc01DNDJLU0l2UGdvZ0lDQWdJQ0FnSUR4MFpYaDBJSGc5SWpFeWNIZ2lJSGs5SWpFM2NIZ2lJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1USndlQ0lnWm1sc2JEMGlkMmhwZEdVaVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4ZEhOd1lXNGdabWxzYkQwaWNtZGlZU2d5TlRVc01qVTFMREkxTlN3d0xqWXBJajVKUkRvZ1BDOTBjM0JoYmo0eENpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpsd2VDd2dOREUwY0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRNemNIZ2lJR2hsYVdkb2REMGlNalp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0xqWXBJaTgrQ2lBZ0lDQWdJQ0FnUEhSbGVIUWdlRDBpTVRKd2VDSWdlVDBpTVRkd2VDSWdabTl1ZEMxbVlXMXBiSGs5SWlkRGIzVnlhV1Z5SUU1bGR5Y3NJRzF2Ym05emNHRmpaU0lnWm05dWRDMXphWHBsUFNJeE1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJRHgwYzNCaGJpQm1hV3hzUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU5pa2lQazFwYmlCVWFXTnJPaUE4TDNSemNHRnVQakkwTURBd0NpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpsd2VDd2dORFEwY0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRNemNIZ2lJR2hsYVdkb2REMGlNalp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0xqWXBJaTgrQ2lBZ0lDQWdJQ0FnUEhSbGVIUWdlRDBpTVRKd2VDSWdlVDBpTVRkd2VDSWdabTl1ZEMxbVlXMXBiSGs5SWlkRGIzVnlhV1Z5SUU1bGR5Y3NJRzF2Ym05emNHRmpaU0lnWm05dWRDMXphWHBsUFNJeE1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJRHgwYzNCaGJpQm1hV3hzUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU5pa2lQazFoZUNCVWFXTnJPaUE4TDNSemNHRnVQakkzTURBd0NpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpJMmNIZ3NJRFF6TTNCNEtTSStDaUFnSUNBZ0lDQWdQSEpsWTNRZ2QybGtkR2c5SWpNMmNIZ2lJR2hsYVdkb2REMGlNelp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpYm05dVpTSWdjM1J5YjJ0bFBTSnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVNaWtpTHo0S0lDQWdJQ0FnSUNBOGNHRjBhQ0J6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlHUTlJazA0SURsRE9DNHdNREF3TkNBeU1pNDVORGswSURFMkxqSXdPVGtnTWpnZ01qY2dNamdpSUdacGJHdzlJbTV2Ym1VaUlITjBjbTlyWlQwaWQyaHBkR1VpTHo0S0lDQWdJQ0FnSUNBOFkybHlZMnhsSUhOMGVXeGxQU0owY21GdWMyWnZjbTA2ZEhKaGJuTnNZWFJsTTJRb01UaHdlQ3dnTWpad2VDd2dNSEI0S1NJZ1kzZzlJakJ3ZUNJZ1kzazlJakJ3ZUNJZ2NqMGlOSEI0SWlCbWFXeHNQU0ozYUdsMFpTSXZQZ29nSUNBZ1BDOW5QZ29KUEdjZ2MzUjViR1U5SW5SeVlXNXpabTl5YlRwMGNtRnVjMnhoZEdVb01qSTJjSGdzSURNNU1uQjRLU0krQ2drSlBISmxZM1FnZDJsa2RHZzlJak0yY0hnaUlHaGxhV2RvZEQwaU16WndlQ0lnY25nOUlqaHdlQ0lnY25rOUlqaHdlQ0lnWm1sc2JEMGlibTl1WlNJZ2MzUnliMnRsUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU1pa2lMejRuTEFvSkNUeG5QZ29KQ1FrOGNHRjBhQ0J6ZEhsc1pUMGlkSEpoYm5ObWIzSnRPblJ5WVc1emJHRjBaU2cyY0hnc05uQjRLU0lnWkQwaVRURXlJREJNTVRJdU5qVXlNaUE1TGpVMk5UZzNUREU0SURFdU5qQTNOMHd4TXk0M09ERTVJREV3TGpJeE9ERk1Nakl1TXpreU15QTJUREUwTGpRek5ERWdMREV4TGpNME56aE1NalFnTVRKTU1UUXVORE0wTVNBeE1pNDJOVEl5VERJeUxqTTVNak1nTVRoTU1UTXVOemd4T1NBeE15NDNPREU1VERFNElESXlMak01TWpOTU1USXVOalV5TWlBeE5DNDBNelF4VERFeUlESTBUREV4TGpNME56Z2dNVFF1TkRNME1VdzJJREl5TGpNNUp5d3lNMHd4TUM0eU1UZ3hJREV6TGpjNE1UbE1NUzQyTURjM0lERTRURGt1TlRZMU9EY2dNVEl1TmpVeU1rd3dJREV5VERrdU5UWTFPRGNnTVRFdU16UTNPRXd4TGpZd056Y2dOa3d4TUM0eU1UZ3hJREV3TGpJeE9ERk1OaUF4TGpZd056ZE1NVEV1TXpRM09DQTVMalUyTlRnM1RERXlJREJhSWlCbWFXeHNQU0ozYUdsMFpTSXZQaXdLQ1FrSlBHRnVhVzFoZEdWVWNtRnVjMlp2Y20wZ1lYUjBjbWxpZFhSbFRtRnRaVDBpZEhKaGJuTm1iM0p0SWlCMGVYQmxQU0p5YjNSaGRHVWlJR1p5YjIwOUlqQWdNVGdnTVRnaUlIUnZQU0l6TmpBZ01UZ2dNVGdpSUdSMWNqMGlNVEJ6SWlCeVpYQmxZWFJEYjNWdWREMGlhVzVrWldacGJtbDBaU0l2UGdvSkNUd3ZaejRLQ1R3dlp6NEtQQzl6ZG1jK0NnPT0iCn0K"
}
```

#### 7. `Pool`允许根据`address`查询池信息

```
metaoslabs.metaos.swap.Query/Pool
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address":"mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/Pool
```

输出示例:

```json
{
  "pool": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "denom0": "token/wbtc/1",
    "denom1": "token/weth/2",
    "decimal0": 8,
    "decimal1": 18,
    "fee": 3000,
    "tickSpacing": 60,
    "maxLiquidityPerTick": "\u0000\u0000\u0000\u0000\u0002\u00027F楍\ufffd\u0013ԯ\ufffd\u001b\ufffd\ufffdb"
  }
}
```

#### 8. `PoolAll`允许查询所有的池信息

```
metaoslabs.metaos.swap.Query/PoolAll
```

示例:

```
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolAll
```

输出示例:

```json
{
  "pools": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "denom0": "token/wbtc/1",
      "denom1": "token/weth/2",
      "decimal0": 8,
      "decimal1": 18,
      "fee": 3000,
      "tickSpacing": 60,
      "maxLiquidityPerTick": "\u0000\u0000\u0000\u0000\u0002\u00027F楍\ufffd\u0013ԯ\ufffd\u001b\ufffd\ufffdb"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

#### 9. `PoolFee`允许查询流动池费用

```
metaoslabs.metaos.swap.Query/PoolFee
```

示例:

```bash
grpcurl -plaintext \
		-d '{"fee": 3000}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolFee
```

输出示例:

```json
{
  "poolFee": {
    "fee": 3000,
    "tickSpacing": 60
  }
}
```

#### 10. `PoolFeeAll`允许查询所有的流动池费用

```bash
metaoslabs.metaos.swap.Query/PoolFeeAll
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolFeeAll
```

输出示例:

```json
{
  "poolFees": [
    {
      "fee": 100,
      "tickSpacing": 1
    },
    {
      "fee": 500,
      "tickSpacing": 10
    },
    {
      "fee": 3000,
      "tickSpacing": 60
    },
    {
      "fee": 10000,
      "tickSpacing": 200
    }
  ],
  "pagination": {
    "total": "4"
  }
}
```

#### 11. `PoolSlot0`允许查询流动池slot0信息

```
metaoslabs.metaos.swap.Query/PoolSlot0
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolSlot0
```

输出示例:

```json
{
  "poolSlot0": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "tick": 25656,
    "sqrtPrice": "\u0000\u0000\u0000\u001c\u0002t\ufffdDψ\ufffd\u0010\ufffd\ufffd\u0000\u0000\u0000",
    "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
    "feeGrowthGlobal0": "\u0000\u0000\u0000\u0000\u0002",
    "feeGrowthGlobal1": "\u0000\u0000\u0000\u0000\u0002",
    "feeProtocolOwed0": "0",
    "feeProtocolOwed1": "0",
    "observationCardinality": 1,
    "observationCardinalityNext": 1,
    "rewardUpdateTimeLast": "2022-08-12T04:16:52Z"
  }
}
```

#### 12. `PoolSlot0All`允许查询所有的池slot0

```
metaoslabs.metaos.swap.Query/PoolSlot0All
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolSlot0All
```

输出示例:

```json
{
  "poolSlot0s": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "tick": 25656,
      "sqrtPrice": "\u0000\u0000\u0000\u001c\u0002t\ufffdDψ\ufffd\u0010\ufffd\ufffd\u0000\u0000\u0000",
      "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "feeGrowthGlobal0": "\u0000\u0000\u0000\u0000\u0002",
      "feeGrowthGlobal1": "\u0000\u0000\u0000\u0000\u0002",
      "feeProtocolOwed0": "0",
      "feeProtocolOwed1": "0",
      "observationCardinality": 1,
      "observationCardinalityNext": 1,
      "rewardUpdateTimeLast": "2022-08-12T04:16:52Z"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

#### 13. `PoolSlot0Aggregation`允许查询流动池slot0聚合信息

```
metaoslabs.metaos.swap.Query/PoolSlot0Aggregation
```

示例:

```
grpcurl -plaintext \
		-d '{"addresses": ["mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"]}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolSlot0Aggregation
```

输出示例:

```json
{
  "poolSlot0Aggregations": [
    {
      "pool": {
        "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
        "denom0": "token/wbtc/1",
        "denom1": "token/weth/2",
        "decimal0": 8,
        "decimal1": 18,
        "fee": 3000,
        "tickSpacing": 60,
        "maxLiquidityPerTick": "\u0000\u0000\u0000\u0000\u0002\u00027F楍\ufffd\u0013ԯ\ufffd\u001b\ufffd\ufffdb"
      },
      "poolSlot0": {
        "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
        "tick": 25656,
        "sqrtPrice": "\u0000\u0000\u0000\u001c\u0002t\ufffdDψ\ufffd\u0010\ufffd\ufffd\u0000\u0000\u0000",
        "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
        "feeGrowthGlobal0": "\u0000\u0000\u0000\u0000\u0002",
        "feeGrowthGlobal1": "\u0000\u0000\u0000\u0000\u0002",
        "feeProtocolOwed0": "0",
        "feeProtocolOwed1": "0",
        "observationCardinality": 1,
        "observationCardinalityNext": 1,
        "rewardUpdateTimeLast": "2022-08-12T04:16:52Z"
      }
    }
  ]
}
```

#### 14. `PoolObservation`允许查询流动池的预言机信息

```
metaoslabs.metaos.swap.Query/PoolObservation
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address":"mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg","index":0}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolObservation
```

输出示例:

```json
{
  "poolObservation": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "blockTimestamp": "2022-08-12T04:16:52Z",
    "tickCumulative": "128280",
    "secondsPerLiquidityCumulative": "\u0000\u0000\u0000\u001c\u0002\ufffd\ufffd\u0007\ufffd6\ufffd\u000b\ufffdP\u0000\u0000\u0000"
  }
}
```

#### 15. `PoolObservationAll`允许查询所有的池的预言机信息

```
metaoslabs.metaos.swap.Query/PoolObservationAll
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolObservationAll
```

输出示例:

```json
{
  "poolObservations": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "blockTimestamp": "2022-08-12T04:16:52Z",
      "tickCumulative": "128280",
      "secondsPerLiquidityCumulative": "\u0000\u0000\u0000\u001c\u0002\ufffd\ufffd\u0007\ufffd6\ufffd\u000b\ufffdP\u0000\u0000\u0000"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

#### 16. `PoolPosition`允许查询池仓位信息

```
metaoslabs.metaos.swap.Query/PoolPosition
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address":"mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg","owner":"mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq","tick_lower":24000,"tick_upper":27000}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolPosition
```

输出示例:

```json
{
  "poolPosition": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "owner": "mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq",
    "tickLower": 24000,
    "tickUpper": 27000,
    "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
    "feeGrowthInside0": "\u0000\u0000\u0000\u0000\u0002",
    "feeGrowthInside1": "\u0000\u0000\u0000\u0000\u0002",
    "tokensOwed0": "\u0000\u0000\u0000\u0000\u0002",
    "tokensOwed1": "\u0000\u0000\u0000\u0000\u0002"
  }
}
```

#### 17. `PoolPositionAll`允许查询所有的池仓位信息

```
metaoslabs.metaos.swap.Query/PoolPositionAll
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolPositionAll
```

输出示例:

```json
{
  "poolPositions": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "owner": "mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq",
      "tickLower": 24000,
      "tickUpper": 27000,
      "liquidity": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "feeGrowthInside0": "\u0000\u0000\u0000\u0000\u0002",
      "feeGrowthInside1": "\u0000\u0000\u0000\u0000\u0002",
      "tokensOwed0": "\u0000\u0000\u0000\u0000\u0002",
      "tokensOwed1": "\u0000\u0000\u0000\u0000\u0002"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

#### 18. `PoolTick`允许查询PoolTick信息

```
metaoslabs.metaos.swap.Query/PoolTick
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address":"mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg","index":27000}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolTick
```

输出示例:

```json
{
  "poolTick": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "index": 27000,
    "liquidityGross": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
    "liquidityNet": "\u0000\u0000\u0000\u001c\u0003\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
    "feeGrowthOutside0": "\u0000\u0000\u0000\u0000\u0002",
    "feeGrowthOutside1": "\u0000\u0000\u0000\u0000\u0002",
    "secondsPerLiquidityOutside": "\u0000\u0000\u0000\u0000\u0002"
  }
}
```

#### 19. `PoolTickAll`允许查询所有的PoolTick信息

```
metaoslabs.metaos.swap.Query/PoolTickAll
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolTickAll
```

输出示例:

```json
{
  "poolTicks": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "index": 24000,
      "liquidityGross": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "liquidityNet": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "feeGrowthOutside0": "\u0000\u0000\u0000\u0000\u0002",
      "feeGrowthOutside1": "\u0000\u0000\u0000\u0000\u0002",
      "tickCumulativeOutside": "128280",
      "secondsPerLiquidityOutside": "\u0000\u0000\u0000\u001c\u0002\ufffd\ufffd\u0007\ufffd6\ufffd\u000b\ufffdP\u0000\u0000\u0000",
      "secondsOutside": "1660277812"
    },
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "index": 27000,
      "liquidityGross": "\u0000\u0000\u0000\u001c\u0002\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "liquidityNet": "\u0000\u0000\u0000\u001c\u0003\u0005\ufffd\ufffdC\ufffd\ufffdp\ufffd; \ufffd\ufffd\ufffd",
      "feeGrowthOutside0": "\u0000\u0000\u0000\u0000\u0002",
      "feeGrowthOutside1": "\u0000\u0000\u0000\u0000\u0002",
      "secondsPerLiquidityOutside": "\u0000\u0000\u0000\u0000\u0002"
    }
  ],
  "pagination": {
    "total": "2"
  }
}
```

#### 20. `PoolWord`允许查询PoolWord信息

```
metaoslabs.metaos.swap.Query/PoolWord
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address":"mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg","index":1}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolWord
```

输出示例:

```json
{
  "poolWord": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "index": 1,
    "word": "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0001\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0001"
  }
}
```

#### 21. `PoolWordAll`允许查询所有的PoolWord信息

```
metaoslabs.metaos.swap.Query/PoolWordAll
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/PoolWordAll
```

输出示例:

```json
{
  "poolWords": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "index": 1,
      "word": "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0001\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0001"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

#### 22. `QuoteSwapExactIn`允许查询精确输入的交易报价

```
metaoslabs.metaos.swap.Query/QuoteSwapExactIn
```

示例:

```bash
grpcurl -plaintext \
		-d '{"amount_in":"100000000","gas_limit":200000,"denoms":["token/wbtc/1","token/weth/2"],"fees":[3000]}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/QuoteSwapExactIn
```

输出示例:

```json
{
  "available": true,
  "amountOut": "12015408139513296186",
  "gasUsed": "40814"
}
```

#### 23. `QuoteSwapExactOut`允许查询精确输出的交易报价

```
metaoslabs.metaos.swap.Query/QuoteSwapExactOut
```

示例:

```bash
grpcurl -plaintext \
		-d '{"amount_out":"1000000000000000000","gas_limit":200000,"denoms":["token/wbtc/1","token/weth/2"],"fees":[3000]}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/QuoteSwapExactOut
```

输出示例:

```json
{}
```

#### 24. `CorePool`允许查询核心池

```
metaoslabs.metaos.swap.Query/CorePool
```

示例:

```bash
grpcurl -plaintext \
		-d '{"address":"mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"}' \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/CorePool
```

输出示例:

```json
{
  "corePool": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
  }
}
```

#### 25. `CorePoolAll`允许查询所有的核心池

```
metaoslabs.metaos.swap.Query/CorePoolAll
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.swap.Query/CorePoolAll
```

输出示例:

```json
{
  "corePools": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

----------------------

### REST

用户可以使用 REST 查询`swap`模块。

#### 1. NonfungiblePositionPool

```bash
/metaos-labs/metaos/swap/nonfungible_position_pool
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/nonfungible_position_pool" -H  "accept: application/json"
```

输出示例：

```json
{
  "nonfungible_position_pool": {
    "next_token_id": "1"
  }
}
```

#### 2. 根据`token-id`查询流动性仓位

```
/metaos-labs/metaos/swap/liquidity_positions/{token_id}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/liquidity_positions/nft-1" -H  "accept: application/json"
```

输出示例:

```json
{
  "liquidity_position": {
    "token_id": "nft-1",
    "liquidity": "45.3621929427803404693739454875",
    "fee_growth_inside0_last": "0",
    "fee_growth_inside1_last": "0",
    "tokens_owed0": "0.0000000000000000000000000000",
    "tokens_owed1": "0.0000000000000000000000000000",
    "tick_lower": 24000,
    "tick_upper": 27000,
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "reward_growth_inside_lasts": [],
    "reward_oweds": []
  }
}
```

#### 3. 根据`token_ids`查询流动性仓位

```
/metaos-labs/metaos/swap/liquidity_position_by_ids
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/liquidity_position_by_ids?token_ids=nft-1" -H  "accept: application/json"
```

输出示例:

```json
{
  "liquidity_positions": [
    {
      "token_id": "nft-1",
      "liquidity": "45.3621929427803404693739454875",
      "fee_growth_inside0_last": "0",
      "fee_growth_inside1_last": "0",
      "tokens_owed0": "0.0000000000000000000000000000",
      "tokens_owed1": "0.0000000000000000000000000000",
      "tick_lower": 24000,
      "tick_upper": 27000,
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "reward_growth_inside_lasts": [],
      "reward_oweds": []
    }
  ]
}
```

#### 4. 查询所有的流动性仓位

```
/metaos-labs/metaos/swap/liquidity_positions
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/liquidity_positions" -H  "accept: application/json"
```

输出示例:

```json
{
  "liquidity_positions": [
    {
      "token_id": "nft-1",
      "liquidity": "45.3621929427803404693739454875",
      "fee_growth_inside0_last": "0",
      "fee_growth_inside1_last": "0",
      "tokens_owed0": "0",
      "tokens_owed1": "0",
      "tick_lower": 24000,
      "tick_upper": 27000,
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "reward_growth_inside_lasts": [],
      "reward_oweds": []
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### 5. 根据`owner`查询流动性仓位

```
/metaos-labs/metaos/swap/liquidity_positions_owner/{address}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/liquidity_positions_owner/mtos1wk4manyfhfx3sgzgp8k0fjf3jmra796k57xrhh?skip_zero_liquidity=false" -H  "accept: application/json"
```

输出示例:

```json
{
  "liquidity_positions": [
    {
      "token_id": "nft-1",
      "liquidity": "45.3621929427803404693739454875",
      "fee_growth_inside0_last": "0",
      "fee_growth_inside1_last": "0",
      "tokens_owed0": "0",
      "tokens_owed1": "0",
      "tick_lower": 24000,
      "tick_upper": 27000,
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "reward_growth_inside_lasts": [],
      "reward_oweds": []
    }
  ]
}
```

#### 6. 根据`token-id`查询流动性仓位代币uri

```
/metaos-labs/metaos/swap/liquidity_positions/{token_id}/token_uri
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/liquidity_positions/nft-1/token_uri" -H  "accept: application/json"
```

输出示例:

```json
{
  "uri": "data:application/json;base64,ewoJIm5hbWUiOiJNZXRhT1MgLSAwLjMlIC0gV0VUSC9XQlRDIC0gMTEuMDIxPD4xNC44NzciLAoJImRlc2NyaXB0aW9uIjoiVGhpcyBORlQgcmVwcmVzZW50cyBhIGxpcXVpZGl0eSBwb3NpdGlvbiBpbiBhIE1ldGFPUyBXRVRILVdCVEMgcG9vbC4gVGhlIG93bmVyIG9mIHRoaXMgTkZUIGNhbiBtb2RpZnkgb3IgcmVkZWVtIHRoZSBwb3NpdGlvbi5cblxuUG9vbCBBZGRyZXNzOm10b3MxcHg2eXR1ajZreGpoanJ3ZXV5Y2NzNjIybGo3ZjRhdm1yaHR3dmdcbldFVEggQWRkcmVzczp0b2tlbi93ZXRoLzJcbldCVEMgQWRkcmVzczp0b2tlbi93YnRjLzFcbkZlZSBUaWVyOjAuMyVcblRva2VuIElEOjFcblxu4pqg77iPIERJU0NMQUlNRVI6IER1ZSBkaWxpZ2VuY2UgaXMgaW1wZXJhdGl2ZSB3aGVuIGFzc2Vzc2luZyB0aGlzIE5GVC4gTWFrZSBzdXJlIHRva2VuIGFkZHJlc3NlcyBtYXRjaCB0aGUgZXhwZWN0ZWQgdG9rZW5zLCBhcyB0b2tlbiBzeW1ib2xzIG1heSBiZSBpbWl0YXRlZC4iLAoJImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTWprd0lpQm9aV2xuYUhROUlqVXdNQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTVNQ0ExTURBaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJS0NYaHRiRzV6T25oc2FXNXJQU2RvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySno0S0NUeGtaV1p6UGdvSkNUeG1hV3gwWlhJZ2FXUTlJbVl4SWo0S0NRa0pQR1psU1cxaFoyVWdjbVZ6ZFd4MFBTSndNQ0lnZUd4cGJtczZhSEpsWmowaVpHRjBZVHBwYldGblpTOXpkbWNyZUcxc08ySmhjMlUyTkN4RGFuaDZaRzFqWjJReWJHdGtSMmM1U25wSk5VMURZMmRoUjFad1dqSm9NRkJUWXpGTlJFRnVTVWhhY0ZwWVpFTmlNMmM1U25wQlowMURRWGxQVkVGblRsUkJkMHA1UWpSaVYzaDFZM293Ym1GSVVqQmpSRzkyVEROa00yUjVOVE5OZVRWMlkyMWpkazFxUVhkTlF6bDZaRzFqYmxCbmIwcFFTRXBzV1ROUloyUXliR3RrUjJjNVNucEpOVTFJUWpSS2VVSnZXbGRzYm1GSVVUbEtlbFYzVFVoQ05FcDVRbTFoVjNoelVGTmphazFFVG14WlZFRTFTbms0SzBOcWQzWmpNMXB1VUdkdlBTSXZQZ29KQ1FrOFptVkpiV0ZuWlNCeVpYTjFiSFE5SW5BeElpQjRiR2x1YXpwb2NtVm1QU0prWVhSaE9tbHRZV2RsTDNOMlp5dDRiV3c3WW1GelpUWTBMRU5xZUhwa2JXTm5aREpzYTJSSFp6bEtla2sxVFVOaloyRkhWbkJhTW1nd1VGTmpNVTFFUVc1SlNGcHdXbGhrUTJJelp6bEtla0ZuVFVOQmVVOVVRV2RPVkVGM1NubENOR0pYZUhWamVqQnVZVWhTTUdORWIzWk1NMlF6WkhrMU0wMTVOWFpqYldOMlRXcEJkMDFET1hwa2JXTnVVR2R2U2xCSFRuQmpiVTV6V2xOQ2FtVkVNRzVOVkVFMVNubENhbVZVTUc1TmFsbDVTbmxDZVZCVFkzaE5ha0ozWlVOaloxcHRiSE5pUkRCdVNYcFpNbGxxWnpOUFEyTjJVR2R2T0V3elRqSmFlalJMSWk4K0Nna0pDVHhtWlVsdFlXZGxJSEpsYzNWc2REMGljRElpSUhoc2FXNXJPbWh5WldZOUltUmhkR0U2YVcxaFoyVXZjM1puSzNodGJEdGlZWE5sTmpRc1EycDRlbVJ0WTJka01teHJaRWRuT1VwNlNUVk5RMk5uWVVkV2NGb3lhREJRVTJNeFRVUkJia2xJV25CYVdHUkRZak5uT1VwNlFXZE5RMEY1VDFSQlowNVVRWGRLZVVJMFlsZDRkV042TUc1aFNGSXdZMFJ2ZGt3elpETmtlVFV6VFhrMWRtTnRZM1pOYWtGM1RVTTVlbVJ0WTI1UVoyOUtVRWRPY0dOdFRuTmFVMEpxWlVRd2JrMVVSVEpLZVVKcVpWUXdiazE2WXpCS2VVSjVVRk5qZUUxcVFuZGxRMk5uV20xc2MySkVNRzVKZWtGNldsZEZkMDlYVm1oUFYwVjZXa1JHYkZsdFVUSlpWRkY2VFRKR2FFOVhSVFZPUkZacVQxUm5lbHB0U20xWmVscG9UMWRGYmt4Nk5FdFFRemw2WkcxakswTm5QVDBpTHo0S0NRa0pQR1psU1cxaFoyVWdjbVZ6ZFd4MFBTSndNeUlnZUd4cGJtczZhSEpsWmowaVpHRjBZVHBwYldGblpTOXpkbWNyZUcxc08ySmhjMlUyTkN4RGFuaDZaRzFqWjJReWJHdGtSMmM1U25wSk5VMURZMmRoUjFad1dqSm9NRkJUWXpGTlJFRnVTVWhhY0ZwWVpFTmlNMmM1U25wQlowMURRWGxQVkVGblRsUkJkMHA1UWpSaVYzaDFZM293Ym1GSVVqQmpSRzkyVEROa00yUjVOVE5OZVRWMlkyMWpkazFxUVhkTlF6bDZaRzFqYmxCbmIwcFFSMDV3WTIxT2MxcFRRbXBsUkRCdVRYcG5ia2xIVGpWUVUyTjVUbnBGYmtsSVNUbEtla1YzVFVoQ05FcDVRbTFoVjNoelVGTmphazVxV21sUFJHTTBXVzFhYlU5RVRUTmFSRmt4VGpKS2EwOVhTbWxPYlZWNFRqSk5NRnBYU1hkUFZFMDFXa1JGTkUweVNYZGFhV04yVUdkdk9Fd3pUakphZWpSTElpOCtDZ2tKQ1R4bVpVSnNaVzVrSUcxdlpHVTlJbTkyWlhKc1lYa2lJR2x1UFNKd01DSWdhVzR5UFNKd01TSXZQZ29KQ1FrOFptVkNiR1Z1WkNCdGIyUmxQU0psZUdOc2RYTnBiMjRpSUdsdU1qMGljRElpTHo0S0NRa0pQR1psUW14bGJtUWdiVzlrWlQwaWIzWmxjbXhoZVNJZ2FXNHlQU0p3TXlJZ2NtVnpkV3gwUFNKaWJHVnVaRTkxZENJdlBnb2dJQ0FnSUNBZ0lDQWdJQ0E4Wm1WSFlYVnpjMmxoYmtKc2RYSWdhVzQ5SW1Kc1pXNWtUM1YwSWlCemRHUkVaWFpwWVhScGIyNDlJalF5SWk4K0NpQWdJQ0FnSUNBZ1BDOW1hV3gwWlhJK0NpQWdJQ0FnSUNBZ1BHTnNhWEJRWVhSb0lHbGtQU0pqYjNKdVpYSnpJajRLSUNBZ0lDQWdJQ0FnSUNBZ1BISmxZM1FnZDJsa2RHZzlJakk1TUNJZ2FHVnBaMmgwUFNJMU1EQWlJSEo0UFNJME1pSWdjbms5SWpReUlpOCtDaUFnSUNBZ0lDQWdQQzlqYkdsd1VHRjBhRDRLSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpZEdWNGRDMXdZWFJvTFdFaUlHUTlJazAwTUNBeE1pQklNalV3SUVFeU9DQXlPQ0F3SURBZ01TQXlOemdnTkRBZ1ZqUTJNQ0JCTWpnZ01qZ2dNQ0F3SURFZ01qVXdJRFE0T0NCSU5EQWdRVEk0SURJNElEQWdNQ0F4SURFeUlEUTJNQ0JXTkRBZ1FUSTRJREk0SURBZ01DQXhJRFF3SURFeUlIb2lMejRLSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpYldsdWFXMWhjQ0lnWkQwaVRUSXpOQ0EwTkRSRE1qTTBJRFExTnk0NU5Ea2dNalF5TGpJeElEUTJNeUF5TlRNZ05EWXpJaTgrQ2lBZ0lDQWdJQ0FnUEdacGJIUmxjaUJwWkQwaWRHOXdMWEpsWjJsdmJpMWliSFZ5SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQR1psUjJGMWMzTnBZVzVDYkhWeUlHbHVQU0pUYjNWeVkyVkhjbUZ3YUdsaklpQnpkR1JFWlhacFlYUnBiMjQ5SWpJMElpOCtDaUFnSUNBZ0lDQWdQQzltYVd4MFpYSStDaUFnSUNBZ0lDQWdQR3hwYm1WaGNrZHlZV1JwWlc1MElHbGtQU0puY21Ga0xYVndJaUI0TVQwaU1TSWdlREk5SWpBaUlIa3hQU0l4SWlCNU1qMGlNQ0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHpkRzl3SUc5bVpuTmxkRDBpTUM0d0lpQnpkRzl3TFdOdmJHOXlQU0ozYUdsMFpTSWdjM1J2Y0MxdmNHRmphWFI1UFNJeElpOCtDaUFnSUNBZ0lDQWdJQ0FnSUR4emRHOXdJRzltWm5ObGREMGlMamtpSUhOMGIzQXRZMjlzYjNJOUluZG9hWFJsSWlCemRHOXdMVzl3WVdOcGRIazlJakFpTHo0S0lDQWdJQ0FnSUNBOEwyeHBibVZoY2tkeVlXUnBaVzUwUGdvZ0lDQWdJQ0FnSUR4c2FXNWxZWEpIY21Ga2FXVnVkQ0JwWkQwaVozSmhaQzFrYjNkdUlpQjRNVDBpTUNJZ2VESTlJakVpSUhreFBTSXdJaUI1TWowaU1TSStDaUFnSUNBZ0lDQWdJQ0FnSUR4emRHOXdJRzltWm5ObGREMGlNQzR3SWlCemRHOXdMV052Ykc5eVBTSjNhR2wwWlNJZ2MzUnZjQzF2Y0dGamFYUjVQU0l4SWk4K0NpQWdJQ0FnSUNBZ0lDQWdJRHh6ZEc5d0lHOW1abk5sZEQwaU1DNDVJaUJ6ZEc5d0xXTnZiRzl5UFNKM2FHbDBaU0lnYzNSdmNDMXZjR0ZqYVhSNVBTSXdJaTgrQ2lBZ0lDQWdJQ0FnUEM5c2FXNWxZWEpIY21Ga2FXVnVkRDRLSUNBZ0lDQWdJQ0E4YldGemF5QnBaRDBpWm1Ga1pTMTFjQ0lnYldGemEwTnZiblJsYm5SVmJtbDBjejBpYjJKcVpXTjBRbTkxYm1ScGJtZENiM2dpUGdvZ0lDQWdJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVNJZ2FHVnBaMmgwUFNJeElpQm1hV3hzUFNKMWNtd29JMmR5WVdRdGRYQXBJaTgrQ2lBZ0lDQWdJQ0FnUEM5dFlYTnJQZ29nSUNBZ0lDQWdJRHh0WVhOcklHbGtQU0ptWVdSbExXUnZkMjRpSUcxaGMydERiMjUwWlc1MFZXNXBkSE05SW05aWFtVmpkRUp2ZFc1a2FXNW5RbTk0SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQSEpsWTNRZ2QybGtkR2c5SWpFaUlHaGxhV2RvZEQwaU1TSWdabWxzYkQwaWRYSnNLQ05uY21Ga0xXUnZkMjRwSWk4K0NpQWdJQ0FnSUNBZ1BDOXRZWE5yUGdvZ0lDQWdJQ0FnSUR4dFlYTnJJR2xrUFNKdWIyNWxJaUJ0WVhOclEyOXVkR1Z1ZEZWdWFYUnpQU0p2WW1wbFkzUkNiM1Z1WkdsdVowSnZlQ0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUhkcFpIUm9QU0l4SWlCb1pXbG5hSFE5SWpFaUlHWnBiR3c5SW5kb2FYUmxJaTgrQ2lBZ0lDQWdJQ0FnUEM5dFlYTnJQZ29nSUNBZ0lDQWdJRHhzYVc1bFlYSkhjbUZrYVdWdWRDQnBaRDBpWjNKaFpDMXplVzFpYjJ3aVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4YzNSdmNDQnZabVp6WlhROUlqQXVOeUlnYzNSdmNDMWpiMnh2Y2owaWQyaHBkR1VpSUhOMGIzQXRiM0JoWTJsMGVUMGlNU0l2UGdvZ0lDQWdJQ0FnSUNBZ0lDQThjM1J2Y0NCdlptWnpaWFE5SWk0NU5TSWdjM1J2Y0MxamIyeHZjajBpZDJocGRHVWlJSE4wYjNBdGIzQmhZMmwwZVQwaU1DSXZQZ29nSUNBZ0lDQWdJRHd2YkdsdVpXRnlSM0poWkdsbGJuUStDaUFnSUNBZ0lDQWdQRzFoYzJzZ2FXUTlJbVpoWkdVdGMzbHRZbTlzSWlCdFlYTnJRMjl1ZEdWdWRGVnVhWFJ6UFNKMWMyVnlVM0JoWTJWUGJsVnpaU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaV04wSUhkcFpIUm9QU0l5T1RCd2VDSWdhR1ZwWjJoMFBTSXlNREJ3ZUNJZ1ptbHNiRDBpZFhKc0tDTm5jbUZrTFhONWJXSnZiQ2tpTHo0S0lDQWdJQ0FnSUNBOEwyMWhjMnMrQ2lBZ0lDQThMMlJsWm5NK0NpQWdJQ0E4WnlCamJHbHdMWEJoZEdnOUluVnliQ2dqWTI5eWJtVnljeWtpUGdvZ0lDQWdJQ0FnSUR4eVpXTjBJR1pwYkd3OUlqQXpaV0V3T1NJZ2VEMGlNSEI0SWlCNVBTSXdjSGdpSUhkcFpIUm9QU0l5T1RCd2VDSWdhR1ZwWjJoMFBTSTFNREJ3ZUNJdlBnb2dJQ0FnSUNBZ0lEeHlaV04wSUhOMGVXeGxQU0ptYVd4MFpYSTZJSFZ5YkNnalpqRXBJaUI0UFNJd2NIZ2lJSGs5SWpCd2VDSWdkMmxrZEdnOUlqSTVNSEI0SWlCb1pXbG5hSFE5SWpVd01IQjRJaTgrQ2lBZ0lDQWdJQ0FnUEdjZ2MzUjViR1U5SW1acGJIUmxjanAxY213b0kzUnZjQzF5WldkcGIyNHRZbXgxY2lrN0lIUnlZVzV6Wm05eWJUcHpZMkZzWlNneExqVXBPeUIwY21GdWMyWnZjbTB0YjNKcFoybHVPbU5sYm5SbGNpQjBiM0E3SWo0S0lDQWdJQ0FnSUNBZ0lDQWdQSEpsWTNRZ1ptbHNiRDBpYm05dVpTSWdlRDBpTUhCNElpQjVQU0l3Y0hnaUlIZHBaSFJvUFNJeU9UQndlQ0lnYUdWcFoyaDBQU0kxTURCd2VDSXZQZ29nSUNBZ0lDQWdJQ0FnSUNBOFpXeHNhWEJ6WlNCamVEMGlOVEFsSWlCamVUMGlNSEI0SWlCeWVEMGlNVGd3Y0hnaUlISjVQU0l4TWpCd2VDSWdabWxzYkQwaUl6QXdNQ0lnYjNCaFkybDBlVDBpTUM0NE5TSXZQZ29nSUNBZ0lDQWdJRHd2Wno0S0lDQWdJQ0FnSUNBOGNtVmpkQ0I0UFNJd0lpQjVQU0l3SWlCM2FXUjBhRDBpTWprd0lpQm9aV2xuYUhROUlqVXdNQ0lnY25nOUlqUXlJaUJ5ZVQwaU5ESWlJR1pwYkd3OUluSm5ZbUVvTUN3d0xEQXNNQ2tpSUhOMGNtOXJaVDBpY21kaVlTZ3lOVFVzTWpVMUxESTFOU3d3TGpJcElpOCtDaUFnSUNBOEwyYytDaUFnSUNBOGRHVjRkQ0IwWlhoMExYSmxibVJsY21sdVp6MGliM0IwYVcxcGVtVlRjR1ZsWkNJK0NpQWdJQ0FnSUNBZ1BIUmxlSFJRWVhSb0lITjBZWEowVDJabWMyVjBQU0l0TVRBd0pTSWdabWxzYkQwaWQyaHBkR1VpSUdadmJuUXRabUZ0YVd4NVBTSW5RMjkxY21sbGNpQk9aWGNuTENCdGIyNXZjM0JoWTJVaUlHWnZiblF0YzJsNlpUMGlNVEJ3ZUNJZ2VHeHBibXM2YUhKbFpqMGlJM1JsZUhRdGNHRjBhQzFoSWo1MGIydGxiaTkzWW5Sakx6RWc0b0NpSUZkQ1ZFTUtJQ0FnSUNBZ0lDQWdJQ0FnUEdGdWFXMWhkR1VnWVdSa2FYUnBkbVU5SW5OMWJTSWdZWFIwY21saWRYUmxUbUZ0WlQwaWMzUmhjblJQWm1aelpYUWlJR1p5YjIwOUlqQWxJaUIwYnowaU1UQXdKU0lnWW1WbmFXNDlJakJ6SWlCa2RYSTlJak13Y3lJZ2NtVndaV0YwUTI5MWJuUTlJbWx1WkdWbWFXNXBkR1VpTHo0S0lDQWdJQ0FnSUNBOEwzUmxlSFJRWVhSb1Bnb2dJQ0FnSUNBZ0lEeDBaWGgwVUdGMGFDQnpkR0Z5ZEU5bVpuTmxkRDBpTUNVaUlHWnBiR3c5SW5kb2FYUmxJaUJtYjI1MExXWmhiV2xzZVQwaUowTnZkWEpwWlhJZ1RtVjNKeXdnYlc5dWIzTndZV05sSWlCbWIyNTBMWE5wZW1VOUlqRXdjSGdpSUhoc2FXNXJPbWh5WldZOUlpTjBaWGgwTFhCaGRHZ3RZU0krZEc5clpXNHZkMkowWXk4eElPS0FvaUJYUWxSRENpQWdJQ0FnSUNBZ0lDQWdJRHhoYm1sdFlYUmxJR0ZrWkdsMGFYWmxQU0p6ZFcwaUlHRjBkSEpwWW5WMFpVNWhiV1U5SW5OMFlYSjBUMlptYzJWMElpQm1jbTl0UFNJd0pTSWdkRzg5SWpFd01DVWlJR0psWjJsdVBTSXdjeUlnWkhWeVBTSXpNSE1pSUhKbGNHVmhkRU52ZFc1MFBTSnBibVJsWm1sdWFYUmxJaTgrQ2lBZ0lDQWdJQ0FnUEM5MFpYaDBVR0YwYUQ0S0lDQWdJQ0FnSUNBOGRHVjRkRkJoZEdnZ2MzUmhjblJQWm1aelpYUTlJalV3SlNJZ1ptbHNiRDBpZDJocGRHVWlJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1UQndlQ0lnZUd4cGJtczZhSEpsWmowaUkzUmxlSFF0Y0dGMGFDMWhJajUwYjJ0bGJpOTNaWFJvTHpJZzRvQ2lJRmRGVkVnS0lDQWdJQ0FnSUNBZ0lDQWdQR0Z1YVcxaGRHVWdZV1JrYVhScGRtVTlJbk4xYlNJZ1lYUjBjbWxpZFhSbFRtRnRaVDBpYzNSaGNuUlBabVp6WlhRaUlHWnliMjA5SWpBbElpQjBiejBpTVRBd0pTSWdZbVZuYVc0OUlqQnpJaUJrZFhJOUlqTXdjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlMejRLSUNBZ0lDQWdJQ0E4TDNSbGVIUlFZWFJvUGdvZ0lDQWdJQ0FnSUR4MFpYaDBVR0YwYUNCemRHRnlkRTltWm5ObGREMGlMVFV3SlNJZ1ptbHNiRDBpZDJocGRHVWlJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1UQndlQ0lnZUd4cGJtczZhSEpsWmowaUkzUmxlSFF0Y0dGMGFDMWhJajUwYjJ0bGJpOTNaWFJvTHpJZzRvQ2lJRmRGVkVnS0lDQWdJQ0FnSUNBZ0lDQWdQR0Z1YVcxaGRHVWdZV1JrYVhScGRtVTlJbk4xYlNJZ1lYUjBjbWxpZFhSbFRtRnRaVDBpYzNSaGNuUlBabVp6WlhRaUlHWnliMjA5SWpBbElpQjBiejBpTVRBd0pTSWdZbVZuYVc0OUlqQnpJaUJrZFhJOUlqTXdjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlMejRLSUNBZ0lDQWdJQ0E4TDNSbGVIUlFZWFJvUGdvZ0lDQWdQQzkwWlhoMFBnb2dJQ0FnUEdjZ2JXRnphejBpZFhKc0tDTm1ZV1JsTFhONWJXSnZiQ2tpUGdvZ0lDQWdJQ0FnSUR4eVpXTjBJR1pwYkd3OUltNXZibVVpSUhnOUlqQndlQ0lnZVQwaU1IQjRJaUIzYVdSMGFEMGlNamt3Y0hnaUlHaGxhV2RvZEQwaU1qQXdjSGdpTHo0S0lDQWdJQ0FnSUNBOGRHVjRkQ0I1UFNJM01IQjRJaUI0UFNJek1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJZ1ptOXVkQzFtWVcxcGJIazlJaWREYjNWeWFXVnlJRTVsZHljc0lHMXZibTl6Y0dGalpTSWdabTl1ZEMxM1pXbG5hSFE5SWpJd01DSWdabTl1ZEMxemFYcGxQU0l6Tm5CNElqNVhSVlJJTDFkQ1ZFTThMM1JsZUhRK0NpQWdJQ0FnSUNBZ1BIUmxlSFFnZVQwaU1URTFjSGdpSUhnOUlqTXljSGdpSUdacGJHdzlJbmRvYVhSbElpQm1iMjUwTFdaaGJXbHNlVDBpSjBOdmRYSnBaWElnVG1WM0p5d2diVzl1YjNOd1lXTmxJaUJtYjI1MExYZGxhV2RvZEQwaU1qQXdJaUJtYjI1MExYTnBlbVU5SWpNMmNIZ2lQakF1TXlVOEwzUmxlSFErQ2lBZ0lDQThMMmMrQ2lBZ0lDQThjbVZqZENCNFBTSXhOaUlnZVQwaU1UWWlJSGRwWkhSb1BTSXlOVGdpSUdobGFXZG9kRDBpTkRZNElpQnllRDBpTWpZaUlISjVQU0l5TmlJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0tTSWdjM1J5YjJ0bFBTSnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVNaWtpTHo0S0lDQWdJRHhuSUcxaGMyczlJblZ5YkNnamJtOXVaU2tpSUhOMGVXeGxQU0owY21GdWMyWnZjbTA2ZEhKaGJuTnNZWFJsS0RjeWNIZ3NNVGc1Y0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCNFBTSXRNVFp3ZUNJZ2VUMGlMVEUyY0hnaUlIZHBaSFJvUFNJeE9EQndlQ0lnYUdWcFoyaDBQU0l4T0RCd2VDSWdabWxzYkQwaWJtOXVaU0l2UGdvZ0lDQWdJQ0FnSUR4d1lYUm9JR1E5SWsweElERkRNVGNnTnpNZ056TWdNVEk1SURFME5TQXhORFVpSUhOMGNtOXJaVDBpY21kaVlTZ3dMREFzTUN3d0xqTXBJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqTXljSGdpSUdacGJHdzlJbTV2Ym1VaUlITjBjbTlyWlMxc2FXNWxZMkZ3UFNKeWIzVnVaQ0l2UGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYldGemF6MGlkWEpzS0NOdWIyNWxLU0lnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTnpKd2VDd3hPRGx3ZUNraVBnb2dJQ0FnSUNBZ0lEeHlaV04wSUhnOUlpMHhObkI0SWlCNVBTSXRNVFp3ZUNJZ2QybGtkR2c5SWpFNE1IQjRJaUJvWldsbmFIUTlJakU0TUhCNElpQm1hV3hzUFNKdWIyNWxJaTgrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFZ01VTXhOeUEzTXlBM015QXhNamtnTVRRMUlERTBOU0lnYzNSeWIydGxQU0p5WjJKaEtESTFOU3d5TlRVc01qVTFMREVwSWlCbWFXeHNQU0p1YjI1bElpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpTHo0S0lDQWdJRHd2Wno0S0lDQWdJRHhqYVhKamJHVWdZM2c5SWpjemNIZ2lJR041UFNJeE9UQndlQ0lnY2owaU5IQjRJaUJtYVd4c1BTSjNhR2wwWlNJdlBnb2dJQ0FnUEdOcGNtTnNaU0JqZUQwaU1qRTNjSGdpSUdONVBTSXpNelJ3ZUNJZ2NqMGlOSEI0SWlCbWFXeHNQU0ozYUdsMFpTSXZQZ284WnlCemRIbHNaVDBpZEhKaGJuTm1iM0p0T25SeVlXNXpiR0YwWlNneU9YQjRMQ0F6T0RSd2VDa2lQZ29nSUNBZ0lDQWdJRHh5WldOMElIZHBaSFJvUFNJMk0zQjRJaUJvWldsbmFIUTlJakkyY0hnaUlISjRQU0k0Y0hnaUlISjVQU0k0Y0hnaUlHWnBiR3c5SW5KblltRW9NQ3d3TERBc01DNDJLU0l2UGdvZ0lDQWdJQ0FnSUR4MFpYaDBJSGc5SWpFeWNIZ2lJSGs5SWpFM2NIZ2lJR1p2Ym5RdFptRnRhV3g1UFNJblEyOTFjbWxsY2lCT1pYY25MQ0J0YjI1dmMzQmhZMlVpSUdadmJuUXRjMmw2WlQwaU1USndlQ0lnWm1sc2JEMGlkMmhwZEdVaVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4ZEhOd1lXNGdabWxzYkQwaWNtZGlZU2d5TlRVc01qVTFMREkxTlN3d0xqWXBJajVKUkRvZ1BDOTBjM0JoYmo0eENpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpsd2VDd2dOREUwY0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRNemNIZ2lJR2hsYVdkb2REMGlNalp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0xqWXBJaTgrQ2lBZ0lDQWdJQ0FnUEhSbGVIUWdlRDBpTVRKd2VDSWdlVDBpTVRkd2VDSWdabTl1ZEMxbVlXMXBiSGs5SWlkRGIzVnlhV1Z5SUU1bGR5Y3NJRzF2Ym05emNHRmpaU0lnWm05dWRDMXphWHBsUFNJeE1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJRHgwYzNCaGJpQm1hV3hzUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU5pa2lQazFwYmlCVWFXTnJPaUE4TDNSemNHRnVQakkwTURBd0NpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpsd2VDd2dORFEwY0hncElqNEtJQ0FnSUNBZ0lDQThjbVZqZENCM2FXUjBhRDBpTVRNemNIZ2lJR2hsYVdkb2REMGlNalp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpY21kaVlTZ3dMREFzTUN3d0xqWXBJaTgrQ2lBZ0lDQWdJQ0FnUEhSbGVIUWdlRDBpTVRKd2VDSWdlVDBpTVRkd2VDSWdabTl1ZEMxbVlXMXBiSGs5SWlkRGIzVnlhV1Z5SUU1bGR5Y3NJRzF2Ym05emNHRmpaU0lnWm05dWRDMXphWHBsUFNJeE1uQjRJaUJtYVd4c1BTSjNhR2wwWlNJK0NpQWdJQ0FnSUNBZ0lDQWdJRHgwYzNCaGJpQm1hV3hzUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU5pa2lQazFoZUNCVWFXTnJPaUE4TDNSemNHRnVQakkzTURBd0NpQWdJQ0FnSUNBZ1BDOTBaWGgwUGdvZ0lDQWdQQzluUGdvZ0lDQWdQR2NnYzNSNWJHVTlJblJ5WVc1elptOXliVHAwY21GdWMyeGhkR1VvTWpJMmNIZ3NJRFF6TTNCNEtTSStDaUFnSUNBZ0lDQWdQSEpsWTNRZ2QybGtkR2c5SWpNMmNIZ2lJR2hsYVdkb2REMGlNelp3ZUNJZ2NuZzlJamh3ZUNJZ2NuazlJamh3ZUNJZ1ptbHNiRDBpYm05dVpTSWdjM1J5YjJ0bFBTSnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVNaWtpTHo0S0lDQWdJQ0FnSUNBOGNHRjBhQ0J6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlHUTlJazA0SURsRE9DNHdNREF3TkNBeU1pNDVORGswSURFMkxqSXdPVGtnTWpnZ01qY2dNamdpSUdacGJHdzlJbTV2Ym1VaUlITjBjbTlyWlQwaWQyaHBkR1VpTHo0S0lDQWdJQ0FnSUNBOFkybHlZMnhsSUhOMGVXeGxQU0owY21GdWMyWnZjbTA2ZEhKaGJuTnNZWFJsTTJRb01UaHdlQ3dnTWpad2VDd2dNSEI0S1NJZ1kzZzlJakJ3ZUNJZ1kzazlJakJ3ZUNJZ2NqMGlOSEI0SWlCbWFXeHNQU0ozYUdsMFpTSXZQZ29nSUNBZ1BDOW5QZ29KUEdjZ2MzUjViR1U5SW5SeVlXNXpabTl5YlRwMGNtRnVjMnhoZEdVb01qSTJjSGdzSURNNU1uQjRLU0krQ2drSlBISmxZM1FnZDJsa2RHZzlJak0yY0hnaUlHaGxhV2RvZEQwaU16WndlQ0lnY25nOUlqaHdlQ0lnY25rOUlqaHdlQ0lnWm1sc2JEMGlibTl1WlNJZ2MzUnliMnRsUFNKeVoySmhLREkxTlN3eU5UVXNNalUxTERBdU1pa2lMejRuTEFvSkNUeG5QZ29KQ1FrOGNHRjBhQ0J6ZEhsc1pUMGlkSEpoYm5ObWIzSnRPblJ5WVc1emJHRjBaU2cyY0hnc05uQjRLU0lnWkQwaVRURXlJREJNTVRJdU5qVXlNaUE1TGpVMk5UZzNUREU0SURFdU5qQTNOMHd4TXk0M09ERTVJREV3TGpJeE9ERk1Nakl1TXpreU15QTJUREUwTGpRek5ERWdMREV4TGpNME56aE1NalFnTVRKTU1UUXVORE0wTVNBeE1pNDJOVEl5VERJeUxqTTVNak1nTVRoTU1UTXVOemd4T1NBeE15NDNPREU1VERFNElESXlMak01TWpOTU1USXVOalV5TWlBeE5DNDBNelF4VERFeUlESTBUREV4TGpNME56Z2dNVFF1TkRNME1VdzJJREl5TGpNNUp5d3lNMHd4TUM0eU1UZ3hJREV6TGpjNE1UbE1NUzQyTURjM0lERTRURGt1TlRZMU9EY2dNVEl1TmpVeU1rd3dJREV5VERrdU5UWTFPRGNnTVRFdU16UTNPRXd4TGpZd056Y2dOa3d4TUM0eU1UZ3hJREV3TGpJeE9ERk1OaUF4TGpZd056ZE1NVEV1TXpRM09DQTVMalUyTlRnM1RERXlJREJhSWlCbWFXeHNQU0ozYUdsMFpTSXZQaXdLQ1FrSlBHRnVhVzFoZEdWVWNtRnVjMlp2Y20wZ1lYUjBjbWxpZFhSbFRtRnRaVDBpZEhKaGJuTm1iM0p0SWlCMGVYQmxQU0p5YjNSaGRHVWlJR1p5YjIwOUlqQWdNVGdnTVRnaUlIUnZQU0l6TmpBZ01UZ2dNVGdpSUdSMWNqMGlNVEJ6SWlCeVpYQmxZWFJEYjNWdWREMGlhVzVrWldacGJtbDBaU0l2UGdvSkNUd3ZaejRLQ1R3dlp6NEtQQzl6ZG1jK0NnPT0iCn0K"
}
```

#### 7. 根据`address`查询流动池

```
/metaos-labs/metaos/swap/pools/{address}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pools/mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "denom0": "token/wbtc/1",
    "denom1": "token/weth/2",
    "decimal0": 8,
    "decimal1": 18,
    "fee": 3000,
    "tick_spacing": 60,
    "max_liquidity_per_tick": "11505743598341114571880798222544994"
  }
}
```

#### 8. 查询所有的流动池

```
/metaos-labs/metaos/swap/pools
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pools" -H  "accept: application/json"
```

输出示例:

```json
{
  "pools": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "denom0": "token/wbtc/1",
      "denom1": "token/weth/2",
      "decimal0": 8,
      "decimal1": 18,
      "fee": 3000,
      "tick_spacing": 60,
      "max_liquidity_per_tick": "11505743598341114571880798222544994"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### 9. 根据`fee`查询流动池费用信息

```
/metaos-labs/metaos/swap/pool/fees/{fee}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool/fees/3000" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_fee": {
    "fee": 3000,
    "tick_spacing": 60
  }
}
```

#### 10. 查询所有的费用信息

```
/metaos-labs/metaos/swap/pool/fees
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool/fees" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_fees": [
    {
      "fee": 100,
      "tick_spacing": 1
    },
    {
      "fee": 500,
      "tick_spacing": 10
    },
    {
      "fee": 3000,
      "tick_spacing": 60
    },
    {
      "fee": 10000,
      "tick_spacing": 200
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "4"
  }
}
```

#### 11. 根据`address`查询池slot0信息

```
/metaos-labs/metaos/swap/pools/{address}/slot0
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pools/mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg/slot0" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_slot0": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "tick": 25656,
    "sqrt_price": "3.6065000000000000000000000000",
    "liquidity": "45.3621929427803404693739454875",
    "fee_growth_global0": "0",
    "fee_growth_global1": "0",
    "fee_protocol_owed0": "0",
    "fee_protocol_owed1": "0",
    "observation_index": 0,
    "observation_cardinality": 1,
    "observation_cardinality_next": 1,
    "reward_update_time_last": "2022-08-12T04:16:52Z",
    "reward_configs": []
  }
}
```

#### 12. 查询所有流动池的slot0信息

```
/metaos-labs/metaos/swap/pool_slot0s
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool_slot0s" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_slot0s": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "tick": 25656,
      "sqrt_price": "3.6065000000000000000000000000",
      "liquidity": "45.3621929427803404693739454875",
      "fee_growth_global0": "0",
      "fee_growth_global1": "0",
      "fee_protocol_owed0": "0",
      "fee_protocol_owed1": "0",
      "observation_index": 0,
      "observation_cardinality": 1,
      "observation_cardinality_next": 1,
      "reward_update_time_last": "2022-08-12T04:16:52Z",
      "reward_configs": []
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### 13. 根据`addresses`查询流动池的slot0聚合信息

```
/metaos-labs/metaos/swap/pool_slot0_aggregations
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool_slot0_aggregations?addresses=mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_slot0_aggregations": [
    {
      "pool": {
        "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
        "denom0": "token/wbtc/1",
        "denom1": "token/weth/2",
        "decimal0": 8,
        "decimal1": 18,
        "fee": 3000,
        "tick_spacing": 60,
        "max_liquidity_per_tick": "11505743598341114571880798222544994"
      },
      "pool_slot0": {
        "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
        "tick": 25656,
        "sqrt_price": "3.6065000000000000000000000000",
        "liquidity": "45.3621929427803404693739454875",
        "fee_growth_global0": "0",
        "fee_growth_global1": "0",
        "fee_protocol_owed0": "0",
        "fee_protocol_owed1": "0",
        "observation_index": 0,
        "observation_cardinality": 1,
        "observation_cardinality_next": 1,
        "reward_update_time_last": "2022-08-12T04:16:52Z",
        "reward_configs": []
      }
    }
  ]
}
```

#### 14. 根据`address`及`index`查询池的预言机信息

```
/metaos-labs/metaos/swap/pools/{address}/observations/{index}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pools/mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg/observations/0" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_observation": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "index": 0,
    "block_timestamp": "2022-08-12T04:16:52Z",
    "tick_cumulative": "128280",
    "seconds_per_liquidity_cumulative": "5.0000000000000000000000000000"
  }
}
```

#### 15. 查询所有的池的预言机信息

```
/metaos-labs/metaos/swap/pool_observations
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool_observations?address=mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_observations": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "index": 0,
      "block_timestamp": "2022-08-12T04:16:52Z",
      "tick_cumulative": "128280",
      "seconds_per_liquidity_cumulative": "5.0000000000000000000000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### 16. 根据`address`,`owner`,`tick_lower`及`tick_upper`查询池仓位信息

```
/metaos-labs/metaos/swap/pools/{address}/positions/{owner}/{tick_lower}/{tick_upper}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pools/mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg/positions/mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq/24000/27000" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_position": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "owner": "mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq",
    "tick_lower": 24000,
    "tick_upper": 27000,
    "liquidity": "45.3621929427803404693739454875",
    "fee_growth_inside0": "0",
    "fee_growth_inside1": "0",
    "tokens_owed0": "0",
    "tokens_owed1": "0",
    "reward_growth_insides": [],
    "reward_oweds": []
  }
}
```

#### 17. 根据`address`及`owner`查询所有的池仓位信息

```
/metaos-labs/metaos/swap/pool_positions
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool_positions?address=mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg&owner=mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_positions": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "owner": "mtos1zh2vn3cq2u00g5vnjffsl0wxs4smpklaylyyqq",
      "tick_lower": 24000,
      "tick_upper": 27000,
      "liquidity": "45.3621929427803404693739454875",
      "fee_growth_inside0": "0",
      "fee_growth_inside1": "0",
      "tokens_owed0": "0",
      "tokens_owed1": "0",
      "reward_growth_insides": [],
      "reward_oweds": []
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### 18. 根据`address`及`index`查询PoolTick信息

```
/metaos-labs/metaos/swap/pools/{address}/ticks/{index}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pools/mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg/ticks/27000" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_tick": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "index": 27000,
    "liquidity_gross": "45.3621929427803404693739454875",
    "liquidity_net": "-45.3621929427803404693739454875",
    "fee_growth_outside0": "0",
    "fee_growth_outside1": "0",
    "tick_cumulative_outside": "0",
    "seconds_per_liquidity_outside": "0",
    "seconds_outside": "0",
    "reward_growth_outsides": []
  }
}
```

#### 19. 根据`address`查询所有的PoolTick信息

```
/metaos-labs/metaos/swap/pool_ticks
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool_ticks?address=mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_ticks": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "index": 24000,
      "liquidity_gross": "45.3621929427803404693739454875",
      "liquidity_net": "45.3621929427803404693739454875",
      "fee_growth_outside0": "0",
      "fee_growth_outside1": "0",
      "tick_cumulative_outside": "128280",
      "seconds_per_liquidity_outside": "5.0000000000000000000000000000",
      "seconds_outside": "1660277812",
      "reward_growth_outsides": []
    },
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "index": 27000,
      "liquidity_gross": "45.3621929427803404693739454875",
      "liquidity_net": "-45.3621929427803404693739454875",
      "fee_growth_outside0": "0",
      "fee_growth_outside1": "0",
      "tick_cumulative_outside": "0",
      "seconds_per_liquidity_outside": "0",
      "seconds_outside": "0",
      "reward_growth_outsides": []
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "2"
  }
}
```

#### 20. 根据`address`及`index`查询PoolWord信息

```
/metaos-labs/metaos/swap/pools/{address}/words/{index}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pools/mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg/words/1" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_word": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
    "index": 1,
    "word": "100000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  }
}
```

#### 21. 根据`address`查询所有的PoolWord信息

```
/metaos-labs/metaos/swap/pool_words
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/pool_words?address=mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg" -H  "accept: application/json"
```

输出示例:

```json
{
  "pool_words": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg",
      "index": 1,
      "word": "100000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### 22. 查询精确输入的交易报价

```
/metaos-labs/metaos/swap/quote_swap_exact_in
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/quote_swap_exact_in?amount_in=100000000&gas_limit=200000&denoms=token%2Fwbtc%2F1&denoms=token%2Fweth%2F2&fees=3000" -H  "accept: application/json"
```

输出示例:

```json
{
  "available": true,
  "amount_out": "12015408139513296186",
  "initialized_ticks_crossed": 0,
  "gas_used": "42030"
}
```

#### 23. 查询精确输出的交易报价

```
/metaos-labs/metaos/swap/quote_swap_exact_out
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/quote_swap_exact_out?amount_out=1000000000000000000&gas_limit=200000&denoms=token%2Fwbtc%2F1&denoms=token%2Fweth%2F2&fees=3000" -H  "accept: application/json"
```

输出示例:

```json
{
  "available": false,
  "amount_in": null,
  "initialized_ticks_crossed": 0,
  "gas_used": "0"
}
```

#### 24. 根据`address`查询核心池

```
/metaos-labs/metaos/swap/core_pools/{address}
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/core_pools/mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg" -H  "accept: application/json"
```

输出示例:

```json
{
  "corePool": {
    "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
  }
}
```

#### 25. 查询所有的核心池

```
/metaos-labs/metaos/swap/core_pools
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/swap/core_pools" -H  "accept: application/json"
```

输出示例:

```json
{
  "core_pools": [
    {
      "address": "mtos1px6ytuj6kxjhjrweuyccs622lj7f4avmrhtwvg"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```
