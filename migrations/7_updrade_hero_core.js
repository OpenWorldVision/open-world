const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const HeroCore = artifacts.require('HeroCore')

module.exports = async function (deployer, network) {
  let heroCoreProxy
  if (network === 'harmonyTestnet') {
    heroCoreProxy = '0x6c14d24eae373ae930768adbfa75c406119bf569'
  }
  if (network === 'harmony') {
    heroCoreProxy = '0x26E94fBf9480aA7836d93220296BD130771aF3DA'
  }
  if (network === 'bsctestnet') {
    heroCoreProxy = '0x585ded8E0Dd7DCfad02F13b94571E24cA59A3234'
  }
  await upgradeProxy(heroCoreProxy, HeroCore, {
    deployer,
  })
}
