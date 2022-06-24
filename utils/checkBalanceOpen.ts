import { utils } from 'ethers'
import Web3 from 'web3'
import { getOpenWorldContract } from './openWorldContract'

const web3 = new Web3(Web3.givenProvider)

export const getOpenBalance = async (formatted: boolean) => {
  const contract = await getOpenWorldContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const balance = await contract.balanceOf(accounts[0])
    if (formatted) {
      return Number(utils.formatEther(balance)).toFixed(2)
    }
    return Number(utils.formatEther(balance))
  } catch (err) {}
}
