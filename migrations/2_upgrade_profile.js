const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network) {
  let profileProxy
  if (network === 'harmonyTestnet') {
    profileProxy = '0xdA7Ac2056FeC83f1A9E1a1a3F339fcaA696618c3'
  }
  if (network === 'harmony') {
    profileProxy = '0x857c831fE590c472a222AbF62131906e5d038330'
  }
  if (network === 'bsctestnet') {
    profileProxy = '0xae46953433ebE48698c6D86a49fA154eDCad99C3'
  }

  await upgradeProxy(profileProxy, Profiles, {
    deployer,
  })
}
