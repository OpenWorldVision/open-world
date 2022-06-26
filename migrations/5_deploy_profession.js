const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Item = artifacts.require('Item')
const Profession = artifacts.require('Profession')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network) {
  let govToken, profileAddress, itemAddress

  if (network === 'harmonyTestnet') {
    govToken = '0x81d46b953ea84204AC1CaB75A4cB188E2529DCFB'
    profileAddress = '0xdA7Ac2056FeC83f1A9E1a1a3F339fcaA696618c3'
    itemAddress = '0xBd69df7fFcB9d7F071bb2124E1Eb8734bBDA8E0B'
  }
  if (network === 'harmony') {
    govToken = '0x27a339d9b59b21390d7209b78a839868e319301b'
    profileAddress = '0x857c831fE590c472a222AbF62131906e5d038330'
    itemAddress = '0xaDFd281dd7bC9de80AC2aF5811914FF87ef6e00f'
  }
  if (network === 'bsctestnet') {
    govToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
    profileAddress = '0xE6046d1363F7Bebff6cB98c72094c89fF8ee500D'
    itemAddress = '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492'
  }
  const item = await Item.at(itemAddress)

  const profession = await deployProxy(
    Profession,
    [item.address, profileAddress],
    { deployer }
  )

  const PROFESSION_OPERATOR = await item.PROFESSION_OPERATOR()
  await item.grantRole(PROFESSION_OPERATOR, profession.address)

  const profile = await Profiles.at(profileAddress)
  await profile.grantRole(PROFESSION_OPERATOR, profession.address)
}
