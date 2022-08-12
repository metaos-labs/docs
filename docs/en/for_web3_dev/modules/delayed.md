# Delayed

## Overview

本文档指定了delayed模块，它允许模块开发人员向其模块添加DelayedAction，并通过Hooks在一个块的开始或者结束执行。

## Concepts

### DelayedAction

延时的操作，它指的是模块在将来的某一个时间将要执行的操作。

`DelayedAction`定义了操作触发的时间(`TriggerTime`)，ID(`Identifier`)以及数据(`Data`)，若`BlockTime`小于`TriggerTime`，则不会触发该操作。

本模块定义了DelayedAction相关的CRUD操作，其他模块可以通过本模块来添加`DelayedAction`来延时执行其模块的操作。

### DelayedActionHooks

它是延时操作的挂钩，可以用来处理`DelayedAction`，`Hooks`中还定义了是否支持处理指定`DelayedAction`的方法。

其他模块可以设置为本模块的`Hooks`，本模块则可以将每一个`DelayedAction`依次交给那些支持处理它的`Hooks`来处理。
每个`Hooks`处理完后，还可以决定是否移除指定的`DelayedAction`，若移除的话，将不会再交给后续的`Hooks`来处理。

### BeginBlocker and EndBlocker

BeginBlocker 和 EndBlocker 是模块开发人员向其模块添加自动执行逻辑的一种方式，它们将分别在每个块的开始和结束时触发。

本模块为其他模块提供了执行`DelayedAction`的统一处理方式，它会在块的开始及结束时迭代所有的`DelayedAction`，
若`DelayedAction`满足了触发条件，则会交给相关的`Hooks`来进行处理。

## State

`delayed` 模块保存以下主要对象的状态：

`DelayedAction`(延时的操作)

此外，`delayed` 模块保留了以下索引来管理上述状态：

* 延时的操作：`0x00 | BigEndian(TriggerTime ms) | byte[]("/") | byte[](Identifier)-> ProtocolBuffer(DelayedAction)`

### DelayedActions

代表多个需要在未来某一时间触发的操作,`DelayedAction`中包含了如下必要字段:

- `TriggerTime`:该操作的具体触发时间
- `Identifier`:延迟调用模块的标识符
- `Data`: 执行具体操作时需要的必要参数

## Genesis State

The `x/delayed` module's `GenesisState` defines the state necessary for initializing the chain from a previously exported height. 

```go
type GenesisState struct {
	Params         Params          `protobuf:"bytes,1,opt,name=params,proto3" json:"params"`
	DelayedActions []DelayedAction `protobuf:"bytes,2,rep,name=delayed_actions,json=delayedActions,proto3" json:"delayed_actions" yaml:"delayed_actions"`
}
```



## Usage

### CLI

用户可以使用 CLI 查询 `delayed` 模块并与之交互。

#### 查询

`query` 命令允许用户查询`delayed` 状态。

```bash
metaosd query delayed --help
```

##### 延时的操作

`delayed-actions` 命令允许用户查询所有的延时操作或者指定的延时操作。

```bash
metaosd query delayed delayed-actions [flags]
```

示例:

```bash
metaosd query delayed delayed-actions
```

输出示例：

```yaml
delayed_actions:
- data:
    '@type': /metaoslabs.metaos.deflation.RepurchaseAction
  identifier: deflation/repurchase
  trigger_time: "2022-07-29T02:07:20Z"
pagination:
  next_key: null
  total: "0"
```

示例:

```bash
metaosd query delayed delayed-actions --trigger-time=2022-07-29T02:07:20Z --identifier=deflation/repurchase
```

输出示例：

```yaml
delayed_action:
  data:
    '@type': /metaoslabs.metaos.deflation.RepurchaseAction
  identifier: deflation/repurchase
  trigger_time: "2022-07-29T02:07:20Z"
```

### gRPC

用户可以使用 gRPC 端点查询`delayed`模块。

#### 延时的操作

`DelayedAction`允许用户查询给定的延时操作。

```bash
/metaoslabs.metaos.delayed.Query/DelayedAction
```

示例:

```bash
grpcurl -plaintext \
    -d '{"trigger_time":"2022-07-29T02:07:20Z","identifier":"deflation/repurchase"}' \
    localhost:9090 \
    metaoslabs.metaos.delayed.Query/DelayedAction
```

输出示例：

```json
{
  "delayedAction": {
    "triggerTime": "2022-07-29T02:07:20Z",
    "identifier": "deflation/repurchase",
    "data": {"@type":"/metaoslabs.metaos.deflation.RepurchaseAction"}
  }
}
```

#### DelayedActionAll

`DelayedActionAll` 端点允许用户查询所有的延时操作。

```bash
metaoslabs.metaos.delayed.Query/DelayedActionAll
```

示例:

```bash
grpcurl -plaintext \
    localhost:9090 \
    metaoslabs.metaos.delayed.Query/DelayedActionAll
```

输出示例：

```json
{
  "delayedActions": [
    {
      "triggerTime": "2022-07-29T02:07:20Z",
      "identifier": "deflation/repurchase",
      "data": {"@type":"/metaoslabs.metaos.deflation.RepurchaseAction"}
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

### REST

用户可以使用 REST 查询`delayed`模块。

#### 延时的操作

`delayed_actions`允许用户查询指定延时的操作。

```bash
/metaos-labs/metaos/delayed/delayed_actions/by_identifier
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/delayed/delayed_actions/by_identifier?trigger_time=2022-07-29T02%3A07%3A20Z&identifier=deflation%2Frepurchase" \
    -H  "accept: application/json"
```

输出示例：

```json
{
  "delayed_action": {
    "trigger_time": "2022-07-29T02:07:20Z",
    "identifier": "deflation/repurchase",
    "data": {
      "@type": "/metaoslabs.metaos.deflation.RepurchaseAction"
    }
  }
}
```

#### 延时的操作

`delayed_actions` 还允许用户查询所有延时的操作。

```bash
/metaos-labs/metaos/delayed/delayed_actions
```

示例:

```bash
curl -X GET "http://localhost:1317/metaos-labs/metaos/delayed/delayed_actions" \
    -H  "accept: application/json"
```

输出示例：

```json
{
  "delayed_actions": [
    {
      "trigger_time": "2022-07-29T02:07:20Z",
      "identifier": "deflation/repurchase",
      "data": {
        "@type": "/metaoslabs.metaos.deflation.RepurchaseAction"
      }
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```
