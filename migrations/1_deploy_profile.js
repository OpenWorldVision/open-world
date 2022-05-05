const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network) {
  let govToken
  if (network === 'harmonyTestnet') {
    govToken = '0x6c14d24eae373ae930768adbfa75c406119bf569'
  }
  if (network === 'harmony') {
    govToken = ''
  }
  if (network === 'bsctestnet') {
    govToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
  }
  await deployProxy(Profiles, [govToken], {
    deployer,
  })
}
