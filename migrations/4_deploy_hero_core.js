const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const HeroCore = artifacts.require('HeroCore')

module.exports = async function (deployer, network) {
  let govToken
  if (network === 'harmonyTestnet') {
    govToken = '0x81d46b953ea84204AC1CaB75A4cB188E2529DCFB'
  }
  if (network === 'harmony') {
    govToken = '0x27a339d9b59b21390d7209b78a839868e319301b'
  }
  if (network === 'bsctestnet') {
    govToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
  }
  await deployProxy(HeroCore, [govToken], {
    deployer,
  })
}
