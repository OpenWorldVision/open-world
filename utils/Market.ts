import { getAddresses } from 'constants/addresses'
import { ethers } from 'ethers'
import { getItemContract } from './Item'
import marketInterface from '../build/contracts/NFTMarket.json'

export const getMarketContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const marketAddress = getAddresses(chainId).MARKETPLACE

  return new ethers.Contract(
    marketAddress,
    marketInterface.abi,
    provider.getSigner()
  )
}
export const listMultiItems = async (ids, price) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const Market = await getMarketContract()
  const Item = await getItemContract()

  const account = await provider.getSigner().getAddress()

  try {
    const isApproved = await Item.isApprovedForAll(account, Market.address)
    if (!isApproved) {
      await Item.setApprovalForAll(Market.address, true)
    }

    const result = await Market.addListing(
      Item.address,
      ids,
      ethers.utils.parseEther(`${price}`)
    )

    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch (error) {
    return null
  }
}
