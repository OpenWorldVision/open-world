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
    nftMarketProxy = '0x7210aEaF0c7d74366E37cfB37073cB630Ac86B5b'
  }
  await upgradeProxy(nftMarketProxy, NFTMarket, {
    deployer,
    unsafeAllow: ['delegatecall'],
  })
}
