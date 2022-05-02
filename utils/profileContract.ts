const profilesContract = {
  address: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  jsonInterface: require('../build/contracts/Profiles.json'),
}

const GasLimit = 800000
export const proFilesContract = async (web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  return new web3Client.eth.Contract(
    profilesContract.jsonInterface.abi,
    profilesContract.address,
    {
      gas: GasLimit,
      from: accounts[0],
    }
  )
}
