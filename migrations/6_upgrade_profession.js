const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profession = artifacts.require('Profession')

module.exports = async function (deployer, network) {
  let professionProxy
  if (network === 'harmonyTestnet') {
    professionProxy = '0x87461dE8692EAD1de9eE628FF25D97Ae393Ea162'
  }
  if (network === 'harmony') {
    professionProxy = '0x707Ea5fC3Fc92c3B802Ecb9E1428E6F4FF03282f'
  }
  if (network === 'bsctestnet') {
    professionProxy = '0xf1FB61D2f353C8e612E201Ed8bb9Fb6FB4CC8673'
  }

  await upgradeProxy(professionProxy, Profession, {
    deployer,
  })
}
