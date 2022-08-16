# Delegate to a validator

If you are a simple user, also you trust a validator operator and want to delegate some `MTOS` to it for earning some returns, use the following command to delegate:

```shell
metaosd tx staking delegate <operator address of validator> <amount of umtos you want to delegate> --from <your key or address> 
```

Example:
```shell
metaosd tx staking delegate mtosvaloper1fjxjm3xc9s3u280eclzesy6ns4y4wgq00qw5yy 1000000000000000000000000umtos --from bob --gas auto --gas-adjustment 1.2
```

