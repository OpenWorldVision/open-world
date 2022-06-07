import { getAddresses } from 'constants/addresses'
import Web3 from 'web3'
import { getItemContract } from './itemContract'
import { getMarketContract } from './NFTMarket'
import { getProfessionContract } from './professionContract'

const web3 = new Web3(Web3.givenProvider)

export const fetchAmountItemByTrait = async (hammer: number) => {
  const contract = await getItemContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const data = await contract.methods
      .getAmountItemByTrait(hammer, accounts[0])
      .call({ from: accounts[0] })
    const listFiltered = data.filter((item) => item !== '0')
    const listFilteredNumber = listFiltered.map((item) => Number(item))
    return listFilteredNumber
  } catch (err) {
    return false
  }
}

export const makeHammer = async (listOre: Array<number>) => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  try {
    await contract.methods.makeMultiHammer(listOre).send({ from: accounts[0] })
    return true
  } catch (err) {
    return false
  }
}

export const sellHammer = async (arrayHammer: Array<number>, price: number) => {
  const market = await getMarketContract()
  const accounts = await web3.eth.getAccounts()
  const item = await getItemContract()
  const chainId = await web3.eth.getChainId()
  const marketAddress = getAddresses(chainId).MARKETPLACE

  try {
    const isApprovedMarket = await item.methods
      .isApprovedForAll(accounts[0], marketAddress)
      .call({ from: accounts[0] })

    if (!isApprovedMarket) {
      await item.methods
        .setApprovalForAll(marketAddress, true)
        .send({ from: accounts[0] })
    }

    await market.addMultiListing(item.options.address, arrayHammer, price)

    return true
  } catch (err) {
    return false
  }
}
