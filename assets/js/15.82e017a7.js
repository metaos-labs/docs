(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{430:function(e,t,a){"use strict";a.r(t);var s=a(35),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"configure-general-settings"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-general-settings"}},[e._v("#")]),e._v(" Configure general settings")]),e._v(" "),a("p",[e._v("The following information describes the most important node configuration settings found in the "),a("code",[e._v("~/.metaos/config/")]),e._v(" directory.\nIt is recommended that you update these settings with your own information.")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("Structure of .metaos/config")])]),e._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("~/.metaos/config\n│-- addrbook.json                       # a registry of peers to connect to\n│-- app.toml                            # metaosd configuration file\n│-- client.toml                         # configurations for the cli wallet (ex metaoscli)\n│-- config.toml                         # Tendermint configuration  file\n│-- genesis.json                        # genesis transactions\n│-- node_key.json                       # private key used for node authentication in the p2p protocol (its corresponding public key is the nodeid)\n└-- priv_validator_key.json             # key used by the validator on the node to sign blocks\n")])])])]),e._v(" "),a("h2",{attrs:{id:"initialize-and-configure-moniker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#initialize-and-configure-moniker"}},[e._v("#")]),e._v(" Initialize and configure moniker")]),e._v(" "),a("p",[e._v("Initialize the node with a human-readable name:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("metaosd init "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("your_custom_moniker"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# ex., metaosd init validator-alice-node")]),e._v("\n")])])]),a("blockquote",[a("h4",{attrs:{id:"moniker-characters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#moniker-characters"}},[e._v("#")]),e._v(" Moniker characters")]),e._v(" "),a("p",[a("strong",[e._v("Caution")])]),e._v(" "),a("p",[e._v("Monikers can only contain ASCII characters; using Unicode characters will render your node unreachable by other peers in the network.")])]),e._v(" "),a("p",[e._v("You can update your node's moniker by editing the "),a("code",[e._v("moniker")]),e._v(" field in "),a("code",[e._v("~/.metaos/config/config.toml")])]),e._v(" "),a("h2",{attrs:{id:"update-minimum-gas-prices"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#update-minimum-gas-prices"}},[e._v("#")]),e._v(" Update minimum gas prices")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Open "),a("code",[e._v("~/.metaos/config/app.toml")]),e._v(".")])]),e._v(" "),a("li",[a("p",[e._v("Modify "),a("code",[e._v("minimum-gas-prices")]),e._v(" and set the minimum price of gas a validator will accept to validate a transaction and to prevent spam.")])])]),e._v(" "),a("p",[e._v("Recommended setting is:\n"),a("code",[e._v('minimum-gas-prices = "100000000000umtos"')])]),e._v(" "),a("p",[a("strong",[e._v("Example")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language-toml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-toml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The minimum gas prices a validator is willing to accept for processing a")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# transaction. A transaction's fees must meet the minimum of any denomination")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# specified in this config (e.g. 0.25token1;0.0001token2).")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[e._v("minimum-gas-prices")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"100000000000umtos"')]),e._v("\n")])])]),a("h2",{attrs:{id:"start-the-light-client-daemon-lcd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#start-the-light-client-daemon-lcd"}},[e._v("#")]),e._v(" Start the light client daemon (LCD)")]),e._v(" "),a("p",[e._v("For information about the available MetaOS REST API endpoints, see the "),a("a",{attrs:{href:"https://node.metaos.im/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Swagger documentation"),a("OutboundLink")],1),e._v(".\nTo enable the REST API and Swagger, and to start the LCD, complete the following steps:")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Open "),a("code",[e._v("~/.metaos/config/app.toml")]),e._v(".")])]),e._v(" "),a("li",[a("p",[e._v("Locate the "),a("code",[e._v("API Configuration")]),e._v(" section ("),a("code",[e._v("[api]")]),e._v(").")])]),e._v(" "),a("li",[a("p",[e._v("Change "),a("code",[e._v("enable = false")]),e._v(" to "),a("code",[e._v("enable = true")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language-toml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-toml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Enable defines if the API server should be enabled.")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[e._v("enable")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("\n")])])])]),e._v(" "),a("li",[a("p",[e._v("Optional: Swagger defines if swagger documentation should automatically be registered.\nTo enable Swagger, change "),a("code",[e._v("swagger = false")]),e._v(" to "),a("code",[e._v("swagger = true")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language-toml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-toml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key property"}},[e._v("swagger")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("\n")])])])]),e._v(" "),a("li",[a("p",[e._v("Restart the service via "),a("code",[e._v("systemctl restart metaosd")]),e._v(".\nOnce restarted, the LCD will be available (by default on port "),a("code",[e._v("127.0.0.1:1317")]),e._v(", if you want to change LCD address, just change "),a("code",[e._v("address = <new addresss>")]),e._v(".)")])])]),e._v(" "),a("h2",{attrs:{id:"set-up-external-address-in-config-toml"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set-up-external-address-in-config-toml"}},[e._v("#")]),e._v(" Set up "),a("code",[e._v("external_address")]),e._v(" in "),a("code",[e._v("config.toml")])]),e._v(" "),a("p",[e._v("In order to be added to the address book in seed nodes, you need to configure "),a("code",[e._v("external_address")]),e._v(" in "),a("code",[e._v("config.toml")]),e._v(".\nThis addition will prevent continuous reconnections. The default P2P_PORT is "),a("code",[e._v("26656")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sed")]),e._v(" -i -e "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('\'s/external_address = \\"\\"/external_address = \\"\'')]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" httpbin.org/ip "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" jq -r .origin"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("':26656\\\"/g'")]),e._v(" ~/.metaos/config/config.toml\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);