# VALIDATOR GUIDE (CLI)

Staking is an important basic module supporting PoS (Proof of Stake) consensus mechanism. It determines the number of block producer sets in each election period according to the total amount of delegated proof of stake accepted by validators, and dynamically determines the block order according to the voting power. Meanwhile, it also provides necessary support for delegation relationships and information query of validators to distribution and governance modules.

Through staking, you can freely create validators, update validators, delegate proof of stake to trusted validators, cancel delegation from validators that you no longer trust, and re-delegate proof of stake to other validators.

## Rotation mechanism

OKC will re-elect block generation nodes from each set at each fixed block height interval which is called cycle. The block generation set is fixed and the identities of block generation nodes in the set remain unchanged during the same cycle. At the penultimate block height interval during the same cycle, staking will rotate the block generation node sets for the next cycle. The top 21 nodes with the highest number of okt will become the block generation nodes in the next cycle, and the nodes which are not the top 21 ones with the highest number of okt in the set will be forced to quit. The number of okt should only be an integer, and the decimal part is not considered when the comparison of the numbers of nodes supported by the sets is made during rotation. OKC will re-elect block generation nodes at each fixed block height interval, called cycle. The block producer will be changed every 252 blocks (a cycle), and the next producer is elected on the 251th block of a cycle. This change takes effect in the 1st block of the next cycle. The top 21 nodes with the highest number of OKT will become the block generation nodes in the next cycle, and the nodes which are not within the top 21 ones with the highest number of OKT in the set will be forced to quit. The number of OKT should only be an integer, and the decimal part is not considered when the comparison of the numbers of nodes supported by the sets is made during each rotation.

## cli command

Staking cli command contains the 5 following commands for PoS operations.

- create-validator：create a validator
- edit-validator：update a validator
- deposit：deposit tokens
- add shares：add shares that are calculated by deposited token
- withdraw：withdraw the deposited token

## Create a validator 

Upgrade a node to a validator and set the description on a validator.

```bash
exchaincli tx staking create-validator --pubkey=$(exchaind tendermint show-validator) --moniker="my nickname" --identity="logo|||http://mywebsite/pic/logo.jpg" --website="http://mywebsite" --details="my slogan" --from jack
```

- Pubkey represents the tendermint public key of the current node
- Moniker indicates the alias of the validator
- Identity specifies the address of the validator’s profile picture
- Website indicates the validator’s website address
- Details indicate the validator’s detailed description
- From specifies the operator’s account, which is jack here

## Update a validator

The operator can update the description of the validator and adjust the commission rate.

```bash
exchaincli tx staking edit-validator --moniker=“my new nickname” --identity="logo|||http://mynewwebsite/pic/newlogo.jpg" --website="http://mynewwebsite" --details="my new slogan"  --from jack
```

- moniker indicates the alias of the validator to be updated
- identity specifies the address of the profile picture of the validator to be updated
- website indicates the website address of the validator to be updated
- details indicate the detailed description of the validator to be updated
- from specifies the operator’s account, which is jack here

## Deposit

Users first need to deposit a certain amount of OKTs to make the staking account become a delegator one.

```bash
exchaincli tx staking deposit <amountToDeposit> --from <delegatorKeyName> --gas auto --gas-adjustment 1.5 --gas-prices <gasPrice>
```

