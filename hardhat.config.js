/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.7.3',
  network: {
    harmony: {
      url: 'https://api.harmony.one',
      accounts: [process.env.BINANCE_MAINNET_WALLET_PRIVATE_KEY],
    },
    harmonyTestnet: {
      url: 'https://api.s0.b.hmny.io',
      accounts: [process.env.BINANCE_WALLET_PRIVATE_KEY],
    },
  },
}
