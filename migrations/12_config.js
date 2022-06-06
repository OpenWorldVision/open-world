const Profession = artifacts.require('Profession')
const HeroCore = artifacts.require('HeroCore')
const OpenWorld = artifacts.require('OpenWorld')

module.exports = async function (deployer, network, accounts) {
  let professionProxy, heroAddress, profilesAddress
  if (network === 'harmonyTestnet') {
    professionProxy = '0xC5Cc7a45Dd43AE5a50bB5487C79f37fFeb0B4616'
    heroAddress = '0x4DADfE6D1cC2595bF31FF3d478E654179c524F7c'
    profilesAddress = '0xdA7Ac2056FeC83f1A9E1a1a3F339fcaA696618c3'
  }
  if (network === 'harmony') {
    professionProxy = '0x707Ea5fC3Fc92c3B802Ecb9E1428E6F4FF03282f'
    heroAddress = ''
    profilesAddress = ''
  }
  if (network === 'bsctestnet') {
    professionProxy = '0xf1FB61D2f353C8e612E201Ed8bb9Fb6FB4CC8673'
    heroAddress = ''
    profilesAddress = ''
  }
  const profession = await Profession.at(professionProxy)
  const MOD_ROLE = await profession.MODERATOR_ROLE()
  await profession.grantRole(MOD_ROLE, accounts[0])
  await profession.setFishingDuration(43200)
  await profession.setMiningDuration(43200)
  await profession.setProfiles(profilesAddress)
  await profession.setFishingMiningStaminaRequire('50')

  const hero = await HeroCore.at(heroAddress)
  const WORLD_OPERATOR = await hero.WORLD_OPERATOR()
  await hero.grantRole(WORLD_OPERATOR, accounts[0])
  await hero.setTraitAmount(1, 70)
  await hero.setTraitAmount(2, 10)
  await hero.setTraitAmount(3, 20)

  await hero.setHeroPrice(1, 100)
  await hero.setHeroPrice(2, 5000)
  await hero.setHeroPrice(3, 2000)
}
