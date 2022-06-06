import { getAddresses } from 'constants/addresses'
import { ethers } from 'ethers'
import ERC20Interface from '../build/contracts/ERC20.json'

export const getOpenWorldContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const openWorldAddress = getAddresses(chainId).OPENWORLD

  return new ethers.Contract(
    openWorldAddress,
    ERC20Interface.abi,
    provider.getSigner()
  )
}
