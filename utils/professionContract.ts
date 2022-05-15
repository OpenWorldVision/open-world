import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const professionContract = {
  addressHarmony: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  addressBSC: '0x28C45C112eFb6836031b5076a312427A292d80Ec',
  jsonInterface: require('../build/contracts/Profession.json'),
}

const getProfessionContract = async () => {
  const chainId = await web3.eth.getChainId()

  if (chainId === 97) {
    return new web3.eth.Contract(
      professionContract.jsonInterface.abi,
      professionContract.addressBSC
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      professionContract.jsonInterface.abi,
      professionContract.addressHarmony
    )
  }
}

export const startFishing = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const data = await contract.methods
      .startFishing()
      .send({ from: accounts[0] })
    return data
  } catch {
    return null
  }
}

export const getFinishFishingQuest = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const duration = await contract.methods
      .fishingDuration()
      .call({ from: accounts[0] })
    // console.log('haha', duration)
    const data = await contract.methods
      .getFishingQuest(accounts[0])
      .call({ from: accounts[0] })
    // console.log('gi z', data)
    const fishingQuest = {
      ...data,
      duration: parseInt(duration),
    }
    return fishingQuest
  } catch {
    return false
  }
}

export const finishFishing = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const data = await contract.methods
      .finishFishing()
      .send({ from: accounts[0] })
    return data
  } catch (error) {}
}
