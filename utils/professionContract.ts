import { getAddresses } from 'constants/addresses'
import Web3 from 'web3'
import { fetchAmountItemByTrait } from './blackSmithContract'
import professionInterface from '../build/contracts/Profession.json'
import { ethers } from 'ethers'

const web3 = new Web3(Web3.givenProvider)

export const getProfessionContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = await web3.eth.getChainId()
  const professionAddress = getAddresses(chainId).PROFESSION
  // @ts-ignore
  return new ethers.Contract(
    professionAddress,
    professionInterface.abi,
    provider.getSigner()
  )
}

export const startFishing = async () => {
  try {
    const contract = await getProfessionContract()

    const tx = await contract.startFishing()
    const receipt = await tx.wait()
    return receipt
  } catch (e) {
    return null
  }
}

export const fetchFishingQuestData = async () => {
  const contract = await getProfessionContract()

  try {
    const requireStamina = await contract.fishingStaminaRequire()
    const duration = await contract.fishingDuration()

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

export async function getFishingQuest(): Promise<{
  finish: boolean
  startTime: ethers.BigNumber
}> {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  const data = await contract.getFishingQuest(accounts[0])

  return data
}

export const finishFishing = async () => {
  const contract = await getProfessionContract()

  try {
    const tx = await contract.finishFishing()
    const receipt = await tx.wait()
    return receipt
  } catch (error) {}
}

// Mining
export const startMining = async () => {
  const contract = await getProfessionContract()
  const hammerList = await fetchAmountItemByTrait(3)
  if (hammerList?.length <= 1) {
    return
  }
  try {
    const tx = await contract.startMining(hammerList[0])
    const receipt = await tx.wait()
    return receipt
  } catch (e) {
    return null
  }
}

export const getMiningQuestInfo = async () => {
  const contract = await getProfessionContract()

  try {
    const requireStamina = await contract.miningStaminaRequire()

    const duration = await contract.miningDuration()

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

export async function getMiningQuest(): Promise<{
  finish: boolean
  startTime: ethers.BigNumber
}> {
  const contract = await getProfessionContract()
  const accounts = await web3.eth.getAccounts()

  const data = await contract.getMiningQuest(accounts[0])

  return data
}

export const makeMultiSushi = async (itemIds: number[]) => {
  const contract = await getProfessionContract()

  try {
    const tx = await contract.makeMultiSushi(itemIds)
    const receipt = await tx.wait()
    return receipt
  } catch (error) {
    return null
  }
}

export const finishMining = async () => {
  const contract = await getProfessionContract()

  try {
    const tx = await contract.finishMining()
    const receipt = await tx.wait()
    return receipt
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
    const tx: ethers.ContractTransaction = await contract.refillStamina(
      accounts[0],
      sushiIds
    )
    onTransactionHash(tx.hash)
    const receipt = await tx.wait()

    return receipt
  } catch (error) {
    return null
  }
}
