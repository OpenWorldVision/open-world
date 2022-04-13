const PancakeAggregator = artifacts.require('PancakeAggregator')

module.exports = async function (deployer, network) {
  let router = ''
  let token = ''
  let busdAddress = ''
  if (network === 'bsctestnet') {
    router = '0x9ac64cc6e4415144c455bd8e4837fea55603e5c3'
    token = '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B'
    busdAddress = '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7'
  }

  if (network === 'bscmainnet') {
    router = '0x10ed43c718714eb63d5aa57b78b54704e256024e'
    token = '0x27a339d9b59b21390d7209b78a839868e319301b'
    busdAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
  }
  await deployer.deploy(PancakeAggregator, router, token, busdAddress)
}
