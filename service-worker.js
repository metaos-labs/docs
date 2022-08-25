/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "dd269f39fa76416dfcf2ef2a95cb16e6"
  },
  {
    "url": "assets/css/0.styles.9f4aaddc.css",
    "revision": "f893f5be58e487f6c8ee21cd319f183c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.8cef8d6b.js",
    "revision": "18fe65944f24a7d67d1c1cf2088bd186"
  },
  {
    "url": "assets/js/11.25fd7d6f.js",
    "revision": "060d9c1351e433868b8070706f8f27de"
  },
  {
    "url": "assets/js/12.98bd9ccc.js",
    "revision": "74d06fcf9089ddde6acbde6e59fb80ae"
  },
  {
    "url": "assets/js/13.58bea21f.js",
    "revision": "56cab14d20399de44aab43d9b70882a7"
  },
  {
    "url": "assets/js/14.4e1bc660.js",
    "revision": "6b82c91fb193c03458866f606fee108d"
  },
  {
    "url": "assets/js/15.82e017a7.js",
    "revision": "0e3e5f843bc0bbe6dbfc87ca486e8bf0"
  },
  {
    "url": "assets/js/16.ede99731.js",
    "revision": "07a354e37a7167be7846fe82b6d7ce0c"
  },
  {
    "url": "assets/js/17.8af013a8.js",
    "revision": "636ffc10fec03c3619025b2a7a7d7a66"
  },
  {
    "url": "assets/js/18.f655b7f9.js",
    "revision": "38ab2916d4709e8fbb098d8acb541058"
  },
  {
    "url": "assets/js/19.36be0543.js",
    "revision": "3fc2f83e3d516019d0b6f719d6bbfc73"
  },
  {
    "url": "assets/js/20.39823d63.js",
    "revision": "f2f1e49de9d5e1cc356ceaab0fd56bdf"
  },
  {
    "url": "assets/js/21.6d92df81.js",
    "revision": "f015e30c5ee1fdc3554954df570992c0"
  },
  {
    "url": "assets/js/22.ec9760e0.js",
    "revision": "1625f377769c17d8ecba81c380673670"
  },
  {
    "url": "assets/js/23.2a691bc4.js",
    "revision": "7a0fd21d412e90e8f04e049e4bc775f5"
  },
  {
    "url": "assets/js/24.c03671b9.js",
    "revision": "c2eacd21785d8d8c5fd5a52051b31414"
  },
  {
    "url": "assets/js/25.0fbb5496.js",
    "revision": "6cac36fa749e869455c3b2838a976d98"
  },
  {
    "url": "assets/js/26.c3a4e4b7.js",
    "revision": "ecefec68b2c36ba8d14b10d810d34ae8"
  },
  {
    "url": "assets/js/27.a332de22.js",
    "revision": "726b6ee0f2969236538278df3e45c22f"
  },
  {
    "url": "assets/js/28.40f2ab04.js",
    "revision": "39f541f42710e5361d4679de8a274a02"
  },
  {
    "url": "assets/js/29.8deefc30.js",
    "revision": "4b99ed3cb7d57e5cc9d5fdee7273cdd7"
  },
  {
    "url": "assets/js/3.ef547447.js",
    "revision": "17d2cbe57b4e59ad0e7b3ed3957be0c2"
  },
  {
    "url": "assets/js/30.a5d7b07c.js",
    "revision": "105813ed495843f3a66516f81799ba96"
  },
  {
    "url": "assets/js/31.be2aff5c.js",
    "revision": "0c0f6726cc75041c22024f7b09e9c9c5"
  },
  {
    "url": "assets/js/32.b22e5d65.js",
    "revision": "ba06efb73e8a5a25f539dc2c999f046d"
  },
  {
    "url": "assets/js/33.09c60894.js",
    "revision": "35e977c6dcd55a9fe47ac4f7507b67d4"
  },
  {
    "url": "assets/js/34.11971111.js",
    "revision": "ac75a562f8d13036595c62f104b9e256"
  },
  {
    "url": "assets/js/35.3add035c.js",
    "revision": "24c98efc74003e684f2a8ff31fecd29e"
  },
  {
    "url": "assets/js/36.90ed3117.js",
    "revision": "49a6ebc7a1b2a6d6369d6b68e7c42980"
  },
  {
    "url": "assets/js/37.934d3e5d.js",
    "revision": "0e8aa61ee6f9adaa30d19d2d2bd00ec4"
  },
  {
    "url": "assets/js/38.f8309a82.js",
    "revision": "c3ae64ae4004a25680cad714a6ee2945"
  },
  {
    "url": "assets/js/39.f556ae9c.js",
    "revision": "06012b611d82d3d0f4b7387ba7021d69"
  },
  {
    "url": "assets/js/4.543fae8f.js",
    "revision": "8dd75aaffb26c7dd999ad9ad03728f75"
  },
  {
    "url": "assets/js/40.e8d55a27.js",
    "revision": "40a362f68d23d61d59454784febc3394"
  },
  {
    "url": "assets/js/41.c14af8b9.js",
    "revision": "c336fd3fd1aeddd26a573d002554a971"
  },
  {
    "url": "assets/js/42.b9e694f9.js",
    "revision": "9eec2322fed7fc9ad1361c1716e76cb6"
  },
  {
    "url": "assets/js/43.155a141a.js",
    "revision": "6829cde1ceb0a47bb173c070ef0501dc"
  },
  {
    "url": "assets/js/44.f2f2495e.js",
    "revision": "2248c0583647177f297c90ef2898fb68"
  },
  {
    "url": "assets/js/45.57bcb2d7.js",
    "revision": "fafba368cb0cf401b717f6e77789dae0"
  },
  {
    "url": "assets/js/46.6a4b9ff9.js",
    "revision": "a731690d7509b5f136476bcf1546fee9"
  },
  {
    "url": "assets/js/47.948f2a3c.js",
    "revision": "e35403e985b40d2b1b3117b482f03e2c"
  },
  {
    "url": "assets/js/48.1daa61af.js",
    "revision": "10cd2af5dee6e652d75c205a13e4f439"
  },
  {
    "url": "assets/js/49.51fd92db.js",
    "revision": "2e8936dd2e93aa61d72696e7c3856b04"
  },
  {
    "url": "assets/js/5.09ebcc9e.js",
    "revision": "64efb8561e86cc592ab865a89ad72b73"
  },
  {
    "url": "assets/js/50.4f295683.js",
    "revision": "175bbdcd038cfe5122dfb220a0aa9909"
  },
  {
    "url": "assets/js/51.c93adaab.js",
    "revision": "978472137d1e56c6d4fd79635bad53fb"
  },
  {
    "url": "assets/js/52.db172170.js",
    "revision": "0fbe0501c94d83ecc928e3ff7846f550"
  },
  {
    "url": "assets/js/53.af9d8f71.js",
    "revision": "4b2d1649f45a3c768bd4561578e254c0"
  },
  {
    "url": "assets/js/54.8031e252.js",
    "revision": "010ec13a36a82771a77d6d14a17ff75e"
  },
  {
    "url": "assets/js/55.4f6638fc.js",
    "revision": "201f3e8d19d5231497e2f8166b39d4fd"
  },
  {
    "url": "assets/js/56.a2a8d319.js",
    "revision": "a1b087be973d897515f50bff06b99b95"
  },
  {
    "url": "assets/js/57.11fbe5a7.js",
    "revision": "be36a67527592b2d9c6011f5cfb86593"
  },
  {
    "url": "assets/js/58.dee4adc2.js",
    "revision": "847d75b5d64ae6a1848033c682d7a50a"
  },
  {
    "url": "assets/js/59.4cf30fc5.js",
    "revision": "4650bf3677a60d6e41aa4eba5d9e293a"
  },
  {
    "url": "assets/js/6.53bd7877.js",
    "revision": "33aa7f6004ef5306c71059d679de84fd"
  },
  {
    "url": "assets/js/60.947e933e.js",
    "revision": "9e7e11235d99a46052057d25ef612f35"
  },
  {
    "url": "assets/js/61.04f50cec.js",
    "revision": "0798833c11788276dca8947b8184fffd"
  },
  {
    "url": "assets/js/62.b4a2133e.js",
    "revision": "9f71f2149a50bb25c744883fb1c082c9"
  },
  {
    "url": "assets/js/63.84b58c65.js",
    "revision": "74daa9277ffce23d3e4d429ec07fc131"
  },
  {
    "url": "assets/js/64.f82cfbce.js",
    "revision": "50693c2e26bd67854a5449cd7856106c"
  },
  {
    "url": "assets/js/65.7d0a9885.js",
    "revision": "d7c1eb57dfae57947fe64440cbe43bda"
  },
  {
    "url": "assets/js/7.d74dec53.js",
    "revision": "8ad92df139bf749cecfeac8d8d6398e3"
  },
  {
    "url": "assets/js/8.f3c5c757.js",
    "revision": "788a4b774a95fbef6197bd61188b19fa"
  },
  {
    "url": "assets/js/9.1361b49a.js",
    "revision": "ee775446f909883a8d9eb9a2a17a90a4"
  },
  {
    "url": "assets/js/app.8eec186a.js",
    "revision": "9ffff3d8b4e6c1f15d1d6aa9c3e4d011"
  },
  {
    "url": "assets/js/vendors~docsearch.f68603d6.js",
    "revision": "f93d971a77666c4478303a4c74930957"
  },
  {
    "url": "en/for_validator/disk_usage.html",
    "revision": "99af6c7e153a189c94f1789c92b6f91e"
  },
  {
    "url": "en/for_validator/faq.html",
    "revision": "205d0818c30266ca1a6427787ae0ac13"
  },
  {
    "url": "en/for_validator/metaosd.html",
    "revision": "d4bc4ed6449516708089a77418bacfe5"
  },
  {
    "url": "en/for_validator/overview.html",
    "revision": "74e4c9c0c7057b4f44f5323a1a4cd3eb"
  },
  {
    "url": "en/for_validator/run_node/additional-settings.html",
    "revision": "aae6a0b7f7dd2081f90e6a5ac61b763a"
  },
  {
    "url": "en/for_validator/run_node/configure-general-settings.html",
    "revision": "9947969beebd336bdd00d86f0ebc4e9c"
  },
  {
    "url": "en/for_validator/run_node/contents.html",
    "revision": "ae6931b3a3b05d1a03ac67f0917168e3"
  },
  {
    "url": "en/for_validator/run_node/export-state.html",
    "revision": "d4d0a0f22a850970d23cc3b4de4cdab9"
  },
  {
    "url": "en/for_validator/run_node/installation.html",
    "revision": "a0d9f74211fd4d90c5e548f499a2e3fc"
  },
  {
    "url": "en/for_validator/run_node/join-a-network.html",
    "revision": "37571ad8a1afb90b55ac4da9df75c822"
  },
  {
    "url": "en/for_validator/run_node/reset.html",
    "revision": "230d87858f50fe92078482073c192ae2"
  },
  {
    "url": "en/for_validator/run_node/set-up-production.html",
    "revision": "9811923c1f8b8d5fedbc587191f43b47"
  },
  {
    "url": "en/for_validator/run_node/sync.html",
    "revision": "18ab5d539e51f1d0aec37ecc0d930371"
  },
  {
    "url": "en/for_validator/run_node/updates.html",
    "revision": "01af32b60addb7697d8f366dc6bb5dcc"
  },
  {
    "url": "en/for_validator/run_validator/contents.html",
    "revision": "f93b7f66541a6333a23acbc43d9b3c23"
  },
  {
    "url": "en/for_validator/run_validator/delegate-to-a-validator.html",
    "revision": "c848ce5813387e790a0cf79be33119d2"
  },
  {
    "url": "en/for_validator/run_validator/register-a-validator.html",
    "revision": "35e3a9808605e69dead9d491738dca85"
  },
  {
    "url": "en/for_validator/run_validator/remote-signer.html",
    "revision": "036a3eefee1645b01c0cc7dc2cf0d4d9"
  },
  {
    "url": "en/for_validator/run_validator/restore-a-validator.html",
    "revision": "48ae13bb9b8324b96e0ec5890befaa3d"
  },
  {
    "url": "en/for_validator/run_validator/security-practices.html",
    "revision": "175462411a4265475b6e0e1ed25aa565"
  },
  {
    "url": "en/for_validator/run_validator/sentry-node-architecture.html",
    "revision": "0caf65b5e931df4527d2caf349f4c4f0"
  },
  {
    "url": "en/for_validator/run_validator/validator-states.html",
    "revision": "11d08d5e99ccffb859131a8ad5607483"
  },
  {
    "url": "en/for_validator/snapshot.html",
    "revision": "0c174f1f545eb11026b35453784b8a0f"
  },
  {
    "url": "en/for_web3_dev/cosmos_grpc.html",
    "revision": "3ed3cf5298f7f9f5236a20414409b000"
  },
  {
    "url": "en/for_web3_dev/event.html",
    "revision": "840245db0cdc40c46d44bc9c3b6639f8"
  },
  {
    "url": "en/for_web3_dev/guides.html",
    "revision": "c0a658c9a5e3cb31ea5740f0c607d8b9"
  },
  {
    "url": "en/for_web3_dev/hardhat.html",
    "revision": "99e68ba28afa99eec4b7eefe30c83622"
  },
  {
    "url": "en/for_web3_dev/json_server.html",
    "revision": "7470cfea1745d376d7b799dc92941359"
  },
  {
    "url": "en/for_web3_dev/jsonrpc_method.html",
    "revision": "82a8dec8b70757f7d557f40f75dc9551"
  },
  {
    "url": "en/for_web3_dev/localnet.html",
    "revision": "f0d597e8368035a0d8a77719b64d8b2f"
  },
  {
    "url": "en/for_web3_dev/metaos_client.html",
    "revision": "2208290e3e309b98c34ea6f3023dbee2"
  },
  {
    "url": "en/for_web3_dev/modules/delayed.html",
    "revision": "02b1c13673277a9c9ed9146143a7720d"
  },
  {
    "url": "en/for_web3_dev/modules/inflation.html",
    "revision": "c82f580e35560abf90cd64232c7d07a2"
  },
  {
    "url": "en/for_web3_dev/modules/nft.html",
    "revision": "ed1502d83c7199c00c5d638c4430e809"
  },
  {
    "url": "en/for_web3_dev/modules/pool-incentives.html",
    "revision": "489791350d544c4f42968afd3d5a3987"
  },
  {
    "url": "en/for_web3_dev/modules/swap.html",
    "revision": "9f66fb0b5cfbe3f5a625429fcc6baa7e"
  },
  {
    "url": "en/for_web3_dev/namespace.html",
    "revision": "6cf7463c17eff692342c8e16d78ef335"
  },
  {
    "url": "en/for_web3_dev/quick_connect.html",
    "revision": "9a00d3e55c63701db4bbabbaecf15a2c"
  },
  {
    "url": "en/for_web3_dev/remix.html",
    "revision": "4b762f8d4da29b810f145d961a99a045"
  },
  {
    "url": "en/for_web3_dev/running_server.html",
    "revision": "ec2bb2fc18b76b5d341f30a1c15b1e7c"
  },
  {
    "url": "en/for_web3_dev/tendermint_rpc.html",
    "revision": "afdd02f9baf8f84c38b83800ab9a46b4"
  },
  {
    "url": "en/for_web3_dev/truffle.html",
    "revision": "859e917a44420b79248f7aaf461761e0"
  },
  {
    "url": "en/for_web3_dev/ts.html",
    "revision": "53e58bf4a4d9cbe9b6f1d8f8b97c30f0"
  },
  {
    "url": "en/for_web3_dev/wasm.html",
    "revision": "b06b482f80fec016068c11f4e684bc0d"
  },
  {
    "url": "en/for_web3_user/backup.html",
    "revision": "911693f6e22f601e401331d1919dc95c"
  },
  {
    "url": "en/for_web3_user/gas-and-fees.html",
    "revision": "26c7e96dbaf60fa96a731270493efa74"
  },
  {
    "url": "en/for_web3_user/keyring.html",
    "revision": "186276faecac33d99eb7880041d7242a"
  },
  {
    "url": "en/for_web3_user/metamask.html",
    "revision": "9020554a4c0fa7f76a96cd7198a0c318"
  },
  {
    "url": "en/for_web3_user/metaos-wallet.html",
    "revision": "1214388bd9b59e50eccea271bbd6e51c"
  },
  {
    "url": "en/for_web3_user/multisig.html",
    "revision": "3d7d1ea17fb274216eed8a03a20255ae"
  },
  {
    "url": "en/for_web3_user/swap.html",
    "revision": "d36385b326267170ac46fb9248db5e0c"
  },
  {
    "url": "en/for_web3_user/tokens.html",
    "revision": "7a2d03fa79e4faa164004cad7ea79d2d"
  },
  {
    "url": "en/for_web3_user/transactions.html",
    "revision": "e933415019132eca3e0b44d204f7277f"
  },
  {
    "url": "en/for_web3_user/wormhole.html",
    "revision": "ccf12688cb5863b4807a5b1e064069d0"
  },
  {
    "url": "en/index.html",
    "revision": "ce05a5c8464bf46ac0a24a15264cbbf3"
  },
  {
    "url": "static/importacc.png",
    "revision": "4b6ca4e58c64fd78b5f63d767a36c863"
  },
  {
    "url": "static/local_config.png",
    "revision": "0b47aff96d25d2e7659d120f8d4a0208"
  },
  {
    "url": "static/metamask.png",
    "revision": "d6cf3a80392faebf47f8a6b05eda1990"
  },
  {
    "url": "static/remix_deploy.png",
    "revision": "438516d5febfcbca83c62878d4e9da04"
  },
  {
    "url": "static/remix_deployed.png",
    "revision": "ab4439086da9319b51e0869823752e47"
  },
  {
    "url": "static/remix_interact.png",
    "revision": "e1ca3990f9be5f8ebc592440ba95f125"
  },
  {
    "url": "static/sentry_layout.png",
    "revision": "4c8ab19d938a39b19aed03bc1342b637"
  },
  {
    "url": "zh/index.html",
    "revision": "bd122154b887db4332a2de53b9afd863"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
