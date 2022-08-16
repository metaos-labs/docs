# States of validator

After a validator is created with the `create-validator` transaction, it can be in three states:

- `bonded`: A validator that is in the active set and participates in consensus. This validator is earning rewards and can be slashed for misbehavior.
- `unbonding`: A validator that is not in the active set and can not participate in consensus. This validator is not earning rewards but can still be slashed for misbehaviour. This is a transition state from `bonded` to `unbonded`. If a validator does not send a `rebond` transaction while in `unbonding` mode, it will take three weeks for the state transition to complete.
- `unbonded`: A validator that is not in the active set and not signing blocks. Unbonded validators can't be slashed and can't earn any rewards from their operation. It is still possible to delegate `MTOS` to `unbonded` validators. Un-delegating from an `unbonded` validator is immediate.

All Delegators have the same state as their validator.