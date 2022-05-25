import { ethers } from 'ethers'

const itemContract = {
  addressBSC: '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492',
  jsonInterface: require('../build/contracts/Item.json'),
}

// Create contract
const getItemContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId

  if (chainId === '0x61') {
    return new ethers.Contract(
      itemContract.addressBSC,
      itemContract.jsonInterface.abi,
      provider.getSigner()
    )
  }
}

// Call methods
export const fetchUserInventoryItemAmount = async () => {
  const contract = await getItemContract()
  const currentAddress = await window.ethereum.selectedAddress
  const index = await contract.balanceOf(currentAddress)
  const items = []

  for (let i = 0; i < index.toNumber(); i++) {
    const itemId = await contract.tokenOfOwnerByIndex(currentAddress, i)
    items.push(await contract.get(itemId.toNumber()))
  }

  const fishAmount = items.filter((x) => x === 1).length
  const oreAmount = items.filter((x) => x === 2).length
  const hammerAmount = items.filter((x) => x === 3).length
  const sushiAmount = items.filter((x) => x === 4).length

  return { fishAmount, oreAmount, hammerAmount, sushiAmount }
}
