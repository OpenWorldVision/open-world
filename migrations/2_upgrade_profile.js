const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network) {
  let profileProxy
  if (network === 'harmonyTestnet') {
    profileProxy = '0xdA7Ac2056FeC83f1A9E1a1a3F339fcaA696618c3'
  }
  if (network === 'harmony') {
    profileProxy = '0x707Ea5fC3Fc92c3B802Ecb9E1428E6F4FF03282f'
  }
  if (network === 'bsctestnet') {
    profileProxy = '0xae46953433ebE48698c6D86a49fA154eDCad99C3'
  }

  await upgradeProxy(profileProxy, Profiles, {
    deployer,
  })
}
