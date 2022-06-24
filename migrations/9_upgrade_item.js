const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Item = artifacts.require('Item')

module.exports = async function (deployer, network) {
  let itemProxy
  if (network === 'harmonyTestnet') {
    itemProxy = '0x6c14d24eae373ae930768adbfa75c406119bf569'
  }
  if (network === 'harmony') {
    itemProxy = '0xaDFd281dd7bC9de80AC2aF5811914FF87ef6e00f'
  }
  if (network === 'bsctestnet') {
    itemProxy = '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492'
  }
  await upgradeProxy(itemProxy, Item, {
    deployer,
  })
}
