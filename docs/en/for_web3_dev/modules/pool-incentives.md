# pool-incentives

## Abstract

本文档描述了MetaOS的内部模块 x/pool-incentives,该模块是经济模型的一部分,旨在通过向与x/swap交互的用户分配奖励的方式来促进网络的发展,奖励促使用户与MetaOS网络交互并将他们得到的奖励再投资于网络中的更多服务,从而壮大整个网络









#  Pool-incentives Model

`x/pool-incentives`模块实现了随机交易挖矿逻辑,奖励随时间递减,随机交易挖矿发行的MTOS将占总发行量的`10%`,约`2亿MTOS`,项目初期会预先指定部分核心交易对参与挖矿，未来可以通过社区治理调整核心交易对,详细设计如下:

- 奖励发放: 每天发放一次,默认每天112笔奖励

- 奖励分配: 

  - 一等奖: 50%(默认每天2个名额)
  - 二等奖: 25%(默认每天10个名额)
  - 三等奖: 25%(默认每天100个名额)

- 衰减规则: 初始奖励每天约68493 MTOS,每4年产出减半，直到挖完为止。

  









# State

## State Objects

The `x/pool-incentives` module keeps the following objects in state:

| State Object                   | Description                           | Key                                                          | Value                                   | Store |
| :----------------------------- | :------------------------------------ | :----------------------------------------------------------- | :-------------------------------------- | :---- |
| RandSwapRewardConfigs          | all the randSwapRewardConfig          | `[]byte{randSwapRewardConfig.Id}`                            | `[]byte{RandSwapRewardConfig.Id}`       | KV    |
| RandSwapRewardConfigCount      | randSwapRewardConfig count            | `[]byte{0x01}`                                               | `[]byte{RandSwapRewardConfigCount}`     | KV    |
| RandSwapRewardRounds           | all the randSwapRewardRound           | `[]byte{RandSwapRewardRound.ConfigId}`                       | `[]byte{RandSwapRewardRound}`           | KV    |
| RandSwapRewardRoundWithConfigs | all the randSwapRewardRoundWithConfig | `[]byte{RandSwapRewardRoundWithConfig.ConfigId+RandSwapRewardRoundWithConfig.Round}` | `[]byte{RandSwapRewardRoundWithConfig}` | KV    |
| RandSwapRewardRoundSequencers  | all the randSwapRewardRoundSequencer  | `[]byte{RandSwapRewardRoundSequencer.ConfigId+RandSwapRewardRoundSequencer.Round}` | `[]byte{RandSwapRewardRoundSequencer}`  | KV    |
| RandSwapRewardRoundSequences   | all the randSwapRewardRoundSequence   | `[]byte{RandSwapRewardRoundSequence.ConfigId+RandSwapRewardRoundSequence.Round+RandSwapRewardRoundSequence.Sequence}` | `[]byte{RandSwapRewardRoundSequence}`   | KV    |
| RandSwapRewardDenoms           | all the randSwapRewardDenom           | `[]byte{RandSwapRewardDenom.Denom}`                          | `[]byte{RandSwapRewardDenom}`           | KV    |
| RandSwapPoolRewards            | all the randSwapPoolReward            | `[]byte{RandSwapPoolReward.Address}`                         | `[]byte{RandSwapPoolReward}`            | KV    |
| RandSwapRewardReveals          | all the randSwapRewardReveal          | `[]byte{RandSwapRewardReveal.ConfigId+RandSwapRewardReveal.Round}` | `[]byte{RandSwapRewardReveal}`          | KV    |
| RandSwapAccountRewards         | all the randSwapAccountReward         | `[]byte{RandSwapAccountReward.Account+RandSwapAccountReward.Denom}` | `[]byte{RandSwapAccountReward}`         | KV    |
| RandSwapSequenceClears         | all the randSwapSequenceClear         | `[]byte{RandSwapSequenceClear.ConfigId+RandSwapSequenceClear.Round}` | `[]byte{RandSwapSequenceClear}`         | KV    |
| LiquidityRewardConfigs         | all the liquidityRewardConfig         | `[]byte{LiquidityRewardConfig.Id}`                           | `[]byte{LiquidityRewardConfig}`         | KV    |
| LiquidityRewardConfigCount     | liquidityRewardConfig count           | `[]byte{0x11}`                                               | `[]byte{LiquidityRewardConfigCount}`    | KV    |
| LiquidityRewardDenoms          | all the liquidityRewardDenom          | `[]byte{LiquidityRewardDenom.Denom}`                         | `[]byte{LiquidityRewardDenom}`          | KV    |
| LiquidityPoolRewards           | all the liquidityPoolReward           | `[]byte{LiquidityPoolReward.Address}`                        | `[]byte{LiquidityPoolReward}`           | KV    |

