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

// Create contract
const getMarketContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = window?.ethereum?.chainId

  if (chainId === '0x61') {
    return new ethers.Contract(
      marketContract.addressBSC,
      marketContract.jsonInterface.abi,
      provider.getSigner()
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
  } catch (e) {
    return null
  }
}
