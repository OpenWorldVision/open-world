const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const HeroCore = artifacts.require('HeroCore')
const Item = artifacts.require('Item')
const Profession = artifacts.require('Profession')

module.exports = async function (deployer, network) {
  let govToken, profileAddress

  if (network === 'harmonyTestnet') {
    govToken = '0x6c14d24eae373ae930768adbfa75c406119bf569'
    profileAddress = ''
  }
  if (network === 'harmony') {
    govToken = ''
    profileAddress = ''
  }
  if (network === 'bsctestnet') {
    govToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
    profileAddress = ''
  }
  const item = await deployProxy(Item, [govToken], {
    deployer,
  })

  const profession = await deployProxy(
    Profession,
    [item.address, profileAddress],
    { deployer }
  )

  const PROFESSION_OPERATOR = await item.PROFESSION_OPERATOR()
  await item.grantRole(PROFESSION_OPERATOR, profession.address)
}
