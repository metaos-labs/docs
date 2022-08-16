# Manage a validator

The tasks in this section describe how to set up a MetaOS validator. 
While setting up a rudimentary validating node is easy, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

The MetaOS core is powered by the Tendermint consensus. 
Validators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain. 
Validators can cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake. 
The top 21 validators make up the **Active Validator Set** and are the only validators that sign blocks and receive revenue.

Validators and their delegators earn the following rewards:

- **Gas**: Fees added on to each transaction to avoid spamming and pay for computing power. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold.

- **Other rewards?**: wait for supplying...

Validators can set commissions on the fees they receive as an additional incentive.

If validators double sign, are frequently offline, or do not participate in governance, their staked MTOS (including MTOS of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.


## Contents

- [Register A Validator](register-a-validator.md)
- [Restore A Validator](restore-a-validator.md)
- [Validator States](validator-states.md)
- [Delegate To A Validator](delegate-to-a-validator.md)
- [Implement Security Practices](security-practices.md)
- [Sentry Node Architecture](sentry-node-architecture.md)
- [Remote Signer](remote-signer.md)