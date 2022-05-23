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
    profileAddress = '0xE6046d1363F7Bebff6cB98c72094c89fF8ee500D'
  }
  const item = await Item.at('0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492')

  const profession = await deployProxy(
    Profession,
    [item.address, profileAddress],
    { deployer }
  )

  const PROFESSION_OPERATOR = await item.PROFESSION_OPERATOR()
  await item.grantRole(PROFESSION_OPERATOR, profession.address)
}
