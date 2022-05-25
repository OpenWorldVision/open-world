const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const NFTMarket = artifacts.require('NFTMarket')

module.exports = async function (deployer, network) {
  let nftMarketProxy
  if (network === 'harmonyTestnet') {
    nftMarketProxy = '0x6c14d24eae373ae930768adbfa75c406119bf569'
  }
  if (network === 'harmony') {
    nftMarketProxy = ''
  }
  if (network === 'bsctestnet') {
    nftMarketProxy = '0xF65a2cd87d3b0Fa43C10979c2E60BAA40Bb03C1d'
  }
  await upgradeProxy(nftMarketProxy, NFTMarket, {
    deployer,
    unsafeAllow: ['delegatecall'],
  })
}
