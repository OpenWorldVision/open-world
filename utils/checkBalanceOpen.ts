import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const GasLimit = 800000

const openWorldContract = {
  addressHarmony: '0x87461de8692ead1de9ee628ff25d97ae393ea162',
  addressBSC: '0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B',
  jsonInterface: require('../build/contracts/OpenWorld.json'),
}

const getOpenWorldContract = async () => {
  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  if (chainId === 97) {
    return new web3.eth.Contract(
      openWorldContract.jsonInterface.abi,
      openWorldContract.addressBSC,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      openWorldContract.jsonInterface.abi,
      openWorldContract.addressHarmony,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  }
}

export const getBalanceOpen = async () => {
  const contract = await getOpenWorldContract()
  const accounts = await web3.eth.getAccounts()
  try {
    let balance = await contract.methods
      .balanceOf(accounts[0])
      .call({ from: accounts[0] })
    balance = new BigNumber(balance)

    return Number(balance.c[0] / 10000).toFixed(2)
  } catch (err) {}
}

// const GasLimit = 800000
// const getOpenWorldContract = async (web3Client) => {
//   const accounts = await web3Client.eth.getAccounts()
//   return new web3Client.eth.Contract(
//     openWorldContract.jsonInterface.abi,
//     openWorldContract.address,
//     {
//       gas: GasLimit,
//       from: accounts[0],
//     }
//   )
// }

export const getBalanceOfOpen = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const currentAddress = await window.ethereum.selectedAddress
    const balance = await provider.getBalance(currentAddress)

    // const accounts = await web3Client.web3Client.eth.getAccounts()
    // const contract = await getOpenWorldContract(web3Client.web3Client)
    // const balance = await contract.methods
    //   .balanceOf(accounts[0])
    //   .call({ from: accounts[0] })
    return ethers.utils.formatEther(balance)
  } catch (error) {}
}
