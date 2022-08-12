# Snapshot

Quick instructions on how to install the snapshots.

According to the snapshot size, it is divided into nothing, default, everything:

- nothing: 将保存所有历史状态，不删除任何内容，即归档节点。
- default: 保留最近362880块的数据, 每隔100块保存一次状态, 每10个块执行一次裁剪操作.
- everything: 保留最近2块数据, 仅存储当前状态, 每10个块执行一次裁剪操作.

选择合适的snapshot链接，以保证数据的完整性。

```bash
cd $HOME/.metaos/data
wget snapshoturl TODO
tar xf xxxx.tar
metaosd start
```
