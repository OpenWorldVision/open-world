import { ethers } from 'ethers'

const openWorldTokenContract = {
  addressBSC: '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B',
  harmony: '',
  jsonInterface: require('../build/contracts/ERC20.json'),
}
export const getOpenWorldContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const address =
    chainId === 97
      ? openWorldTokenContract.addressBSC
      : openWorldTokenContract.harmony
  return new ethers.Contract(
    address,
    openWorldTokenContract.jsonInterface.abi,
    provider.getSigner()
  )
}
