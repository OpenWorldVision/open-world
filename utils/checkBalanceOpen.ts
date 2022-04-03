export const openWorldContract = {
  address: '0x27a339d9B59b21390d7209b78a839868E319301B',
  // jsonInterface: require('@/assets/contracts/AirdropLander.json')
  jsonInterface: require('../contracts/xBlade.json'),
}
const GasLimit = 800000
const getOpenWorldContract = async (web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  return new web3Client.eth.Contract(
    openWorldContract.jsonInterface.abi,
    openWorldContract.address,
    {
      gas: GasLimit,
      from: accounts[0],
    }
  )
}

export const getBalanceOfOpen = async (web3Client) => {
  const accounts = await web3Client.web3Client.eth.getAccounts()
  const contract = await getOpenWorldContract(web3Client.web3Client)
  const balance = await contract.methods
    .balanceOf(accounts[0])
    .call({ from: accounts[0] })
  return balance
}
