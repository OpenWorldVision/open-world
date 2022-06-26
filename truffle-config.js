/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require('dotenv').config()

function hdWalletProviderOptions(
  privateKeyEnvVarValue,
  mnemonicPhraseEnvVarValue,
  otherOpts
) {
  const opts = { ...otherOpts }
  if (privateKeyEnvVarValue) {
    opts.privateKeys = [privateKeyEnvVarValue]
  } else {
    opts.mnemonic = mnemonicPhraseEnvVarValue
  }
  return opts
}

const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: process.env.ETH_DEV_RPC_HOST || '127.0.0.1', // Localhost (default: none)
      port: process.env.ETH_DEV_RPC_PORT || 7545, // Standard Ethereum port (default: none)
      network_id: process.env.ETH_DEV_RPC_NETWORK_ID || '*', // Any network (default: none)
      gas: parseInt(process.env.ETH_DEV_RPC_GAS, 10) || 67219750, // required for deploy, otherwise it throws weird require-errors on constructor
    },
    bsctestnet: {
      networkCheckTimeout: 150000,
      provider: () =>
        new HDWalletProvider(
          hdWalletProviderOptions(
            process.env.BINANCE_WALLET_PRIVATE_KEY,
            process.env.BINANCE_WALLET_MNEMONIC,
            {
              providerOrUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
              // providerOrUrl: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
            }
          )
        ),
      network_id: 0x61,
      timeoutBlocks: 100000,
      confirmations: 2,
      gas: 8000000, //8000000,
      skipDryRun: true,
      gasPrice: 60000000000,
    },
    bscmainnet: {
      provider: () =>
        new HDWalletProvider(
          hdWalletProviderOptions(
            process.env.BINANCE_MAINNET_WALLET_PRIVATE_KEY,
            process.env.BINANCE_MAINNET_WALLET_MNEMONIC,
            {
              // providerOrUrl: "https://bsc-dataseed1.ninicoin.io/",
              providerOrUrl:
                'https://speedy-nodes-nyc.moralis.io/eba7d2e0234f08d2741c13aa/bsc/mainnet',
            }
          )
        ),
      network_id: 0x38,
      confirmations: 20,
      timeoutBlocks: 200,
      gas: 10600000,
      skipDryRun: true,
    },
    avax: {
      provider: () =>
        new HDWalletProvider(
          hdWalletProviderOptions(
            process.env.BINANCE_MAINNET_WALLET_PRIVATE_KEY,
            process.env.BINANCE_MAINNET_WALLET_MNEMONIC,
            {
              providerOrUrl:
                'https://speedy-nodes-nyc.moralis.io/eba7d2e0234f08d2741c13aa/avalanche/mainnet',
            }
          )
        ),
      network_id: '*',
      confirmations: 10,
      timeoutBlocks: 200,
      gas: 3000000,
      gasPrice: 225000000000,
      skipDryRun: true,
    },
    polygon: {
      provider: () =>
        new HDWalletProvider(
          hdWalletProviderOptions(
            process.env.BINANCE_MAINNET_WALLET_PRIVATE_KEY,
            process.env.BINANCE_MAINNET_WALLET_MNEMONIC,
            {
              providerOrUrl:
                'https://speedy-nodes-nyc.moralis.io/eba7d2e0234f08d2741c13aa/polygon/mainnet',
            }
          )
        ),
      network_id: '137',
      confirmations: 10,
      timeoutBlocks: 200,
      gas: 15000000,
      gasPrice: 50000000000,
      skipDryRun: true,
    },
    harmonyTestnet: {
      provider: () =>
        new HDWalletProvider(
          hdWalletProviderOptions(
            process.env.BINANCE_WALLET_PRIVATE_KEY,
            process.env.BINANCE_WALLET_MNEMONIC,
            {
              providerOrUrl: 'https://api.s0.b.hmny.io',
            }
          )
        ),
      network_id: 1666700000,
      timeoutBlocks: 100000,
      confirmations: 2,
      gas: 8000000, //8000000,
      skipDryRun: true,
      gasPrice: 60000000000,
    },
    harmony: {
      provider: () =>
        new HDWalletProvider(
          hdWalletProviderOptions(
            process.env.BINANCE_MAINNET_WALLET_PRIVATE_KEY,
            process.env.BINANCE_MAINNET_WALLET_MNEMONIC,
            {
              providerOrUrl: 'https://harmony.public-rpc.com/',
            }
          )
        ),
      network_id: 1666600000,
      timeoutBlocks: 200,
      confirmations: 2,
      gas: 8000000, //8000000,
      skipDryRun: true,
      gasPrice: 38000000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.7.5', // Fetch exact version from solc-bin (default: truffle's version)
      //docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        //evmVersion: "byzantium"
      },
      metadata: {
        // Use only literal content and not URLs (false by default)
        useLiteralContent: true,
        // Use the given hash method for the metadata hash that is appended to the bytecode.
        // The metadata hash can be removed from the bytecode via option "none".
        // The other options are "ipfs" and "bzzr1".
        // If the option is omitted, "ipfs" is used by default.
        bytecodeHash: 'ipfs',
      },
    },
  },
  plugins: ['truffle-plugin-verify', 'truffle-contract-size'],
  api_keys: {
    bscscan: process.env.BSCSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY,
    harmony: process.env.HARMONY_API_KEY,
  },
  // subscribers: {
  //   abisToTs: require('./truffle-subscriber-abis-to-ts.js')
  // }
}
