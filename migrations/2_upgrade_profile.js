const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network) {
  let profileProxy
  if (network === 'harmonyTestnet') {
    profileProxy = '0xEfC8E6EDfeD04fFE7B32a3962BB821f7073e03b3'
  }
  if (network === 'harmony') {
    profileProxy = '0x707Ea5fC3Fc92c3B802Ecb9E1428E6F4FF03282f'
  }
  await upgradeProxy(profileProxy, Profiles, {
    deployer,
  })
}
