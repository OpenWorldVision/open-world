const Profession = artifacts.require('Profession')
const HeroCore = artifacts.require('HeroCore')
const OpenWorld = artifacts.require('OpenWorld')
const Profiles = artifacts.require('Profiles')
const Item = artifacts.require('Item')
const NFTMarket = artifacts.require('NFTMarket')

module.exports = async function (deployer, network, accounts) {
  let professionProxy,
    heroAddress,
    profilesAddress,
    itemAddress,
    nftMarketAddress
  if (network === 'harmonyTestnet') {
    professionProxy = '0xC5Cc7a45Dd43AE5a50bB5487C79f37fFeb0B4616'
    heroAddress = '0x4DADfE6D1cC2595bF31FF3d478E654179c524F7c'
    profilesAddress = '0xdA7Ac2056FeC83f1A9E1a1a3F339fcaA696618c3'
    itemAddress = '0xBd69df7fFcB9d7F071bb2124E1Eb8734bBDA8E0B'
    nftMarketAddress = '0x6d74d7389eF8B6fE5338112b6Aa55E63410Fce1B'
  }
  if (network === 'harmony') {
    professionProxy = '0x707Ea5fC3Fc92c3B802Ecb9E1428E6F4FF03282f'
    heroAddress = ''
    profilesAddress = ''
    nftMarketAddress = ''
  }
  if (network === 'bsctestnet') {
    professionProxy = '0xf1FB61D2f353C8e612E201Ed8bb9Fb6FB4CC8673'
    heroAddress = ''
    profilesAddress = ''
    nftMarketAddress = ''
  }
  // const profession = await Profession.at(professionProxy)
  // const MOD_ROLE = await profession.MODERATOR_ROLE()
  // await profession.grantRole(MOD_ROLE, accounts[0])
  // await profession.setFishingDuration(43200)
  // await profession.setMiningDuration(43200)
  // await profession.setProfiles(profilesAddress)
  // await profession.setFishingMiningStaminaRequire('50')

  // const hero = await HeroCore.at(heroAddress)
  // const WORLD_OPERATOR = await hero.WORLD_OPERATOR()
  // await hero.grantRole(WORLD_OPERATOR, accounts[0])
  // await hero.setTraitAmount(1, 70)
  // await hero.setTraitAmount(2, 10)
  // await hero.setTraitAmount(3, 20)

  // await hero.setHeroPrice(1, '100000000000000000000')
  // await hero.setHeroPrice(2, '5000000000000000000000')
  // await hero.setHeroPrice(3, '2000000000000000000000')

  // const profiles = await Profiles.at(profilesAddress)
  // await profiles.setHeroes(heroAddress)

  const item = await Item.at(itemAddress)
  const PROFESSION_OPERATOR = await item.PROFESSION_OPERATOR()
  // await item.grantRole(PROFESSION_OPERATOR, accounts[0])
  await item.grantRole(PROFESSION_OPERATOR, professionProxy)
  // for (let i = 0; i < 50; i++) {
  //   await item.mint('0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517', 2)
  // }
}
