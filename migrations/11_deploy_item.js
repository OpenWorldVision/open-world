const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const HeroCore = artifacts.require('HeroCore')
const Item = artifacts.require('Item')
const Profession = artifacts.require('Profession')

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

  const item = await deployProxy(Item, [govToken], {
    deployer,
  })
}
