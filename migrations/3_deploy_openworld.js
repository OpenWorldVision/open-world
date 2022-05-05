const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')
const OpenWorld = artifacts.require('OpenWorld')

module.exports = async function (deployer, network) {
  let taxAddress
  if (network === 'harmonyTestnet' || network === 'bsctestnet') {
    taxAddress = '0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517'
  }
  if (network === 'harmony') {
    taxAddress = ''
  }
  await deployer.deploy(OpenWorld, 'OpenWorld', 'OPEN', taxAddress)
}
