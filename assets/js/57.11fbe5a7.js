(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{472:function(t,e,a){"use strict";a.r(e);var o=a(35),r=Object(o.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"metamask"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#metamask"}},[t._v("#")]),t._v(" MetaMask")]),t._v(" "),a("p",[t._v("The "),a("a",{attrs:{href:"https://metamask.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("MetaMask"),a("OutboundLink")],1),t._v(" browser extension is a wallet for accessing Ethereum-enabled applications and managing user identities. It can be used to connect to MetaOS through the official testnet or via a locally-running MetaOS node.")]),t._v(" "),a("p",[t._v("If you are planning on developing on MetaOS locally and you haven’t already set up your own local node, refer to the "),a("RouterLink",{attrs:{to:"/en/for_validator/installation.html"}},[t._v("quickstart tutorial")]),t._v(", or follow the instructions in the GitHub "),a("a",{attrs:{href:"https://github.com/metaos-labs/metaos.git",target:"_blank",rel:"noopener noreferrer"}},[t._v("repository"),a("OutboundLink")],1),t._v(".")],1),t._v(" "),a("h3",{attrs:{id:"adding-a-new-network"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-new-network"}},[t._v("#")]),t._v(" Adding a New Network")]),t._v(" "),a("p",[t._v("Open the MetaMask extension on your browser, you may have to log in to your MetaMask account if you are not already. Then click the top right circle and go to "),a("code",[t._v("Settings")]),t._v(" > "),a("code",[t._v("Networks")]),t._v(" > "),a("code",[t._v("Add Network")]),t._v(" and fill the form as shown below.")]),t._v(" "),a("p",[t._v("You can also lookup the "),a("a",{attrs:{href:"https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("EIP155"),a("OutboundLink")],1),t._v(" Chain ID by referring to "),a("a",{attrs:{href:"https://chainlist.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("chainlist.org"),a("OutboundLink")],1),t._v(". Alternatively, to get the full Chain ID from Genesis, check the Chain ID documentation page.")]),t._v(" "),a("p",[a("img",{attrs:{src:"/docs/static/metamask.png",alt:"metamask"}})]),t._v(" "),a("h3",{attrs:{id:"import-account-to-metamask"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#import-account-to-metamask"}},[t._v("#")]),t._v(" Import Account to Metamask")]),t._v(" "),a("p",[t._v("Close the "),a("code",[t._v("Settings")]),t._v(", go to "),a("code",[t._v("My Accounts")]),t._v(" (top right circle) and select "),a("code",[t._v("Import Account")]),t._v(". You should see an image like the following one:")]),t._v(" "),a("p",[a("img",{attrs:{src:"/docs/static/importacc.png",alt:"metamask"}}),t._v("\nNow you can export your private key from the terminal using the following command. Again, make sure to replace "),a("code",[t._v("mykey")]),t._v(" with the name of the key that you want to export and use the correct keyring-backend:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("metaosd keys unsafe-export-eth-key mykey\n")])])]),a("p",[t._v("Go back to the browser and select the "),a("code",[t._v("Private Key")]),t._v(" option. Then paste the private key exported from the "),a("code",[t._v("unsafe-export-eth-key")]),t._v(" command.")]),t._v(" "),a("h3",{attrs:{id:"reset-account"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reset-account"}},[t._v("#")]),t._v(" Reset Account")]),t._v(" "),a("p",[t._v("If you used your Metamask account for a legacy testnet/mainnet upgrade, you will need to reset your account in order to use it with the new network. This will clear your account's transaction history, but it won't change the balances in your accounts or require you to re-enter your "),a("code",[t._v("Secret Recovery Phrase")]),t._v(".\nGo to "),a("code",[t._v("Settings")]),t._v(" > "),a("code",[t._v("Advanced")]),t._v(" and click the "),a("code",[t._v("Reset Account")]),t._v(" button.")]),t._v(" "),a("h3",{attrs:{id:"download-account-state"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#download-account-state"}},[t._v("#")]),t._v(" Download Account State")]),t._v(" "),a("p",[t._v("To see your Metamask logs, click the top right circle and go to "),a("code",[t._v("Settings")]),t._v(" > "),a("code",[t._v("Advanced")]),t._v(" > "),a("code",[t._v("State Logs")]),t._v(". If you search through the JSON file for the account address you'll find the transaction history.")])])}),[],!1,null,null,null);e.default=r.exports}}]);