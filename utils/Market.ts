import { ethers } from 'ethers'
import Web3 from 'web3'
import { nftMarketContract } from './NFTMarket'
const web3 = new Web3(Web3.givenProvider)

const itemContract = {
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

const marketContract = {
  addressBSC: '0x7210aEaF0c7d74366E37cfB37073cB630Ac86B5b',
  jsonInterface: require('../build/contracts/NFTMarket.json'),
}

// Create contract
const getMarketContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId
  const currentAddress = await window.ethereum.selectedAddress

  if (chainId === '0x61') {
    return new ethers.Contract(
      marketContract.addressBSC,
      marketContract.jsonInterface.abi,
      provider.getSigner(currentAddress)
    )
  }
}

const getItemContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  // const chainId = await window?.ethereum?.chainId

  return new ethers.Contract(
    itemContract.addressBSC,
    itemContract.jsonInterface.abi,
    provider.getSigner()
  )
}

// Call methods
export const listMultiItems = async (ids, price) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const Market = await getMarketContract()
  const Item = await getItemContract()

  const account = await provider.getSigner().getAddress()

  try {
    const isApproved = await Item.isApprovedForAll(
      account,
      marketContract.addressBSC
    )
    if (!isApproved) {
      await Item.setApprovalForAll(marketContract.addressBSC, true)
    }

    const result = await Market.addListing(itemContract.addressBSC, ids, price)

    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch (error) {
    return null
  }
}

export const getListingIDs = async () => {
  const Market = await getMarketContract()
  const Item = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress
  const array = []
  try {
    const result = await Market.getListingIDs(itemContract.addressBSC)
    for (const i of result) {
      const _seller = await Market.getSellerOfNftID(itemContract.addressBSC, i.toNumber())
      const _price = await Market.getFinalPrice(itemContract.addressBSC, i.toNumber())
      const _trait = await Item.get(i.toNumber())
      array.push({
        id: i.toNumber(),
        price: _price.toNumber(),
        trait: _trait,
        seller: _seller,
        isOwner: _seller.toLowerCase() === currentAddress.toLowerCase()
      })
    }
    return array
  } catch {
    return []
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
        const _trait = await Item.get(y.toNumber())
        array.push({
          id: y.toNumber(),
          trait: _trait
        })
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
  const array = []
  
  try {
    const items = await Market.getListingIDsBySeller(itemContract.addressBSC, currentAddress)
    for (const item of items) {
      const result = await Market.getFinalPrice(itemContract.addressBSC, item.toNumber())
      array.push({
        id: item.toNumber(),
        price: result.toNumber(),
      })
    }
    return array
  } catch (e) {
    return []
  }
}

export const addListing = async (id: number, price: number) => {
  const Market = await getMarketContract()
  const Item = await getItemContract()
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  try {
    await Item.setApprovalForAll(marketContract.addressBSC, true)
    const result = await Market.addListing(itemContract.addressBSC, id, price)
    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch {
    return false
  }
}

export const cancelListing = async (id: number) => {
  const Market = await getMarketContract()
  const Item = await getItemContract()
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  try {
    await Item.setApprovalForAll(marketContract.addressBSC, true)
    const result = await Market.cancelListing(itemContract.addressBSC, id)
    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch {
    return false
  }
}

export const purchaseListing = async (id: number, price: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const Market = await getMarketContract()
  const Item = await getItemContract()

  try {
    await Item.setApprovalForAll(marketContract.addressBSC, true)
    const result = await Market.purchaseListing(itemContract.addressBSC, id, price)

    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch {
    return false
  }
}

export const getNumberOfItemListings = async () => {
  const Market = await getMarketContract()
  const itemsAmount = []

  for (let i = 1; i < 4; i++) {
    const itemIdList = await Market.getNumberOfItemListings(itemContract.addressBSC, i)
    itemsAmount.push(itemIdList.toNumber())
  }

  return {
    openianAmount: itemsAmount[0],
    supplierAmount: itemsAmount[1],
    blacksmithAmount: itemsAmount[2],
  }
}
