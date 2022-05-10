const profilesContractHamony = {
  address: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  jsonInterface: require('../contracts/Profiles.json'),
}
const profilesContractBSC = {
  address: '0x276EA94F4093B09abF99d7393B6642F361572035',
  jsonInterface: require('../contracts/Profiles.json'),
}

const GasLimit = 800000
export const profilesContract = async (web3Client: any) => {
  const accounts = await web3Client.eth.getAccounts()
  const idNet = await web3Client.eth.getChainId()
  if(idNet === 97){
    return new web3Client.eth.Contract(
      profilesContractBSC.jsonInterface.abi,
      profilesContractBSC.address,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  }
  else {
    return new web3Client.eth.Contract(
      profilesContractHamony.jsonInterface.abi,
      profilesContractHamony.address,
      {
        gas: GasLimit,
        from: accounts[0],
      }
    )
  }
}
