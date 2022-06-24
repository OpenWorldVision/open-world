const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Profiles = artifacts.require('Profiles')

module.exports = async function (deployer, network, accounts) {
  let govToken
  if (network === 'harmonyTestnet') {
    govToken = '0x81d46b953ea84204AC1CaB75A4cB188E2529DCFB'
  }
  if (network === 'harmony') {
    govToken = '0x27a339d9b59b21390d7209b78a839868e319301b'
  }
  if (network === 'bsctestnet') {
    govToken = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
  }
  console.log(accounts)
  await deployProxy(Profiles, [govToken], {
    deployer,
  })

  // const profiles = await Profiles.at(
  //   '0xdA7Ac2056FeC83f1A9E1a1a3F339fcaA696618c3'
  // )
  // profiles.grantRole(
  //   '0x0d6a1bd1ca1363e4d52ba01324f983eef28b98b2863700aece4a71134de1a9c1',
  //   '0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517'
  // )
}
