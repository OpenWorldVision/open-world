const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const NFTMarket = artifacts.require('NFTMarket')

module.exports = async function (deployer, network) {
  let openToken, taxRecipient
  if (network === 'harmonyTestnet') {
    openToken = '0x6c14d24eae373ae930768adbfa75c406119bf569'
    taxRecipient = ''
  }
  if (network === 'harmony') {
    openToken = ''
    taxRecipient = ''
  }
  if (network === 'bsctestnet') {
    openToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
    taxRecipient = '0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517'
  }
  await deployProxy(NFTMarket, [openToken, taxRecipient], {
    deployer,
    unsafeAllow: ['delegatecall'],
  })
}
