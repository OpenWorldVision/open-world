const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const HeroCore = artifacts.require('HeroCore')

module.exports = async function (deployer, network) {
  let govToken
  if (network === 'harmonyTestnet') {
    govToken = '0x6c14d24eae373ae930768adbfa75c406119bf569'
  }
  if (network === 'harmony') {
    govToken = ''
  }
  await deployProxy(HeroCore, [govToken], {
    deployer,
  })
}
