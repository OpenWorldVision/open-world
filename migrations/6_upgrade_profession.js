const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profession = artifacts.require('Profession')

module.exports = async function (deployer, network) {
  let professionProxy
  if (network === 'harmonyTestnet') {
    professionProxy = '0xC5Cc7a45Dd43AE5a50bB5487C79f37fFeb0B4616'
  }
  if (network === 'harmony') {
    professionProxy = '0xAD26336E8a65398Ed6A566175B132D48F9871004'
  }
  if (network === 'bsctestnet') {
    professionProxy = '0xf1FB61D2f353C8e612E201Ed8bb9Fb6FB4CC8673'
  }

  await upgradeProxy(professionProxy, Profession, {
    deployer,
  })
}
