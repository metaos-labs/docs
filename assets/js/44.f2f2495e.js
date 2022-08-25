(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{459:function(t,a,e){"use strict";e.r(a);var s=e(35),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"pool-incentives"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pool-incentives"}},[t._v("#")]),t._v(" pool-incentives")]),t._v(" "),e("h2",{attrs:{id:"abstract"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[t._v("#")]),t._v(" Abstract")]),t._v(" "),e("p",[t._v("本文档描述了MetaOS的内部模块 x/pool-incentives,该模块是经济模型的一部分,旨在通过向与x/swap交互的用户分配奖励的方式来促进网络的发展,奖励促使用户与MetaOS网络交互并将他们得到的奖励再投资于网络中的更多服务,从而壮大整个网络")]),t._v(" "),e("h2",{attrs:{id:"pool-incentives-model"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pool-incentives-model"}},[t._v("#")]),t._v(" Pool-incentives Model")]),t._v(" "),e("p",[e("code",[t._v("x/pool-incentives")]),t._v("模块实现了随机交易挖矿逻辑,奖励随时间递减,随机交易挖矿发行的MTOS将占总发行量的"),e("code",[t._v("10%")]),t._v(",约"),e("code",[t._v("2亿MTOS")]),t._v(",项目初期会预先指定部分核心交易对参与挖矿，未来可以通过社区治理调整核心交易对,详细设计如下:")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("奖励发放: 每天发放一次,默认每天112笔奖励")])]),t._v(" "),e("li",[e("p",[t._v("奖励分配:")]),t._v(" "),e("ul",[e("li",[t._v("一等奖: 50%(默认每天2个名额)")]),t._v(" "),e("li",[t._v("二等奖: 25%(默认每天10个名额)")]),t._v(" "),e("li",[t._v("三等奖: 25%(默认每天100个名额)")])])]),t._v(" "),e("li",[e("p",[t._v("衰减规则: 初始奖励每天约68493 MTOS,每4年产出减半，直到挖完为止。")])])]),t._v(" "),e("h2",{attrs:{id:"state"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#state"}},[t._v("#")]),t._v(" State")]),t._v(" "),e("h3",{attrs:{id:"state-objects"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#state-objects"}},[t._v("#")]),t._v(" State Objects")]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("x/pool-incentives")]),t._v(" module keeps the following objects in state:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("State Object")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Key")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Value")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Store")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardConfigs")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapRewardConfig")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{randSwapRewardConfig.Id}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardConfig.Id}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardConfigCount")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("randSwapRewardConfig count")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{0x01}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardConfigCount}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardRounds")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapRewardRound")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRound.ConfigId}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRound}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardRoundWithConfigs")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapRewardRoundWithConfig")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRoundWithConfig.ConfigId+RandSwapRewardRoundWithConfig.Round}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRoundWithConfig}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardRoundSequencers")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapRewardRoundSequencer")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRoundSequencer.ConfigId+RandSwapRewardRoundSequencer.Round}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRoundSequencer}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardRoundSequences")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapRewardRoundSequence")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRoundSequence.ConfigId+RandSwapRewardRoundSequence.Round+RandSwapRewardRoundSequence.Sequence}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardRoundSequence}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardDenoms")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapRewardDenom")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardDenom.Denom}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardDenom}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapPoolRewards")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapPoolReward")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapPoolReward.Address}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapPoolReward}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapRewardReveals")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapRewardReveal")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardReveal.ConfigId+RandSwapRewardReveal.Round}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapRewardReveal}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapAccountRewards")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapAccountReward")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapAccountReward.Account+RandSwapAccountReward.Denom}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapAccountReward}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("RandSwapSequenceClears")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the randSwapSequenceClear")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapSequenceClear.ConfigId+RandSwapSequenceClear.Round}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{RandSwapSequenceClear}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("LiquidityRewardConfigs")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the liquidityRewardConfig")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{LiquidityRewardConfig.Id}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{LiquidityRewardConfig}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("LiquidityRewardConfigCount")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("liquidityRewardConfig count")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{0x11}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{LiquidityRewardConfigCount}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("LiquidityRewardDenoms")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the liquidityRewardDenom")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{LiquidityRewardDenom.Denom}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{LiquidityRewardDenom}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("LiquidityPoolRewards")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("all the liquidityPoolReward")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{LiquidityPoolReward.Address}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("[]byte{LiquidityPoolReward}")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("KV")])])])]),t._v(" "),e("h3",{attrs:{id:""}},[e("a",{staticClass:"header-anchor",attrs:{href:"#"}},[t._v("#")])]),t._v(" "),e("h3",{attrs:{id:"genesis-state"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#genesis-state"}},[t._v("#")]),t._v(" Genesis State")]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("x/pool-incentives")]),t._v(" module's "),e("code",[t._v("GenesisState")]),t._v(" defines the state necessary for initializing the chain from a previously exported height.")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" GenesisState "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tParams                         Params                          "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,1,opt,name=params,proto3" json:"params"`')]),t._v("\n\tRandSwapRewardConfigs          "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapRewardConfig          "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,2,rep,name=rand_swap_reward_configs,json=randSwapRewardConfigs,proto3" json:"rand_swap_reward_configs" yaml:"rand_swap_reward_configs"`')]),t._v("\n\tRandSwapRewardConfigCount      "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("uint64")]),t._v("                          "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"varint,3,opt,name=rand_swap_reward_config_count,json=randSwapRewardConfigCount,proto3" json:"rand_swap_reward_config_count,omitempty" yaml:"rand_swap_reward_config_count"`')]),t._v("\n\tRandSwapRewardRounds           "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapRewardRound           "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,4,rep,name=rand_swap_reward_rounds,json=randSwapRewardRounds,proto3" json:"rand_swap_reward_rounds" yaml:"rand_swap_reward_rounds"`')]),t._v("\n\tRandSwapRewardRoundWithConfigs "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapRewardRoundWithConfig "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,5,rep,name=rand_swap_reward_round_with_configs,json=randSwapRewardRoundWithConfigs,proto3" json:"rand_swap_reward_round_with_configs" yaml:"rand_swap_reward_round_with_configs"`')]),t._v("\n\tRandSwapRewardRoundSequencers  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapRewardRoundSequencer  "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,6,rep,name=rand_swap_reward_round_sequencers,json=randSwapRewardRoundSequencers,proto3" json:"rand_swap_reward_round_sequencers" yaml:"rand_swap_reward_round_sequencers"`')]),t._v("\n\tRandSwapRewardRoundSequences   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapRewardRoundSequence   "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,7,rep,name=rand_swap_reward_round_sequences,json=randSwapRewardRoundSequences,proto3" json:"rand_swap_reward_round_sequences" yaml:"rand_swap_reward_round_sequences"`')]),t._v("\n\tRandSwapRewardDenoms           "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapRewardDenom           "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,8,rep,name=rand_swap_reward_denoms,json=randSwapRewardDenoms,proto3" json:"rand_swap_reward_denoms" yaml:"rand_swap_reward_denoms"`')]),t._v("\n\tRandSwapPoolRewards            "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapPoolReward            "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,9,rep,name=rand_swap_pool_rewards,json=randSwapPoolRewards,proto3" json:"rand_swap_pool_rewards" yaml:"rand_swap_pool_rewards"`')]),t._v("\n\tRandSwapRewardReveals          "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapRewardReveal          "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,10,rep,name=rand_swap_reward_reveals,json=randSwapRewardReveals,proto3" json:"rand_swap_reward_reveals" yaml:"rand_swap_reward_reveals"`')]),t._v("\n\tRandSwapAccountRewards         "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapAccountReward         "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,11,rep,name=rand_swap_account_rewards,json=randSwapAccountRewards,proto3" json:"rand_swap_account_rewards" yaml:"rand_swap_account_rewards"`')]),t._v("\n\tRandSwapSequenceClears         "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("RandSwapSequenceClear         "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,12,rep,name=rand_swap_sequence_clears,json=randSwapSequenceClears,proto3" json:"rand_swap_sequence_clears" yaml:"rand_swap_sequence_clears"`')]),t._v("\n\tLiquidityRewardConfigs         "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("LiquidityRewardConfig         "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,13,rep,name=liquidity_reward_configs,json=liquidityRewardConfigs,proto3" json:"liquidity_reward_configs" yaml:"liquidity_reward_configs"`')]),t._v("\n\tLiquidityRewardConfigCount     "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("uint64")]),t._v("                          "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"varint,14,opt,name=liquidity_reward_config_count,json=liquidityRewardConfigCount,proto3" json:"liquidity_reward_config_count,omitempty" yaml:"liquidity_reward_config_count"`')]),t._v("\n\tLiquidityRewardDenoms          "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("LiquidityRewardDenom          "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,15,rep,name=liquidity_reward_denoms,json=liquidityRewardDenoms,proto3" json:"liquidity_reward_denoms" yaml:"liquidity_reward_denoms"`')]),t._v("\n\tLiquidityPoolRewards           "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("LiquidityPoolReward           "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`protobuf:"bytes,16,rep,name=liquidity_pool_rewards,json=liquidityPoolRewards,proto3" json:"liquidity_pool_rewards" yaml:"liquidity_pool_rewards"`')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"parameters"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parameters"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("x/pool-incentives")]),t._v(" module contains the parameters described below")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Key")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Default Value")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("SuperOperator")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("string")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v('""')])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("RewardDenom")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("string")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("umtos")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("RandSwapRewardEnabled")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("bool")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("true")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("RandSwapRewardCreateEnabled")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("bool")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("true")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("CorePoolRandSwapRewardConfigId")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("uint64")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("1")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("RandSwapRewardMaxNumberOfRevealPerConfig")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("uint32")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("32")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("RandSwapRewardMaxNumberOfRevealPerBlock")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("uint32")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("160")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("RandSwapSequenceMaxNumberOfClearPerBlock")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("uint32")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("256")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("LiquidityRewardEnabled")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("bool")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("true")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("LiquidityRewardCreateEnabled")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("bool")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("true")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("CorePoolLiquidityRewardConfigId")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("uint64")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("1")])])])]),t._v(" "),e("h3",{attrs:{id:"superoperator"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#superoperator"}},[t._v("#")]),t._v(" SuperOperator")]),t._v(" "),e("p",[t._v("超级管理,此字段目前未使用")]),t._v(" "),e("h3",{attrs:{id:"rewarddenom"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rewarddenom"}},[t._v("#")]),t._v(" RewardDenom")]),t._v(" "),e("p",[t._v("奖励的币种")]),t._v(" "),e("h3",{attrs:{id:"randswaprewardenabled"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#randswaprewardenabled"}},[t._v("#")]),t._v(" RandSwapRewardEnabled")]),t._v(" "),e("p",[t._v("随机交易挖矿的开关,如果此字段为false则代表随机交易挖矿功能被禁用")]),t._v(" "),e("h3",{attrs:{id:"randswaprewardcreateenabled"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#randswaprewardcreateenabled"}},[t._v("#")]),t._v(" RandSwapRewardCreateEnabled")]),t._v(" "),e("p",[t._v("是否允许创建随机交易挖矿")]),t._v(" "),e("h3",{attrs:{id:"corepoolrandswaprewardconfigid"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#corepoolrandswaprewardconfigid"}},[t._v("#")]),t._v(" CorePoolRandSwapRewardConfigId")]),t._v(" "),e("p",[t._v("核心交易池配置id,只有与核心交易对交易的用户才有可能获取随机交易挖矿奖励")]),t._v(" "),e("h3",{attrs:{id:"randswaprewardmaxnumberofrevealperconfig"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#randswaprewardmaxnumberofrevealperconfig"}},[t._v("#")]),t._v(" RandSwapRewardMaxNumberOfRevealPerConfig")]),t._v(" "),e("p",[t._v("为防止开奖时抽奖次数过多导致出块时间变长,交易挖矿开奖时需要规定每一级奖项最多开奖次数")]),t._v(" "),e("h3",{attrs:{id:"randswaprewardmaxnumberofrevealperblock"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#randswaprewardmaxnumberofrevealperblock"}},[t._v("#")]),t._v(" RandSwapRewardMaxNumberOfRevealPerBlock")]),t._v(" "),e("p",[t._v("为防止开奖时抽奖次数过多导致出块时间变长,交易挖矿开奖时需要规定每一高度最多开奖次数")]),t._v(" "),e("h3",{attrs:{id:"liquidityrewardenabled"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#liquidityrewardenabled"}},[t._v("#")]),t._v(" LiquidityRewardEnabled")]),t._v(" "),e("p",[t._v("流动性挖矿开关")]),t._v(" "),e("h3",{attrs:{id:"liquidityrewardcreateenabled"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#liquidityrewardcreateenabled"}},[t._v("#")]),t._v(" LiquidityRewardCreateEnabled")]),t._v(" "),e("p",[t._v("流动性挖矿创建开关")]),t._v(" "),e("h3",{attrs:{id:"corepoolliquidityrewardconfigid"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#corepoolliquidityrewardconfigid"}},[t._v("#")]),t._v(" CorePoolLiquidityRewardConfigId")]),t._v(" "),e("p",[t._v("核心交易池配置id")]),t._v(" "),e("h2",{attrs:{id:"clients"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#clients"}},[t._v("#")]),t._v(" Clients")]),t._v(" "),e("p",[t._v("A user can query the "),e("code",[t._v("x/pool-incentives")]),t._v(" module using the CLI, JSON-RPC, gRPC or REST.")]),t._v(" "),e("h3",{attrs:{id:"cli"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cli"}},[t._v("#")]),t._v(" CLI")]),t._v(" "),e("p",[t._v("Find below a list of "),e("code",[t._v("metaosd")]),t._v(" commands added with the "),e("code",[t._v("x/pool-incentives")]),t._v(" module. You can obtain the full list by using the "),e("code",[t._v("metaos -h")]),t._v(" command.")]),t._v(" "),e("h3",{attrs:{id:"queries"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#queries"}},[t._v("#")]),t._v(" Queries")]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("query")]),t._v(" commands allow users to query "),e("code",[t._v("pool-incentives")]),t._v(" state.")]),t._v(" "),e("p",[e("strong",[e("code",[t._v("liquidity-pool-rewards")])])]),t._v(" "),e("p",[t._v("Query for liquidity pool rewards")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives liquidity-pool-rewards "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("liquidity-reward-configs")])])]),t._v(" "),e("p",[t._v("Query for liquidity reward configs")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives liquidity-reward-configs "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("liquidity-reward-denoms")])])]),t._v(" "),e("p",[t._v("Query for liquidity reward denoms")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives liquidity-reward-denoms "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("params")])])]),t._v(" "),e("p",[t._v("shows the parameters of the module")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives params "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-account-rewards")])])]),t._v(" "),e("p",[t._v("Query for rand swap account rewards")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-account-rewards "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-pool-rewards")])])]),t._v(" "),e("p",[t._v("Query for rand swap pool rewards")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-pool-rewards "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-reward-configs")])])]),t._v(" "),e("p",[t._v("Query for rand swap reward configs")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-reward-configs "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-reward-denoms")])])]),t._v(" "),e("p",[t._v("Query for rand swap reward denoms")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-reward-denoms "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-reward-reveals")])])]),t._v(" "),e("p",[t._v("rand-swap-reward-reveals")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-reward-reveals "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-reward-round-sequencers")])])]),t._v(" "),e("p",[t._v("Query for rand swap reward round sequencers")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-reward-round-sequencers "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-reward-round-sequences")])])]),t._v(" "),e("p",[t._v("Query for rand swap reward round sequences")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-reward-round-sequences "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-reward-round-with-configs")])])]),t._v(" "),e("p",[t._v("Query for rand swap reward round with configs")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-reward-round-with-configs "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-reward-rounds")])])]),t._v(" "),e("p",[t._v("Query for rand swap reward rounds")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-reward-rounds "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[e("strong",[e("code",[t._v("rand-swap-sequence-clears")])])]),t._v(" "),e("p",[t._v("Query for rand swap sequence clears")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("metaosd query pool-incentives rand-swap-sequence-clears "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("flags"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);