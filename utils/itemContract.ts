import { getAddresses } from 'constants/addresses'
import Web3 from 'web3'
import itemInterface from '../build/contracts/Item.json'

const web3 = new Web3(Web3.givenProvider)

export const getItemContract = async () => {
  const chainId = await web3.eth.getChainId()
  const address = getAddresses(chainId).ITEM
  // @ts-ignore
  return new web3.eth.Contract(itemInterface.abi, address)
}

export const getNFTsByTrait = async (trait) => {
  const contract = await getItemContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const data = await contract.methods
      .getAmountItemByTrait(trait, accounts[0])
      .call({ from: accounts[0] })
    const listFiltered = data.filter((item) => item !== '0')
    return listFiltered
  } catch (error) {}
}

export const setApprovedAll = async () => {
  const contract = await getItemContract()
  const accounts = await web3.eth.getAccounts()
  const chainId = await web3.eth.getChainId()
  const marketAddress = getAddresses(chainId).MARKETPLACE
  try {
    const approved = await contract.methods
      .setApprovalForAll(marketAddress, true)
      .send({ from: accounts[0] })
    return approved
  } catch (error) {}
}

export const getApprovalAll = async () => {
  const contract = await getItemContract()
  const accounts = await web3.eth.getAccounts()
  const chainId = await web3.eth.getChainId()
  const marketAddress = getAddresses(chainId).MARKETPLACE
  try {
    const isApproved = await contract.methods
      ?.isApprovedForAll(accounts[0], marketAddress)
      .call({ from: accounts[0] })
    return isApproved
  } catch (error) {}
}
