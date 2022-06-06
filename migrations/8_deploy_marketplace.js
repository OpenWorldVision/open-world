const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const NFTMarket = artifacts.require('NFTMarket')

module.exports = async function (deployer, network) {
  let openToken, taxRecipient, itemAddress
  if (network === 'harmonyTestnet') {
    openToken = '0x81d46b953ea84204AC1CaB75A4cB188E2529DCFB'
    taxRecipient = '0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517'
    itemAddress = '0xBd69df7fFcB9d7F071bb2124E1Eb8734bBDA8E0B'
  }
  if (network === 'harmony') {
    openToken = ''
    taxRecipient = ''
    itemAddress = ''
  }
  if (network === 'bsctestnet') {
    openToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
    taxRecipient = '0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517'
    itemAddress = ''
  }
  const marketplace = await deployProxy(NFTMarket, [openToken, taxRecipient], {
    deployer,
    unsafeAllow: ['delegatecall'],
  })
  const GAME_ADMIN = await marketplace.GAME_ADMIN()
  await marketplace.grantRole(GAME_ADMIN, taxRecipient)
  await marketplace.setItem(itemAddress)
}
