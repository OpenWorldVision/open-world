import { ethers } from 'ethers'

const itemContract = {
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

// Create contract
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
export const fetchListItemIds = async (trait) => {
  const contract = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress
  const itemIdList = await contract.getAmountItemByTrait(trait, currentAddress)
  const result = itemIdList.map((id) => id.toNumber())

  return result
}

export const fetchUserInventoryItemAmount = async () => {
  const itemsAmount = []

  for (let i = 1; i < 5; i++) {
    const itemIdList = await fetchListItemIds(i)
    const itemAmount = itemIdList.filter((x) => x !== 0).length
    itemsAmount.push(itemAmount)
  }

  return {
    fishAmount: itemsAmount[0],
    oreAmount: itemsAmount[1],
    hammerAmount: itemsAmount[2],
    sushiAmount: itemsAmount[3],
  }
}
