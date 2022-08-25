(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{446:function(t,e,a){"use strict";a.r(e);var n=a(35),i=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"states-of-validator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#states-of-validator"}},[t._v("#")]),t._v(" States of validator")]),t._v(" "),a("p",[t._v("After a validator is created with the "),a("code",[t._v("create-validator")]),t._v(" transaction, it can be in three states:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("bonded")]),t._v(": A validator that is in the active set and participates in consensus. This validator is earning rewards and can be slashed for misbehavior.")]),t._v(" "),a("li",[a("code",[t._v("unbonding")]),t._v(": A validator that is not in the active set and can not participate in consensus. This validator is not earning rewards but can still be slashed for misbehaviour. This is a transition state from "),a("code",[t._v("bonded")]),t._v(" to "),a("code",[t._v("unbonded")]),t._v(". If a validator does not send a "),a("code",[t._v("rebond")]),t._v(" transaction while in "),a("code",[t._v("unbonding")]),t._v(" mode, it will take three weeks for the state transition to complete.")]),t._v(" "),a("li",[a("code",[t._v("unbonded")]),t._v(": A validator that is not in the active set and not signing blocks. Unbonded validators can't be slashed and can't earn any rewards from their operation. It is still possible to delegate "),a("code",[t._v("MTOS")]),t._v(" to "),a("code",[t._v("unbonded")]),t._v(" validators. Un-delegating from an "),a("code",[t._v("unbonded")]),t._v(" validator is immediate.")])]),t._v(" "),a("p",[t._v("All Delegators have the same state as their validator.")])])}),[],!1,null,null,null);e.default=i.exports}}]);