### 

## Genesis State

The `x/pool-incentives` module's `GenesisState` defines the state necessary for initializing the chain from a previously exported height. 

```go
type GenesisState struct {
	Params                         Params                          `protobuf:"bytes,1,opt,name=params,proto3" json:"params"`
	RandSwapRewardConfigs          []RandSwapRewardConfig          `protobuf:"bytes,2,rep,name=rand_swap_reward_configs,json=randSwapRewardConfigs,proto3" json:"rand_swap_reward_configs" yaml:"rand_swap_reward_configs"`
	RandSwapRewardConfigCount      uint64                          `protobuf:"varint,3,opt,name=rand_swap_reward_config_count,json=randSwapRewardConfigCount,proto3" json:"rand_swap_reward_config_count,omitempty" yaml:"rand_swap_reward_config_count"`
	RandSwapRewardRounds           []RandSwapRewardRound           `protobuf:"bytes,4,rep,name=rand_swap_reward_rounds,json=randSwapRewardRounds,proto3" json:"rand_swap_reward_rounds" yaml:"rand_swap_reward_rounds"`
	RandSwapRewardRoundWithConfigs []RandSwapRewardRoundWithConfig `protobuf:"bytes,5,rep,name=rand_swap_reward_round_with_configs,json=randSwapRewardRoundWithConfigs,proto3" json:"rand_swap_reward_round_with_configs" yaml:"rand_swap_reward_round_with_configs"`
	RandSwapRewardRoundSequencers  []RandSwapRewardRoundSequencer  `protobuf:"bytes,6,rep,name=rand_swap_reward_round_sequencers,json=randSwapRewardRoundSequencers,proto3" json:"rand_swap_reward_round_sequencers" yaml:"rand_swap_reward_round_sequencers"`
	RandSwapRewardRoundSequences   []RandSwapRewardRoundSequence   `protobuf:"bytes,7,rep,name=rand_swap_reward_round_sequences,json=randSwapRewardRoundSequences,proto3" json:"rand_swap_reward_round_sequences" yaml:"rand_swap_reward_round_sequences"`
	RandSwapRewardDenoms           []RandSwapRewardDenom           `protobuf:"bytes,8,rep,name=rand_swap_reward_denoms,json=randSwapRewardDenoms,proto3" json:"rand_swap_reward_denoms" yaml:"rand_swap_reward_denoms"`
	RandSwapPoolRewards            []RandSwapPoolReward            `protobuf:"bytes,9,rep,name=rand_swap_pool_rewards,json=randSwapPoolRewards,proto3" json:"rand_swap_pool_rewards" yaml:"rand_swap_pool_rewards"`
	RandSwapRewardReveals          []RandSwapRewardReveal          `protobuf:"bytes,10,rep,name=rand_swap_reward_reveals,json=randSwapRewardReveals,proto3" json:"rand_swap_reward_reveals" yaml:"rand_swap_reward_reveals"`
	RandSwapAccountRewards         []RandSwapAccountReward         `protobuf:"bytes,11,rep,name=rand_swap_account_rewards,json=randSwapAccountRewards,proto3" json:"rand_swap_account_rewards" yaml:"rand_swap_account_rewards"`
	RandSwapSequenceClears         []RandSwapSequenceClear         `protobuf:"bytes,12,rep,name=rand_swap_sequence_clears,json=randSwapSequenceClears,proto3" json:"rand_swap_sequence_clears" yaml:"rand_swap_sequence_clears"`
	LiquidityRewardConfigs         []LiquidityRewardConfig         `protobuf:"bytes,13,rep,name=liquidity_reward_configs,json=liquidityRewardConfigs,proto3" json:"liquidity_reward_configs" yaml:"liquidity_reward_configs"`
	LiquidityRewardConfigCount     uint64                          `protobuf:"varint,14,opt,name=liquidity_reward_config_count,json=liquidityRewardConfigCount,proto3" json:"liquidity_reward_config_count,omitempty" yaml:"liquidity_reward_config_count"`
	LiquidityRewardDenoms          []LiquidityRewardDenom          `protobuf:"bytes,15,rep,name=liquidity_reward_denoms,json=liquidityRewardDenoms,proto3" json:"liquidity_reward_denoms" yaml:"liquidity_reward_denoms"`
	LiquidityPoolRewards           []LiquidityPoolReward           `protobuf:"bytes,16,rep,name=liquidity_pool_rewards,json=liquidityPoolRewards,proto3" json:"liquidity_pool_rewards" yaml:"liquidity_pool_rewards"`
}
```









