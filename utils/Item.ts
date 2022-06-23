import { getAddresses } from 'constants/addresses'
import { ethers } from 'ethers'

const itemContract = {
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

export const getItemContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const itemAddress = getAddresses(chainId).ITEM
  return new ethers.Contract(
    itemAddress,
    itemContract.jsonInterface.abi,
    provider.getSigner()
  )
}

// Call methods
export const fetchListItemIds = async (trait) => {
  const contract = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress
  const itemIdList = await contract.getAmountItemByTrait(trait, currentAddress)
  const result = itemIdList.map((id) => id.toNumber()).filter((id) => id !== 0)
  return result
}
const ITEM_TYPES = ['fish', 'ore', 'hammer', 'sushi']

export async function fetchUserInventoryItemAmount(): Promise<
  { type: string; ids: number[] }[]
> {
  // for (let i = 1; i < 5; i++) {
  //   const itemIdList = await fetchListItemIds(i)
  //   const itemAmount = itemIdList.filter((x) => x !== 0).length
  //   itemsAmount.push(itemIdList)
  //   itemsAmount.push(itemAmount)
  // }
  // const results = await Promise.all(
  //   ITEM_TYPES.map(async (type, index) => ({
  //     type,
  //     ids: await fetchListItemIds(index + 1),
  //   }))
  // )
  const resultsPromise = await Promise.all(
    [fetchListItemIds(1),
    fetchListItemIds(2),
    fetchListItemIds(3),
    fetchListItemIds(4)]
  ) .then((values) => {
    return values
  })
  const results = ITEM_TYPES.map( (type, index) => ({
    type,
    ids: resultsPromise[index],
  }))
  return results
}
