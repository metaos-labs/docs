module.exports = (_ctx) => ({
  sourceDir: 'docs',
  dest: 'docs/dist',
  port: 9090,
  base: '/docs/',
  configureWebpack: {
    resolve: {
      alias: {
        '@static': 'docs/static',
      },
    },
  },

  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'MetaOS Docs',
      description: 'Developer documentation for the MetaOS',
    },
    // '/zh/': {
    //   lang: 'zh-CN',
    //   title: 'MetaOS 文档',
    //   description: 'MetaOS 开发者文档',
    // },
  },

  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#732ad2' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#732ad2',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],

  theme: '@vuepress/theme-default',

  themeConfig: {
    repo: 'metaos-labs/docs',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    logo: '/favicon.ico',
    smoothScroll: true,
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
    },
    locales: {
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
      },
      // '/zh/': {
      //   selectText: '选择语言',
      //   label: '简体中文',
      //   editLinkText: '在 GitHub 上编辑此页',
      //   serviceWorker: {
      //     updatePopup: {
      //       message: '发现新内容可用.',
      //       buttonText: '刷新',
      //     },
      //   },
      // },
    },
    sidebar: {
      '/en/': getGuideSidebar(
        'ABOUT MetaOS',
        'For Web3 User',
        'For Web3 Developer',
        'For Validator&Delegators'
      ),
      // '/zh/': getGuideSidebar('介绍', '测试1', '测试2', '测试3'),
    },
  },

  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ['@vuepress/medium-zoom', true],
    [
      'container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
      },
    ],
    [
      'container',
      {
        type: 'upgrade',
        before: (info) => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
      },
    ],
    [
      'vuepress-plugin-redirect',
      {
        redirectors: [
          {
            base: '/',
            alternative: '/en/',
          },
        ],
      },
    ],
  ],

  // extraWatchFiles: ['.vuepress/nav/en.js', '.vuepress/nav/zh.js'],
});

function getGuideSidebar(guide, user, dev, validator) {
  return [
    {
      title: guide,
      collapsable: false,
      children: [''],
    },
    {
      title: user,
      collapsable: false,
      children: [
        {
          title: 'Basic Concepts',
          collapsable: true,
          children: [
            'for_web3_user/transactions.md',
            'for_web3_user/tokens.md',
            'for_web3_user/gas-and-fees.md',
          ],
        },
        {
          title: 'Digital Wallets',
          collapsable: true,
          children: [
            'for_web3_user/metamask.md',
            'for_web3_user/metaos-wallet.md',
          ],
        },
        {
          title: 'Account Keys',
          collapsable: true,
          children: ['for_web3_user/keyring.md', 'for_web3_user/multisig.md'],
        },
        {
          title: 'Links',
          collapsable: true,
          children: ['for_web3_user/wormhole.md', 'for_web3_user/swap.md'],
        },
      ],
    },
    {
      title: dev,
      collapsable: false,
      children: [
          'for_web3_dev/quick_connect.md',
        'for_web3_dev/guides.md',
          'for_web3_dev/metaos_client.md',
        'for_web3_dev/localnet.md',
        {
          title: 'Ethereum Tooling',
          collapsable: true,
          children: ['for_web3_dev/remix.md', 'for_web3_dev/hardhat.md', 'for_web3_dev/truffle.md'],
        },
        {
          title: 'Ethereum JSON-RPC',
          collapsable: true,
          children: ['for_web3_dev/json_server.md', 'for_web3_dev/running_server.md', 'for_web3_dev/namespace.md',
            'for_web3_dev/jsonrpc_method.md', 'for_web3_dev/event.md'],
        },
        "for_web3_dev/wasm.md",
        "for_web3_dev/cosmos_grpc.md",
        "for_web3_dev/tendermint_rpc.md",
        {
          title: 'Modules',
          collapsable: true,
          children: ['for_web3_dev/modules/inflation.md', 'for_web3_dev/modules/pool-incentives.md',
            'for_web3_dev/modules/delayed.md', 'for_web3_dev/modules/nft.md'],
        },
      ],
    },
    {
      title: validator,
      collapsable: false,
      children: [
          "for_validator/overview.md",
          {
            title: 'Installation & Quick Start',
            collapsable: true,
            children: ["for_validator/installation.md", "for_validator/run_node.md",
              "for_validator/run_validator.md", "for_validator/disk_usage.md", "for_validator/snapshot.md"],
          },
          "for_validator/validator_guide.md",
          "for_validator/faq.md",
      ],
    },
  ];
}

// function getGuideSidebar(guide, api, bestPractices, mobile, resources) {
//   return [
//     {
//       title: guide,
//       collapsable: false,
//       children: [
//         '',
//         'getting-started',
//         'common-terms',
//         'initializing-dapps',
//         'accessing-accounts',
//         'sending-transactions',
//       ],
//     },
//     {
//       title: api,
//       collapsable: false,
//       children: [
//         'ethereum-provider',
//         'provider-migration',
//         'rpc-api',
//         'signing-data',
//       ],
//     },
//     {
//       title: bestPractices,
//       collapsable: false,
//       children: [
//         'registering-function-names',
//         'registering-your-token',
//         'defining-your-icon',
//         'onboarding-library',
//         'metamask-extension-provider',
//       ],
//     },
//     {
//       title: mobile,
//       collapsable: false,
//       children: [
//         'mobile-getting-started',
//         'site-compatibility-checklist',
//         'mobile-best-practices',
//       ],
//     },
//     {
//       title: resources,
//       collapsable: false,
//       children: ['create-dapp', 'contributors'],
//     },
//   ];
// }
