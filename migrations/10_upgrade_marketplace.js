const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const NFTMarket = artifacts.require('NFTMarket')

module.exports = async function (deployer, network) {
  let nftMarketProxy
  if (network === 'harmonyTestnet') {
    nftMarketProxy = '0xCF26DCD48df44bfe074CdAC8A565476Ae4CEf205'
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
