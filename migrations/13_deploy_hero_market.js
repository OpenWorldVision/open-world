const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const HeroMarket = artifacts.require('HeroMarket')

module.exports = async function (deployer, network) {
  let openToken, taxRecipient, heroAddress
  if (network === 'harmonyTestnet') {
    openToken = '0x81d46b953ea84204AC1CaB75A4cB188E2529DCFB'
    taxRecipient = '0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517'
    heroAddress = '0xBd69df7fFcB9d7F071bb2124E1Eb8734bBDA8E0B'
  }
  if (network === 'harmony') {
    openToken = '0x27a339d9b59b21390d7209b78a839868e319301b'
    taxRecipient = '0x5678917FfEb77827Aafc33419E99DaCd707313a9'
    heroAddress = '0x26E94fBf9480aA7836d93220296BD130771aF3DA'
  }
  if (network === 'bsctestnet') {
    openToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
    taxRecipient = '0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517'
    heroAddress = '0x585ded8E0Dd7DCfad02F13b94571E24cA59A3234'
  }
  const marketplace = await deployProxy(HeroMarket, [openToken, taxRecipient], {
    deployer,
    unsafeAllow: ['delegatecall'],
  })
  const GAME_ADMIN = await marketplace.GAME_ADMIN()
  await marketplace.grantRole(GAME_ADMIN, taxRecipient)
  await marketplace.allowToken(heroAddress)
}
