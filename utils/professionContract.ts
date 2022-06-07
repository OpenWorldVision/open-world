import { getAddresses } from 'constants/addresses'
import Web3 from 'web3'
import { fetchAmountItemByTrait } from './blackSmithContract'
import professionInterface from '../build/contracts/Profession.json'

const web3 = new Web3(Web3.givenProvider)

// Fishing
export const getProfessionContract = async () => {
  const chainId = await web3.eth.getChainId()
  const professionAddress = getAddresses(chainId).PROFESSION
  // @ts-ignore
  return new web3.eth.Contract(professionInterface.abi, professionAddress)
}

export const startFishing = async () => {
  try {
    const contract = await getProfessionContract()
    const accounts = await web3.eth.getAccounts()

    const data = await contract.methods
      .startFishing()
      .send({ from: accounts[0] })
    return data
  } catch (e) {
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

export const getFishingQuest = async () => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  const data = await contract.methods
    .getFishingQuest(accounts[0])
    .call({ from: accounts[0] })

  return data
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
  const hammerList = await fetchAmountItemByTrait(3)
  if (hammerList?.length <= 1) {
    return
  }
  try {
    const data = await contract.methods
      .startMining(hammerList[0])
      .send({ from: accounts[0] })
    return data
  } catch (e) {
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

export const dispatchMakeSushi = async (itemId1: number) => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const data = await contract.methods
      .makeSushi(itemId1)
      .send({ from: accounts[0] })
    return data
  } catch (error) {}
}

export const dispatchMakeMultiSushi = async (itemIds: Array<number>) => {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const data = await contract.methods
      .makeMultiSushi(itemIds)
      .send({ from: accounts[0] })
    return data
  } catch (error) {}
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
export async function refillStamina(
  sushiIds: string[],
  onTransactionHash: (txHash: string) => void
) {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const data = await contract.methods
      .refillStamina(accounts[0], sushiIds)
      .send({ from: accounts[0] })
      .on('transactionHash', onTransactionHash)
    return data
  } catch (error) {
    return null
  }
}
