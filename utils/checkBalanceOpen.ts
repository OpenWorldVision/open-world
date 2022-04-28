import { ethers } from 'ethers'

export const openWorldContract = {
  address:
    process.env.environment === 'production'
      ? '0x27a339d9B59b21390d7209b78a839868E319301B'
      : '0xcEC1d95e9bfFde1021B1f3C39862c6c3a5BA1A91',
  // jsonInterface: require('@/assets/contracts/AirdropLander.json')
  jsonInterface: require('../contracts/xBlade.json'),
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
