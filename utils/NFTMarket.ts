import { getAddresses } from 'constants/addresses'
import { ethers } from 'ethers'
import Web3 from 'web3'
import { getItemContract } from './Item'
import marketInterface from '../build/contracts/NFTMarket.json'

const web3 = new Web3(Web3.givenProvider)

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
type Listing = {
  id: string
  items: string[]
  price: string
  seller: string
  trait: number
  isOwner: boolean
}

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

export async function getListingIDs(isMine: boolean, isFull = false): Promise<Listing[]> {
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
          id: listIds?.ids[index].toNumber(),
          items: listIds?.items[index],
          price: ethers.utils.formatEther(listIds?.prices[index]),
          seller: listIds?.sellers[index],
          trait: listIds?.trait[index],
        })
      }
    })
    if (isFull) {
      return listFull.map((item) => ({
        ...item,
        isOwner: item?.seller === accounts[0]
      }))
    }
    else {
      if (!isMine) {
        return listFull.filter((item) => item?.seller !== accounts[0])
      } else {
        return listFull.filter((item) => item?.seller === accounts[0])
      }
    }
  } catch {
    return []
  }
}

export const purchaseItems = async (
  transactionId: number,
  itemIds: number[],
  onTransactionExecute: (txHash: string) => void,
  onError?: (error: string) => void
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const Item = await getItemContract()
  const Market = await getMarketContract()
  const account = await provider.getSigner().getAddress()

  try {
    const isApproved = await Item.isApprovedForAll(account, Market.address)
    if (!isApproved) {
      const tx = await Item.setApprovalForAll(Market.address, true)
      await tx.wait()
    }

    const tx2 = await Market.purchaseListing(
      Item.address,
      transactionId,
      itemIds
    )
    onTransactionExecute(tx2.hash)
    const receipt = await tx2.wait()
    return receipt
  } catch (error) {
    onError?.(error.reason)
    return null
  }
}

export const cancelListingItem = async (
  id: number,
  onTransactionExecute: (txHash: string) => void
) => {
  try {
    const contract = await getMarketContract()
    const chainId = await web3.eth.getChainId()
    const itemAddress = getAddresses(chainId).ITEM

    const tx = await contract?.cancelListing(itemAddress, id)
    onTransactionExecute(tx.hash)

    const receipt = await tx.wait()

    if (receipt) {
      return receipt
    }
  } catch (error) {
    return null
  }
}

export const listMultiItems = async (
  ids,
  price,
  onTransactionExecute: (txHash: string) => void
) => {
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
    onTransactionExecute(tx2.hash)

    const receipt = await tx2.wait()

    return receipt
  } catch (error) {
    return null
  }
}

export const getAmountItemByTrait = async () => {
  const Item = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress
  const array = []

  try {
    for(let i = 1; i < 4; i++) {
      const result = await Item.getAmountItemByTrait(i, currentAddress)
      for (const y of result) {
        if (y.toNumber() !== 0) {
          const _trait = await Item.get(y.toNumber())
          array.push({
            id: y.toNumber(),
            trait: _trait
          })
        }
      }
    }
    return array
  } catch {
    return []
  }
}

export const getListingIDsBySeller = async () => {
  const currentAddress = await window.ethereum.selectedAddress
  const Market = await getMarketContract()
  const chainId = await web3.eth.getChainId()
  const itemAddress = getAddresses(chainId).ITEM
  const array = []
  
  try {
    const items = await Market.getListingIDsBySeller(itemAddress, currentAddress)
    for (const item of items) {
      const result = await Market.getFinalPrice(itemAddress, item.toNumber())
      array.push({
        id: item.toNumber(),
        price: result.toNumber(),
      })
    }
    return array
  } catch {
    return []
  }
}

export const getNumberOfItemListings = async () => {
  const Market = await getMarketContract()
  const chainId = await web3.eth.getChainId()
  const itemAddress = getAddresses(chainId).ITEM
  const itemsAmount = []

  for (let i = 1; i < 4; i++) {
    const itemIdList = await Market.getNumberOfItemListings(itemAddress, i)
    itemsAmount.push(itemIdList.toNumber())
  }

  return {
    openianAmount: itemsAmount[0],
    supplierAmount: itemsAmount[1],
    blacksmithAmount: itemsAmount[2],
  }
}