(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{428:function(t,e,a){"use strict";a.r(e);var o=a(35),r=Object(o.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("h3",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),a("p",[t._v("The tasks in this section describe how to set up a MetaOS validator.\nWhile setting up a rudimentary validating node is easy, running a production-quality validator node with a robust architecture and security features requires an extensive setup.")]),t._v(" "),a("p",[t._v("The MetaOS core is powered by the Tendermint consensus.\nValidators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain.\nValidators can cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake.\nThe top 21 validators make up the "),a("strong",[t._v("Active Validator Set")]),t._v(" and are the only validators that sign blocks and receive revenue.")]),t._v(" "),a("p",[t._v("Validators and their delegators earn the following rewards:")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("Gas")]),t._v(": Fees added on to each transaction to avoid spamming and pay for computing power. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold.")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("Other rewards?")]),t._v(": wait for supplying...")])])]),t._v(" "),a("p",[t._v("Validators can set commissions on the fees they receive as an additional incentive.")]),t._v(" "),a("p",[t._v("If validators double sign, are frequently offline, or do not participate in governance, their staked MTOS (including MTOS of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.")]),t._v(" "),a("h3",{attrs:{id:"system-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#system-configuration"}},[t._v("#")]),t._v(" System Configuration")]),t._v(" "),a("blockquote",[a("h4",{attrs:{id:"recommended-operating-systems"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#recommended-operating-systems"}},[t._v("#")]),t._v(" Recommended operating systems")]),t._v(" "),a("p",[t._v("Caution:This guide has been tested against Linux distributions only.\nTo ensure a successful production environment setup, consider using a Linux system.")])]),t._v(" "),a("p",[t._v("Running a full MetaOS node is a resource-intensive process that requires a persistent server.")]),t._v(" "),a("p",[t._v("If you want to use MetaOS without downloading the entire blockchain, use "),a("a",{attrs:{href:"https://wallet.metaos.im/",target:"_blank",rel:"noopener noreferrer"}},[t._v("MetaOS Wallet"),a("OutboundLink")],1),t._v(".\nIf you want to set up a local, WASM-enabled, private testnet for smart contracts, visit "),a("RouterLink",{attrs:{to:"/develop/localmetaos/"}},[t._v("install LocalMetaOS")]),t._v(".")],1),t._v(" "),a("h4",{attrs:{id:"hardware-requirements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hardware-requirements"}},[t._v("#")]),t._v(" Hardware Requirements")]),t._v(" "),a("p",[t._v("The minimum requirements for running a MetaOS full node are:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Network")]),t._v(" "),a("th",[t._v("CPU cores")]),t._v(" "),a("th",[t._v("RAM")]),t._v(" "),a("th",[t._v("Disk")]),t._v(" "),a("th",[t._v("BANDWIDTH")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("RouterLink",{attrs:{to:"/en/for_validator/join-a-network.html#join-a-public-network"}},[a("code",[t._v("main-1")])])],1),t._v(" "),a("td",[t._v("4 (+4 threads)")]),t._v(" "),a("td",[t._v("32 GB")]),t._v(" "),a("td",[t._v("2 TB (SSD 2000 MB/s R/W)")]),t._v(" "),a("td",[t._v("300 Mbps")])]),t._v(" "),a("tr",[a("td",[a("RouterLink",{attrs:{to:"/en/for_validator/join-a-network.html#join-a-public-network"}},[a("code",[t._v("test-1")])])],1),t._v(" "),a("td",[t._v("2 (+2 threads)")]),t._v(" "),a("td",[t._v("16 GB")]),t._v(" "),a("td",[t._v("500 GB (SSD 1000 MB/s R/W)")]),t._v(" "),a("td",[t._v("150 Mbps")])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:""}},[a("code",[t._v("localmetaos")])])]),t._v(" "),a("td",[t._v("2")]),t._v(" "),a("td",[t._v("4 GB")]),t._v(" "),a("td",[t._v("20 GB (SSD 500 MB/s R/W)")]),t._v(" "),a("td",[t._v("N/A")])]),t._v(" "),a("tr",[a("td",[a("RouterLink",{attrs:{to:"/en/for_validator/join-a-network.html#set-up-a-local-private-network"}},[a("code",[t._v("private-network")])])],1),t._v(" "),a("td",[t._v("1")]),t._v(" "),a("td",[t._v("2 GB")]),t._v(" "),a("td",[t._v("20 GB (SSD 500 MB/s R/W)")]),t._v(" "),a("td",[t._v("N/A")])])])]),t._v(" "),a("blockquote",[a("h4",{attrs:{id:"storage-requirements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#storage-requirements"}},[t._v("#")]),t._v(" Storage requirements")]),t._v(" "),a("p",[t._v("Warning:\nAs the network grows, the minimum hardware requirements will also grow.\nIt is recommended that you monitor the system, so you can prevent it from running out of resources.")])]),t._v(" "),a("h4",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),a("ul",[a("li",[a("p",[a("a",{attrs:{href:"https://go.dev/dl/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Golang v1.18+ linux/amd64"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("h4",{attrs:{id:"installing-go-for-macos-linux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installing-go-for-macos-linux"}},[t._v("#")]),t._v(" Installing Go for MacOS & Linux")]),t._v(" "),a("p",[t._v("Go releases can be found here: "),a("a",{attrs:{href:"https://go.dev/dl/",target:"_blank",rel:"noopener noreferrer"}},[t._v(" https://go.dev/dl/ "),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("In your browser, you can right-click the correct release (V1.18) and "),a("code",[t._v("Copy link")]),t._v(".")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 1. Download the archive")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" https://go.dev/dl/go1.18.2.linux-amd64.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Optional: remove previous /go files:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" -rf /usr/local/go\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 2. Unpack:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 3. Add the path to the go-binary to your system path:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# (for this to persist, add this line to your ~/.profile or ~/.bashrc or  ~/.zshrc)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("PATH")])]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PATH")]),t._v(":/usr/local/go/bin\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 4. Verify your installation:")]),t._v("\ngo version\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# go version go1.18.2 linux/amd64")]),t._v("\n")])])])])]),t._v(" "),a("li",[a("p",[t._v("Linux users: "),a("code",[t._v("sudo apt-get install -y build-essential")])])])]),t._v(" "),a("h3",{attrs:{id:"commonly-used-ports"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commonly-used-ports"}},[t._v("#")]),t._v(" Commonly used ports")]),t._v(" "),a("p",[a("code",[t._v("metaosd")]),t._v(" uses the following TCP ports. Toggle their settings to match your environment.")]),t._v(" "),a("p",[t._v("Most validators will only need to open the following port:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("26656")]),t._v(": The default port for the P2P protocol. This port is used to communicate with other nodes and must be open to join a network. However, it does not have to be open to the public. For validator nodes, "),a("RouterLink",{attrs:{to:"/en/for_validator/run_node/additional-settings.html#persistent_peers"}},[t._v("configuring "),a("code",[t._v("persistent_peers")])]),t._v(" and closing this port to the public are recommended.")],1)]),t._v(" "),a("p",[t._v("Additional ports:")]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("26660")]),t._v(": The default port for interacting with the "),a("a",{attrs:{href:"https://prometheus.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("Prometheus"),a("OutboundLink")],1),t._v(" database, which can be used to monitor the environment. In the default configuration, this port is not open.")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("26657")]),t._v(": The default port for the RPC protocol. Because this port is used for querying and sending transactions, it must be open for serving queries from "),a("code",[t._v("metaosd")]),t._v(".")])])]),t._v(" "),a("blockquote",[a("h4",{attrs:{id:"warning"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#warning"}},[t._v("#")]),t._v(" Warning:")]),t._v(" "),a("p",[t._v("Do not open port "),a("code",[t._v("26657")]),t._v(" to the public unless you plan to run a public node.")])])])}),[],!1,null,null,null);e.default=r.exports}}]);