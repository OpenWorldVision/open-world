import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import Web3 from 'web3'
import { getOpenWorldContract } from './openWorldContract'

const web3 = new Web3(Web3.givenProvider)

export const getBalanceOpen = async () => {
  const contract = await getOpenWorldContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const balance = await contract.balanceOf(accounts[0])
    return (parseInt(balance._hex, 16)/10**18).toFixed(2)
  } catch (err) {}
}

export const getBalanceOfOpen = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const currentAddress = await window.ethereum.selectedAddress
    const balance = await provider.getBalance(currentAddress)

    return ethers.utils.formatEther(balance)
  } catch (error) {}
}
