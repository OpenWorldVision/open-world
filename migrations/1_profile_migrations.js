const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network) {
  if (network === 'bsctestnet') {
  }

  if (network === 'bscmainnet') {
  }
  await deployProxy(Profiles, [], {
    deployer,
  })
}
