import { getAddresses } from 'constants/addresses'
import { BigNumber, ethers } from 'ethers'
import Web3 from 'web3'
import { getOpenWorldContract } from './openWorldContract'
import { getItemContract } from './Item'
import marketInterface from '../build/contracts/NFTMarket.json'

const web3 = new Web3(Web3.givenProvider)

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

export const sellSushi = async (ids: Array<number>, price: number) => {
  const contract = await getMarketContract()
  const chainId = await web3.eth.getChainId()
  const itemAddress = getAddresses(chainId).ITEM

  try {
    const tx = await contract.addListing(
      itemAddress,
      ids,
      ethers.utils.parseEther(`${price}`)
    )

    const receipt = await tx.wait()

    return receipt
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
    const itemContract = await getItemContract()
    const marketContract = await getMarketContract()

    const allowance: BigNumber = await openWorldContract.allowance(
      currentAddress,
      marketContract.address
    )

    if (allowance.lt(BigNumber.from(web3.utils.toWei('1000000', 'ether')))) {
      const tx = await openWorldContract.approve(
        marketContract.address,
        web3.utils.toWei('100000000', 'ether')
      )
      await tx.wait()
    }
    const tx2 = await marketContract.purchaseListing(
      itemContract.address,
      transactionId,
      itemIds
    )
    const receipt = await tx2.wait()

    return receipt
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

    const tx = await contract?.cancelListing(itemAddress, id)
    const receipt = await tx.wait()

    if (receipt) {
      return receipt
    }
  } catch (error) {
    return null
  }
}

export const listMultiItems = async (ids, price) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const Market = await getMarketContract()
  const Item = await getItemContract()

  const account = await provider.getSigner().getAddress()

  try {
    const isApproved = await Item.isApprovedForAll(account, Market.address)
    if (!isApproved) {
      const tx = await Item.setApprovalForAll(Market.address, true)
      await tx.wait()
    }

    const tx2 = await Market.addListing(
      Item.address,
      ids,
      ethers.utils.parseEther(`${price}`)
    )
    const receipt = await tx2.wait()

    return receipt
  } catch (error) {
    return null
  }
}
