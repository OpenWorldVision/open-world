const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const HeroCore = artifacts.require('HeroCore')

module.exports = async function (deployer, network) {
  let govToken
  if (network === 'harmonyTestnet') {
    govToken = '0x81d46b953ea84204AC1CaB75A4cB188E2529DCFB'
  }
  if (network === 'harmony') {
    govToken = ''
  }
  if (network === 'bsctestnet') {
    govToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
  }
  await deployProxy(HeroCore, [govToken], {
    deployer,
  })
  // const hero = await HeroCore.at('0xE8977C9E35a8aCa6cB179681433062d38043FB58')
  // await hero.mint('0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517', '1')
}
