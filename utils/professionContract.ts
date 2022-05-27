import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const professionContract = {
  addressHarmony: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  addressBSC: '0xf1FB61D2f353C8e612E201Ed8bb9Fb6FB4CC8673',
  jsonInterface: require('../build/contracts/Profession.json'),
}

// Fishing
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

export const fetchFishingQuestData = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const requireStamina = await contract.methods
      .fishingStaminaRequire()
      .call({ from: accounts[0] })

    const duration = await contract.methods
      .fishingDuration()
      .call({ from: accounts[0] })

    const fishingQuest = {
      requireStamina: parseInt(requireStamina),
      duration: parseInt(duration),
    }
    return fishingQuest
  } catch {
    return {
      requireStamina: -1,
      duration: -1,
    }
  }
}

export const checkIfFishingFinish = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  const data = await contract.methods
    .getFishingQuest(accounts[0])
    .call({ from: accounts[0] })

  return { ...data }
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

// Mining
export const startMining = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const data = await contract.methods
      .startMining()
      .send({ from: accounts[0] })
    return data
  } catch {
    return null
  }
}

export const fetchMiningQuestData = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  try {
    const requireStamina = await contract.methods
      .miningStaminaRequire()
      .call({ from: accounts[0] })

    const duration = await contract.methods
      .miningDuration()
      .call({ from: accounts[0] })

    const miningQuest = {
      requireStamina: parseInt(requireStamina),
      duration: parseInt(duration),
    }
    return miningQuest
  } catch {
    return {
      requireStamina: -1,
      duration: -1,
    }
  }
}

export const checkIfMiningFinish = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  const data = await contract.methods
    .getMiningQuest(accounts[0])
    .call({ from: accounts[0] })

  return { ...data }
}

export const finishMining = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const data = await contract.methods
      .finishMining()
      .send({ from: accounts[0] })
    return data
  } catch (error) {
    return null
  }
}

// Sell
