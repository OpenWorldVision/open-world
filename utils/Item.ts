import { getAddresses } from 'constants/addresses'
import { BigNumber, ethers, utils } from 'ethers'
import { getOpenWorldContract } from './openWorldContract'

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
  try {
    const contract = await getItemContract()
    const currentAddress = await window.ethereum.selectedAddress
    const itemIdList = await contract.getAmountItemByTrait(
      trait,
      currentAddress
    )
    const result = itemIdList
      .map((id) => id.toNumber())
      .filter((id) => id !== 0)
    return result
  } catch (e) {
    return []
  }
}
const ITEM_TYPES = ['fish', 'ore', 'hammer', 'sushi']

export async function fetchUserInventoryItemAmount(): Promise<
  { type: string; ids: number[] }[]
> {
  const resultsPromise = await Promise.all(
    [fetchListItemIds(1),
    fetchListItemIds(2),
    fetchListItemIds(3),
    fetchListItemIds(4)]
  )
  const results = ITEM_TYPES.map( (type, index) => ({
    type,
    ids: resultsPromise[index],
  }))
  return results
}

export async function getHammerPrice() {
  const contract = await getItemContract()
  try {
    return await contract.hammerPrice()
  } catch (error) {
    return 0
  }
}

export async function isBoughtHammer() {
  const contract = await getItemContract()
  const account = await contract.signer.getAddress()
  try {
    return await contract.isBoughtHammer(account)
  } catch (error) {
    return true
  }
}

export async function buyFirstHammer(
  onTransactionExecute: (hash: string) => void
) {
  const contract = await getItemContract()
  const openContract = await getOpenWorldContract()
  const currentAddress = await contract.signer.getAddress()

  const allowance: BigNumber = await openContract.allowance(
    currentAddress,
    contract.address
  )

  if (allowance.lt(utils.parseEther('1000000'))) {
    await openContract.approve(
      contract.address,
      utils.parseEther('1000000').toString()
    )
  }
  try {
    const tx = await contract.buyFirstHammer()
    onTransactionExecute(tx.hash)
    const receipt = await tx.wait()

    return receipt
  } catch (e) {
    return null
  }
}
