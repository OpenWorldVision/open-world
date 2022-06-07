import { getAddresses } from 'constants/addresses'
import { BigNumber, ethers } from 'ethers'
import Web3 from 'web3'
import { getOpenWorldContract } from './openWorldContract'
import { getMarketContract } from './Market'

const web3 = new Web3(Web3.givenProvider)

export const sellSushi = async (ids: Array<number>, price: number) => {
  const contract = await getMarketContract()
  const chainId = await web3.eth.getChainId()
  const itemAddress = getAddresses(chainId).ITEM

  try {
    const data = await contract.addListing(
      itemAddress,
      ids,
      ethers.utils.parseEther(`${price}`)
    )

    return data
  } catch (error) {
    return null
  }
}
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
type Listing = {
  id: string
  items: string[]
  price: string
  seller: string
  trait: number
}
export async function getListingIDs(isMine: boolean): Promise<Listing[]> {
  const contract = await getMarketContract()
  const accounts = await web3.eth.getAccounts()
  const chainId = await web3.eth.getChainId()
  const itemAddress = getAddresses(chainId).ITEM
  try {
    const listIds = await contract.getListingSlice(itemAddress, 0, 30)
    const listFull = []
    listIds?.sellers?.forEach((sellerAddress, index) => {
      if (sellerAddress !== NULL_ADDRESS) {
        listFull.push({
          id: listIds?.ids[index],
          items: listIds?.items[index],
          price: ethers.utils.formatEther(listIds?.prices[index]),
          seller: listIds?.sellers[index],
          trait: listIds?.trait[index],
        })
      }
    })
    if (!isMine) {
      return listFull.filter((item) => item?.seller !== accounts[0])
    } else {
      return listFull.filter((item) => item?.seller === accounts[0])
    }
  } catch (error) {
    return []
  }
}

export const purchaseItems = async (
  transactionId: number,
  itemIds: number[],
  onError?: (error: string) => void
) => {
  try {
    const openWorldContract = await getOpenWorldContract()
    const currentAddress = await window.ethereum.selectedAddress
    const chainId = await web3.eth.getChainId()
    const itemAddress = getAddresses(chainId).ITEM
    const marketAddress = getAddresses(chainId).MARKETPLACE

    const allowance: BigNumber = await openWorldContract.allowance(
      currentAddress,
      marketAddress
    )

    if (allowance.lt(BigNumber.from(web3.utils.toWei('1000000', 'ether')))) {
      await openWorldContract.approve(
        marketAddress,
        web3.utils.toWei('100000000', 'ether')
      )
    }
    const contract = await getMarketContract()

    const result = await contract.purchaseListing(
      itemAddress,
      transactionId,
      itemIds
    )

    return result
  } catch (error) {
    onError?.(error.reason)
    return null
  }
}

export const cancelListingItem = async (id: number) => {
  try {
    const contract = await getMarketContract()
    const chainId = await web3.eth.getChainId()
    const itemAddress = getAddresses(chainId).ITEM

    const result = await contract?.cancelListing(itemAddress, id)

    if (result) {
      return result
    }
  } catch (error) {
    return null
  }
}
