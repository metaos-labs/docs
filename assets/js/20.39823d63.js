(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{435:function(e,a,t){"use strict";t.r(a);var s=t(35),o=Object(s.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"reset"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reset"}},[e._v("#")]),e._v(" Reset")]),e._v(" "),t("h2",{attrs:{id:"complete-reset"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#complete-reset"}},[e._v("#")]),e._v(" Complete reset")]),e._v(" "),t("p",[e._v("Occasionally you may need to perform a complete reset of your node due to data corruption or misconfiguration.\nResetting will remove all data in "),t("code",[e._v("~/.metaos/data")]),e._v(" and the addressbook in "),t("code",[e._v("~/.metaos/config/addrbook.json")]),e._v(" and reset the node to genesis state.")]),e._v(" "),t("p",[e._v("To perform a complete reset of your "),t("code",[e._v("metaosd")]),e._v(" state, use:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("metaosd tendermint unsafe-reset-all\n")])])]),t("p",[e._v("Running this command successfully will produce the following log:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("[ INF ] Removed existing address book file=/home/user/.metaos/config/addrbook.json\n[ INF ] Removed all blockchain history dir=/home/user/.metaos/data\n[ INF ] Reset private validator file to genesis state keyFile=/home/user/.metaos/config/priv_validator_key.json stateFile=/home/user/.metaos/data/priv_validator_state.json\n")])])]),t("blockquote",[t("h4",{attrs:{id:"check-the-adressbook"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#check-the-adressbook"}},[e._v("#")]),e._v(" Check the adressbook")]),e._v(" "),t("p",[t("strong",[e._v("Tip")]),e._v(":\nAfter resetting, make sure the addressbook contains peer addresses and is in the correct spot.\nIf not, "),t("RouterLink",{attrs:{to:"/en/for_validator/run_node/join-a-network.html#1-select-a-network"}},[e._v("download an adressbook")]),e._v(" and place it in "),t("code",[e._v("~/.metaos/config/")]),e._v(".")],1)]),e._v(" "),t("h3",{attrs:{id:"change-genesis"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#change-genesis"}},[e._v("#")]),e._v(" Change Genesis")]),e._v(" "),t("p",[e._v("To change the genesis version, delete "),t("code",[e._v("~/.metaos/config/genesis.json")]),e._v(".")]),e._v(" "),t("p",[e._v("You can recreate a genesis version via the following steps:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v(" metaosd add-genesis-account "),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),e._v("metaosd keys show "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("account-name"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" -a"),t("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" 100000000umtos,1000usd\n metaosd gentx "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("account-name"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" 10000000umtos --chain-id"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("network-name"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("\n metaosd collect-gentxs\n")])])]),t("h3",{attrs:{id:"reset-personal-data"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reset-personal-data"}},[e._v("#")]),e._v(" Reset personal data")]),e._v(" "),t("blockquote",[t("p",[t("strong",[e._v("Danger")]),e._v(":")]),e._v(" "),t("p",[e._v("You may be unable to use your node and its associated accounts after changing your personal data.\nDo not perform this action unless your node is disposable.")])]),e._v(" "),t("p",[e._v("To change your personal data to a pristine state, delete both "),t("code",[e._v("~/.metaos/config/priv_validator_state.json")]),e._v(" and "),t("code",[e._v("~/.metaos/config/node_key.json")]),e._v(".")]),e._v(" "),t("h3",{attrs:{id:"node-health"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node-health"}},[e._v("#")]),e._v(" Node health")]),e._v(" "),t("p",[e._v("A healthy node will have the following files in place and populated:")]),e._v(" "),t("ul",[t("li",[e._v("Addressbook "),t("code",[e._v("~/.metaos/config/addrbook.json")])]),e._v(" "),t("li",[e._v("Genesis file "),t("code",[e._v("~/.metaos/config/genesis.json")])]),e._v(" "),t("li",[e._v("Validator state "),t("code",[e._v("~/.metaos/config/priv_validator_state.json")])]),e._v(" "),t("li",[e._v("Node key "),t("code",[e._v("~/.metaos/config/node_key.json")])])]),e._v(" "),t("h3",{attrs:{id:"re-sync"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#re-sync"}},[e._v("#")]),e._v(" Re-sync")]),e._v(" "),t("p",[e._v("You can proceed to "),t("RouterLink",{attrs:{to:"/en/for_validator/run_node/sync.html#sync-from-genesis"}},[e._v("re-sync manually")]),e._v(" or "),t("RouterLink",{attrs:{to:"/en/for_validator/run_node/sync.html#quicksync"}},[e._v("using a snapshot")]),e._v(".")],1)])}),[],!1,null,null,null);a.default=o.exports}}]);