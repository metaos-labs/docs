# Validator FAQ

## General Concepts

### What is a validator?
MetaOS is powered by Tendermint (opens new window)Core, which relies on a set of validators to secure the network. 
Validators run a full node and participate in consensus by broadcasting votes which contain cryptographic signatures signed by their private key.
Validators commit new blocks in the blockchain and receive revenue in exchange for their work. 
They also participate in on-procotol treasury governance by voting on governance proposals. 
A validator's voting influence is weighted according to their total stake.


### What is "staking"?
MetaOS is a public Proof-of-Stake (PoS) blockchain, meaning that validator's weight is determined by the amount of staking tokens (MTOS) bonded as collateral. 
These staking tokens can be staked directly by the validator or delegated to them by MTOS holders.

Any user in the system can declare its intention to become a validator by sending a create-validator transaction. From there, they become validators.

The weight (i.e. total stake or voting power) of a validator determines wether or not it is an active validator, 
and also how frequently this node will have to propose a block and how much revenue it will obtain. Initially, 
only the top 150 validators with the most weight will be active validators. If validators double-sign,
or are frequently offline, they risk their staked tokens (including MTOS delegated by users) being "slashed" by the protocol to penalize negligence and misbehavior.

### What is a full node?
A full node is a program that fully validates transactions and blocks of a blockchain.
It is distinct from a light client node that only processes block headers and a small subset of transactions.
Running a full node requires more resources than a light client but is necessary in order to be a validator. 
In practice, running a full-node only implies running a non-compromised and up-to-date version of the software with low network latency and without downtime.

Of course, it is possible and encouraged for any user to run full nodes even if they do not plan to be validators.

### What is a delegator?

Delegators are MTOS holders who cannot, or do not want to run validator operations themselves. 
Users can delegate MTOS to a validator and obtain a part of its revenue in exchange 

Because they share revenue with their validators, delegators also share responsibility. Should a validator misbehave, 
each of its delegators will be partially slashed in proportion to their stake. 
This is why delegators should perform due-diligence on validators before delegating, 
as well as diversifying by spreading their stake over multiple validators.

Delegators play a critical role in the system, as they are responsible for choosing validators.
Be aware that being a delegator is not a passive role. Delegators are obligated to remain vigilant and actively monitor the actions of their validators, 
switching should they fail to act responsibly.

## Becoming a Validator
### How to become a validator?
Any participant in the network can signal their intent to become a validator by creating a validator and registering its validator profile. 
To do so, the candidate broadcasts a create-validator transaction, in which they must submit the following information:

- **Validator's PubKey**: Validator operators can have different accounts for validating and holding liquid funds. 
The PubKey submitted must be associated with the private key with which the validator intends to sign prevotes and precommits.
- **Validator's Address**: This is the address used to identify your validator publicly. The private key associated with this address is used to bond, unbond, and claim rewards.
- Validator's name (also known as the moniker)
- Validator's website (optional)
- Validator's description (optional)
- Initial commission rate: The commission rate on block provisions, block rewards and fees charged to delegators. 
- Maximum commission: The maximum commission rate which this validator will be allowed to charge. 
- Commission change rate: The maximum daily increase of the validator commission. 
- Minimum self-bond amount: Minimum amount of MTOS the validator needs to have bonded at all times. If the validator's self-bonded stake falls below this limit, its entire staking pool will be unbonded. 
- Initial self-bond amount: Initial amount of MTOS the validator wants to self-bond.

```bash
metaosd tx staking create-validator --pubkey=$(metaosd tendermint show-validator) --moniker="my nickname" --identity="logo|||http://mywebsite/pic/logo.jpg" --website="http://mywebsite" --details="my slogan" --from jack
```

Once a validator is created and registered, MTOS holders can delegate MTOS to it, effectively adding stake to its pool. The total stake of a validator is the sum of the MTOS self-bonded by the validator's operator and the MTOS bonded by external delegators.

Only the top 21 validators with the most stake are considered the active validators, becoming bonded validators. 
If ever a validator's total stake dips below the top 150, the validator loses its validator privileges (meaning that it won't generate rewards) and no longer serves as part of the active set (i.e doesn't participate in consensus), entering unbonding mode and eventually becomes unbonded.

## Validator keys and states
### What are the different types of keys?
In short, there are two types of keys:
- **Tendermint Key**: This is a unique key used to sign block hashes. 
  - Generated when the node is created with `metaosd init`.
  - Get this value with `metaosd tendermint show-validator`
  - 
- Application keys: These keys are created from the application and used to sign transactions. 

### What are the different states a validator can be in?
After a validator is created with a `create-validator` transaction, it can be in three states:
- `bonded`: Validator is in the active set and participates in consensus. Validator is earning rewards and can be slashed for misbehaviour.
- `unbonding`: Validator is not in the active set and does not participate in consensus. Validator is not earning rewards, but can still be slashed for misbehaviour. This is a transition state from bonded to unbonded. If validator does not send a rebond transaction while in unbonding mode, it will take three weeks for the state transition to complete.
- `unbonded`: Validator is not in the active set, and therefore not signing blocks. Unbonded validators cannot be slashed, but do not earn any rewards from their operation. It is still possible to delegate MTOS to this validator. Un-delegating from an unbonded validator is immediate.

Delegators have the same state as their validator.

### What is "self-bond"? How can I increase my "self-bond"?
The validator operator's "self-bond" refers to the amount of MTOS stake delegated to itself. You can increase your self-bond by delegating more MTOS to your validator account.

### How will delegators choose their validators?
Delegators are free to choose validators according to their own subjective criteria. That said, criteria anticipated to be important include:

- Amount of self-bonded MTOS: Number of MTOS a validator self-bonded to its staking pool. A validator with higher amount of self-bonded MTOS has more skin in the game, making it more liable for its actions.
- Amount of delegated MTOS: Total number of MTOS delegated to a validator. A high stake shows that the community trusts this validator, but it also means that this validator is a bigger target for hackers. Validators are expected to become less and less attractive as their amount of delegated MTOS grows. Bigger validators also increase the centralization of the network.
- Commission rate: Commission applied on revenue by validators before it is distributed to their delegators
- Track record: Delegators will likely look at the track record of the validators they plan to delegate to. This includes seniority, past votes on proposals, historical average uptime and how often the node was compromised.
