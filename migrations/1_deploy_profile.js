const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network) {
  let govToken
  if (network === 'harmonyTestnet') {
    profileProxy = '0xe2c25240eA6f598e804BEdcd0a9D7577bB5Fb383'
  }
  if (network === 'harmony') {
    profileProxy = ''
  }
  await deployProxy(Profiles, [], {
    deployer,
  })
}
