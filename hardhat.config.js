require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.7.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    harmony: {
      url: 'https://api.harmony.one',
      accounts: [process.env.BINANCE_MAINNET_WALLET_PRIVATE_KEY],
    },
    harmonyTest: {
      chainId: 1666700000,
      url: 'https://api.s0.b.hmny.io',
      accounts: [process.env.BINANCE_WALLET_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      harmony: 'your API key',
      harmonyTest: 'your API key',
    },
  },
}
