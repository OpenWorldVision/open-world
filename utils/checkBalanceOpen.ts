import { ethers } from 'ethers'

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
