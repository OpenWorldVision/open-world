import { getAddresses } from 'constants/addresses'
import { ethers } from 'ethers'
import { getMarketContract } from './NFTMarket'
import Web3 from 'web3'
import itemInterface from '../build/contracts/Item.json'

const web3 = new Web3(Web3.givenProvider)

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export const getItemContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const itemAddress = getAddresses(chainId).ITEM
  return new ethers.Contract(
    itemAddress,
    itemInterface.abi,
    provider.getSigner()
  )
}

// Call methods
export const fetchListItemIds = async (trait) => {
  const contract = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress
  const itemIdList = await contract.getAmountItemByTrait(trait, currentAddress)
  const result = itemIdList.map((id) => id.toNumber())

  return result
}

export async function fetchUserInventoryItemAmount() {
  const Market = await getMarketContract()
  const accounts = await web3.eth.getAccounts()
  const chainId = await web3.eth.getChainId()
  const itemAddress = getAddresses(chainId).ITEM
  try {
    const listIds = await Market.getListingSlice(itemAddress, 0, 200)
    const listFull = []
    listIds?.sellers?.forEach((sellerAddress, index) => {
      if (sellerAddress !== NULL_ADDRESS) {
        listFull.push({
          id: listIds?.ids[index].toNumber(),
          seller: listIds?.sellers[index],
          trait: listIds?.trait[index],
        })
      }
    })
    const fishItems = []
    const oreItems = []
    const hammerItems = []
    const sushiItems = []

    for (const i of listFull) {
      if (i.seller === accounts) {
        if (i.trait === 0) fishItems.push(i.id)
        else if (i.trait === 1 ) oreItems.push(i.id)
        else if (i.trait === 2 ) hammerItems.push(i.id)
        else if (i.trait === 3 ) sushiItems.push(i.id)
      }
    }
    return {
      fishItems,
      fishAmount: fishItems.length,
      oreItems,
      oreAmount: oreItems.length,
      hammerItems,
      hammerAmount: hammerItems.length,
      sushiItems,
      sushiAmount: sushiItems.length,
    }
  } catch (error) {
    return []
  }
}