import { ethers } from 'ethers'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)


const itemContract = {
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

const marketContract = {
  addressBSC: '0xF65a2cd87d3b0Fa43C10979c2E60BAA40Bb03C1d',
  jsonInterface: require('../build/contracts/NFTMarket.json'),
}

const openWorldTokenContract = {
  addressBSC: '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B',
  jsonInterface: require('../build/contracts/ERC20.json'),
}

// Create contract
const getOpeWorldContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  return new ethers.Contract(
    openWorldTokenContract.addressBSC,
    openWorldTokenContract.jsonInterface.abi,
    provider.getSigner()
  )
}

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

  try {
    await Item.setApprovalForAll(marketContract.addressBSC, true)

    const result = await Market.addMultiListing(
      itemContract.addressBSC,
      ids,
      price
    )

    let transactionReceipt = null
    do {
      transactionReceipt = await provider.getTransactionReceipt(result.hash)
    } while (transactionReceipt === null)

    return transactionReceipt.status
  } catch {
    return null
  }
}

export const getWeaponListingIDsPage = async (limit: number, page: number, trait: number) => {
  const Market = await getMarketContract()
  const array = []
  
  try {
    const items = await Market.getWeaponListingIDsPage(itemContract.addressBSC, limit, page, trait)
    for (const item of items) {
      const result = await Market.getFinalPrice(itemContract.addressBSC, item.toNumber())
      
      array.push({
        id: item.toNumber(),
        price: result.toNumber()
      })
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
        price: result.toNumber()
      })
    }
    return array
  } catch (e) {
    return []
  }
}

export const getAmountItemByTrait = async (trait: number) => {
  const Item = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress

  try {
    const itemIdList = await Item.getAmountItemByTrait(trait, currentAddress)
    return itemIdList.map((id) => id.toNumber())
  } catch {
    return []
  }
}

export const addListing = async (id: number, price: number) => {
  const Market = await getMarketContract()
  const OpenWorld = await getOpeWorldContract()
  
  try {
    await OpenWorld.approve(
      marketContract.addressBSC,
      web3.utils.toWei('1000000', 'ether')
    )
    await Market.addListing(itemContract.addressBSC, id, price)
    return true
  } catch {
    return false
  }
}

export const purchaseListing = async (id: number, price: number) => {
  const Market = await getMarketContract()
  const OpenWorld = await getOpeWorldContract()

  try {
    await OpenWorld.approve(
      marketContract.addressBSC,
      web3.utils.toWei('1000000', 'ether')
    )
    await Market.purchaseListing(itemContract.addressBSC, id, price)
    return true
  } catch (e) {
    console.log(e);
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
