(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{456:function(a,t,s){"use strict";s.r(t);var e=s(35),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"delayed"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delayed"}},[a._v("#")]),a._v(" Delayed")]),a._v(" "),s("h2",{attrs:{id:"overview"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[a._v("#")]),a._v(" Overview")]),a._v(" "),s("p",[a._v("本文档指定了delayed模块，它允许模块开发人员向其模块添加DelayedAction，并通过Hooks在一个块的开始或者结束执行。")]),a._v(" "),s("h2",{attrs:{id:"concepts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#concepts"}},[a._v("#")]),a._v(" Concepts")]),a._v(" "),s("h3",{attrs:{id:"delayedaction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delayedaction"}},[a._v("#")]),a._v(" DelayedAction")]),a._v(" "),s("p",[a._v("延时的操作，它指的是模块在将来的某一个时间将要执行的操作。")]),a._v(" "),s("p",[s("code",[a._v("DelayedAction")]),a._v("定义了操作触发的时间("),s("code",[a._v("TriggerTime")]),a._v(")，ID("),s("code",[a._v("Identifier")]),a._v(")以及数据("),s("code",[a._v("Data")]),a._v(")，若"),s("code",[a._v("BlockTime")]),a._v("小于"),s("code",[a._v("TriggerTime")]),a._v("，则不会触发该操作。")]),a._v(" "),s("p",[a._v("本模块定义了DelayedAction相关的CRUD操作，其他模块可以通过本模块来添加"),s("code",[a._v("DelayedAction")]),a._v("来延时执行其模块的操作。")]),a._v(" "),s("h3",{attrs:{id:"delayedactionhooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delayedactionhooks"}},[a._v("#")]),a._v(" DelayedActionHooks")]),a._v(" "),s("p",[a._v("它是延时操作的挂钩，可以用来处理"),s("code",[a._v("DelayedAction")]),a._v("，"),s("code",[a._v("Hooks")]),a._v("中还定义了是否支持处理指定"),s("code",[a._v("DelayedAction")]),a._v("的方法。")]),a._v(" "),s("p",[a._v("其他模块可以设置为本模块的"),s("code",[a._v("Hooks")]),a._v("，本模块则可以将每一个"),s("code",[a._v("DelayedAction")]),a._v("依次交给那些支持处理它的"),s("code",[a._v("Hooks")]),a._v("来处理。\n每个"),s("code",[a._v("Hooks")]),a._v("处理完后，还可以决定是否移除指定的"),s("code",[a._v("DelayedAction")]),a._v("，若移除的话，将不会再交给后续的"),s("code",[a._v("Hooks")]),a._v("来处理。")]),a._v(" "),s("h3",{attrs:{id:"beginblocker-and-endblocker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beginblocker-and-endblocker"}},[a._v("#")]),a._v(" BeginBlocker and EndBlocker")]),a._v(" "),s("p",[a._v("BeginBlocker 和 EndBlocker 是模块开发人员向其模块添加自动执行逻辑的一种方式，它们将分别在每个块的开始和结束时触发。")]),a._v(" "),s("p",[a._v("本模块为其他模块提供了执行"),s("code",[a._v("DelayedAction")]),a._v("的统一处理方式，它会在块的开始及结束时迭代所有的"),s("code",[a._v("DelayedAction")]),a._v("，\n若"),s("code",[a._v("DelayedAction")]),a._v("满足了触发条件，则会交给相关的"),s("code",[a._v("Hooks")]),a._v("来进行处理。")]),a._v(" "),s("h2",{attrs:{id:"state"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#state"}},[a._v("#")]),a._v(" State")]),a._v(" "),s("p",[s("code",[a._v("delayed")]),a._v(" 模块保存以下主要对象的状态：")]),a._v(" "),s("p",[s("code",[a._v("DelayedAction")]),a._v("(延时的操作)")]),a._v(" "),s("p",[a._v("此外，"),s("code",[a._v("delayed")]),a._v(" 模块保留了以下索引来管理上述状态：")]),a._v(" "),s("ul",[s("li",[a._v("延时的操作："),s("code",[a._v('0x00 | BigEndian(TriggerTime ms) | byte[]("/") | byte[](Identifier)-> ProtocolBuffer(DelayedAction)')])])]),a._v(" "),s("h3",{attrs:{id:"delayedactions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delayedactions"}},[a._v("#")]),a._v(" DelayedActions")]),a._v(" "),s("p",[a._v("代表多个需要在未来某一时间触发的操作,"),s("code",[a._v("DelayedAction")]),a._v("中包含了如下必要字段:")]),a._v(" "),s("ul",[s("li",[s("code",[a._v("TriggerTime")]),a._v(":该操作的具体触发时间")]),a._v(" "),s("li",[s("code",[a._v("Identifier")]),a._v(":延迟调用模块的标识符")]),a._v(" "),s("li",[s("code",[a._v("Data")]),a._v(": 执行具体操作时需要的必要参数")])]),a._v(" "),s("h2",{attrs:{id:"genesis-state"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#genesis-state"}},[a._v("#")]),a._v(" Genesis State")]),a._v(" "),s("p",[a._v("The "),s("code",[a._v("x/delayed")]),a._v(" module's "),s("code",[a._v("GenesisState")]),a._v(" defines the state necessary for initializing the chain from a previously exported height.")]),a._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("type")]),a._v(" GenesisState "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("struct")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\tParams         Params          "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('`protobuf:"bytes,1,opt,name=params,proto3" json:"params"`')]),a._v("\n\tDelayedActions "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("DelayedAction "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('`protobuf:"bytes,2,rep,name=delayed_actions,json=delayedActions,proto3" json:"delayed_actions" yaml:"delayed_actions"`')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h2",{attrs:{id:"usage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[a._v("#")]),a._v(" Usage")]),a._v(" "),s("h3",{attrs:{id:"cli"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cli"}},[a._v("#")]),a._v(" CLI")]),a._v(" "),s("p",[a._v("用户可以使用 CLI 查询 "),s("code",[a._v("delayed")]),a._v(" 模块并与之交互。")]),a._v(" "),s("h4",{attrs:{id:"查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查询"}},[a._v("#")]),a._v(" 查询")]),a._v(" "),s("p",[s("code",[a._v("query")]),a._v(" 命令允许用户查询"),s("code",[a._v("delayed")]),a._v(" 状态。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("metaosd query delayed --help\n")])])]),s("h5",{attrs:{id:"延时的操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#延时的操作"}},[a._v("#")]),a._v(" 延时的操作")]),a._v(" "),s("p",[s("code",[a._v("delayed-actions")]),a._v(" 命令允许用户查询所有的延时操作或者指定的延时操作。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("metaosd query delayed delayed-actions "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("flags"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("示例:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("metaosd query delayed delayed-actions\n")])])]),s("p",[a._v("输出示例：")]),a._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("delayed_actions")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("'@type'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" /metaoslabs.metaos.deflation.RepurchaseAction\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("identifier")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" deflation/repurchase\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("trigger_time")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2022-07-29T02:07:20Z"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("pagination")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("next_key")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token null important"}},[a._v("null")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("total")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"0"')]),a._v("\n")])])]),s("p",[a._v("示例:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("metaosd query delayed delayed-actions --trigger-time"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2022")]),a._v("-07-29T02:07:20Z --identifier"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("deflation/repurchase\n")])])]),s("p",[a._v("输出示例：")]),a._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("delayed_action")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("'@type'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" /metaoslabs.metaos.deflation.RepurchaseAction\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("identifier")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" deflation/repurchase\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("trigger_time")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2022-07-29T02:07:20Z"')]),a._v("\n")])])]),s("h3",{attrs:{id:"grpc"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#grpc"}},[a._v("#")]),a._v(" gRPC")]),a._v(" "),s("p",[a._v("用户可以使用 gRPC 端点查询"),s("code",[a._v("delayed")]),a._v("模块。")]),a._v(" "),s("h4",{attrs:{id:"延时的操作-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#延时的操作-2"}},[a._v("#")]),a._v(" 延时的操作")]),a._v(" "),s("p",[s("code",[a._v("DelayedAction")]),a._v("允许用户查询给定的延时操作。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("/metaoslabs.metaos.delayed.Query/DelayedAction\n")])])]),s("p",[a._v("示例:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("grpcurl -plaintext "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    -d "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('\'{"trigger_time":"2022-07-29T02:07:20Z","identifier":"deflation/repurchase"}\'')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    localhost:9090 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    metaoslabs.metaos.delayed.Query/DelayedAction\n")])])]),s("p",[a._v("输出示例：")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"delayedAction"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"triggerTime"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2022-07-29T02:07:20Z"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"identifier"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"deflation/repurchase"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"@type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/metaoslabs.metaos.deflation.RepurchaseAction"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h4",{attrs:{id:"delayedactionall"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delayedactionall"}},[a._v("#")]),a._v(" DelayedActionAll")]),a._v(" "),s("p",[s("code",[a._v("DelayedActionAll")]),a._v(" 端点允许用户查询所有的延时操作。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("metaoslabs.metaos.delayed.Query/DelayedActionAll\n")])])]),s("p",[a._v("示例:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("grpcurl -plaintext "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    localhost:9090 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    metaoslabs.metaos.delayed.Query/DelayedActionAll\n")])])]),s("p",[a._v("输出示例：")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"delayedActions"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"triggerTime"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2022-07-29T02:07:20Z"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"identifier"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"deflation/repurchase"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"@type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/metaoslabs.metaos.deflation.RepurchaseAction"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"pagination"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"total"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"1"')]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h3",{attrs:{id:"rest"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rest"}},[a._v("#")]),a._v(" REST")]),a._v(" "),s("p",[a._v("用户可以使用 REST 查询"),s("code",[a._v("delayed")]),a._v("模块。")]),a._v(" "),s("h4",{attrs:{id:"延时的操作-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#延时的操作-3"}},[a._v("#")]),a._v(" 延时的操作")]),a._v(" "),s("p",[s("code",[a._v("delayed_actions")]),a._v("允许用户查询指定延时的操作。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("/metaos-labs/metaos/delayed/delayed_actions/by_identifier\n")])])]),s("p",[a._v("示例:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -X GET "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"http://localhost:1317/metaos-labs/metaos/delayed/delayed_actions/by_identifier?trigger_time=2022-07-29T02%3A07%3A20Z&identifier=deflation%2Frepurchase"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    -H  "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"accept: application/json"')]),a._v("\n")])])]),s("p",[a._v("输出示例：")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"delayed_action"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"trigger_time"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2022-07-29T02:07:20Z"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"identifier"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"deflation/repurchase"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"@type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/metaoslabs.metaos.deflation.RepurchaseAction"')]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h4",{attrs:{id:"延时的操作-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#延时的操作-4"}},[a._v("#")]),a._v(" 延时的操作")]),a._v(" "),s("p",[s("code",[a._v("delayed_actions")]),a._v(" 还允许用户查询所有延时的操作。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("/metaos-labs/metaos/delayed/delayed_actions\n")])])]),s("p",[a._v("示例:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -X GET "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"http://localhost:1317/metaos-labs/metaos/delayed/delayed_actions"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n    -H  "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"accept: application/json"')]),a._v("\n")])])]),s("p",[a._v("输出示例：")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"delayed_actions"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"trigger_time"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2022-07-29T02:07:20Z"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"identifier"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"deflation/repurchase"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"@type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/metaoslabs.metaos.deflation.RepurchaseAction"')]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"pagination"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"next_key"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token null keyword"}},[a._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"total"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"1"')]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);