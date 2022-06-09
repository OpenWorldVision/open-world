import { getAddresses } from 'constants/addresses'
import { BigNumber } from 'ethers'
import Web3 from 'web3'
import profilesInterface from '../build/contracts/Profiles.json'

const web3 = new Web3(Web3.givenProvider)

const GasLimit = 800000

const getProfileContract = async () => {
  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()
  const profileAddress = getAddresses(chainId).PROFILES
  // @ts-ignore
  return new web3.eth.Contract(profilesInterface.abi, profileAddress, {
    gas: GasLimit,
    from: accounts[0],
  })
}

export const getProfile = async () => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    return await contract.methods
      .getProfileByAddress(accounts[0])
      .call({ from: accounts[0] })
  } catch {
    return false
  }
}

export async function getStamina() {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const stamina = await contract.methods
      .getStamina(accounts[0])
      .call({ from: accounts[0] })

    if (BigNumber.from(stamina).gt(BigNumber.from('100'))) {
      return 100
    }
    return stamina
  } catch (e) {
    return 0
  }
}

export const crateProfile = async (nameStr: string, pictureId: number) => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    await contract.methods
      .createProfile(nameStr, pictureId)
      .send({ from: accounts[0] })
    return true
  } catch {
    return false
  }
}

export const isProfessionExist = async () => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    return await contract.methods
      .canSetProfession(accounts[0])
      .call({ from: accounts[0] })
  } catch {
    return false
  }
}

export const changePictureProfile = async (
  profileId: number,
  pictureId: number
) => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    await contract.methods
      .changePic(profileId, pictureId)
      .send({ from: accounts[0] })
    return true
  } catch {
    return false
  }
}

export const checkNameTaken = async (nameStr: string) => {
  const contract = await getProfileContract()
  const accounts = await web3.eth.getAccounts()
  try {
    return await contract.methods.nameTaken(nameStr).call({ from: accounts[0] })
  } catch {
    return false
  }
}