# Parameters

The `x/pool-incentives` module contains the parameters described below

| Key                                        | Type   | Default Value |
| :----------------------------------------- | :----- | :------------ |
| `SuperOperator`                            | string | ""            |
| `RewardDenom`                              | string | `umtos`       |
| `RandSwapRewardEnabled`                    | bool   | `true`        |
| `RandSwapRewardCreateEnabled`              | bool   | `true`        |
| `CorePoolRandSwapRewardConfigId`           | uint64 | 1             |
| `RandSwapRewardMaxNumberOfRevealPerConfig` | uint32 | 32            |
| `RandSwapRewardMaxNumberOfRevealPerBlock`  | uint32 | 160           |
| `RandSwapSequenceMaxNumberOfClearPerBlock` | uint32 | 256           |
| `LiquidityRewardEnabled`                   | bool   | true          |
| `LiquidityRewardCreateEnabled`             | bool   | true          |
| `CorePoolLiquidityRewardConfigId`          | uint64 | 1             |

## SuperOperator

超级管理,此字段目前未使用

## RewardDenom

奖励的币种

## RandSwapRewardEnabled

随机交易挖矿的开关,如果此字段为false则代表随机交易挖矿功能被禁用

## RandSwapRewardCreateEnabled

是否允许创建随机交易挖矿

## CorePoolRandSwapRewardConfigId

核心交易池配置id,只有与核心交易对交易的用户才有可能获取随机交易挖矿奖励

## RandSwapRewardMaxNumberOfRevealPerConfig

为防止开奖时抽奖次数过多导致出块时间变长,交易挖矿开奖时需要规定每一级奖项最多开奖次数

## RandSwapRewardMaxNumberOfRevealPerBlock

为防止开奖时抽奖次数过多导致出块时间变长,交易挖矿开奖时需要规定每一高度最多开奖次数

## LiquidityRewardEnabled 

流动性挖矿开关

## LiquidityRewardCreateEnabled

流动性挖矿创建开关

## CorePoolLiquidityRewardConfigId

核心交易池配置id





# Clients

A user can query the `x/pool-incentives` module using the CLI, JSON-RPC, gRPC or REST.

## CLI

Find below a list of `metaosd` commands added with the `x/pool-incentives` module. You can obtain the full list by using the `metaos -h` command.

### Queries

The `query` commands allow users to query `pool-incentives` state.

**`liquidity-pool-rewards`**

Query for liquidity pool rewards

```shell
metaosd query pool-incentives liquidity-pool-rewards [flags]
```

**`liquidity-reward-configs`**

Query for liquidity reward configs

```shell
metaosd query pool-incentives liquidity-reward-configs [flags]
```

**`liquidity-reward-denoms`**

Query for liquidity reward denoms

```shell
metaosd query pool-incentives liquidity-reward-denoms [flags]
```

**`params`**

shows the parameters of the module

```shell
metaosd query pool-incentives params [flags]
```

**`rand-swap-account-rewards`**

Query for rand swap account rewards

```shell
metaosd query pool-incentives rand-swap-account-rewards [flags]
```

**`rand-swap-pool-rewards`**

Query for rand swap pool rewards

```shell
metaosd query pool-incentives rand-swap-pool-rewards [flags]
```

**`rand-swap-reward-configs`**

Query for rand swap reward configs

```shell
metaosd query pool-incentives rand-swap-reward-configs [flags]
```

**`rand-swap-reward-denoms`**

Query for rand swap reward denoms

```shell
metaosd query pool-incentives rand-swap-reward-denoms [flags]
```

**`rand-swap-reward-reveals`**

 rand-swap-reward-reveals       

```shell
metaosd query pool-incentives rand-swap-reward-reveals [flags]
```

**`rand-swap-reward-round-sequencers `**

Query for rand swap reward round sequencers

```shell
metaosd query pool-incentives rand-swap-reward-round-sequencers [flags]
```

**`rand-swap-reward-round-sequences`**

Query for rand swap reward round sequences

```shell
metaosd query pool-incentives rand-swap-reward-round-sequences [flags]
```

**`rand-swap-reward-round-with-configs`**

Query for rand swap reward round with configs

```shell
metaosd query pool-incentives rand-swap-reward-round-with-configs [flags]
```

**`rand-swap-reward-rounds`**

Query for rand swap reward rounds

```shell
metaosd query pool-incentives rand-swap-reward-rounds [flags]
```

**`rand-swap-sequence-clears`**

Query for rand swap sequence clears

```shell
metaosd query pool-incentives rand-swap-sequence-clears [flags]
```





